import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { findUserByEmail } from '@/lib/users'
import { createProject, listProjectsByUserId } from '@/lib/projects'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const user = await findUserByEmail(session.user.email)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Use Prisma directly to get projects with counts (same as dashboard)
  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    include: {
      _count: {
        select: {
          tasks: true,
          milestones: true,
          proposals: true,
          messages: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json({ projects })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const user = await findUserByEmail(session.user.email)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json()
    const name = String(body.name || '').trim()
    const status = String(body.status || 'new') as any
    if (!name) return NextResponse.json({ error: 'Nume proiect necesar' }, { status: 400 })
    const project = await createProject(user.id, name, status)
    return NextResponse.json(project, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Create failed' }, { status: 400 })
  }
}
