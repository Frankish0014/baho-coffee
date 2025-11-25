import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function GET() {
  try {
    const requestsFile = path.join(
      process.cwd(),
      "data",
      "quotation-requests.json"
    );

    if (!existsSync(requestsFile)) {
      return NextResponse.json({ requests: [] }, { status: 200 });
    }

    const fileContent = await readFile(requestsFile, "utf-8");
    const requests = JSON.parse(fileContent);

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

