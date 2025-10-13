import { prisma } from './prisma'
import { InvoiceService } from './invoice-service'
import { StripeService } from './stripe-service'
import { Invoice, Payment, PaymentMethod, PaymentStatus } from '@prisma/client'
import Stripe from 'stripe'

export interface PaymentProcessingResult {
  success: boolean
  payment?: Payment
  invoice?: Invoice
  error?: string
  message?: string
}

export interface WebhookProcessingResult {
  success: boolean
  processed: boolean
  message: string
  invoice?: Invoice
  payment?: Payment
}

export class PaymentService {
  /**
   * Process payment for an invoice using Stripe checkout session
   */
  static async processInvoicePayment(invoiceId: string): Promise<PaymentProcessingResult> {
    try {
      // Get invoice details
      const invoice = await InvoiceService.getInvoiceDetails(invoiceId)
      if (!invoice) {
        return {
          success: false,
          error: 'Invoice not found'
        }
      }

      // Check if invoice is already paid
      if (invoice.status === 'paid') {
        return {
          success: false,
          error: 'Invoice is already paid'
        }
      }

      // Check if invoice has an active payment session
      if (invoice.stripeCheckoutSessionId) {
        try {
          const session = await StripeService.retrieveCheckoutSession(invoice.stripeCheckoutSessionId)
          if (session.status === 'open') {
            return {
              success: false,
              error: 'Payment session already exists',
              message: 'Payment session already active'
            }
          }
        } catch (error) {
          // Session might be expired, continue with creating new one
          console.log('Existing session expired, creating new one')
        }
      }

      // Create Stripe checkout session
      const sessionData = {
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        customerEmail: invoice.clientEmail,
        customerName: invoice.clientName,
        amount: invoice.totalAmount,
        currency: 'usd', // TODO: Make configurable
        description: invoice.title
      }

      const { sessionId, sessionUrl } = await StripeService.createCheckoutSession(sessionData)

      // Update invoice with Stripe session info
      const updatedInvoice = await InvoiceService.updateInvoiceStatus(
        invoiceId,
        'sent',
        {
          stripeCheckoutSessionId: sessionId,
          paymentUrl: sessionUrl
        }
      )

      return {
        success: true,
        invoice: updatedInvoice,
        message: 'Payment session created successfully',
        error: undefined
      }
    } catch (error) {
      console.error('Error processing invoice payment:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process payment'
      }
    }
  }

  /**
   * Create payment intent for direct payment processing
   */
  static async createPaymentIntent(invoiceId: string): Promise<PaymentProcessingResult> {
    try {
      const invoice = await InvoiceService.getInvoiceDetails(invoiceId)
      if (!invoice) {
        return {
          success: false,
          error: 'Invoice not found'
        }
      }

      if (invoice.status === 'paid') {
        return {
          success: false,
          error: 'Invoice is already paid'
        }
      }

      // Create Stripe payment intent
      const paymentIntentData = {
        amount: invoice.totalAmount,
        customerEmail: invoice.clientEmail,
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        description: invoice.title
      }

      const { clientSecret, paymentIntentId } = await StripeService.createPaymentIntent(paymentIntentData)

      // Update invoice with payment intent
      const updatedInvoice = await InvoiceService.updateInvoiceStatus(
        invoiceId,
        'sent',
        {
          stripePaymentIntentId: paymentIntentId
        }
      )

      return {
        success: true,
        invoice: updatedInvoice,
        message: 'Payment intent created successfully'
      }
    } catch (error) {
      console.error('Error creating payment intent:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create payment intent'
      }
    }
  }

  /**
   * Process successful payment from webhook
   */
  static async processSuccessfulPayment(
    paymentIntentId: string,
    stripePaymentIntent?: Stripe.PaymentIntent
  ): Promise<WebhookProcessingResult> {
    try {
      // Get payment intent details if not provided
      const intent = stripePaymentIntent || await StripeService.retrievePaymentIntent(paymentIntentId)

      const invoiceId = intent.metadata.invoiceId
      if (!invoiceId) {
        return {
          success: false,
          processed: false,
          message: 'No invoice ID found in payment intent metadata'
        }
      }

      // Get invoice details
      const invoice = await InvoiceService.getInvoiceDetails(invoiceId)
      if (!invoice) {
        return {
          success: false,
          processed: false,
          message: 'Invoice not found'
        }
      }

      // Check if payment was already processed
      if (invoice.status === 'paid') {
        return {
          success: true,
          processed: true,
          message: 'Payment already processed',
          invoice
        }
      }

      // Create payment record
      const payment = await InvoiceService.createPaymentRecord({
        invoiceId,
        amount: intent.amount / 100, // Convert from cents
        method: 'stripe',
        status: 'completed',
        transactionId: paymentIntentId,
        gateway: 'stripe',
        gatewayFee: (intent.application_fee_amount || 0) / 100, // Convert from cents
        notes: `Payment completed via Stripe - ${intent.id}`
      })

      // Update invoice status to paid
      const updatedInvoice = await InvoiceService.updateInvoiceStatus(
        invoiceId,
        'paid',
        {
          paidAt: new Date(),
          stripePaymentIntentId: paymentIntentId
        }
      )

      console.log(`Successfully processed payment for invoice ${invoice.invoiceNumber}`)

      return {
        success: true,
        processed: true,
        message: 'Payment processed successfully',
        invoice: updatedInvoice,
        payment
      }
    } catch (error) {
      console.error('Error processing successful payment:', error)
      return {
        success: false,
        processed: false,
        message: error instanceof Error ? error.message : 'Failed to process payment'
      }
    }
  }

  /**
   * Process failed payment from webhook
   */
  static async processFailedPayment(
    paymentIntentId: string,
    stripePaymentIntent?: Stripe.PaymentIntent
  ): Promise<WebhookProcessingResult> {
    try {
      const intent = stripePaymentIntent || await StripeService.retrievePaymentIntent(paymentIntentId)

      const invoiceId = intent.metadata.invoiceId
      if (!invoiceId) {
        return {
          success: false,
          processed: false,
          message: 'No invoice ID found in payment intent metadata'
        }
      }

      const invoice = await InvoiceService.getInvoiceDetails(invoiceId)
      if (!invoice) {
        return {
          success: false,
          processed: false,
          message: 'Invoice not found'
        }
      }

      // Create failed payment record
      const payment = await InvoiceService.createPaymentRecord({
        invoiceId,
        amount: intent.amount / 100,
        method: 'stripe',
        status: 'failed',
        transactionId: paymentIntentId,
        gateway: 'stripe',
        notes: `Payment failed via Stripe - ${intent.id}. Reason: ${intent.last_payment_error?.message || 'Unknown'}`
      })

      // Note: We don't change invoice status on failed payment
      // Invoice remains in 'sent' or 'unpaid' status for retry

      return {
        success: true,
        processed: true,
        message: 'Failed payment recorded',
        invoice,
        payment
      }
    } catch (error) {
      console.error('Error processing failed payment:', error)
      return {
        success: false,
        processed: false,
        message: error instanceof Error ? error.message : 'Failed to process failed payment'
      }
    }
  }

  /**
   * Process checkout session completion
   */
  static async processCheckoutSessionCompleted(
    sessionId: string,
    stripeSession?: Stripe.Checkout.Session
  ): Promise<WebhookProcessingResult> {
    try {
      const session = stripeSession || await StripeService.retrieveCheckoutSession(sessionId)

      if (!session.payment_intent) {
        return {
          success: false,
          processed: false,
          message: 'No payment intent found in checkout session'
        }
      }

      const invoiceId = session.metadata?.invoiceId
      if (!invoiceId) {
        return {
          success: false,
          processed: false,
          message: 'No invoice ID found in session metadata'
        }
      }

      const invoice = await InvoiceService.getInvoiceDetails(invoiceId)
      if (!invoice) {
        return {
          success: false,
          processed: false,
          message: 'Invoice not found'
        }
      }

      // Update invoice with session info
      await InvoiceService.updateInvoiceStatus(
        invoiceId,
        invoice.status,
        {
          stripeCheckoutSessionId: sessionId,
          stripeCustomerId: session.customer as string
        }
      )

      // Process the successful payment
      return await this.processSuccessfulPayment(
        session.payment_intent as string
      )
    } catch (error) {
      console.error('Error processing checkout session completion:', error)
      return {
        success: false,
        processed: false,
        message: error instanceof Error ? error.message : 'Failed to process checkout session'
      }
    }
  }

  /**
   * Get payment status for an invoice
   */
  static async getInvoicePaymentStatus(invoiceId: string): Promise<{
    status: string
    paidAmount: number
    totalAmount: number
    remainingAmount: number
    payments: Payment[]
  }> {
    try {
      const invoice = await InvoiceService.getInvoiceDetails(invoiceId)
      if (!invoice) {
        throw new Error('Invoice not found')
      }

      const payments = invoice.payments || []
      const paidAmount = payments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0)

      const remainingAmount = invoice.totalAmount - paidAmount

      return {
        status: invoice.status,
        paidAmount,
        totalAmount: invoice.totalAmount,
        remainingAmount,
        payments
      }
    } catch (error) {
      console.error('Error getting payment status:', error)
      throw error
    }
  }

  /**
   * Refund payment
   */
  static async refundPayment(
    paymentId: string,
    amount?: number,
    reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
  ): Promise<PaymentProcessingResult> {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: { invoice: true }
      })

      if (!payment) {
        return {
          success: false,
          error: 'Payment not found'
        }
      }

      if (payment.status !== 'completed') {
        return {
          success: false,
          error: 'Payment cannot be refunded - not completed'
        }
      }

      if (!payment.transactionId) {
        return {
          success: false,
          error: 'No transaction ID found for refund'
        }
      }

      // Create Stripe refund
      const refund = await StripeService.createRefund(
        payment.transactionId,
        amount || payment.amount,
        reason
      )

      // Create refund payment record
      const refundPayment = await InvoiceService.createPaymentRecord({
        invoiceId: payment.invoiceId,
        amount: -refund.amount / 100, // Negative amount for refund
        method: 'stripe',
        status: 'completed',
        transactionId: refund.id,
        gateway: 'stripe',
        notes: `Refund for payment ${payment.transactionId} - ${refund.reason || 'No reason specified'}`
      })

      // Update invoice status if fully refunded
      const paymentStatus = await this.getInvoicePaymentStatus(payment.invoiceId)
      if (paymentStatus.paidAmount <= 0 && paymentStatus.totalAmount > 0) {
        await InvoiceService.updateInvoiceStatus(payment.invoiceId, 'unpaid')
      }

      return {
        success: true,
        payment: refundPayment,
        message: 'Refund processed successfully'
      }
    } catch (error) {
      console.error('Error processing refund:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process refund'
      }
    }
  }

  /**
   * Get payment history for an invoice
   */
  static async getPaymentHistory(invoiceId: string): Promise<Payment[]> {
    try {
      return await prisma.payment.findMany({
        where: { invoiceId },
        orderBy: { createdAt: 'desc' }
      })
    } catch (error) {
      console.error('Error getting payment history:', error)
      throw error
    }
  }

  /**
   * Get all payments with optional filtering
   */
  static async getPayments(filters: {
    status?: PaymentStatus
    method?: PaymentMethod
    invoiceId?: string
    limit?: number
    offset?: number
  } = {}): Promise<{ payments: Payment[]; total: number }> {
    try {
      const whereClause: any = {}

      if (filters.status) whereClause.status = filters.status
      if (filters.method) whereClause.method = filters.method
      if (filters.invoiceId) whereClause.invoiceId = filters.invoiceId

      const [payments, total] = await Promise.all([
        prisma.payment.findMany({
          where: whereClause,
          orderBy: { createdAt: 'desc' },
          include: {
            invoice: {
              select: {
                id: true,
                invoiceNumber: true,
                clientName: true,
                totalAmount: true
              }
            }
          },
          take: filters.limit || 50,
          skip: filters.offset || 0
        }),
        prisma.payment.count({ where: whereClause })
      ])

      return { payments, total }
    } catch (error) {
      console.error('Error getting payments:', error)
      throw error
    }
  }

  /**
   * Get payment statistics
   */
  static async getPaymentStats(): Promise<{
    totalRevenue: number
    totalPayments: number
    successfulPayments: number
    failedPayments: number
    refundedAmount: number
    thisMonthRevenue: number
  }> {
    try {
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

      const [
        totalRevenueResult,
        totalPayments,
        successfulPayments,
        failedPayments,
        refundedResult,
        thisMonthRevenueResult
      ] = await Promise.all([
        prisma.payment.aggregate({
          where: { status: 'completed' },
          _sum: { amount: true }
        }),
        prisma.payment.count(),
        prisma.payment.count({ where: { status: 'completed' } }),
        prisma.payment.count({ where: { status: 'failed' } }),
        prisma.payment.aggregate({
          where: { amount: { lt: 0 } },
          _sum: { amount: true }
        }),
        prisma.payment.aggregate({
          where: {
            status: 'completed',
            createdAt: { gte: startOfMonth }
          },
          _sum: { amount: true }
        })
      ])

      return {
        totalRevenue: totalRevenueResult._sum.amount || 0,
        totalPayments,
        successfulPayments,
        failedPayments,
        refundedAmount: Math.abs(refundedResult._sum.amount || 0),
        thisMonthRevenue: thisMonthRevenueResult._sum.amount || 0
      }
    } catch (error) {
      console.error('Error getting payment stats:', error)
      throw error
    }
  }
}