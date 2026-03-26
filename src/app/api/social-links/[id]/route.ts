import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/social-links/[id] - Fetch single social link
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const socialLink = await db.socialLink.findUnique({
      where: { id },
    });

    if (!socialLink) {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }

    return NextResponse.json(socialLink);
  } catch (error) {
    console.error('Failed to fetch social link:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social link' },
      { status: 500 }
    );
  }
}

// PUT /api/social-links/[id] - Update social link
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { platform, url, icon, order } = body;

    // Check if social link exists
    const existingLink = await db.socialLink.findUnique({
      where: { id },
    });

    if (!existingLink) {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }

    // Update social link
    const socialLink = await db.socialLink.update({
      where: { id },
      data: {
        platform: platform ?? existingLink.platform,
        url: url ?? existingLink.url,
        icon: icon !== undefined ? icon : existingLink.icon,
        order: order ?? existingLink.order,
      },
    });

    return NextResponse.json(socialLink);
  } catch (error) {
    console.error('Failed to update social link:', error);
    return NextResponse.json(
      { error: 'Failed to update social link' },
      { status: 500 }
    );
  }
}

// DELETE /api/social-links/[id] - Delete social link
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if social link exists
    const existingLink = await db.socialLink.findUnique({
      where: { id },
    });

    if (!existingLink) {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }

    // Delete social link
    await db.socialLink.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Social link deleted successfully' });
  } catch (error) {
    console.error('Failed to delete social link:', error);
    return NextResponse.json(
      { error: 'Failed to delete social link' },
      { status: 500 }
    );
  }
}
