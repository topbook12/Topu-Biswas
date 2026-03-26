'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BlogCard from '@/components/ui/BlogCard';
import { Button } from '@/components/ui/button';

// Placeholder blog posts data
const blogPosts = [
  {
    title: 'Building Modern Web Applications with Next.js 15',
    excerpt: 'Explore the latest features in Next.js 15 and learn how to build performant, scalable web applications with the App Router architecture.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
    date: 'Dec 15, 2024',
    readTime: '8 min read',
    slug: 'building-modern-web-apps-nextjs-15',
  },
  {
    title: 'Mastering TypeScript: Advanced Patterns and Best Practices',
    excerpt: 'Deep dive into advanced TypeScript patterns including generics, conditional types, and utility types that will level up your code.',
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60',
    date: 'Dec 10, 2024',
    readTime: '12 min read',
    slug: 'mastering-typescript-patterns',
  },
  {
    title: 'The Art of Responsive Design in 2024',
    excerpt: 'Learn modern techniques for creating fluid, accessible, and beautiful responsive designs that work seamlessly across all devices.',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60',
    date: 'Dec 5, 2024',
    readTime: '6 min read',
    slug: 'art-of-responsive-design-2024',
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

export default function BlogSection() {
  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-[120px]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.span
            variants={titleVariants}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4"
          >
            Blog
          </motion.span>
          <motion.h2
            variants={titleVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Latest <span className="gradient-text">Articles</span>
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto"
          >
            Thoughts, tutorials, and insights on web development, design, and technology
          </motion.p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              coverImage={post.coverImage}
              date={post.date}
              readTime={post.readTime}
              slug={post.slug}
              index={index}
            />
          ))}
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
            className="gap-2 border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/50 group"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
