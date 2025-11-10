import { NextRequest, NextResponse } from "next/server";
import { stripeService } from "@/lib/stripe";
import { db } from "@/lib/db";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const event = stripeService.constructWebhookEvent(body, signature);

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const subscriptionId = session.subscription as string;

        if (userId && subscriptionId) {
          // Update user subscription in database
          const subscription = await stripeService.getSubscription(subscriptionId);
          const planName = subscription.items.data[0].price.id === process.env.STRIPE_PRICE_ID_PRO 
            ? "PRO" 
            : "TEAM";

          await db.users.updateSubscription(userId, planName);
          
          console.log(`✅ User ${userId} upgraded to ${planName}`);
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        if (userId) {
          // Handle subscription changes (upgrade/downgrade)
          const planName = subscription.items.data[0].price.id === process.env.STRIPE_PRICE_ID_PRO 
            ? "PRO" 
            : "TEAM";

          await db.users.updateSubscription(userId, planName);
          
          console.log(`✅ User ${userId} subscription updated to ${planName}`);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        if (userId) {
          // Downgrade to free plan
          await db.users.updateSubscription(userId, "FREE");
          
          console.log(`✅ User ${userId} downgraded to FREE`);
        }
        break;
      }

      case "invoice.payment_succeeded": {
        console.log("✅ Payment succeeded");
        break;
      }

      case "invoice.payment_failed": {
        console.log("⚠️ Payment failed");
        // Send email notification to user
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

