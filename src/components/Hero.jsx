import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PerlinWarpGL from './PerlinWarpGL';
import MusicPlayer from './MusicPlayer';
import SandTitle from './SandTitle';
import { useTranslation } from '../i18n/LanguageContext';

// Componente para el efecto de HUMO (smoke appear-wave)
const SmokePhrase = ({ text }) => {
  return (
    <div className="relative flex items-center justify-center min-h-12">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="font-mono text-[14px] md:text-[18px] uppercase tracking-[0.08em] text-temporal-muted/30 animate-smoke-appear-wave whitespace-nowrap">
          {text}
        </div>
      </div>
    </div>
  );
};

// Componente para el efecto WAVE (ondulante)
const WavePhrase = ({ text, smaller = false }) => {
  const letters = text.split('');

  return (
    <div className="relative flex items-center justify-center min-h-max">
      <div className="absolute inset-0 flex items-center justify-center whitespace-pre-wrap pointer-events-none">
        <div className="opacity-50 hover:opacity-100 transition-opacity duration-1000">
          {letters.map((letter, idx) => (
            <span
              key={`wave-${idx}`}
              className={`inline-block font-mono ${smaller ? 'text-[7px] md:text-[8px]' : 'text-[10px] md:text-[12px]'} uppercase tracking-[0.08em] text-temporal-muted/40 animate-letter-wave`}
              style={{
                animationDelay: `${idx * 0.08}s`,
                animationDuration: '12s',
                animationIterationCount: 'infinite',
                perspective: '1000px',
                transform: 'translateX(0)',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  const [expandedCreative, setExpandedCreative] = useState(false);

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
          <SandTitle 
            line1={t('hero.line1')}
            line2={t('hero.line2')}
            className="text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-mono tracking-tighter text-temporal-text mb-8 leading-[1.1]" 
          />
          <p className="text-lg md:text-xl text-temporal-muted max-w-xl leading-relaxed mb-12">
            {t('hero.desc')}
          </p>

          {/* Expandable creative process section */}
          <div className="mb-12 pt-8 border-t border-temporal-border/30">
            <button
              onClick={() => setExpandedCreative(!expandedCreative)}
              className="group cursor-pointer inline-flex items-baseline gap-1 mb-4 hover:text-temporal-text transition-colors"
            >
              <span className="text-xs font-mono text-temporal-muted/50 uppercase tracking-widest group-hover:text-temporal-muted transition-colors">
                {expandedCreative ? '[−]' : '[+]'} {t('about.creativeLens')}?
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
              <div className="text-sm md:text-base text-temporal-muted/80 text-left max-w-2xl leading-relaxed pointer-events-none">
                {t('about.p3')}<br />
                <span className="opacity-60 text-[10px] md:text-xs uppercase tracking-[0.2em] font-mono">{t('about.p3Meta')}</span>
              </div>
            </motion.div>
          </div>

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
          className="w-full md:w-1/2 flex flex-col justify-center items-center z-10 -mt-8 md:-mt-24 md:pl-6 md:pr-6 lg:pr-12 relative top-[3cm]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.6 }}
            className="absolute -top-36 md:-top-44 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none select-none z-30"
          >
            <SmokePhrase text={t('hero.smoke')} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.8 }}
            className="absolute top-14 md:top-18 -right-4 md:-right-8 flex justify-end w-auto z-29 pointer-events-none select-none"
          >
            <div className="opacity-40 hover:opacity-100 transition-opacity duration-500">
              <WavePhrase text={t('hero.wave')} smaller={true} />
            </div>
          </motion.div>

          <PerlinWarpGL imgSrc="/ref/semilla.png" />

          <div className="mt-8 md:mt-24 text-[10px] md:text-xs uppercase tracking-[0.2em] text-temporal-muted/50 font-mono text-center max-w-[300px] md:max-w-md pointer-events-none">
            {t('hero.caption')}<br />
            <span className="opacity-60 text-[9px] md:text-[10px]">{t('hero.captionMeta')}</span>
          </div>

          <div className="w-full max-w-md mt-[calc(2rem+3cm)]">
            <MusicPlayer />
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
