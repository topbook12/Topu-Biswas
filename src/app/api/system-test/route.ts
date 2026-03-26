import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const results: {
    name: string;
    status: 'ok' | 'error';
    message: string;
    details?: unknown;
  }[] = [];

  // 1. Check Environment Variables
  const envCheck = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    DIRECT_URL: !!process.env.DIRECT_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };

  results.push({
    name: 'Environment Variables',
    status: envCheck.DATABASE_URL && envCheck.DIRECT_URL ? 'ok' : 'error',
    message: envCheck.DATABASE_URL && envCheck.DIRECT_URL
      ? 'All required env vars are set'
      : 'Missing required environment variables',
    details: envCheck,
  });

  // 2. Test Database Connection
  try {
    const { db } = await import('@/lib/db');

    // Simple query to test connection
    const userCount = await db.user.count();
    const profileCount = await db.profile.count();
    const projectCount = await db.project.count();

    results.push({
      name: 'Database Connection',
      status: 'ok',
      message: 'Connected to database successfully',
      details: {
        users: userCount,
        profiles: profileCount,
        projects: projectCount,
      },
    });
  } catch (error) {
    results.push({
      name: 'Database Connection',
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown database error',
      details: error instanceof Error ? {
        name: error.name,
        message: error.message,
      } : undefined,
    });
  }

  // 3. Test Supabase Storage
  try {
    const { createClient } = await import('@supabase/supabase-js');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // List files in bucket
    const { data, error } = await supabase.storage
      .from('portfolio-images')
      .list('', { limit: 5 });

    if (error) {
      throw error;
    }

    results.push({
      name: 'Supabase Storage',
      status: 'ok',
      message: 'Connected to Supabase storage',
      details: {
        filesCount: data?.length || 0,
        bucket: 'portfolio-images',
      },
    });
  } catch (error) {
    results.push({
      name: 'Supabase Storage',
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown Supabase error',
    });
  }

  // Summary
  const allOk = results.every(r => r.status === 'ok');

  return NextResponse.json({
    success: allOk,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    results,
    summary: allOk
      ? '✅ All systems operational'
      : '❌ Some systems have issues',
  });
}
