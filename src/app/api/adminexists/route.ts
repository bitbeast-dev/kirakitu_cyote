import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const adminCount = await prisma.user.count({ where: { role: 'admin' } });
    return NextResponse.json({ exists: adminCount > 0 });
  } catch (error) {
    return NextResponse.json({ exists: false }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
