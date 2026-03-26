// Authentication configuration - Simple PIN based auth
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Admin PIN code
const ADMIN_PIN = '492004';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: 'pin',
      credentials: {
        pin: { label: 'PIN Code', type: 'password' },
      },
      async authorize(credentials) {
        try {
          console.log('=== PIN Auth ===');
          console.log('PIN provided:', credentials?.pin);

          if (!credentials?.pin) {
            console.log('No PIN provided');
            return null;
          }

          const pin = credentials.pin.trim();

          if (pin !== ADMIN_PIN) {
            console.log('Invalid PIN');
            return null;
          }

          console.log('PIN verified successfully');
          return {
            id: 'admin',
            email: 'admin@topubiswas.com',
            name: 'Topu Biswas',
            role: 'admin',
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
  secret: process.env.NEXTAUTH_SECRET || 'topu-biswas-portfolio-secret-key-2024',
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
