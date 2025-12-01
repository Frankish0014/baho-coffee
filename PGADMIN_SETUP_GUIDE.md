# pgAdmin Setup Guide for Neon PostgreSQL

## Quick Connection Details

Based on your `.env.local` file, here are your connection details:

**Connection Type:** Neon PostgreSQL (Cloud Database)

**Connection Details:**
- **Host**: `ep-divine-tree-ahtojv7c-pooler.c-3.us-east-1.aws.neon.tech`
- **Port**: `5432`
- **Database**: `neondb`
- **Username**: `neondb_owner`
- **Password**: `npg_RsaNZtw0WF1D`
- **SSL Mode**: **Require** (IMPORTANT!)

---

## Step-by-Step: Connect pgAdmin to Your Database

### Step 1: Open pgAdmin 4

1. Launch **pgAdmin 4** on your computer
2. If you don't have it, download from: https://www.pgadmin.org/download/

### Step 2: Create a New Server Connection

1. In the left sidebar, find **Servers**
2. **Right-click** on **Servers**
3. Select **Create** → **Server...**

### Step 3: General Tab

1. Click on the **General** tab
2. Enter a name for your connection:
   - **Name**: `Neon Database` (or any name you prefer)
3. Click **Save** (or move to Connection tab)

### Step 4: Connection Tab (Most Important!)

Fill in these details:

1. **Host name/address**: 
   ```
   ep-divine-tree-ahtojv7c-pooler.c-3.us-east-1.aws.neon.tech
   ```

2. **Port**: 
   ```
   5432
   ```

3. **Maintenance database**: 
   ```
   neondb
   ```

4. **Username**: 
   ```
   neondb_owner
   ```

5. **Password**: 
   ```
   npg_RsaNZtw0WF1D
   ```

6. ✅ **Save password** - Check this box (so you don't have to enter it every time)

### Step 5: SSL Tab (CRITICAL!)

This is the most common issue! Make sure SSL is configured:

1. Click on the **SSL** tab
2. Set **SSL mode** to: **Require**
   - ⚠️ **NOT** "Prefer" or "Disable"
   - Must be **"Require"**

### Step 6: Save and Connect

1. Click **Save** button at the bottom
2. pgAdmin will attempt to connect
3. If successful, you'll see your database in the left sidebar

---

## Step 7: Navigate to Your Tables

Once connected, expand the tree:

1. **Servers** → **Neon Database** → **Databases** → **neondb** → **Schemas** → **public** → **Tables**

You should see:
- ✅ `contact_submissions` - Contact form data
- ✅ `quotation_requests` - Quotation form data
- ✅ `payments` - Payment data (if exists)

---

## Step 8: View Your Data

### Method 1: View All Rows (Easiest)

1. Right-click on `contact_submissions` table
2. Select **View/Edit Data** → **All Rows**
3. Your data will appear in a grid view

### Method 2: Run SQL Queries

1. Right-click on `neondb` database
2. Select **Query Tool**
3. Type your SQL query:

```sql
-- View all contact submissions
SELECT * FROM contact_submissions 
ORDER BY timestamp DESC;

-- View all quotation requests
SELECT * FROM quotation_requests 
ORDER BY timestamp DESC;

-- Count records
SELECT COUNT(*) FROM contact_submissions;
SELECT COUNT(*) FROM quotation_requests;
```

4. Click the **Execute** button (or press F5)

---

## If Tables Don't Exist

If you don't see the tables, you need to create them:

### Option 1: Via API (Easiest)

1. Make sure your dev server is running: `npm run dev`
2. Open your browser
3. Visit: `http://localhost:3000/api/admin/init-db`
4. This will automatically create all tables

### Option 2: Via SQL in pgAdmin

1. Open Query Tool (right-click on `neondb` → **Query Tool**)
2. Copy and paste the SQL from `backend/lib/db/schema.sql`
3. Execute the query

---

## Troubleshooting

### ❌ "Connection refused" or "Could not connect"

**Solutions:**
1. **Check SSL Mode**: Must be set to **"Require"** (not "Prefer")
2. **Check Host**: Make sure you copied the host correctly (no extra spaces)
3. **Check Network**: Your internet connection must be active
4. **Check Firewall**: Neon databases are cloud-based, so firewall shouldn't block it
5. **Try Direct Connection**: If using pooler, try the non-pooling connection string

### ❌ "SSL connection required"

**Solution:**
- Go to **SSL** tab in pgAdmin
- Set **SSL mode** to **Require** (not "Prefer" or "Disable")

### ❌ "Authentication failed"

**Solutions:**
1. Double-check username: `neondb_owner`
2. Double-check password: `npg_RsaNZtw0WF1D`
3. Make sure there are no extra spaces in the connection fields
4. Try resetting the password in Neon dashboard if needed

### ❌ "Database does not exist"

**Solutions:**
1. Check database name: `neondb`
2. Make sure you're connecting to the correct Neon project
3. Verify in Neon dashboard that the database exists

### ❌ "Tables don't exist"

**Solution:**
- Visit: `http://localhost:3000/api/admin/init-db` to create tables
- Or run the SQL schema manually in Query Tool

### ❌ "Can connect but see no data"

**Possible reasons:**
1. Data might be saved to JSON files instead (check `backend/data/`)
2. Forms haven't been submitted yet
3. Database connection isn't working, so app falls back to JSON files

**Check:**
- Look at terminal logs when submitting forms
- Check for: `✅ Saved contact submission to Postgres` vs `✅ Saved to file`

---

## Alternative: Use Non-Pooling Connection

If the pooler connection doesn't work, you might need a direct connection:

1. In Neon dashboard, get the **non-pooling** connection string
2. It will look like: `postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require`
3. Use that host instead of the pooler host

---

## Quick Reference: Connection Details

```
Host: ep-divine-tree-ahtojv7c-pooler.c-3.us-east-1.aws.neon.tech
Port: 5432
Database: neondb
Username: neondb_owner
Password: npg_RsaNZtw0WF1D
SSL Mode: Require
```

---

## Useful SQL Queries

### View Latest Contact Submissions
```sql
SELECT 
  id,
  timestamp,
  name,
  email,
  subject,
  LEFT(message, 100) as message_preview
FROM contact_submissions 
ORDER BY timestamp DESC 
LIMIT 10;
```

### View Latest Quotation Requests
```sql
SELECT 
  id,
  timestamp,
  name,
  email,
  company,
  country,
  quantity,
  product_interest
FROM quotation_requests 
ORDER BY timestamp DESC 
LIMIT 10;
```

### Search by Email
```sql
SELECT * FROM contact_submissions 
WHERE email LIKE '%@example.com%';
```

### Count Records by Date
```sql
SELECT 
  DATE(timestamp) as date,
  COUNT(*) as count
FROM contact_submissions
GROUP BY DATE(timestamp)
ORDER BY date DESC;
```

---

## Security Notes

⚠️ **Important Security Reminders:**

1. **Never commit** your `.env.local` file to Git
2. **Don't share** your connection string publicly
3. **Change password** if you suspect it's compromised
4. **Use strong passwords** for production databases
5. **Limit access** to only trusted team members

---

## Next Steps

After connecting:

1. ✅ View your contact submissions
2. ✅ View your quotation requests
3. ✅ Run custom SQL queries
4. ✅ Export data to CSV/JSON if needed
5. ✅ Monitor database activity

---

## Need Help?

If you're still having issues:

1. Check the terminal logs when submitting forms
2. Verify your `.env.local` has the correct `POSTGRES_URL`
3. Make sure your dev server can connect (check terminal for errors)
4. Try the API endpoint: `http://localhost:3000/api/admin/init-db`

---

**You're all set!** Once connected, you can manage your database visually through pgAdmin. 🎉

