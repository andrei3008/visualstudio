import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { findUserByEmail } from '@/lib/users'

function token() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
}

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await findUserByEmail(session.user.email)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const project = await prisma.project.findFirst({ where: { id: ctx.params.id, userId: user.id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const proposals = await prisma.proposal.findMany({
    where: { projectId: project.id },
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  })
  const withTotals = proposals.map((p) => ({
    id: p.id,
    title: p.title,
    status: p.status,
    createdAt: p.createdAt,
    totalCents: p.items.reduce((sum, it) => sum + it.qty * it.unitPriceCents, 0),
  }))
  return NextResponse.json(withTotals)
}

export async function POST(req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await findUserByEmail(session.user.email)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const project = await prisma.project.findFirst({ where: { id: ctx.params.id, userId: user.id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await req.json().catch(() => ({} as any))
  const title = String(body.title || '').trim()
  if (!title) return NextResponse.json({ error: 'Titlu necesar' }, { status: 400 })
  const created = await prisma.proposal.create({ data: { projectId: project.id, title, publicToken: token() } })
  return NextResponse.json({ id: created.id, title: created.title, status: created.status, createdAt: created.createdAt }, { status: 201 })
}

