/**
 * Security utilities for input validation and sanitization
 * Comprehensive regex patterns for all input types
 */

// ==================== REGEX PATTERNS ====================

/**
 * Email validation - RFC 5322 compliant (simplified)
 * Allows: user@example.com, user.name@example.co.uk
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Phone number validation - International format
 * Allows: +1234567890, +1-234-567-8900, (123) 456-7890, 123-456-7890
 * Supports international formats with country codes
 */
export const PHONE_REGEX = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}[-\s\.]?[0-9]{1,9}$/;

/**
 * Name validation - Allows letters, spaces, hyphens, apostrophes
 * Minimum 2 characters, maximum 100 characters
 */
export const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s\-'\.]{2,100}$/;

/**
 * Company name validation - Allows letters, numbers, spaces, common punctuation
 * Minimum 2 characters, maximum 200 characters
 */
export const COMPANY_REGEX = /^[a-zA-Z0-9À-ÿ\s\-'\.&,()]{2,200}$/;

/**
 * Product ID validation - Alphanumeric, hyphens, underscores
 * Format: lowercase-alphanumeric-with-hyphens
 */
export const PRODUCT_ID_REGEX = /^[a-z0-9\-_]{1,100}$/;

/**
 * Order ID validation - Alphanumeric with hyphens and underscores
 * Format: ORD-1234567890-ABCDE
 */
export const ORDER_ID_REGEX = /^[A-Z0-9\-_]{5,50}$/;

/**
 * Quantity validation - Positive numbers only
 * Allows: 1, 100, 1000, 10000 (no decimals for kg)
 */
export const QUANTITY_REGEX = /^[1-9]\d{0,6}$/;

/**
 * Amount/Price validation - Positive numbers with optional decimals
 * Allows: 10, 10.50, 1000.99
 */
export const AMOUNT_REGEX = /^\d+(\.\d{1,2})?$/;

/**
 * Country name validation - Letters, spaces, hyphens
 * Minimum 2 characters, maximum 100 characters
 */
export const COUNTRY_REGEX = /^[a-zA-ZÀ-ÿ\s\-']{2,100}$/;

/**
 * ZIP/Postal code validation - Alphanumeric with hyphens and spaces
 * Format varies by country, so we use a flexible pattern
 */
export const ZIP_CODE_REGEX = /^[A-Z0-9\s\-]{3,10}$/i;

/**
 * URL validation - HTTP/HTTPS URLs
 */
export const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

/**
 * Subject/Title validation - Letters, numbers, spaces, common punctuation
 * Minimum 3 characters, maximum 200 characters
 */
export const SUBJECT_REGEX = /^[a-zA-Z0-9À-ÿ\s\-'\.!?]{3,200}$/;

/**
 * Message/Text validation - Allows most characters except script tags
 * Minimum 10 characters, maximum 5000 characters
 */
export const MESSAGE_REGEX = /^[\s\S]{10,5000}$/;

/**
 * Alpha-numeric with spaces - For general text fields
 */
export const ALPHANUMERIC_SPACE_REGEX = /^[a-zA-Z0-9\s]{1,200}$/;

/**
 * Slug validation - URL-friendly slugs
 * Format: lowercase-alphanumeric-with-hyphens
 */
export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// ==================== SANITIZATION FUNCTIONS ====================

/**
 * Sanitize string input to prevent XSS attacks 
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (typeof input !== "string") {
    return "";
  }
  
  return input
    .replace(/[<>]/g, "") // Remove < and >
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers (onclick, onerror, etc.)
    .trim()
    .slice(0, maxLength); // Limit length
}

/**
 * Validate and sanitize email address
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== "string") {
    throw new Error("Email must be a string");
  }
  
  const sanitized = email.trim().toLowerCase().slice(0, 254);
  
  if (!EMAIL_REGEX.test(sanitized)) {
    throw new Error("Invalid email format");
  }
  
  // Prevent email header injection
  if (sanitized.includes("\n") || sanitized.includes("\r") || sanitized.includes("\0")) {
    throw new Error("Invalid email format");
  }
  
  return sanitized;
}

/**
 * Validate amount to prevent tampering
 */
export function validateAmount(amount: number, items: Array<{ price: number; quantity: number }>): boolean {
  if (typeof amount !== "number" || amount <= 0 || !isFinite(amount)) {
    return false;
  }
  
  // Recalculate total from items
  const calculatedTotal = items.reduce((sum, item) => {
    if (typeof item.price !== "number" || typeof item.quantity !== "number") {
      return sum;
    }
    if (item.price < 0 || item.quantity < 0 || !isFinite(item.price) || !isFinite(item.quantity)) {
      return sum;
    }
    return sum + item.price * item.quantity;
  }, 0);
  
  // Allow small rounding differences (0.01)
  const difference = Math.abs(amount - calculatedTotal);
  return difference < 0.01;
}

/**
 * Validate payment items structure
 */
export function validatePaymentItems(items: any[]): boolean {
  if (!Array.isArray(items) || items.length === 0) {
    return false;
  }
  
  if (items.length > 100) {
    // Prevent too many items
    return false;
  }
  
  return items.every((item) => {
    return (
      typeof item === "object" &&
      item !== null &&
      typeof item.productId === "string" &&
      typeof item.productName === "string" &&
      typeof item.price === "number" &&
      typeof item.quantity === "number" &&
      typeof item.total === "number" &&
      item.price >= 0 &&
      item.quantity > 0 &&
      item.quantity <= 10000 && // Max quantity per item
      item.total >= 0 &&
      item.productId.length <= 100 &&
      item.productName.length <= 200
    );
  });
}

/**
 * Sanitize address fields
 */
export function sanitizeAddress(input: string): string {
  if (typeof input !== "string") {
    return "";
  }
  
  return input
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 200);
}

/**
 * Validate country code (ISO 3166-1 alpha-2)
 */
export function validateCountryCode(country: string): boolean {
  if (typeof country !== "string") {
    return false;
  }
  
  // ISO 3166-1 alpha-2 country codes are 2 letters
  return /^[A-Z]{2}$/.test(country);
}

/**
 * Validate country name
 */
export function validateCountryName(country: string): boolean {
  if (typeof country !== "string") {
    return false;
  }
  
  return COUNTRY_REGEX.test(country.trim());
}

/**
 * Validate and sanitize phone number
 */
export function validatePhone(phone: string): string {
  if (typeof phone !== "string") {
    throw new Error("Phone must be a string");
  }
  
  const sanitized = phone.trim().replace(/\s+/g, " ");
  
  if (!PHONE_REGEX.test(sanitized)) {
    throw new Error("Invalid phone number format");
  }
  
  if (sanitized.length < 7 || sanitized.length > 20) {
    throw new Error("Phone number must be between 7 and 20 characters");
  }
  
  return sanitized;
}

/**
 * Validate and sanitize name
 */
export function validateName(name: string): string {
  if (typeof name !== "string") {
    throw new Error("Name must be a string");
  }
  
  const sanitized = name.trim();
  
  if (!NAME_REGEX.test(sanitized)) {
    throw new Error("Name must be 2-100 characters and contain only letters, spaces, hyphens, and apostrophes");
  }
  
  return sanitized;
}

/**
 * Validate and sanitize company name
 */
export function validateCompany(company: string): string {
  if (typeof company !== "string") {
    throw new Error("Company must be a string");
  }
  
  const sanitized = company.trim();
  
  if (!COMPANY_REGEX.test(sanitized)) {
    throw new Error("Company name must be 2-200 characters and contain only valid characters");
  }
  
  return sanitized;
}

/**
 * Validate product ID
 */
export function validateProductId(productId: string): boolean {
  if (typeof productId !== "string") {
    return false;
  }
  
  return PRODUCT_ID_REGEX.test(productId);
}

/**
 * Validate order ID
 */
export function validateOrderId(orderId: string): boolean {
  if (typeof orderId !== "string") {
    return false;
  }
  
  return ORDER_ID_REGEX.test(orderId);
}

/**
 * Validate quantity (positive integer)
 */
export function validateQuantity(quantity: string | number): number {
  const qty = typeof quantity === "string" ? quantity.trim() : String(quantity);
  
  if (!QUANTITY_REGEX.test(qty)) {
    throw new Error("Quantity must be a positive integer between 1 and 9999999");
  }
  
  const num = parseInt(qty, 10);
  
  if (num < 1 || num > 9999999) {
    throw new Error("Quantity must be between 1 and 9999999");
  }
  
  return num;
}

/**
 * Validate amount/price (positive number with optional decimals)
 */
export function validateAmountValue(amount: string | number): number {
  const amt = typeof amount === "string" ? amount.trim() : String(amount);
  
  if (!AMOUNT_REGEX.test(amt)) {
    throw new Error("Amount must be a positive number with up to 2 decimal places");
  }
  
  const num = parseFloat(amt);
  
  if (num < 0 || num > 999999999.99) {
    throw new Error("Amount must be between 0 and 999999999.99");
  }
  
  return num;
}

/**
 * Validate subject/title
 */
export function validateSubject(subject: string): string {
  if (typeof subject !== "string") {
    throw new Error("Subject must be a string");
  }
  
  const sanitized = subject.trim();
  
  if (!SUBJECT_REGEX.test(sanitized)) {
    throw new Error("Subject must be 3-200 characters and contain only valid characters");
  }
  
  return sanitized;
}

/**
 * Validate message/text content
 */
export function validateMessage(message: string): string {
  if (typeof message !== "string") {
    throw new Error("Message must be a string");
  }
  
  const sanitized = sanitizeString(message, 5000).trim();
  
  if (sanitized.length < 10) {
    throw new Error("Message must be at least 10 characters");
  }
  
  if (sanitized.length > 5000) {
    throw new Error("Message must be less than 5000 characters");
  }
  
  return sanitized;
}

/**
 * Validate URL
 */
export function validateUrl(url: string): boolean {
  if (typeof url !== "string") {
    return false;
  }
  
  return URL_REGEX.test(url.trim());
}

/**
 * Validate ZIP/postal code
 */
export function validateZipCode(zip: string): boolean {
  if (typeof zip !== "string") {
    return false;
  }
  
  return ZIP_CODE_REGEX.test(zip.trim());
}

/**
 * Validate slug
 */
export function validateSlug(slug: string): boolean {
  if (typeof slug !== "string") {
    return false;
  }
  
  return SLUG_REGEX.test(slug.trim());
}