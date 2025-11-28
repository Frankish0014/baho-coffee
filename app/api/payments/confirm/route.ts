import { NextRequest, NextResponse } from "next/server";
import { PaymentStorage } from "@/backend/lib/db/payments";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    // Get payment details
    const payment = await PaymentStorage.getPaymentByOrderId(orderId);

    if (!payment) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Send confirmation email if payment succeeded
    if (payment.paymentStatus === "succeeded" && resend) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "Baho Coffee <noreply@bahocoffee.com>",
          to: payment.customerEmail,
          subject: `Order Confirmation - ${orderId}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: #389158; color: white; padding: 20px; text-align: center; }
                  .content { background: #f9f9f9; padding: 20px; }
                  .order-details { background: white; padding: 15px; margin: 20px 0; border-radius: 5px; }
                  .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                  table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                  th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                  th { background: #f5f5f5; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Order Confirmed!</h1>
                  </div>
                  <div class="content">
                    <p>Dear ${payment.customerName},</p>
                    <p>Thank you for your order with Baho Coffee. Your payment has been successfully processed.</p>
                    
                    <div class="order-details">
                      <h2>Order Details</h2>
                      <p><strong>Order ID:</strong> ${orderId}</p>
                      <p><strong>Order Date:</strong> ${new Date(payment.id).toLocaleDateString()}</p>
                      <p><strong>Total Amount:</strong> $${payment.amount.toFixed(2)} ${payment.currency}</p>
                      
                      <h3>Items Ordered:</h3>
                      <table>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${payment.items.map((item: any) => `
                            <tr>
                              <td>${item.productName}</td>
                              <td>${item.quantity} kg</td>
                              <td>$${item.price.toFixed(2)}</td>
                              <td>$${item.total.toFixed(2)}</td>
                            </tr>
                          `).join("")}
                        </tbody>
                      </table>
                      
                      <h3>Shipping Address:</h3>
                      <p>
                        ${payment.shippingAddress}<br>
                        ${payment.shippingCity}, ${payment.shippingCountry}<br>
                        ${payment.shippingZip ? `ZIP: ${payment.shippingZip}` : ""}
                      </p>
                    </div>
                    
                    <p>We will process your order and send you a shipping confirmation once your coffee is on its way.</p>
                    <p>If you have any questions, please contact us at bahocoffee@gmail.com or +250 788 302 976.</p>
                  </div>
                  <div class="footer">
                    <p>Baho Coffee - Exporting specialty coffee from Rwanda</p>
                    <p>Kigali, Rwanda</p>
                  </div>
                </div>
              </body>
            </html>
          `,
        });
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      orderId,
      status: payment.paymentStatus,
    });
  } catch (error: any) {
    console.error("Error confirming payment:", error);
    return NextResponse.json(
      { error: error.message || "Failed to confirm payment" },
      { status: 500 }
    );
  }
}

