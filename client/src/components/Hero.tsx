import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import profileImage from "../assets/IMG_2817.jpeg";

// Simplified binary rain background
const BinaryRain = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSIxMCIgeT0iMjAiIGZpbGw9IiMwNWRiYjgiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiPjA8L3RleHQ+PHRleHQgeD0iMzAiIHk9IjQwIiBmaWxsPSIjMDVkYmI4IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIj4xPC90ZXh0Pjx0ZXh0IHg9IjUwIiB5PSI2MCIgZmlsbD0iIzA1ZGJiOCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSI+MDwvdGV4dD48dGV4dCB4PSI3MCIgeT0iODAiIGZpbGw9IiMwNWRiYjgiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiPjE8L3RleHQ+PC9zdmc+')]"></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      
      {/* Animated scan lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div 
            key={i}
            className="absolute left-0 right-0 h-[1px] bg-primary/20"
            initial={{ y: -10 }}
            animate={{ y: [0, 1000] }}
            transition={{ 
              duration: 8 + i * 0.5, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 1.2
            }}
            style={{ top: `${i * 10}%` }}
          />
        ))}
      </div>
    </div>
  );
};

// Terminal text component - simplified version to avoid re-render issues
const TypewriterText = ({ text, delay = 30, className = "" }: { text: string, delay?: number, className?: string }) => {
  // For short text, we'll just display it without animation to improve performance
  if (delay > 80 || text.length < 5) {
    return (
      <span className={`terminal-text ${className}`}>
        {text}
      </span>
    );
  }
  
  // For longer text, use our simplified typewriter animation
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let currentIndex = 0;
    let displayText = "";
    
    // Reset when text changes
    setDisplayedText("");
    
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        displayText += text[currentIndex];
        setDisplayedText(displayText);
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, delay);
    
    return () => clearInterval(timer);
  }, [text, delay]);
  
  return (
    <span className={`terminal-text ${className}`}>
      {displayedText}
    </span>
  );
};

// Main Hero component
export default function Hero() {
  const [showHackedEffect, setShowHackedEffect] = useState(false);
  
  // Hacked effect sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHackedEffect(true);
      
      const timer2 = setTimeout(() => {
        setShowHackedEffect(false);
      }, 1500);
      
      return () => clearTimeout(timer2);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section id="home" className="cybr-section pt-28 pb-20 md:pt-36 md:pb-32 relative overflow-hidden">
      {/* Background effects */}
      <BinaryRain />
      
      {/* Glitched background overlay */}
      {showHackedEffect && (
        <motion.div 
          className="absolute inset-0 bg-red-500/10 z-20 pointer-events-none"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.5 }}
        />
      )}
      
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Cyberpunk Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(5,219,186,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      
      <div className="cybr-container relative z-10">
        <div className="grid md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-16 items-center">
          <motion.div 
            className="order-2 md:order-1 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Status indicator */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center px-3 py-1 mb-8 border border-primary/40 
                bg-black/70 text-xs font-mono text-primary tracking-wider"
            >
              <span className="inline-block w-2 h-2 bg-primary animate-pulse mr-2"></span>
              <TypewriterText text="SYSTEMS ONLINE" delay={100} />
            </motion.div>
            
            {/* Main heading with glitch effect */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-wide mb-2 uppercase">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <span>INIT::</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="mt-1"
                >
                  <span 
                    className="glitch-text relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-white" 
                    data-text="PRAVIN GADAI"
                  >
                    PRAVIN GADAI
                  </span>
                </motion.div>
              </h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1 }}
              >
                <div className="flex items-center mt-5">
                  <div className="w-12 h-px bg-primary/80"></div>
                  <h2 className="text-lg md:text-xl font-mono text-primary tracking-widest ml-4 uppercase">
                    Full Stack Developer
                  </h2>
                </div>
              </motion.div>
            </div>
            
            {/* Description with terminal-style text */}
            <motion.div 
              className="code-block mb-8 border border-primary/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.4 }}
            >
              <TypewriterText 
                text="Specializing in MERN stack development with focus on creating secure, innovative solutions for real-world problems. Passionate about building clean, efficient applications with modern tech."
                className="text-white/80"
              />
            </motion.div>
            
            {/* Action buttons with cyberpunk styling */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.8 }}
            >
              <motion.a 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    const yOffset = -80;
                    const y = contactSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className="cybr-btn cybr-btn-large"
                whileTap={{ scale: 0.98 }}
              >
                INITIALIZE CONTACT
              </motion.a>
              
              <motion.a 
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    const yOffset = -80;
                    const y = projectsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className="cybr-btn cybr-btn-large"
                style={{ 
                  backgroundColor: 'transparent', 
                  borderColor: 'rgba(5, 219, 186, 0.4)' 
                }}
                whileTap={{ scale: 0.98 }}
              >
                VIEW PROJECTS
              </motion.a>
            </motion.div>
            
            {/* Social links with cyberpunk styling */}
            <motion.div 
              className="mt-10 border-t border-primary/30 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 2 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-primary"></div>
                <span className="text-xs font-mono text-primary/70 uppercase">Connect:://</span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {[
                  { href: "mailto:pravingadai@hotmail.com", icon: "fa-envelope", label: "Email" },
                  { href: "https://linkedin.com/in/pravingadai", icon: "fa-linkedin", label: "LinkedIn" },
                  { href: "https://github.com/pravingadai", icon: "fa-github", label: "GitHub" },
                  { href: "tel:+917218337502", icon: "fa-phone", label: "Phone" }
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="w-10 h-10 border border-primary/50 flex items-center justify-center 
                      text-primary hover:bg-primary/10 hover:text-white hover:border-primary
                      transition-all duration-300"
                    aria-label={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 2.1 + index * 0.1 }}
                    whileHover={{ y: -4, boxShadow: "0 4px 12px rgba(5, 219, 186, 0.3)" }}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <i className={`fas ${item.icon}`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Image area with cyberpunk styling */}
          <motion.div 
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative max-w-sm">
              {/* Tech frame around image */}
              <div className="relative">
                {/* Top tech details */}
                <div className="absolute -top-4 left-0 right-0 h-4 flex items-center px-4 py-0.5 bg-black border-x border-t border-primary/40">
                  <div className="w-2 h-2 bg-primary mr-2"></div>
                  <div className="text-[8px] font-mono text-primary/70 uppercase tracking-widest">ID::PG-001</div>
                  <div className="ml-auto text-[8px] font-mono text-primary/70">SYS_VER::2.8.4</div>
                </div>
                
                {/* Corner decorations */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-primary/70"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-primary/70"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-primary/70"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-primary/70"></div>
                
                {/* Main image container */}
                <div className="border border-primary/60 bg-black/80 p-1 relative overflow-hidden crt-effect">
                  {/* Scan effect */}
                  <div className="absolute inset-0 pointer-events-none z-20"></div>
                  
                  {/* Image cropping frame */}
                  <div className="relative overflow-hidden">
                    {/* Actual image */}
                    <img 
                      src={profileImage} 
                      alt="Pravin Gadai" 
                      className="w-full aspect-square object-cover object-center grayscale"
                    />
                    
                    {/* Data overlay */}
                    <div className="absolute top-0 right-0 px-2 py-1 bg-black border-l border-b border-primary/40 flex items-center">
                      <div className="w-2 h-2 bg-primary/70 animate-pulse mr-2"></div>
                      <div className="text-[9px] font-mono text-primary/80">LIVE</div>
                    </div>
                    
                    {/* Fixed data points */}
                    <motion.div 
                      className="absolute flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      style={{ left: '15%', top: '20%' }}
                    >
                      <div className="w-1 h-1 bg-primary/80 mr-1"></div>
                      <div className="w-1 h-1 bg-primary/80 mr-2"></div>
                      <div className="text-[8px] font-mono text-primary/90">
                        DATA_PT::357
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="absolute flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.7 }}
                      style={{ left: '40%', top: '35%' }}
                    >
                      <div className="w-1 h-1 bg-primary/80 mr-1"></div>
                      <div className="w-1 h-1 bg-primary/80 mr-2"></div>
                      <div className="text-[8px] font-mono text-primary/90">
                        DATA_PT::841
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="absolute flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.9 }}
                      style={{ left: '25%', top: '70%' }}
                    >
                      <div className="w-1 h-1 bg-primary/80 mr-1"></div>
                      <div className="w-1 h-1 bg-primary/80 mr-2"></div>
                      <div className="text-[8px] font-mono text-primary/90">
                        DATA_PT::429
                      </div>
                    </motion.div>
                    
                    {/* Targeting overlay elements */}
                    <svg className="absolute top-20 left-20 w-16 h-16 text-primary/30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" strokeDasharray="8 4" />
                      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" />
                      <path d="M50 2V20M50 80V98M2 50H20M80 50H98" stroke="currentColor" strokeWidth="1" />
                    </svg>
                    
                    {/* Pixelated scan line */}
                    <motion.div 
                      className="absolute left-0 right-0 h-[2px] bg-primary/30"
                      initial={{ y: -10 }}
                      animate={{ y: [0, 500, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    ></motion.div>
                  </div>
                </div>
                
                {/* Bottom tech details */}
                <div className="absolute -bottom-4 left-0 right-0 h-4 flex items-center px-4 py-0.5 bg-black border-x border-b border-primary/40">
                  <div className="text-[8px] font-mono text-primary/70 uppercase tracking-widest">STATUS::ACTIVE</div>
                  <div className="ml-auto flex items-center">
                    <div className="w-1 h-1 bg-primary/70 mr-1"></div>
                    <div className="w-1 h-1 bg-primary/40 mr-1"></div>
                    <div className="w-1 h-1 bg-primary/20 mr-2"></div>
                    <div className="text-[8px] font-mono text-primary/70">SCAN_COMPLETE</div>
                  </div>
                </div>
              </div>
              
              {/* Tech specs */}
              <div className="mt-8 py-3 px-4 border border-primary/30 bg-black/70">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs font-mono text-primary/70 uppercase">Profile Data</div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary/70" style={{ opacity: 0.5 }}></div>
                    <div className="w-2 h-2 bg-primary/70" style={{ opacity: 0.7 }}></div>
                    <div className="w-2 h-2 bg-primary/70" style={{ opacity: 0.9 }}></div>
                  </div>
                </div>
                
                <div className="space-y-2 text-[11px] font-mono">
                  <div className="flex justify-between">
                    <span className="text-white/60">SKILL_LEVEL</span>
                    <span className="text-primary">EXPERT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">SPECIALIZATION</span>
                    <span className="text-primary">FULL_STACK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">SYSTEM</span>
                    <TypewriterText text="MERN_STACK v2.4.1" className="text-primary" delay={50} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
