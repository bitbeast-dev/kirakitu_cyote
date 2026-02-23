# Supabase Database Setup Guide

## 1. Database Configuration Complete ✅
- `.env.local` created with Supabase connection URLs
- `schema.prisma` updated with `placement` field for product categorization

## 2. Install Dependencies
Run in PowerShell:
```powershell
npm install @prisma/client prisma
```

## 3. Generate Prisma Client
```powershell
npx prisma generate
```

## 4. Run Database Migration
```powershell
npx prisma migrate dev --name add_placement_field
```

## 5. Create API Route Directories
Manually create these folders in `src/app/`:
```
src/app/api/products/route.ts
src/app/api/products/[id]/route.ts
```

Then move the temporary files:
- Move `src/app/api-products-route.ts` → `src/app/api/products/route.ts`
- Move `src/app/api-products-id-route.ts` → `src/app/api/products/[id]/route.ts`

## 6. API Endpoints Available

### GET /api/products
Fetch all products
```javascript
const response = await fetch('/api/products')
const products = await response.json()
```

### POST /api/products
Create new product
```javascript
const response = await fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Toy Car',
    brand: 'KidsToys',
    price: 15000,
    imageUrl: '/toy.jpg',
    category: 'Toys',
    mainCategory: 'Fun Games',
    placement: 'Featured Products'
  })
})
```

### PUT /api/products/[id]
Update product
```javascript
const response = await fetch(`/api/products/${productId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Updated Name', price: 20000 })
})
```

### DELETE /api/products/[id]
Delete product
```javascript
const response = await fetch(`/api/products/${productId}`, {
  method: 'DELETE'
})
```

## 7. Product Placement Options
- "All Products"
- "Featured Products"
- "Educational Books"
- "Fun Games Collection"
- "Top Picks For You"
- "Floating Balloon Deals"

## 8. Database Schema
```prisma
model Product {
  id             String   @id @default(cuid())
  name           String
  brand          String
  price          Float
  imageUrl       String
  category       String
  mainCategory   String   @default("Electronics")
  placement      String   @default("All Products")
  description    String?
  inStock        Boolean  @default(true)
  stockCount     Int      @default(0)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

## 9. Test Database Connection
```powershell
npx prisma studio
```
This opens a GUI to view/edit database records at http://localhost:5555

## Files Created
- ✅ `.env.local` - Database connection URLs
- ✅ `src/lib/prisma.ts` - Prisma client singleton
- ✅ `schema.prisma` - Updated with placement field
- ✅ API route files (need manual directory creation)
