import { sql, isPostgresConfigured } from "./connection";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  timestamp?: string;
  status?: "active" | "unsubscribed";
}

interface NewsletterRow {
  id: string;
  email: string;
  timestamp: string;
  status: string;
}

export class NewsletterStorage {
  /**
   * Check if Postgres is configured
   */
  private static isPostgresConfigured(): boolean {
    return isPostgresConfigured();
  }

  /**
   * Initialize newsletter subscribers table
   */
  static async initialize(): Promise<void> {
    if (!this.isPostgresConfigured()) {
      console.log("ℹ️ Postgres not configured, skipping newsletter table initialization");
      return;
    }

    try {
      await sql`
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id TEXT PRIMARY KEY,
          timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
          email TEXT UNIQUE NOT NULL,
          status TEXT NOT NULL DEFAULT 'active'
        )
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_timestamp ON newsletter_subscribers(timestamp DESC)
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email)
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status)
      `;

      console.log("✅ Newsletter subscribers table initialized successfully");
    } catch (error) {
      console.error("❌ Error initializing newsletter table:", error);
      throw error;
    }
  }

  /**
   * Subscribe an email to the newsletter
   */
  static async subscribe(email: string): Promise<{ success: boolean; message: string; alreadySubscribed?: boolean }> {
    if (!this.isPostgresConfigured()) {
      throw new Error("Postgres is not configured");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address");
    }

    const id = `NEWS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const normalizedEmail = email.toLowerCase().trim();

    try {
      await sql`
        INSERT INTO newsletter_subscribers (id, email, status)
        VALUES (${id}, ${normalizedEmail}, 'active')
        ON CONFLICT (email) DO UPDATE SET
          status = 'active',
          timestamp = NOW()
      `;
      
      // Check if it was a new subscription or reactivation
      const result = await sql`
        SELECT * FROM newsletter_subscribers WHERE email = ${normalizedEmail} LIMIT 1
      `;
      
      const row = result.rows[0] as NewsletterRow;
      const wasAlreadySubscribed = row && new Date(row.timestamp).getTime() < Date.now() - 1000; // If timestamp is more than 1 second old, it was existing
      
      console.log(`✅ Newsletter subscription saved: ${normalizedEmail}`);
      
      return {
        success: true,
        message: wasAlreadySubscribed ? "You're already subscribed! We'll keep you updated." : "Successfully subscribed to our newsletter!",
        alreadySubscribed: wasAlreadySubscribed,
      };
    } catch (error: any) {
      console.error("Error subscribing to newsletter:", error);
      
      // Check if it's a duplicate key error
      if (error?.code === "23505" || error?.message?.includes("duplicate")) {
        return {
          success: true,
          message: "You're already subscribed! We'll keep you updated.",
          alreadySubscribed: true,
        };
      }
      
      throw error;
    }
  }

  /**
   * Unsubscribe an email from the newsletter
   */
  static async unsubscribe(email: string): Promise<void> {
    if (!this.isPostgresConfigured()) {
      throw new Error("Postgres is not configured");
    }

    const normalizedEmail = email.toLowerCase().trim();

    try {
      await sql`
        UPDATE newsletter_subscribers
        SET status = 'unsubscribed'
        WHERE email = ${normalizedEmail}
      `;
      console.log(`✅ Newsletter unsubscription: ${normalizedEmail}`);
    } catch (error) {
      console.error("Error unsubscribing from newsletter:", error);
      throw error;
    }
  }

  /**
   * Get all active subscribers
   */
  static async getActiveSubscribers(): Promise<NewsletterSubscriber[]> {
    if (!this.isPostgresConfigured()) {
      return [];
    }

    try {
      const result = await sql`
        SELECT * FROM newsletter_subscribers 
        WHERE status = 'active'
        ORDER BY timestamp DESC
      `;

      return result.rows.map((row: NewsletterRow) => ({
        id: row.id,
        email: row.email,
        timestamp: row.timestamp ? new Date(row.timestamp).toISOString() : undefined,
        status: row.status as "active" | "unsubscribed",
      }));
    } catch (error) {
      console.error("Error getting newsletter subscribers:", error);
      return [];
    }
  }

  /**
   * Get all subscribers (for admin)
   */
  static async getAllSubscribers(limit: number = 1000): Promise<NewsletterSubscriber[]> {
    if (!this.isPostgresConfigured()) {
      return [];
    }

    try {
      const result = await sql`
        SELECT * FROM newsletter_subscribers 
        ORDER BY timestamp DESC
        LIMIT ${limit}
      `;

      return result.rows.map((row: NewsletterRow) => ({
        id: row.id,
        email: row.email,
        timestamp: row.timestamp ? new Date(row.timestamp).toISOString() : undefined,
        status: row.status as "active" | "unsubscribed",
      }));
    } catch (error) {
      console.error("Error getting newsletter subscribers:", error);
      return [];
    }
  }

  /**
   * Check if an email is subscribed
   */
  static async isSubscribed(email: string): Promise<boolean> {
    if (!this.isPostgresConfigured()) {
      return false;
    }

    const normalizedEmail = email.toLowerCase().trim();

    try {
      const result = await sql`
        SELECT status FROM newsletter_subscribers 
        WHERE email = ${normalizedEmail} AND status = 'active'
        LIMIT 1
      `;

      return result.rows.length > 0;
    } catch (error) {
      console.error("Error checking subscription status:", error);
      return false;
    }
  }
}

