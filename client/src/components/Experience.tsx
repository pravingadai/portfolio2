import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import { experience } from "@/lib/data";

// Custom terminal-like text display component
const TerminalText = ({ children }: { children: React.ReactNode }) => (
  <div className="font-mono text-primary text-xs uppercase tracking-wider">
    <span className="opacity-70">&gt; </span>{children}
  </div>
);

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="experience" className="cybr-section relative overflow-hidden">
      {/* Cyberpunk Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(5,219,186,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="cybr-container relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-20 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <TerminalText>EXECUTION_HISTORY</TerminalText>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-wide mt-4 uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">
              Work Timeline
            </span>
          </h2>
          <div className="w-20 h-1 bg-primary/50 mt-6"></div>
        </motion.div>
        
        {/* Timeline container */}
        <motion.div 
          className="relative z-10 space-y-16 pl-0 sm:pl-10 md:pl-5"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Main timeline track */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/10 hidden sm:block"></div>

          {experience.map((job, index) => (
            <motion.div 
              key={index} 
              className="relative group"
              variants={itemVariants}
            >
              <motion.div 
                className="flex flex-col md:flex-row items-start gap-6 md:gap-10"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Timeline marker */}
                <div className="absolute -left-3 sm:left-2 top-3 flex items-center justify-center hidden sm:block z-10">
                  <motion.div 
                    className="w-10 h-10 border border-primary bg-black flex items-center justify-center 
                      shadow-[0_0_10px_rgba(5,219,186,0.3)] group-hover:scale-110"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-primary"
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </motion.svg>
                  </motion.div>
                  
                  {/* Light glow effect */}
                  <div className="absolute -inset-1 bg-primary opacity-0 group-hover:opacity-20 blur-sm transition-all duration-300"></div>
                </div>
                
                {/* Content card */}
                <motion.div
                  className="w-full tech-card border border-primary/30 overflow-hidden relative"
                  whileHover={{ y: -5, boxShadow: "0 0 20px 0 rgba(5, 219, 186, 0.2)" }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary/70"></div>
                  <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-primary/70"></div>
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-primary/70"></div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-primary/70"></div>
                  
                  {/* Data bars */}
                  <div className="absolute top-6 right-6 flex space-x-1">
                    <div className="w-3 h-6 bg-primary/20"></div>
                    <div className="w-3 h-6 bg-primary/30"></div>
                    <div className="w-3 h-6 bg-primary/40"></div>
                  </div>
                  
                  {/* Main content */}
                  <div className="p-7 md:p-8">
                    {/* Title with status */}
                    <div className="flex flex-col mb-6">
                      <div className="flex items-center mb-1">
                        <div className="w-2 h-2 bg-primary/80 mr-2"></div>
                        <TerminalText>JOB_ID::{index + 1}</TerminalText>
                      </div>
                      
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <h3 className="text-2xl md:text-3xl font-mono font-medium text-white">
                          {job.title}
                        </h3>
                        
                        <div className="inline-flex cybr-btn-small py-1">
                          {job.period}
                        </div>
                      </div>
                    </div>
                    
                    {/* Company name with tech decorations */}
                    <div className="mb-8 pb-4 border-b border-primary/20 flex items-center">
                      <div className="w-1 h-6 bg-primary/60 mr-3"></div>
                      <span className="text-lg text-primary/90 font-mono">{job.company}</span>
                    </div>
                    
                    {/* Responsibilities list */}
                    <ul className="space-y-5">
                      {job.responsibilities.map((responsibility, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i + 0.3, duration: 0.4 }}
                        >
                          <div className="flex-shrink-0 h-6 mt-1">
                            <span className="inline-flex items-center justify-center h-5 w-5 border border-primary/50">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          </div>
                          <span className="ml-3 text-white/80">
                            {responsibility}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    {/* System status */}
                    <div className="mt-8 pt-4 border-t border-primary/20 flex justify-between items-center text-xs font-mono">
                      <span className="text-primary/70">SYSTEM::VERIFIED</span>
                      <div className="flex items-center">
                        <div className="w-1 h-1 bg-primary/70 mr-1.5"></div>
                        <span className="text-primary/60">ACCESS_LEVEL::OMEGA</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Connection line to next item */}
              {index < experience.length - 1 && (
                <div className="absolute left-5 top-20 bottom-0 w-0.5 bg-gradient-to-b 
                  from-primary/50 to-primary/10 h-16 hidden sm:block"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
