import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { PaymentService } from '@/lib/payment-service'
import { InvoiceService } from '@/lib/invoice-service'
import { z } from 'zod'

// Schema for payment initiation
const initiatePaymentSchema = z.object({
  paymentMethod: z.enum(['checkout', 'payment_intent']).default('checkout'),
  returnUrl: z.string().optional(),
  cancelUrl: z.string().optional()
})

export async function POST(
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

    // Parse and validate request body
    const body = await request.json()
    const validatedData = initiatePaymentSchema.parse(body)

    // Get invoice details
    const invoice = await InvoiceService.getInvoiceDetails(invoiceId)
    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      )
    }

    // Check authorization - user must be the client who owns the invoice or admin
    const isClient = invoice.projectId === user.id
    const isAdmin = user.role === 'admin'

    if (!isClient && !isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - You can only pay your own invoices' },
        { status: 403 }
      )
    }

    // Check if invoice is already paid
    if (invoice.status === 'paid') {
      return NextResponse.json(
        {
          error: 'Invoice already paid',
          invoice: invoice
        },
        { status: 400 }
      )
    }

    // Check if invoice is cancelled
    if (invoice.status === 'cancelled') {
      return NextResponse.json(
        { error: 'Invoice is cancelled and cannot be paid' },
        { status: 400 }
      )
    }

    let result

    // Process payment based on method
    if (validatedData.paymentMethod === 'checkout') {
      result = await PaymentService.processInvoicePayment(invoiceId)
    } else {
      result = await PaymentService.createPaymentIntent(invoiceId)
    }

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error || 'Failed to initiate payment',
          message: result.message
        },
        { status: 400 }
      )
    }

    // Return payment details
    const response = {
      success: true,
      message: result.message || 'Payment initiated successfully',
      invoice: result.invoice,
      paymentMethod: validatedData.paymentMethod,
      // Include relevant payment details based on method
      ...(validatedData.paymentMethod === 'checkout' && {
        paymentUrl: result.invoice?.paymentUrl,
        sessionId: result.invoice?.stripeCheckoutSessionId
      }),
      ...(validatedData.paymentMethod === 'payment_intent' && {
        clientSecret: result.invoice?.stripePaymentIntentId,
        paymentIntentId: result.invoice?.stripePaymentIntentId
      })
    }

    return NextResponse.json(response, { status: 200 })

  } catch (error) {
    console.error('Error initiating invoice payment:', error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      )
    }

    // Generic error handling
    return NextResponse.json(
      {
        error: 'Failed to initiate payment',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}

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

    // Get invoice with payment details
    const invoice = await InvoiceService.getInvoiceDetails(invoiceId)
    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      )
    }

    // Check authorization
    const isClient = invoice.projectId === user.id
    const isAdmin = user.role === 'admin'

    if (!isClient && !isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - You can only view your own invoices' },
        { status: 403 }
      )
    }

    // Get payment status
    const paymentStatus = await PaymentService.getInvoicePaymentStatus(invoiceId)

    // Get payment history
    const paymentHistory = await PaymentService.getPaymentHistory(invoiceId)

    // Check if payment session is still active
    let checkoutSessionStatus = null
    if (invoice.stripeCheckoutSessionId) {
      try {
        const { StripeService } = await import('@/lib/stripe-service')
        const session = await StripeService.retrieveCheckoutSession(invoice.stripeCheckoutSessionId)
        checkoutSessionStatus = {
          status: session.status,
          paymentStatus: session.payment_status,
          expiresAt: session.expires_at
        }
      } catch (error) {
        console.error('Error fetching checkout session status:', error)
        checkoutSessionStatus = { error: 'Failed to fetch session status' }
      }
    }

    // Return comprehensive payment information
    return NextResponse.json({
      invoice,
      paymentStatus,
      paymentHistory,
      checkoutSessionStatus,
      canPay: ['unpaid', 'sent'].includes(invoice.status) && paymentStatus.remainingAmount > 0,
      isOverdue: invoice.dueDate < new Date() && invoice.status !== 'paid',
      daysUntilDue: Math.ceil((invoice.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    })

  } catch (error) {
    console.error('Error fetching invoice payment details:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch payment details',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}