import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PaymentStorage } from "@/backend/lib/db/payments";
import { InventoryStorage } from "@/backend/lib/db/inventory";
import { Resend } from "resend";

// Initialize Stripe lazily
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-01-28.clover",
  });
};

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  try {
    // Handle the event
    const stripe = getStripe();
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const orderId = paymentIntent.metadata.orderId;

      if (orderId) {
        // Update payment status to succeeded
        await PaymentStorage.updatePaymentStatus(orderId, "succeeded", paymentIntent.id);

        // Get payment details for email
        const payment = await PaymentStorage.getPaymentByOrderId(orderId);

        // Reduce inventory for all items in the order (if not already reduced)
        if (payment) {
          // Check if inventory was already reduced (to prevent double reduction)
          const inventoryAlreadyReduced = payment.metadata?.inventoryReduced === true;
          
          if (!inventoryAlreadyReduced) {
            try {
              const inventoryItems = payment.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                productName: item.productName,
              }));
              
              // Log inventory reduction for debugging
              console.log(`📦 [Webhook] Reducing inventory for order ${orderId}`);
              console.log(`📦 [Webhook] Processing ${inventoryItems.length} product(s):`, inventoryItems.map(i => `${i.productId} (${i.quantity} kg)`).join(", "));
              
              // Reduce inventory for ALL products in the order
              const reductionResults = await InventoryStorage.reduceInventoryBatch(inventoryItems);
              
              // Check if all reductions were successful
              const allSuccessful = reductionResults.every(r => r.success);
              const failedProducts = reductionResults.filter(r => !r.success);
              
              if (failedProducts.length > 0) {
                console.warn(`⚠️ [Webhook] Some products failed to reduce inventory:`, failedProducts.map(f => `${f.productId}: ${f.error}`).join(", "));
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
              console.log(`🔍 [Webhook] Verifying inventory reductions...`);
              for (const item of inventoryItems) {
                const updated = await InventoryStorage.getInventory(item.productId);
                if (updated) {
                  console.log(`✅ [Webhook] ${item.productId}: Reduced ${item.quantity} kg. New total: ${updated.availableQuantity} kg`);
                } else {
                  console.warn(`⚠️ [Webhook] Could not verify inventory reduction for ${item.productId}`);
                }
              }
              
              if (allSuccessful) {
                console.log(`✅ [Webhook] All ${inventoryItems.length} product(s) successfully reduced for order ${orderId}`);
              } else {
                console.warn(`⚠️ [Webhook] Inventory reduction completed with ${failedProducts.length} failure(s) for order ${orderId}`);
              }
            } catch (inventoryError) {
              console.error("❌ [Webhook] Error reducing inventory:", inventoryError);
              // Don't fail the webhook if inventory update fails, but log it
            }
          } else {
            console.log(`ℹ️ [Webhook] Inventory already reduced for order ${orderId}, skipping to prevent double reduction`);
          }
        }

        if (payment && resend) {
          // Send confirmation email to customer
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
                        <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
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

          // Send notification email to admin
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "Baho Coffee <noreply@bahocoffee.com>",
            to: process.env.ADMIN_EMAIL || "bahocoffee@gmail.com",
            subject: `New Order Received - ${orderId}`,
            html: `
              <h2>New Order Received</h2>
              <p><strong>Order ID:</strong> ${orderId}</p>
              <p><strong>Customer:</strong> ${payment.customerName} (${payment.customerEmail})</p>
              <p><strong>Amount:</strong> $${payment.amount.toFixed(2)}</p>
              <p><strong>Payment Method:</strong> ${payment.paymentMethod}</p>
              <p><strong>Shipping:</strong> ${payment.shippingAddress}, ${payment.shippingCity}, ${payment.shippingCountry}</p>
              <p>View order details in your admin dashboard.</p>
            `,
          });
        }
      }
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const orderId = paymentIntent.metadata.orderId;

      if (orderId) {
        await PaymentStorage.updatePaymentStatus(orderId, "failed", paymentIntent.id);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: error.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}

