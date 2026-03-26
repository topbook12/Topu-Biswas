'use client';

import { motion } from 'framer-motion';
import { Code, Server, Palette, Database, Cloud, MessageSquare } from 'lucide-react';
import ServiceCard from '@/components/ui/ServiceCard';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Building modern, responsive web applications using cutting-edge technologies like React, Next.js, and TypeScript. Focused on performance and user experience.',
  },
  {
    icon: Server,
    title: 'API Development',
    description: 'Designing and implementing robust RESTful and GraphQL APIs. Creating scalable backend services with Node.js, Express, and modern database solutions.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Crafting intuitive and visually stunning user interfaces. Creating seamless user experiences with attention to detail and modern design principles.',
  },
  {
    icon: Database,
    title: 'Database Design',
    description: 'Architecting efficient database schemas and optimizing queries. Expertise in both SQL and NoSQL databases for optimal data management.',
  },
  {
    icon: Cloud,
    title: 'DevOps',
    description: 'Implementing CI/CD pipelines, containerization with Docker, and cloud deployment strategies. Ensuring reliable and scalable infrastructure.',
  },
  {
    icon: MessageSquare,
    title: 'Consulting',
    description: 'Providing technical consultation and strategic guidance. Helping businesses make informed decisions about technology stack and architecture.',
  },
];

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

export default function ServicesSection() {
  return (
    <section className="relative section-padding overflow-hidden" id="services">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-600/10 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyan-600/10 rounded-full filter blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full filter blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">Services</span>
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">What I </span>
            <span className="gradient-text">Do</span>
          </h2>

          {/* Subtitle */}
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            I offer a comprehensive range of services to help bring your ideas to life
            with modern technologies and best practices.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
        />
      </div>
    </section>
  );
}
