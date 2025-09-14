import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { notifyProposalApproved } from '@/lib/notify'
import { createNotification } from '@/lib/notifications'

export async function POST(_req: Request, ctx: { params: { token: string } }) {
  const prop = await prisma.proposal.findUnique({ where: { publicToken: ctx.params.token } })
  if (!prop) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (prop.status !== 'submitted') return NextResponse.json({ error: 'Propunerea nu este în status trimis' }, { status: 400 })
  const updated = await prisma.proposal.update({
    where: { id: prop.id },
    data: { status: 'approved', approvedAt: new Date() },
    select: { id: true, status: true, approvedAt: true },
  })
  // fire-and-forget webhook
  const items = await prisma.proposalItem.findMany({ where: { proposalId: prop.id } })
  const totalCents = items.reduce((s, it) => s + it.qty * it.unitPriceCents, 0)
  notifyProposalApproved({
    webhookUrl: process.env.PROPOSAL_APPROVED_WEBHOOK,
    proposalId: prop.id,
    projectId: prop.projectId,
    title: prop.title,
    totalCents,
  })
  // notify project owner
  const project = await prisma.project.findUnique({ where: { id: prop.projectId }, select: { userId: true, name: true } })
  if (project) {
    createNotification(project.userId, 'proposal.approved', { id: prop.id, title: prop.title, projectId: prop.projectId, projectName: project.name, totalCents })
  }
  return NextResponse.json(updated)
}
