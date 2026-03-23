import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-32 border-b border-temporal-border bg-temporal-bg relative overflow-hidden">
      <div className="container mx-auto px-6 sm:border-x border-temporal-border h-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono text-temporal-accent uppercase tracking-widest sticky top-32">
              01 // Background
            </h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 font-sans"
          >
            <h3 className="text-3xl md:text-4xl text-temporal-text font-medium mb-8 leading-tight tracking-tight">
              Bridging the gap between rigid logic and organic expression.
            </h3>
            
            <div className="space-y-6 text-temporal-muted text-lg leading-relaxed max-w-3xl">
              <p>
                My journey into development didn't start with building standard web applications. It began with a fascination for how simple computational rules can generate infinitely complex and beautiful patterns.
              </p>
              <p>
                As a creative coder, I leverage technologies like P5.js, WebGL, Three.js, React, and raw mathematical algorithms to craft interactive experiences that blur the line between utility and art.
              </p>
              <p>
                I believe that well-architected software is intrinsically beautiful, and that aesthetic experiences can profoundly elevate the software we interact with daily. The minimalist approach reflects my deep appreciation for systems that are clean, transparent, and focused.
              </p>
            </div>
            
            <div className="mt-16 pt-16 border-t border-temporal-border">
              <h4 className="font-mono text-temporal-text mb-6">Core Stack & Tools</h4>
              <div className="flex flex-wrap gap-3 font-mono text-sm text-temporal-muted">
                {['React', 'Three.js', 'WebGL', 'GLSL', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'P5.js'].map(tech => (
                  <span key={tech} className="px-4 py-2 border border-temporal-border bg-temporal-bg hover:text-temporal-accent hover:border-temporal-accent transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
      
      {/* Decorative vertical line */}
      <div className="absolute top-0 bottom-0 left-[33%] w-px bg-temporal-border hidden md:block"></div>
    </section>
  );
};

export default About;
