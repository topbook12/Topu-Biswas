import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('Debug auth - Email:', email);
    console.log('Debug auth - Password length:', password?.length);

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    // Find user
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    console.log('Debug auth - User found:', user ? user.email : 'not found');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check password
    if (!user.password) {
      return NextResponse.json({ error: 'User has no password' }, { status: 400 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Debug auth - Password match:', passwordMatch);

    return NextResponse.json({
      email: user.email,
      passwordMatch,
      hashLength: user.password.length,
    });
  } catch (error) {
    console.error('Debug auth error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
