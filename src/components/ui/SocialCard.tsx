'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SocialCardProps {
  name: string;
  icon: LucideIcon;
  url: string;
  username?: string;
  color: string;
  index?: number;
}

export default function SocialCard({
  name,
  icon: Icon,
  url,
  username,
  color,
  index = 0,
}: SocialCardProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col items-center justify-center p-6 rounded-2xl glass cursor-pointer overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{ backgroundColor: color }}
      />

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${color}40, transparent, ${color}40)`,
        }}
      />

      {/* Icon container */}
      <motion.div
        className="relative mb-4 w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: `${color}15`,
        }}
        whileHover={{
          boxShadow: `0 0 30px ${color}50`,
        }}
      >
        <Icon
          className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
          style={{ color }}
        />
      </motion.div>

      {/* Platform name */}
      <h3 className="font-semibold text-foreground group-hover:text-white transition-colors mb-1">
        {name}
      </h3>

      {/* Username */}
      {username && (
        <p className="text-sm text-muted-foreground group-hover:text-white/70 transition-colors">
          {username}
        </p>
      )}

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at top right, ${color}, transparent 70%)`,
        }}
      />

      {/* Bottom accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
        style={{ backgroundColor: color }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}
