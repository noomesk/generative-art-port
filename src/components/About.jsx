import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HollowMetaballs from './HollowMetaballs';
import { useTranslation } from '../i18n/LanguageContext';

const About = () => {
  const { t } = useTranslation();
  const [expandedCreative, setExpandedCreative] = useState(false);
  
  return (
    <section id="about" className="py-32 border-b border-temporal-border bg-temporal-bg relative overflow-hidden">
      <div className="container mx-auto px-6 sm:border-x border-temporal-border h-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-4 relative min-h-[300px] flex">
            <div className="w-full flex-grow relative">
              <HollowMetaballs />
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 font-sans flex flex-col justify-center"
          >
            <h2 className="text-sm font-mono text-temporal-accent uppercase tracking-widest mb-6">
              {t('about.title')}
            </h2>
            <h3 className="text-3xl md:text-4xl text-temporal-text font-medium mb-8 leading-tight tracking-tight">
              {t('about.heading')}
            </h3>
            
            <div className="space-y-6 text-temporal-muted text-lg leading-relaxed max-w-3xl">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              
              {/* Living code system description - similar to seed description */}
              <div className="mt-8 pt-6">
                <button
                  onClick={() => setExpandedCreative(!expandedCreative)}
                  className="group cursor-pointer inline-flex items-baseline gap-1 mb-4 hover:text-temporal-text transition-colors"
                >
                  <span className="text-xs font-mono text-temporal-muted/50 uppercase tracking-widest group-hover:text-temporal-muted transition-colors">
                    {expandedCreative ? '[−]' : '[+]'} {t('about.creativeLens')}
                  </span>
                </button>
                
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: expandedCreative ? 1 : 0,
                    height: expandedCreative ? 'auto' : 0,
                    marginTop: expandedCreative ? 12 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-temporal-muted/40 font-mono text-left max-w-2xl pointer-events-none">
                    {t('about.p3')}<br />
                    <span className="opacity-60 text-[9px] md:text-[10px]">{t('about.p3Meta')}</span>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="mt-16 pt-16 border-t border-temporal-border">
              <h4 className="font-mono text-temporal-text mb-6">{t('about.coreStack')}</h4>
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
                    {['TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'REST APIs', 'Web Components (Lit)'].map(tech => (
                      <span key={tech} className="px-3 py-1 border border-temporal-border bg-temporal-bg hover:text-temporal-accent hover:border-temporal-accent transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-mono text-temporal-accent uppercase tracking-widest mb-3">AI & automation</p>
                  <div className="flex flex-wrap gap-2 text-sm text-temporal-muted">
                    {['LLMs', 'Groq API', 'Vercel AI SDK', 'Autonomous Agents', 'Tool Calling', 'RAG', 'Prompt Engineering'].map(tech => (
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
