import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PaymentStorage, PaymentData, PaymentItem } from "@/backend/lib/db/payments";

// Initialize Stripe lazily
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-11-17.clover",
  });
};

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Payment service is not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      shippingCity,
      shippingCountry,
      shippingZip,
      paymentMethod,
      items,
      amount,
    } = body;

    // Validate required fields
    if (!customerName || !customerEmail || !shippingAddress || !shippingCity || !shippingCountry || !items || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Convert amount to cents for Stripe
    const amountInCents = Math.round(amount * 100);

    // Create payment record in database
    const paymentData: PaymentData = {
      id: paymentId,
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      shippingCity,
      shippingCountry,
      shippingZip,
      paymentMethod,
      paymentStatus: "pending",
      amount,
      currency: "USD",
      items: items as PaymentItem[],
    };

    // Save payment to database
    await PaymentStorage.savePayment(paymentData);

    // Create Stripe Payment Intent
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      metadata: {
        orderId,
        paymentId,
        customerName,
        customerEmail,
      },
      description: `Order ${orderId} - Baho Coffee`,
      shipping: {
        name: customerName,
        phone: customerPhone,
        address: {
          line1: shippingAddress,
          city: shippingCity,
          country: shippingCountry,
          postal_code: shippingZip,
        },
      },
    });

    // Update payment with Stripe Payment Intent ID
    await PaymentStorage.updatePaymentStatus(orderId, "processing", paymentIntent.id);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
      paymentId,
    });
  } catch (error: any) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment intent" },
      { status: 500 }
    );
  }
}

