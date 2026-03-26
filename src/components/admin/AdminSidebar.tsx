'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Code,
  Briefcase,
  FolderKanban,
  FileText,
  Video,
  Download,
  Share2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { name: 'Profile', href: '/admin/profile', icon: User },
  { name: 'Skills', href: '/admin/skills', icon: Code },
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { name: 'Posts', href: '/admin/posts', icon: FileText },
  { name: 'Media', href: '/admin/media', icon: Video },
  { name: 'Files', href: '/admin/files', icon: Download },
  { name: 'Social Links', href: '/admin/social-links', icon: Share2 },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function AdminSidebar({ isCollapsed, setIsCollapsed }: AdminSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin/login' });
  };

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <Link
          href="/admin/dashboard"
          className={cn(
            'flex items-center gap-3 transition-opacity',
            isCollapsed && 'opacity-0 pointer-events-none'
          )}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg gradient-text">Admin</span>
        </Link>

        {/* Collapse button - Desktop */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>

        {/* Close button - Mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                    active
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/10 text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  )}
                >
                  {/* Active indicator */}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-r-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}

                  <Icon
                    className={cn(
                      'w-5 h-5 flex-shrink-0 transition-colors',
                      active ? 'text-primary' : 'group-hover:text-primary'
                    )}
                  />

                  <span
                    className={cn(
                      'font-medium whitespace-nowrap transition-opacity',
                      isCollapsed && 'lg:opacity-0 lg:w-0 lg:overflow-hidden'
                    )}
                  >
                    {item.name}
                  </span>

                  {/* Active glow effect */}
                  {active && (
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User & Logout */}
      <div className="border-t border-border p-4">
        {/* User info */}
        <div
          className={cn(
            'flex items-center gap-3 mb-4 px-2',
            isCollapsed && 'lg:justify-center'
          )}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
            <span className="text-white font-medium text-sm">
              {session?.user?.name?.charAt(0) || 'T'}
            </span>
          </div>
          <div
            className={cn(
              'flex-1 min-w-0 transition-opacity',
              isCollapsed && 'lg:opacity-0 lg:w-0 lg:overflow-hidden'
            )}
          >
            <p className="text-sm font-medium text-foreground truncate">
              {session?.user?.name || 'Admin'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {session?.user?.email || 'admin@example.com'}
            </p>
          </div>
        </div>

        {/* Logout button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className={cn(
            'w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive',
            isCollapsed && 'lg:px-0'
          )}
        >
          <LogOut className="w-4 h-4" />
          <span
            className={cn(
              'ml-2 transition-opacity',
              isCollapsed && 'lg:hidden'
            )}
          >
            Logout
          </span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 bg-background/80 backdrop-blur-sm border border-border"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 flex flex-col"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 72 : 256 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col h-screen fixed left-0 top-0 bg-sidebar border-r border-sidebar-border z-30 sidebar-transition"
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
}
