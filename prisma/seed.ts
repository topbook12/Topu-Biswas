import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123456', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'topubiswas.math@gmail.com' },
    update: {
      password: hashedPassword,
      name: 'Topu Biswas',
      role: 'admin'
    },
    create: {
      email: 'topubiswas.math@gmail.com',
      name: 'Topu Biswas',
      password: hashedPassword,
      role: 'admin'
    }
  });
  
  console.log('Admin user created/updated:', user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
