import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const admin = await prisma.admin.findFirst()
    return NextResponse.json({ exists: !!admin })
  } catch (error) {
    return NextResponse.json({ exists: false })
  }
}

export async function POST(request: Request) {
  try {
    const { action, username, password } = await request.json()

    if (action === 'signup') {
      const existing = await prisma.admin.findFirst()
      if (existing) {
        return NextResponse.json({ error: 'Admin already exists' }, { status: 400 })
      }
      const admin = await prisma.admin.create({
        data: { username, password }
      })
      return NextResponse.json({ success: true, id: admin.id })
    }

    if (action === 'login') {
      const admin = await prisma.admin.findUnique({ where: { username } })
      if (!admin || admin.password !== password) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }
      return NextResponse.json({ success: true, id: admin.id })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
