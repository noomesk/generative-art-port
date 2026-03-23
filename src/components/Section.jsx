import React from 'react';
import { motion } from 'framer-motion';

export const Section = ({ id, title, description, children, className = "" }) => {
  return (
    <section id={id} className={`py-24 border-b border-temporal-border relative ${className}`}>
      <div className="container mx-auto px-6 sm:border-x border-temporal-border">
        <div className="max-w-4xl mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-mono font-bold tracking-tighter uppercase mb-6"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-temporal-muted leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>
        <div>
          {children}
        </div>
      </div>
      
      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-temporal-border opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-temporal-border opacity-20 pointer-events-none" />
    </section>
  );
};
