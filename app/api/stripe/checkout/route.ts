import { NextRequest, NextResponse } from "next/server";
import { stripeService } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userEmail, plan } = body;

    if (!userId || !userEmail || !plan) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get price ID based on plan
    const priceIds: Record<string, string> = {
      PRO: process.env.STRIPE_PRICE_ID_PRO || "",
      TEAM: process.env.STRIPE_PRICE_ID_TEAM || "",
    };

    const priceId = priceIds[plan];
    if (!priceId) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    // Create checkout session
    const session = await stripeService.createCheckoutSession({
      userId,
      userEmail,
      priceId,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/workspace?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

