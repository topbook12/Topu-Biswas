import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import BlogSection from "@/components/sections/BlogSection";
import MediaSection from "@/components/sections/MediaSection";
import SocialLinksSection from "@/components/sections/SocialLinksSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with 3D Graphics */}
        <HeroSection />
        
        {/* About Me Section */}
        <AboutSection />
        
        {/* Skills Section */}
        <SkillsSection />
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* Featured Projects Section */}
        <ProjectsSection />
        
        {/* Blog Section */}
        <BlogSection />
        
        {/* Video Tutorials / Media Section */}
        <MediaSection />
        
        {/* Social Links Hub */}
        <SocialLinksSection />
        
        {/* Contact Section */}
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
