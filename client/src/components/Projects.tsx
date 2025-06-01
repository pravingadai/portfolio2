import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import { projects } from "@/lib/data";

// Custom terminal-like text display component
const TerminalText = ({ children }: { children: React.ReactNode }) => (
  <div className="font-mono text-primary text-xs uppercase tracking-wider">
    <span className="opacity-70">&gt; </span>{children}
  </div>
);

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 70 }
    }
  };
  
  return (
    <section id="projects" className="cybr-section relative overflow-hidden">
      {/* Cyberpunk Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(5,219,186,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      
      <div className="absolute inset-0">
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="cybr-container relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-20 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <TerminalText>PROJECT_DIRECTORY</TerminalText>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-wide mt-4 uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">
              Featured Projects
            </span>
          </h2>
          <div className="w-20 h-1 bg-primary/50 mt-6"></div>
          
          <p className="text-white/60 max-w-2xl mx-auto text-center mt-8 font-mono">
            A collection of innovative solutions demonstrating technical expertise and creative problem-solving
          </p>
        </motion.div>
        
        {/* Projects grid */}
        <motion.div 
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="tech-card border border-primary/30 h-full flex flex-col relative group"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 0 25px 0 rgba(5, 219, 186, 0.3)",
                transition: { duration: 0.4 }
              }}
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/70"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/70"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/70"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/70"></div>
              
              {/* Project image/icon area */}
              <div className="relative h-52 overflow-hidden border-b border-primary/30">
                {/* Data readouts */}
                <div className="absolute top-0 right-0 z-10 py-1.5 px-3 border-l border-b border-primary/40 bg-black/50 font-mono text-[9px] text-primary/80 uppercase">
                  SYS::{project.tag}
                </div>
                
                {/* Project backdrop */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/70 to-black"></div>
                
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(5,219,186,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(5,219,186,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
                
                {/* Project icon with tech effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="relative"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-20 w-20 text-primary drop-shadow-[0_0_8px_rgba(5,219,186,0.7)]" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1} 
                        d={project.iconPath} 
                      />
                    </svg>
                  </motion.div>
                </div>
                
                {/* Scan line effect */}
                <motion.div 
                  className="absolute left-0 right-0 h-0.5 bg-primary/30 z-20"
                  initial={{ y: 0 }}
                  animate={{ y: [0, 200, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              {/* Content area */}
              <div className="p-6 flex-grow flex flex-col">
                {/* Title with tech ID */}
                <div className="flex items-center mb-1">
                  <div className="w-2 h-2 bg-primary/80 mr-2"></div>
                  <TerminalText>PROJECT::{index + 1}</TerminalText>
                </div>
                
                <h3 className="text-xl font-mono font-medium text-white mb-4 mt-1">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-white/70 mb-6 leading-relaxed text-sm flex-grow font-mono">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="text-xs border border-primary/30 px-2.5 py-1 
                          text-primary/80 inline-flex items-center"
                      >
                        <span className="w-1 h-1 bg-primary/70 mr-1.5"></span>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* View details button */}
                <motion.a 
                  href="#" 
                  className="cybr-btn-small"
                  onClick={(e) => e.preventDefault()}
                  whileTap={{ scale: 0.98 }}
                >
                  ACCESS PROJECT
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* "More projects" button */}
        <div className="mt-16 text-center">
          <motion.a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="cybr-btn inline-flex items-center"
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            VIEW ALL PROJECTS
          </motion.a>
        </div>
      </div>
    </section>
  );
}
