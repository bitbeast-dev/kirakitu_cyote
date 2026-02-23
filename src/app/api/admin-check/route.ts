import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const adminExists = typeof localStorage !== 'undefined' && localStorage.getItem('admin_account_exists') === 'true';
    return NextResponse.json({ exists: adminExists });
  } catch (error) {
    return NextResponse.json({ exists: false });
  }
}
