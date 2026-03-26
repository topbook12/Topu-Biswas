import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Fetch all skills
export async function GET() {
  try {
    const skills = await db.skill.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST - Create new skill
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, level, icon, order } = body;

    // Validate required fields
    if (!name || !category) {
      return NextResponse.json(
        { error: 'Name and category are required' },
        { status: 400 }
      );
    }

    // Validate level is between 0-100
    const skillLevel = Math.max(0, Math.min(100, level || 80));

    // Get max order if not provided
    let skillOrder = order;
    if (skillOrder === undefined || skillOrder === null) {
      const maxOrder = await db.skill.aggregate({
        _max: {
          order: true,
        },
      });
      skillOrder = (maxOrder._max.order || 0) + 1;
    }

    const skill = await db.skill.create({
      data: {
        name,
        category,
        level: skillLevel,
        icon: icon || null,
        order: skillOrder,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}
