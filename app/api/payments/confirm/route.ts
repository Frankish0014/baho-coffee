import { NextRequest, NextResponse } from "next/server";
import { PaymentStorage } from "@/backend/lib/db/payments";
import { InventoryStorage } from "@/backend/lib/db/inventory";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

// Log email configuration status (only in development)
if (process.env.NODE_ENV === "development") {
  if (!resend) {
    console.warn("⚠️ Resend API key not configured. Emails will not be sent.");
  } else if (!process.env.RESEND_FROM_EMAIL) {
    console.warn("⚠️ RESEND_FROM_EMAIL not configured. Using default email address.");
  }
}

export async function POST(request: NextRequest) {
  try {
    // Initialize payments table if it doesn't exist
    try {
      await PaymentStorage.initialize();
    } catch (initError) {
      console.error("Error initializing payments table:", initError);
      // Continue anyway - might already exist
    }

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

    // Track if we need to update status and reduce inventory
    const needsStatusUpdate = payment.paymentStatus === "processing" || payment.paymentStatus === "pending";
    
    // Check if inventory was already reduced (to prevent double reduction)
    const inventoryAlreadyReduced = payment.metadata?.inventoryReduced === true;

    // Update payment status to succeeded if it's still processing
    if (needsStatusUpdate) {
      await PaymentStorage.updatePaymentStatus(orderId, "succeeded", payment.stripePaymentIntentId || "");
      // Refresh payment data
      const updatedPayment = await PaymentStorage.getPaymentByOrderId(orderId);
      if (updatedPayment) {
        Object.assign(payment, updatedPayment);
      }
    }

    // Reduce inventory for all items in the order if payment succeeded and inventory hasn't been reduced yet
    // This handles both cases: newly succeeded payments and already succeeded payments
    if (payment.paymentStatus === "succeeded" && !inventoryAlreadyReduced) {
      try {
        const inventoryItems = payment.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          productName: item.productName,
        }));
        
        // Log inventory reduction for debugging
        console.log(`📦 [Confirm] Reducing inventory for order ${orderId}`);
        console.log(`📦 [Confirm] Processing ${inventoryItems.length} product(s):`, inventoryItems.map(i => `${i.productId} (${i.quantity} kg)`).join(", "));
        
        // Reduce inventory for ALL products in the order
        const reductionResults = await InventoryStorage.reduceInventoryBatch(inventoryItems);
        
        // Check if all reductions were successful
        const allSuccessful = reductionResults.every(r => r.success);
        const failedProducts = reductionResults.filter(r => !r.success);
        
        if (failedProducts.length > 0) {
          console.warn(`⚠️ [Confirm] Some products failed to reduce inventory:`, failedProducts.map(f => `${f.productId}: ${f.error}`).join(", "));
        }
        
        // Mark inventory as reduced in payment metadata (even if some failed, we mark it to prevent retries)
        const updatedMetadata = {
          ...(payment.metadata || {}),
          inventoryReduced: true,
          inventoryReducedAt: new Date().toISOString(),
          reductionResults: reductionResults, // Store results for debugging
        };
        
        // Update payment metadata to track that inventory was reduced
        await PaymentStorage.updatePaymentMetadata(orderId, updatedMetadata);
        
        // Verify reduction was successful for each product
        console.log(`🔍 [Confirm] Verifying inventory reductions...`);
        for (const item of inventoryItems) {
          const updated = await InventoryStorage.getInventory(item.productId);
          if (updated) {
            console.log(`✅ [Confirm] ${item.productId}: Reduced ${item.quantity} kg. New total: ${updated.availableQuantity} kg`);
          } else {
            console.warn(`⚠️ [Confirm] Could not verify inventory reduction for ${item.productId}`);
          }
        }
        
        if (allSuccessful) {
          console.log(`✅ [Confirm] All ${inventoryItems.length} product(s) successfully reduced for order ${orderId}`);
        } else {
          console.warn(`⚠️ [Confirm] Inventory reduction completed with ${failedProducts.length} failure(s) for order ${orderId}`);
        }
      } catch (inventoryError) {
        console.error("❌ Error reducing inventory:", inventoryError);
        // Don't fail the payment confirmation if inventory update fails, but log it
      }
    } else if (payment.paymentStatus !== "succeeded") {
      console.log(`ℹ️ Payment ${orderId} status is "${payment.paymentStatus}", skipping inventory reduction`);
    } else if (inventoryAlreadyReduced) {
      console.log(`ℹ️ Inventory already reduced for order ${orderId}, skipping to prevent double reduction`);
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
        
        console.log(`✅ Confirmation email sent to ${payment.customerEmail} for order ${orderId}`);
        
        // Also send admin notification email
        if (process.env.ADMIN_EMAIL) {
          try {
            await resend.emails.send({
              from: process.env.RESEND_FROM_EMAIL || "Baho Coffee <noreply@bahocoffee.com>",
              to: process.env.ADMIN_EMAIL,
              subject: `New Order Received - ${orderId}`,
              html: `
                <h2>New Order Received</h2>
                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Customer:</strong> ${payment.customerName} (${payment.customerEmail})</p>
                <p><strong>Amount:</strong> $${payment.amount.toFixed(2)} ${payment.currency}</p>
                <p><strong>Payment Method:</strong> ${payment.paymentMethod}</p>
                <p><strong>Shipping:</strong> ${payment.shippingAddress}, ${payment.shippingCity}, ${payment.shippingCountry}</p>
                <p>View order details in your admin dashboard.</p>
              `,
            });
            console.log(`✅ Admin notification email sent to ${process.env.ADMIN_EMAIL} for order ${orderId}`);
          } catch (adminEmailError) {
            console.error("Error sending admin notification email:", adminEmailError);
          }
        }
      } catch (emailError: any) {
        console.error("Error sending confirmation email:", emailError);
        console.error("Email error details:", {
          message: emailError.message,
          status: emailError.status,
          response: emailError.response,
        });
        // Don't fail the request if email fails, but log it
      }
    } else {
      // Log why email wasn't sent
      if (!resend) {
        console.warn("⚠️ Resend API key not configured. Email not sent for order:", orderId);
      } else if (payment.paymentStatus !== "succeeded") {
        console.warn(`⚠️ Payment status is "${payment.paymentStatus}", not "succeeded". Email not sent for order:`, orderId);
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

