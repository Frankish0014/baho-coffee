import { NextResponse } from "next/server";
import { Storage } from "@/backend/lib/storage";
import { PostgresStorage } from "@/backend/lib/db/storage";

export async function GET() {
  try {
    console.log("📥 Fetching quotation requests...");
    console.log("  - POSTGRES_URL:", process.env.POSTGRES_URL ? "✅ Set" : "❌ Not set");
    
    // Initialize Postgres if needed (only runs once)
    if (process.env.POSTGRES_URL) {
      await PostgresStorage.initialize();
    }
    
    // Load quotation requests using storage utility (Postgres in production, file system in development)
    const requests = await Storage.getQuotationRequests();
    console.log(`📊 Loaded ${requests.length} quotation requests`);

    // Already sorted by Postgres, but ensure it's sorted
    const sortedRequests = requests.sort(
      (a: any, b: any) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({ 
      requests: sortedRequests,
      count: sortedRequests.length,
      storage: process.env.POSTGRES_URL ? "Postgres" : "File"
    }, { status: 200 });
  } catch (error) {
    console.error("❌ Error reading quotation requests:", error);
    return NextResponse.json(
      { error: "Failed to read quotation requests", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

