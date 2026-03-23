import React from 'react';
import { motion } from 'framer-motion';
import PerlinWarp from './PerlinWarp';

const Hero = () => {
  return (
    <section id="hero" className="relative flex flex-col justify-center min-h-[85vh] overflow-hidden border-b border-temporal-border pt-16">
      <div className="container mx-auto px-6 sm:border-x border-temporal-border flex-grow flex flex-col md:flex-row items-center relative z-10 gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 z-20"
        >
          <div className="font-mono text-temporal-accent mb-6 tracking-wide text-sm md:text-base uppercase">
            Creative Developer & Artist
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-mono tracking-tighter text-temporal-text mb-8 leading-[1.1]">
            I write the rules.<br />
            <span className="text-temporal-muted">The systems dream.</span>
          </h1>
          <p className="text-lg md:text-xl text-temporal-muted max-w-xl leading-relaxed mb-12">
            I'm <strong>Angie Plazas</strong>, a developer operating at the intriguing intersection of generative art, creative coding, and modern web engineering. Exploring digital aesthetics through mathematics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#projects" className="px-8 py-4 bg-temporal-text text-temporal-bg font-mono font-bold text-sm hover:bg-temporal-accent transition-colors text-center inline-block">
              View Projects
            </a>
            <a href="#contact" className="px-8 py-4 border border-temporal-border text-temporal-text font-mono text-sm hover:border-temporal-muted hover:text-white transition-colors text-center inline-block">
              Get in Touch
            </a>
          </div>
        </motion.div>

        {/* Generative Art Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-1/2 flex justify-center items-center z-20 -mt-8 md:-mt-24"
        >
          <PerlinWarp imgSrc="/p3.PNG" />
        </motion.div>
      </div>

      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-10 z-0 flex justify-end">
        <div className="w-[80vw] h-[80vw] bg-gradient-to-tr from-temporal-accent/20 to-transparent blur-[120px] transform translate-x-1/3 -translate-y-1/4 rounded-full" />
      </div>
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    </section>
  );
};

export default Hero;
