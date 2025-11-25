import { NextResponse } from "next/server";
import { Storage } from "@/lib/storage";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

/**
 * Migration endpoint to move data from file system to Vercel KV
 * This should be called once after setting up Vercel KV
 */
export async function POST() {
  try {
    console.log("🔄 Starting migration from file system to KV...");

    // Check if KV is configured
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      return NextResponse.json(
        { 
          error: "Vercel KV is not configured. Please set up KV_REST_API_URL and KV_REST_API_TOKEN environment variables.",
          configured: false
        },
        { status: 400 }
      );
    }

    const results: { [key: string]: { migrated: number; errors: string[] } } = {};

    // Migrate contact submissions
    try {
      const contactFile = path.join(process.cwd(), "data", "contact-submissions.json");
      if (existsSync(contactFile)) {
        const fileContent = await readFile(contactFile, "utf-8");
        const submissions = JSON.parse(fileContent);
        
        if (Array.isArray(submissions) && submissions.length > 0) {
          await Storage.save("contact-submissions", submissions);
          results["contact-submissions"] = { 
            migrated: submissions.length, 
            errors: [] 
          };
          console.log(`✅ Migrated ${submissions.length} contact submissions`);
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
          await Storage.save("quotation-requests", requests);
          results["quotation-requests"] = { 
            migrated: requests.length, 
            errors: [] 
          };
          console.log(`✅ Migrated ${requests.length} quotation requests`);
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

