/**
 * Client-side validation utilities using regex patterns
 * These match the server-side validation in backend/lib/security.ts
 */

// Regex patterns (same as server-side)
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const PHONE_REGEX = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}[-\s\.]?[0-9]{1,9}$/;
export const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s\-'\.]{2,100}$/;
export const COMPANY_REGEX = /^[a-zA-Z0-9À-ÿ\s\-'\.&,()]{2,200}$/;
export const QUANTITY_REGEX = /^[1-9]\d{0,6}$/;
export const COUNTRY_REGEX = /^[a-zA-ZÀ-ÿ\s\-']{2,100}$/;
export const SUBJECT_REGEX = /^[a-zA-Z0-9À-ÿ\s\-'\.!?]{3,200}$/;
export const ZIP_CODE_REGEX = /^[A-Z0-9\s\-]{3,10}$/i;

/**
 * Validate email address
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || email.trim() === "") {
    return { valid: false, error: "Email is required" };
  }
  
  if (!EMAIL_REGEX.test(email.trim())) {
    return { valid: false, error: "Please enter a valid email address" };
  }
  
  return { valid: true };
}

/**
 * Validate phone number
 */
export function validatePhone(phone: string): { valid: boolean; error?: string } {
  if (!phone || phone.trim() === "") {
    return { valid: false, error: "Phone number is required" };
  }
  
  const trimmed = phone.trim();
  if (!PHONE_REGEX.test(trimmed)) {
    return { valid: false, error: "Please enter a valid phone number" };
  }
  
  if (trimmed.length < 7 || trimmed.length > 20) {
    return { valid: false, error: "Phone number must be between 7 and 20 characters" };
  }
  
  return { valid: true };
}

/**
 * Validate name
 */
export function validateName(name: string): { valid: boolean; error?: string } {
  if (!name || name.trim() === "") {
    return { valid: false, error: "Name is required" };
  }
  
  if (!NAME_REGEX.test(name.trim())) {
    return { valid: false, error: "Name must be 2-100 characters and contain only letters, spaces, hyphens, and apostrophes" };
  }
  
  return { valid: true };
}

/**
 * Validate company name
 */
export function validateCompany(company: string): { valid: boolean; error?: string } {
  if (!company || company.trim() === "") {
    return { valid: false, error: "Company name is required" };
  }
  
  if (!COMPANY_REGEX.test(company.trim())) {
    return { valid: false, error: "Company name must be 2-200 characters and contain only valid characters" };
  }
  
  return { valid: true };
}

/**
 * Validate quantity
 */
export function validateQuantity(quantity: string): { valid: boolean; error?: string } {
  if (!quantity || quantity.trim() === "") {
    return { valid: false, error: "Quantity is required" };
  }
  
  if (!QUANTITY_REGEX.test(quantity.trim())) {
    return { valid: false, error: "Quantity must be a positive integer between 1 and 9999999" };
  }
  
  const num = parseInt(quantity.trim(), 10);
  if (num < 1 || num > 9999999) {
    return { valid: false, error: "Quantity must be between 1 and 9999999" };
  }
  
  return { valid: true };
}

/**
 * Validate country name
 */
export function validateCountry(country: string): { valid: boolean; error?: string } {
  if (!country || country.trim() === "") {
    return { valid: false, error: "Country is required" };
  }
  
  if (!COUNTRY_REGEX.test(country.trim())) {
    return { valid: false, error: "Please enter a valid country name" };
  }
  
  return { valid: true };
}

/**
 * Validate subject/title
 */
export function validateSubject(subject: string): { valid: boolean; error?: string } {
  if (!subject || subject.trim() === "") {
    return { valid: false, error: "Subject is required" };
  }
  
  if (!SUBJECT_REGEX.test(subject.trim())) {
    return { valid: false, error: "Subject must be 3-200 characters and contain only valid characters" };
  }
  
  return { valid: true };
}

/**
 * Validate message
 */
export function validateMessage(message: string): { valid: boolean; error?: string } {
  if (!message || message.trim() === "") {
    return { valid: false, error: "Message is required" };
  }
  
  const trimmed = message.trim();
  if (trimmed.length < 10) {
    return { valid: false, error: "Message must be at least 10 characters" };
  }
  
  if (trimmed.length > 5000) {
    return { valid: false, error: "Message must be less than 5000 characters" };
  }
  
  return { valid: true };
}

/**
 * Validate ZIP/postal code
 */
export function validateZipCode(zip: string): { valid: boolean; error?: string } {
  if (!zip || zip.trim() === "") {
    return { valid: true }; // Optional field
  }
  
  if (!ZIP_CODE_REGEX.test(zip.trim())) {
    return { valid: false, error: "Please enter a valid ZIP/postal code" };
  }
  
  return { valid: true };
}

