'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import {
  Plus,
  Search,
  Video,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  Image as ImageIcon,
  Youtube,
  ExternalLink,
  X,
  Link as LinkIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
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
import { ScrollArea } from '@/components/ui/scroll-area';

// Zod schema for media validation
const mediaSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['youtube', 'vimeo', 'facebook', 'instagram', 'tiktok', 'link'], {
    required_error: 'Type is required',
  }),
  url: z.string().url('Must be a valid URL'),
  thumbnail: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  description: z.string().optional(),
  order: z.number().min(0).optional(),
  published: z.boolean().default(true),
});

type MediaFormValues = z.infer<typeof mediaSchema>;

interface MediaLink {
  id: string;
  title: string;
  type: string;
  url: string;
  thumbnail: string | null;
  description: string | null;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Media type configuration
const mediaTypes = [
  { value: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-500', bgColor: 'bg-red-500/20' },
  { value: 'vimeo', label: 'Vimeo', icon: Video, color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
  { value: 'facebook', label: 'Facebook', icon: Video, color: 'text-blue-500', bgColor: 'bg-blue-600/20' },
  { value: 'instagram', label: 'Instagram', icon: Video, color: 'text-pink-400', bgColor: 'bg-pink-500/20' },
  { value: 'tiktok', label: 'TikTok', icon: Video, color: 'text-white', bgColor: 'bg-gray-500/20' },
  { value: 'link', label: 'External Link', icon: LinkIcon, color: 'text-cyan-400', bgColor: 'bg-cyan-500/20' },
];

// Helper to get media type config
function getMediaTypeConfig(type: string) {
  return mediaTypes.find((t) => t.value === type) || mediaTypes[5];
}

// Helper function to format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function MediaPage() {
  const [mediaLinks, setMediaLinks] = useState<MediaLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [publishedFilter, setPublishedFilter] = useState<'all' | 'true' | 'false'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<MediaLink | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState<MediaLink | null>(null);
  const [deleting, setDeleting] = useState(false);

  const form = useForm<MediaFormValues>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      title: '',
      type: 'youtube',
      url: '',
      thumbnail: '',
      description: '',
      order: 0,
      published: true,
    },
  });

  // Fetch media links
  const fetchMediaLinks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (typeFilter !== 'all') {
        params.set('type', typeFilter);
      }
      if (publishedFilter !== 'all') {
        params.set('published', publishedFilter);
      }
      if (searchQuery) {
        params.set('search', searchQuery);
      }

      const res = await fetch(`/api/media?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setMediaLinks(data);
      }
    } catch (error) {
      console.error('Failed to fetch media links:', error);
      toast.error('Failed to load media links');
    } finally {
      setLoading(false);
    }
  }, [typeFilter, publishedFilter, searchQuery]);

  useEffect(() => {
    fetchMediaLinks();
  }, [fetchMediaLinks]);

  // Open dialog for creating new media
  const openCreateDialog = () => {
    setEditingMedia(null);
    form.reset({
      title: '',
      type: 'youtube',
      url: '',
      thumbnail: '',
      description: '',
      order: 0,
      published: true,
    });
    setIsDialogOpen(true);
  };

  // Open dialog for editing media
  const openEditDialog = (media: MediaLink) => {
    setEditingMedia(media);
    form.reset({
      title: media.title,
      type: media.type as MediaFormValues['type'],
      url: media.url,
      thumbnail: media.thumbnail || '',
      description: media.description || '',
      order: media.order,
      published: media.published,
    });
    setIsDialogOpen(true);
  };

  // Handle form submission
  const onSubmit = async (data: MediaFormValues) => {
    setSaving(true);
    try {
      const payload = {
        ...data,
        thumbnail: data.thumbnail || null,
        description: data.description || null,
      };

      if (editingMedia) {
        // Update existing media
        const res = await fetch(`/api/media/${editingMedia.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          toast.success('Media updated successfully!');
          setIsDialogOpen(false);
          fetchMediaLinks();
        } else {
          const error = await res.json();
          throw new Error(error.error || 'Failed to update media');
        }
      } else {
        // Create new media
        const res = await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          toast.success('Media created successfully!');
          setIsDialogOpen(false);
          fetchMediaLinks();
        } else {
          const error = await res.json();
          throw new Error(error.error || 'Failed to create media');
        }
      }
    } catch (error) {
      console.error('Failed to save media:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save media');
    } finally {
      setSaving(false);
    }
  };

  // Handle delete media
  const handleDelete = async () => {
    if (!mediaToDelete) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/media/${mediaToDelete.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Media deleted successfully!');
        setDeleteDialogOpen(false);
        setMediaToDelete(null);
        fetchMediaLinks();
      } else {
        throw new Error('Failed to delete media');
      }
    } catch (error) {
      console.error('Failed to delete media:', error);
      toast.error('Failed to delete media');
    } finally {
      setDeleting(false);
    }
  };

  // Toggle published status
  const togglePublished = async (media: MediaLink) => {
    try {
      const res = await fetch(`/api/media/${media.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !media.published }),
      });

      if (res.ok) {
        toast.success(
          media.published ? 'Media unpublished!' : 'Media published!'
        );
        fetchMediaLinks();
      }
    } catch (error) {
      console.error('Failed to toggle published:', error);
      toast.error('Failed to update media status');
    }
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
            <span className="gradient-text">Media Links</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your video tutorials and media links
          </p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Media
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
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Type:</span>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {mediaTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Published Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <div className="flex gap-1">
                  {(['all', 'true', 'false'] as const).map((filter) => (
                    <Button
                      key={filter}
                      variant={publishedFilter === filter ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPublishedFilter(filter)}
                      className={
                        publishedFilter === filter
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-600'
                          : ''
                      }
                    >
                      {filter === 'all'
                        ? 'All'
                        : filter === 'true'
                        ? 'Published'
                        : 'Draft'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Media Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-400" />
              All Media ({mediaLinks.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : mediaLinks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Video className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No media found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery || typeFilter !== 'all' || publishedFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Get started by adding your first media'}
                </p>
                {!searchQuery && typeFilter === 'all' && publishedFilter === 'all' && (
                  <Button
                    onClick={openCreateDialog}
                    className="mt-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Media
                  </Button>
                )}
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Thumbnail</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="w-[120px]">Type</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="w-[80px]">Order</TableHead>
                      <TableHead className="w-[140px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mediaLinks.map((media, index) => {
                      const typeConfig = getMediaTypeConfig(media.type);
                      const TypeIcon = typeConfig.icon;
                      return (
                        <motion.tr
                          key={media.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-muted/50 border-b transition-colors"
                        >
                          <TableCell>
                            <div className="w-20 h-12 rounded overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                              {media.thumbnail ? (
                                <img
                                  src={media.thumbnail}
                                  alt={media.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <ImageIcon className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              <p className="font-medium truncate">{media.title}</p>
                              <p className="text-sm text-muted-foreground truncate">
                                {media.description || 'No description'}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={`${typeConfig.bgColor} ${typeConfig.color} border-0`}
                            >
                              <TypeIcon className="w-3 h-3 mr-1" />
                              {typeConfig.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={media.published ? 'default' : 'secondary'}
                              className={
                                media.published
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-yellow-500/20 text-yellow-400'
                              }
                            >
                              {media.published ? 'Published' : 'Draft'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground font-mono">
                              #{media.order}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(media.url, '_blank')}
                                title="Open URL"
                              >
                                <ExternalLink className="w-4 h-4 text-muted-foreground" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => togglePublished(media)}
                                title={media.published ? 'Unpublish' : 'Publish'}
                              >
                                {media.published ? (
                                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                  <Eye className="w-4 h-4 text-green-400" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditDialog(media)}
                              >
                                <Edit className="w-4 h-4 text-cyan-400" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setMediaToDelete(media);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              {editingMedia ? 'Edit Media' : 'Add New Media'}
            </DialogTitle>
            <DialogDescription>
              {editingMedia
                ? 'Update the media details below.'
                : 'Add a new video tutorial or media link.'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="space-y-4 pr-4">
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter media title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Type and URL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mediaTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                  <SelectItem key={type.value} value={type.value}>
                                    <div className="flex items-center gap-2">
                                      <Icon className={`w-4 h-4 ${type.color}`} />
                                      {type.label}
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://youtube.com/watch?v=..."
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Full URL to the video or media
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Thumbnail */}
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" />
                          Thumbnail URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/thumbnail.jpg"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Optional thumbnail image URL
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description of the media..."
                            className="resize-none"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Optional description for the media link
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
                            min={0}
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormDescription>
                          Higher numbers appear later. Auto-assigned if left empty.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Published */}
                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-muted/30">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Published</FormLabel>
                          <FormDescription>
                            Check to publish this media. Uncheck to save as draft.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </ScrollArea>

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
                      {editingMedia ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      {editingMedia ? 'Update Media' : 'Create Media'}
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
            <AlertDialogTitle>Delete Media</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{mediaToDelete?.title}&quot;? This
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
