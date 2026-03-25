import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Cellular Automata Engine',
    description: 'A high-performance WebGL cellular automata simulator capable of rendering millions of cells in real time. Explore emergent behaviors through custom rule sets.',
    tags: ['WebGL', 'GLSL', 'TypeScript'],
    link: '#',
    focusCategories: ['cr', 'fs']
  },
  {
    title: 'Bioacoustic Soundscapes',
    description: 'A sound data processing tool that visualizes spectrograms and acoustic landscapes to analyze biodiversity through sound.',
    tags: ['React', 'Python', 'Audio Processing'],
    link: '#',
    focusCategories: ['cr', 'ai']
  },
  {
    title: 'Genome Cleaner',
    description: 'A high-efficiency processor for cleaning and formatting biological sequence strings in FASTA and FASTQ formats, streamlining bioinformatic workflows.',
    tags: ['Node.js', 'CLI', 'Bioinformatics'],
    link: '#',
    focusCategories: ['fs']
  },
  {
    title: 'AI Code Assistant',
    description: 'A custom, intelligent development tool designed to automate repetitive coding tasks and provide contextual suggestions that are aware of the entire codebase.',
    tags: ['LLM', 'OpenAI API', 'TypeScript'],
    link: '#',
    focusCategories: ['ai', 'fs']
  },
  {
    title: 'Interactive Fashion Gallery',
    description: 'A visual e-commerce platform where users explore styles, browse collections, and shop. Designed around visual experience and fluid navigation.',
    tags: ['React', 'Node.js', 'REST API', 'TypeScript'],
    link: '#',
    focusCategories: ['fs', 'cr']
  },
  {
    title: 'Anxiety Companion',
    description: 'An emotional support app designed to be used between therapy sessions. It combines an LLM-powered empathetic chatbot, automatic crisis detection, guided therapeutic exercises, and contextual user memory — all built on a FastAPI + React architecture ready to scale.',
    tags: ['FastAPI', 'React', 'SQLite', 'Groq API', 'JWT', 'TypeScript'],
    link: '#',
    focusCategories: ['ai', 'fs']
  }
];

const Projects = () => {
  const [sortedProjects, setSortedProjects] = useState(projects);
  const [activeFocus, setActiveFocus] = useState(null);

  useEffect(() => {
    // Read URL parameters on mount
    const params = new URLSearchParams(window.location.search);
    const focusParam = params.get('focus');
    
    if (focusParam) {
      const lowerFocus = focusParam.toLowerCase();
      // Mapeo amistoso para la Interfaz Gráfica
      const displayNames = {
        'cr': 'Creative',
        'fs': 'Fullstack',
        'ai': 'AI / AI Agent'
      };
      
      setActiveFocus(displayNames[lowerFocus] || lowerFocus);
      
      // Sort projects: prioritize those with the matching focus category
      const sorted = [...projects].sort((a, b) => {
        const aHasFocus = a.focusCategories?.includes(lowerFocus) ? 1 : 0;
        const bHasFocus = b.focusCategories?.includes(lowerFocus) ? 1 : 0;
        return bHasFocus - aHasFocus;
      });
      
      setSortedProjects(sorted);
    }
  }, []);

  return (
    <section id="projects" className="py-32 border-b border-temporal-border bg-temporal-bg">
      <div className="container mx-auto px-6 sm:border-x border-temporal-border h-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <h2 className="text-sm font-mono text-temporal-accent uppercase tracking-widest mb-4">
              02. Selected works
            </h2>
            <h3 className="text-4xl text-temporal-text font-medium tracking-tight">
              Projects & Interfaces
            </h3>
            {activeFocus && (
              <p className="text-temporal-muted mt-2 font-mono text-sm max-w-md">
                Auto-sorted for: <span className="text-temporal-accent border border-temporal-accent/30 px-2 py-0.5 rounded-full ml-1">#{activeFocus}</span>
              </p>
            )}
          </div>
          <a href="#" className="hidden md:inline-flex items-center text-temporal-muted hover:text-temporal-text font-mono text-sm transition-colors mt-4 md:mt-0">
            View all Github repositories <ArrowUpRight size={16} className="ml-2" />
          </a>
        </div>
        
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-temporal-border border border-temporal-border overflow-hidden">
          <AnimatePresence>
            {sortedProjects.map((project, index) => (
              <motion.div 
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.01, y: -5, zIndex: 20 }}
                className="bg-temporal-bg p-8 md:p-12 border border-transparent hover:border-temporal-accent/50 hover:shadow-[0_0_30px_rgba(51,255,153,0.1)] transition-all group cursor-pointer flex flex-col h-full relative z-10"
              >
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-2xl text-temporal-text font-medium group-hover:text-temporal-accent transition-colors">
                    {project.title}
                  </h4>
                  <div className="text-temporal-muted group-hover:text-temporal-accent transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
                
                <p className="text-temporal-muted text-base leading-relaxed mb-10 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-temporal-muted px-3 py-1 border border-temporal-border rounded-full group-hover:border-temporal-muted/50 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <a href="#" className="md:hidden inline-flex items-center text-temporal-accent mt-8 font-mono text-sm">
          View all Github repositories <ArrowUpRight size={16} className="ml-2" />
        </a>
      </div>
    </section>
  );
};

export default Projects;
