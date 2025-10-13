import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
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

  const tasks = await prisma.task.findMany({
    where: { projectId: project.id },
    orderBy: [{ status: 'asc' }, { dueAt: 'asc' }, { createdAt: 'desc' }],
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
  return NextResponse.json(tasks)
}

export async function POST(req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true }
  })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Only admins can create tasks
  if (user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const project = await prisma.project.findFirst({ where: { id: ctx.params.id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  try {
    const body = await req.json().catch(() => ({} as any))
    const title = String(body.title || '').trim()
    const description = String(body.description || '').trim() || null
    const status = String(body.status || 'backlog') as any
    const priority = String(body.priority || 'medium') as any
    const assigneeId = String(body.assigneeId || '').trim() || null
    const estimateH = body.estimateH != null ? Number(body.estimateH) : null
    const dueAtStr = String(body.dueAt || '')
    const dueAt = dueAtStr ? new Date(dueAtStr) : null

    if (!title) return NextResponse.json({ error: 'Titlu necesar' }, { status: 400 })

    const task = await prisma.task.create({
      data: {
        projectId: project.id,
        title,
        description,
        status,
        priority,
        assigneeId,
        estimateH: estimateH ?? undefined,
        dueAt: dueAt ?? undefined,
      },
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
    return NextResponse.json(task, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Create failed' }, { status: 400 })
  }
}

