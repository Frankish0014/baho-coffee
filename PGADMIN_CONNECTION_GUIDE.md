# Connecting to Vercel Postgres with pgAdmin 4

Yes! You can connect to your Vercel Postgres database using pgAdmin 4 or any PostgreSQL client. Here's how:

## Step 1: Get Connection Details from Vercel

1. Go to **Vercel Dashboard** → Your Project → **Storage** → Your Postgres Database
2. Click on the **Settings** tab (or **.env.local** tab)
3. You'll see connection strings like:
   ```
   POSTGRES_URL=postgres://username:password@host:port/database?sslmode=require
   ```

## Step 2: Parse the Connection String

The connection string format is:
```
postgres://username:password@host:port/database?params
```

**Example:**
```
postgres://default:abc123@ep-cool-name-123456.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require
```

Breakdown:
- **Username**: `default`
- **Password**: `abc123`
- **Host**: `ep-cool-name-123456.us-east-1.postgres.vercel-storage.com`
- **Port**: `5432`
- **Database**: `verceldb`
- **SSL Mode**: `require`

## Step 3: Connect with pgAdmin 4

### Option A: Using Connection String (Easiest)

1. Open **pgAdmin 4**
2. Right-click on **Servers** → **Create** → **Server**
3. In the **General** tab:
   - **Name**: `Vercel Postgres` (or any name you prefer)
4. In the **Connection** tab:
   - **Host name/address**: Extract from connection string (the part after `@` and before `:`)
   - **Port**: Usually `5432` (extract from connection string)
   - **Maintenance database**: Extract database name (after last `/` and before `?`)
   - **Username**: Extract from connection string (after `postgres://` and before `:`)
   - **Password**: Extract from connection string (after username `:` and before `@`)
   - **Save password**: ✅ Check this box
5. In the **SSL** tab:
   - **SSL mode**: Select **Require** (important!)
6. Click **Save**

### Option B: Using Connection String Directly

Some versions of pgAdmin support connection strings directly:

1. Right-click on **Servers** → **Create** → **Server**
2. In the **Connection** tab, look for **Connection string** field
3. Paste your full `POSTGRES_URL` connection string
4. Click **Save**

## Step 4: Test Connection

1. Click **Save** in pgAdmin
2. If connection succeeds, you'll see your database expand in the tree
3. Navigate to: **Servers** → **Vercel Postgres** → **Databases** → **verceldb** → **Schemas** → **public** → **Tables**

You should see:
- `contact_submissions`
- `quotation_requests`

## Quick Reference: Connection String Parser

If you have a connection string like:
```
postgres://user:pass@host.example.com:5432/dbname?sslmode=require
```

Use this breakdown:
- **Host**: `host.example.com`
- **Port**: `5432`
- **Database**: `dbname`
- **Username**: `user`
- **Password**: `pass`
- **SSL**: Required

## Alternative: Use a Connection String Parser Tool

You can also use online tools to parse the connection string:
1. Go to: https://www.connectionstrings.com/postgresql/
2. Paste your connection string
3. It will show you all the components

## Troubleshooting

### Issue: "Connection refused" or "Could not connect"

**Solutions:**
1. **Check SSL**: Make sure SSL mode is set to **Require** in pgAdmin
2. **Check firewall**: Vercel Postgres might have IP restrictions
3. **Verify connection string**: Make sure you copied it correctly
4. **Check database status**: In Vercel, make sure database is "Active"

### Issue: "SSL connection required"

**Solution:**
- In pgAdmin, go to **SSL** tab
- Set **SSL mode** to **Require** (not "Prefer" or "Disable")

### Issue: "Authentication failed"

**Solutions:**
1. Double-check username and password from connection string
2. Make sure you're using the correct connection string (not a pooled one)
3. Try using `POSTGRES_URL_NON_POOLING` instead of `POSTGRES_URL`

### Issue: Can't see tables

**Solutions:**
1. Make sure you've initialized the database: Visit `/api/admin/init-db`
2. Check you're looking in the correct schema: **public** schema
3. Refresh the connection in pgAdmin

## Using Other PostgreSQL Clients

You can also use:
- **DBeaver** (Free, cross-platform)
- **TablePlus** (Mac/Windows, paid)
- **psql** (Command line)
- **DataGrip** (JetBrains, paid)

All use the same connection details!

## Security Note

⚠️ **Important**: 
- Never commit your connection strings to Git
- Keep your `.env.local` file in `.gitignore`
- The connection strings contain sensitive credentials
- Only share them with trusted team members

## Viewing Data in pgAdmin

Once connected:

1. **View Contact Submissions**:
   - Navigate to: `contact_submissions` table
   - Right-click → **View/Edit Data** → **All Rows**

2. **View Quotation Requests**:
   - Navigate to: `quotation_requests` table
   - Right-click → **View/Edit Data** → **All Rows**

3. **Run Queries**:
   - Right-click on database → **Query Tool**
   - Write SQL queries like:
     ```sql
     SELECT * FROM contact_submissions ORDER BY timestamp DESC;
     ```

## Next Steps

After connecting:
- ✅ You can view all your data in pgAdmin
- ✅ Run SQL queries directly
- ✅ Export data to CSV/JSON
- ✅ Manage your database visually
- ✅ Create backups

Enjoy managing your database with pgAdmin! 🎉

