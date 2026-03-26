'use client';

import { motion } from 'framer-motion';
import { Play, Youtube, Video, Facebook } from 'lucide-react';
import Image from 'next/image';

interface MediaCardProps {
  title: string;
  thumbnail: string;
  platform?: 'youtube' | 'vimeo' | 'facebook' | 'other';
  duration?: string;
  views?: string;
  url?: string;
  index?: number;
  onPlay?: () => void;
}

const platformConfig = {
  youtube: {
    icon: Youtube,
    label: 'YouTube',
    bgColor: 'bg-red-600/90',
  },
  vimeo: {
    icon: Video,
    label: 'Vimeo',
    bgColor: 'bg-sky-500/90',
  },
  facebook: {
    icon: Facebook,
    label: 'Facebook',
    bgColor: 'bg-blue-600/90',
  },
  other: {
    icon: Video,
    label: 'Video',
    bgColor: 'bg-purple-600/90',
  },
};

export default function MediaCard({
  title,
  thumbnail,
  platform = 'youtube',
  duration,
  views,
  url,
  index = 0,
  onPlay,
}: MediaCardProps) {
  const config = platformConfig[platform];
  const PlatformIcon = config.icon;

  const handleClick = () => {
    if (onPlay) {
      onPlay();
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={handleClick}
      className="group relative rounded-xl overflow-hidden glass card-hover cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Play Button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </div>
        </motion.div>

        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/70 text-white text-xs font-medium">
            {duration}
          </div>
        )}

        {/* Platform Badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-md ${config.bgColor} text-white text-xs font-medium`}>
          <PlatformIcon className="w-3.5 h-3.5" />
          {config.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-purple-400 transition-colors mb-2">
          {title}
        </h3>
        
        {views && (
          <p className="text-sm text-muted-foreground">
            {views} views
          </p>
        )}
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-purple-500/5" />
      </div>
    </motion.div>
  );
}

export { MediaCard };
