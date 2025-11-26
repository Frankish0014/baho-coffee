import { sql } from "@vercel/postgres";

/**
 * PostgreSQL storage utility for Vercel Postgres
 * Falls back to file system in local development
 */

export class PostgresStorage {
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
   * Initialize database tables (run once)
   */
  static async initialize(): Promise<void> {
    if (!this.isPostgresConfigured()) {
      console.log("ℹ️ Postgres not configured, skipping initialization");
      return;
    }

    try {
      // Create tables one by one for better error handling
      await sql`
        CREATE TABLE IF NOT EXISTS contact_submissions (
          id TEXT PRIMARY KEY,
          timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          subject TEXT NOT NULL,
          message TEXT NOT NULL
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS quotation_requests (
          id TEXT PRIMARY KEY,
          timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          company TEXT NOT NULL,
          country TEXT NOT NULL,
          phone TEXT NOT NULL,
          product_interest TEXT[] NOT NULL,
          quantity TEXT NOT NULL,
          message TEXT
        )
      `;

      // Create indexes (these will fail silently if they already exist, which is fine)
      try {
        await sql`CREATE INDEX IF NOT EXISTS idx_contact_submissions_timestamp ON contact_submissions(timestamp DESC)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_quotation_requests_timestamp ON quotation_requests(timestamp DESC)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_quotation_requests_email ON quotation_requests(email)`;
      } catch (indexError) {
        // Index creation errors are non-critical
        console.log("ℹ️ Some indexes may already exist, continuing...");
      }

      console.log("✅ Database tables initialized");
    } catch (error) {
      console.error("❌ Error initializing database:", error);
      // Don't throw - tables might already exist, and we'll handle errors on first use
    }
  }

  /**
   * Save a contact submission
   */
  static async saveContactSubmission(data: {
    id: string;
    timestamp: string;
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    if (!this.isPostgresConfigured()) {
      throw new Error("Postgres is not configured");
    }

    try {
      await sql`
        INSERT INTO contact_submissions (id, timestamp, name, email, subject, message)
        VALUES (${data.id}, ${data.timestamp}, ${data.name}, ${data.email}, ${data.subject}, ${data.message})
        ON CONFLICT (id) DO NOTHING
      `;
      console.log(`✅ Saved contact submission ${data.id} to Postgres`);
    } catch (error) {
      console.error("❌ Error saving contact submission:", error);
      throw error;
    }
  }

  /**
   * Get all contact submissions
   */
  static async getContactSubmissions(): Promise<any[]> {
    if (!this.isPostgresConfigured()) {
      return [];
    }

    try {
      const result = await sql`
        SELECT id, timestamp, name, email, subject, message
        FROM contact_submissions
        ORDER BY timestamp DESC
      `;
      console.log(`✅ Loaded ${result.rows.length} contact submissions from Postgres`);
      return result.rows;
    } catch (error) {
      console.error("❌ Error loading contact submissions:", error);
      return [];
    }
  }

  /**
   * Save a quotation request
   */
  static async saveQuotationRequest(data: {
    id: string;
    timestamp: string;
    name: string;
    email: string;
    company: string;
    country: string;
    phone: string;
    productInterest: string[];
    quantity: string;
    message?: string;
  }): Promise<void> {
    if (!this.isPostgresConfigured()) {
      throw new Error("Postgres is not configured");
    }

    try {
      // Convert productInterest array - Vercel Postgres handles arrays automatically
      const productInterestArray: string[] = data.productInterest || [];
      
      await sql`
        INSERT INTO quotation_requests (
          id, timestamp, name, email, company, country, phone, 
          product_interest, quantity, message
        )
        VALUES (
          ${data.id}, 
          ${data.timestamp}, 
          ${data.name}, 
          ${data.email}, 
          ${data.company}, 
          ${data.country}, 
          ${data.phone}, 
          ${productInterestArray as any}, 
          ${data.quantity}, 
          ${data.message || null}
        )
        ON CONFLICT (id) DO NOTHING
      `;
      console.log(`✅ Saved quotation request ${data.id} to Postgres`);
    } catch (error) {
      console.error("❌ Error saving quotation request:", error);
      throw error;
    }
  }

  /**
   * Get all quotation requests
   */
  static async getQuotationRequests(): Promise<any[]> {
    if (!this.isPostgresConfigured()) {
      return [];
    }

    try {
      const result = await sql`
        SELECT 
          id, timestamp, name, email, company, country, phone, 
          product_interest as "productInterest", quantity, message
        FROM quotation_requests
        ORDER BY timestamp DESC
      `;
      console.log(`✅ Loaded ${result.rows.length} quotation requests from Postgres`);
      return result.rows;
    } catch (error) {
      console.error("❌ Error loading quotation requests:", error);
      return [];
    }
  }
}

