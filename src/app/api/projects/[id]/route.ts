import { db } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

// GET - Fetch a single project by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const project = await db.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    return NextResponse.json({
      ...project,
      gallery: project.gallery ? JSON.parse(project.gallery) : [],
      tags: project.tags ? JSON.parse(project.tags) : [],
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT - Update a project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if project exists
    const existingProject = await db.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // If slug is being changed, check for conflicts
    if (body.slug && body.slug !== existingProject.slug) {
      const slugConflict = await db.project.findUnique({
        where: { slug: body.slug },
      });

      if (slugConflict) {
        return NextResponse.json(
          { error: 'A project with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: Record<string, unknown> = {};

    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.shortDescription !== undefined) updateData.shortDescription = body.shortDescription || null;
    if (body.fullDescription !== undefined) updateData.fullDescription = body.fullDescription || null;
    if (body.thumbnail !== undefined) updateData.thumbnail = body.thumbnail || null;
    if (body.gallery !== undefined) updateData.gallery = body.gallery ? JSON.stringify(body.gallery) : null;
    if (body.tags !== undefined) updateData.tags = body.tags ? JSON.stringify(body.tags) : null;
    if (body.category !== undefined) updateData.category = body.category || null;
    if (body.featured !== undefined) updateData.featured = body.featured;
    if (body.liveUrl !== undefined) updateData.liveUrl = body.liveUrl || null;
    if (body.githubUrl !== undefined) updateData.githubUrl = body.githubUrl || null;
    if (body.videoUrl !== undefined) updateData.videoUrl = body.videoUrl || null;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.published !== undefined) updateData.published = body.published;

    const project = await db.project.update({
      where: { id },
      data: updateData,
    });

    // Return with parsed JSON fields
    return NextResponse.json({
      ...project,
      gallery: project.gallery ? JSON.parse(project.gallery) : [],
      tags: project.tags ? JSON.parse(project.tags) : [],
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if project exists
    const existingProject = await db.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    await db.project.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
