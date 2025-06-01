import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
    };
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80; // Header height offset
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "HOME:://" },
    { id: "experience", label: "EXPERIENCE:://" },
    { id: "projects", label: "PROJECTS:://" },
    { id: "skills", label: "SKILLS:://" },
    { id: "education", label: "EDUCATION:://" },
    { id: "contact", label: "CONTACT:://" }
  ];
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 cybr-transition ${
        isScrolled 
          ? "crt-effect border-b border-primary/30 shadow-[0_4px_20px_-10px_rgba(5,219,186,0.5)]" 
          : "bg-transparent"
      }`}
    >
      {/* Top data strip */}
      <div className="h-5 bg-black border-b border-primary/40 hidden md:block overflow-hidden">
        <div className="cybr-container flex justify-between items-center h-full">
          <div className="flex space-x-4 text-[10px] text-primary/70 font-mono uppercase">
            <span className="animate-pulse">SYS::ACTIVE</span>
            <span>MEM::98.3%</span>
            <span>CPU::42.1%</span>
          </div>
          <div className="flex space-x-4 text-[10px] text-primary/70 font-mono">
            <span>{currentTime}</span>
            <span className="text-primary">SECURITY::ENABLED</span>
          </div>
        </div>
      </div>
      
      <div className="cybr-container">
        <div className="flex justify-between items-center h-20">
          {/* Logo with cyber-themed styling */}
          <motion.a 
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className="flex items-center group relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Cyber-themed logo */}
            <div className="relative">
              <div className="w-10 h-10 bg-black flex items-center justify-center 
                text-primary font-display font-bold text-lg neon-border pixel-border
                group-hover:text-white group-hover:bg-primary/10 cybr-transition">
                PG
              </div>
            </div>
            
            <div className="ml-4">
              <div className="flex flex-col">
                <span className="font-display font-bold text-base text-white tracking-wider">
                  <span className="text-primary inline-block transform group-hover:translate-x-1 cybr-transition">PRAVIN</span>{' '}
                  <span className="text-white/90 inline-block transform group-hover:translate-x-1 cybr-transition" style={{ transitionDelay: '50ms' }}>GADAI</span>
                </span>
                <span className="text-[10px] text-primary/70 font-mono tracking-widest">FULL_STACK::DEVELOPER</span>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-2 left-0 right-0 h-px bg-primary/30"></div>
            <div className="absolute -bottom-2 left-0 w-3/4 h-px bg-primary/80"></div>
          </motion.a>
          
          {/* Mobile menu button */}
          <motion.button 
            className="md:hidden flex items-center justify-center w-10 h-10
              bg-black/80 border border-primary/50 text-primary
              hover:bg-primary/10 hover:text-white cybr-transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </motion.button>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {navItems.map((item, index) => (
                <motion.a 
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`
                    relative px-3 py-1 mx-1 text-xs font-mono font-medium uppercase cybr-transition
                    ${activeSection === item.id 
                      ? "text-primary border-b-2 border-primary" 
                      : "text-white/60 hover:text-primary hover:border-b-2 hover:border-primary/30"
                    }
                  `}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.1 * index,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  {item.label}
                  
                  {activeSection === item.id && (
                    <motion.div 
                      className="absolute -left-1 -right-1 bottom-0 h-px bg-primary"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
              
              {/* Call-to-action button */}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="cybr-btn cybr-btn-small ml-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>CONNECT</span>
              </motion.a>
            </motion.div>
          </nav>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden crt-effect border-t border-primary/30"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`flex items-center px-3 py-2 font-mono text-xs uppercase
                    ${activeSection === item.id 
                      ? "text-primary border border-primary/50 bg-black/80" 
                      : "text-white/70 border border-transparent hover:border-primary/30 hover:text-primary"
                    }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <span className="mr-2">{index + 1}.</span>
                  {item.label}
                  
                  {activeSection === item.id && (
                    <span className="ml-auto text-primary animate-pulse">active</span>
                  )}
                </motion.a>
              ))}
              
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="cybr-btn cybr-btn-small flex w-full justify-center mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                INITIALIZE CONTACT
              </motion.a>
              
              {/* Tech data for aesthetics */}
              <div className="mt-4 pt-3 border-t border-primary/30 font-mono text-[10px] text-primary/60">
                <p>STATUS: ONLINE</p>
                <p>SYS: NIGHT.OS v2.8.4</p>
                <p>UPTIME: {Math.floor(Math.random() * 1000) + 100} DAYS</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
