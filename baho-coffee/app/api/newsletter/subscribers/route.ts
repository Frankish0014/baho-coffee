import { NextRequest, NextResponse } from "next/server";
import { NewsletterStorage } from "@/backend/lib/db/newsletter";

export async function GET(request: NextRequest) {
  try {
    // Initialize newsletter table if it doesn't exist
    try {
      await NewsletterStorage.initialize();
    } catch (initError) {
      console.error("Error initializing newsletter table:", initError);
      // Continue anyway - might already exist
    }

    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("active") === "true";

    // Get subscribers
    const subscribers = activeOnly 
      ? await NewsletterStorage.getActiveSubscribers()
      : await NewsletterStorage.getAllSubscribers();

    return NextResponse.json({
      success: true,
      subscribers,
      total: subscribers.length,
    });
  } catch (error: any) {
    console.error("Error fetching newsletter subscribers:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}

