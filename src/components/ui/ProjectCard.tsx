'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  gradientFrom: string;
  gradientTo: string;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  liveUrl,
  githubUrl,
  gradientFrom,
  gradientTo,
  index = 0,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring configuration for smooth animation
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize to -0.5 to 0.5
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      className="h-full"
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        transition={{ duration: 0.1 }}
        className="h-full"
      >
        <Card className="h-full glass border-border/50 hover:border-purple-500/30 transition-colors duration-300 overflow-hidden group">
          {/* Thumbnail with gradient background */}
          <div 
            className="relative h-48 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
            }}
          >
            {/* Overlay pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>
            
            {/* Hover overlay */}
            <motion.div 
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            >
              <div className="flex gap-3">
                {liveUrl && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    className="group/btn"
                  >
                    <Button
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20"
                      onClick={() => window.open(liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </motion.div>
                )}
                {githubUrl && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    className="group/btn"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20"
                      onClick={() => window.open(githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
            
            {/* Animated glow on corners */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 blur-2xl rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-500" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/10 blur-2xl rounded-full translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-transform duration-500" />
          </div>

          <CardContent className="p-5">
            {/* Title */}
            <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:gradient-text transition-all duration-300">
              {title}
            </h3>
            
            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          </CardContent>

          <CardFooter className="px-5 pb-5 pt-0">
            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-muted/50 border-border/50 hover:bg-purple-500/20 hover:border-purple-500/30 transition-colors duration-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>

          {/* Gradient border on hover */}
          <motion.div 
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}50, ${gradientTo}50)`,
              opacity: isHovered ? 0.1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
}
