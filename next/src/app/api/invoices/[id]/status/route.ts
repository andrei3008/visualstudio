import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { PaymentService } from '@/lib/payment-service'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get session and authenticate user
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      )
    }

    // Get user information
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const invoiceId = params.id

    // Get invoice basic details
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        project: {
          select: {
            userId: true
          }
        }
      }
    })

    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      )
    }

    // Check authorization
    const isClient = invoice.project?.userId === user.id
    const isAdmin = user.role === 'admin'

    if (!isClient && !isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - You can only view your own invoices' },
        { status: 403 }
      )
    }

    // Get detailed payment status
    const paymentStatus = await PaymentService.getInvoicePaymentStatus(invoiceId)

    // Check if invoice is overdue
    const isOverdue = invoice.dueDate < new Date() && invoice.status !== 'paid'
    const daysUntilDue = Math.ceil((invoice.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

    // Get Stripe payment status if applicable
    let stripeStatus = null
    if (invoice.stripePaymentIntentId) {
      try {
        const { StripeService } = await import('@/lib/stripe-service')
        const paymentIntent = await StripeService.retrievePaymentIntent(invoice.stripePaymentIntentId)
        stripeStatus = {
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          created: paymentIntent.created,
          lastPaymentError: paymentIntent.last_payment_error
        }
      } catch (error) {
        console.error('Error fetching Stripe payment intent:', error)
        stripeStatus = { error: 'Failed to fetch payment status' }
      }
    }

    // Check checkout session status if applicable
    let checkoutStatus = null
    if (invoice.stripeCheckoutSessionId) {
      try {
        const { StripeService } = await import('@/lib/stripe-service')
        const session = await StripeService.retrieveCheckoutSession(invoice.stripeCheckoutSessionId)
        checkoutStatus = {
          status: session.status,
          paymentStatus: session.payment_status,
          expiresAt: session.expires_at,
          url: session.url
        }
      } catch (error) {
        console.error('Error fetching checkout session:', error)
        checkoutStatus = { error: 'Failed to fetch session status' }
      }
    }

    // Return comprehensive status information
    return NextResponse.json({
      invoice: {
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        status: invoice.status,
        totalAmount: invoice.totalAmount,
        issueDate: invoice.issueDate,
        dueDate: invoice.dueDate,
        paidAt: invoice.paidAt
      },
      payment: paymentStatus,
      isOverdue,
      daysUntilDue,
      canPay: ['unpaid', 'sent'].includes(invoice.status) && paymentStatus.remainingAmount > 0,
      stripe: stripeStatus,
      checkout: checkoutStatus,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching invoice status:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch invoice status',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}