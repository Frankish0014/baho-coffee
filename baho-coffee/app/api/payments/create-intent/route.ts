import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PaymentStorage, PaymentData, PaymentItem } from "@/backend/lib/db/payments";
import { 
  sanitizeEmail, 
  sanitizeString, 
  sanitizeAddress, 
  validateAmount, 
  validatePaymentItems, 
  validateCountryCode,
  validateName,
  validatePhone,
  validateCountryName,
  validateZipCode
} from "@/backend/lib/security";

// Initialize Stripe lazily
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-11-17.clover",
  });
};

// Helper function to normalize country code (convert name to ISO code if needed)
const normalizeCountryCode = (country: string): string => {
  // If it's already a 2-letter code, return as-is (uppercase)
  if (country && country.length === 2) {
    return country.toUpperCase();
  }
  
  // Common country name to code mappings
  const countryMap: Record<string, string> = {
    "rwanda": "RW",
    "united states": "US",
    "usa": "US",
    "united kingdom": "GB",
    "uk": "GB",
    "canada": "CA",
    "australia": "AU",
    "germany": "DE",
    "france": "FR",
    "italy": "IT",
    "spain": "ES",
    "netherlands": "NL",
    "belgium": "BE",
    "switzerland": "CH",
    "austria": "AT",
    "sweden": "SE",
    "norway": "NO",
    "denmark": "DK",
    "finland": "FI",
    "ireland": "IE",
    "portugal": "PT",
    "greece": "GR",
    "poland": "PL",
    "japan": "JP",
    "south korea": "KR",
    "china": "CN",
    "india": "IN",
    "singapore": "SG",
    "kenya": "KE",
    "uganda": "UG",
    "tanzania": "TZ",
    "ethiopia": "ET",
    "brazil": "BR",
    "mexico": "MX",
  };
  
  const normalized = country.toLowerCase().trim();
  return countryMap[normalized] || country.toUpperCase();
};

export async function POST(request: NextRequest) {
  try {
    // Initialize payments table if it doesn't exist
    try {
      await PaymentStorage.initialize();
    } catch (initError) {
      console.error("Error initializing payments table:", initError);
      // Continue anyway - might already exist
    }

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Payment service is not configured" },
        { status: 500 }
      );
    }

    // Limit request body size (prevent large payload attacks)
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 100000) { // 100KB max
      return NextResponse.json(
        { error: "Request payload too large" },
        { status: 413 }
      );
    }

    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      shippingCity,
      shippingCountry,
      shippingZip,
      paymentMethod,
      items,
      amount,
    } = body;

    // Validate required fields with detailed error messages
    const missingFields: string[] = [];
    
    if (!customerName || customerName.trim() === "") {
      missingFields.push("customer name");
    }
    if (!customerEmail || customerEmail.trim() === "") {
      missingFields.push("customer email");
    }
    if (!shippingAddress || shippingAddress.trim() === "") {
      missingFields.push("shipping address");
    }
    if (!shippingCity || shippingCity.trim() === "") {
      missingFields.push("shipping city");
    }
    if (!shippingCountry || shippingCountry.trim() === "") {
      missingFields.push("shipping country");
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      missingFields.push("items (cart is empty)");
    }
    if (!amount || typeof amount !== "number" || amount <= 0) {
      missingFields.push("amount (must be greater than 0)");
    }
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: `Missing required fields: ${missingFields.join(", ")}`,
          missingFields: missingFields,
        },
        { status: 400 }
      );
    }

    // Validate payment items structure
    if (!validatePaymentItems(items)) {
      return NextResponse.json(
        { error: "Invalid payment items structure" },
        { status: 400 }
      );
    }

    // CRITICAL: Validate amount matches items (prevent tampering)
    if (!validateAmount(amount, items)) {
      return NextResponse.json(
        { error: "Amount does not match items. Please refresh and try again." },
        { status: 400 }
      );
    }

    // Sanitize all inputs
    let sanitizedEmail: string;
    try {
      sanitizedEmail = sanitizeEmail(customerEmail);
    } catch (error: any) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate and sanitize all inputs using regex
    let sanitizedName: string;
    let sanitizedPhone: string = "";
    let sanitizedAddress: string;
    let sanitizedCity: string;
    let sanitizedZip: string = "";
    
    try {
      sanitizedName = validateName(customerName);
      if (customerPhone) {
        sanitizedPhone = validatePhone(customerPhone);
      }
      sanitizedAddress = sanitizeAddress(shippingAddress);
      sanitizedCity = sanitizeAddress(shippingCity);
      if (shippingZip) {
        if (!validateZipCode(shippingZip)) {
          return NextResponse.json(
            { error: "Invalid ZIP/postal code format" },
            { status: 400 }
          );
        }
        sanitizedZip = sanitizeString(shippingZip, 20);
      }
    } catch (validationError: any) {
      return NextResponse.json(
        { error: validationError.message || "Invalid input format" },
        { status: 400 }
      );
    }

    // Normalize and validate country code
    const normalizedCountry = normalizeCountryCode(shippingCountry);
    if (!validateCountryCode(normalizedCountry)) {
      return NextResponse.json(
        { error: "Invalid country code" },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Convert amount to cents for Stripe
    const amountInCents = Math.round(amount * 100);

    // Create payment record in database (using sanitized values)
    const paymentData: PaymentData = {
      id: paymentId,
      orderId,
      customerName: sanitizedName,
      customerEmail: sanitizedEmail,
      customerPhone: sanitizedPhone,
      shippingAddress: sanitizedAddress,
      shippingCity: sanitizedCity,
      shippingCountry: normalizedCountry,
      shippingZip: sanitizedZip,
      paymentMethod: paymentMethod === "card" ? "card" : "bank",
      paymentStatus: "pending",
      amount,
      currency: "USD",
      items: items as PaymentItem[],
    };

    // Save payment to database
    await PaymentStorage.savePayment(paymentData);

    // Create Stripe Payment Intent
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      payment_method_types: ["card"], // Explicitly allow card payments
      metadata: {
        orderId,
        paymentId,
        customerName: sanitizedName,
        customerEmail: sanitizedEmail,
      },
      description: `Order ${orderId} - Baho Coffee`,
      shipping: {
        name: sanitizedName,
        phone: sanitizedPhone,
        address: {
          line1: sanitizedAddress,
          city: sanitizedCity,
          country: normalizedCountry,
          postal_code: sanitizedZip,
        },
      },
      // Allow all card brands (Visa, Mastercard, Amex, Discover, etc.)
      payment_method_options: {
        card: {
          // Don't restrict card networks - allow all supported networks
        },
      },
    });

    // Update payment with Stripe Payment Intent ID
    await PaymentStorage.updatePaymentStatus(orderId, "processing", paymentIntent.id);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
      paymentId,
    });
  } catch (error: any) {
    // Don't log sensitive error details in production
    if (process.env.NODE_ENV === "development") {
      console.error("Error creating payment intent:", error);
    }
    return NextResponse.json(
      { error: "Failed to create payment intent. Please try again." },
      { status: 500 }
    );
  }
}

