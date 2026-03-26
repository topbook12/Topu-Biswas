'use client';

import { motion } from 'framer-motion';
import { 
  FileText, 
  FileCode, 
  FileSpreadsheet, 
  FileImage, 
  FileArchive,
  Download,
  ExternalLink,
  LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileCardProps {
  title: string;
  description: string;
  type: 'resume' | 'document' | 'resource' | 'code' | 'image' | 'archive';
  size?: string;
  downloadUrl?: string;
  index?: number;
  featured?: boolean;
}

const fileTypeConfig: Record<string, { icon: LucideIcon; color: string; bgColor: string }> = {
  resume: {
    icon: FileText,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
  },
  document: {
    icon: FileText,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
  },
  resource: {
    icon: FileSpreadsheet,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
  },
  code: {
    icon: FileCode,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20',
  },
  image: {
    icon: FileImage,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20',
  },
  archive: {
    icon: FileArchive,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
  },
};

export default function FileCard({
  title,
  description,
  type,
  size,
  downloadUrl = '#',
  index = 0,
  featured = false,
}: FileCardProps) {
  const config = fileTypeConfig[type];
  const FileIcon = config.icon;

  const handleDownload = () => {
    if (downloadUrl && downloadUrl !== '#') {
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`group relative rounded-xl overflow-hidden glass card-hover ${
        featured ? 'ring-2 ring-purple-500/30' : ''
      }`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-1 rounded-md bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs font-medium">
            Featured
          </span>
        </div>
      )}

      <div className="p-6">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl ${config.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <FileIcon className={`w-7 h-7 ${config.color}`} />
        </div>

        {/* Content */}
        <h3 className="font-semibold text-foreground group-hover:text-purple-400 transition-colors mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {size && (
            <span className="text-xs text-muted-foreground">
              {size}
            </span>
          )}
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-auto"
          >
            <Button
              onClick={handleDownload}
              size="sm"
              className="gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 border-0"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Gradient border on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-purple-500/5" />
      </div>
    </motion.div>
  );
}
