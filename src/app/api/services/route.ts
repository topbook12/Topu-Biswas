import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Fetch all services
export async function GET() {
  try {
    const services = await db.service.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST - Create new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, icon, order } = body;

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Get max order if not provided
    let serviceOrder = order;
    if (serviceOrder === undefined || serviceOrder === null) {
      const maxOrder = await db.service.aggregate({
        _max: {
          order: true,
        },
      });
      serviceOrder = (maxOrder._max.order || 0) + 1;
    }

    const service = await db.service.create({
      data: {
        title,
        description: description || null,
        icon: icon || null,
        order: serviceOrder,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
