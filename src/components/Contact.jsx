import React, { useRef } from "react";
import { useForm, ValidationError } from '@formspree/react';
import { Send, Star, Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "./Section";

// --- Custom "Temporal" UI Components ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-temporal-bg border border-temporal-border overflow-hidden rounded-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-8 pb-4 border-b border-temporal-border/50">
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-2xl font-mono font-bold tracking-tight text-temporal-text ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children }) => (
  <p className="text-sm text-temporal-muted mt-2 leading-relaxed">
    {children}
  </p>
);

const CardContent = ({ children }) => (
  <div className="p-8">
    {children}
  </div>
);

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="text-xs font-mono uppercase tracking-widest text-temporal-muted block mb-2">
    {children}
  </label>
);

const Input = ({ id, name, type = "text", placeholder, required }) => (
  <input
    id={id}
    name={name}
    type={type}
    placeholder={placeholder}
    required={required}
    className="w-full bg-temporal-bg border border-temporal-border p-3 text-sm focus:outline-none focus:border-temporal-accent transition-colors placeholder:text-temporal-muted/30"
  />
);

const Textarea = ({ id, name, placeholder, required, rows }) => (
  <textarea
    id={id}
    name={name}
    placeholder={placeholder}
    required={required}
    rows={rows}
    className="w-full bg-temporal-bg border border-temporal-border p-3 text-sm focus:outline-none focus:border-temporal-accent transition-colors placeholder:text-temporal-muted/30 resize-none"
  />
);

const Button = ({ children, onClick, type = "button", disabled, className = "" }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center px-6 py-4 font-mono font-bold text-sm tracking-widest transition-all ${
      disabled 
        ? "bg-temporal-border text-temporal-muted cursor-not-allowed" 
        : "bg-temporal-text text-temporal-bg hover:bg-temporal-accent active:scale-95"
    } ${className}`}
  >
    {children}
  </button>
);

// --- Marquee Text ---

const MarqueeText = () => {
    const items = [
        { text: "SYSTEMS DREAMING IN CODE", color: "text-temporal-text" },
        { text: "DO ANDROIDS DREAM OF ELECTRIC SHEEP?", color: "text-temporal-accent" },
        { text: "ALGORITHMIC SERENDIPITY", color: "text-temporal-text" },
        { text: "COMPLEXITY THAT BREATHES", color: "text-temporal-accent" }
    ];

    const Content = () => (
        <div className="flex items-center">
            {items.map((item, i) => (
                <React.Fragment key={i}>
                    <span className={`text-4xl md:text-5xl font-mono font-black mx-12 uppercase whitespace-nowrap tracking-tighter ${item.color}`}>
                        {item.text}
                    </span>
                    <span className="text-4xl md:text-5xl font-mono font-light text-temporal-muted/30">/</span>
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <div className="relative flex overflow-x-hidden border-y border-temporal-border py-8 mb-16 select-none pointer-events-none">
            {/* Framer Motion marquee for ultra-fluid, sub-pixel precision */}
            <motion.div 
                className="flex whitespace-nowrap"
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{
                    duration: 40, // Adjusted for full text cycle
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop"
                }}
            >
                <Content />
                <Content />
            </motion.div>
        </div>
    );
};

// --- Contact Section Component ---

export function ContactSection() {
  // Hook de Formspree con el ID proporcionado por el usuario
  const [state, handleSubmit] = useForm("xqagrrgr");

  if (state.succeeded) {
      return (
        <Section
          id="contact"
          title="Connection Synchronized"
          description="Your message has permeated the system. I will respond to your signal shortly."
          className="min-h-[60vh] flex items-center"
        >
          <div className="max-w-xl mx-auto text-center">
             <div className="flex justify-center mb-8">
               <CheckCircle className="h-20 w-20 text-temporal-accent animate-pulse" />
             </div>
             <Button onClick={() => window.location.reload()} className="mx-auto">
               Transmit Another Signal
             </Button>
          </div>
        </Section>
      );
  }

  return (
    <Section
      id="contact"
      title="Start a connection"
      description="Whether you have a latent project in mind, want to discuss the intersection of art and code, or simply feel like exploring complex and stimulating ideas — your message starts here."
    >
      <MarqueeText />
      
      <div className="max-w-xl mx-auto relative group">
        <motion.div 
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative z-10"
        >
          <Card className="transition-all duration-300 group-hover:shadow-[0_0_50_px_rgba(51,255,153,0.15)] group-hover:border-temporal-accent/50">
            <CardHeader>
            <CardTitle className="uppercase tracking-tighter">Query Terminal</CardTitle>
            <CardDescription>
              Fill in the fields below to send a secure transmission.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" placeholder="Agent Name" required />
                <ValidationError 
                  prefix="Name" 
                  field="name"
                  errors={state.errors}
                  className="text-xs text-red-400 mt-1 font-mono"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" name="email" type="email" placeholder="contact@domain.com" required />
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                  className="text-xs text-red-400 mt-1 font-mono"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Describe your vision..." required rows={5} />
                <ValidationError 
                  prefix="Message" 
                  field="message"
                  errors={state.errors}
                  className="text-xs text-red-400 mt-1 font-mono"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={state.submitting} 
                className="w-full mt-4"
              >
                {state.submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Transmitting...
                  </>
                ) : (
                  <>
                    Send signal
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  </Section>
);
}

export default ContactSection;
