# Get Correct Supabase Connection URL

## Steps:
1. Go to Supabase Dashboard
2. Click on your project "kirakitukids"
3. Go to **Project Settings** (gear icon)
4. Click **Database** in left sidebar
5. Scroll to **Connection string** section
6. Select **URI** tab (NOT "Transaction pooler")
7. Copy the connection string
8. Replace [YOUR-PASSWORD] with: Kirakitukid2026

## Update .env.local with:
```
DATABASE_URL="postgresql://postgres.fntzxkpqcesbbjbldnpa:Kirakitukid2026@db.XXXXX.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres.fntzxkpqcesbbjbldnpa:Kirakitukid2026@db.XXXXX.supabase.co:5432/postgres"
```

Replace XXXXX with your actual project reference from Supabase.

## Then run:
```powershell
npx prisma db push
```
