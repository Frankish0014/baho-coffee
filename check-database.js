/**
 * Quick script to check database connection and view data
 * Run with: node check-database.js
 */

const { sql } = require('@vercel/postgres');
require('dotenv').config({ path: '.env.local' });

async function checkDatabase() {
  console.log('🔍 Checking Database Connection...\n');
  
  // Check if POSTGRES_URL is set
  if (!process.env.POSTGRES_URL) {
    console.log('❌ POSTGRES_URL is not set in .env.local');
    console.log('💡 Data is being saved to JSON files in backend/data/');
    return;
  }
  
  console.log('✅ POSTGRES_URL is configured');
  console.log('📡 Attempting to connect...\n');
  
  try {
    // Test connection
    const testResult = await sql`SELECT NOW() as current_time`;
    console.log('✅ Database connection successful!');
    console.log('⏰ Server time:', testResult.rows[0].current_time);
    console.log('\n');
    
    // Check if tables exist
    console.log('📋 Checking tables...\n');
    
    try {
      const contactCount = await sql`SELECT COUNT(*) as count FROM contact_submissions`;
      console.log(`✅ contact_submissions table exists`);
      console.log(`   Records: ${contactCount.rows[0].count}`);
      
      if (contactCount.rows[0].count > 0) {
        const recent = await sql`
          SELECT id, timestamp, name, email, subject 
          FROM contact_submissions 
          ORDER BY timestamp DESC 
          LIMIT 5
        `;
        console.log('\n   Recent submissions:');
        recent.rows.forEach((row, i) => {
          console.log(`   ${i + 1}. ${row.name} (${row.email}) - ${row.subject}`);
          console.log(`      Date: ${new Date(row.timestamp).toLocaleString()}`);
        });
      }
    } catch (err) {
      console.log('❌ contact_submissions table does not exist');
      console.log('💡 Run: Visit http://localhost:3000/api/admin/init-db');
    }
    
    console.log('\n');
    
    try {
      const quoteCount = await sql`SELECT COUNT(*) as count FROM quotation_requests`;
      console.log(`✅ quotation_requests table exists`);
      console.log(`   Records: ${quoteCount.rows[0].count}`);
      
      if (quoteCount.rows[0].count > 0) {
        const recent = await sql`
          SELECT id, timestamp, name, email, company, quantity 
          FROM quotation_requests 
          ORDER BY timestamp DESC 
          LIMIT 5
        `;
        console.log('\n   Recent requests:');
        recent.rows.forEach((row, i) => {
          console.log(`   ${i + 1}. ${row.name} (${row.company}) - ${row.quantity} kg`);
          console.log(`      Email: ${row.email}`);
          console.log(`      Date: ${new Date(row.timestamp).toLocaleString()}`);
        });
      }
    } catch (err) {
      console.log('❌ quotation_requests table does not exist');
      console.log('💡 Run: Visit http://localhost:3000/api/admin/init-db');
    }
    
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error('Error:', error.message);
    console.log('\n💡 Data might be saved to JSON files instead');
    console.log('   Check: backend/data/contact-submissions.json');
    console.log('   Check: backend/data/quotation-requests.json');
  }
}

checkDatabase().catch(console.error);

