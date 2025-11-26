import { PostgresStorage } from "./db/storage";
import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

/**
 * Unified storage utility that uses:
 * - Vercel Postgres in production (when configured)
 * - File system in local development
 */
export class Storage {
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
   * Save contact submission
   */
  static async saveContactSubmission(data: {
    id: string;
    timestamp: string;
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    if (this.isPostgresConfigured()) {
      try {
        await PostgresStorage.saveContactSubmission(data);
        return;
      } catch (error) {
        console.error("❌ Error saving to Postgres, falling back to file:", error);
        // Fall through to file system
      }
    }

    // Fallback to file system (local development)
    await this.saveToFile("contact-submissions", [data], true);
  }

  /**
   * Get all contact submissions
   */
  static async getContactSubmissions(): Promise<any[]> {
    if (this.isPostgresConfigured()) {
      try {
        return await PostgresStorage.getContactSubmissions();
      } catch (error) {
        console.error("❌ Error loading from Postgres, falling back to file:", error);
        // Fall through to file system
      }
    }

    // Fallback to file system (local development)
    return await this.loadFromFile("contact-submissions");
  }

  /**
   * Save quotation request
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
    if (this.isPostgresConfigured()) {
      try {
        await PostgresStorage.saveQuotationRequest(data);
        return;
      } catch (error) {
        console.error("❌ Error saving to Postgres, falling back to file:", error);
        // Fall through to file system
      }
    }

    // Fallback to file system (local development)
    await this.saveToFile("quotation-requests", [data], true);
  }

  /**
   * Get all quotation requests
   */
  static async getQuotationRequests(): Promise<any[]> {
    if (this.isPostgresConfigured()) {
      try {
        return await PostgresStorage.getQuotationRequests();
      } catch (error) {
        console.error("❌ Error loading from Postgres, falling back to file:", error);
        // Fall through to file system
      }
    }

    // Fallback to file system (local development)
    return await this.loadFromFile("quotation-requests");
  }

  /**
   * Save to file system (helper method)
   */
  private static async saveToFile(
    key: string,
    newItems: any[],
    append: boolean = false
  ): Promise<void> {
    // Check if we're on Vercel (read-only file system)
    if (process.env.VERCEL === "1") {
      const error = new Error(
        "Cannot save to file system on Vercel. Please set up Vercel Postgres. " +
        "See VERCEL_POSTGRES_SETUP.md for instructions."
      );
      console.error(`❌ ${error.message}`);
      throw error;
    }

    try {
      const dataDir = path.join(process.cwd(), "backend", "data");
      if (!existsSync(dataDir)) {
        await mkdir(dataDir, { recursive: true });
      }

      const filePath = path.join(dataDir, `${key}.json`);
      let existing: any[] = [];

      if (append && existsSync(filePath)) {
        const fileContent = await readFile(filePath, "utf-8");
        existing = JSON.parse(fileContent);
      }

      const allData = append ? [...existing, ...newItems] : newItems;
      await writeFile(filePath, JSON.stringify(allData, null, 2), "utf-8");
      console.log(`✅ Saved ${allData.length} items to file: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error saving to file:`, error);
      throw error;
    }
  }

  /**
   * Load from file system (helper method)
   */
  private static async loadFromFile(key: string): Promise<any[]> {
    try {
      const filePath = path.join(process.cwd(), "backend", "data", `${key}.json`);
      if (!existsSync(filePath)) {
        console.log(`ℹ️ No file found: ${filePath}`);
        return [];
      }

      const fileContent = await readFile(filePath, "utf-8");
      const parsed = JSON.parse(fileContent);
      console.log(`✅ Loaded ${Array.isArray(parsed) ? parsed.length : 0} items from file: ${filePath}`);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error(`❌ Error loading from file:`, error);
      return [];
    }
  }

  // Legacy methods for backward compatibility (deprecated)
  static async save(key: string, data: any[]): Promise<void> {
    console.warn("⚠️ Storage.save() is deprecated. Use specific methods instead.");
    await this.saveToFile(key, data, false);
  }

  static async load(key: string): Promise<any[]> {
    console.warn("⚠️ Storage.load() is deprecated. Use specific methods instead.");
    if (key === "contact-submissions") {
      return await this.getContactSubmissions();
    } else if (key === "quotation-requests") {
      return await this.getQuotationRequests();
    }
    return await this.loadFromFile(key);
  }

  static async append(key: string, newItem: any): Promise<void> {
    console.warn("⚠️ Storage.append() is deprecated. Use specific methods instead.");
    if (key === "contact-submissions") {
      await this.saveContactSubmission(newItem);
    } else if (key === "quotation-requests") {
      await this.saveQuotationRequest(newItem);
    } else {
      await this.saveToFile(key, [newItem], true);
    }
  }
}
