import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('=== Login Test ===');
    console.log('Email:', email);
    console.log('Password provided:', !!password);

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Email and password required',
      }, { status: 400 });
    }

    // Check database connection
    console.log('Testing database connection...');
    const userCount = await db.user.count();
    console.log('Total users in database:', userCount);

    // Find user
    console.log('Looking for user:', email.toLowerCase().trim());
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found in database',
        email: email.toLowerCase().trim(),
        userCount,
      }, { status: 404 });
    }

    console.log('User found:', user.email);

    // Check password
    if (!user.password) {
      return NextResponse.json({
        success: false,
        error: 'User has no password set',
        user: { id: user.id, email: user.email },
      }, { status: 400 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);

    return NextResponse.json({
      success: passwordMatch,
      message: passwordMatch ? 'Login credentials valid!' : 'Invalid password',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      debug: {
        userCount,
        emailChecked: email.toLowerCase().trim(),
        hasPassword: !!user.password,
        passwordMatch,
      },
    });

  } catch (error) {
    console.error('Login test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined,
    }, { status: 500 });
  }
}
