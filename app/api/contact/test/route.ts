import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: "RESEND_API_KEY is not set",
          hasApiKey: false 
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    
    // Try to send a test email
    const result = await resend.emails.send({
      from: "Baho Coffee <onboarding@resend.dev>",
      to: "test@example.com", // This will fail but we'll see the error
      subject: "Test Email",
      html: "<p>This is a test</p>",
    });

    return NextResponse.json({
      success: true,
      hasApiKey: true,
      apiKeyPrefix: apiKey.substring(0, 10) + "...",
      result,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      details: JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
      hasApiKey: !!process.env.RESEND_API_KEY,
    }, { status: 500 });
  }
}

