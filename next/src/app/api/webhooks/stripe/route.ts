import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { PaymentService } from '@/lib/payment-service'
import { prisma } from '@/lib/prisma'

// Stripe webhook events we handle
const SUPPORTED_EVENTS = [
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'payment_intent.canceled',
  'checkout.session.completed',
  'checkout.session.expired'
]

export async function POST(request: NextRequest) {
  try {
    // Get webhook signature from headers
    const signature = headers().get('stripe-signature')
    if (!signature) {
      console.error('Stripe webhook: No signature provided')
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      )
    }

    // Get webhook secret from environment
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('Stripe webhook: No webhook secret configured')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    // Get raw body
    const body = await request.text()

    // Import StripeService
    const { StripeService } = await import('@/lib/stripe-service')

    // Verify webhook signature and process event
    const { event, processed, message } = await StripeService.handleWebhookEvent(
      body,
      signature,
      webhookSecret
    )

    console.log(`Stripe webhook received: ${event.type}`, {
      eventId: event.id,
      processed,
      message
    })

    // Process supported events
    let result
    switch (event.type) {
      case 'payment_intent.succeeded':
        if (event.data.object && typeof event.data.object === 'object' && 'id' in event.data.object) {
          result = await PaymentService.processSuccessfulPayment(
            event.data.object.id as string,
            event.data.object as any
          )
        } else {
          result = { success: false, processed: false, message: 'Invalid payment intent data' }
        }
        break

      case 'payment_intent.payment_failed':
        if (event.data.object && typeof event.data.object === 'object' && 'id' in event.data.object) {
          result = await PaymentService.processFailedPayment(
            event.data.object.id as string,
            event.data.object as any
          )
        } else {
          result = { success: false, processed: false, message: 'Invalid payment intent data' }
        }
        break

      case 'payment_intent.canceled':
        // Log cancellation but don't change invoice status
        if (event.data.object && typeof event.data.object === 'object' && 'metadata' in event.data.object) {
          const metadata = (event.data.object as any).metadata
          if (metadata.invoiceId) {
            console.log(`Payment intent cancelled for invoice ${metadata.invoiceId}`)
            // Optionally create a note or log entry
            await prisma.invoice.update({
              where: { id: metadata.invoiceId },
              data: {
                notes: `Payment cancelled: ${(event.data.object as any).id} - ${new Date().toISOString()}`
              }
            })
          }
        }
        result = { success: true, processed: true, message: 'Payment cancellation recorded' }
        break

      case 'checkout.session.completed':
        if (event.data.object && typeof event.data.object === 'object' && 'id' in event.data.object) {
          result = await PaymentService.processCheckoutSessionCompleted(
            event.data.object.id as string,
            event.data.object as any
          )
        } else {
          result = { success: false, processed: false, message: 'Invalid checkout session data' }
        }
        break

      case 'checkout.session.expired':
        // Log session expiration
        if (event.data.object && typeof event.data.object === 'object' && 'metadata' in event.data.object) {
          const metadata = (event.data.object as any).metadata
          if (metadata.invoiceId) {
            console.log(`Checkout session expired for invoice ${metadata.invoiceId}`)
            // Update invoice to remove expired session
            await prisma.invoice.update({
              where: { id: metadata.invoiceId },
              data: {
                stripeCheckoutSessionId: null,
                paymentUrl: null,
                notes: `Checkout session expired: ${(event.data.object as any).id} - ${new Date().toISOString()}`
              }
            })
          }
        }
        result = { success: true, processed: true, message: 'Checkout session expiration recorded' }
        break

      default:
        result = { success: true, processed: false, message: `Event type ${event.type} not supported` }
    }

    // Log webhook processing result
    console.log(`Stripe webhook processed: ${event.type}`, {
      success: result.success,
      processed: result.processed,
      message: result.message
    })

    // Return appropriate response
    if (result.success) {
      return NextResponse.json({
        received: true,
        processed: result.processed,
        message: result.message
      })
    } else {
      console.error(`Stripe webhook processing failed: ${event.type}`, result.message)
      return NextResponse.json(
        {
          error: 'Webhook processing failed',
          message: result.message
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Stripe webhook error:', error)

    // Don't return error details for security
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Handle webhook verification endpoint (for testing)
export async function GET(request: NextRequest) {
  try {
    // Check if Stripe webhook is configured
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY

    const config = {
      webhookConfigured: !!webhookSecret,
      stripeConfigured: !!stripeSecretKey,
      supportedEvents: SUPPORTED_EVENTS,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(config)

  } catch (error) {
    console.error('Webhook configuration check error:', error)
    return NextResponse.json(
      {
        error: 'Failed to check webhook configuration',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}