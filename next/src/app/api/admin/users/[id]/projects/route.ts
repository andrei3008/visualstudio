import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
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

    // Only admins can get projects
    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get URL search params for filtering
    const { searchParams } = new URL(request.url)
    const statusFilter = searchParams.get('status')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Verify the target user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: params.id },
      select: { id: true, name: true }
    })

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Build where clause
    const whereClause: any = { userId: params.id }
    if (statusFilter && statusFilter !== 'all') {
      whereClause.status = statusFilter
    }

    // Build order by clause
    const orderByClause: any = {}
    orderByClause[sortBy] = sortOrder

    // Get projects for the user
    const projects = await prisma.project.findMany({
      where: whereClause,
      orderBy: orderByClause,
      select: {
        id: true,
        name: true,
        status: true,
        description: true,
        budget: true,
        deadline: true,
        createdAt: true,
        updatedAt: true
      }
    })

    // Get statistics
    const projectStats = await prisma.project.groupBy({
      by: ['status'],
      where: { userId: params.id },
      _count: { status: true }
    })

    const stats = projectStats.reduce((acc, stat) => {
      acc[stat.status] = stat._count.status
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      projects,
      user: targetUser,
      stats: {
        total: projects.length,
        request: stats.request || 0,
        proposal_review: stats.proposal_review || 0,
        estimation: stats.estimation || 0,
        estimation_review: stats.estimation_review || 0,
        approved: stats.approved || 0,
        in_progress: stats.in_progress || 0,
        scoping: stats.scoping || 0,
        review: stats.review || 0,
        done: stats.done || 0,
        rejected: stats.rejected || 0
      }
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}