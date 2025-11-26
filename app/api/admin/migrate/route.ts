import { NextResponse } from "next/server";
import { Storage } from "@/backend/lib/storage";
import { PostgresStorage } from "@/backend/lib/db/storage";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

/**
 * Migration endpoint to move data from file system to Vercel Postgres
 * This should be called once after setting up Vercel Postgres
 */
export async function POST() {
  try {
    console.log("🔄 Starting migration from file system to Postgres...");

    // Check if Postgres is configured
    if (!process.env.POSTGRES_URL) {
      return NextResponse.json(
        { 
          error: "Vercel Postgres is not configured. Please set up POSTGRES_URL environment variable.",
          configured: false
        },
        { status: 400 }
      );
    }

    // Initialize database tables
    await PostgresStorage.initialize();

    const results: { [key: string]: { migrated: number; errors: string[] } } = {};

    // Migrate contact submissions
    try {
      const contactFile = path.join(process.cwd(), "data", "contact-submissions.json");
      if (existsSync(contactFile)) {
        const fileContent = await readFile(contactFile, "utf-8");
        const submissions = JSON.parse(fileContent);
        
        if (Array.isArray(submissions) && submissions.length > 0) {
          // Save each submission to Postgres
          for (const submission of submissions) {
            await PostgresStorage.saveContactSubmission(submission);
          }
          results["contact-submissions"] = { 
            migrated: submissions.length, 
            errors: [] 
          };
          console.log(`✅ Migrated ${submissions.length} contact submissions to Postgres`);
        } else {
          results["contact-submissions"] = { migrated: 0, errors: ["No data to migrate"] };
        }
      } else {
        results["contact-submissions"] = { migrated: 0, errors: ["File not found"] };
      }
    } catch (error: any) {
      results["contact-submissions"] = { 
        migrated: 0, 
        errors: [error.message || String(error)] 
      };
      console.error("❌ Error migrating contact submissions:", error);
    }

    // Migrate quotation requests
    try {
      const quotationFile = path.join(process.cwd(), "data", "quotation-requests.json");
      if (existsSync(quotationFile)) {
        const fileContent = await readFile(quotationFile, "utf-8");
        const requests = JSON.parse(fileContent);
        
        if (Array.isArray(requests) && requests.length > 0) {
          // Save each request to Postgres
          for (const request of requests) {
            await PostgresStorage.saveQuotationRequest({
              ...request,
              productInterest: request.productInterest || request.product_interest || []
            });
          }
          results["quotation-requests"] = { 
            migrated: requests.length, 
            errors: [] 
          };
          console.log(`✅ Migrated ${requests.length} quotation requests to Postgres`);
        } else {
          results["quotation-requests"] = { migrated: 0, errors: ["No data to migrate"] };
        }
      } else {
        results["quotation-requests"] = { migrated: 0, errors: ["File not found"] };
      }
    } catch (error: any) {
      results["quotation-requests"] = { 
        migrated: 0, 
        errors: [error.message || String(error)] 
      };
      console.error("❌ Error migrating quotation requests:", error);
    }

    const totalMigrated = Object.values(results).reduce((sum, r) => sum + r.migrated, 0);

    return NextResponse.json({
      success: true,
      message: `Migration completed. Migrated ${totalMigrated} total items.`,
      results,
      totalMigrated
    }, { status: 200 });

  } catch (error: any) {
    console.error("❌ Migration error:", error);
    return NextResponse.json(
      { 
        error: "Migration failed", 
        details: error.message || String(error) 
      },
      { status: 500 }
    );
  }
}

