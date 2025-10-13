import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

// POST - Create free project from subscription
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        subscriptions: {
          where: {
            status: 'active'
          },
          include: {
            maintenancePackage: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user has active subscription with free projects
    const activeSubscription = user.subscriptions.find(sub =>
      sub.maintenancePackage.includedProjects > 0 ||
      sub.maintenancePackage.includedProjects === -1
    )

    if (!activeSubscription) {
      return NextResponse.json(
        { error: 'No active subscription with free projects' },
        { status: 400 }
      )
    }

    // Check if user has remaining free projects
    const remainingProjects = activeSubscription.maintenancePackage.includedProjects === -1
      ? Infinity
      : activeSubscription.maintenancePackage.includedProjects - activeSubscription.projectsUsed

    if (remainingProjects <= 0) {
      return NextResponse.json(
        { error: 'No free projects remaining in subscription' },
        { status: 400 }
      )
    }

    const body = await req.json()
    const { name } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      )
    }

    // Create project linked to subscription
    const project = await prisma.project.create({
      data: {
        userId: user.id,
        name,
        status: 'approved',
        subscriptionId: activeSubscription.id
      }
    })

    // Update subscription projects used count
    await prisma.subscription.update({
      where: { id: activeSubscription.id },
      data: {
        projectsUsed: activeSubscription.projectsUsed + 1
      }
    })

    return NextResponse.json({
      project: {
        id: project.id,
        name: project.name,
        status: project.status,
        userId: project.userId,
        subscriptionId: project.subscriptionId,
        createdAt: project.createdAt
      },
      remainingProjects: activeSubscription.maintenancePackage.includedProjects === -1
        ? 'unlimited'
        : remainingProjects - 1
    }, { status: 201 })

  } catch (error) {
    console.error('[PROJECTS_CREATE_FREE_POST]', error)
    return NextResponse.json(
      { error: 'Failed to create free project' },
      { status: 500 }
    )
  }
}

// GET - Check user's free project allowance
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        subscriptions: {
          where: {
            status: 'active'
          },
          include: {
            maintenancePackage: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const activeSubscription = user.subscriptions.find(sub =>
      sub.maintenancePackage.includedProjects > 0 ||
      sub.maintenancePackage.includedProjects === -1
    )

    if (!activeSubscription) {
      return NextResponse.json({
        hasFreeProjects: false,
        remainingProjects: 0,
        subscriptionName: null
      })
    }

    const remainingProjects = activeSubscription.maintenancePackage.includedProjects === -1
      ? Infinity
      : activeSubscription.maintenancePackage.includedProjects - activeSubscription.projectsUsed

    return NextResponse.json({
      hasFreeProjects: true,
      remainingProjects: activeSubscription.maintenancePackage.includedProjects === -1
        ? 'unlimited'
        : Math.max(0, remainingProjects),
      subscriptionName: activeSubscription.maintenancePackage.name,
      totalIncluded: activeSubscription.maintenancePackage.includedProjects === -1
        ? 'unlimited'
        : activeSubscription.maintenancePackage.includedProjects,
      projectsUsed: activeSubscription.projectsUsed
    })

  } catch (error) {
    console.error('[PROJECTS_CREATE_FREE_GET]', error)
    return NextResponse.json(
      { error: 'Failed to check free project allowance' },
      { status: 500 }
    )
  }
}