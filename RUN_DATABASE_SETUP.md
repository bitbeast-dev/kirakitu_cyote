# Database Setup - Run These Commands

## Step 1: Install Prisma
```powershell
npm install @prisma/client prisma
```

## Step 2: Generate Prisma Client
```powershell
npx prisma generate
```

## Step 3: Push Schema to Database (Creates Tables)
```powershell
npx prisma db push
```

This command will:
- Connect to your Supabase database
- Create all tables (products, Category, Brand, Order, OrderItem, User, PromoBanner)
- Set up relationships and indexes

## Step 4: Verify Tables Created
```powershell
npx prisma studio
```
Opens GUI at http://localhost:5555 to view database

## Step 5: Create API Folders
You need to manually create these folders:
1. `src/app/api/products/`
2. `src/app/api/products/[id]/`

## Step 6: Move API Files
After creating folders, move these files:
- `src/app/api-products-route.ts` → `src/app/api/products/route.ts`
- `src/app/api-products-id-route.ts` → `src/app/api/products/[id]/route.ts`

## Alternative: Use SQL File
If Prisma push fails, run the SQL file directly in Supabase:
1. Go to Supabase Dashboard → SQL Editor
2. Copy contents from `setup-database.sql`
3. Run the SQL script

## Verify Setup
Test API endpoint:
```powershell
# After starting dev server (npm run dev)
curl http://localhost:3000/api/products
```

Should return empty array `[]` if tables created successfully.
