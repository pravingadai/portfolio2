import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("home");
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.getAttribute('id') as string;
        
        if (sectionTop < 100) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="relative min-h-screen bg-black text-foreground overflow-hidden">
      {/* Background elements - static grid */}
      <div className="fixed inset-0 z-0 bg-[#050505] bg-opacity-95 pointer-events-none">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(5,219,186,0.03)_0%,transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_90%,rgba(5,219,186,0.03)_0%,transparent_40%)]"></div>
        
        {/* Cyberpunk grid lines - vertical */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={`v-${i}`} 
              className="absolute top-0 bottom-0 border-r border-primary/10"
              style={{ left: `${i * 5}%` }}
            />
          ))}
          
          {/* Horizontal lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={`h-${i}`} 
              className="absolute left-0 right-0 border-b border-primary/10"
              style={{ top: `${i * 5}%` }}
            />
          ))}
        </motion.div>
        
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1/3 h-1/3 bg-primary/3 rounded-full blur-3xl"></div>
      </div>
      
      {/* Fixed elements for ambiance - don't adjust with scroll */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        {/* Distant tech nodes (small glowing dots) */}
        <div className="absolute top-[10%] left-[5%] h-1 w-1 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-[20%] left-[50%] h-1 w-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[80%] left-[80%] h-1 w-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[65%] left-[15%] h-1 w-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-[30%] left-[85%] h-1 w-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Content layer */}
      <div className="relative z-10">
        <Header activeSection={activeSection} />
        <main>
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
