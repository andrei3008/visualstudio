import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { createNotification, notifyAdmins } from '@/lib/notifications'

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const project = await prisma.project.findFirst({ where: user.role === 'admin' ? { id: ctx.params.id } : { id: ctx.params.id, userId: user.id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const msgs = await prisma.message.findMany({
    where: { projectId: project.id },
    orderBy: { createdAt: 'asc' },
    include: { author: { select: { email: true, name: true, role: true } } },
  })
  return NextResponse.json(msgs)
}

export async function POST(req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const project = await prisma.project.findFirst({ where: user.role === 'admin' ? { id: ctx.params.id } : { id: ctx.params.id, userId: user.id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const bodyJson = await req.json().catch(() => ({} as any))
  const body = String(bodyJson.body || '').trim()
  const isInternal = !!bodyJson.isInternal
  if (!body) return NextResponse.json({ error: 'Mesaj gol' }, { status: 400 })
  // Clients cannot post internal notes
  const createInternal = user.role === 'admin' ? isInternal : false
  const msg = await prisma.message.create({ data: { projectId: project.id, authorId: user.id, body, isInternal: createInternal } })
  // notifications
  if (!createInternal) {
    if (user.role === 'admin') {
      // notify project owner
      createNotification(project.userId, 'message.new', { projectId: project.id, projectName: project.name })
    } else {
      // notify admins
      notifyAdmins('message.new', { projectId: project.id, projectName: project.name })
    }
  }
  return NextResponse.json(msg, { status: 201 })
}
