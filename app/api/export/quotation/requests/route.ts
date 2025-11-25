import { NextResponse } from "next/server";
import { Storage } from "@/lib/storage";

export async function GET() {
  try {
    // Load quotation requests using storage utility (Vercel KV in production, file system in development)
    const requests = await Storage.load("quotation-requests");

    // Sort by timestamp (newest first)
    const sortedRequests = requests.sort(
      (a: any, b: any) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({ requests: sortedRequests }, { status: 200 });
  } catch (error) {
    console.error("Error reading quotation requests:", error);
    return NextResponse.json(
      { error: "Failed to read quotation requests" },
      { status: 500 }
    );
  }
}

