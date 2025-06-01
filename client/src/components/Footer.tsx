import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Phone } from "lucide-react";

// Custom terminal-like text display component
const TerminalText = ({ children }: { children: React.ReactNode }) => (
  <div className="font-mono text-primary text-xs uppercase tracking-wider">
    <span className="opacity-70">&gt; </span>{children}
  </div>
);

export default function Footer() {
  return (
    <footer className="relative border-t border-primary/30 overflow-hidden">
      {/* Cyberpunk Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(5,219,186,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30"></div>
      
      {/* Glow effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="cybr-container relative z-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left column */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Title and descriptor */}
            <div className="space-y-1">
              <TerminalText>SYSTEM_IDENTITY</TerminalText>
              <h2 className="text-2xl font-mono text-white mt-2">
                <span className="text-primary">[</span> Pravin Gadai <span className="text-primary">]</span>
              </h2>
              <p className="font-mono text-white/70 text-sm mt-2 flex items-center">
                <span className="inline-block w-3 h-0.5 bg-primary/70 mr-2"></span>
                FULL STACK DEVELOPER
              </p>
            </div>
            
            {/* System stats */}
            <div className="border border-primary/30 p-4 space-y-3 bg-black/30">
              <TerminalText>SYSTEM_STATS</TerminalText>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs text-white/80 mt-2">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>CPU</span>
                    <span className="text-primary">100%</span>
                  </div>
                  <div className="h-1 bg-primary/20 w-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut" 
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>GPU</span>
                    <span className="text-primary">95%</span>
                  </div>
                  <div className="h-1 bg-primary/20 w-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: "95%" }}
                      transition={{ 
                        duration: 3.5, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut" 
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>MEMORY</span>
                    <span className="text-primary">87%</span>
                  </div>
                  <div className="h-1 bg-primary/20 w-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: "87%" }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut" 
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>UPTIME</span>
                    <span className="text-primary">{new Date().getFullYear() - 2015}Y</span>
                  </div>
                  <div className="h-1 bg-primary/20 w-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear" 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column */}
          <motion.div 
            className="space-y-10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Connect grid */}
            <div className="space-y-4">
              <TerminalText>CONNECTION_NODES</TerminalText>
              
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="mailto:pravingadai@hotmail.com"
                  className="cybr-link-card group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="font-mono text-sm">
                      <div className="text-white">EMAIL</div>
                      <div className="text-primary/70 text-xs group-hover:text-primary transition-colors">pravingadai@hotmail.com</div>
                    </div>
                  </div>
                </a>
                
                <a 
                  href="https://linkedin.com/in/pravingadai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cybr-link-card group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <Linkedin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="font-mono text-sm">
                      <div className="text-white">LINKEDIN</div>
                      <div className="text-primary/70 text-xs group-hover:text-primary transition-colors">pravingadai</div>
                    </div>
                  </div>
                </a>
                
                <a 
                  href="https://github.com/pravingadai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cybr-link-card group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <Github className="h-5 w-5 text-primary" />
                    </div>
                    <div className="font-mono text-sm">
                      <div className="text-white">GITHUB</div>
                      <div className="text-primary/70 text-xs group-hover:text-primary transition-colors">pravingadai</div>
                    </div>
                  </div>
                </a>
                
                <a 
                  href="tel:+917218337502"
                  className="cybr-link-card group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div className="font-mono text-sm">
                      <div className="text-white">PHONE</div>
                      <div className="text-primary/70 text-xs group-hover:text-primary transition-colors">+91 7218337502</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Footer bar */}
        <motion.div 
          className="mt-12 pt-6 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mb-4 md:mb-0 flex items-center font-mono text-xs text-white/60">
            <div className="w-2 h-2 bg-primary/80 mr-2 animate-pulse"></div>
            <span>&copy; {new Date().getFullYear()} PRAVIN GADAI // ALL_RIGHTS_RESERVED</span>
          </div>
          
          <div className="flex space-x-6 font-mono text-xs">
            <a href="#" className="text-white/60 hover:text-primary transition-colors">PRIVACY_POLICY</a>
            <a href="#" className="text-white/60 hover:text-primary transition-colors">TERMS_OF_SERVICE</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
