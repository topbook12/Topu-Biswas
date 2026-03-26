'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProjectCard from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  Github, 
  ArrowLeft, 
  ArrowRight,
  Calendar,
  Tag,
  Layers
} from 'lucide-react';
import { projects, getProjectBySlug, getRelatedProjects } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const relatedProjects = getRelatedProjects(slug, project.category);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container-custom">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link href="/projects">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            {/* Project Header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  {project.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  <span className="gradient-text">{project.title}</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  {project.shortDescription}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 shrink-0">
                {project.liveUrl && (
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-white"
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Project Image */}
            <div 
              className="relative aspect-video rounded-2xl overflow-hidden mb-8"
              style={{
                background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
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
              
              {/* Center Title */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-4xl md:text-6xl font-bold text-white/30">{project.title}</h2>
              </div>
              
              {/* Corner glows */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
            </div>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="glass rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-semibold mb-4 gradient-text">Project Overview</h2>
                <div className="prose prose-invert max-w-none">
                  {project.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                      {paragraph.startsWith('**') || paragraph.startsWith('-') || paragraph.startsWith('Key') ? (
                        <span dangerouslySetInnerHTML={{ 
                          __html: paragraph
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                            .replace(/- /g, '<br/>• ')
                        }} 
                        />
                      ) : (
                        paragraph
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Project Info */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Project Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium">{project.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant={project.status === 'completed' ? 'default' : 'secondary'} className="mt-1">
                        {project.status === 'completed' ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-muted/50 border-border/50 hover:bg-primary/20 hover:border-primary/30 transition-colors duration-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-between gap-4 mb-16"
          >
            {prevProject ? (
              <Link href={`/projects/${prevProject.slug}`}>
                <Button variant="outline" className="w-full sm:w-auto group">
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Previous</p>
                    <p className="font-medium">{prevProject.title}</p>
                  </div>
                </Button>
              </Link>
            ) : (
              <div />
            )}
            
            {nextProject ? (
              <Link href={`/projects/${nextProject.slug}`}>
                <Button variant="outline" className="w-full sm:w-auto group">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Next</p>
                    <p className="font-medium">{nextProject.title}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </motion.div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">
                  <span className="gradient-text">Related Projects</span>
                </h2>
                <Link href="/projects">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject, index) => (
                  <ProjectCard
                    key={relatedProject.id}
                    title={relatedProject.title}
                    description={relatedProject.shortDescription}
                    tags={relatedProject.tags}
                    liveUrl={relatedProject.liveUrl}
                    githubUrl={relatedProject.githubUrl}
                    gradientFrom={relatedProject.gradientFrom}
                    gradientTo={relatedProject.gradientTo}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
