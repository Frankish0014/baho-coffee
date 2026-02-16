#!/usr/bin/env node

/**
 * Setup Verification Script
 * Run this to verify your local and production setup
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Setup...\n');

let allGood = true;

// Check 1: .env.local exists
console.log('1. Checking .env.local...');
const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf-8');
  const hasResend = envContent.includes('RESEND_API_KEY');
  const hasPostgres = envContent.includes('POSTGRES_URL');
  
  console.log('   ✅ .env.local exists');
  if (hasResend) {
    console.log('   ✅ RESEND_API_KEY found');
  } else {
    console.log('   ⚠️  RESEND_API_KEY not found (email won\'t work)');
    allGood = false;
  }
  
  if (hasPostgres) {
    console.log('   ✅ POSTGRES_URL found (will use Postgres)');
  } else {
    console.log('   ℹ️  POSTGRES_URL not found (will use file system)');
  }
} else {
  console.log('   ⚠️  .env.local not found');
  console.log('   💡 Create it with RESEND_API_KEY at minimum');
  allGood = false;
}

// Check 2: data directory
console.log('\n2. Checking data directory...');
const dataDir = path.join(process.cwd(), 'data');
if (fs.existsSync(dataDir)) {
  console.log('   ✅ data/ directory exists');
} else {
  console.log('   ℹ️  data/ directory will be created automatically');
}

// Check 3: Dependencies
console.log('\n3. Checking dependencies...');
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const hasPostgres = packageJson.dependencies && packageJson.dependencies['@vercel/postgres'];
  
  if (hasPostgres) {
    console.log('   ✅ @vercel/postgres installed');
  } else {
    console.log('   ❌ @vercel/postgres not found');
    console.log('   💡 Run: npm install @vercel/postgres');
    allGood = false;
  }
} else {
  console.log('   ❌ package.json not found');
  allGood = false;
}

// Check 4: API routes
console.log('\n4. Checking API routes...');
const apiRoutes = [
  'app/api/contact/route.ts',
  'app/api/contact/submissions/route.ts',
  'app/api/export/quotation/route.ts',
  'app/api/export/quotation/requests/route.ts',
  'lib/storage.ts',
  'lib/db/storage.ts'
];

let routesOk = true;
apiRoutes.forEach(route => {
  const routePath = path.join(process.cwd(), route);
  if (fs.existsSync(routePath)) {
    console.log(`   ✅ ${route}`);
  } else {
    console.log(`   ❌ ${route} missing`);
    routesOk = false;
    allGood = false;
  }
});

// Summary
console.log('\n' + '='.repeat(50));
if (allGood && routesOk) {
  console.log('✅ Setup looks good!');
  console.log('\nNext steps:');
  console.log('1. Run: npm run dev');
  console.log('2. Test contact form at: http://localhost:3000/contact');
  console.log('3. Test admin panel at: http://localhost:3000/admin');
} else {
  console.log('⚠️  Some issues found. Please fix them above.');
}
console.log('='.repeat(50) + '\n');

process.exit(allGood && routesOk ? 0 : 1);

