import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: Request, ctx: { params: { id: string; taskId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true }
  })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Check project access (admin or project owner)
  const project = await prisma.project.findFirst({
    where: {
      id: ctx.params.id,
      OR: [
        { userId: user.id },
        { ...(user.role === 'admin' ? {} : { userId: user.id }) }
      ]
    }
  })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const task = await prisma.task.findFirst({ where: { id: ctx.params.taskId, projectId: project.id } })
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await req.json().catch(() => ({} as any))
  const update: any = {}

  if (typeof body.title === 'string') update.title = String(body.title).trim()
  if (typeof body.description === 'string') update.description = String(body.description).trim() || null
  if (typeof body.status === 'string') update.status = body.status
  if (typeof body.priority === 'string') update.priority = body.priority
  if (typeof body.assigneeId === 'string') update.assigneeId = String(body.assigneeId).trim() || null
  if (body.dueAt === null) update.dueAt = null
  else if (typeof body.dueAt === 'string' && body.dueAt) update.dueAt = new Date(body.dueAt)
  if (body.estimateH === null) update.estimateH = null
  else if (typeof body.estimateH !== 'undefined') update.estimateH = Number(body.estimateH)

  // Update completedAt when status changes to done
  if (body.status === 'done' && task.status !== 'done') {
    update.completedAt = new Date()
  } else if (body.status !== 'done' && task.status === 'done') {
    update.completedAt = null
  }

  const updated = await prisma.task.update({
    where: { id: task.id },
    data: update,
    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  })
  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, ctx: { params: { id: string; taskId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true }
  })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Only admins can delete tasks
  if (user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const project = await prisma.project.findFirst({ where: { id: ctx.params.id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const task = await prisma.task.findFirst({ where: { id: ctx.params.taskId, projectId: project.id } })
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await prisma.task.delete({ where: { id: task.id } })
  return NextResponse.json({ ok: true })
}

