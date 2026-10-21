import React from 'react';
import { motion } from 'framer-motion';
import PerlinWarpGL from './PerlinWarpGL';
import { useTranslation } from '../i18n/LanguageContext';

const DreamPhrase = ({ text }) => {
  const letters = text.split('');
  
  // Randomize fall characteristics for each letter
  const letterProps = letters.map((_, idx) => {
    const randomFall = Math.random() * 12 - 6; // -6 to 6 for random drift
    const randomRot = Math.random() * 20 - 10; // -10 to 10 degrees
    const randomDelay = Math.random() * 0.6; // 0 to 0.6s random delay
    
    return {
      fallX: randomFall,
      fallRot: randomRot,
      delay: randomDelay
    };
  });

  return (
    <div className="relative flex items-center justify-center min-h-12">
      {/* Smoke appearance phase - main text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="font-mono text-[14px] md:text-[18px] uppercase tracking-[0.08em] text-temporal-muted/25 animate-smoke-appear whitespace-nowrap">
          {text}
        </div>
      </div>

      {/* Falling letters phase */}
      <div className="absolute inset-0 flex items-center justify-center whitespace-nowrap pointer-events-none">
        {letters.map((letter, idx) => (
          <span
            key={idx}
            className="animate-hacker-fall inline-block font-mono text-[14px] md:text-[18px] uppercase tracking-[0.08em] text-temporal-muted/25"
            style={{
              '--fall-x': `${letterProps[idx].fallX}px`,
              '--fall-rot': `${letterProps[idx].fallRot}deg`,
              animationDelay: `${4 + letterProps[idx].delay}s`,
              animationDuration: '3s',
              animationIterationCount: 'infinite',
              animationFillMode: 'forwards'
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section id="hero" className="relative flex flex-col justify-center min-h-[85vh] overflow-hidden border-b border-temporal-border pt-16">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 sm:border-x border-temporal-border flex-grow flex flex-col md:flex-row items-center relative z-10 gap-10 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 z-20"
        >
          <div className="relative mb-8">
            <div className="font-mono text-temporal-accent tracking-wide text-sm md:text-base uppercase relative z-20">
              {t('hero.tag')}
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-mono tracking-tighter text-temporal-text mb-8 leading-[1.1]">
            {t('hero.line1')}<br />
            <span className="text-temporal-muted">{t('hero.line2')}</span>
          </h1>
          <p className="text-lg md:text-xl text-temporal-muted max-w-xl leading-relaxed mb-12">
            {t('hero.desc')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#projects" className="px-8 py-4 bg-temporal-text text-temporal-bg font-mono font-bold text-sm hover:bg-temporal-accent transition-colors text-center inline-block">
              {t('hero.ctaProjects')}
            </a>
            <a href="#contact" className="px-8 py-4 border border-temporal-border text-temporal-text font-mono text-sm hover:border-temporal-muted hover:text-white transition-colors text-center inline-block">
              {t('hero.ctaContact')}
            </a>
          </div>
        </motion.div>

        {/* Generative Art Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-1/2 flex flex-col justify-center items-center z-10 -mt-8 md:-mt-24 md:pl-6 md:pr-6 lg:pr-12 relative"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.6 }}
            className="absolute -top-24 md:-top-32 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none select-none z-30"
          >
            <DreamPhrase text="¿Pueden soñar los sistemas?" />
          </motion.div>
          <PerlinWarpGL imgSrc="/p3.PNG" />

          <div className="mt-8 md:mt-24 text-[10px] md:text-xs uppercase tracking-[0.2em] text-temporal-muted/50 font-mono text-center max-w-[300px] md:max-w-md pointer-events-none">
            Eulophia alta (Orchidaceae) seed micrograph<br />
            <span className="opacity-60 text-[9px] md:text-[10px]">0.9mm · Wind-dispersed honeycomb morphology</span>
          </div>
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
