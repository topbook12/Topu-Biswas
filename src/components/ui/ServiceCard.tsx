'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export default function ServiceCard({ icon: Icon, title, description, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="h-full"
      >
        <Card className="h-full glass border-border/50 hover:border-purple-500/30 transition-all duration-300 group overflow-hidden relative">
          {/* Gradient border effect on hover */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:via-cyan-500/10 group-hover:to-blue-500/20 transition-all duration-500" />
          
          {/* Animated glow line at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/50 transition-all duration-500" />
          
          <CardContent className="p-6 relative z-10">
            {/* Icon container */}
            <motion.div 
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center mb-5 group-hover:from-purple-600/30 group-hover:to-cyan-600/30 transition-all duration-300"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-7 h-7 text-purple-400 group-hover:text-cyan-400 transition-colors duration-300" />
            </motion.div>
            
            {/* Title */}
            <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:gradient-text transition-all duration-300">
              {title}
            </h3>
            
            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-sm">
              {description}
            </p>
          </CardContent>
          
          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/30 transition-all duration-500" />
        </Card>
      </motion.div>
    </motion.div>
  );
}
