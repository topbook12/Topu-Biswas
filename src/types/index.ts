// Portfolio Types

export interface Profile {
  id: string;
  name: string;
  title: string;
  heroSubtitle?: string;
  bioShort?: string;
  bioLong?: string;
  location?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  availability?: string;
  profileImage?: string;
  resumeUrl?: string;
  heroImage?: string;
  tagline?: string;
  yearsExperience?: number;
  projectsCount?: number;
  clientsCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'design' | 'devops' | 'other';
  level: number;
  icon?: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Service {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  fullDescription?: string;
  thumbnail?: string;
  gallery?: string[];
  tags?: string[];
  category?: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  status: 'completed' | 'in-progress';
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  tags?: string[];
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MediaLink {
  id: string;
  title: string;
  type: 'youtube' | 'vimeo' | 'facebook' | 'instagram' | 'tiktok' | 'link';
  url: string;
  thumbnail?: string;
  description?: string;
  order: number;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon?: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FileItem {
  id: string;
  title: string;
  fileUrl: string;
  type: string;
  category?: string;
  description?: string;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message?: string;
  isRead: boolean;
  createdAt?: Date;
}

export interface Setting {
  id: string;
  key: string;
  value?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Form Types
export interface ProfileFormData {
  name: string;
  title: string;
  heroSubtitle?: string;
  bioShort?: string;
  bioLong?: string;
  location?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  availability?: string;
  profileImage?: string;
  resumeUrl?: string;
  heroImage?: string;
  tagline?: string;
  yearsExperience?: number;
  projectsCount?: number;
  clientsCount?: number;
}

export interface SkillFormData {
  name: string;
  category: string;
  level: number;
  icon?: string;
  order: number;
}

export interface ServiceFormData {
  title: string;
  description?: string;
  icon?: string;
  order: number;
}

export interface ProjectFormData {
  title: string;
  slug: string;
  shortDescription?: string;
  fullDescription?: string;
  thumbnail?: string;
  gallery?: string;
  tags?: string;
  category?: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  status: string;
  published: boolean;
}

export interface PostFormData {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  tags?: string;
  published: boolean;
}

export interface MediaLinkFormData {
  title: string;
  type: string;
  url: string;
  thumbnail?: string;
  description?: string;
  order: number;
  published: boolean;
}

export interface SocialLinkFormData {
  platform: string;
  url: string;
  icon?: string;
  order: number;
}

export interface FileItemFormData {
  title: string;
  fileUrl: string;
  type: string;
  category?: string;
  description?: string;
  published: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Dashboard Stats
export interface DashboardStats {
  projects: number;
  posts: number;
  skills: number;
  services: number;
  mediaLinks: number;
  socialLinks: number;
  files: number;
  messages: number;
}
