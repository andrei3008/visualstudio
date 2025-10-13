import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

// GET /api/admin/sales/tasks/users - Get users for task assignment
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

    const whereClause: any = {
      role: { in: ['staff', 'admin'] }
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        assignedTasks: {
          select: {
            id: true,
            status: true
          }
        }
      },
      orderBy: [
        { name: 'asc' }
      ]
    })

    const usersWithTaskCount = users.map(user => ({
      ...user,
      totalTasks: user.assignedTasks.length,
      activeTasks: user.assignedTasks.filter(task => task.status !== 'done').length,
      assignedTasks: undefined // Remove the detailed tasks array
    }))

    return NextResponse.json(usersWithTaskCount)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}