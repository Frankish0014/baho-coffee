import { NextResponse } from "next/server";
import { Storage } from "@/backend/lib/storage";
import { PostgresStorage } from "@/backend/lib/db/storage";

export async function GET() {
  try {
    console.log("📥 Fetching contact submissions...");
    console.log("  - POSTGRES_URL:", process.env.POSTGRES_URL ? "✅ Set" : "❌ Not set");
    
    // Initialize Postgres if needed (only runs once)
    if (process.env.POSTGRES_URL) {
      await PostgresStorage.initialize();
    }
    
    // Load submissions using storage utility (Postgres in production, file system in development)
    const submissions = await Storage.getContactSubmissions();
    console.log(`📊 Loaded ${submissions.length} submissions`);

    // Already sorted by Postgres, but ensure it's sorted
    const sortedSubmissions = submissions.sort(
      (a: any, b: any) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({ 
      submissions: sortedSubmissions,
      count: sortedSubmissions.length,
      storage: process.env.POSTGRES_URL ? "Postgres" : "File"
    }, { status: 200 });
  } catch (error) {
    console.error("❌ Error reading submissions:", error);
    return NextResponse.json(
      { error: "Failed to read submissions", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

