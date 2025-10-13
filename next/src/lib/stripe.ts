import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
  typescript: true,
})

// Create a checkout session for subscriptions
export async function createSubscriptionCheckoutSession({
  userId,
  email,
  maintenancePackageId,
  maintenancePackageName,
  price,
}: {
  userId: string
  email: string
  maintenancePackageId: string
  maintenancePackageName: string
  price: number
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      billing_address_collection: 'required',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: maintenancePackageName,
              description: `Abonament mentenanță ${maintenancePackageName}`,
            },
            unit_amount: Math.round(price * 100), // Convert to cents
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXTAUTH_URL}/app/subscriptions?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      metadata: {
        userId,
        maintenancePackageId,
        maintenancePackageName,
        price: price.toString(),
      },
    })

    return session
  } catch (error) {
    console.error('[STRIPE] Error creating checkout session:', error)
    throw error
  }
}

// Create a payment intent for one-time projects
export async function createProjectPaymentIntent({
  userId,
  email,
  projectName,
  price,
}: {
  userId: string
  email: string
  projectName: string
  price: number
}) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(price * 100), // Convert to cents
      currency: 'eur',
      metadata: {
        userId,
        projectName,
        price: price.toString(),
      },
      receipt_email: email,
    })

    return paymentIntent
  } catch (error) {
    console.error('[STRIPE] Error creating payment intent:', error)
    throw error
  }
}

// Get subscription by Stripe subscription ID
export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    return subscription
  } catch (error) {
    console.error('[STRIPE] Error retrieving subscription:', error)
    throw error
  }
}

// Cancel subscription
export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId)
    return subscription
  } catch (error) {
    console.error('[STRIPE] Error canceling subscription:', error)
    throw error
  }
}

// Create customer in Stripe
export async function createCustomer({
  email,
  name,
}: {
  email: string
  name?: string
}) {
  try {
    const customer = await stripe.customers.create({
      email,
      name: name || email,
    })
    return customer
  } catch (error) {
    console.error('[STRIPE] Error creating customer:', error)
    throw error
  }
}

// Update customer
export async function updateCustomer(
  customerId: string,
  updates: {
    email?: string
    name?: string
  }
) {
  try {
    const customer = await stripe.customers.update(customerId, updates)
    return customer
  } catch (error) {
    console.error('[STRIPE] Error updating customer:', error)
    throw error
  }
}