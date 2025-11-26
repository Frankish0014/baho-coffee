import { NextResponse } from "next/server";
import { PostgresStorage } from "@/backend/lib/db/storage";

/**
 * Initialize database tables
 * Call this endpoint once after setting up Vercel Postgres
 */
export async function POST() {
  try {
    if (!process.env.POSTGRES_URL) {
      return NextResponse.json(
        { 
          error: "Postgres is not configured. Please set up Vercel Postgres.",
          configured: false
        },
        { status: 400 }
      );
    }

    console.log("🔄 Initializing database tables...");
    await PostgresStorage.initialize();

    return NextResponse.json({
      success: true,
      message: "Database tables initialized successfully!"
    }, { status: 200 });

  } catch (error: any) {
    console.error("❌ Database initialization error:", error);
    return NextResponse.json(
      { 
        error: "Failed to initialize database", 
        details: error.message || String(error) 
      },
      { status: 500 }
    );
  }
}

