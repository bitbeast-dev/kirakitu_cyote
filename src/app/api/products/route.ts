import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const product = await prisma.product.create({
      data: {
        name: body.name,
        brand: body.brand || 'Generic',
        price: parseFloat(body.price),
        imageUrl: body.imageUrl,
        category: body.category,
        mainCategory: body.mainCategory || 'Toys',
        placement: body.placement || 'All Products',
        inStock: body.inStock ?? true,
        stockCount: body.stockCount || 0
      }
    })
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
