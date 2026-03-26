import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/files - Fetch all files
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');

    const where: {
      category?: string;
      type?: string;
    } = {};

    if (category && category !== 'all') {
      where.category = category;
    }

    if (type && type !== 'all') {
      where.type = type;
    }

    const files = await db.fileItem.findMany({
      where,
      orderBy: [{ category: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json(files);
  } catch (error) {
    console.error('Failed to fetch files:', error);
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    );
  }
}

// POST /api/files - Create new file
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, fileUrl, type, category, description, published } = body;

    // Validate required fields
    if (!title || !fileUrl || !type) {
      return NextResponse.json(
        { error: 'Title, file URL, and type are required' },
        { status: 400 }
      );
    }

    // Create file
    const file = await db.fileItem.create({
      data: {
        title,
        fileUrl,
        type,
        category: category || null,
        description: description || null,
        published: published ?? true,
      },
    });

    return NextResponse.json(file, { status: 201 });
  } catch (error) {
    console.error('Failed to create file:', error);
    return NextResponse.json(
      { error: 'Failed to create file' },
      { status: 500 }
    );
  }
}
