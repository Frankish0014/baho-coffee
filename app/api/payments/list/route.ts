import { NextRequest, NextResponse } from "next/server";
import { PaymentStorage } from "@/backend/lib/db/payments";

export async function GET(request: NextRequest) {
  try {
    // Initialize payments table if it doesn't exist
    try {
      await PaymentStorage.initialize();
    } catch (initError) {
      console.error("Error initializing payments table:", initError);
      // Continue anyway - might already exist
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    const status = searchParams.get("status");

    // Get all payments
    const payments = await PaymentStorage.getAllPayments(limit);

    // Filter by status if provided
    const filteredPayments = status
      ? payments.filter((p) => p.paymentStatus === status)
      : payments;

    return NextResponse.json({
      success: true,
      payments: filteredPayments,
      total: filteredPayments.length,
    });
  } catch (error: any) {
    console.error("Error fetching payments:", error);
    
    // Provide more helpful error messages
    let errorMessage = error.message || "Failed to fetch payments";
    let statusCode = 500;
    
    // Check for common database connection errors
    if (error.message?.includes("Unauthorized") || error.message?.includes("authentication")) {
      errorMessage = "Database connection failed: Invalid credentials or connection string. Please check your DATABASE_URL or POSTGRES_URL environment variable.";
      statusCode = 401;
    } else if (error.message?.includes("ECONNREFUSED") || error.message?.includes("connection")) {
      errorMessage = "Database connection failed: Cannot connect to database server. Please check your database is running and accessible.";
      statusCode = 503;
    } else if (error.message?.includes("does not exist") || error.message?.includes("relation")) {
      errorMessage = "Database table not found. The payments table may need to be initialized. Try visiting /api/admin/init-db first.";
      statusCode = 404;
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error.stack : undefined
      },
      { status: statusCode }
    );
  }
}

