import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { findUserByEmail } from '@/lib/users'

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const user = await findUserByEmail(session.user.email)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const project = await prisma.project.findFirst({ where: { id: ctx.params.id, userId: user.id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const tasks = await prisma.task.findMany({
    where: { projectId: project.id },
    orderBy: [{ status: 'asc' }, { dueAt: 'asc' }, { createdAt: 'desc' }],
    select: { id: true, title: true, status: true, assigneeId: true, dueAt: true, estimateH: true, createdAt: true },
  })
  return NextResponse.json(tasks)
}

export async function POST(req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const user = await findUserByEmail(session.user.email)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const project = await prisma.project.findFirst({ where: { id: ctx.params.id, userId: user.id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  try {
    const body = await req.json().catch(() => ({} as any))
    const title = String(body.title || '').trim()
    const status = String(body.status || 'todo') as any
    const estimateH = body.estimateH != null ? Number(body.estimateH) : null
    const dueAtStr = String(body.dueAt || '')
    const dueAt = dueAtStr ? new Date(dueAtStr) : null
    if (!title) return NextResponse.json({ error: 'Titlu necesar' }, { status: 400 })
    const task = await prisma.task.create({
      data: {
        projectId: project.id,
        title,
        status,
        estimateH: estimateH ?? undefined,
        dueAt: dueAt ?? undefined,
      },
      select: { id: true, title: true, status: true, assigneeId: true, dueAt: true, estimateH: true, createdAt: true },
    })
    return NextResponse.json(task, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Create failed' }, { status: 400 })
  }
}

