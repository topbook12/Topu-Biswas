'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import SocialCard from '@/components/ui/SocialCard';

// Social media links data
const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/topubiswas',
    username: '@topubiswas',
    color: '#333333',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/topubiswas',
    username: '@topubiswas',
    color: '#0A66C2',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com/topubiswas',
    username: '@topubiswas',
    color: '#1DA1F2',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://facebook.com/topubiswas',
    username: '@topubiswas',
    color: '#1877F2',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/topubiswas',
    username: '@topubiswas',
    color: '#E4405F',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://youtube.com/@topubiswas',
    username: '@topubiswas',
    color: '#FF0000',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function SocialLinksSection() {
  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/5 via-transparent to-cyan-600/5 rounded-full filter blur-[80px]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.span
            variants={titleVariants}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4"
          >
            Connect
          </motion.span>
          <motion.h2
            variants={titleVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Connect With <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto"
          >
            Let&apos;s connect and stay in touch! Follow me on social media for updates, tips, and more.
          </motion.p>
        </motion.div>

        {/* Social Links Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {socialLinks.map((social, index) => (
            <SocialCard
              key={social.name}
              name={social.name}
              icon={social.icon}
              url={social.url}
              username={social.username}
              color={social.color}
              index={index}
            />
          ))}
        </motion.div>

        {/* Additional CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-muted-foreground">
            Have a project in mind?{' '}
            <a href="#contact" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
              Let&apos;s work together
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
