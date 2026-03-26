'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      // Use setTimeout to defer the state update to the next event loop
      const timeoutId = setTimeout(() => {
        router.push('/admin/login');
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [status, pathname, router]);

  // Show loading state while checking auth
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary blur-xl opacity-50 animate-pulse" />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <p className="text-lg font-medium gradient-text">Loading...</p>
            <p className="text-sm text-muted-foreground mt-1">Please wait</p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // If unauthenticated, show loading while redirecting
  if (status === 'unauthenticated' && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <p className="text-lg font-medium gradient-text">Redirecting...</p>
            <p className="text-sm text-muted-foreground mt-1">Please wait</p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // If authenticated, render children
  if (status === 'authenticated') {
    return <>{children}</>;
  }

  // Fallback - should not reach here, but return null to prevent flash
  return null;
}
