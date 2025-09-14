import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { createReadStream } from 'fs'

export async function GET(_req: Request, ctx: { params: { fileId: string } }) {
  const file = await prisma.file.findUnique({ where: { id: ctx.params.fileId }, include: { project: { select: { userId: true, name: true } } } })
  if (!file) return new Response('Not found', { status: 404 })
  const session = await getServerSession(authOptions)
  const user = session?.user?.email ? await prisma.user.findUnique({ where: { email: session.user.email } }) : null
  const isAdmin = user?.role === 'admin'
  const isOwner = user?.id === file.project.userId
  if (!(isAdmin || isOwner) || (file.isInternal && !isAdmin)) return new Response('Forbidden', { status: 403 })
  const stream = createReadStream(file.path)
  return new Response(stream as any, {
    headers: {
      'Content-Type': file.mimeType,
      'Content-Disposition': `inline; filename="${encodeURIComponent(file.originalName)}"`
    }
  })
}

export async function DELETE(_req: Request, ctx: { params: { fileId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const file = await prisma.file.findUnique({ where: { id: ctx.params.fileId }, include: { project: true } })
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const isAdmin = user.role === 'admin'
  const isOwner = user.id === file.project.userId
  if (!(isAdmin || isOwner) || (file.isInternal && !isAdmin)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  await prisma.file.delete({ where: { id: file.id } })
  try { await (await import('fs/promises')).unlink(file.path) } catch {}
  return NextResponse.json({ ok: true })
}

