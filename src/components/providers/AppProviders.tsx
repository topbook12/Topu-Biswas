'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';

interface Props {
  children: ReactNode;
}

export function AppProviders({ children }: Props) {
  return (
    <SessionProvider>
      {children}
      <Toaster position="bottom-right" richColors />
    </SessionProvider>
  );
}
