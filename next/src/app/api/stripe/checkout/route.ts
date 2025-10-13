import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { createSubscriptionCheckoutSession } from '@/lib/stripe'

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
          where: { status: 'active' }
        }
      }
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

    // Get maintenance package details
    const maintenancePackage = await prisma.maintenancePackage.findUnique({
      where: { id: maintenancePackageId }
    })

    if (!maintenancePackage) {
      return NextResponse.json(
        { error: 'Maintenance package not found' },
        { status: 404 }
      )
    }

    // Check if user already has active subscription to this package
    const existingSubscription = user.subscriptions.find(
      sub => sub.maintenancePackageId === maintenancePackageId
    )

    if (existingSubscription) {
      return NextResponse.json(
        { error: 'Already subscribed to this package' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const stripeSession = await createSubscriptionCheckoutSession({
      userId: user.id,
      email: user.email,
      maintenancePackageId,
      maintenancePackageName: maintenancePackage.name,
      price: maintenancePackage.priceCents / 100, // Convert from cents to EUR
    })

    // Create pending subscription in database
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        maintenancePackageId,
        status: 'unpaid',
        projectsIncluded: maintenancePackage.includedProjects,
        projectsUsed: 0,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      }
    })

    return NextResponse.json({
      sessionId: stripeSession.id,
      url: stripeSession.url,
      subscriptionId: subscription.id,
    })

  } catch (error) {
    console.error('[STRIPE_CHECKOUT]', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}