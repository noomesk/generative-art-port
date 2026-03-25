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
              Closing the gap between rigid logic and organic expression.
            </h3>
            
            <div className="space-y-6 text-temporal-muted text-lg leading-relaxed max-w-3xl">
              <p>
                My path into development didn't start with the tech boom or the desire to build standard apps. It started, from a very young age, with a genuine interest in how simple computational rules can generate infinitely complex and beautiful patterns. I find myself endlessly curious about how that world works — and why not apply it to art and creative expression?
              </p>
              <p>
                As a creative coder, I work with technologies like P5.js, WebGL, Three.js, and React, alongside raw mathematical algorithms and scientific material from my lab and my surroundings, to build interactive experiences that blur the line between utility and art. I think of myself as an explorer of complexity: I take difficult systems and make them creative.
              </p>
              <p>
                I believe well-designed software has something inherently compelling about it, and that aesthetic experiences can profoundly elevate the software we interact with every day. My approach is clean in structure, but alive in visuals — because what interests me isn't minimalism for its own sake, but the kind of clarity that lets complexity breathe.
              </p>
            </div>
            
            <div className="mt-16 pt-16 border-t border-temporal-border">
              <h4 className="font-mono text-temporal-text mb-6">Core stack & tools</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-mono text-temporal-accent uppercase tracking-widest mb-3">Visual & generative</p>
                  <div className="flex flex-wrap gap-2 text-sm text-temporal-muted">
                    {['React', 'Three.js', 'WebGL', 'GLSL', 'P5.js', 'Framer Motion'].map(tech => (
                      <span key={tech} className="px-3 py-1 border border-temporal-border bg-temporal-bg hover:text-temporal-accent hover:border-temporal-accent transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-mono text-temporal-accent uppercase tracking-widest mb-3">Development & architecture</p>
                  <div className="flex flex-wrap gap-2 text-sm text-temporal-muted">
                    {['TypeScript', 'Tailwind CSS', 'Node.js', 'REST APIs'].map(tech => (
                      <span key={tech} className="px-3 py-1 border border-temporal-border bg-temporal-bg hover:text-temporal-accent hover:border-temporal-accent transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-mono text-temporal-accent uppercase tracking-widest mb-3">AI & automation</p>
                  <div className="flex flex-wrap gap-2 text-sm text-temporal-muted">
                    {['LLMs', 'OpenAI API', 'autonomous agents'].map(tech => (
                      <span key={tech} className="px-3 py-1 border border-temporal-border bg-temporal-bg hover:text-temporal-accent hover:border-temporal-accent transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-mono text-temporal-accent uppercase tracking-widest mb-3">Science & data</p>
                  <div className="flex flex-wrap gap-2 text-sm text-temporal-muted">
                    {['Bioinformatics', 'audio processing', 'Python'].map(tech => (
                      <span key={tech} className="px-3 py-1 border border-temporal-border bg-temporal-bg hover:text-temporal-accent hover:border-temporal-accent transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-mono text-temporal-accent uppercase tracking-widest mb-3">Other areas</p>
                  <div className="flex flex-wrap gap-2 text-sm text-temporal-muted">
                    {['Cybersecurity (fundamentals)'].map(tech => (
                      <span key={tech} className="px-3 py-1 border border-temporal-border bg-temporal-bg hover:text-temporal-accent hover:border-temporal-accent transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
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
