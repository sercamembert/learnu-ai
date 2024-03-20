import { PLANS } from "@/config/stripe";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.userId) {
    return new Response(null, {
      status: 200,
    });
  }

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await db.user.update({
      where: {
        id: session.metadata.userId,
      },
      data: {
        subscriptionPlan:
          session.metadata.planName === "Basic"
            ? "BASIC"
            : session.metadata.planName === "Premium"
            ? "PREMIUM"
            : "PROFESSIONAL",
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  } else if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await db.user.update({
      where: {
        stripeSubscriptionId: "sub_1OwJvdJBUfH6y9FSRbbdGBmo",
      },
      data: {
        stripePriceId: "price_1OvMH4JBUfH6y9FSLMzBx1lS",
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  } else if (event.type === "customer.subscription.updated") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    const updatedSubscription = await stripe.subscriptions.update(
      subscription.id
    );

    await db.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: "price_1OvMH4JBUfH6y9FSLMzBx1lS",
        subscriptionPlan: "PROFESSIONAL",
      },
    });
  }

  return new Response(null, { status: 200 });
}
