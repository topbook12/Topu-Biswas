import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log('=== Supabase Test ===');
  console.log('URL:', supabaseUrl);
  console.log('Key starts with:', supabaseKey?.substring(0, 30) + '...');

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({
      success: false,
      error: 'Missing environment variables'
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // List buckets
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    console.log('Buckets response:', { buckets, error });
    
    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error
      });
    }

    const bucketNames = buckets?.map(b => b.name) || [];
    console.log('Found buckets:', bucketNames);

    // Try to access our bucket directly
    const testBucket = 'portfolio-images';
    const { data: files, error: accessError } = await supabase
      .storage
      .from(testBucket)
      .list('', { limit: 5 });

    console.log('Direct bucket access:', { files, accessError });

    return NextResponse.json({
      success: true,
      buckets: bucketNames,
      bucketCount: bucketNames.length,
      testBucketAccess: accessError ? accessError.message : 'OK',
      testBucketFiles: files?.length || 0
    });

  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}
