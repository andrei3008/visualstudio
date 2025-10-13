import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

// GET /api/admin/sales/tasks/stats - Get task statistics
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
    const projectId = searchParams.get('projectId') || ''

    // Build where clause for project filtering
    const whereClause: any = {}
    if (projectId && projectId !== 'all') {
      whereClause.projectId = projectId
    }

    const now = new Date()
    const todayStart = new Date(now.setHours(0, 0, 0, 0))
    const todayEnd = new Date(now.setHours(23, 59, 59, 999))
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

    // Get all statistics in parallel
    const [
      totalTasks,
      backlogTasks,
      inProgressTasks,
      developmentTasks,
      testingTasks,
      reviewTasks,
      doneTasks,
      lowPriorityTasks,
      mediumPriorityTasks,
      highPriorityTasks,
      criticalTasks,
      overdueTasks,
      dueTodayTasks,
      dueThisWeekTasks,
      dueThisMonthTasks,
      completedThisWeekTasks,
      completedThisMonthTasks,
      tasksByAssignee,
      avgCompletionTime
    ] = await Promise.all([
      // Total tasks
      prisma.task.count({ where: whereClause }),

      // Tasks by status
      prisma.task.count({ where: { ...whereClause, status: 'backlog' } }),
      prisma.task.count({ where: { ...whereClause, status: 'in_progress' } }),
      prisma.task.count({ where: { ...whereClause, status: 'development' } }),
      prisma.task.count({ where: { ...whereClause, status: 'testing' } }),
      prisma.task.count({ where: { ...whereClause, status: 'review' } }),
      prisma.task.count({ where: { ...whereClause, status: 'done' } }),

      // Tasks by priority
      prisma.task.count({ where: { ...whereClause, priority: 'low' } }),
      prisma.task.count({ where: { ...whereClause, priority: 'medium' } }),
      prisma.task.count({ where: { ...whereClause, priority: 'high' } }),
      prisma.task.count({ where: { ...whereClause, priority: 'critical' } }),

      // Overdue tasks
      prisma.task.count({
        where: {
          ...whereClause,
          dueAt: { lt: now },
          status: { not: 'done' }
        }
      }),

      // Due today
      prisma.task.count({
        where: {
          ...whereClause,
          dueAt: {
            gte: todayStart,
            lt: todayEnd
          },
          status: { not: 'done' }
        }
      }),

      // Due this week
      prisma.task.count({
        where: {
          ...whereClause,
          dueAt: {
            gte: now,
            lte: weekFromNow
          },
          status: { not: 'done' }
        }
      }),

      // Due this month
      prisma.task.count({
        where: {
          ...whereClause,
          dueAt: {
            gte: now,
            lte: monthFromNow
          },
          status: { not: 'done' }
        }
      }),

      // Completed this week
      prisma.task.count({
        where: {
          ...whereClause,
          completedAt: {
            gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }),

      // Completed this month
      prisma.task.count({
        where: {
          ...whereClause,
          completedAt: {
            gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      }),

      // Tasks by assignee
      prisma.task.groupBy({
        by: ['assigneeId'],
        where: whereClause,
        _count: {
          id: true
        }
      }),

      // Average completion time (in hours)
      prisma.task.aggregate({
        where: {
          ...whereClause,
          completedAt: { not: null },
          actualH: { not: null }
        },
        _avg: {
          actualH: true
        }
      })
    ])

    // Get assignee details
    const assigneeIds = tasksByAssignee.map(item => item.assigneeId).filter(Boolean)
    const assignees = await prisma.user.findMany({
      where: {
        id: { in: assigneeIds as string[] }
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    })

    const tasksByAssigneeWithDetails = tasksByAssignee.map(item => {
      const assignee = assignees.find(a => a.id === item.assigneeId)
      return {
        assigneeId: item.assigneeId,
        count: item._count.id,
        assignee: assignee || null
      }
    }).filter(item => item.assignee !== null)

    // Calculate completion rate
    const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0

    return NextResponse.json({
      overview: {
        total: totalTasks,
        completed: doneTasks,
        completionRate,
        overdue: overdueTasks,
        avgCompletionTime: avgCompletionTime._avg.actualH || 0
      },
      byStatus: {
        backlog: backlogTasks,
        inProgress: inProgressTasks,
        development: developmentTasks,
        testing: testingTasks,
        review: reviewTasks,
        done: doneTasks
      },
      byPriority: {
        low: lowPriorityTasks,
        medium: mediumPriorityTasks,
        high: highPriorityTasks,
        critical: criticalTasks
      },
      byDueDate: {
        overdue: overdueTasks,
        today: dueTodayTasks,
        thisWeek: dueThisWeekTasks,
        thisMonth: dueThisMonthTasks
      },
      recentActivity: {
        completedThisWeek: completedThisWeekTasks,
        completedThisMonth: completedThisMonthTasks
      },
      byAssignee: tasksByAssigneeWithDetails.sort((a, b) => b.count - a.count)
    })
  } catch (error) {
    console.error('Error fetching task stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}