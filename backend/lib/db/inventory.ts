import { sql, isPostgresConfigured } from "./connection";

export interface InventoryItem {
  productId: string;
  productName: string;
  availableQuantity: number;
  reservedQuantity?: number; // Quantity reserved but not yet paid
  lastUpdated?: string;
}

interface InventoryRow {
  product_id: string;
  product_name: string;
  available_quantity: number;
  reserved_quantity: number;
  last_updated: string;
}

export class InventoryStorage {
  /**
   * Check if Postgres is configured
   */
  private static isPostgresConfigured(): boolean {
    return isPostgresConfigured();
  }

  /**
   * Initialize inventory table
   */
  static async initialize(): Promise<void> {
    if (!this.isPostgresConfigured()) {
      // Silently skip if not configured - expected in local dev without database
      return;
    }

    try {
      await sql`
        CREATE TABLE IF NOT EXISTS inventory (
          product_id TEXT PRIMARY KEY,
          product_name TEXT NOT NULL,
          available_quantity DECIMAL(10, 2) NOT NULL DEFAULT 0,
          reserved_quantity DECIMAL(10, 2) NOT NULL DEFAULT 0,
          last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
        )
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_inventory_product_id ON inventory(product_id)
      `;

      console.log("✅ Inventory table initialized successfully");
    } catch (error: any) {
      // Don't throw - handle connection errors gracefully
      const errorMessage = error?.message || String(error);
      const errorCode = error?.code || "";
      
      // Silently handle connection/timeout errors - database might not be available
      if (
        errorMessage.includes("timeout") || 
        errorMessage.includes("ECONNREFUSED") || 
        errorMessage.includes("fetch failed") ||
        errorMessage.includes("Connect Timeout") ||
        errorCode === "UND_ERR_CONNECT_TIMEOUT"
      ) {
        // Connection failed - skip initialization silently
        return;
      }
      
      // Log other errors but don't throw - allow app to continue
      console.warn("⚠️ Could not initialize inventory table (non-critical):", errorMessage);
    }
  }

  /**
   * Get all inventory items
   */
  static async getAllInventory(): Promise<InventoryItem[]> {
    if (!this.isPostgresConfigured()) {
      return [];
    }

    try {
      const result = await sql`
        SELECT * FROM inventory ORDER BY product_name
      `;

      return result.rows.map((row: InventoryRow) => ({
        productId: row.product_id,
        productName: row.product_name,
        availableQuantity: parseFloat(String(row.available_quantity)),
        reservedQuantity: parseFloat(String(row.reserved_quantity || 0)),
        lastUpdated: row.last_updated ? new Date(row.last_updated).toISOString() : undefined,
      }));
    } catch (error) {
      console.error("Error getting inventory:", error);
      return [];
    }
  }

  /**
   * Get inventory for a specific product
   */
  static async getInventory(productId: string): Promise<InventoryItem | null> {
    if (!this.isPostgresConfigured()) {
      return null;
    }

    try {
      const result = await sql`
        SELECT * FROM inventory WHERE product_id = ${productId} LIMIT 1
      `;

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0] as InventoryRow;
      return {
        productId: row.product_id,
        productName: row.product_name,
        availableQuantity: parseFloat(String(row.available_quantity)),
        reservedQuantity: parseFloat(String(row.reserved_quantity || 0)),
        lastUpdated: row.last_updated ? new Date(row.last_updated).toISOString() : undefined,
      };
    } catch (error) {
      console.error("Error getting inventory item:", error);
      return null;
    }
  }

  /**
   * Update inventory quantity (for admin or initial setup)
   * Sets the quantity to a specific value
   */
  static async updateInventory(
    productId: string,
    productName: string,
    availableQuantity: number
  ): Promise<void> {
    if (!this.isPostgresConfigured()) {
      throw new Error("Postgres is not configured");
    }

    try {
      await sql`
        INSERT INTO inventory (product_id, product_name, available_quantity, last_updated)
        VALUES (${productId}, ${productName}, ${availableQuantity}, NOW())
        ON CONFLICT (product_id) DO UPDATE SET
          product_name = EXCLUDED.product_name,
          available_quantity = EXCLUDED.available_quantity,
          last_updated = NOW()
      `;
    } catch (error) {
      console.error("Error updating inventory:", error);
      throw error;
    }
  }

  /**
   * Add inventory quantity (increment existing stock)
   * Use this when you receive more coffee produce
   */
  static async addInventory(
    productId: string,
    productName: string,
    quantityToAdd: number
  ): Promise<void> {
    if (!this.isPostgresConfigured()) {
      throw new Error("Postgres is not configured");
    }

    if (quantityToAdd <= 0) {
      throw new Error("Quantity to add must be greater than 0");
    }

    try {
      // First, check if product exists
      const existing = await this.getInventory(productId);
      
      if (existing) {
        // Product exists, increment the quantity
        await sql`
          UPDATE inventory
          SET 
            available_quantity = available_quantity + ${quantityToAdd},
            product_name = ${productName},
            last_updated = NOW()
          WHERE product_id = ${productId}
        `;
      } else {
        // Product doesn't exist, create it with the new quantity
        await sql`
          INSERT INTO inventory (product_id, product_name, available_quantity, last_updated)
          VALUES (${productId}, ${productName}, ${quantityToAdd}, NOW())
        `;
      }
    } catch (error) {
      console.error("Error adding inventory:", error);
      throw error;
    }
  }

  /**
   * Reduce inventory after successful payment
   * If product doesn't exist, it will be created with 0 quantity (so the reduction fails but is logged)
   */
  static async reduceInventory(
    productId: string,
    quantity: number,
    productName?: string
  ): Promise<boolean> {
    if (!this.isPostgresConfigured()) {
      console.warn("Postgres not configured, skipping inventory reduction");
      return false;
    }

    try {
      // Check if product exists
      let current = await this.getInventory(productId);
      
      if (!current) {
        // Product doesn't exist - create it with 0 quantity so we can track the attempt
        // This allows the reduction to fail gracefully while logging the issue
        console.warn(`⚠️ Product ${productId} not found in inventory. Creating entry with 0 quantity.`);
        console.warn(`⚠️ Please initialize inventory with default products by visiting /api/inventory/init or /api/admin/init-db`);
        
        // Create the product entry with 0 quantity
        const defaultName = productName || productId.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
        await sql`
          INSERT INTO inventory (product_id, product_name, available_quantity, last_updated)
          VALUES (${productId}, ${defaultName}, 0, NOW())
          ON CONFLICT (product_id) DO NOTHING
        `;
        
        // Try to get it again
        current = await this.getInventory(productId);
        if (!current) {
          console.error(`❌ Failed to create inventory entry for ${productId}`);
          return false;
        }
      }

      if (current.availableQuantity < quantity) {
        console.warn(
          `⚠️ Insufficient inventory for ${productId}. Available: ${current.availableQuantity} kg, Requested: ${quantity} kg`
        );
        return false;
      }

      // Reduce the quantity
      await sql`
        UPDATE inventory
        SET 
          available_quantity = available_quantity - ${quantity},
          last_updated = NOW()
        WHERE product_id = ${productId}
          AND available_quantity >= ${quantity}
      `;

      return true;
    } catch (error) {
      console.error("Error reducing inventory:", error);
      return false;
    }
  }

  /**
   * Reduce inventory for multiple products (batch operation)
   * Processes all products even if some fail, and returns results for each product
   */
  static async reduceInventoryBatch(
    items: Array<{ productId: string; quantity: number; productName?: string }>
  ): Promise<Array<{ productId: string; success: boolean; error?: string }>> {
    if (!this.isPostgresConfigured()) {
      console.warn("Postgres not configured, skipping inventory reduction");
      return items.map(item => ({ productId: item.productId, success: false, error: "Postgres not configured" }));
    }

    const results: Array<{ productId: string; success: boolean; error?: string }> = [];
    
    // Process each item individually to ensure all products are attempted
    for (const item of items) {
      try {
        console.log(`📦 Processing inventory reduction for ${item.productId}: ${item.quantity} kg`);
        const success = await this.reduceInventory(item.productId, item.quantity, item.productName);
        if (success) {
          results.push({ productId: item.productId, success: true });
          console.log(`✅ Successfully reduced ${item.quantity} kg from ${item.productId}`);
        } else {
          results.push({ productId: item.productId, success: false, error: "Reduction failed (insufficient stock or product not found)" });
          console.warn(`⚠️ Failed to reduce inventory for ${item.productId}`);
        }
      } catch (error: any) {
        const errorMessage = error?.message || "Unknown error";
        results.push({ productId: item.productId, success: false, error: errorMessage });
        console.error(`❌ Error reducing inventory for ${item.productId}:`, errorMessage);
        // Continue processing other items even if one fails
      }
    }
    
    // Log summary
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    console.log(`📊 Inventory reduction summary: ${successful} succeeded, ${failed} failed out of ${items.length} products`);
    
    if (failed > 0) {
      console.warn(`⚠️ Some products failed to reduce. Please check inventory initialization at /api/inventory/init`);
    }
    
    return results;
  }

  /**
   * Initialize inventory with default products (for first-time setup)
   */
  static async initializeDefaultInventory(): Promise<void> {
    if (!this.isPostgresConfigured()) {
      return;
    }

    const defaultProducts = [
      { id: "bugoyi-washed", name: "Bugoyi Washed", quantity: 5000 },
      { id: "matyazo-natural", name: "Matyazo Natural", quantity: 3000 },
      { id: "humure-washed", name: "Humure Washed", quantity: 4000 },
      { id: "humure-natural", name: "Humure Natural", quantity: 3500 },
      { id: "humure-honey", name: "Humure Honey", quantity: 2800 },
      { id: "fugi-washed", name: "Fugi Washed", quantity: 4500 },
      { id: "fugi-honey", name: "Fugi Honey", quantity: 3200 },
      { id: "fugi-natural", name: "Fugi Natural", quantity: 2500 },
      { id: "gitoki-washed", name: "Gitoki Washed", quantity: 4200 },
      { id: "gitoki-natural", name: "Gitoki Natural", quantity: 2900 },
      { id: "muzo-washed", name: "Muzo Washed", quantity: 3800 },
      { id: "muzo-honey", name: "Muzo Honey", quantity: 2700 },
      { id: "gaseke-washed", name: "Gaseke Washed", quantity: 3600 },
      { id: "gaseke-natural", name: "Gaseke Natural", quantity: 2400 },
      { id: "cyabingo-washed", name: "Cyabingo Washed", quantity: 3300 },
      { id: "cyabingo-honey", name: "Cyabingo Honey", quantity: 2600 },
      { id: "ngoma-washed", name: "Ngoma Washed", quantity: 4100 },
      { id: "ngoma-natural", name: "Ngoma Natural", quantity: 3100 },
      { id: "akagera-washed", name: "Akagera Washed", quantity: 3400 },
      { id: "akagera-honey", name: "Akagera Honey", quantity: 2200 },
      { id: "bweyeye-washed", name: "Bweyeye Washed", quantity: 3900 },
      { id: "bweyeye-natural", name: "Bweyeye Natural", quantity: 3000 },
      { id: "kinazi-washed", name: "Kinazi Washed", quantity: 3700 },
      { id: "kinazi-honey", name: "Kinazi Honey", quantity: 2300 },
      { id: "kinazi-natural", name: "Kinazi Natural", quantity: 2100 },
      { id: "buheta-washed", name: "Buheta Washed", quantity: 4000 },
      { id: "buheta-natural", name: "Buheta Natural", quantity: 2800 },
      { id: "kamegeri-washed", name: "Kamegeri Washed", quantity: 3500 },
      { id: "kamegeri-natural", name: "Kamegeri Natural", quantity: 2500 },
      { id: "neza-washed", name: "Neza Washed", quantity: 3400 },
      { id: "neza-honey", name: "Neza Honey", quantity: 2200 },
      { id: "mukura-washed", name: "Mukura Washed", quantity: 3300 },
      { id: "mukura-natural", name: "Mukura Natural", quantity: 2400 },
    ];

    try {
      for (const product of defaultProducts) {
        await this.updateInventory(product.id, product.name, product.quantity);
      }
      console.log("✅ Default inventory initialized");
    } catch (error) {
      console.error("Error initializing default inventory:", error);
      throw error;
    }
  }
}

