import { NextRequest, NextResponse } from "next/server";
import { NewsletterStorage } from "@/backend/lib/db/newsletter";
import { Resend } from "resend";
import { sanitizeEmail } from "@/backend/lib/security";

const resend = process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

export async function POST(request: NextRequest) {
  try {
    // Initialize newsletter table if it doesn't exist
    try {
      await NewsletterStorage.initialize();
    } catch (initError) {
      console.error("Error initializing newsletter table:", initError);
      // Continue anyway - might already exist
    }

    const body = await request.json();
    let { email } = body;

    if (!email || typeof email !== "string" || email.trim() === "") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate and sanitize email using regex
    try {
      email = sanitizeEmail(email);
    } catch (validationError: any) {
      return NextResponse.json(
        { error: validationError.message || "Invalid email format" },
        { status: 400 }
      );
    }

    // Subscribe the email
    const result = await NewsletterStorage.subscribe(email);

    // Send welcome email automatically if Resend is configured
    if (resend && result.success) {
      try {
        const emailSubject = result.alreadySubscribed 
          ? "Welcome back to Baho Coffee Newsletter!" 
          : "Welcome to Baho Coffee Newsletter!";
        
        await resend.emails.send({
          // Always send newsletter confirmations from noreply@bahocoffee.com
          from: "Baho Coffee <noreply@bahocoffee.com>",
          to: email,
          subject: emailSubject,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: #389158; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                  .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                  .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                  .button { display: inline-block; background: #389158; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Welcome to Baho Coffee!</h1>
                  </div>
                  <div class="content">
                    <p>Thank you for subscribing to our newsletter!</p>
                    <p>You'll now receive weekly updates about:</p>
                    <ul>
                      <li>✨ New coffee products and seasonal offerings</li>
                      <li>🌍 Stories from our washing stations in Rwanda</li>
                      <li>☕ Coffee brewing tips and recipes</li>
                      <li>🌱 Sustainability initiatives and farmer stories</li>
                      <li>📅 Events and special promotions</li>
                    </ul>
                    <p>We're excited to share our journey with you!</p>
                    <p>Warm regards,<br/>The Baho Coffee Team</p>
                  </div>
                  <div class="footer">
                    <p>Baho Coffee - Exporting specialty coffee from Rwanda</p>
                    <p>Kigali, Rwanda | <a href="mailto:bahocoffee@gmail.com">bahocoffee@gmail.com</a></p>
                    <p style="margin-top: 20px; font-size: 11px; color: #999;">
                      <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://bahocoffee.com'}/newsletter/unsubscribe?email=${encodeURIComponent(email)}" style="color: #999;">Unsubscribe</a>
                    </p>
                  </div>
                </div>
              </body>
            </html>
          `,
        });
        console.log(`✅ Welcome email sent to ${email}`);
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError);
        // Don't fail the subscription if email fails
      }
    }

    return NextResponse.json({
      success: result.success,
      message: result.message,
      alreadySubscribed: result.alreadySubscribed,
    });
  } catch (error: any) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json(
      { 
        error: error.message || "Failed to subscribe to newsletter",
        success: false,
      },
      { status: 500 }
    );
  }
}