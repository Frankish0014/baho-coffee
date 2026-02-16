import { NextRequest, NextResponse } from "next/server";
import { PaymentStorage } from "@/backend/lib/db/payments";

/**
 * Create a test payment for testing purposes
 * This endpoint creates a pending payment that can be used to test the admin dashboard
 */
export async function POST(request: NextRequest) {
  try {
    // Initialize payments table if it doesn't exist
    try {
      await PaymentStorage.initialize();
    } catch (initError) {
      console.error("Error initializing payments table:", initError);
      // Continue anyway - might already exist
    }

    const body = await request.json();
    const { 
      customerName = "Test Customer",
      customerEmail = "test@example.com",
      amount = 100,
      productId = "bugoyi-washed",
      productName = "Bugoyi Washed",
      quantity = 10
    } = body;

    // Generate order and payment IDs
    const orderId = `TEST-${Date.now()}`;
    const paymentId = `PAY-${Date.now()}`;

    const paymentData = {
      id: paymentId,
      orderId,
      customerName,
      customerEmail,
      customerPhone: "+250788123456",
      shippingAddress: "123 Test Street",
      shippingCity: "Kigali",
      shippingCountry: "RW",
      shippingZip: "00000",
      paymentMethod: "bank",
      paymentStatus: "pending" as const,
      amount,
      currency: "USD",
      items: [
        {
          productId,
          productName,
          quantity,
          price: amount / quantity,
          total: amount,
        },
      ],
      metadata: {
        testPayment: true,
        createdAt: new Date().toISOString(),
      },
    };

    // Save payment to database
    await PaymentStorage.savePayment(paymentData);

    return NextResponse.json({
      success: true,
      message: "Test payment created successfully",
      payment: {
        orderId,
        status: "pending",
        amount,
        customerName,
        customerEmail,
      },
    });
  } catch (error: any) {
    console.error("Error creating test payment:", error);
    return NextResponse.json(
      { 
        error: error.message || "Failed to create test payment",
        details: error.stack 
      },
      { status: 500 }
    );
  }
}

