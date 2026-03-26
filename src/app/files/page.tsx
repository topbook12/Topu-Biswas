'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { fileItems, FileType } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Download, 
  FileText, 
  FileCode, 
  FileArchive, 
  Presentation, 
  FileSpreadsheet,
  ExternalLink,
  Calendar,
  HardDrive
} from 'lucide-react';

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return <FileText className="w-8 h-8 text-red-400" />;
    case 'docx':
      return <FileText className="w-8 h-8 text-blue-400" />;
    case 'pptx':
      return <Presentation className="w-8 h-8 text-orange-400" />;
    case 'xlsx':
      return <FileSpreadsheet className="w-8 h-8 text-green-400" />;
    case 'zip':
      return <FileArchive className="w-8 h-8 text-purple-400" />;
    default:
      return <FileCode className="w-8 h-8 text-cyan-400" />;
  }
};

const categoryColors: Record<string, string> = {
  'Resume': 'from-green-500 to-emerald-500',
  'Documents': 'from-blue-500 to-cyan-500',
  'Resources': 'from-purple-500 to-pink-500',
};

export default function FilesPage() {
  const resumeFile = fileItems.find(f => f.category === 'Resume');
  const otherFiles = fileItems.filter(f => f.category !== 'Resume');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <Download className="w-3 h-3 mr-1" />
              Downloads & Resources
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Files & Documents</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Download my resume, presentation slides, and other useful resources.
            </p>
          </motion.div>

          {/* Resume Section - Prominent */}
          {resumeFile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12"
            >
              <Card className="glass border-primary/30 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 pointer-events-none" />
                <CardContent className="p-8 relative">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <FileText className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-2xl font-bold mb-2">{resumeFile.title}</h2>
                      <p className="text-muted-foreground mb-4">{resumeFile.description}</p>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <HardDrive className="w-4 h-4" />
                          {resumeFile.size}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(resumeFile.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      asChild
                    >
                      <a href={resumeFile.fileUrl} download>
                        <Download className="w-4 h-4 mr-2" />
                        Download Resume
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Other Files */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {otherFiles.map((file: FileType, index: number) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="glass card-hover h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`bg-gradient-to-r ${categoryColors[file.category] || 'from-gray-500 to-gray-600'} text-white border-0`}
                      >
                        {file.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{file.title}</CardTitle>
                    <CardDescription>{file.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <HardDrive className="w-4 h-4" />
                        {file.size}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(file.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-primary/30 hover:bg-primary/10"
                      asChild
                    >
                      <a href={file.fileUrl} download>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
