'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { motion } from 'framer-motion';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AuthGuard from '@/components/admin/AuthGuard';

// Page titles mapping
const pageTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/profile': 'Profile',
  '/admin/skills': 'Skills',
  '/admin/services': 'Services',
  '/admin/projects': 'Projects',
  '/admin/posts': 'Blog Posts',
  '/admin/media': 'Media',
  '/admin/files': 'Files',
  '/admin/social-links': 'Social Links',
};

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Get page title from pathname
  const getPageTitle = () => {
    // Check for exact match first
    if (pageTitles[pathname]) {
      return pageTitles[pathname];
    }
    // Check for partial matches for nested routes
    for (const [path, title] of Object.entries(pageTitles)) {
      if (pathname.startsWith(path + '/')) {
        return title;
      }
    }
    return 'Admin Dashboard';
  };

  // Don't show sidebar and header on login page
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Sidebar */}
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Header */}
        <AdminHeader title={getPageTitle()} isCollapsed={isCollapsed} />

        {/* Main Content */}
        <motion.main
          initial={false}
          animate={{ marginLeft: isCollapsed ? 72 : 256 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="pt-16 min-h-screen sidebar-transition"
        >
          <div className="p-6">
            {children}
          </div>
        </motion.main>
      </div>
    </AuthGuard>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  );
}
