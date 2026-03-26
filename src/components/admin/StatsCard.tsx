'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  suffix?: string;
  gradient?: 'purple' | 'cyan' | 'blue' | 'green' | 'orange' | 'pink';
  index?: number;
}

const gradientStyles = {
  purple: {
    bg: 'from-purple-500/20 to-purple-600/5',
    icon: 'from-purple-500 to-purple-600',
    accent: 'bg-purple-500/20',
    border: 'border-purple-500/30',
    glow: 'hover:shadow-purple-500/20',
  },
  cyan: {
    bg: 'from-cyan-500/20 to-cyan-600/5',
    icon: 'from-cyan-500 to-cyan-600',
    accent: 'bg-cyan-500/20',
    border: 'border-cyan-500/30',
    glow: 'hover:shadow-cyan-500/20',
  },
  blue: {
    bg: 'from-blue-500/20 to-blue-600/5',
    icon: 'from-blue-500 to-blue-600',
    accent: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    glow: 'hover:shadow-blue-500/20',
  },
  green: {
    bg: 'from-green-500/20 to-green-600/5',
    icon: 'from-green-500 to-green-600',
    accent: 'bg-green-500/20',
    border: 'border-green-500/30',
    glow: 'hover:shadow-green-500/20',
  },
  orange: {
    bg: 'from-orange-500/20 to-orange-600/5',
    icon: 'from-orange-500 to-orange-600',
    accent: 'bg-orange-500/20',
    border: 'border-orange-500/30',
    glow: 'hover:shadow-orange-500/20',
  },
  pink: {
    bg: 'from-pink-500/20 to-pink-600/5',
    icon: 'from-pink-500 to-pink-600',
    accent: 'bg-pink-500/20',
    border: 'border-pink-500/30',
    glow: 'hover:shadow-pink-500/20',
  },
};

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);
  const spring = useSpring(0, { duration: 2000 });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <span ref={ref} className="text-3xl font-bold">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export default function StatsCard({
  icon: Icon,
  title,
  value,
  suffix = '',
  gradient = 'purple',
  index = 0,
}: StatsCardProps) {
  const styles = gradientStyles[gradient];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className={`relative overflow-hidden border ${styles.border} bg-gradient-to-br ${styles.bg} backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl ${styles.glow} group`}
      >
        {/* Gradient accent line */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${styles.icon}`}
        />

        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-medium">{title}</p>
              <AnimatedNumber value={value} suffix={suffix} />
            </div>
            <div
              className={`p-3 rounded-xl ${styles.accent} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>

        {/* Decorative background element */}
        <div
          className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-gradient-to-br ${styles.icon} opacity-10 blur-2xl transition-all duration-300 group-hover:opacity-20 group-hover:scale-150`}
        />
      </Card>
    </motion.div>
  );
}
