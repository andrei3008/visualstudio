import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'

// GET user subscriptions
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
          include: {
            maintenancePackage: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      subscriptions: user.subscriptions.map(sub => ({
        id: sub.id,
        status: sub.status,
        maintenancePackage: {
          id: sub.maintenancePackage.id,
          name: sub.maintenancePackage.name,
          type: sub.maintenancePackage.type,
          price: sub.maintenancePackage.priceCents / 100,
          description: sub.maintenancePackage.description,
          features: sub.maintenancePackage.features,
          includedProjects: sub.maintenancePackage.includedProjects === -1 ? 'unlimited' : sub.maintenancePackage.includedProjects
        },
        currentPeriodStart: sub.currentPeriodStart,
        currentPeriodEnd: sub.currentPeriodEnd,
        canceledAt: sub.canceledAt,
        projectsIncluded: sub.projectsIncluded,
        projectsUsed: sub.projectsUsed,
        createdAt: sub.createdAt,
        updatedAt: sub.updatedAt
      }))
    })
  } catch (error) {
    console.error('[SUBSCRIPTIONS_GET]', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}

// POST - Create new subscription
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await req.json()
    const { maintenancePackageId } = body

    if (!maintenancePackageId) {
      return NextResponse.json(
        { error: 'Maintenance package ID is required' },
        { status: 400 }
      )
    }

    // Check if maintenance package exists
    const maintenancePackage = await prisma.maintenancePackage.findUnique({
      where: { id: maintenancePackageId }
    })

    if (!maintenancePackage) {
      return NextResponse.json(
        { error: 'Maintenance package not found' },
        { status: 404 }
      )
    }

    // Check if user already has an active subscription to this package
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        maintenancePackageId,
        status: 'active'
      }
    })

    if (existingSubscription) {
      return NextResponse.json(
        { error: 'Already subscribed to this package' },
        { status: 400 }
      )
    }

    // Create subscription (pending payment)
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        maintenancePackageId,
        status: 'unpaid', // Will be updated after Stripe payment
        projectsIncluded: maintenancePackage.includedProjects,
        projectsUsed: 0,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      },
      include: {
        maintenancePackage: true
      }
    })

    return NextResponse.json({
      subscription: {
        id: subscription.id,
        status: subscription.status,
        maintenancePackage: {
          id: subscription.maintenancePackage.id,
          name: subscription.maintenancePackage.name,
          type: subscription.maintenancePackage.type,
          price: subscription.maintenancePackage.priceCents / 100,
          description: subscription.maintenancePackage.description,
          features: subscription.maintenancePackage.features,
          includedProjects: subscription.maintenancePackage.includedProjects === -1 ? 'unlimited' : subscription.maintenancePackage.includedProjects
        },
        currentPeriodStart: subscription.currentPeriodStart,
        currentPeriodEnd: subscription.currentPeriodEnd,
        projectsIncluded: subscription.projectsIncluded,
        projectsUsed: subscription.projectsUsed,
        createdAt: subscription.createdAt
      }
    }, { status: 201 })

  } catch (error) {
    console.error('[SUBSCRIPTIONS_POST]', error)
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    )
  }
}