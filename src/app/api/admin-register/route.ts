import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    const adminCount = await prisma.user.count({ where: { role: 'admin' } });
    if (adminCount > 0) {
      return NextResponse.json({ error: 'Admin already exists' }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.user.create({
      data: { 
        email: `${username}@admin.local`,
        name: username,
        password: hashedPassword,
        role: 'admin'
      }
    });
    return NextResponse.json({ id: admin.id, username: admin.name }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
