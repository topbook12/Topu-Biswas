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
  FileText,
  FileCode,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  File,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  Download,
  ExternalLink,
  X,
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
import { LucideIcon } from 'lucide-react';

// Zod schema for file validation
const fileSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  fileUrl: z.string().url('Must be a valid URL'),
  type: z.enum(['pdf', 'docx', 'xlsx', 'pptx', 'zip', 'image', 'other']),
  category: z.enum(['Resume', 'Documents', 'Resources', '']).optional(),
  description: z.string().optional(),
  published: z.boolean().default(true),
});

type FileFormValues = z.infer<typeof fileSchema>;

interface FileItem {
  id: string;
  title: string;
  fileUrl: string;
  type: string;
  category: string | null;
  description: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// File type configurations
const fileTypeConfig: Record<string, { icon: LucideIcon; color: string; bgColor: string }> = {
  pdf: {
    icon: FileText,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
  },
  docx: {
    icon: FileText,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
  },
  xlsx: {
    icon: FileSpreadsheet,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
  },
  pptx: {
    icon: FileText,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
  },
  zip: {
    icon: FileArchive,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
  },
  image: {
    icon: FileImage,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20',
  },
  other: {
    icon: File,
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
  },
};

// Category colors
const categoryColors: Record<string, string> = {
  Resume: 'bg-purple-500/20 text-purple-300',
  Documents: 'bg-blue-500/20 text-blue-300',
  Resources: 'bg-green-500/20 text-green-300',
};

// Helper function to format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function FilesPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFile, setEditingFile] = useState<FileItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<FileItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const form = useForm<FileFormValues>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      title: '',
      fileUrl: '',
      type: 'pdf',
      category: '',
      description: '',
      published: true,
    },
  });

  // Fetch files
  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter !== 'all') {
        params.set('category', categoryFilter);
      }
      if (typeFilter !== 'all') {
        params.set('type', typeFilter);
      }

      const res = await fetch(`/api/files?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setFiles(data);
      }
    } catch (error) {
      console.error('Failed to fetch files:', error);
      toast.error('Failed to load files');
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, typeFilter]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // Open dialog for creating new file
  const openCreateDialog = () => {
    setEditingFile(null);
    form.reset({
      title: '',
      fileUrl: '',
      type: 'pdf',
      category: '',
      description: '',
      published: true,
    });
    setIsDialogOpen(true);
  };

  // Open dialog for editing file
  const openEditDialog = (file: FileItem) => {
    setEditingFile(file);
    form.reset({
      title: file.title,
      fileUrl: file.fileUrl,
      type: file.type as FileFormValues['type'],
      category: (file.category || '') as FileFormValues['category'],
      description: file.description || '',
      published: file.published,
    });
    setIsDialogOpen(true);
  };

  // Handle form submission
  const onSubmit = async (data: FileFormValues) => {
    setSaving(true);
    try {
      const payload = {
        ...data,
        category: data.category || null,
        description: data.description || null,
      };

      if (editingFile) {
        // Update existing file
        const res = await fetch(`/api/files/${editingFile.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          toast.success('File updated successfully!');
          setIsDialogOpen(false);
          fetchFiles();
        } else {
          const error = await res.json();
          throw new Error(error.error || 'Failed to update file');
        }
      } else {
        // Create new file
        const res = await fetch('/api/files', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          toast.success('File created successfully!');
          setIsDialogOpen(false);
          fetchFiles();
        } else {
          const error = await res.json();
          throw new Error(error.error || 'Failed to create file');
        }
      }
    } catch (error) {
      console.error('Failed to save file:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save file');
    } finally {
      setSaving(false);
    }
  };

  // Handle delete file
  const handleDelete = async () => {
    if (!fileToDelete) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/files/${fileToDelete.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('File deleted successfully!');
        setDeleteDialogOpen(false);
        setFileToDelete(null);
        fetchFiles();
      } else {
        throw new Error('Failed to delete file');
      }
    } catch (error) {
      console.error('Failed to delete file:', error);
      toast.error('Failed to delete file');
    } finally {
      setDeleting(false);
    }
  };

  // Toggle published status
  const togglePublished = async (file: FileItem) => {
    try {
      const res = await fetch(`/api/files/${file.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !file.published }),
      });

      if (res.ok) {
        toast.success(
          file.published ? 'File unpublished!' : 'File published!'
        );
        fetchFiles();
      }
    } catch (error) {
      console.error('Failed to toggle published:', error);
      toast.error('Failed to update file status');
    }
  };

  // Open file URL
  const openFileUrl = (url: string) => {
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
            <span className="gradient-text">Files & Documents</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your downloadable files and documents
          </p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New File
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
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Category:</span>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Resume">Resume</SelectItem>
                    <SelectItem value="Documents">Documents</SelectItem>
                    <SelectItem value="Resources">Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Type:</span>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="docx">DOCX</SelectItem>
                    <SelectItem value="xlsx">XLSX</SelectItem>
                    <SelectItem value="pptx">PPTX</SelectItem>
                    <SelectItem value="zip">ZIP</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              {(categoryFilter !== 'all' || typeFilter !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCategoryFilter('all');
                    setTypeFilter('all');
                  }}
                  className="text-muted-foreground"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Files Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              All Files ({files.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : files.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <File className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No files found</h3>
                <p className="text-muted-foreground mt-1">
                  {categoryFilter !== 'all' || typeFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Get started by adding your first file'}
                </p>
                {categoryFilter === 'all' && typeFilter === 'all' && (
                  <Button
                    onClick={openCreateDialog}
                    className="mt-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add First File
                  </Button>
                )}
              </div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">Icon</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="w-[100px]">Type</TableHead>
                      <TableHead className="w-[120px]">Category</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="w-[120px]">Date</TableHead>
                      <TableHead className="w-[140px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {files.map((file, index) => {
                      const config = fileTypeConfig[file.type] || fileTypeConfig.other;
                      const FileIcon = config.icon;
                      return (
                        <motion.tr
                          key={file.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-muted/50 border-b transition-colors"
                        >
                          <TableCell>
                            <div className={`w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                              <FileIcon className={`w-5 h-5 ${config.color}`} />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              <p className="font-medium truncate">{file.title}</p>
                              {file.description && (
                                <p className="text-sm text-muted-foreground truncate">
                                  {file.description}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="uppercase text-xs">
                              {file.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {file.category ? (
                              <Badge className={categoryColors[file.category] || 'bg-gray-500/20'}>
                                {file.category}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground text-sm">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={file.published ? 'default' : 'secondary'}
                              className={
                                file.published
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-yellow-500/20 text-yellow-400'
                              }
                            >
                              {file.published ? 'Published' : 'Draft'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(file.createdAt)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openFileUrl(file.fileUrl)}
                                title="Open file"
                              >
                                <ExternalLink className="w-4 h-4 text-cyan-400" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => togglePublished(file)}
                                title={file.published ? 'Unpublish' : 'Publish'}
                              >
                                {file.published ? (
                                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                  <Eye className="w-4 h-4 text-green-400" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditDialog(file)}
                              >
                                <Edit className="w-4 h-4 text-purple-400" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setFileToDelete(file);
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
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {editingFile ? 'Edit File' : 'Add New File'}
            </DialogTitle>
            <DialogDescription>
              {editingFile
                ? 'Update the file details below.'
                : 'Fill in the details to add a new file or document.'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter file title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* File URL */}
              <FormField
                control={form.control}
                name="fileUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      File URL *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/file.pdf"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the URL where the file is hosted
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type and Category */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>File Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="docx">DOCX</SelectItem>
                          <SelectItem value="xlsx">XLSX</SelectItem>
                          <SelectItem value="pptx">PPTX</SelectItem>
                          <SelectItem value="zip">ZIP</SelectItem>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="None" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          <SelectItem value="Resume">Resume</SelectItem>
                          <SelectItem value="Documents">Documents</SelectItem>
                          <SelectItem value="Resources">Resources</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of the file..."
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
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
                        Check to make this file visible on the public site.
                      </FormDescription>
                    </div>
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
                      {editingFile ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      {editingFile ? 'Update File' : 'Add File'}
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
            <AlertDialogTitle>Delete File</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{fileToDelete?.title}&quot;? This
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
