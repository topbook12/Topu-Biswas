import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET - Fetch profile (create if not exists)
export async function GET() {
  try {
    let profile = await db.profile.findFirst();

    // Create default profile if none exists
    if (!profile) {
      profile = await db.profile.create({
        data: {
          name: 'Topu Biswas',
          title: 'Full Stack Developer',
          heroSubtitle: 'Building Digital Excellence',
          bioShort:
            'A passionate full stack developer with expertise in modern web technologies.',
          bioLong:
            'I am a full stack developer with over 5 years of experience in building modern web applications. I specialize in React, Next.js, Node.js, and TypeScript. My goal is to create beautiful, performant, and user-friendly applications that solve real-world problems.',
          location: 'Dhaka, Bangladesh',
          email: 'topu@example.com',
          phone: '+880 1234567890',
          whatsapp: '+880 1234567890',
          availability: 'Available',
          yearsExperience: 5,
          projectsCount: 50,
          clientsCount: 30,
        },
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// PUT - Update profile
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Find existing profile
    let profile = await db.profile.findFirst();

    if (!profile) {
      // Create new profile if none exists
      profile = await db.profile.create({
        data: {
          name: body.name || 'Topu Biswas',
          title: body.title || 'Full Stack Developer',
          heroSubtitle: body.heroSubtitle,
          bioShort: body.bioShort,
          bioLong: body.bioLong,
          location: body.location,
          email: body.email,
          phone: body.phone,
          whatsapp: body.whatsapp,
          availability: body.availability || 'Available',
          profileImage: body.profileImage,
          yearsExperience: body.yearsExperience || 0,
          projectsCount: body.projectsCount || 0,
          clientsCount: body.clientsCount || 0,
        },
      });
    } else {
      // Update existing profile
      profile = await db.profile.update({
        where: { id: profile.id },
        data: {
          name: body.name,
          title: body.title,
          heroSubtitle: body.heroSubtitle,
          bioShort: body.bioShort,
          bioLong: body.bioLong,
          location: body.location,
          email: body.email,
          phone: body.phone,
          whatsapp: body.whatsapp,
          availability: body.availability,
          profileImage: body.profileImage,
          yearsExperience: body.yearsExperience,
          projectsCount: body.projectsCount,
          clientsCount: body.clientsCount,
        },
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
