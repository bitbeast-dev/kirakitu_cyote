# Fix API Routes - Manual Steps Required

## Problem:
Next.js 15 requires API routes to be in this format:
- `src/app/api/products/route.ts` (NOT `src/app/api/products.ts`)

## Solution - Run these commands in PowerShell:

```powershell
cd src\app\api

# Create folders
New-Item -ItemType Directory -Path products
New-Item -ItemType Directory -Path categories
New-Item -ItemType Directory -Path brands
New-Item -ItemType Directory -Path promo-banners
New-Item -ItemType Directory -Path orders
New-Item -ItemType Directory -Path upload

# Move and rename files
Move-Item products.ts products\route.ts
Move-Item categories.ts categories\route.ts
Move-Item brands.ts brands\route.ts
Move-Item promo-banners.ts promo-banners\route.ts
Move-Item orders.ts orders\route.ts
Move-Item upload.ts upload\route.ts
```

## Or manually:
1. Create folder: `src/app/api/products/`
2. Move `products.ts` into it
3. Rename to `route.ts`
4. Repeat for: categories, brands, promo-banners, orders, upload

After this, restart dev server: `npm run dev`
