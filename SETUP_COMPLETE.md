# Complete Setup Guide - Local & Production

This guide ensures everything works both **locally** and **on Vercel**.

## ✅ Quick Setup Checklist

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables

#### For Local Development:

Create `.env.local` in your project root:

```env
# Vercel Postgres (Optional - if you want to use Postgres locally)
# Get these from: Vercel Dashboard → Storage → Postgres → .env.local tab
POSTGRES_URL=postgres://...
POSTGRES_PRISMA_URL=postgres://...
POSTGRES_URL_NON_POOLING=postgres://...

# Resend Email API (Required for contact/quotation forms)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Note**: 
- If `POSTGRES_URL` is set → Uses Postgres (same database as production)
- If `POSTGRES_URL` is NOT set → Uses file system (`data/*.json` files)

#### For Vercel Production:

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add these variables:
   - `POSTGRES_URL` (automatically added when you link Postgres)
   - `POSTGRES_PRISMA_URL` (automatically added)
   - `POSTGRES_URL_NON_POOLING` (automatically added)
   - `RESEND_API_KEY` (you need to add this)
   - `RESEND_FROM_EMAIL` (optional, defaults to onboarding@resend.dev)

### 3. Set Up Vercel Postgres (Production)

1. **Create Database**:
   - Vercel Dashboard → Your Project → **Storage** tab
   - Click **Create Database** → Select **Postgres**
   - Choose name and region → Click **Create**

2. **Link Database**:
   - Database should auto-link to your project
   - Verify it shows "Linked" status

3. **Redeploy**:
   - Go to **Deployments** tab
   - Click **Redeploy** on latest deployment
   - ⚠️ **Critical**: Environment variables only work after redeploy!

4. **Initialize Database**:
   - Visit: `https://your-site.vercel.app/api/admin/init-db` (POST)
   - Or use curl: `curl -X POST https://your-site.vercel.app/api/admin/init-db`
   - This creates the tables (only needed once)

### 4. Test Everything

#### Local Testing:

```bash
# Start dev server
npm run dev

# Test contact form
# Visit: http://localhost:3000/contact
# Submit a message

# Test quotation form
# Visit: http://localhost:3000/export
# Submit a quotation request

# Check admin panel
# Visit: http://localhost:3000/admin
# Should see your submissions
```

#### Production Testing:

1. **Test Contact Form**:
   - Visit: `https://your-site.vercel.app/contact`
   - Submit a message
   - Check email for confirmation

2. **Test Quotation Form**:
   - Visit: `https://your-site.vercel.app/export`
   - Submit a quotation request
   - Check email for confirmation

3. **Check Admin Panel**:
   - Visit: `https://your-site.vercel.app/admin`
   - Should see all submissions

## 🔄 How It Works

### Local Development:

**Option A: With Postgres (Recommended)**
- Set `POSTGRES_URL` in `.env.local`
- Uses same database as production
- Data persists and syncs

**Option B: Without Postgres (Fallback)**
- Don't set `POSTGRES_URL`
- Uses `data/contact-submissions.json` and `data/quotation-requests.json`
- Files are created automatically
- Good for quick testing

### Production (Vercel):

- **Automatically uses Postgres** when `POSTGRES_URL` is set
- **Falls back to error** if Postgres not configured (file system is read-only on Vercel)
- Tables are created automatically on first use

## 📁 File Structure

```
baho-coffee/
├── .env.local              # Local environment variables (gitignored)
├── data/                   # Local file storage (gitignored)
│   ├── contact-submissions.json
│   └── quotation-requests.json
├── lib/
│   ├── storage.ts          # Unified storage (Postgres or file)
│   └── db/
│       └── storage.ts      # Postgres-specific storage
└── app/api/
    ├── contact/
    │   ├── route.ts        # Save contact submissions
    │   └── submissions/
    │       └── route.ts    # Get contact submissions
    └── export/quotation/
        ├── route.ts        # Save quotation requests
        └── requests/
            └── route.ts    # Get quotation requests
```

## 🛠️ Troubleshooting

### Local Issues:

**Problem**: "Cannot find module '@vercel/postgres'"
- **Solution**: Run `npm install`

**Problem**: Data not saving locally
- **Solution**: 
  - Check if `data/` folder exists (created automatically)
  - Check console for errors
  - If using Postgres, verify `POSTGRES_URL` in `.env.local`

**Problem**: Postgres connection fails locally
- **Solution**:
  - Verify connection string from Vercel dashboard
  - Check SSL is enabled (Vercel requires SSL)
  - Try `POSTGRES_URL_NON_POOLING` instead

### Production Issues:

**Problem**: "Postgres is not configured"
- **Solution**:
  1. Create Postgres database in Vercel
  2. Link it to your project
  3. **Redeploy** (critical!)
  4. Initialize: `/api/admin/init-db`

**Problem**: Submissions not appearing
- **Solution**:
  1. Check Vercel function logs
  2. Verify database is "Active" and "Linked"
  3. Try submitting a new form
  4. Check `/api/admin/init-db` was called

**Problem**: Email not sending
- **Solution**:
  1. Verify `RESEND_API_KEY` in Vercel environment variables
  2. Check Resend dashboard for errors
  3. Verify sender email is configured

## ✅ Verification Checklist

### Local:
- [ ] `npm install` completed successfully
- [ ] `.env.local` created with `RESEND_API_KEY`
- [ ] `POSTGRES_URL` set (optional, for Postgres locally)
- [ ] `npm run dev` starts without errors
- [ ] Contact form saves data
- [ ] Quotation form saves data
- [ ] Admin panel shows data
- [ ] Email confirmations received

### Production:
- [ ] Postgres database created in Vercel
- [ ] Database linked to project
- [ ] Project redeployed after linking
- [ ] `/api/admin/init-db` called successfully
- [ ] `RESEND_API_KEY` set in Vercel environment variables
- [ ] Contact form works on production
- [ ] Quotation form works on production
- [ ] Admin panel shows data on production
- [ ] Email confirmations received

## 🎯 Next Steps

After setup:
1. ✅ Test all forms locally
2. ✅ Deploy to Vercel
3. ✅ Test all forms on production
4. ✅ Verify admin panel works
5. ✅ Set up custom domain (optional)
6. ✅ Configure Resend domain (for better email deliverability)

## 📚 Additional Resources

- **Postgres Setup**: See `VERCEL_POSTGRES_SETUP.md`
- **pgAdmin Connection**: See `PGADMIN_CONNECTION_GUIDE.md`
- **Email Setup**: Configure Resend domain for production emails

## 🆘 Need Help?

1. Check Vercel function logs for errors
2. Verify all environment variables are set
3. Ensure database is linked and active
4. Make sure you redeployed after linking database

Everything should work seamlessly! 🎉

