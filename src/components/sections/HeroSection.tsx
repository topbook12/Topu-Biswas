'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Mail, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Dynamic import for 3D component to avoid SSR issues
const FloatingOrb = dynamic(() => import('@/components/three/FloatingOrb'), {
  ssr: false,
  loading: () => <OrbFallback />,
});

// Fallback for when WebGL is not available or loading
function OrbFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Animated CSS orb fallback */}
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 animate-pulse opacity-80 blur-xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 animate-float" />
        </div>
      </div>
    </div>
  );
}

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

const glowVariants = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(124, 58, 237, 0.3)',
      '0 0 40px rgba(124, 58, 237, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)',
      '0 0 20px rgba(124, 58, 237, 0.3)',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden animated-gradient noise-overlay">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full filter blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full filter blur-[120px] animate-pulse" />

      <div className="container-custom relative z-10 py-12 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          
          {/* Text Content - Left Side */}
          <motion.div
            className="order-2 lg:order-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Availability Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <Badge 
                variant="outline" 
                className="px-4 py-1.5 text-sm bg-green-500/10 border-green-500/30 text-green-400 gap-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Available for Freelance
              </Badge>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
            >
              <span className="text-foreground">Hi, I&apos;m </span>
              <span className="gradient-text glow-text">Topu Biswas</span>
            </motion.h1>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-6 font-medium"
            >
              Full Stack Web Developer
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-muted-foreground/80 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Building modern web experiences with cutting-edge technologies. 
              Transforming ideas into elegant, performant, and scalable solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.div variants={glowVariants} animate="animate">
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 border-0"
                >
                  <Mail className="w-4 h-4" />
                  Hire Me
                </Button>
              </motion.div>

              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/50"
              >
                <ExternalLink className="w-4 h-4" />
                View Projects
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

            {/* Tech Stack Icons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Tech Stack:</span>
              </div>
              <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
                {['React', 'Node.js', 'TypeScript', 'Next.js'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="px-3 py-1 text-xs rounded-full bg-muted/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-purple-500/30 transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Canvas - Right Side */}
          <motion.div
            className="order-1 lg:order-2 w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Suspense fallback={<OrbFallback />}>
              <FloatingOrb />
            </Suspense>

            {/* Decorative ring around 3D area */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] rounded-full border border-purple-500/10 animate-[spin-slow_30s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] rounded-full border border-cyan-500/10 animate-[spin-slow_20s_linear_infinite_reverse]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-2 rounded-full bg-purple-500"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
