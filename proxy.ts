import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limiting store (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetTime < now) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

function getRateLimitKey(request: NextRequest): string {
  // Use IP address for rate limiting
  // Get IP from headers (x-forwarded-for for proxies, or x-real-ip)
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
  const path = request.nextUrl.pathname;
  return `${ip}:${path}`;
}

function checkRateLimit(request: NextRequest, limit: number, windowMs: number): boolean {
  const key = getRateLimitKey(request);
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || record.resetTime < now) {
    // Create new record
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  if (record.count >= limit) {
    return false; // Rate limit exceeded
  }

  // Increment count
  record.count++;
  return true;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Security headers
  const response = NextResponse.next();

  // Add security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.stripe.com https://api.openai.com; frame-src https://js.stripe.com;"
  );

  // Rate limiting for payment endpoints
  if (pathname.startsWith("/api/payments/")) {
    // Stricter rate limit for payment endpoints: 10 requests per minute
    if (!checkRateLimit(request, 10, 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  // Rate limiting for other API endpoints: 60 requests per minute
  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/payments/")) {
    if (!checkRateLimit(request, 60, 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  // Block access to admin endpoints without proper authentication
  // NOTE: For now, this is disabled. In production, implement proper authentication.
  // You can enable this by setting ENABLE_API_AUTH=true in your environment variables
  if (process.env.ENABLE_API_AUTH === "true") {
    if (pathname.startsWith("/api/admin/") || pathname.startsWith("/api/payments/list")) {
      const authHeader = request.headers.get("authorization");
      // In production, implement proper JWT token validation here
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
          { error: "Unauthorized. Please provide a valid authentication token." },
          { status: 401 }
        );
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/api/:path*",
  ],
};
