import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { findUserByEmail } from '@/lib/users'

export async function PATCH(req: Request, ctx: { params: { id: string; milestoneId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await findUserByEmail(session.user.email)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const project = await prisma.project.findFirst({ where: { id: ctx.params.id, userId: user.id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const ms = await prisma.milestone.findFirst({ where: { id: ctx.params.milestoneId, projectId: project.id } })
  if (!ms) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const body = await req.json().catch(() => ({} as any))
  const update: any = {}
  if (typeof body.title === 'string') update.title = String(body.title).trim()
  if (typeof body.status === 'string') update.status = body.status
  if (body.dueAt === null) update.dueAt = null
  else if (typeof body.dueAt === 'string' && body.dueAt) update.dueAt = new Date(body.dueAt)
  const updated = await prisma.milestone.update({
    where: { id: ms.id },
    data: update,
    select: { id: true, title: true, status: true, dueAt: true, createdAt: true },
  })
  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, ctx: { params: { id: string; milestoneId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await findUserByEmail(session.user.email)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const project = await prisma.project.findFirst({ where: { id: ctx.params.id, userId: user.id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const ms = await prisma.milestone.findFirst({ where: { id: ctx.params.milestoneId, projectId: project.id } })
  if (!ms) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await prisma.milestone.delete({ where: { id: ms.id } })
  return NextResponse.json({ ok: true })
}

