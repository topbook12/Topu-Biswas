'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import {
  Folder,
  Plus,
  Pencil,
  Trash2,
  Star,
  Eye,
  EyeOff,
  ExternalLink,
  Github,
  Loader2,
  Search,
  Filter,
  MoreVertical,
  GripVertical,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Categories
const CATEGORIES = ['Web App', 'Mobile App', 'API', 'E-Commerce', 'SaaS'];

// Zod schema for project validation
const projectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  shortDescription: z.string().max(200, 'Short description must be 200 characters or less').optional().or(z.literal('')),
  fullDescription: z.string().optional().or(z.literal('')),
  thumbnail: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  gallery: z.string().optional().or(z.literal('')),
  tags: z.string().optional().or(z.literal('')),
  category: z.string().optional().or(z.literal('')),
  featured: z.boolean().default(false),
  liveUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  videoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  status: z.enum(['completed', 'in-progress']).default('completed'),
  published: z.boolean().default(true),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface Project extends Omit<ProjectFormValues, 'gallery' | 'tags'> {
  id: string;
  gallery: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [featuredFilter, setFeaturedFilter] = useState('all');
  const [publishedFilter, setPublishedFilter] = useState('all');

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      thumbnail: '',
      gallery: '',
      tags: '',
      category: '',
      featured: false,
      liveUrl: '',
      githubUrl: '',
      videoUrl: '',
      status: 'completed',
      published: true,
    },
  });

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (categoryFilter !== 'all') params.append('category', categoryFilter);
      if (featuredFilter !== 'all') params.append('featured', featuredFilter);
      if (publishedFilter !== 'all') params.append('published', publishedFilter);

      const res = await fetch(`/api/projects?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, featuredFilter, publishedFilter]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Auto-generate slug from title
  const watchTitle = form.watch('title');
  useEffect(() => {
    if (!editingProject && watchTitle) {
      form.setValue('slug', generateSlug(watchTitle));
    }
  }, [watchTitle, editingProject, form]);

  // Open dialog for new project
  const openNewProjectDialog = () => {
    setEditingProject(null);
    form.reset({
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      thumbnail: '',
      gallery: '',
      tags: '',
      category: '',
      featured: false,
      liveUrl: '',
      githubUrl: '',
      videoUrl: '',
      status: 'completed',
      published: true,
    });
    setDialogOpen(true);
  };

  // Open dialog for editing project
  const openEditProjectDialog = (project: Project) => {
    setEditingProject(project);
    form.reset({
      title: project.title,
      slug: project.slug,
      shortDescription: project.shortDescription || '',
      fullDescription: project.fullDescription || '',
      thumbnail: project.thumbnail || '',
      gallery: Array.isArray(project.gallery) ? project.gallery.join(', ') : '',
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
      category: project.category || '',
      featured: project.featured,
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      videoUrl: project.videoUrl || '',
      status: project.status as 'completed' | 'in-progress',
      published: project.published,
    });
    setDialogOpen(true);
  };

  // Handle form submission
  const onSubmit = async (data: ProjectFormValues) => {
    setSaving(true);
    try {
      // Parse gallery and tags from comma-separated strings
      const galleryArray = data.gallery ? data.gallery.split(',').map(url => url.trim()).filter(Boolean) : [];
      const tagsArray = data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];

      const projectData = {
        ...data,
        gallery: galleryArray,
        tags: tagsArray,
      };

      if (editingProject) {
        // Update existing project
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        });

        if (res.ok) {
          const updatedProject = await res.json();
          setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
          toast.success('Project updated successfully!');
          setDialogOpen(false);
        } else {
          const error = await res.json();
          throw new Error(error.error || 'Failed to update project');
        }
      } else {
        // Create new project
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        });

        if (res.ok) {
          const newProject = await res.json();
          setProjects(prev => [newProject, ...prev]);
          toast.success('Project created successfully!');
          setDialogOpen(false);
        } else {
          const error = await res.json();
          throw new Error(error.error || 'Failed to create project');
        }
      }
    } catch (error) {
      console.error('Failed to save project:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  // Handle delete project
  const handleDeleteProject = async () => {
    if (!deletingProject) return;

    try {
      const res = await fetch(`/api/projects/${deletingProject.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== deletingProject.id));
        toast.success('Project deleted successfully!');
        setDeleteDialogOpen(false);
        setDeletingProject(null);
      } else {
        throw new Error('Failed to delete project');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project');
    }
  };

  // Toggle published status
  const togglePublished = async (project: Project) => {
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !project.published }),
      });

      if (res.ok) {
        const updatedProject = await res.json();
        setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
        toast.success(`Project ${updatedProject.published ? 'published' : 'unpublished'}!`);
      }
    } catch (error) {
      console.error('Failed to toggle published:', error);
      toast.error('Failed to update project');
    }
  };

  // Toggle featured status
  const toggleFeatured = async (project: Project) => {
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !project.featured }),
      });

      if (res.ok) {
        const updatedProject = await res.json();
        setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
        toast.success(`Project ${updatedProject.featured ? 'featured' : 'unfeatured'}!`);
      }
    } catch (error) {
      console.error('Failed to toggle featured:', error);
      toast.error('Failed to update project');
    }
  };

  // Filter projects by search query
  const filteredProjects = projects.filter(project => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.slug.toLowerCase().includes(query) ||
      (project.shortDescription?.toLowerCase().includes(query)) ||
      (project.tags?.some(tag => tag.toLowerCase().includes(query)))
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Folder className="w-8 h-8 text-purple-400" />
            <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <Button
          onClick={openNewProjectDialog}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Project
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Featured Filter */}
              <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
                <SelectTrigger className="w-[140px]">
                  <Star className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="true">Featured</SelectItem>
                  <SelectItem value="false">Not Featured</SelectItem>
                </SelectContent>
              </Select>

              {/* Published Filter */}
              <Select value={publishedFilter} onValueChange={setPublishedFilter}>
                <SelectTrigger className="w-[140px]">
                  <Eye className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="true">Published</SelectItem>
                  <SelectItem value="false">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Projects Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg">
              All Projects ({filteredProjects.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="w-16 h-16 rounded-lg" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-3 w-[150px]" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                  </div>
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <Folder className="w-12 h-12 mx-auto text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">No projects found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery || categoryFilter !== 'all' || featuredFilter !== 'all' || publishedFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Get started by creating a new project'}
                </p>
                {!searchQuery && categoryFilter === 'all' && featuredFilter === 'all' && publishedFilter === 'all' && (
                  <Button onClick={openNewProjectDialog} className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Project
                  </Button>
                )}
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-[60px]"></TableHead>
                      <TableHead className="w-[80px]">Thumbnail</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="w-[120px]">Category</TableHead>
                      <TableHead className="w-[100px]">Featured</TableHead>
                      <TableHead className="w-[120px]">Status</TableHead>
                      <TableHead className="w-[100px]">Published</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.map((project, index) => (
                      <motion.tr
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group border-b hover:bg-muted/30 transition-colors"
                      >
                        <TableCell>
                          <GripVertical className="w-4 h-4 text-muted-foreground/50 opacity-0 group-hover:opacity-100 cursor-grab" />
                        </TableCell>
                        <TableCell>
                          <Avatar className="w-12 h-12 rounded-lg">
                            <AvatarImage src={project.thumbnail} alt={project.title} />
                            <AvatarFallback className="rounded-lg bg-gradient-to-br from-purple-600 to-cyan-600 text-white">
                              {project.title.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{project.title}</p>
                            <p className="text-xs text-muted-foreground">{project.slug}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {project.category ? (
                            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                              {project.category}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => toggleFeatured(project)}
                            className="transition-colors"
                          >
                            {project.featured ? (
                              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            ) : (
                              <Star className="w-5 h-5 text-muted-foreground/50" />
                            )}
                          </button>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              project.status === 'completed'
                                ? 'bg-green-500/10 text-green-400 border-green-500/30'
                                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                            }
                          >
                            {project.status === 'completed' ? 'Completed' : 'In Progress'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => togglePublished(project)}
                            className="flex items-center gap-1 transition-colors"
                          >
                            {project.published ? (
                              <>
                                <Eye className="w-4 h-4 text-green-400" />
                                <span className="text-xs text-green-400">Published</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-4 h-4 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">Draft</span>
                              </>
                            )}
                          </button>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEditProjectDialog(project)}>
                                <Pencil className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              {project.liveUrl && (
                                <DropdownMenuItem asChild>
                                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    View Live
                                  </a>
                                </DropdownMenuItem>
                              )}
                              {project.githubUrl && (
                                <DropdownMenuItem asChild>
                                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-4 h-4 mr-2" />
                                    View Code
                                  </a>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setDeletingProject(project);
                                  setDeleteDialogOpen(true);
                                }}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Project Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="gradient-text">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
            <DialogDescription>
              {editingProject
                ? 'Update the project details below.'
                : 'Fill in the details for your new project.'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="My Awesome Project" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug *</FormLabel>
                        <FormControl>
                          <Input placeholder="my-awesome-project" {...field} />
                        </FormControl>
                        <FormDescription>Auto-generated from title</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="A brief description for cards and previews..."
                          maxLength={200}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Max 200 characters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed description of the project..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Media */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Media</h4>
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gallery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gallery URLs</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="https://image1.jpg, https://image2.jpg, ..."
                          className="min-h-[60px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Comma-separated image URLs</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Categorization */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Categorization</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CATEGORIES.map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags / Tech Stack</FormLabel>
                        <FormControl>
                          <Input placeholder="React, Next.js, TypeScript, ..." {...field} />
                        </FormControl>
                        <FormDescription>Comma-separated tags</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Links */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Links</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="liveUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Live Demo URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://myproject.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="githubUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/user/repo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video Demo URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Status */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Featured Project</FormLabel>
                          <FormDescription>
                            Show on homepage
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Published</FormLabel>
                          <FormDescription>
                            Visible publicly
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {editingProject ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      {editingProject ? 'Update Project' : 'Create Project'}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingProject?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
