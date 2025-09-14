import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { promises as fs } from 'fs'
import path from 'path'

const baseDir = path.join(process.cwd(), 'storage', 'uploads')

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const project = await prisma.project.findFirst({ where: user.role === 'admin' ? { id: ctx.params.id } : { id: ctx.params.id, userId: user.id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const files = await prisma.file.findMany({ where: { projectId: project.id, ...(user.role === 'admin' ? {} : { isInternal: false }) }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json(files)
}

export async function POST(req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const project = await prisma.project.findFirst({ where: user.role === 'admin' ? { id: ctx.params.id } : { id: ctx.params.id, userId: user.id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const form = await req.formData()
  type UploadFile = { name: string; type: string; arrayBuffer: () => Promise<ArrayBuffer> }
  const file = form.get('file') as unknown as UploadFile | null
  if (!file) return NextResponse.json({ error: 'Lipsește fișierul' }, { status: 400 })
  const isInternal = form.get('isInternal') === 'true'
  const buf = Buffer.from(await file.arrayBuffer())
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name.replace(/[^a-zA-Z0-9_.-]/g, '_')}`
  const projectDir = path.join(baseDir, project.id)
  await fs.mkdir(projectDir, { recursive: true })
  const diskPath = path.join(projectDir, safeName)
  await fs.writeFile(diskPath, buf)

  const rec = await prisma.file.create({
    data: {
      projectId: project.id,
      uploaderId: user.id,
      originalName: file.name,
      mimeType: file.type || 'application/octet-stream',
      size: buf.length,
      isInternal: user.role === 'admin' ? isInternal : false,
      path: diskPath,
    },
  })
  return NextResponse.json(rec, { status: 201 })
}
