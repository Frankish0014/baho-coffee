import { NextRequest, NextResponse } from "next/server";
import { NewsletterStorage } from "@/backend/lib/db/newsletter";
import { sanitizeEmail } from "@/backend/lib/security";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { email } = body;

    if (!email || typeof email !== "string" || email.trim() === "") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    try {
      email = sanitizeEmail(email);
    } catch (validationError: unknown) {
      const message = validationError instanceof Error ? validationError.message : "Invalid email format";
      return NextResponse.json(
        { error: message },
        { status: 400 }
      );
    }

    await NewsletterStorage.unsubscribe(email);

    return NextResponse.json({
      success: true,
      message: "You have been unsubscribed from our newsletter.",
    });
  } catch (error: unknown) {
    console.error("Error unsubscribing from newsletter:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to unsubscribe",
        success: false,
      },
      { status: 500 }
    );
  }
}
