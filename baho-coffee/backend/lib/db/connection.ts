import { sql as vercelSql } from "@vercel/postgres";

// Unified SQL interface
let sql: any;
let isLocal = false;
let pool: any = null;

/**
 * Initialize database connection
 * Supports both local PostgreSQL and Vercel Postgres
 */
export function initializeDatabase() {
  // Check if we should use local PostgreSQL
  const localPostgresUrl = process.env.LOCAL_POSTGRES_URL || process.env.DATABASE_URL;
  const vercelPostgresUrl = process.env.POSTGRES_URL;

  if (localPostgresUrl && !vercelPostgresUrl) {
    // Use local PostgreSQL (dynamic import to handle pg override)
    isLocal = true;
    try {
      // Use dynamic import to handle the pg override to @neondatabase/serverless
      const pgModule = require("pg");
      const Pool = pgModule.Pool || pgModule.default?.Pool || pgModule.default;
      pool = new Pool({
        connectionString: localPostgresUrl,
      } as any);
    } catch (error) {
      console.warn("⚠️ Failed to initialize local PostgreSQL pool:", error);
      pool = null;
    }

    // Create a compatible sql interface for local PostgreSQL
    // This wraps the template literal to work with pg Pool
    sql = async (strings: TemplateStringsArray, ...values: any[]) => {
      if (!pool) {
        throw new Error("Database pool not initialized");
      }
      
      // Build query with parameterized values
      let queryText = "";
      const queryValues: any[] = [];
      
      for (let i = 0; i < strings.length; i++) {
        queryText += strings[i];
        if (i < values.length) {
          queryValues.push(values[i]);
          queryText += `$${queryValues.length}`;
        }
      }
      
      const result = await pool.query(queryText, queryValues);
      // Return in Vercel's format: { rows: [...] }
      return { rows: result.rows };
    };
    
    console.log("✅ Using local PostgreSQL connection");
  } else if (vercelPostgresUrl) {
    // Use Vercel Postgres
    isLocal = false;
    sql = vercelSql;
    console.log("✅ Using Vercel Postgres connection");
  } else {
    console.warn("⚠️ No PostgreSQL connection string found. Set LOCAL_POSTGRES_URL or POSTGRES_URL");
    // Create a no-op sql for development
    sql = (() => Promise.resolve({ rows: [] })) as any;
  }

  return sql;
}

// Initialize on import
try {
  sql = initializeDatabase();
} catch (error) {
  console.warn("Database initialization error:", error);
  // Create a no-op sql for development
  sql = (() => Promise.resolve({ rows: [] })) as any;
}

export { sql, isLocal };

/**
 * Check if Postgres is configured
 */
export function isPostgresConfigured(): boolean {
  return !!(
    process.env.POSTGRES_URL ||
    process.env.LOCAL_POSTGRES_URL ||
    process.env.DATABASE_URL ||
    (process.env.POSTGRES_PRISMA_URL && process.env.POSTGRES_URL_NON_POOLING)
  );
}

