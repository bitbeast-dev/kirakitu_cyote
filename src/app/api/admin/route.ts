import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const admin = await prisma.admin.findFirst()
  return NextResponse.json({ exists: !!admin })
}

export async function POST(request: Request) {
  const { action, username, password } = await request.json()

  if (action === 'signup') {
    const existing = await prisma.admin.findFirst()
    if (existing) {
      return NextResponse.json({ success: false, error: 'Admin already exists' })
    }
    await prisma.admin.create({ data: { username, password } })
    return NextResponse.json({ success: true })
  }

  if (action === 'login') {
    const admin = await prisma.admin.findFirst({ where: { username, password } })
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' })
    }
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false, error: 'Invalid action' })
}
