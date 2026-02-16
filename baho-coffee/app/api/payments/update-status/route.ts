import { NextRequest, NextResponse } from "next/server";
import { PaymentStorage } from "@/backend/lib/db/payments";
import { InventoryStorage } from "@/backend/lib/db/inventory";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ["pending", "processing", "succeeded", "failed", "canceled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be one of: " + validStatuses.join(", ") },
        { status: 400 }
      );
    }

    // Get current payment details
    const payment = await PaymentStorage.getPaymentByOrderId(orderId);

    if (!payment) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Update payment status
    await PaymentStorage.updatePaymentStatus(orderId, status as any);
    
    // Refresh payment data to get updated status and metadata
    const refreshedPayment = await PaymentStorage.getPaymentByOrderId(orderId);
    if (!refreshedPayment) {
      return NextResponse.json(
        { error: "Payment not found after update" },
        { status: 404 }
      );
    }

    // Use refreshed payment data for all subsequent operations
    const currentPayment = refreshedPayment;

    // If status is "succeeded", reduce inventory and send confirmation email
    if (status === "succeeded") {
      // Check if inventory was already reduced (to prevent double reduction)
      // Use the refreshed payment's metadata to ensure we have the latest data
      console.log(`🔍 [Update Status] Checking inventory reduction status for order ${orderId}`);
      console.log(`🔍 [Update Status] Current payment metadata:`, JSON.stringify(currentPayment.metadata, null, 2));
      const inventoryAlreadyReduced = currentPayment.metadata?.inventoryReduced === true;
      console.log(`🔍 [Update Status] Inventory already reduced? ${inventoryAlreadyReduced}`);
      
      // Reduce inventory if not already reduced
      if (!inventoryAlreadyReduced) {
        try {
          const inventoryItems = currentPayment.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            productName: item.productName,
          }));
          
          // Log inventory reduction for debugging
          console.log(`📦 [Update Status] Reducing inventory for order ${orderId}`);
          console.log(`📦 [Update Status] Processing ${inventoryItems.length} product(s):`, inventoryItems.map(i => `${i.productId} (${i.quantity} kg)`).join(", "));
          console.log(`📦 [Update Status] Current metadata before reduction:`, currentPayment.metadata);
          
          // Reduce inventory for ALL products in the order
          const reductionResults = await InventoryStorage.reduceInventoryBatch(inventoryItems);
          
          // Check if all reductions were successful
          const allSuccessful = reductionResults.every(r => r.success);
          const failedProducts = reductionResults.filter(r => !r.success);
          
          if (failedProducts.length > 0) {
            console.warn(`⚠️ [Update Status] Some products failed to reduce inventory:`, failedProducts.map(f => `${f.productId}: ${f.error}`).join(", "));
          }
          
          // Mark inventory as reduced in payment metadata (even if some failed, we mark it to prevent retries)
          const updatedMetadata = {
            ...(currentPayment.metadata || {}),
            inventoryReduced: true,
            inventoryReducedAt: new Date().toISOString(),
            reductionResults: reductionResults, // Store results for debugging
          };
          
          // Update payment metadata to track that inventory was reduced
          await PaymentStorage.updatePaymentMetadata(orderId, updatedMetadata);
          console.log(`✅ [Update Status] Metadata updated with inventoryReduced flag`);
          
          // Verify reduction was successful for each product
          console.log(`🔍 [Update Status] Verifying inventory reductions...`);
          for (const item of inventoryItems) {
            const updated = await InventoryStorage.getInventory(item.productId);
            if (updated) {
              console.log(`✅ [Update Status] ${item.productId}: Reduced ${item.quantity} kg. New total: ${updated.availableQuantity} kg`);
            } else {
              console.warn(`⚠️ [Update Status] Could not verify inventory reduction for ${item.productId}`);
            }
          }
          
          if (allSuccessful) {
            console.log(`✅ [Update Status] All ${inventoryItems.length} product(s) successfully reduced for order ${orderId}`);
          } else {
            console.warn(`⚠️ [Update Status] Inventory reduction completed with ${failedProducts.length} failure(s) for order ${orderId}`);
          }
        } catch (inventoryError: any) {
          console.error("❌ [Update Status] Error reducing inventory:", inventoryError);
          console.error("❌ [Update Status] Error details:", {
            message: inventoryError.message,
            stack: inventoryError.stack,
          });
          // Don't fail the status update if inventory update fails, but log it
        }
      } else {
        console.log(`ℹ️ [Update Status] Inventory already reduced for order ${orderId} (metadata.inventoryReduced = true), skipping to prevent double reduction`);
      }
      
      // Send confirmation email if resend is configured
      if (resend) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "Baho Coffee <noreply@bahocoffee.com>",
          to: currentPayment.customerEmail,
          subject: `Payment Confirmed - Order ${orderId}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: #389158; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                  .content { background: #f9f9f9; padding: 20px; }
                  .order-details { background: white; padding: 20px; margin: 20px 0; border-radius: 5px; border: 1px solid #e0e0e0; }
                  .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                  .status-badge { display: inline-block; background: #389158; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin: 10px 0; }
                  table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                  th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                  th { background: #f5f5f5; font-weight: 600; }
                  .highlight { background: #e8f5e9; padding: 15px; border-left: 4px solid #389158; margin: 15px 0; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>🎉 Payment Confirmed!</h1>
                  </div>
                  <div class="content">
                    <p>Dear ${currentPayment.customerName},</p>
                    <p>Great news! We have received and confirmed your payment for order <strong>${orderId}</strong>.</p>
                    
                    <div class="highlight">
                      <p style="margin: 0;"><strong>Status:</strong> <span class="status-badge">Payment Confirmed</span></p>
                    </div>
                    
                    <div class="order-details">
                      <h2 style="margin-top: 0;">Order Details</h2>
                      <p><strong>Order ID:</strong> ${orderId}</p>
                      <p><strong>Order Date:</strong> ${new Date(currentPayment.id).toLocaleDateString()}</p>
                      <p><strong>Total Amount:</strong> $${currentPayment.amount.toFixed(2)} ${currentPayment.currency}</p>
                      <p><strong>Payment Method:</strong> ${currentPayment.paymentMethod === "bank" ? "Bank Transfer" : currentPayment.paymentMethod}</p>
                      
                      <h3 style="margin-top: 20px;">Items Ordered:</h3>
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
                          ${currentPayment.items.map((item: any) => `
                            <tr>
                              <td>${item.productName}</td>
                              <td>${item.quantity} kg</td>
                              <td>$${item.price.toFixed(2)}</td>
                              <td>$${item.total.toFixed(2)}</td>
                            </tr>
                          `).join("")}
                        </tbody>
                      </table>
                      
                      <h3 style="margin-top: 20px;">Shipping Address:</h3>
                      <p>
                        ${currentPayment.shippingAddress}<br>
                        ${currentPayment.shippingCity}, ${currentPayment.shippingCountry}<br>
                        ${currentPayment.shippingZip ? `ZIP: ${currentPayment.shippingZip}` : ""}
                      </p>
                    </div>
                    
                    <p><strong>What's Next?</strong></p>
                    <p>We will now process your order and prepare it for shipment. You will receive a shipping confirmation email with tracking information once your coffee is on its way.</p>
                    
                    <p>If you have any questions or need to make changes to your order, please contact us at:</p>
                    <ul>
                      <li>Email: bahocoffee@gmail.com</li>
                      <li>Phone: +250 788 302 976</li>
                    </ul>
                    
                    <p>Thank you for choosing Baho Coffee!</p>
                    <p>Warm regards,<br/>The Baho Coffee Team</p>
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
        console.log(`✅ Confirmation email sent to ${currentPayment.customerEmail} for order ${orderId}`);
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
        // Don't fail the request if email fails, but log it
      }
      }
    }

    // Get updated payment
    const updatedPayment = await PaymentStorage.getPaymentByOrderId(orderId);
    
    // Build response message
    let message = "Payment status updated";
    if (status === "succeeded") {
      const wasAlreadyReduced = currentPayment.metadata?.inventoryReduced === true;
      if (wasAlreadyReduced) {
        message = "Payment status updated to succeeded. Inventory was already reduced previously.";
      } else {
        message = "Payment status updated to succeeded. Inventory has been reduced and confirmation email sent.";
      }
    }

    return NextResponse.json({
      success: true,
      orderId,
      status: updatedPayment?.paymentStatus,
      message,
      inventoryReduced: status === "succeeded" && !currentPayment.metadata?.inventoryReduced,
    });
  } catch (error: any) {
    console.error("Error updating payment status:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update payment status" },
      { status: 500 }
    );
  }
}

