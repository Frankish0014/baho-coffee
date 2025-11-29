import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Storage } from "@/backend/lib/storage";
import { PostgresStorage } from "@/backend/lib/db/storage";

// Initialize Resend only when API key is available
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
    const { companyName, name, email, message } = body;

    // Validate required fields
    if (!companyName || !name || !email || !message) {
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

    // Save roaster contact submission
    const submissionData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name,
      email,
      subject: `Roaster Partnership Inquiry from ${companyName}`,
      message: `Company: ${companyName}\n\n${message}`,
    };

    let dataSaved = false;
    try {
      // Initialize Postgres if needed
      if (process.env.POSTGRES_URL) {
        await PostgresStorage.initialize();
      }
      
      // Save using storage utility
      await Storage.saveContactSubmission(submissionData);
      console.log("✅ Roaster contact submission saved successfully");
      dataSaved = true;
    } catch (saveError: any) {
      console.error("❌ Error saving submission:", saveError);
      // Continue - email will still be attempted
    }

    // Check if Resend API key is configured
    const hasResendKey = !!process.env.RESEND_API_KEY;

    // Send confirmation email to the user (if Resend is configured)
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
        // Send confirmation email to the roaster
        const confirmationEmail = await resend.emails.send({
          from: `Baho Coffee <${fromEmail}>`,
          to: email,
          subject: "Thank you for contacting Baho Coffee - Roaster Partnership",
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Thank you for contacting Baho Coffee</title>
              </head>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
                <div style="background-color: #389158; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                  <h1 style="margin: 0; font-size: 28px;">Baho Coffee</h1>
                  <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Roaster Partnership Inquiry</p>
                </div>
                <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <h2 style="color: #389158; margin-top: 0;">Thank You for Your Interest!</h2>
                  <p>Dear ${name},</p>
                  <p>Thank you for reaching out to Baho Coffee regarding a roaster partnership. We have received your message and are excited about the possibility of working together.</p>
                  <p>Our roaster relations team will review your inquiry and get back to you within 24-48 hours during business days.</p>
                  <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #389158; margin: 20px 0; border-radius: 4px;">
                    <p style="margin: 0 0 10px 0;"><strong>Your Details:</strong></p>
                    <p style="margin: 5px 0;"><strong>Company:</strong> ${companyName}</p>
                    <p style="margin: 5px 0;"><strong>Your Name:</strong> ${name}</p>
                    <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                    <p style="margin: 15px 0 5px 0;"><strong>Your Message:</strong></p>
                    <p style="margin: 10px 0 0 0; color: #666; white-space: pre-wrap;">${message}</p>
                  </div>
                  <p>We look forward to discussing how we can support your roastery with premium Rwandan specialty coffee.</p>
                  <p>If you have any urgent inquiries, please feel free to contact us directly at <a href="mailto:${adminEmail}" style="color: #389158; text-decoration: none;">${adminEmail}</a> or call us at +250 788 302 976.</p>
                  <p style="margin-top: 30px;">Best regards,<br><strong>The Baho Coffee Roaster Relations Team</strong></p>
                  <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                  <p style="font-size: 12px; color: #999; text-align: center;">
                    Baho Coffee | Kigali, Rwanda<br>
                    Exporting specialty coffee from Rwanda to the world<br>
                    <a href="https://bahocoffee.com" style="color: #389158; text-decoration: none;">www.bahocoffee.com</a>
                  </p>
                </div>
              </body>
            </html>
          `,
        });
        
        console.log("✅ Confirmation email sent successfully!");
        emailSent = true;

        // Send notification email to admin
        try {
          await resend.emails.send({
            from: `Baho Coffee <${fromEmail}>`,
            to: adminEmail,
            subject: `New Roaster Partnership Inquiry from ${companyName}`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <title>New Roaster Partnership Inquiry</title>
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background-color: #389158; color: white; padding: 20px; border-radius: 10px 10px 0 0;">
                    <h2 style="margin: 0;">New Roaster Partnership Inquiry</h2>
                  </div>
                  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px;">
                    <p><strong>Company Name:</strong> ${companyName}</p>
                    <p><strong>Contact Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <div style="background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #389158;">
                      <p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
                      <p style="margin: 0; color: #666; white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="margin-top: 20px;"><a href="mailto:${email}" style="background-color: #389158; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reply to ${name}</a></p>
                  </div>
                </body>
              </html>
            `,
          });
          console.log("✅ Admin notification email sent successfully!");
        } catch (adminEmailError) {
          console.error("❌ Failed to send admin notification email:", adminEmailError);
          // Don't fail the request if admin email fails
        }
      } catch (err: any) {
        emailError = err;
        console.error("❌ EMAIL SENDING FAILED!");
        console.error("Error message:", err?.message);
      }
    }

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
    console.error("Error processing roaster contact:", error);
    
    let errorMessage = "Failed to send message. Please try again later.";
    
    if (error?.message) {
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

