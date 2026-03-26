import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50) + '...');
  
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123456', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'topubiswas.math@gmail.com' },
    update: {
      password: hashedPassword,
      name: 'Topu Biswas',
      role: 'admin',
    },
    create: {
      email: 'topubiswas.math@gmail.com',
      password: hashedPassword,
      name: 'Topu Biswas',
      role: 'admin',
    },
  });
  
  console.log('Admin user created/updated:', user.email);
  
  // Create default profile
  const profile = await prisma.profile.upsert({
    where: { id: 'default-profile' },
    update: {},
    create: {
      id: 'default-profile',
      name: 'Topu Biswas',
      title: 'Full Stack Web Developer',
      heroSubtitle: 'Building Digital Experiences',
      bioShort: 'A passionate Full Stack Web Developer with expertise in modern web technologies.',
      bioLong: 'I am a Full Stack Web Developer with a passion for creating beautiful, functional, and user-friendly websites and applications.',
      location: 'Bangladesh',
      email: 'topubiswas.math@gmail.com',
      availability: 'Available for freelance projects',
      yearsExperience: 5,
      projectsCount: 50,
      clientsCount: 30,
    },
  });
  
  console.log('Profile created/updated:', profile.name);
  
  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
