import { NextResponse } from "next/server";
import { Storage } from "@/lib/storage";

export async function GET() {
  try {
    console.log("📥 Fetching contact submissions...");
    console.log("  - KV_REST_API_URL:", process.env.KV_REST_API_URL ? "✅ Set" : "❌ Not set");
    console.log("  - KV_REST_API_TOKEN:", process.env.KV_REST_API_TOKEN ? "✅ Set" : "❌ Not set");
    
    // Load submissions using storage utility (Vercel KV in production, file system in development)
    const submissions = await Storage.load("contact-submissions");
    console.log(`📊 Loaded ${submissions.length} submissions`);

    // Sort by timestamp (newest first)
    const sortedSubmissions = submissions.sort(
      (a: any, b: any) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({ 
      submissions: sortedSubmissions,
      count: sortedSubmissions.length,
      storage: process.env.KV_REST_API_URL ? "KV" : "File"
    }, { status: 200 });
  } catch (error) {
    console.error("❌ Error reading submissions:", error);
    return NextResponse.json(
      { error: "Failed to read submissions", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

