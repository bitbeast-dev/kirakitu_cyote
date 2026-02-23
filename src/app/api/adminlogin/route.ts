import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

let bcrypt: any;
try {
  bcrypt = require('bcryptjs');
} catch {
  bcrypt = {
    hash: async (password: string) => password,
    compare: async (password: string, hash: string) => password === hash
  };
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const admin = await prisma.user.findFirst({
      where: { 
        name: username,
        role: 'admin'
      }
    });

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ success: true, id: admin.id, name: admin.name });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
