import { sql } from "@vercel/postgres";

export interface PaymentItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface PaymentData {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  shippingCity: string;
  shippingCountry: string;
  shippingZip?: string;
  paymentMethod: string;
  paymentStatus: "pending" | "processing" | "succeeded" | "failed" | "canceled";
  stripePaymentIntentId?: string;
  amount: number;
  currency: string;
  items: PaymentItem[];
  metadata?: Record<string, any>;
}

interface PaymentRow {
  id: string;
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string | null;
  shipping_address: string;
  shipping_city: string;
  shipping_country: string;
  shipping_zip?: string | null;
  payment_method: string;
  payment_status: string;
  stripe_payment_intent_id?: string | null;
  amount: string | number;
  currency: string;
  items: PaymentItem[];
  metadata?: Record<string, any> | null;
}

export class PaymentStorage {
  /**
   * Check if Postgres is configured
   */
  private static isPostgresConfigured(): boolean {
    return !!(
      process.env.POSTGRES_URL ||
      (process.env.POSTGRES_PRISMA_URL && process.env.POSTGRES_URL_NON_POOLING)
    );
  }

  /**
   * Initialize payments table
   */
  static async initialize(): Promise<void> {
    if (!this.isPostgresConfigured()) {
      console.log("ℹ️ Postgres not configured, skipping payments table initialization");
      return;
    }

    try {
      await sql`
        CREATE TABLE IF NOT EXISTS payments (
          id TEXT PRIMARY KEY,
          timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
          order_id TEXT UNIQUE NOT NULL,
          customer_name TEXT NOT NULL,
          customer_email TEXT NOT NULL,
          customer_phone TEXT,
          shipping_address TEXT NOT NULL,
          shipping_city TEXT NOT NULL,
          shipping_country TEXT NOT NULL,
          shipping_zip TEXT,
          payment_method TEXT NOT NULL,
          payment_status TEXT NOT NULL DEFAULT 'pending',
          stripe_payment_intent_id TEXT,
          amount DECIMAL(10, 2) NOT NULL,
          currency TEXT NOT NULL DEFAULT 'USD',
          items JSONB NOT NULL,
          metadata JSONB
        )
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_payments_timestamp ON payments(timestamp DESC)
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id)
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_payments_customer_email ON payments(customer_email)
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status)
      `;

      console.log("✅ Payments table initialized successfully");
    } catch (error) {
      console.error("❌ Error initializing payments table:", error);
      throw error;
    }
  }

  /**
   * Save payment to database
   */
  static async savePayment(data: PaymentData): Promise<void> {
    if (!this.isPostgresConfigured()) {
      throw new Error("Postgres is not configured");
    }

    try {
      await sql`
        INSERT INTO payments (
          id, order_id, customer_name, customer_email, customer_phone,
          shipping_address, shipping_city, shipping_country, shipping_zip,
          payment_method, payment_status, stripe_payment_intent_id,
          amount, currency, items, metadata
        )
        VALUES (
          ${data.id},
          ${data.orderId},
          ${data.customerName},
          ${data.customerEmail},
          ${data.customerPhone || null},
          ${data.shippingAddress},
          ${data.shippingCity},
          ${data.shippingCountry},
          ${data.shippingZip || null},
          ${data.paymentMethod},
          ${data.paymentStatus},
          ${data.stripePaymentIntentId || null},
          ${data.amount},
          ${data.currency},
          ${JSON.stringify(data.items)}::jsonb,
          ${data.metadata ? JSON.stringify(data.metadata) : null}::jsonb
        )
        ON CONFLICT (id) DO UPDATE SET
          payment_status = EXCLUDED.payment_status,
          stripe_payment_intent_id = EXCLUDED.stripe_payment_intent_id,
          metadata = EXCLUDED.metadata
      `;
    } catch (error) {
      console.error("Error saving payment:", error);
      throw error;
    }
  }

  /**
   * Update payment status
   */
  static async updatePaymentStatus(
    orderId: string,
    status: PaymentData["paymentStatus"],
    stripePaymentIntentId?: string
  ): Promise<void> {
    if (!this.isPostgresConfigured()) {
      throw new Error("Postgres is not configured");
    }

    try {
      await sql`
        UPDATE payments
        SET 
          payment_status = ${status},
          stripe_payment_intent_id = COALESCE(${stripePaymentIntentId || null}, stripe_payment_intent_id)
        WHERE order_id = ${orderId}
      `;
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw error;
    }
  }

  /**
   * Get payment by order ID
   */
  static async getPaymentByOrderId(orderId: string): Promise<PaymentData | null> {
    if (!this.isPostgresConfigured()) {
      return null;
    }

    try {
      const result = await sql`
        SELECT * FROM payments WHERE order_id = ${orderId} LIMIT 1
      `;

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0] as any;
      return {
        id: row.id,
        orderId: row.order_id,
        customerName: row.customer_name,
        customerEmail: row.customer_email,
        customerPhone: row.customer_phone || undefined,
        shippingAddress: row.shipping_address,
        shippingCity: row.shipping_city,
        shippingCountry: row.shipping_country,
        shippingZip: row.shipping_zip || undefined,
        paymentMethod: row.payment_method,
        paymentStatus: row.payment_status as PaymentData["paymentStatus"],
        stripePaymentIntentId: row.stripe_payment_intent_id || undefined,
        amount: parseFloat(String(row.amount)),
        currency: row.currency,
        items: row.items,
        metadata: row.metadata || undefined,
      };
    } catch (error) {
      console.error("Error getting payment:", error);
      return null;
    }
  }

  /**
   * Get all payments (for admin)
   */
  static async getAllPayments(limit: number = 100): Promise<PaymentData[]> {
    if (!this.isPostgresConfigured()) {
      return [];
    }

    try {
      const result = await sql`
        SELECT * FROM payments 
        ORDER BY timestamp DESC 
        LIMIT ${limit}
      `;

      return result.rows.map((row: any) => ({
        id: row.id,
        orderId: row.order_id,
        customerName: row.customer_name,
        customerEmail: row.customer_email,
        customerPhone: row.customer_phone || undefined,
        shippingAddress: row.shipping_address,
        shippingCity: row.shipping_city,
        shippingCountry: row.shipping_country,
        shippingZip: row.shipping_zip || undefined,
        paymentMethod: row.payment_method,
        paymentStatus: row.payment_status as PaymentData["paymentStatus"],
        stripePaymentIntentId: row.stripe_payment_intent_id || undefined,
        amount: parseFloat(String(row.amount)),
        currency: row.currency,
        items: row.items,
        metadata: row.metadata || undefined,
      }));
    } catch (error) {
      console.error("Error getting payments:", error);
      return [];
    }
  }
}

