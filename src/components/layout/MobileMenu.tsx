'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavLink {
  name: string;
  href: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
  pathname: string;
}

export default function MobileMenu({ navLinks, pathname }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMenu}
        className="md:hidden relative z-50 p-2 rounded-lg hover:bg-muted/50 transition-colors"
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6 text-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={toggleMenu}
            />

            {/* Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[280px] glass z-40 md:hidden"
            >
              <div className="flex flex-col h-full pt-20 pb-6 px-6">
                {/* Navigation Links */}
                <nav className="flex-1">
                  <ul className="space-y-2">
                    {navLinks.map((link, i) => {
                      const isActive = pathname === link.href;
                      return (
                        <motion.li
                          key={link.name}
                          custom={i}
                          variants={linkVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                        >
                          <Link
                            href={link.href}
                            onClick={toggleMenu}
                            className={cn(
                              'block py-3 px-4 rounded-lg text-lg font-medium transition-all duration-200',
                              isActive
                                ? 'text-primary bg-primary/10'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            )}
                          >
                            <span className="flex items-center gap-3">
                              {isActive && (
                                <motion.span
                                  layoutId="mobileActiveIndicator"
                                  className="w-1.5 h-1.5 rounded-full bg-primary"
                                  initial={false}
                                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                              )}
                              {link.name}
                            </span>
                          </Link>
                        </motion.li>
                      );
                    })}
                    
                    {/* Admin Link */}
                    <motion.li
                      custom={navLinks.length}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="pt-2 border-t border-border mt-2"
                    >
                      <Link
                        href="/admin/login"
                        onClick={toggleMenu}
                        className="flex items-center gap-3 py-3 px-4 rounded-lg text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                      >
                        <Settings className="w-5 h-5" />
                        Admin
                      </Link>
                    </motion.li>
                  </ul>
                </nav>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="pt-6 border-t border-border"
                >
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-white font-medium shadow-lg shadow-primary/25"
                  >
                    <Link href="/contact" onClick={toggleMenu}>
                      Hire Me
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
