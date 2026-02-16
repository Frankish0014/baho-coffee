import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Storage } from "@/backend/lib/storage";
import { PostgresStorage } from "@/backend/lib/db/storage";
import {
  sanitizeEmail,
  validateName,
  validateCompany,
  validateCountryName,
  validatePhone,
  validateMessage,
  validateProductId,
  sanitizeString
} from "@/backend/lib/security";

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
    let { name, email, company, phone, country, message, productId, productName } = body;

    // Validate required fields
    if (!name || !email || !phone || !country || !productId || !productName) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Validate and sanitize all inputs using regex
    try {
      name = validateName(name);
      email = sanitizeEmail(email);
      phone = validatePhone(phone);
      country = validateCountryName(country);
      productId = String(productId);
      productName = sanitizeString(productName, 200);
      
      if (!validateProductId(productId)) {
        return NextResponse.json(
          { error: "Invalid product ID format" },
          { status: 400 }
        );
      }
      
      if (company) {
        company = validateCompany(company);
      }
      
      if (message) {
        message = validateMessage(message);
      }
    } catch (validationError: any) {
      return NextResponse.json(
        { error: validationError.message || "Invalid input format" },
        { status: 400 }
      );
    }

    // Save sample request submission
    const submissionData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name,
      email,
      company: company || "",
      phone,
      country,
      message: message || "",
      productId,
      productName,
    };

    let dataSaved = false;
    try {
      // Initialize Postgres if needed (only runs once)
      if (process.env.POSTGRES_URL) {
        await PostgresStorage.initialize();
      }
      
      // Save using storage utility (Postgres in production, file system in development)
      await Storage.saveSampleRequest(submissionData);
      console.log("✅ Sample request saved successfully");
      dataSaved = true;
    } catch (saveError: any) {
      console.error("❌ Error saving sample request:", saveError);
      console.error("Error details:", saveError?.message);
      // Continue - email will still be attempted
    }

    // Check if Resend API key is configured
    const hasResendKey = !!process.env.RESEND_API_KEY;

    // Send confirmation email to the user (if Resend is configured)
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    
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
        subject: `Sample Request Received - ${productName}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Sample Request Received - Baho Coffee</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background-color: #2a7445; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="margin: 0; font-size: 28px;">Baho Coffee</h1>
              </div>
              <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                <h2 style="color: #2a7445; margin-top: 0;">Sample Request Received!</h2>
                <p>Dear ${name},</p>
                <p>Thank you for your interest in our specialty coffee. We have received your sample request and are excited to share our premium Rwandan coffee with you!</p>
                
                <div style="background-color: white; padding: 20px; border-left: 4px solid #2a7445; margin: 20px 0;">
                  <p style="margin: 0; font-weight: bold; color: #2a7445;">Product Requested:</p>
                  <p style="margin: 10px 0 0 0; font-size: 18px;">${productName}</p>
                </div>
                
                <div style="background-color: white; padding: 20px; border-left: 4px solid #2a7445; margin: 20px 0;">
                  <p style="margin: 0; font-weight: bold; color: #2a7445;">Your Details:</p>
                  <p style="margin: 10px 0 0 0;">
                    <strong>Name:</strong> ${name}<br>
                    ${company ? `<strong>Company:</strong> ${company}<br>` : ''}
                    <strong>Email:</strong> ${email}<br>
                    <strong>Phone:</strong> ${phone}<br>
                    <strong>Country:</strong> ${country}
                  </p>
                </div>
                
                ${message ? `
                <div style="background-color: white; padding: 20px; border-left: 4px solid #2a7445; margin: 20px 0;">
                  <p style="margin: 0; font-weight: bold; color: #2a7445;">Your Message:</p>
                  <p style="margin: 10px 0 0 0; color: #666;">${message}</p>
                </div>
                ` : ''}
                
                <p>Our team will review your request and contact you within 1-2 business days to discuss your sample requirements and arrange delivery.</p>
                
                <p>If you have any questions or need immediate assistance, please feel free to contact us directly at <a href="mailto:info@bahocoffee.com" style="color: #2a7445; text-decoration: none;">info@bahocoffee.com</a> or through WhatsApp.</p>
                
                <p>We look forward to sharing the exceptional quality of Rwandan specialty coffee with you!</p>
                
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
      
        console.log("✅ Confirmation email sent successfully!");
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
      }
    }

    // Return response based on email and save status
    if (emailSent && dataSaved) {
      return NextResponse.json(
        { 
          message: "Sample request submitted successfully! Check your email inbox (including spam folder) for confirmation.",
          success: true 
        },
        { status: 200 }
      );
    } else if (emailSent && !dataSaved) {
      return NextResponse.json(
        { 
          message: "Sample request submitted successfully! Check your email inbox for confirmation.",
          warning: "Your request was submitted, but could not be saved to the database.",
          success: true
        },
        { status: 200 }
      );
    } else if (!emailSent && dataSaved) {
      // Request saved but email not sent (either not configured or failed)
      if (!hasResendKey) {
        return NextResponse.json(
          { 
            message: "Your sample request has been received and saved! We'll contact you soon. (Email notifications are not configured on this server.)",
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
            message: "Your sample request has been received and saved! However, we couldn't send a confirmation email. We'll contact you directly.",
            success: true,
            saved: true,
            emailError: errorMsg
          },
          { status: 200 }
        );
      }
    } else {
      // Request saved but email not sent
      return NextResponse.json(
        { 
          message: "Your sample request has been received! We'll contact you soon.",
          success: true
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Error processing sample request:", error);
    
    let errorMessage = "Failed to submit sample request. Please try again later.";
    
    if (error?.message) {
      console.error("Error details:", error.message);
      errorMessage = `Error: ${error.message}`;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

