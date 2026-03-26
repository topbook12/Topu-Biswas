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
        try {
          console.log('=== Authorize called ===');
          console.log('Credentials:', JSON.stringify(credentials));
          
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials');
            return null;
          }

          // Normalize email
          const email = credentials.email.toLowerCase().trim();
          const password = credentials.password;
          
          console.log('Normalized email:', email);
          console.log('Password length:', password.length);

          // Check if email is in admin whitelist
          if (!ADMIN_EMAILS.includes(email)) {
            console.log('Email not in whitelist:', email);
            console.log('Whitelist:', ADMIN_EMAILS);
            return null;
          }

          // Find user in database
          console.log('Looking up user in database...');
          const user = await db.user.findUnique({
            where: { email: email },
          });
          
          console.log('User found:', user ? { id: user.id, email: user.email, hasPassword: !!user.password } : null);

          // If user doesn't exist, create one (first time login)
          if (!user) {
            console.log('Creating new user for:', email);
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = await db.user.create({
              data: {
                email: email,
                name: 'Topu Biswas',
                password: hashedPassword,
                role: 'admin',
              },
            });
            console.log('New user created:', newUser.id);
            return {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
              role: newUser.role,
            };
          }

          // Verify password
          if (!user.password) {
            console.log('User has no password set');
            return null;
          }

          console.log('Comparing passwords...');
          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log('Password match result:', passwordMatch);

          if (!passwordMatch) {
            console.log('Password mismatch for user:', email);
            return null;
          }

          console.log('Login successful for:', email);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
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
  debug: true,
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
