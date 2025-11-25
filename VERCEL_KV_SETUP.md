# Vercel KV Setup Guide

This project uses **Vercel KV** (Redis) to store contact form submissions and quotation requests on Vercel. The storage automatically falls back to file system in local development.

## Why Vercel KV?

On Vercel, the file system is read-only, so we can't save data to files. Vercel KV provides a persistent Redis database that works perfectly with serverless functions.

## Setup Instructions

### 1. Create a Vercel KV Database

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Navigate to your project: **baho-coffee**
3. Click on the **Storage** tab
4. Click **Create Database**
5. Select **KV** (Redis)
6. Choose a name (e.g., `baho-coffee-kv`) and region
7. Click **Create**

### 2. Link the KV Database to Your Project

After creating the database, Vercel will automatically:
- Add the required environment variables (`KV_REST_API_URL` and `KV_REST_API_TOKEN`)
- Link the database to your project

### 3. Redeploy Your Project

After linking the database, you need to redeploy:

1. Go to the **Deployments** tab
2. Click **Redeploy** on your latest deployment, OR
3. Push a new commit to trigger a new deployment

**Important**: The environment variables (`KV_REST_API_URL` and `KV_REST_API_TOKEN`) are automatically added when you link the database, but you MUST redeploy for them to take effect.

### 4. Migrate Existing Data (If Any)

If you have existing contact submissions or quotation requests in your local `data/` folder, you can migrate them to KV:

1. After redeploying, visit: `https://your-site.vercel.app/api/admin/migrate`
2. Or use curl/Postman to POST to that endpoint
3. This will copy all existing data from files to KV

**Note**: This only needs to be done once. New submissions will automatically go to KV.

## How It Works

- **Local Development**: Data is saved to `data/contact-submissions.json` and `data/quotation-requests.json`
- **Vercel Production**: Data is saved to Vercel KV (Redis) automatically
- **Automatic Fallback**: If KV is not configured, it falls back to file system (though this won't work on Vercel)

## Testing

After setup, test by:
1. Submitting a contact form on https://baho-coffee.vercel.app/contact
2. Submitting a quotation request on https://baho-coffee.vercel.app/export
3. Checking the admin panel at https://baho-coffee.vercel.app/admin

Both submissions should appear in the admin panel!

## Free Tier Limits

Vercel KV free tier includes:
- 256 MB storage
- 30,000 commands/day
- Perfect for contact forms and quotation requests

## Troubleshooting

**Issue**: Submissions not appearing in admin panel on Vercel
- **Solution**: 
  1. Make sure Vercel KV is created and linked to your project
  2. Check that environment variables are set in Vercel dashboard (Settings → Environment Variables)
  3. **Redeploy after linking the database** (this is critical!)
  4. Check Vercel function logs to see if KV is being used
  5. Try submitting a new form after redeploying
  6. Visit `/api/admin/migrate` to migrate existing data

**Issue**: "KV_REST_API_URL not set" errors
- **Solution**: 
  1. Go to Vercel dashboard → Your Project → Storage
  2. Make sure the KV database is linked (should show "Linked" status)
  3. If not linked, click "Link" next to your KV database
  4. Redeploy the project

**Issue**: Data not showing after migration
- **Solution**:
  1. Check Vercel function logs (Deployments → Click on deployment → Functions tab)
  2. Look for "✅ Loaded X items from KV" messages
  3. Make sure you're checking the correct environment (Production vs Preview)
  4. Try submitting a new form to test if new data is being saved

**Issue**: Build errors about KV
- **Solution**: The code handles missing KV gracefully, but make sure to create the database before deploying

## Need Help?

If you encounter issues:
1. Check Vercel logs in the dashboard
2. Verify KV database is created and linked
3. Ensure environment variables are set
4. Redeploy after making changes

