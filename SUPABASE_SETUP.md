# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up / Login
3. Click "New Project"
4. Fill in:
   - **Name**: modak-cafe
   - **Database Password**: (create a strong password - SAVE THIS!)
   - **Region**: Choose closest to you
5. Click "Create new project"
6. Wait 2-3 minutes for setup

## Step 2: Get Connection String

1. In your Supabase dashboard, go to **Project Settings** (gear icon)
2. Click **Database** in left sidebar
3. Scroll to **Connection string** section
4. Select **URI** tab
5. Copy the connection string
6. It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`

## Step 3: Update Backend .env

Replace the DATABASE_URL in `backend/.env` with your Supabase connection string:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres"
```

Make sure to:
- Replace `[YOUR-PASSWORD]` with your actual password
- Keep the quotes around the URL
- Add `?pgbouncer=true&connection_limit=1` at the end if you have connection issues

Example:
```env
DATABASE_URL="postgresql://postgres:MyStr0ngP@ss@db.abcdefghijk.supabase.co:5432/postgres"
```

## Step 4: Run Migrations

Once you've updated the .env file:

```bash
cd backend
npx prisma migrate dev --name init
npx prisma db seed
```

## Step 5: Start Backend

```bash
npm run start
```

## Verification

Your backend should now connect successfully! You'll see:
```
[PrismaService] Successfully connected to database
🚀 Application is running on: http://localhost:3000/api
```

## Troubleshooting

### Connection Timeout
Add connection pooling parameters:
```
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
```

### SSL Error
Add SSL mode:
```
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres?sslmode=require"
```

### Can't Find Password
1. Go to Supabase Dashboard
2. Project Settings → Database
3. Click "Reset database password"
4. Set a new password

## Benefits of Supabase

✅ No Docker needed
✅ Works from any machine
✅ Free tier includes:
   - 500MB database
   - Unlimited API requests
   - Auto backups
✅ Built-in dashboard to view data
✅ Production-ready

## Next Steps

After successful connection:
1. Test registration: http://localhost:5173
2. Login with test credentials
3. Explore the application!
