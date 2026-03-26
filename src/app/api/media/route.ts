import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Fetch all media links
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const published = searchParams.get('published');
    const search = searchParams.get('search');

    const where: Record<string, unknown> = {};

    if (type && type !== 'all') {
      where.type = type;
    }

    if (published && published !== 'all') {
      where.published = published === 'true';
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const mediaLinks = await db.mediaLink.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json(mediaLinks);
  } catch (error) {
    console.error('Error fetching media links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media links' },
      { status: 500 }
    );
  }
}

// POST - Create new media link
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, type, url, thumbnail, description, order, published } = body;

    // Validation
    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    if (!type || !type.trim()) {
      return NextResponse.json(
        { error: 'Type is required' },
        { status: 400 }
      );
    }

    if (!url || !url.trim()) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Valid types
    const validTypes = ['youtube', 'vimeo', 'facebook', 'instagram', 'tiktok', 'link'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid media type' },
        { status: 400 }
      );
    }

    // Get max order if not provided
    let mediaOrder = order;
    if (mediaOrder === undefined || mediaOrder === null) {
      const maxOrder = await db.mediaLink.aggregate({
        _max: { order: true },
      });
      mediaOrder = (maxOrder._max.order || 0) + 1;
    }

    const mediaLink = await db.mediaLink.create({
      data: {
        title: title.trim(),
        type,
        url: url.trim(),
        thumbnail: thumbnail?.trim() || null,
        description: description?.trim() || null,
        order: Number(mediaOrder),
        published: published ?? true,
      },
    });

    return NextResponse.json(mediaLink, { status: 201 });
  } catch (error) {
    console.error('Error creating media link:', error);
    return NextResponse.json(
      { error: 'Failed to create media link' },
      { status: 500 }
    );
  }
}
