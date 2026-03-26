'use client';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
  FolderKanban,
  FileText,
  Video,
  Eye,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Stats data
const stats = [
  {
    title: 'Total Projects',
    value: '12',
    change: '+2',
    trend: 'up',
    icon: FolderKanban,
    color: 'from-primary to-secondary',
  },
  {
    title: 'Blog Posts',
    value: '9',
    change: '+3',
    trend: 'up',
    icon: FileText,
    color: 'from-secondary to-accent',
  },
  {
    title: 'Media Items',
    value: '24',
    change: '+5',
    trend: 'up',
    icon: Video,
    color: 'from-accent to-primary',
  },
  {
    title: 'Profile Views',
    value: '1,234',
    change: '-12%',
    trend: 'down',
    icon: Eye,
    color: 'from-green-500 to-cyan-500',
  },
];

const recentActivity = [
  { action: 'New project added', item: 'E-Commerce Platform', time: '2 hours ago' },
  { action: 'Blog post published', item: 'Next.js 15 Features', time: '5 hours ago' },
  { action: 'Media uploaded', item: 'React Tutorial Video', time: '1 day ago' },
  { action: 'Profile updated', item: 'Contact information', time: '2 days ago' },
  { action: 'New message', item: 'Contact form submission', time: '3 days ago' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AdminDashboardPage() {
  const { data: session } = useSession();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-border overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">
                  {session?.user?.name?.charAt(0) || 'T'}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Welcome back, {session?.user?.name?.split(' ')[0] || 'Admin'}!
                </h2>
                <p className="text-muted-foreground">
                  Here&apos;s what&apos;s happening with your portfolio today.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="glass border-border hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div
                      className={`flex items-center text-sm ${
                        stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="glass border-border h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/30 transition-colors"
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {activity.item}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants}>
          <Card className="glass border-border h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-secondary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <motion.a
                  href="/admin/projects/new"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-colors cursor-pointer"
                >
                  <FolderKanban className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">Add New Project</span>
                </motion.a>
                <motion.a
                  href="/admin/posts/new"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-secondary/10 to-accent/10 hover:from-secondary/20 hover:to-accent/20 transition-colors cursor-pointer"
                >
                  <FileText className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-medium text-foreground">Write New Post</span>
                </motion.a>
                <motion.a
                  href="/admin/media"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 hover:from-accent/20 hover:to-primary/20 transition-colors cursor-pointer"
                >
                  <Video className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-foreground">Upload Media</span>
                </motion.a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
