import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Fetch single media link by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const mediaLink = await db.mediaLink.findUnique({
      where: { id },
    });

    if (!mediaLink) {
      return NextResponse.json(
        { error: 'Media link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(mediaLink);
  } catch (error) {
    console.error('Error fetching media link:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media link' },
      { status: 500 }
    );
  }
}

// PUT - Update media link
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if media link exists
    const existingMedia = await db.mediaLink.findUnique({
      where: { id },
    });

    if (!existingMedia) {
      return NextResponse.json(
        { error: 'Media link not found' },
        { status: 404 }
      );
    }

    // Validation for type if provided
    if (body.type) {
      const validTypes = ['youtube', 'vimeo', 'facebook', 'instagram', 'tiktok', 'link'];
      if (!validTypes.includes(body.type)) {
        return NextResponse.json(
          { error: 'Invalid media type' },
          { status: 400 }
        );
      }
    }

    // Build update data
    const updateData: Record<string, unknown> = {};
    
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.type !== undefined) updateData.type = body.type;
    if (body.url !== undefined) updateData.url = body.url.trim();
    if (body.thumbnail !== undefined) updateData.thumbnail = body.thumbnail?.trim() || null;
    if (body.description !== undefined) updateData.description = body.description?.trim() || null;
    if (body.order !== undefined) updateData.order = Number(body.order);
    if (body.published !== undefined) updateData.published = body.published;

    const updatedMedia = await db.mediaLink.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedMedia);
  } catch (error) {
    console.error('Error updating media link:', error);
    return NextResponse.json(
      { error: 'Failed to update media link' },
      { status: 500 }
    );
  }
}

// DELETE - Delete media link
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if media link exists
    const existingMedia = await db.mediaLink.findUnique({
      where: { id },
    });

    if (!existingMedia) {
      return NextResponse.json(
        { error: 'Media link not found' },
        { status: 404 }
      );
    }

    await db.mediaLink.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Media link deleted successfully' });
  } catch (error) {
    console.error('Error deleting media link:', error);
    return NextResponse.json(
      { error: 'Failed to delete media link' },
      { status: 500 }
    );
  }
}
