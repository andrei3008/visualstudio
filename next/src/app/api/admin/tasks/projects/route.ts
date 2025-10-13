import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

// GET /api/admin/sales/tasks/projects - Get projects for task assignment
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true }
    })

    if (user?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    const whereClause: any = {}

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } }
      ]
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        status: true,
        description: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        tasks: {
          select: {
            id: true,
            status: true
          }
        },
        proposals: {
          select: {
            id: true,
            status: true
          }
        },
        invoices: {
          select: {
            id: true,
            status: true
          }
        }
      },
      orderBy: [
        { updatedAt: 'desc' },
        { name: 'asc' }
      ]
    })

    const projectsWithCounts = projects.map(project => ({
      ...project,
      totalTasks: project.tasks.length,
      activeTasks: project.tasks.filter(task => task.status !== 'done').length,
      hasProposal: project.proposals.length > 0,
      hasInvoice: project.invoices.length > 0,
      tasks: undefined,
      proposals: undefined,
      invoices: undefined
    }))

    return NextResponse.json(projectsWithCounts)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}