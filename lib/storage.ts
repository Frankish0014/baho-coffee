import { kv } from "@vercel/kv";
import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// Check if we're in a Vercel environment and KV is configured
const isVercel = process.env.VERCEL === "1" || process.env.KV_REST_API_URL;
const kvConfigured = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

/**
 * Storage utility that uses Vercel KV in production and file system in development
 */
export class Storage {
  /**
   * Save data to storage
   */
  static async save(key: string, data: any[]): Promise<void> {
    if (isVercel && kvConfigured) {
      // Use Vercel KV in production
      try {
        await kv.set(key, JSON.stringify(data));
        console.log(`✅ Saved ${data.length} items to KV with key: ${key}`);
      } catch (error) {
        console.error(`❌ Error saving to KV:`, error);
        // Fallback to file system if KV fails (shouldn't happen in production, but safer)
        console.log(`⚠️ Falling back to file system storage`);
        await this.saveToFile(key, data);
      }
    } else {
      // Use file system in development or if KV not configured
      await this.saveToFile(key, data);
    }
  }

  /**
   * Save to file system (helper method)
   */
  private static async saveToFile(key: string, data: any[]): Promise<void> {
    // Check if we're on Vercel (read-only file system)
    if (process.env.VERCEL === "1") {
      const error = new Error(
        "Cannot save to file system on Vercel. Please set up Vercel KV storage. " +
        "See VERCEL_KV_SETUP.md for instructions."
      );
      console.error(`❌ ${error.message}`);
      throw error;
    }

    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!existsSync(dataDir)) {
        await mkdir(dataDir, { recursive: true });
      }

      const filePath = path.join(dataDir, `${key}.json`);
      await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
      console.log(`✅ Saved ${data.length} items to file: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error saving to file:`, error);
      throw error;
    }
  }

  /**
   * Load data from storage
   */
  static async load(key: string): Promise<any[]> {
    if (isVercel && kvConfigured) {
      // Use Vercel KV in production
      try {
        const data = await kv.get<string>(key);
        if (!data) {
          console.log(`ℹ️ No data found in KV for key: ${key}`);
          return [];
        }
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        console.log(`✅ Loaded ${Array.isArray(parsed) ? parsed.length : 0} items from KV with key: ${key}`);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error(`❌ Error loading from KV:`, error);
        // Fallback to file system if KV fails
        console.log(`⚠️ Falling back to file system storage`);
        return await this.loadFromFile(key);
      }
    } else {
      // Use file system in development or if KV not configured
      return await this.loadFromFile(key);
    }
  }

  /**
   * Load from file system (helper method)
   */
  private static async loadFromFile(key: string): Promise<any[]> {
    try {
      const filePath = path.join(process.cwd(), "data", `${key}.json`);
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

  /**
   * Append a new item to storage
   */
  static async append(key: string, newItem: any): Promise<void> {
    const existing = await this.load(key);
    existing.push(newItem);
    await this.save(key, existing);
  }
}

