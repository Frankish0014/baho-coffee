import { NextRequest, NextResponse } from "next/server";
import { PaymentStorage, PaymentData, PaymentItem } from "@/backend/lib/db/payments";
import { BANK_DETAILS } from "@/config/bankDetails";
import { Resend } from "resend";

const resend =
  process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

const generateOrderId = () =>
  `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

const generatePaymentId = () =>
  `PAY-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      shippingCity,
      shippingCountry,
      shippingZip,
      items,
      amount,
    } = body;

    if (
      !customerName ||
      !customerEmail ||
      !shippingAddress ||
      !shippingCity ||
      !shippingCountry ||
      !items ||
      !Array.isArray(items) ||
      !amount
    ) {
      return NextResponse.json(
        { error: "Missing required fields for bank transfer order." },
        { status: 400 }
      );
    }

    const orderId = generateOrderId();
    const paymentId = generatePaymentId();

    const paymentData: PaymentData = {
      id: paymentId,
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      shippingCity,
      shippingCountry,
      shippingZip,
      paymentMethod: "bank",
      paymentStatus: "pending",
      amount,
      currency: BANK_DETAILS.currency,
      items: items as PaymentItem[],
      metadata: {
        paymentType: "bank-transfer",
        bankDetails: BANK_DETAILS,
        instructions: BANK_DETAILS.instructions,
      },
    };

    await PaymentStorage.savePayment(paymentData);

    if (resend) {
      try {
        const instructionsList = BANK_DETAILS.instructions
          .map((item) => `<li>${item}</li>`)
          .join("");

        await resend.emails.send({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "Baho Coffee <noreply@bahocoffee.com>",
          to: customerEmail,
          subject: `Bank Transfer Instructions - Order ${orderId}`,
          html: `
            <h2>Hi ${customerName},</h2>
            <p>Thank you for choosing bank transfer. We've reserved your order <strong>${orderId}</strong>.</p>
            <p>Please complete the transfer using the details below within ${
              BANK_DETAILS.paymentDeadlineHours
            } hours.</p>
            <table style="width:100%;border-collapse:collapse">
              <tbody>
                <tr><td style="padding:6px;border:1px solid #eee">Account Name</td><td style="padding:6px;border:1px solid #eee">${BANK_DETAILS.accountName}</td></tr>
                <tr><td style="padding:6px;border:1px solid #eee">Bank Name</td><td style="padding:6px;border:1px solid #eee">${BANK_DETAILS.bankName}</td></tr>
                <tr><td style="padding:6px;border:1px solid #eee">Account Number / IBAN</td><td style="padding:6px;border:1px solid #eee">${BANK_DETAILS.accountNumber} / ${BANK_DETAILS.iban}</td></tr>
                <tr><td style="padding:6px;border:1px solid #eee">SWIFT</td><td style="padding:6px;border:1px solid #eee">${BANK_DETAILS.swiftCode}</td></tr>
                <tr><td style="padding:6px;border:1px solid #eee">Amount</td><td style="padding:6px;border:1px solid #eee">$${amount.toFixed(
                  2
                )} ${BANK_DETAILS.currency}</td></tr>
              </tbody>
            </table>
            <p><strong>Important:</strong></p>
            <ul>${instructionsList}</ul>
            <p>Send proof of payment to ${BANK_DETAILS.contactEmail} or ${BANK_DETAILS.contactPhone} so we can finalize your order.</p>
            <p>We'll send a confirmation email as soon as we receive your funds.</p>
            <p>Warm regards,<br/>Baho Coffee Team</p>
          `,
        });

        await resend.emails.send({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "Baho Coffee <noreply@bahocoffee.com>",
          to: process.env.ADMIN_EMAIL || BANK_DETAILS.contactEmail,
          subject: `New Bank Transfer Order - ${orderId}`,
          html: `
            <h2>Bank Transfer Requested</h2>
            <p><strong>Order:</strong> ${orderId}</p>
            <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
            <p><strong>Amount:</strong> $${amount.toFixed(2)} ${
            BANK_DETAILS.currency
          }</p>
            <p><strong>Shipping:</strong> ${shippingAddress}, ${shippingCity}, ${shippingCountry}</p>
            <p>This order is pending payment confirmation.</p>
          `,
        });
      } catch (emailError) {
        console.error("Error sending bank transfer emails:", emailError);
        // continue without failing the request
      }
    }

    return NextResponse.json({
      orderId,
      paymentStatus: "pending",
      bankDetails: BANK_DETAILS,
      instructions: BANK_DETAILS.instructions,
    });
  } catch (error: any) {
    console.error("Bank transfer processing failed:", error);
    return NextResponse.json(
      { error: error.message || "Unable to process bank transfer request." },
      { status: 500 }
    );
  }
}

