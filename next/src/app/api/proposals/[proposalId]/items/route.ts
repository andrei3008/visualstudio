import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { findUserByEmail } from '@/lib/users'

export async function GET(_req: Request, ctx: { params: { proposalId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await findUserByEmail(session.user.email)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const prop = await prisma.proposal.findFirst({ where: { id: ctx.params.proposalId, project: { userId: user.id } } })
  if (!prop) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const items = await prisma.proposalItem.findMany({ where: { proposalId: prop.id }, orderBy: { createdAt: 'asc' } })
  return NextResponse.json(items)
}

export async function POST(req: Request, ctx: { params: { proposalId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await findUserByEmail(session.user.email)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const prop = await prisma.proposal.findFirst({ where: { id: ctx.params.proposalId, project: { userId: user.id } } })
  if (!prop) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const body = await req.json().catch(() => ({} as any))
  const description = String(body.description || '').trim()
  const qty = Number(body.qty || 0)
  const unitPriceCents = Number(body.unitPriceCents || 0)
  if (!description) return NextResponse.json({ error: 'Descriere necesară' }, { status: 400 })
  if (qty <= 0 || unitPriceCents < 0) return NextResponse.json({ error: 'Cantitate/preț invalide' }, { status: 400 })
  const it = await prisma.proposalItem.create({ data: { proposalId: prop.id, description, qty, unitPriceCents } })
  return NextResponse.json(it, { status: 201 })
}

