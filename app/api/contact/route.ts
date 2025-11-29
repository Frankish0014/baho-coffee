import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Storage } from "@/backend/lib/storage";
import { PostgresStorage } from "@/backend/lib/db/storage";

// Initialize Resend only when API key is available (lazy initialization)
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Save contact form submission
    const submissionData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name,
      email,
      subject,
      message,
    };

    let dataSaved = false;
    try {
      // Initialize Postgres if needed (only runs once)
      if (process.env.POSTGRES_URL) {
        await PostgresStorage.initialize();
      }
      
      // Save using storage utility (Postgres in production, file system in development)
      await Storage.saveContactSubmission(submissionData);
      console.log("✅ Contact submission saved successfully");
      dataSaved = true;
    } catch (saveError: any) {
      console.error("❌ Error saving submission:", saveError);
      console.error("Error details:", saveError?.message);
      // Continue - email will still be attempted
    }

    // Check if Resend API key is configured
    const hasResendKey = !!process.env.RESEND_API_KEY;

    // Send confirmation email to the user (if Resend is configured)
    // Note: For testing, use onboarding@resend.dev. For production, verify your domain in Resend
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const adminEmail = process.env.ADMIN_EMAIL || "bahocoffee@gmail.com";
    
    let emailSent = false;
    let emailError: any = null;
    
    const resend = getResend();
    if (!hasResendKey || !resend) {
      console.warn("⚠️ RESEND_API_KEY is not configured - skipping email");
      console.warn("💡 To enable email notifications, add RESEND_API_KEY to your .env.local file");
    } else {
      try {
        const emailResult = await resend.emails.send({
        from: `Baho Coffee <${fromEmail}>`,
        to: email,
        subject: "Thank you for contacting Baho Coffee",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Thank you for contacting Baho Coffee</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background-color: #8B4513; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="margin: 0; font-size: 28px;">Baho Coffee</h1>
              </div>
              <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                <h2 style="color: #8B4513; margin-top: 0;">Thank You for Contacting Us!</h2>
                <p>Dear ${name},</p>
                <p>Thank you for contacting Baho Coffee Company. We have received your message and appreciate you taking the time to reach out to us.</p>
                <p>Our team will review your inquiry and get back to you as soon as possible. We typically respond within 24-48 hours during business days.</p>
                <div style="background-color: white; padding: 20px; border-left: 4px solid #8B4513; margin: 20px 0;">
                  <p style="margin: 0;"><strong>Your Message:</strong></p>
                  <p style="margin: 10px 0 0 0; color: #666;">${message}</p>
                </div>
                <p>If you have any urgent inquiries, please feel free to contact us directly at <a href="mailto:info@bahocoffee.com" style="color: #8B4513;">info@bahocoffee.com</a>.</p>
                <p>Best regards,<br><strong>The Baho Coffee Team</strong></p>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                <p style="font-size: 12px; color: #999; text-align: center;">
                  Baho Coffee | Kigali, Rwanda<br>
                  Exporting specialty coffee from Rwanda to the world
                </p>
              </div>
            </body>
          </html>
        `,
      });
      
        console.log("✅ Email sent successfully!");
        console.log("Email result:", JSON.stringify(emailResult, null, 2));
        emailSent = true;
      } catch (err: any) {
        emailError = err;
        console.error("❌ EMAIL SENDING FAILED!");
        console.error("Error type:", err?.constructor?.name);
        console.error("Error message:", err?.message);
        console.error("Error code:", err?.code);
        console.error("Error name:", err?.name);
        console.error("Full error:", JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
        
        // Check for specific Resend error types
        if (err?.response) {
          console.error("Resend API response:", JSON.stringify(err.response, null, 2));
        }
      }
    }

    // Optional: Send notification email to your team
    // Uncomment and update the email below to receive notifications
    /*
    await resend.emails.send({
      from: "Baho Coffee <onboarding@resend.dev>",
      to: "info@bahocoffee.com", // Your company email
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    */

    // Return response based on email and save status
    if (emailSent && dataSaved) {
      return NextResponse.json(
        { 
          message: "Message sent successfully! Check your email inbox (not spam) for confirmation.",
          success: true 
        },
        { status: 200 }
      );
    } else if (emailSent && !dataSaved) {
      return NextResponse.json(
        { 
          message: "Message sent successfully! Check your email inbox (not spam) for confirmation.",
          warning: "Your message was sent, but could not be saved to the database.",
          success: true
        },
        { status: 200 }
      );
    } else if (!emailSent && dataSaved) {
      // Message saved but email not sent (either not configured or failed)
      if (!hasResendKey) {
        return NextResponse.json(
          { 
            message: "Your message has been received and saved! We'll contact you soon. (Email notifications are not configured on this server.)",
            success: true,
            saved: true,
            emailConfigured: false
          },
          { status: 200 }
        );
      } else {
        const errorMsg = emailError?.message || "Unknown error";
        return NextResponse.json(
          { 
            message: "Your message has been received and saved! However, we couldn't send a confirmation email. We'll contact you directly.",
            success: true,
            saved: true,
            emailError: errorMsg
          },
          { status: 200 }
        );
      }
    } else if (!emailSent && !dataSaved) {
      // Neither email nor save worked
      if (!hasResendKey) {
        return NextResponse.json(
          { 
            error: "Your message could not be saved. Please try again or contact us directly. (Email service is not configured.)",
            saved: false,
            emailConfigured: false
          },
          { status: 500 }
        );
      } else {
        const errorMsg = emailError?.message || "Unknown error";
        return NextResponse.json(
          { 
            error: `Failed to send message and save data. Error: ${errorMsg}. Please try again or contact us directly.`,
            saved: false
          },
          { status: 500 }
        );
      }
    } else {
      // This shouldn't happen, but handle it
      return NextResponse.json(
        { 
          message: "Your message has been received! We'll contact you soon.",
          success: true
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Error sending email:", error);
    
    // Provide more detailed error message
    let errorMessage = "Failed to send message. Please try again later.";
    
    if (error?.message) {
      console.error("Error details:", error.message);
      if (error.message.includes("API key")) {
        errorMessage = "Email service configuration error. Please contact support.";
      } else if (error.message.includes("domain") || error.message.includes("from")) {
        errorMessage = "Email service configuration error. The sender email needs to be verified.";
      } else {
        errorMessage = `Error: ${error.message}`;
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

