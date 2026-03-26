'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Calendar,
  Code2,
  Users,
  Wrench,
  Download,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Stats data
const stats = [
  {
    icon: Calendar,
    value: '5+',
    label: 'Years Experience',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Code2,
    value: '50+',
    label: 'Projects Completed',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
  },
  {
    icon: Users,
    value: '30+',
    label: 'Happy Clients',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Wrench,
    value: '20+',
    label: 'Technologies',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative section-padding overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-[120px] -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-600/10 rounded-full filter blur-[100px] translate-x-1/2" />

      <div className="container-custom relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge
            variant="outline"
            className="px-4 py-1.5 text-sm border-purple-500/30 text-purple-400 mb-4"
          >
            Get to Know Me
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">About </span>
            <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating impactful digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative mx-auto lg:mx-0"
          >
            {/* Main image container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-cyan-500 to-blue-500 opacity-80 blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Glassmorphism card */}
              <div className="absolute inset-4 rounded-full glass border border-white/20 overflow-hidden">
                {/* Gradient background for placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-purple-600/30 via-cyan-500/20 to-blue-500/30 flex items-center justify-center">
                  {/* User silhouette placeholder */}
                  <div className="relative">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                      <svg
                        className="w-20 h-20 md:w-24 md:h-24 text-white/40"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    {/* Name badge */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="text-sm font-medium text-white/60">
                        Topu Biswas
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-pulse" />
              <div className="absolute -inset-4 rounded-full border border-cyan-500/10" />
              <div className="absolute -inset-8 rounded-full border border-purple-500/5" />
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-2 -right-2 md:top-4 md:right-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="px-4 py-2 rounded-lg glass border border-purple-500/30 shadow-lg">
                <span className="text-purple-400 font-semibold text-sm">
                  5+ Years
                </span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-2 md:bottom-8 md:left-0"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="px-4 py-2 rounded-lg glass border border-cyan-500/30 shadow-lg">
                <span className="text-cyan-400 font-semibold text-sm">
                  50+ Projects
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {/* Bio */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="relative p-4 rounded-xl glass-light border border-white/10 text-center group hover:border-white/20 transition-all"
                >
                  <div
                    className={`w-12 h-12 mx-auto mb-2 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 border-0 shadow-lg shadow-purple-500/20"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/50"
              >
                <ExternalLink className="w-4 h-4" />
                View Portfolio
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="gap-2 hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                <Download className="w-4 h-4" />
                Download CV
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
