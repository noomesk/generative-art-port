import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Cellular Automata Engine',
    description: 'A high-performance WebGL cellular automata simulator capable of rendering millions of cells in real-time. Explores emergent behaviors through customized rule sets.',
    tags: ['WebGL', 'GLSL', 'TypeScript'],
    link: '#'
  },
  {
    title: 'Bioacoustics Soundscapes',
    description: 'A sound data processing tool visualizing spectrograms and acoustic landscapes to analyze biodiversity via sound.',
    tags: ['React', 'Python', 'Audio Processing'],
    link: '#'
  },
  {
    title: 'Genome Cleaner',
    description: 'A high-efficiency processor for cleaning and formatting FASTA and FASTQ biological sequence strings, streamlining bioinformatics workflows.',
    tags: ['Node.js', 'CLI', 'Bioinformatics'],
    link: '#'
  },
  {
    title: 'AI Code Assistant',
    description: 'A custom, intelligent development tool designed to automate repetitive coding tasks and provide contextual, codebase-aware suggestions.',
    tags: ['LLMs', 'OpenAI API', 'TypeScript'],
    link: '#'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 border-b border-temporal-border bg-temporal-bg">
      <div className="container mx-auto px-6 sm:border-x border-temporal-border h-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <h2 className="text-sm font-mono text-temporal-accent uppercase tracking-widest mb-4">
              02 // Selected Works
            </h2>
            <h3 className="text-4xl text-temporal-text font-medium tracking-tight">
              Projects & Interfaces
            </h3>
          </div>
          <a href="#" className="hidden md:inline-flex items-center text-temporal-muted hover:text-temporal-text font-mono text-sm transition-colors mt-4 md:mt-0">
            View all Github repositories <ArrowUpRight size={16} className="ml-2" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-temporal-border border border-temporal-border">
          {projects.map((project, index) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-temporal-bg p-8 md:p-12 hover:bg-temporal-border/20 transition-colors group cursor-pointer flex flex-col h-full"
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
        </div>
        
        <a href="#" className="md:hidden inline-flex items-center text-temporal-accent mt-8 font-mono text-sm">
          View all Github repositories <ArrowUpRight size={16} className="ml-2" />
        </a>
      </div>
    </section>
  );
};

export default Projects;
