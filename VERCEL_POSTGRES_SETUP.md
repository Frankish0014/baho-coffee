# Vercel Postgres Setup Guide

This project uses **Vercel Postgres** (PostgreSQL) to store contact form submissions and quotation requests. It's free and works perfectly with Vercel!

## Why Vercel Postgres?

- ✅ **Free tier available** - Perfect for small to medium projects
- ✅ **Automatic setup** - Integrated directly with Vercel
- ✅ **Reliable** - PostgreSQL is a robust, production-ready database
- ✅ **Easy to use** - Simple SQL queries, no complex setup needed

## Free Tier Limits

Vercel Postgres free tier includes:
- **256 MB storage** - Plenty for contact forms and quotations
- **60 hours compute time/month** - More than enough for typical usage
- **Automatic backups** - Your data is safe

## Setup Instructions

### 1. Create a Vercel Postgres Database

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Navigate to your project: **baho-coffee**
3. Click on the **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a name (e.g., `baho-coffee-db`) and region (choose closest to your users)
7. Click **Create**

### 2. Link the Database to Your Project

After creating the database, Vercel will automatically:
- Add the required environment variables (`POSTGRES_URL`, `POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING`)
- Link the database to your project

**Important**: Make sure the database shows as "Linked" in the Storage tab.

### 3. Redeploy Your Project

After linking the database, you **MUST** redeploy:

1. Go to the **Deployments** tab
2. Click **Redeploy** on your latest deployment, OR
3. Push a new commit to trigger a new deployment

**This is critical!** The environment variables are only available after redeploying.

### 4. Initialize Database Tables

After redeploying, initialize the database tables:

1. Visit: `https://your-site.vercel.app/api/admin/init-db`
2. Or use curl: `curl -X POST https://your-site.vercel.app/api/admin/init-db`

This creates the necessary tables (`contact_submissions` and `quotation_requests`).

**Note**: This only needs to be done once. The tables are created automatically on first use, but calling this endpoint ensures they're set up correctly.

## How It Works

- **Vercel Production**: Data is saved to Vercel Postgres automatically
- **Local Development**: 
  - If `POSTGRES_URL` is set in `.env.local`, uses the same Postgres database (recommended)
  - If not set, falls back to `data/contact-submissions.json` and `data/quotation-requests.json` files
- **Same Database**: You can use the same Postgres database for both local and production!

## Using Postgres Locally (Recommended)

You can connect to your Vercel Postgres database from local development:

### 1. Get Connection Strings from Vercel

1. Go to Vercel Dashboard → Your Project → Storage → Your Postgres Database
2. Click on the **.env.local** tab (or **Settings** tab)
3. Copy the connection strings:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL` (optional)
   - `POSTGRES_URL_NON_POOLING` (optional)

### 2. Add to Local Environment

1. Create or edit `.env.local` in your project root
2. Add the connection strings:

```env
POSTGRES_URL=postgres://...
POSTGRES_PRISMA_URL=postgres://...
POSTGRES_URL_NON_POOLING=postgres://...
```

### 3. Restart Your Dev Server

```bash
npm run dev
```

Now your local development will use the same Postgres database as production! 🎉

**Benefits:**
- ✅ Same data in local and production
- ✅ Test with real database structure
- ✅ No need to sync data between environments
- ✅ Consistent behavior

## Testing

After setup, test by:

1. **Initialize the database**: Visit `/api/admin/init-db` (POST request)
2. **Submit a contact form**: Go to `/contact` and submit a message
3. **Submit a quotation**: Go to `/export` and submit a quotation request
4. **Check admin panel**: Go to `/admin` and verify both submissions appear

## Migrating Existing Data

If you have existing data in your local `data/` folder, you can migrate it:

1. The data will automatically be used in local development
2. For production, new submissions will go to Postgres
3. Old data in files won't automatically migrate, but new submissions will be saved to Postgres

## Troubleshooting

### Issue: "Postgres is not configured" errors

**Solution**:
1. Go to Vercel dashboard → Your Project → Storage
2. Make sure Postgres database is created and shows "Linked"
3. Check Settings → Environment Variables - you should see:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
4. **Redeploy** after linking the database

### Issue: Submissions not appearing in admin panel

**Solution**:
1. Make sure you've initialized the database: `/api/admin/init-db`
2. Check Vercel function logs (Deployments → Click deployment → Functions tab)
3. Look for "✅ Saved contact submission" or "✅ Loaded X submissions" messages
4. Try submitting a new form after redeploying

### Issue: "relation does not exist" errors

**Solution**:
1. Visit `/api/admin/init-db` to create the tables
2. Or the tables will be created automatically on first submission
3. Check Vercel logs to see if table creation succeeded

### Issue: Database connection errors

**Solution**:
1. Verify environment variables are set in Vercel dashboard
2. Make sure you've redeployed after linking the database
3. Check that the database is not paused (should show "Active" status)
4. Verify you're within free tier limits

## Viewing Your Data

You can view your data directly in Vercel:

1. Go to Storage → Your Postgres database
2. Click "Data" tab
3. Browse the `contact_submissions` and `quotation_requests` tables

## Need Help?

If you encounter issues:

1. **Check Vercel logs**: Deployments → Click deployment → Functions tab
2. **Verify database status**: Storage tab → Check database is "Active" and "Linked"
3. **Test initialization**: Visit `/api/admin/init-db` and check response
4. **Check environment variables**: Settings → Environment Variables

## Next Steps

After setup:
- ✅ Database tables are created automatically
- ✅ New submissions go to Postgres
- ✅ Admin panel shows all data
- ✅ Everything works seamlessly!

Enjoy your free, reliable database! 🎉

