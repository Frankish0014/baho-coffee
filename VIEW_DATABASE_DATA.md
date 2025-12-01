# How to View Contact & Quotation Data in PostgreSQL

## Quick Check: Where is Your Data?

Your app can save data to **two places**:
1. **PostgreSQL Database** (if `POSTGRES_URL` is set) ✅ You have this!
2. **JSON Files** (fallback in `backend/data/`) ✅ You also have these!

Let's check both!

---

## Option 1: View Data in PostgreSQL (pgAdmin)

### Step 1: Parse Your Connection String

Your connection string is:
```
postgresql://neondb_owner:npg_RsaNZtw0WF1D@ep-divine-tree-ahtojv7c-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**Breakdown:**
- **Host**: `ep-divine-tree-ahtojv7c-pooler.c-3.us-east-1.aws.neon.tech`
- **Port**: `5432` (default, not in URL)
- **Database**: `neondb`
- **Username**: `neondb_owner`
- **Password**: `npg_RsaNZtw0WF1D`
- **SSL**: Required

### Step 2: Connect in pgAdmin

1. **Open pgAdmin 4**

2. **Create New Server Connection:**
   - Right-click **Servers** → **Create** → **Server**

3. **General Tab:**
   - **Name**: `Neon Database` (or any name)

4. **Connection Tab:**
   - **Host name/address**: `ep-divine-tree-ahtojv7c-pooler.c-3.us-east-1.aws.neon.tech`
   - **Port**: `5432`
   - **Maintenance database**: `neondb`
   - **Username**: `neondb_owner`
   - **Password**: `npg_RsaNZtw0WF1D`
   - ✅ **Save password** (check this)

5. **SSL Tab (IMPORTANT!):**
   - **SSL mode**: Select **Require**

6. **Click Save**

### Step 3: Navigate to Tables

Once connected:

1. Expand: **Servers** → **Neon Database** → **Databases** → **neondb** → **Schemas** → **public** → **Tables**

2. You should see:
   - `contact_submissions` - Contact form data
   - `quotation_requests` - Quotation form data

### Step 4: View Data

**Method 1: View All Rows**
- Right-click on `contact_submissions` → **View/Edit Data** → **All Rows**
- Right-click on `quotation_requests` → **View/Edit Data** → **All Rows**

**Method 2: Run SQL Queries**

1. Right-click on `neondb` database → **Query Tool**

2. **View Contact Submissions:**
   ```sql
   SELECT * FROM contact_submissions 
   ORDER BY timestamp DESC;
   ```

3. **View Quotation Requests:**
   ```sql
   SELECT * FROM quotation_requests 
   ORDER BY timestamp DESC;
   ```

4. **Count Records:**
   ```sql
   SELECT COUNT(*) FROM contact_submissions;
   SELECT COUNT(*) FROM quotation_requests;
   ```

### Step 5: If Tables Don't Exist

If you don't see the tables, initialize them:

1. **Option A: Via API** (Easiest)
   - Visit: `http://localhost:3000/api/admin/init-db`
   - This will create the tables automatically

2. **Option B: Via SQL**
   - Open Query Tool in pgAdmin
   - Run the SQL from `backend/lib/db/schema.sql`

---

## Option 2: View Data in JSON Files (Local Fallback)

If PostgreSQL isn't working, data might be saved to JSON files:

### Location:
- Contact submissions: `backend/data/contact-submissions.json`
- Quotation requests: `backend/data/quotation-requests.json`

### View JSON Files:

**Method 1: Open in Code Editor**
- Open the files directly in VS Code or any text editor

**Method 2: Check via Terminal**
```powershell
# View contact submissions
Get-Content backend\data\contact-submissions.json | ConvertFrom-Json | ConvertTo-Json -Depth 10

# View quotation requests
Get-Content backend\data\quotation-requests.json | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

---

## Troubleshooting

### ❌ "Can't connect to database"

**Solutions:**
1. **Check SSL**: Must be set to **Require** in pgAdmin
2. **Check connection string**: Make sure it's correct
3. **Check network**: Neon database might have IP restrictions
4. **Try direct connection**: Use `POSTGRES_URL_NON_POOLING` if available

### ❌ "Tables don't exist"

**Solution:**
1. Visit: `http://localhost:3000/api/admin/init-db`
2. Or run the SQL schema manually in pgAdmin

### ❌ "No data in tables"

**Check:**
1. **Is data being saved?** Check terminal logs when submitting forms
2. **Which storage is used?** Check if `POSTGRES_URL` is being read
3. **Check JSON files** as fallback: `backend/data/*.json`

### ❌ "Can see tables but they're empty"

**Possible reasons:**
1. Data is being saved to JSON files instead (check `backend/data/`)
2. Database connection isn't working, so it falls back to files
3. Forms haven't been submitted yet

**Solution:**
- Check terminal logs when submitting a form
- Look for: `✅ Saved contact submission to Postgres` or `✅ Saved to file`

---

## Quick SQL Queries for pgAdmin

### View Latest Contact Submissions
```sql
SELECT 
  id,
  timestamp,
  name,
  email,
  subject,
  LEFT(message, 50) as message_preview
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

### Count by Date
```sql
SELECT 
  DATE(timestamp) as date,
  COUNT(*) as count
FROM contact_submissions
GROUP BY DATE(timestamp)
ORDER BY date DESC;
```

### Search by Email
```sql
SELECT * FROM contact_submissions 
WHERE email LIKE '%@example.com%';
```

---

## Verify Data is Being Saved

### Test 1: Submit a Contact Form
1. Go to: `http://localhost:3000/contact`
2. Fill out and submit
3. Check terminal for: `✅ Saved contact submission to Postgres`
4. Refresh pgAdmin and check the table

### Test 2: Submit a Quotation Request
1. Go to: `http://localhost:3000/export`
2. Fill out quotation form
3. Check terminal for: `✅ Saved quotation request to Postgres`
4. Refresh pgAdmin and check the table

---

## Summary

✅ **You have PostgreSQL configured** (Neon database)
✅ **You have JSON fallback files** in `backend/data/`

**To view data:**
1. Connect to Neon database in pgAdmin using the connection details above
2. Navigate to `neondb` → `public` → `Tables`
3. View `contact_submissions` and `quotation_requests` tables
4. Or check JSON files in `backend/data/` as backup

**If tables don't exist:**
- Visit: `http://localhost:3000/api/admin/init-db` to create them

---

Need help? Check the terminal logs when submitting forms to see where data is being saved!

