import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get counts from all relevant tables
    const [
      projectsCount,
      postsCount,
      skillsCount,
      servicesCount,
      mediaLinksCount,
      filesCount,
      unreadMessagesCount,
    ] = await Promise.all([
      db.project.count({ where: { published: true } }),
      db.post.count({ where: { published: true } }),
      db.skill.count(),
      db.service.count(),
      db.mediaLink.count({ where: { published: true } }),
      db.fileItem.count({ where: { published: true } }),
      db.contactMessage.count({ where: { isRead: false } }),
    ]);

    // Get recent activities (last 10 items across all models)
    const recentProjects = await db.project.findMany({
      take: 3,
      orderBy: { updatedAt: 'desc' },
      select: { id: true, title: true, updatedAt: true },
    });

    const recentPosts = await db.post.findMany({
      take: 3,
      orderBy: { updatedAt: 'desc' },
      select: { id: true, title: true, updatedAt: true },
    });

    const recentMessages = await db.contactMessage.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, subject: true, createdAt: true },
    });

    // Combine and sort activities
    const activities = [
      ...recentProjects.map((p) => ({
        type: 'project' as const,
        id: p.id,
        title: p.title,
        action: 'updated',
        date: p.updatedAt,
      })),
      ...recentPosts.map((p) => ({
        type: 'post' as const,
        id: p.id,
        title: p.title,
        action: 'updated',
        date: p.updatedAt,
      })),
      ...recentMessages.map((m) => ({
        type: 'message' as const,
        id: m.id,
        title: m.subject || `Message from ${m.name}`,
        action: 'received',
        date: m.createdAt,
      })),
    ]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10);

    return NextResponse.json({
      stats: {
        projects: projectsCount,
        posts: postsCount,
        skills: skillsCount,
        services: servicesCount,
        mediaLinks: mediaLinksCount,
        files: filesCount,
        unreadMessages: unreadMessagesCount,
      },
      activities,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
