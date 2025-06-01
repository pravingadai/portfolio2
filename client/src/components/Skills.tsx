import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import { skillCategories, certifications } from "@/lib/data";

// Custom terminal-like text display component
const TerminalText = ({ children }: { children: React.ReactNode }) => (
  <div className="font-mono text-primary text-xs uppercase tracking-wider">
    <span className="opacity-70">&gt; </span>{children}
  </div>
);

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    if (inView && !animated) {
      setAnimated(true);
    }
  }, [inView, animated]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="cybr-section relative overflow-hidden" ref={ref}>
      {/* Cyberpunk Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(5,219,186,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="cybr-container relative z-10">
        <motion.div 
          className="mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TerminalText>SKILL_SET_ANALYSIS</TerminalText>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-wide mt-4 uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">
              Technical Specs
            </span>
          </h2>
          <div className="w-20 h-1 bg-primary/50 mt-6"></div>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="tech-card border border-primary/30 p-6 relative"
              variants={itemVariants}
            >
              {/* Top decorative bar */}
              <div className="absolute -top-px left-4 right-4 h-px bg-primary/60"></div>
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 border border-primary/40 bg-black/40 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.iconPath} />
                  </svg>
                </div>
                <div>
                  <TerminalText>{`MODULE_${index + 1}`}</TerminalText>
                  <h3 className="text-xl font-mono font-medium text-white">{category.name}</h3>
                </div>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <div key={i} className="relative">
                    <div className="flex justify-between mb-1 items-center">
                      <span className="text-sm font-mono text-white/90">{skill.name}</span>
                      <div className="flex items-center">
                        <div className="w-1 h-1 bg-primary/70 mr-1"></div>
                        <span className="text-xs font-mono text-primary">{skill.level}%</span>
                      </div>
                    </div>
                    <div className="h-1 bg-black/40 border border-primary/20 overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: animated ? `${skill.level}%` : 0 }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                    </div>
                    {/* Data points */}
                    <div className="absolute -right-1 top-1/2 w-1 h-1 bg-primary/60"></div>
                    <div className="absolute -left-1 top-1/2 w-1 h-1 bg-primary/60"></div>
                  </div>
                ))}
              </div>
              
              {/* Bottom decorative bar */}
              <div className="absolute -bottom-px left-4 right-4 h-px bg-primary/60"></div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Certifications */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="mb-12 flex flex-col items-center">
            <TerminalText>VERIFICATION_CREDENTIALS</TerminalText>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-wide mt-3 uppercase">
              <span className="text-primary">Certifications</span>
            </h3>
            <div className="w-16 h-px bg-primary/50 mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div 
                key={index}
                className="tech-card border border-primary/30 p-5 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                whileHover={{ 
                  boxShadow: "0 0 15px 0 rgba(5, 219, 186, 0.3)",
                  borderColor: "rgba(5, 219, 186, 0.6)"
                }}
              >
                {/* Corner decorations */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/50"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/50"></div>
                
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 border border-primary/40 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-mono text-white/90">{cert.name}</h4>
                </div>
                
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-primary/20">
                  <span className="text-xs font-mono text-primary/80">{cert.issuer}</span>
                  <div className="flex items-center text-xs font-mono text-primary/70">
                    <div className="w-1 h-1 bg-primary/70 mr-1"></div>
                    <span>{cert.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
