import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/social-links - Fetch all social links
export async function GET() {
  try {
    const socialLinks = await db.socialLink.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(socialLinks);
  } catch (error) {
    console.error('Failed to fetch social links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social links' },
      { status: 500 }
    );
  }
}

// POST /api/social-links - Create new social link
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, url, icon, order } = body;

    // Validate required fields
    if (!platform || !url) {
      return NextResponse.json(
        { error: 'Platform and URL are required' },
        { status: 400 }
      );
    }

    // Get the max order if not provided
    let linkOrder = order;
    if (linkOrder === undefined || linkOrder === null) {
      const maxOrder = await db.socialLink.aggregate({
        _max: { order: true },
      });
      linkOrder = (maxOrder._max.order || 0) + 1;
    }

    // Create social link
    const socialLink = await db.socialLink.create({
      data: {
        platform,
        url,
        icon: icon || null,
        order: linkOrder,
      },
    });

    return NextResponse.json(socialLink, { status: 201 });
  } catch (error) {
    console.error('Failed to create social link:', error);
    return NextResponse.json(
      { error: 'Failed to create social link' },
      { status: 500 }
    );
  }
}
