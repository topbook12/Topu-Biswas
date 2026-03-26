import { db } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

// GET - Fetch all projects with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const published = searchParams.get('published');
    const status = searchParams.get('status');

    const where: Record<string, unknown> = {};

    if (category && category !== 'All') {
      where.category = category;
    }

    if (featured !== null && featured !== 'all') {
      where.featured = featured === 'true';
    }

    if (published !== null && published !== 'all') {
      where.published = published === 'true';
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    const projects = await db.project.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    // Parse JSON fields for each project
    const parsedProjects = projects.map((project) => ({
      ...project,
      gallery: project.gallery ? JSON.parse(project.gallery) : [],
      tags: project.tags ? JSON.parse(project.tags) : [],
    }));

    return NextResponse.json(parsedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if slug already exists
    const existingProject = await db.project.findUnique({
      where: { slug: body.slug },
    });

    if (existingProject) {
      return NextResponse.json(
        { error: 'A project with this slug already exists' },
        { status: 400 }
      );
    }

    // Prepare data with JSON fields
    const projectData = {
      title: body.title,
      slug: body.slug,
      shortDescription: body.shortDescription || null,
      fullDescription: body.fullDescription || null,
      thumbnail: body.thumbnail || null,
      gallery: body.gallery ? JSON.stringify(body.gallery) : null,
      tags: body.tags ? JSON.stringify(body.tags) : null,
      category: body.category || null,
      featured: body.featured ?? false,
      liveUrl: body.liveUrl || null,
      githubUrl: body.githubUrl || null,
      videoUrl: body.videoUrl || null,
      status: body.status || 'completed',
      published: body.published ?? true,
    };

    const project = await db.project.create({
      data: projectData,
    });

    // Return with parsed JSON fields
    return NextResponse.json({
      ...project,
      gallery: project.gallery ? JSON.parse(project.gallery) : [],
      tags: project.tags ? JSON.parse(project.tags) : [],
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
