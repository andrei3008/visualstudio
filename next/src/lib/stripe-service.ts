import Stripe from 'stripe'
import { Invoice } from '@prisma/client'

// Initialize Stripe with proper error handling
const getStripeInstance = (): Stripe => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY

  if (!stripeSecretKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set')
  }

  return new Stripe(stripeSecretKey, {
    apiVersion: '2024-11-20' as any,
    typescript: true
  })
}

export interface StripePaymentIntentData {
  amount: number
  currency?: string
  customerEmail?: string
  invoiceId: string
  invoiceNumber: string
  description?: string
}

export interface StripeCheckoutSessionData {
  invoiceId: string
  invoiceNumber: string
  customerEmail: string
  customerName?: string
  amount: number
  currency?: string
  description?: string
  successUrl?: string
  cancelUrl?: string
}

export class StripeService {
  private static get stripe(): Stripe {
    return getStripeInstance()
  }

  /**
   * Create or retrieve Stripe customer
   */
  static async createOrGetCustomer(email: string, name?: string): Promise<string> {
    try {
      // First try to find existing customer
      const existingCustomers = await this.stripe.customers.list({
        email,
        limit: 1
      })

      if (existingCustomers.data.length > 0) {
        return existingCustomers.data[0].id
      }

      // Create new customer
      const customer = await this.stripe.customers.create({
        email,
        name: name || email,
        metadata: {
          source: 'visual-studio-portal'
        }
      })

      return customer.id
    } catch (error) {
      console.error('Error creating/retrieving Stripe customer:', error)
      throw new Error('Failed to create Stripe customer')
    }
  }

  /**
   * Create a payment intent for invoice payment
   */
  static async createPaymentIntent(data: StripePaymentIntentData): Promise<{
    clientSecret: string
    paymentIntentId: string
  }> {
    try {
      const { amount, currency = 'usd', customerEmail, invoiceId, invoiceNumber, description } = data

      // Create or get customer
      let customerId: string | undefined
      if (customerEmail) {
        customerId = await this.createOrGetCustomer(customerEmail)
      }

      // Create payment intent
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        customer: customerId,
        description: description || `Payment for invoice ${invoiceNumber}`,
        metadata: {
          invoiceId,
          invoiceNumber,
          source: 'visual-studio-portal'
        },
        automatic_payment_methods: {
          enabled: true
        }
      })

      return {
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id
      }
    } catch (error) {
      console.error('Error creating payment intent:', error)
      throw new Error('Failed to create payment intent')
    }
  }

  /**
   * Create a checkout session for invoice payment
   */
  static async createCheckoutSession(data: StripeCheckoutSessionData): Promise<{
    sessionId: string
    sessionUrl: string
  }> {
    try {
      const {
        invoiceId,
        invoiceNumber,
        customerEmail,
        customerName,
        amount,
        currency = 'usd',
        description,
        successUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/app/invoices/${invoiceId}?payment=success`,
        cancelUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/app/invoices/${invoiceId}?payment=cancelled`
      } = data

      // Create or get customer
      const customerId = await this.createOrGetCustomer(customerEmail, customerName)

      // Create checkout session
      const session = await this.stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency,
              product_data: {
                name: `Invoice ${invoiceNumber}`,
                description: description || `Payment for invoice ${invoiceNumber}`
              },
              unit_amount: Math.round(amount * 100)
            },
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          invoiceId,
          invoiceNumber,
          source: 'visual-studio-portal'
        },
        customer_email: customerEmail,
        billing_address_collection: 'auto',
        allow_promotion_codes: false
      })

      return {
        sessionId: session.id,
        sessionUrl: session.url!
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw new Error('Failed to create checkout session')
    }
  }

  /**
   * Retrieve payment intent details
   */
  static async retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      return await this.stripe.paymentIntents.retrieve(paymentIntentId)
    } catch (error) {
      console.error('Error retrieving payment intent:', error)
      throw new Error('Failed to retrieve payment intent')
    }
  }

  /**
   * Retrieve checkout session details
   */
  static async retrieveCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
    try {
      return await this.stripe.checkout.sessions.retrieve(sessionId)
    } catch (error) {
      console.error('Error retrieving checkout session:', error)
      throw new Error('Failed to retrieve checkout session')
    }
  }

  /**
   * Confirm payment intent (for manual confirmation)
   */
  static async confirmPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      return await this.stripe.paymentIntents.confirm(paymentIntentId)
    } catch (error) {
      console.error('Error confirming payment intent:', error)
      throw new Error('Failed to confirm payment intent')
    }
  }

  /**
   * Cancel payment intent
   */
  static async cancelPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      return await this.stripe.paymentIntents.cancel(paymentIntentId)
    } catch (error) {
      console.error('Error cancelling payment intent:', error)
      throw new Error('Failed to cancel payment intent')
    }
  }

  /**
   * Create refund for a payment
   */
  static async createRefund(
    paymentIntentId: string,
    amount?: number,
    reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
  ): Promise<Stripe.Refund> {
    try {
      const refundData: Stripe.RefundCreateParams = {
        payment_intent: paymentIntentId
      }

      if (amount) {
        refundData.amount = Math.round(amount * 100) // Convert to cents
      }

      if (reason) {
        refundData.reason = reason
      }

      return await this.stripe.refunds.create(refundData)
    } catch (error) {
      console.error('Error creating refund:', error)
      throw new Error('Failed to create refund')
    }
  }

  /**
   * Get payment method details
   */
  static async getPaymentMethod(paymentMethodId: string): Promise<Stripe.PaymentMethod> {
    try {
      return await this.stripe.paymentMethods.retrieve(paymentMethodId)
    } catch (error) {
      console.error('Error retrieving payment method:', error)
      throw new Error('Failed to retrieve payment method')
    }
  }

  /**
   * List customer payment methods
   */
  static async listCustomerPaymentMethods(customerId: string): Promise<Stripe.PaymentMethod[]> {
    try {
      const paymentMethods = await this.stripe.paymentMethods.list({
        customer: customerId,
        type: 'card'
      })
      return paymentMethods.data
    } catch (error) {
      console.error('Error listing customer payment methods:', error)
      throw new Error('Failed to list customer payment methods')
    }
  }

  /**
   * Update customer information
   */
  static async updateCustomer(customerId: string, data: {
    name?: string
    email?: string
    address?: Stripe.AddressParam
    phone?: string
  }): Promise<Stripe.Customer> {
    try {
      return await this.stripe.customers.update(customerId, data)
    } catch (error) {
      console.error('Error updating customer:', error)
      throw new Error('Failed to update customer')
    }
  }

  /**
   * Handle Stripe webhook events
   */
  static async handleWebhookEvent(
    payload: string,
    signature: string,
    webhookSecret: string
  ): Promise<{ event: Stripe.Event; processed: boolean; message: string }> {
    try {
      const event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret)

      let processed = false
      let message = ''

      switch (event.type) {
        case 'payment_intent.succeeded':
          message = 'Payment succeeded'
          processed = true
          break

        case 'payment_intent.payment_failed':
          message = 'Payment failed'
          processed = true
          break

        case 'checkout.session.completed':
          message = 'Checkout session completed'
          processed = true
          break

        case 'checkout.session.expired':
          message = 'Checkout session expired'
          processed = true
          break

        case 'payment_intent.canceled':
          message = 'Payment canceled'
          processed = true
          break

        default:
          message = `Unhandled event type: ${event.type}`
          processed = false
      }

      return { event, processed, message }
    } catch (error) {
      console.error('Webhook signature verification failed:', error)
      throw new Error('Invalid webhook signature')
    }
  }

  /**
   * Format amount for display (cents to dollars)
   */
  static formatAmount(amount: number, currency: string = 'usd'): string {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    })
    return formatter.format(amount / 100)
  }

  /**
   * Get supported currencies
   */
  static getSupportedCurrencies(): string[] {
    return [
      'usd', 'eur', 'gbp', 'cad', 'aud', 'chf', 'sek', 'nok', 'dkk', 'pln'
    ]
  }

  /**
   * Validate currency
   */
  static isValidCurrency(currency: string): boolean {
    return this.getSupportedCurrencies().includes(currency.toLowerCase())
  }

  /**
   * Get payment status from Stripe intent
   */
  static getPaymentStatus(paymentIntent: Stripe.PaymentIntent): 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' {
    switch (paymentIntent.status) {
      case 'requires_payment_method':
      case 'requires_confirmation':
      case 'requires_action':
        return 'pending'

      case 'processing':
        return 'processing'

      case 'succeeded':
        return 'completed'

      case 'canceled':
        return 'cancelled'

      default:
        return 'failed'
    }
  }
}