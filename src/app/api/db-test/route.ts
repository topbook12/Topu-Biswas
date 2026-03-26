import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Test database connection
    const userCount = await db.user.count();
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Database connected successfully!',
      database: 'PostgreSQL on Supabase',
      userCount,
      users,
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      database: process.env.DATABASE_URL ? 'URL is set' : 'URL is NOT set',
    }, { status: 500 });
  }
}
