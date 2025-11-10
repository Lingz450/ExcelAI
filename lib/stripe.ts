/**
 * Stripe Payment Integration
 * Handles subscriptions and billing
 */

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-10-28.acacia",
  typescript: true,
});

// Pricing configuration
export const STRIPE_PLANS = {
  FREE: {
    name: "Free",
    priceId: null,
    price: 0,
    features: {
      jobsPerDay: 3,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      historyDays: 7,
      priority: false,
      apiAccess: false,
    },
  },
  PRO: {
    name: "Pro",
    priceId: process.env.STRIPE_PRICE_ID_PRO, // Set in .env
    price: 19,
    features: {
      jobsPerDay: Infinity,
      maxFileSize: 100 * 1024 * 1024, // 100MB
      historyDays: 30,
      priority: true,
      apiAccess: true,
      apiCallsPerMonth: 10000,
    },
  },
  TEAM: {
    name: "Team",
    priceId: process.env.STRIPE_PRICE_ID_TEAM,
    price: 99,
    features: {
      jobsPerDay: Infinity,
      maxFileSize: 100 * 1024 * 1024,
      historyDays: 90,
      priority: true,
      apiAccess: true,
      apiCallsPerMonth: Infinity,
      teamSeats: 10,
      sso: true,
      customRecipes: true,
    },
  },
};

export const stripeService = {
  /**
   * Create checkout session for subscription
   */
  async createCheckoutSession(params: {
    userId: string;
    userEmail: string;
    priceId: string;
    successUrl: string;
    cancelUrl: string;
  }) {
    const session = await stripe.checkout.sessions.create({
      customer_email: params.userEmail,
      client_reference_id: params.userId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: params.priceId,
          quantity: 1,
        },
      ],
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: {
        userId: params.userId,
      },
    });

    return session;
  },

  /**
   * Create billing portal session
   */
  async createBillingPortalSession(customerId: string, returnUrl: string) {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return session;
  },

  /**
   * Get subscription details
   */
  async getSubscription(subscriptionId: string) {
    return stripe.subscriptions.retrieve(subscriptionId);
  },

  /**
   * Cancel subscription
   */
  async cancelSubscription(subscriptionId: string) {
    return stripe.subscriptions.cancel(subscriptionId);
  },

  /**
   * Update subscription
   */
  async updateSubscription(subscriptionId: string, newPriceId: string) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    return stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
    });
  },

  /**
   * Create customer
   */
  async createCustomer(email: string, name?: string, metadata?: any) {
    return stripe.customers.create({
      email,
      name,
      metadata,
    });
  },

  /**
   * Handle webhook events
   */
  constructWebhookEvent(payload: string | Buffer, signature: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  },
};

/**
 * Check user's subscription limits
 */
export function checkSubscriptionLimits(
  subscription: keyof typeof STRIPE_PLANS,
  usage: {
    jobsToday: number;
    fileSize: number;
  }
): { allowed: boolean; reason?: string } {
  const plan = STRIPE_PLANS[subscription];

  // Check daily job limit
  if (usage.jobsToday >= plan.features.jobsPerDay) {
    return {
      allowed: false,
      reason: `You've reached your daily limit of ${plan.features.jobsPerDay} jobs. Upgrade to Pro for unlimited processing.`,
    };
  }

  // Check file size limit
  if (usage.fileSize > plan.features.maxFileSize) {
    const limitMB = plan.features.maxFileSize / (1024 * 1024);
    return {
      allowed: false,
      reason: `File size exceeds ${limitMB}MB limit. Upgrade to Pro for 100MB files.`,
    };
  }

  return { allowed: true };
}

