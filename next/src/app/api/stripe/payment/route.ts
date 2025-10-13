import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { createProjectPaymentIntent } from '@/lib/stripe'

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
    const { name, description, price } = body

    if (!name || !price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      )
    }

    // Create one-time project with pending payment
    const oneTimeProject = await prisma.oneTimeProject.create({
      data: {
        userId: user.id,
        name,
        description: description || '',
        priceCents: Math.round(price * 100), // Convert to cents
        status: 'pending'
      }
    })

    // Create Stripe payment intent
    const paymentIntent = await createProjectPaymentIntent({
      userId: user.id,
      email: user.email,
      projectName: name,
      price
    })

    // Update one-time project with payment intent ID
    await prisma.oneTimeProject.update({
      where: { id: oneTimeProject.id },
      data: {
        stripePaymentIntentId: paymentIntent.id
      }
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      projectId: oneTimeProject.id,
    })

  } catch (error) {
    console.error('[STRIPE_PAYMENT]', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}