'use client';

import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface BlogCardProps {
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  readTime: string;
  slug?: string;
  index?: number;
}

export default function BlogCard({
  title,
  excerpt,
  coverImage,
  date,
  readTime,
  index = 0,
}: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden glass card-hover"
    >
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-purple-500" />
            {date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-cyan-500" />
            {readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {excerpt}
        </p>

        {/* Read More Link */}
        <motion.div
          className="flex items-center gap-2 text-sm font-medium text-purple-500 group-hover:text-cyan-400 transition-colors cursor-pointer"
          whileHover={{ x: 5 }}
        >
          <span>Read Article</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Gradient border effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl border border-purple-500/30" />
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10" />
      </div>
    </motion.article>
  );
}

export { BlogCard };
