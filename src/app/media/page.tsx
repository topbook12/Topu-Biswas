'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MediaCard } from '@/components/ui/MediaCard';
import { mediaItems, MediaType } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const platformFilters = ['All', 'YouTube', 'Vimeo', 'Facebook', 'Instagram'];

export default function MediaPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredMedia = activeFilter === 'All'
    ? mediaItems
    : mediaItems.filter(item => item.type.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <Play className="w-3 h-3 mr-1" />
              Video Tutorials & Media
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Learning Resources</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Watch my tutorials and tech talks to learn about web development, 
              React, Next.js, and more.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {platformFilters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={activeFilter === filter 
                  ? 'bg-primary text-primary-foreground' 
                  : 'border-border hover:border-primary'
                }
              >
                {filter}
              </Button>
            ))}
          </motion.div>

          {/* Media Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredMedia.map((item: MediaType, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <MediaCard {...item} />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredMedia.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground">No media found for this platform.</p>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
