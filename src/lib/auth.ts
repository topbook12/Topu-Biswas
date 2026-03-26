// Authentication configuration
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

// Admin email whitelist
const ADMIN_EMAILS = [
  'topubiswas.math@gmail.com',
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check if email is in admin whitelist
        if (!ADMIN_EMAILS.includes(credentials.email)) {
          return null;
        }

        // Find user in database
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        // If user doesn't exist, create one (first time login)
        if (!user) {
          const hashedPassword = await bcrypt.hash(credentials.password, 12);
          const newUser = await db.user.create({
            data: {
              email: credentials.email,
              name: 'Topu Biswas',
              password: hashedPassword,
              role: 'admin',
            },
          });
          return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
          };
        }

        // Verify password
        if (user.password) {
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (passwordMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            };
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-super-secret-key-change-in-production',
};

// Helper to check if user is admin
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    };
  }
  interface User {
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}
