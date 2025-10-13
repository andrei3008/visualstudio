import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

// DELETE project
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if project belongs to user
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        tasks: true,
        milestones: true,
        messages: true,
        proposals: true,
        files: true
      }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    if (project.userId !== user.id && user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Delete related records first
    await prisma.task.deleteMany({
      where: { projectId: params.id }
    })

    await prisma.milestone.deleteMany({
      where: { projectId: params.id }
    })

    await prisma.message.deleteMany({
      where: { projectId: params.id }
    })

    await prisma.proposalItem.deleteMany({
      where: {
        proposal: {
          projectId: params.id
        }
      }
    })

    await prisma.proposal.deleteMany({
      where: { projectId: params.id }
    })

    await prisma.file.deleteMany({
      where: { projectId: params.id }
    })

    // Delete the project
    await prisma.project.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Project deleted successfully' })

  } catch (error) {
    console.error('[PROJECT_DELETE]', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}