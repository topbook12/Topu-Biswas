'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
    gradientFrom: '#7C3AED',
    gradientTo: '#06B6D4',
  },
  {
    title: 'AI Chat Application',
    description: 'Real-time chat application powered by AI with message threading, file sharing, and end-to-end encryption.',
    tags: ['React', 'Node.js', 'Socket.io', 'OpenAI'],
    liveUrl: '#',
    githubUrl: '#',
    gradientFrom: '#EC4899',
    gradientTo: '#8B5CF6',
  },
  {
    title: 'Task Management Suite',
    description: 'Collaborative project management tool with Kanban boards, time tracking, and team analytics.',
    tags: ['Next.js', 'PostgreSQL', 'Redis', 'Docker'],
    liveUrl: '#',
    githubUrl: '#',
    gradientFrom: '#06B6D4',
    gradientTo: '#3B82F6',
  },
  {
    title: 'Real Estate Marketplace',
    description: 'Property listing platform with virtual tours, mortgage calculator, and agent matching system.',
    tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
    liveUrl: '#',
    githubUrl: '#',
    gradientFrom: '#F59E0B',
    gradientTo: '#EF4444',
  },
  {
    title: 'Fitness Tracking App',
    description: 'Health and fitness companion with workout plans, progress tracking, and nutrition logging.',
    tags: ['React Native', 'Firebase', 'GraphQL', 'HealthKit'],
    liveUrl: '#',
    githubUrl: '#',
    gradientFrom: '#10B981',
    gradientTo: '#06B6D4',
  },
  {
    title: 'Developer Portfolio CMS',
    description: 'Customizable portfolio platform for developers with blog, project showcase, and contact forms.',
    tags: ['Next.js', 'Sanity', 'Tailwind', 'Vercel'],
    liveUrl: '#',
    githubUrl: '#',
    gradientFrom: '#8B5CF6',
    gradientTo: '#EC4899',
  },
];

export default function ProjectsSection() {
  return (
    <section className="relative section-padding overflow-hidden" id="projects">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">Portfolio</span>
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Featured </span>
            <span className="gradient-text">Projects</span>
          </h2>

          {/* Subtitle */}
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A showcase of my best work. Each project represents a unique challenge
            solved with creativity and technical excellence.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              gradientFrom={project.gradientFrom}
              gradientTo={project.gradientTo}
              index={index}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/50 px-8"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
        />
      </div>
    </section>
  );
}
