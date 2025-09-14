import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { findUserByEmail } from '@/lib/users'

export async function PATCH(req: Request, ctx: { params: { id: string; taskId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await findUserByEmail(session.user.email)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const project = await prisma.project.findFirst({ where: { id: ctx.params.id, userId: user.id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const task = await prisma.task.findFirst({ where: { id: ctx.params.taskId, projectId: project.id } })
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const body = await req.json().catch(() => ({} as any))
  const update: any = {}
  if (typeof body.title === 'string') update.title = String(body.title).trim()
  if (typeof body.status === 'string') update.status = body.status
  if (body.dueAt === null) update.dueAt = null
  else if (typeof body.dueAt === 'string' && body.dueAt) update.dueAt = new Date(body.dueAt)
  if (body.estimateH === null) update.estimateH = null
  else if (typeof body.estimateH !== 'undefined') update.estimateH = Number(body.estimateH)
  const updated = await prisma.task.update({
    where: { id: task.id },
    data: update,
    select: { id: true, title: true, status: true, assigneeId: true, dueAt: true, estimateH: true, createdAt: true },
  })
  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, ctx: { params: { id: string; taskId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await findUserByEmail(session.user.email)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const project = await prisma.project.findFirst({ where: { id: ctx.params.id, userId: user.id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const task = await prisma.task.findFirst({ where: { id: ctx.params.taskId, projectId: project.id } })
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await prisma.task.delete({ where: { id: task.id } })
  return NextResponse.json({ ok: true })
}

