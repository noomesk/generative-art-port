import React from 'react';
import { motion } from 'framer-motion';

export const Section = ({ id, title, description, children, className = "" }) => {
  // Entrada analoga: el titulo "revela" desde un desenfoque con leve desplazamiento
  const reveal = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      id={id}
      className={`py-24 border-b border-temporal-border relative ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6 sm:border-x border-temporal-border">
        <div className="max-w-4xl mb-16">
          <motion.h2
            variants={reveal}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="chrome-text text-4xl md:text-5xl font-prata tracking-tighter uppercase mb-6"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              variants={reveal}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
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
    </motion.section>
  );
};

