'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Youtube } from 'lucide-react';
import { useRef, useState } from 'react';
import MediaCard from '@/components/ui/MediaCard';
import { Button } from '@/components/ui/button';

// Placeholder video tutorials data
const videoTutorials = [
  {
    title: 'Complete React Course for Beginners - Build a Full Project',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    platform: 'youtube' as const,
    duration: '2:45:30',
    views: '125K',
    videoId: 'abc123',
  },
  {
    title: 'Next.js 15 - Everything You Need to Know',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60',
    platform: 'youtube' as const,
    duration: '1:20:15',
    views: '89K',
    videoId: 'def456',
  },
  {
    title: 'TypeScript Tips and Tricks - Master Advanced Concepts',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60',
    platform: 'youtube' as const,
    duration: '45:20',
    views: '67K',
    videoId: 'ghi789',
  },
  {
    title: 'Building a Full-Stack App with Next.js and Prisma',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
    platform: 'youtube' as const,
    duration: '1:55:45',
    views: '94K',
    videoId: 'jkl012',
  },
  {
    title: 'Tailwind CSS 4 - New Features and Best Practices',
    thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop&q=60',
    platform: 'youtube' as const,
    duration: '38:10',
    views: '52K',
    videoId: 'mno345',
  },
  {
    title: 'API Development with Node.js and Express',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
    platform: 'youtube' as const,
    duration: '1:12:30',
    views: '78K',
    videoId: 'pqr678',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const titleVariants = {
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

export default function MediaSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/5 rounded-full filter blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full filter blur-[100px]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <div>
            <motion.span
              variants={titleVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 mb-4"
            >
              <Youtube className="w-4 h-4" />
              Tutorials
            </motion.span>
            <motion.h2
              variants={titleVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
            >
              Video <span className="gradient-text">Tutorials</span>
            </motion.h2>
            <motion.p
              variants={titleVariants}
              className="text-muted-foreground text-base md:text-lg max-w-xl mt-3"
            >
              Learn web development with comprehensive video tutorials
            </motion.p>
          </div>

          {/* Scroll Buttons */}
          <motion.div
            variants={titleVariants}
            className="hidden md:flex items-center gap-3"
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-purple-500/30 hover:bg-purple-500/10 disabled:opacity-30"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-purple-500/30 hover:bg-purple-500/10 disabled:opacity-30"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Videos Container - Horizontal Scroll on mobile, Grid on larger screens */}
        <div className="relative">
          {/* Gradient Overlays for scroll indication */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none md:hidden" />

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollButtons}
            className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible"
          >
            {videoTutorials.map((video, index) => (
              <div key={video.videoId} className="snap-start">
                <MediaCard
                  title={video.title}
                  thumbnail={video.thumbnail}
                  platform={video.platform}
                  duration={video.duration}
                  views={video.views}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button
            size="lg"
            variant="outline"
            className="gap-2 border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50 group"
          >
            <Youtube className="w-4 h-4" />
            View All on YouTube
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
