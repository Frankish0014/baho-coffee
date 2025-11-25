import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Storage } from "@/lib/storage";

// Initialize Resend only when API key is available (lazy initialization)
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
};

export async function POST(request: NextRequest) {
  console.log("🚀 QUOTATION API ROUTE CALLED at", new Date().toISOString());
  
  try {
    console.log("📥 Request received, parsing body...");
    
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact the administrator." },
        { status: 500 }
      );
    }

    console.log("✅ RESEND_API_KEY is present");
    const body = await request.json();
    console.log("✅ Body parsed successfully");
    console.log("📋 Request body fields:", Object.keys(body));
    const { name, email, company, country, phone, productInterest, quantity, message } = body;

    console.log("🔍 Validating fields...");
    // Validate required fields
    if (!name || !email || !company || !country || !phone || !quantity) {
      console.error("❌ Validation failed - missing required fields");
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }
    console.log("✅ All required fields present");

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Validate product interest
    if (!productInterest || productInterest.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one product of interest" },
        { status: 400 }
      );
    }

    // Save quotation request
    const quotationData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name,
      email,
      company,
      country,
      phone,
      productInterest,
      quantity,
      message: message || "",
    };

    try {
      // Save using storage utility (Vercel KV in production, file system in development)
      await Storage.append("quotation-requests", quotationData);
      console.log("✅ Quotation request saved successfully");
    } catch (saveError) {
      console.error("❌ Error saving quotation:", saveError);
      // Continue even if saving fails - email will still be sent
    }

    // Send confirmation email to the user
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    
    console.log("=== QUOTATION EMAIL SENDING ATTEMPT ===");
    console.log("From:", fromEmail);
    console.log("To:", email);
    console.log("API Key present:", !!process.env.RESEND_API_KEY);
    console.log("API Key first 10 chars:", process.env.RESEND_API_KEY?.substring(0, 10) + "...");
    
    const resend = getResend();
    if (!resend) {
      console.error("RESEND_API_KEY is not configured - skipping email");
    }
    
    let emailSent = false;
    let emailError: any = null;
    
    // Get product names for email
    const productNames = productInterest.map((id: string) => {
      const products: { [key: string]: string } = {
        "1": "Bugoyi Washed",
        "2": "Humure Washed",
        "3": "Matyazo Natural",
        "4": "Kinazi Washed",
      };
      return products[id] || `Product ${id}`;
    }).join(", ");

    // Format current date for quotation
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const quotationNumber = `QT-${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;

    // Escape HTML in user input to prevent XSS
    const escapeHtml = (text: string) => {
      if (!text) return '';
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company);
    const safeCountry = escapeHtml(country);
    const safePhone = escapeHtml(phone);
    const safeQuantity = escapeHtml(quantity);
    const safeProductNames = escapeHtml(productNames);
    const safeMessage = message ? escapeHtml(message).replace(/\n/g, '<br>') : '';

    try {
      console.log("Preparing email with data:", {
        from: fromEmail,
        to: email,
        quotationNumber,
        productCount: productInterest.length
      });

      // Validate email address
      if (!email || !email.includes('@')) {
        throw new Error(`Invalid email address: ${email}`);
      }

      // Test HTML template construction
      console.log("Testing HTML template construction...");
      try {
        // Test if template variables are valid
        const testTemplate = `Test: ${safeName}, ${safeEmail}, ${safeCompany}`;
        console.log("✅ Template variables are valid");
      } catch (templateError: any) {
        console.error("❌ Template construction error:", templateError);
        throw new Error(`Template error: ${templateError.message}`);
      }

      if (!resend) {
        throw new Error("Resend API key is not configured");
      }
      
      console.log("Calling resend.emails.send...");
      
      // Create plain text version for better deliverability
      const plainText = `
BAHO COFFEE
Specialty Coffee Exporters | Kigali, Rwanda

QUOTATION REQUEST ACKNOWLEDGMENT
Reference: ${quotationNumber}
Date: ${formattedDate}
Valid Until: ${new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

To:
${safeName}
${safeCompany}
${safeCountry}
Email: ${safeEmail} | Phone: ${safePhone}

Dear ${safeName},

Thank you for your interest in Baho Coffee. We acknowledge receipt of your quotation request dated ${formattedDate} and appreciate the opportunity to serve your coffee import needs.

REQUEST SUMMARY:
- Requested Quantity: ${safeQuantity} kg
- Products of Interest: ${safeProductNames}
${safeMessage ? `- Additional Notes: ${safeMessage.replace(/<br>/g, '\n')}` : ''}

Our export team is currently reviewing your requirements and will prepare a comprehensive quotation that includes:
- Detailed pricing per product (FOB Kigali, Rwanda)
- Product specifications and quality certificates
- Packaging options and specifications
- Payment terms and conditions
- Shipping and delivery terms (Incoterms)
- Minimum order quantities
- Lead times and production schedules

We typically respond to quotation requests within 24-48 hours during business days (Monday - Friday, 8:00 AM - 5:00 PM EAT).

For inquiries, please contact:
Export Department
Email: export@bahocoffee.com
Phone: +250 XXX XXX XXX
Website: www.bahocoffee.com

Best regards,
The Baho Coffee Export Team

---
Baho Coffee Company | Kigali, Rwanda
Exporting specialty coffee from Rwanda to the world
      `.trim();

      console.log("Sending email with:", {
        from: fromEmail,
        to: email,
        hasPlainText: !!plainText,
        hasHtml: true
      });

      const emailResult = await resend.emails.send({
        from: `Baho Coffee <${fromEmail}>`,
        to: email,
        // replyTo removed - can cause issues if domain not verified
        subject: `Quotation Request Acknowledgment - ${quotationNumber} | Baho Coffee`,
        text: plainText, // Add plain text version
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Quotation Request Acknowledgment - Baho Coffee</title>
            </head>
            <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
                <tr>
                  <td align="center">
                    <table width="650" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      <!-- Header -->
                      <tr>
                        <td style="background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%); padding: 40px 30px; text-align: center;">
                          <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 1px;">BAHO COFFEE</h1>
                          <p style="margin: 10px 0 0 0; color: #f5f5f5; font-size: 14px; font-weight: 300;">Specialty Coffee Exporters | Kigali, Rwanda</p>
                        </td>
                      </tr>
                      
                      <!-- Company Information -->
                      <tr>
                        <td style="padding: 25px 30px; background-color: #fafafa; border-bottom: 2px solid #e0e0e0;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="vertical-align: top; width: 50%;">
                                <p style="margin: 0 0 8px 0; font-size: 12px; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Company Details</p>
                                <p style="margin: 0 0 5px 0; font-size: 13px; color: #333;"><strong>Baho Coffee Company</strong></p>
                                <p style="margin: 0 0 5px 0; font-size: 12px; color: #666;">Kigali, Rwanda</p>
                                <p style="margin: 0 0 5px 0; font-size: 12px; color: #666;">TIN: [To be provided]</p>
                                <p style="margin: 0 0 5px 0; font-size: 12px; color: #666;">Reg. No: [To be provided]</p>
                              </td>
                              <td style="vertical-align: top; width: 50%; text-align: right;">
                                <p style="margin: 0 0 8px 0; font-size: 12px; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Quotation Details</p>
                                <p style="margin: 0 0 5px 0; font-size: 13px; color: #333;"><strong>Reference:</strong> ${quotationNumber}</p>
                                <p style="margin: 0 0 5px 0; font-size: 12px; color: #666;"><strong>Date:</strong> ${formattedDate}</p>
                                <p style="margin: 0; font-size: 12px; color: #666;"><strong>Valid Until:</strong> ${new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Recipient Information -->
                      <tr>
                        <td style="padding: 25px 30px;">
                          <p style="margin: 0 0 8px 0; font-size: 12px; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">To:</p>
                          <p style="margin: 0 0 3px 0; font-size: 15px; color: #333; font-weight: 600;">${safeName}</p>
                          <p style="margin: 0 0 3px 0; font-size: 13px; color: #666;">${safeCompany}</p>
                          <p style="margin: 0 0 3px 0; font-size: 13px; color: #666;">${safeCountry}</p>
                          <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Email: ${safeEmail} | Phone: ${safePhone}</p>
                        </td>
                      </tr>
                      
                      <!-- Main Content -->
                      <tr>
                        <td style="padding: 25px 30px;">
                          <p style="margin: 0 0 20px 0; font-size: 15px; color: #333;">Dear ${safeName},</p>
                          <p style="margin: 0 0 20px 0; font-size: 14px; color: #555; text-align: justify;">
                            Thank you for your interest in <strong>Baho Coffee</strong>. We acknowledge receipt of your quotation request dated ${formattedDate} and appreciate the opportunity to serve your coffee import needs.
                          </p>
                          
                          <!-- Request Summary Box -->
                          <div style="background-color: #f9f9f9; border-left: 4px solid #8B4513; padding: 20px; margin: 25px 0; border-radius: 4px;">
                            <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #8B4513; font-weight: 600;">REQUEST SUMMARY</h3>
                            <table width="100%" cellpadding="5" cellspacing="0" style="font-size: 13px;">
                              <tr>
                                <td style="padding: 8px 0; color: #666; width: 40%;"><strong>Requested Quantity:</strong></td>
                                <td style="padding: 8px 0; color: #333; font-weight: 600;">${safeQuantity} kg</td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0; color: #666;"><strong>Products of Interest:</strong></td>
                                <td style="padding: 8px 0; color: #333;">${safeProductNames}</td>
                              </tr>
                              ${safeMessage ? `
                              <tr>
                                <td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Additional Notes:</strong></td>
                                <td style="padding: 8px 0; color: #333;">${safeMessage}</td>
                              </tr>
                              ` : ''}
                            </table>
                          </div>
                          
                          <p style="margin: 20px 0; font-size: 14px; color: #555; text-align: justify;">
                            Our export team is currently reviewing your requirements and will prepare a comprehensive quotation that includes:
                          </p>
                          
                          <ul style="margin: 15px 0; padding-left: 25px; font-size: 14px; color: #555; line-height: 1.8;">
                            <li>Detailed pricing per product (FOB Kigali, Rwanda)</li>
                            <li>Product specifications and quality certificates</li>
                            <li>Packaging options and specifications</li>
                            <li>Payment terms and conditions</li>
                            <li>Shipping and delivery terms (Incoterms)</li>
                            <li>Minimum order quantities</li>
                            <li>Lead times and production schedules</li>
                          </ul>
                          
                          <p style="margin: 20px 0; font-size: 14px; color: #555; text-align: justify;">
                            We typically respond to quotation requests within <strong>24-48 hours</strong> during business days (Monday - Friday, 8:00 AM - 5:00 PM EAT). For urgent inquiries, please contact our export department directly.
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Terms & Conditions Section -->
                      <tr>
                        <td style="padding: 25px 30px; background-color: #fafafa; border-top: 2px solid #e0e0e0;">
                          <h3 style="margin: 0 0 15px 0; font-size: 15px; color: #8B4513; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">General Terms & Conditions</h3>
                          <div style="font-size: 11px; color: #666; line-height: 1.6;">
                            <p style="margin: 0 0 10px 0;"><strong>1. Quotation Validity:</strong> This quotation acknowledgment is valid for 30 days from the date of issue. Prices are subject to change based on market conditions and availability.</p>
                            <p style="margin: 0 0 10px 0;"><strong>2. Payment Terms:</strong> Standard payment terms will be specified in the final quotation. Typically includes advance payment and balance upon shipment confirmation.</p>
                            <p style="margin: 0 0 10px 0;"><strong>3. Delivery Terms:</strong> All shipments are subject to Incoterms 2020. Standard terms: FOB Kigali, Rwanda. Alternative terms (CIF, EXW) available upon request.</p>
                            <p style="margin: 0 0 10px 0;"><strong>4. Quality Standards:</strong> All products meet specialty coffee standards and are traceable to origin. Certificates of Origin, Quality Analysis Reports, and other documentation provided.</p>
                            <p style="margin: 0 0 10px 0;"><strong>5. Compliance:</strong> All exports comply with Rwanda Revenue Authority (RRA) regulations and international trade standards. Required documentation will be provided.</p>
                            <p style="margin: 0;"><strong>6. Force Majeure:</strong> Baho Coffee shall not be liable for delays or failures due to circumstances beyond reasonable control, including but not limited to natural disasters, government actions, or market disruptions.</p>
                          </div>
                        </td>
                      </tr>
                      
                      <!-- Contact Information -->
                      <tr>
                        <td style="padding: 25px 30px; background-color: #ffffff;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="vertical-align: top;">
                                <p style="margin: 0 0 10px 0; font-size: 13px; color: #333; font-weight: 600;">For inquiries, please contact:</p>
                                <p style="margin: 0 0 5px 0; font-size: 12px; color: #666;"><strong>Export Department</strong></p>
                                <p style="margin: 0 0 3px 0; font-size: 12px; color: #666;">Email: <a href="mailto:export@bahocoffee.com" style="color: #8B4513; text-decoration: underline;">export@bahocoffee.com</a></p>
                                <p style="margin: 0 0 3px 0; font-size: 12px; color: #666;">Phone: +250 XXX XXX XXX</p>
                                <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Website: <a href="https://bahocoffee.com" style="color: #8B4513; text-decoration: underline;">bahocoffee.com</a></p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Closing -->
                      <tr>
                        <td style="padding: 25px 30px; border-top: 1px solid #e0e0e0;">
                          <p style="margin: 0 0 15px 0; font-size: 14px; color: #555;">We look forward to the opportunity to serve you and build a lasting business relationship.</p>
                          <p style="margin: 0 0 5px 0; font-size: 14px; color: #333;">Best regards,</p>
                          <p style="margin: 0 0 20px 0; font-size: 14px; color: #333; font-weight: 600;">The Baho Coffee Export Team</p>
                          <p style="margin: 0; font-size: 11px; color: #999; font-style: italic;">This is an automated acknowledgment. A detailed quotation will follow within 24-48 hours.</p>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #2c2c2c; padding: 20px 30px; text-align: center;">
                          <p style="margin: 0 0 8px 0; font-size: 11px; color: #999;">
                            <strong style="color: #fff;">Baho Coffee Company</strong> | Kigali, Rwanda
                          </p>
                          <p style="margin: 0 0 5px 0; font-size: 10px; color: #999;">
                            Exporting specialty coffee from Rwanda to the world
                          </p>
                          <p style="margin: 10px 0 0 0; font-size: 10px; color: #666;">
                            This email and any attachments are confidential and intended solely for the addressee. If you are not the intended recipient, please delete this email and notify the sender immediately.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });
      
      console.log("✅ Quotation email sent successfully!");
      console.log("Email result type:", typeof emailResult);
      console.log("Email result:", JSON.stringify(emailResult, null, 2));
      
      // If we get here without an error, the email was sent successfully
      // Resend may return different response structures, so we just check if call succeeded
      emailSent = true;
      // Type-safe check: Resend response can have 'data' with 'id' or just 'id' directly
      const responseId = (emailResult as any)?.data?.id || (emailResult as any)?.id;
      if (responseId) {
        console.log("✅ Email confirmed sent with ID:", responseId);
      } else {
        console.log("✅ Email sent successfully (no ID in response, but call succeeded)");
      }
    } catch (err: any) {
      emailError = err;
      console.error("❌ QUOTATION EMAIL SENDING FAILED!");
      console.error("Error occurred at:", new Date().toISOString());
      console.error("Error type:", err?.constructor?.name);
      console.error("Error message:", err?.message);
      console.error("Error code:", err?.code);
      console.error("Error name:", err?.name);
      console.error("Error stack:", err?.stack);
      console.error("Full error object:", err);
      console.error("Full error JSON:", JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
      
      // Check for specific Resend error types
      if (err?.response) {
        console.error("Resend API response:", JSON.stringify(err.response, null, 2));
      }
      
      // Don't re-throw - we want to return a proper error response
      // The error is already logged above
    }

    // Return response based on email status
    if (emailSent) {
      console.log("✅ Returning success response to client");
      return NextResponse.json(
        { message: "Quotation request submitted successfully! Check your email for confirmation." },
        { status: 200 }
      );
    } else {
      // Data was saved, but email failed
      const errorMsg = emailError?.message || "Unknown error";
      console.error("❌ Returning error response to client - email failed");
      console.error("Error message to client:", errorMsg);
      return NextResponse.json(
        { 
          error: `Your quotation request was saved, but we couldn't send the confirmation email. Error: ${errorMsg}. Please contact us directly if needed.`,
          saved: true // Indicate data was saved
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("❌❌❌ OUTER CATCH - Error processing quotation request ❌❌❌");
    console.error("Error type:", error?.constructor?.name);
    console.error("Error message:", error?.message);
    console.error("Error stack:", error?.stack);
    console.error("Full error:", error);
    console.error("Error JSON:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    
    // Provide more detailed error message
    let errorMessage = "Failed to submit quotation request. Please try again later.";
    
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
    
    console.error("Returning error to client:", errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

