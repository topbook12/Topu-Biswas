'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2,
  Database,
  Wrench,
  Palette,
  FileCode2,
  FileType,
  Server,
  Container,
  GitBranch,
  Figma,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SkillCard from '@/components/ui/SkillCard';

// Skill data with icons and proficiency
const skillsData = {
  frontend: [
    { name: 'React', proficiency: 95, icon: <Code2 className="w-5 h-5" /> },
    { name: 'Next.js', proficiency: 90, icon: <FileCode2 className="w-5 h-5" /> },
    { name: 'TypeScript', proficiency: 92, icon: <FileType className="w-5 h-5" /> },
    { name: 'Tailwind CSS', proficiency: 88, icon: <Palette className="w-5 h-5" /> },
  ],
  backend: [
    { name: 'Node.js', proficiency: 88, icon: <Server className="w-5 h-5" /> },
    { name: 'MongoDB', proficiency: 85, icon: <Database className="w-5 h-5" /> },
    { name: 'PostgreSQL', proficiency: 82, icon: <Database className="w-5 h-5" /> },
  ],
  tools: [
    { name: 'Git', proficiency: 90, icon: <GitBranch className="w-5 h-5" /> },
    { name: 'Docker', proficiency: 78, icon: <Container className="w-5 h-5" /> },
  ],
  design: [
    { name: 'Figma', proficiency: 85, icon: <Figma className="w-5 h-5" /> },
  ],
};

// Category configuration
const categories = [
  {
    id: 'all',
    label: 'All Skills',
    icon: <Code2 className="w-4 h-4" />,
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: <Code2 className="w-4 h-4" />,
    count: skillsData.frontend.length,
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: <Server className="w-4 h-4" />,
    count: skillsData.backend.length,
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: <Wrench className="w-4 h-4" />,
    count: skillsData.tools.length,
  },
  {
    id: 'design',
    label: 'Design',
    icon: <Palette className="w-4 h-4" />,
    count: skillsData.design.length,
  },
];

// Get all skills flattened
const allSkills = [
  ...skillsData.frontend.map((s) => ({ ...s, category: 'frontend' as const })),
  ...skillsData.backend.map((s) => ({ ...s, category: 'backend' as const })),
  ...skillsData.tools.map((s) => ({ ...s, category: 'tools' as const })),
  ...skillsData.design.map((s) => ({ ...s, category: 'design' as const })),
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter skills based on active category
  const filteredSkills =
    activeCategory === 'all'
      ? allSkills
      : allSkills.filter((skill) => skill.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative section-padding overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/10 rounded-full filter blur-[120px] translate-x-1/2" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-[120px]" />

      <div className="container-custom relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge
            variant="outline"
            className="px-4 py-1.5 text-sm border-cyan-500/30 text-cyan-400 mb-4"
          >
            Technical Expertise
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">My </span>
            <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setActiveCategory}
          >
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent p-0 border-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium
                    border transition-all duration-300
                    data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600
                    data-[state=active]:border-transparent
                    data-[state=active]:text-white
                    data-[state=inactive]:bg-transparent
                    data-[state=inactive]:border-white/10
                    data-[state=inactive]:text-muted-foreground
                    data-[state=inactive]:hover:border-white/30
                    data-[state=inactive]:hover:text-foreground
                    flex items-center gap-2
                  `}
                >
                  {category.icon}
                  <span>{category.label}</span>
                  {category.count !== undefined && (
                    <span className="hidden sm:inline-flex ml-1 px-2 py-0.5 text-xs rounded-full bg-white/10">
                      {category.count}
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard
              key={`${skill.category}-${skill.name}`}
              name={skill.name}
              proficiency={skill.proficiency}
              icon={skill.icon}
              category={skill.category}
              index={index}
              inView={isInView}
            />
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full glass-light border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              <span className="text-sm text-muted-foreground">Frontend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
              <span className="text-sm text-muted-foreground">Backend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
              <span className="text-sm text-muted-foreground">Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500" />
              <span className="text-sm text-muted-foreground">Design</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
