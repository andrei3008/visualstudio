import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { findUserByEmail } from '@/lib/users'

export async function DELETE(_req: Request, ctx: { params: { proposalId: string; itemId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await findUserByEmail(session.user.email)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const prop = await prisma.proposal.findFirst({ where: { id: ctx.params.proposalId, project: { userId: user.id } } })
  if (!prop) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const it = await prisma.proposalItem.findFirst({ where: { id: ctx.params.itemId, proposalId: prop.id } })
  if (!it) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await prisma.proposalItem.delete({ where: { id: it.id } })
  return NextResponse.json({ ok: true })
}

