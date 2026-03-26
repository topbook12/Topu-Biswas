import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/files/[id] - Fetch single file
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const file = await db.fileItem.findUnique({
      where: { id },
    });

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    return NextResponse.json(file);
  } catch (error) {
    console.error('Failed to fetch file:', error);
    return NextResponse.json(
      { error: 'Failed to fetch file' },
      { status: 500 }
    );
  }
}

// PUT /api/files/[id] - Update file
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, fileUrl, type, category, description, published } = body;

    // Check if file exists
    const existingFile = await db.fileItem.findUnique({
      where: { id },
    });

    if (!existingFile) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Update file
    const file = await db.fileItem.update({
      where: { id },
      data: {
        title: title ?? existingFile.title,
        fileUrl: fileUrl ?? existingFile.fileUrl,
        type: type ?? existingFile.type,
        category: category !== undefined ? category : existingFile.category,
        description: description !== undefined ? description : existingFile.description,
        published: published ?? existingFile.published,
      },
    });

    return NextResponse.json(file);
  } catch (error) {
    console.error('Failed to update file:', error);
    return NextResponse.json(
      { error: 'Failed to update file' },
      { status: 500 }
    );
  }
}

// DELETE /api/files/[id] - Delete file
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if file exists
    const existingFile = await db.fileItem.findUnique({
      where: { id },
    });

    if (!existingFile) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Delete file
    await db.fileItem.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Failed to delete file:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}
