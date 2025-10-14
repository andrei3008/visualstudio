import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { getStripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe()
    const body = await req.text()
    const signature = headers().get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err) {
      console.error(`Webhook signature verification failed:`, err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    console.log(`[STRIPE_WEBHOOK] Received event: ${event.type}`)

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const checkoutSession = event.data.object as Stripe.Checkout.Session

        // Update subscription after successful payment
        if (checkoutSession.metadata?.userId && checkoutSession.metadata?.maintenancePackageId) {
          await prisma.subscription.updateMany({
            where: {
              userId: checkoutSession.metadata.userId,
              maintenancePackageId: checkoutSession.metadata.maintenancePackageId,
              status: 'unpaid' // Only update unpaid subscriptions
            },
            data: {
              status: 'active',
              stripeSubscriptionId: checkoutSession.subscription as string,
              currentPeriodStart: new Date(checkoutSession.created * 1000),
              currentPeriodEnd: new Date((checkoutSession.created + 30 * 24 * 60 * 60) * 1000), // 30 days from creation
            }
          })

          console.log(`[STRIPE_WEBHOOK] Activated subscription for user ${checkoutSession.metadata.userId}`)
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice

        // Extend subscription period
        if ((invoice as any).subscription && invoice.customer) {
          const subscriptionId = (invoice as any).subscription as string

          // Get subscription details from Stripe
          const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId)

          // Update database subscription
          await prisma.subscription.updateMany({
            where: {
              stripeSubscriptionId: subscriptionId,
            },
            data: {
              status: 'active',
              currentPeriodStart: new Date((stripeSubscription as any).current_period_start * 1000),
              currentPeriodEnd: new Date((stripeSubscription as any).current_period_end * 1000),
            }
          })

          console.log(`[STRIPE_WEBHOOK] Extended subscription ${subscriptionId}`)
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice

        // Mark subscription as past due
        if ((invoice as any).subscription) {
          const subscriptionId = (invoice as any).subscription as string

          await prisma.subscription.updateMany({
            where: {
              stripeSubscriptionId: subscriptionId,
            },
            data: {
              status: 'past_due'
            }
          })

          console.log(`[STRIPE_WEBHOOK] Marked subscription ${subscriptionId} as past due`)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        // Mark subscription as canceled
        await prisma.subscription.updateMany({
          where: {
            stripeSubscriptionId: subscription.id,
          },
          data: {
            status: 'canceled',
            canceledAt: new Date(),
          }
        })

        console.log(`[STRIPE_WEBHOOK] Canceled subscription ${subscription.id}`)
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Handle one-time project payments
        if (paymentIntent.metadata?.userId && paymentIntent.metadata?.projectName) {
          await prisma.oneTimeProject.updateMany({
            where: {
              stripePaymentIntentId: paymentIntent.id,
              userId: paymentIntent.metadata.userId,
              status: 'pending'
            },
            data: {
              status: 'paid'
            }
          })

          console.log(`[STRIPE_WEBHOOK] Marked project ${paymentIntent.metadata.projectName} as paid`)
        }
        break
      }

      default:
        console.log(`[STRIPE_WEBHOOK] Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[STRIPE_WEBHOOK] Error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}