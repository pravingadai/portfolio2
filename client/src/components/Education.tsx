import { motion } from "framer-motion";
import { useInView } from "@/lib/useInView";
import { education } from "@/lib/data";

// Custom terminal-like text display component
const TerminalText = ({ children }: { children: React.ReactNode }) => (
  <div className="font-mono text-primary text-xs uppercase tracking-wider">
    <span className="opacity-70">&gt; </span>{children}
  </div>
);

export default function Education() {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <section id="education" className="cybr-section relative overflow-hidden">
      {/* Cyberpunk Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(5,219,186,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="cybr-container relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <TerminalText>KNOWLEDGE_REPOSITORY</TerminalText>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-wide mt-4 uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">
              Academic Records
            </span>
          </h2>
          <div className="w-20 h-1 bg-primary/50 mt-6"></div>
        </motion.div>
        
        <motion.div 
          className="space-y-12"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              className="grid md:grid-cols-5 gap-6 items-center"
              variants={itemVariants}
            >
              <div className="md:col-span-1">
                <div className="aspect-square w-full max-w-[150px] mx-auto border border-primary/40 bg-black/80 flex items-center justify-center p-4 relative shadow-[0_0_15px_rgba(5,219,186,0.3)]">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/70"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/70"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/70"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/70"></div>
                  
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary drop-shadow-[0_0_8px_rgba(5,219,186,0.7)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                  
                  {/* Scanning animation */}
                  <motion.div 
                    className="absolute left-0 right-0 h-0.5 bg-primary/30"
                    initial={{ y: 0 }}
                    animate={{ y: [0, 150, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                
                {/* Institution ID */}
                <div className="mt-2 text-center">
                  <TerminalText>EDU_MODULE::{index + 1}</TerminalText>
                </div>
              </div>
              
              <motion.div 
                className="md:col-span-4 tech-card border border-primary/30 p-6 relative"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 0 20px 0 rgba(5, 219, 186, 0.2)",
                  transition: { duration: 0.3 } 
                }}
              >
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary/70"></div>
                <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-primary/70"></div>
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-primary/70"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-primary/70"></div>
                
                {/* Title bar with status */}
                <div className="flex items-center mb-1">
                  <div className="w-2 h-2 bg-primary/80 mr-2"></div>
                  <TerminalText>CREDENTIAL_DATA</TerminalText>
                </div>
                
                <div className="flex flex-wrap justify-between items-start mb-6 mt-2">
                  <h3 className="text-xl md:text-2xl font-mono font-medium text-white">{edu.degree}</h3>
                  <div className="inline-flex cybr-btn-small py-1 text-xs">
                    {edu.period}
                  </div>
                </div>
                
                {/* Institution with marker */}
                <div className="mb-6 pb-4 border-b border-primary/20 flex items-center">
                  <div className="w-1 h-6 bg-primary/60 mr-3"></div>
                  <span className="text-lg text-primary/90 font-mono">{edu.institution}</span>
                </div>
                
                {/* Details */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Data displays */}
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-white/60 uppercase">Core Protocol</div>
                    <div className="text-sm font-mono text-white border border-primary/30 px-3 py-2 flex items-center">
                      <span className="w-1 h-1 bg-primary/80 mr-2"></span>
                      {edu.major}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-white/60 uppercase">Secondary Protocol</div>
                    <div className="text-sm font-mono text-white border border-primary/30 px-3 py-2 flex items-center">
                      <span className="w-1 h-1 bg-primary/80 mr-2"></span>
                      {edu.minor}
                    </div>
                  </div>
                  
                  <div className="space-y-1 col-span-2">
                    <div className="text-xs font-mono text-white/60 uppercase">Performance Index</div>
                    <div className="text-sm font-mono text-white border border-primary/30 px-3 py-2 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-1 h-1 bg-primary/80 mr-2"></span>
                        <span>CGPA</span>
                      </div>
                      <div className="text-primary font-bold">{edu.cgpa}</div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom decorative data */}
                <div className="mt-6 flex justify-between text-xs font-mono text-primary/60 pt-4 border-t border-primary/20">
                  <span>STATUS::VERIFIED</span>
                  <div className="flex items-center">
                    <span className="w-1 h-1 bg-primary/80 mr-2"></span>
                    <span>REF::{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
