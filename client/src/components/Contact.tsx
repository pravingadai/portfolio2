import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useInView } from "@/lib/useInView";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Custom terminal-like text display component
const TerminalText = ({ children }: { children: React.ReactNode }) => (
  <div className="font-mono text-primary text-xs uppercase tracking-wider">
    <span className="opacity-70">&gt; </span>{children}
  </div>
);

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Send the form data to our API endpoint
      const response = await apiRequest('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      // Check if the email was sent successfully
      if (response.success) {
        // Create toast notification with preview link for test emails
        const messageDelivered = "Your message has been delivered. Awaiting response.";
        const previewMessage = response.previewUrl ? 
          <div>
            {messageDelivered}
            <div className="mt-2">
              <a 
                href={response.previewUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                View test email
              </a>
            </div>
          </div> 
          : messageDelivered;
          
        toast({
          title: "Transmission successful!",
          description: previewMessage,
        });
        form.reset();
      } else {
        toast({
          title: "Transmission failed",
          description: response.error || "Unable to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "System error",
        description: "Communication failure. Please try an alternative channel.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
    <section id="contact" className="cybr-section relative overflow-hidden">
      {/* Cyberpunk Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(5,219,186,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="cybr-container relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <TerminalText>COMM_SYSTEM</TerminalText>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-wide mt-4 uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">
              Connect Interface
            </span>
          </h2>
          <div className="w-20 h-1 bg-primary/50 mt-6"></div>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-12"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Info Panel */}
          <motion.div 
            variants={itemVariants}
            className="tech-card border border-primary/30 p-8 relative"
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary/70"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-primary/70"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-primary/70"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-primary/70"></div>
            
            {/* Title with tech ID */}
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 bg-primary/80 mr-2"></div>
              <TerminalText>ACCESS_POINTS</TerminalText>
            </div>
            
            <h3 className="text-2xl font-mono font-medium text-white mb-8 mt-2">Communication Channels</h3>
            
            <div className="space-y-8">
              <div className="flex items-start group">
                <div className="w-12 h-12 border border-primary/40 bg-black/80 flex items-center justify-center mr-4 flex-shrink-0 group-hover:border-primary/70 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="text-lg font-mono text-white/90 mb-1">Email Node</h4>
                    <div className="ml-2 w-1.5 h-1.5 bg-primary animate-pulse rounded-full"></div>
                  </div>
                  <a 
                    href="mailto:pravingadai@hotmail.com" 
                    className="text-primary/80 hover:text-primary hover:underline font-mono text-sm transition-colors"
                  >
                    pravingadai@hotmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="w-12 h-12 border border-primary/40 bg-black/80 flex items-center justify-center mr-4 flex-shrink-0 group-hover:border-primary/70 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="text-lg font-mono text-white/90 mb-1">Direct Line</h4>
                    <div className="ml-2 w-1.5 h-1.5 bg-primary animate-pulse rounded-full"></div>
                  </div>
                  <a 
                    href="tel:+917218337502" 
                    className="text-primary/80 hover:text-primary hover:underline font-mono text-sm transition-colors"
                  >
                    +91 7218337502
                  </a>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="w-12 h-12 border border-primary/40 bg-black/80 flex items-center justify-center mr-4 flex-shrink-0 group-hover:border-primary/70 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="text-lg font-mono text-white/90 mb-1">Base Location</h4>
                    <div className="ml-2 w-1.5 h-1.5 bg-primary animate-pulse rounded-full"></div>
                  </div>
                  <p className="text-primary/80 font-mono text-sm">Pune, Maharashtra, India</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="w-12 h-12 border border-primary/40 bg-black/80 flex items-center justify-center mr-4 flex-shrink-0 group-hover:border-primary/70 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="text-lg font-mono text-white/90 mb-1">Network Links</h4>
                    <div className="ml-2 w-1.5 h-1.5 bg-primary animate-pulse rounded-full"></div>
                  </div>
                  <div className="flex space-x-4 mt-2">
                    <a 
                      href="https://linkedin.com/in/pravingadai" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-8 h-8 border border-primary/50 flex items-center justify-center 
                        text-primary hover:bg-primary/10 hover:text-white hover:border-primary
                        transition-all duration-300"
                      aria-label="LinkedIn"
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a 
                      href="https://github.com/pravingadai" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-8 h-8 border border-primary/50 flex items-center justify-center 
                        text-primary hover:bg-primary/10 hover:text-white hover:border-primary
                        transition-all duration-300"
                      aria-label="GitHub"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                    <a 
                      href="#" 
                      className="w-8 h-8 border border-primary/50 flex items-center justify-center 
                        text-primary hover:bg-primary/10 hover:text-white hover:border-primary
                        transition-all duration-300"
                      aria-label="Twitter"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* System status */}
            <div className="mt-10 pt-6 border-t border-primary/20 flex justify-between items-center text-xs font-mono">
              <span className="text-primary/70">CHANNELS::ONLINE</span>
              <div className="flex items-center">
                <div className="w-1 h-1 bg-primary/70 mr-1.5"></div>
                <span className="text-primary/60">PING_STATUS::ACTIVE</span>
              </div>
            </div>
          </motion.div>
          
          {/* Form Panel */}
          <motion.div 
            variants={itemVariants}
            className="tech-card border border-primary/30 p-8 relative"
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary/70"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-primary/70"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-primary/70"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-primary/70"></div>
            
            {/* Title with tech ID */}
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 bg-primary/80 mr-2"></div>
              <TerminalText>MSG_TRANSMISSION</TerminalText>
            </div>
            
            <h3 className="text-2xl font-mono font-medium text-white mb-8 mt-2">Send Transmission</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80 font-mono text-xs uppercase">Name Identifier</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your name" 
                          {...field} 
                          className="font-mono text-white bg-black/50 border-primary/30 focus:border-primary/60 
                            placeholder:text-white/30 focus:ring-1 focus:ring-primary/30"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80 font-mono text-xs uppercase">Communication Link</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your email" 
                          type="email" 
                          {...field} 
                          className="font-mono text-white bg-black/50 border-primary/30 focus:border-primary/60 
                            placeholder:text-white/30 focus:ring-1 focus:ring-primary/30"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80 font-mono text-xs uppercase">Transmission Topic</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter message subject" 
                          {...field} 
                          className="font-mono text-white bg-black/50 border-primary/30 focus:border-primary/60 
                            placeholder:text-white/30 focus:ring-1 focus:ring-primary/30"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80 font-mono text-xs uppercase">Data Payload</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your message" 
                          rows={5} 
                          {...field} 
                          className="font-mono text-white bg-black/50 border-primary/30 focus:border-primary/60 
                            placeholder:text-white/30 focus:ring-1 focus:ring-primary/30 resize-none"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="cybr-btn w-full justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}
                  </Button>
                </div>
              </form>
            </Form>
            
            {/* Form status indicator */}
            <div className="mt-6 flex items-center justify-end">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-1.5"></div>
              <span className="text-xs font-mono text-primary/70">TRANSMISSION_READY</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
