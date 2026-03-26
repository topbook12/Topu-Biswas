'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  ExternalLink,
  GripVertical,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Globe,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LucideIcon } from 'lucide-react';

// Zod schema for social link validation
const socialLinkSchema = z.object({
  platform: z.enum(['GitHub', 'LinkedIn', 'Twitter', 'Facebook', 'Instagram', 'YouTube', 'TikTok', 'Website']),
  url: z.string().url('Must be a valid URL'),
  order: z.number().min(1, 'Order must be at least 1'),
});

type SocialLinkFormValues = z.infer<typeof socialLinkSchema>;

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Platform configurations
const platformConfig: Record<string, { icon: LucideIcon; color: string; bgColor: string; hoverColor: string }> = {
  GitHub: {
    icon: Github,
    color: 'text-white',
    bgColor: 'bg-gray-700',
    hoverColor: 'hover:bg-gray-600',
  },
  LinkedIn: {
    icon: Linkedin,
    color: 'text-white',
    bgColor: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-500',
  },
  Twitter: {
    icon: Twitter,
    color: 'text-white',
    bgColor: 'bg-sky-500',
    hoverColor: 'hover:bg-sky-400',
  },
  Facebook: {
    icon: Facebook,
    color: 'text-white',
    bgColor: 'bg-blue-700',
    hoverColor: 'hover:bg-blue-600',
  },
  Instagram: {
    icon: Instagram,
    color: 'text-white',
    bgColor: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
    hoverColor: 'hover:opacity-90',
  },
  YouTube: {
    icon: Youtube,
    color: 'text-white',
    bgColor: 'bg-red-600',
    hoverColor: 'hover:bg-red-500',
  },
  TikTok: {
    icon: Globe,
    color: 'text-white',
    bgColor: 'bg-black',
    hoverColor: 'hover:bg-gray-900',
  },
  Website: {
    icon: Globe,
    color: 'text-white',
    bgColor: 'bg-gradient-to-r from-purple-600 to-cyan-600',
    hoverColor: 'hover:opacity-90',
  },
};

export default function SocialLinksPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<SocialLink | null>(null);
  const [deleting, setDeleting] = useState(false);

  const form = useForm<SocialLinkFormValues>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      platform: 'GitHub',
      url: '',
      order: 1,
    },
  });

  // Fetch social links
  const fetchSocialLinks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/social-links');
      if (res.ok) {
        const data = await res.json();
        setSocialLinks(data);
      }
    } catch (error) {
      console.error('Failed to fetch social links:', error);
      toast.error('Failed to load social links');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSocialLinks();
  }, [fetchSocialLinks]);

  // Open dialog for creating new link
  const openCreateDialog = () => {
    setEditingLink(null);
    const nextOrder = socialLinks.length > 0 
      ? Math.max(...socialLinks.map(l => l.order)) + 1 
      : 1;
    form.reset({
      platform: 'GitHub',
      url: '',
      order: nextOrder,
    });
    setIsDialogOpen(true);
  };

  // Open dialog for editing link
  const openEditDialog = (link: SocialLink) => {
    setEditingLink(link);
    form.reset({
      platform: link.platform as SocialLinkFormValues['platform'],
      url: link.url,
      order: link.order,
    });
    setIsDialogOpen(true);
  };

  // Handle form submission
  const onSubmit = async (data: SocialLinkFormValues) => {
    setSaving(true);
    try {
      // Get the icon name based on platform
      const iconMap: Record<string, string> = {
        GitHub: 'github',
        LinkedIn: 'linkedin',
        Twitter: 'twitter',
        Facebook: 'facebook',
        Instagram: 'instagram',
        YouTube: 'youtube',
        TikTok: 'tiktok',
        Website: 'globe',
      };

      const payload = {
        ...data,
        icon: iconMap[data.platform] || 'globe',
      };

      if (editingLink) {
        // Update existing link
        const res = await fetch(`/api/social-links/${editingLink.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          toast.success('Social link updated successfully!');
          setIsDialogOpen(false);
          fetchSocialLinks();
        } else {
          const error = await res.json();
          throw new Error(error.error || 'Failed to update social link');
        }
      } else {
        // Create new link
        const res = await fetch('/api/social-links', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          toast.success('Social link created successfully!');
          setIsDialogOpen(false);
          fetchSocialLinks();
        } else {
          const error = await res.json();
          throw new Error(error.error || 'Failed to create social link');
        }
      }
    } catch (error) {
      console.error('Failed to save social link:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save social link');
    } finally {
      setSaving(false);
    }
  };

  // Handle delete link
  const handleDelete = async () => {
    if (!linkToDelete) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/social-links/${linkToDelete.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Social link deleted successfully!');
        setDeleteDialogOpen(false);
        setLinkToDelete(null);
        fetchSocialLinks();
      } else {
        throw new Error('Failed to delete social link');
      }
    } catch (error) {
      console.error('Failed to delete social link:', error);
      toast.error('Failed to delete social link');
    } finally {
      setDeleting(false);
    }
  };

  // Open link URL
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">Social Links</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your social media profiles and external links
          </p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Link
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{socialLinks.length}</p>
                <p className="text-sm text-muted-foreground">Total Social Links</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Social Links Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-purple-400" />
              All Social Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : socialLinks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ExternalLink className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No social links found</h3>
                <p className="text-muted-foreground mt-1">
                  Get started by adding your first social link
                </p>
                <Button
                  onClick={openCreateDialog}
                  className="mt-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Link
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {socialLinks.map((link, index) => {
                  const config = platformConfig[link.platform] || platformConfig.Website;
                  const PlatformIcon = config.icon;
                  return (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative"
                    >
                      <Card className={`bg-card/30 backdrop-blur-sm border-border hover:border-purple-500/30 transition-all duration-300 overflow-hidden`}>
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              {/* Order indicator */}
                              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-muted text-xs text-muted-foreground">
                                {link.order}
                              </div>
                              
                              {/* Platform icon */}
                              <div className={`w-10 h-10 rounded-lg ${config.bgColor} ${config.hoverColor} flex items-center justify-center transition-colors cursor-pointer`}
                                onClick={() => openLink(link.url)}
                              >
                                <PlatformIcon className={`w-5 h-5 ${config.color}`} />
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => openLink(link.url)}
                              >
                                <ExternalLink className="w-4 h-4 text-cyan-400" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => openEditDialog(link)}
                              >
                                <Edit className="w-4 h-4 text-purple-400" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  setLinkToDelete(link);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </Button>
                            </div>
                          </div>

                          {/* Platform name */}
                          <h3 className="font-semibold text-foreground mb-1">
                            {link.platform}
                          </h3>

                          {/* URL */}
                          <p className="text-sm text-muted-foreground truncate">
                            {link.url.replace(/^https?:\/\//, '').split('/')[0]}
                          </p>

                          {/* Platform badge */}
                          <div className="mt-3">
                            <Badge 
                              variant="secondary" 
                              className={`${config.bgColor} bg-opacity-20 text-white border-0`}
                            >
                              {link.platform}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingLink ? 'Edit Social Link' : 'Add New Social Link'}
            </DialogTitle>
            <DialogDescription>
              {editingLink
                ? 'Update the social link details below.'
                : 'Fill in the details to add a new social link.'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Platform */}
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => {
                  const currentConfig = platformConfig[field.value] || platformConfig.Website;
                  const CurrentIcon = currentConfig.icon;
                  return (
                    <FormItem>
                      <FormLabel>Platform *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="GitHub">
                            <div className="flex items-center gap-2">
                              <Github className="w-4 h-4" />
                              GitHub
                            </div>
                          </SelectItem>
                          <SelectItem value="LinkedIn">
                            <div className="flex items-center gap-2">
                              <Linkedin className="w-4 h-4" />
                              LinkedIn
                            </div>
                          </SelectItem>
                          <SelectItem value="Twitter">
                            <div className="flex items-center gap-2">
                              <Twitter className="w-4 h-4" />
                              Twitter
                            </div>
                          </SelectItem>
                          <SelectItem value="Facebook">
                            <div className="flex items-center gap-2">
                              <Facebook className="w-4 h-4" />
                              Facebook
                            </div>
                          </SelectItem>
                          <SelectItem value="Instagram">
                            <div className="flex items-center gap-2">
                              <Instagram className="w-4 h-4" />
                              Instagram
                            </div>
                          </SelectItem>
                          <SelectItem value="YouTube">
                            <div className="flex items-center gap-2">
                              <Youtube className="w-4 h-4" />
                              YouTube
                            </div>
                          </SelectItem>
                          <SelectItem value="TikTok">
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4" />
                              TikTok
                            </div>
                          </SelectItem>
                          <SelectItem value="Website">
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4" />
                              Website
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/* URL */}
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the full URL to your profile
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Order */}
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormDescription>
                      Lower numbers appear first
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
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
                      {editingLink ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      {editingLink ? 'Update Link' : 'Add Link'}
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Social Link</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the {linkToDelete?.platform} link? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
