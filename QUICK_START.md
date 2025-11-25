# 🚀 Quick Start Guide

Get everything working in **5 minutes**!

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Create `.env.local`
Create a file named `.env.local` in the project root:

```env
RESEND_API_KEY=re_your_key_here
```

Get your Resend API key from: https://resend.com/api-keys

## Step 3: Run Locally
```bash
npm run dev
```

Visit: http://localhost:3000

**That's it for local!** Forms will save to `data/*.json` files.

---

## For Production (Vercel):

### 1. Set Up Postgres
1. Vercel Dashboard → Your Project → **Storage** → **Create Database** → **Postgres**
2. Link database to project
3. **Redeploy** (important!)

### 2. Initialize Database
Visit: `https://your-site.vercel.app/api/admin/init-db` (POST request)

### 3. Add Environment Variables in Vercel
- `RESEND_API_KEY` (add manually)
- `POSTGRES_URL` (auto-added when you link Postgres)

### 4. Test
- Submit contact form → Check admin panel
- Submit quotation → Check admin panel

---

## Optional: Use Postgres Locally

If you want to use the same Postgres database locally:

1. Get connection strings from Vercel:
   - Vercel Dashboard → Storage → Postgres → `.env.local` tab
   
2. Add to your `.env.local`:
   ```env
   POSTGRES_URL=postgres://...
   POSTGRES_PRISMA_URL=postgres://...
   POSTGRES_URL_NON_POOLING=postgres://...
   ```

3. Restart dev server:
   ```bash
   npm run dev
   ```

Now local and production use the same database! 🎉

---

## Verify Setup

Run the verification script:
```bash
npm run verify-setup
```

---

## Need More Details?

- **Complete Setup**: See `SETUP_COMPLETE.md`
- **Postgres Setup**: See `VERCEL_POSTGRES_SETUP.md`
- **pgAdmin Connection**: See `PGADMIN_CONNECTION_GUIDE.md`

---

## Troubleshooting

**Local not working?**
- Check `.env.local` exists with `RESEND_API_KEY`
- Run `npm run verify-setup`

**Production not working?**
- Make sure Postgres is linked and you redeployed
- Check Vercel function logs
- Visit `/api/admin/init-db` to initialize tables

That's it! 🎉

