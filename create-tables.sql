-- Run this in Supabase SQL Editor

CREATE TABLE "products" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "oldPrice" DOUBLE PRECISION,
    "discount" TEXT,
    "imageUrl" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 5,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "stockCount" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT NOT NULL,
    "mainCategory" TEXT NOT NULL DEFAULT 'Electronics',
    "placement" TEXT NOT NULL DEFAULT 'All Products',
    "description" TEXT,
    "wholesalePrice" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Category" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Brand" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "PromoBanner" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "imageUrl" TEXT NOT NULL,
    "buttonText" TEXT,
    "buttonLink" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "position" TEXT NOT NULL DEFAULT 'hero',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Order" (
    "id" TEXT PRIMARY KEY,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerEmail" TEXT,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "whatsappSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "OrderItem" (
    "id" TEXT PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL
);

CREATE TABLE "User" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" 
FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE;

ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" 
FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT;
