import { NextResponse } from "next/server";
import { Storage } from "@/lib/storage";

export async function GET() {
  try {
    // Load submissions using storage utility (Vercel KV in production, file system in development)
    const submissions = await Storage.load("contact-submissions");

    // Sort by timestamp (newest first)
    const sortedSubmissions = submissions.sort(
      (a: any, b: any) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({ submissions: sortedSubmissions }, { status: 200 });
  } catch (error) {
    console.error("Error reading submissions:", error);
    return NextResponse.json(
      { error: "Failed to read submissions" },
      { status: 500 }
    );
  }
}

