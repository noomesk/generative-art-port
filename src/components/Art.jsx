import React from 'react';
import { Section } from './Section';
import { motion } from 'framer-motion';

const ArtSection = () => {
  return (
    <Section 
      id="art" 
      title="Generative Art" 
      description="Exploring the boundaries of digital growth, biological patterns, and algorithmic serendipity."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          whileHover={{ scale: 1.02, y: -5 }}
          className="aspect-square bg-temporal-bg border border-temporal-border flex items-center justify-center group overflow-hidden relative hover:border-temporal-accent/50 hover:shadow-[0_0_40px_rgba(51,255,153,0.15)] transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-temporal-accent/5 to-transparent group-hover:opacity-100 transition-opacity" />
          <span className="text-temporal-muted/30 font-mono text-xs uppercase tracking-widest group-hover:text-temporal-accent transition-colors">
            [ Piece 001 - Latent Growth ]
          </span>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02, y: -5 }}
          className="aspect-square bg-temporal-bg border border-temporal-border flex items-center justify-center group overflow-hidden relative hover:border-temporal-accent/50 hover:shadow-[0_0_40_rgba(51,255,153,0.15)] transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-temporal-accent/5 to-transparent group-hover:opacity-100 transition-opacity" />
          <span className="text-temporal-muted/30 font-mono text-xs uppercase tracking-widest group-hover:text-temporal-accent transition-colors">
            [ Piece 002 - Neural Flux ]
          </span>
        </motion.div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-temporal-muted font-mono text-sm uppercase tracking-widest animate-pulse">
          --- Gallery manifesting soon ---
        </p>
      </div>
    </Section>
  );
};

export default ArtSection;
