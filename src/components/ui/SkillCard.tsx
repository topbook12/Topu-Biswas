'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  name: string;
  proficiency: number;
  icon?: React.ReactNode;
  category: 'frontend' | 'backend' | 'tools' | 'design';
  index?: number;
  inView?: boolean;
}

const categoryColors = {
  frontend: {
    gradient: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    shadow: 'rgba(168, 85, 247, 0.3)',
  },
  backend: {
    gradient: 'from-cyan-500 to-blue-500',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    shadow: 'rgba(6, 182, 212, 0.3)',
  },
  tools: {
    gradient: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    shadow: 'rgba(245, 158, 11, 0.3)',
  },
  design: {
    gradient: 'from-rose-500 to-pink-500',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    shadow: 'rgba(244, 63, 94, 0.3)',
  },
};

export default function SkillCard({
  name,
  proficiency,
  icon,
  category,
  index = 0,
  inView = true,
}: SkillCardProps) {
  const colors = categoryColors[category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className={cn(
        'relative p-4 rounded-xl border backdrop-blur-sm',
        'glass-light',
        'transition-all duration-300',
        'hover:shadow-lg group'
      )}
      style={{
        boxShadow: `0 0 0 1px ${colors.shadow.replace('0.3', '0.1')}`,
      }}
    >
      {/* Gradient border on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${colors.shadow.replace('0.3', '0.2')}, transparent)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Icon */}
            {icon && (
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  colors.bg,
                  colors.border,
                  'border'
                )}
              >
                <span className={colors.text}>{icon}</span>
              </div>
            )}
            {/* Name */}
            <h3 className="font-semibold text-foreground text-sm md:text-base">
              {name}
            </h3>
          </div>
          {/* Percentage */}
          <span
            className={cn(
              'text-sm font-bold',
              colors.text
            )}
          >
            {proficiency}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 w-full bg-muted/50 rounded-full overflow-hidden">
          {/* Background glow */}
          <motion.div
            className={cn(
              'absolute inset-y-0 left-0 rounded-full',
              `bg-gradient-to-r ${colors.gradient}`
            )}
            initial={{ width: 0 }}
            animate={inView ? { width: `${proficiency}%` } : {}}
            transition={{
              duration: 1,
              delay: index * 0.1 + 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={inView ? { width: `${proficiency}%` } : {}}
            transition={{
              duration: 1,
              delay: index * 0.1 + 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent',
                'animate-shimmer'
              )}
              style={{
                animation: 'shimmer 2s infinite',
              }}
            />
          </motion.div>
        </div>

        {/* Skill Level Label */}
        <div className="mt-2 flex justify-end">
          <span className="text-xs text-muted-foreground">
            {proficiency >= 90
              ? 'Expert'
              : proficiency >= 75
                ? 'Advanced'
                : proficiency >= 50
                  ? 'Intermediate'
                  : 'Beginner'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
