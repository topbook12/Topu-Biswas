import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create admin user
  const adminEmail = 'topubiswas.math@gmail.com';
  const adminPassword = 'admin123456'; // Default password - should be changed after first login
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  // Upsert admin user
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      role: 'admin',
    },
    create: {
      email: adminEmail,
      name: 'Topu Biswas',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('Admin user created/updated:', admin.email);

  // Create default profile if it doesn't exist
  const existingProfile = await prisma.profile.findFirst();
  
  if (!existingProfile) {
    const profile = await prisma.profile.create({
      data: {
        name: 'Topu Biswas',
        title: 'Full Stack Web Developer',
        heroSubtitle: 'Building Digital Experiences That Matter',
        bioShort: 'I am a passionate Full Stack Web Developer with expertise in modern web technologies.',
        bioLong: 'I am a passionate Full Stack Web Developer with over 5 years of experience in building modern web applications. I specialize in React, Next.js, Node.js, and various other technologies. I love creating beautiful, performant, and user-friendly applications.',
        location: 'Bangladesh',
        email: adminEmail,
        availability: 'Available for freelance work',
        yearsExperience: 5,
        projectsCount: 50,
        clientsCount: 30,
      },
    });
    console.log('Default profile created:', profile.name);
  }

  // Create some default skills
  const skillsCount = await prisma.skill.count();
  if (skillsCount === 0) {
    const skills = [
      { name: 'React', category: 'frontend', level: 95, icon: 'react' },
      { name: 'Next.js', category: 'frontend', level: 90, icon: 'nextjs' },
      { name: 'TypeScript', category: 'frontend', level: 88, icon: 'typescript' },
      { name: 'Tailwind CSS', category: 'frontend', level: 92, icon: 'tailwind' },
      { name: 'Node.js', category: 'backend', level: 85, icon: 'nodejs' },
      { name: 'Express', category: 'backend', level: 85, icon: 'express' },
      { name: 'PostgreSQL', category: 'backend', level: 80, icon: 'postgresql' },
      { name: 'MongoDB', category: 'backend', level: 82, icon: 'mongodb' },
      { name: 'Git', category: 'tools', level: 90, icon: 'git' },
      { name: 'Docker', category: 'devops', level: 75, icon: 'docker' },
      { name: 'Figma', category: 'design', level: 78, icon: 'figma' },
      { name: 'AWS', category: 'devops', level: 72, icon: 'aws' },
    ];

    for (const skill of skills) {
      await prisma.skill.create({ data: skill });
    }
    console.log('Default skills created');
  }

  // Create default services
  const servicesCount = await prisma.service.count();
  if (servicesCount === 0) {
    const services = [
      {
        title: 'Web Development',
        description: 'Building modern, responsive, and performant web applications using the latest technologies.',
        icon: 'globe',
      },
      {
        title: 'Frontend Development',
        description: 'Creating beautiful and interactive user interfaces with React, Next.js, and modern CSS.',
        icon: 'layout',
      },
      {
        title: 'Backend Development',
        description: 'Building robust and scalable backend systems with Node.js, Express, and databases.',
        icon: 'server',
      },
      {
        title: 'API Development',
        description: 'Designing and implementing RESTful and GraphQL APIs for seamless data communication.',
        icon: 'code',
      },
    ];

    for (const service of services) {
      await prisma.service.create({ data: service });
    }
    console.log('Default services created');
  }

  // Create default social links
  const socialLinksCount = await prisma.socialLink.count();
  if (socialLinksCount === 0) {
    const socialLinks = [
      { platform: 'github', url: 'https://github.com/topubiswas', icon: 'github' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/topubiswas', icon: 'linkedin' },
      { platform: 'twitter', url: 'https://twitter.com/topubiswas', icon: 'twitter' },
      { platform: 'facebook', url: 'https://facebook.com/topubiswas', icon: 'facebook' },
    ];

    for (const link of socialLinks) {
      await prisma.socialLink.create({ data: link });
    }
    console.log('Default social links created');
  }

  console.log('Seed completed successfully!');
  console.log('');
  console.log('=== ADMIN LOGIN CREDENTIALS ===');
  console.log('Email: topubiswas.math@gmail.com');
  console.log('Password: admin123456');
  console.log('================================');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
