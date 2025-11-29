const getEnvValue = (keys: string[], fallback: string): string => {
  for (const key of keys) {
    if (process.env[key] && process.env[key]!.trim().length > 0) {
      return process.env[key] as string;
    }
  }
  return fallback;
};

const getNumericEnv = (keys: string[], fallback: number): number => {
  for (const key of keys) {
    const value = process.env[key];
    if (value && !isNaN(Number(value))) {
      return Number(value);
    }
  }
  return fallback;
};

const defaultInstructions = [
  "Include your Order ID in the bank transfer reference so we can match the payment.",
  "Send proof of payment to bahocoffee@gmail.com or WhatsApp +250 788 302 976 once the transfer is complete.",
  "Orders remain on hold until we confirm receipt of funds (usually within 1-2 business days).",
];

export const BANK_DETAILS = {
  accountName: getEnvValue(
    ["BANK_ACCOUNT_NAME", "NEXT_PUBLIC_BANK_ACCOUNT_NAME"],
    "Baho Coffee Ltd"
  ),
  bankName: getEnvValue(
    ["BANK_NAME", "NEXT_PUBLIC_BANK_NAME"],
    "Bank of Kigali"
  ),
  accountNumber: getEnvValue(
    ["BANK_ACCOUNT_NUMBER", "NEXT_PUBLIC_BANK_ACCOUNT_NUMBER"],
    "0000 1234 5678 90"
  ),
  iban: getEnvValue(["BANK_IBAN", "NEXT_PUBLIC_BANK_IBAN"], "RW12 3456 7890"),
  swiftCode: getEnvValue(
    ["BANK_SWIFT_CODE", "NEXT_PUBLIC_BANK_SWIFT_CODE"],
    "BKIGRWRW"
  ),
  bankAddress: getEnvValue(
    ["BANK_ADDRESS", "NEXT_PUBLIC_BANK_ADDRESS"],
    "KN 4 Ave, Kigali, Rwanda"
  ),
  contactEmail: getEnvValue(
    [
      "BANK_CONTACT_EMAIL",
      "NEXT_PUBLIC_BANK_CONTACT_EMAIL",
      "RESEND_FROM_EMAIL",
      "NEXT_PUBLIC_CONTACT_EMAIL",
    ],
    "bahocoffee@gmail.com"
  ),
  contactPhone: getEnvValue(
    ["BANK_CONTACT_PHONE", "NEXT_PUBLIC_BANK_CONTACT_PHONE"],
    "+250 788 302 976"
  ),
  currency: getEnvValue(
    ["BANK_CURRENCY", "NEXT_PUBLIC_BANK_CURRENCY"],
    "USD"
  ),
  paymentDeadlineHours: getNumericEnv(
    ["BANK_PAYMENT_DEADLINE_HOURS", "NEXT_PUBLIC_BANK_PAYMENT_DEADLINE_HOURS"],
    48
  ),
  instructions:
    process.env.NEXT_PUBLIC_BANK_INSTRUCTIONS?.split("|").map((item) => item.trim()).filter(Boolean) ||
    defaultInstructions,
} as const;

export type BankDetails = typeof BANK_DETAILS;

