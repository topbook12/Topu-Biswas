'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook,
  Link2,
  MessageCircle,
  Heart,
  Bookmark,
  Check
} from 'lucide-react';
import { blogPosts, getPostBySlug, getRelatedPosts } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailsPage({ params }: PageProps) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentMessage, setCommentMessage] = useState('');

  if (!post) {
    notFound();
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const relatedPosts = getRelatedPosts(slug, post.tags);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const handleShare = async (platform: string) => {
    const text = `Check out this article: ${post.title}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'copy':
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  // Simple markdown-like content rendering
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mt-8 mb-4 gradient-text">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3 text-foreground">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 text-foreground">{line.slice(4)}</h3>;
      }
      
      // Code blocks
      if (line.startsWith('```')) {
        return null; // Handle separately
      }
      
      // List items
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-muted-foreground ml-4 list-disc">
            {line.slice(2)}
          </li>
        );
      }
      
      // Bold text
      if (line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/);
        return (
          <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i} className="text-foreground font-semibold">{part}</strong> : part
            )}
          </p>
        );
      }
      
      // Regular paragraphs
      if (line.trim()) {
        return <p key={index} className="text-muted-foreground mb-4 leading-relaxed">{line}</p>;
      }
      
      return null;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <article className="container-custom">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link href="/blog">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text">{post.title}</span>
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-primary/30">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">{post.author.bio.slice(0, 40)}...</p>
                </div>
              </div>

              {/* Date and Read Time */}
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  {new Date(post.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-500" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Cover Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative aspect-video rounded-2xl overflow-hidden mb-12"
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              {/* Article Content */}
              <div className="glass rounded-2xl p-6 md:p-8 mb-8">
                <div className="prose prose-invert max-w-none">
                  {renderContent(post.content)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-4 mb-12">
                <div className="flex items-center gap-3">
                  <Button
                    variant={liked ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLiked(!liked)}
                    className={liked ? 'bg-pink-500 hover:bg-pink-600' : ''}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-white' : ''}`} />
                    {liked ? 'Liked' : 'Like'}
                  </Button>
                  <Button
                    variant={bookmarked ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setBookmarked(!bookmarked)}
                    className={bookmarked ? 'bg-primary hover:bg-primary/90' : ''}
                  >
                    <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? 'fill-white' : ''}`} />
                    {bookmarked ? 'Saved' : 'Save'}
                  </Button>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground mr-2 hidden sm:inline">Share:</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('twitter')}
                    className="text-muted-foreground hover:text-[#1DA1F2]"
                  >
                    <Twitter className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('linkedin')}
                    className="text-muted-foreground hover:text-[#0A66C2]"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('facebook')}
                    className="text-muted-foreground hover:text-[#1877F2]"
                  >
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('copy')}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Link2 className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              {/* Post Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row justify-between gap-4 mb-12"
              >
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`}>
                    <Button variant="outline" className="w-full sm:w-auto group">
                      <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                      <div className="text-left">
                        <p className="text-xs text-muted-foreground">Previous</p>
                        <p className="font-medium line-clamp-1">{prevPost.title}</p>
                      </div>
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}
                
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`}>
                    <Button variant="outline" className="w-full sm:w-auto group">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Next</p>
                        <p className="font-medium line-clamp-1">{nextPost.title}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}
              </motion.div>

              {/* Comments Section Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">Leave a Comment</h3>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your Name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="bg-muted/50 border-border/50 focus:border-primary/50"
                    />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      className="bg-muted/50 border-border/50 focus:border-primary/50"
                    />
                  </div>
                  <textarea
                    placeholder="Write your comment..."
                    value={commentMessage}
                    onChange={(e) => setCommentMessage(e.target.value)}
                    className="w-full h-32 p-4 rounded-xl bg-muted/50 border border-border/50 focus:border-primary/50 focus:outline-none resize-none text-foreground placeholder:text-muted-foreground"
                  />
                  <Button className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-white">
                    Post Comment
                  </Button>
                </div>

                {/* Existing Comments Placeholder */}
                <div className="mt-8 pt-8 border-t border-border/50">
                  <p className="text-muted-foreground text-center py-8">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 space-y-6">
                {/* Author Card */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4">About the Author</h3>
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-16 h-16 border-2 border-primary/30 mb-3">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-foreground mb-1">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground mb-4">{post.author.bio}</p>
                    <Button variant="outline" size="sm" className="rounded-full">
                      View Profile
                    </Button>
                  </div>
                </div>

                {/* Share Card */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Share2 className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Share Article</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('twitter')}
                      className="flex-1 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30"
                    >
                      <Twitter className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('linkedin')}
                      className="flex-1 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:border-[#0A66C2]/30"
                    >
                      <Linkedin className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('facebook')}
                      className="flex-1 hover:bg-[#1877F2]/10 hover:text-[#1877F2] hover:border-[#1877F2]/30"
                    >
                      <Facebook className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Tags Card */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-muted/50 border-border/50 hover:bg-primary/20 hover:border-primary/30 transition-colors duration-200 cursor-pointer"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">
                  <span className="gradient-text">Related Articles</span>
                </h2>
                <Link href="/blog">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <motion.article
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative rounded-2xl overflow-hidden glass card-hover h-full"
                    >
                      {/* Cover Image */}
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="relative p-5">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-2">
                          {relatedPost.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs bg-primary/10 text-primary border-primary/20"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                          {relatedPost.title}
                        </h3>

                        {/* Read More Link */}
                        <div className="flex items-center gap-2 text-sm font-medium text-purple-500 group-hover:text-cyan-400 transition-colors">
                          <span>Read Article</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
