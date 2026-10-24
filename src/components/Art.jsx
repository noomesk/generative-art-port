import React, { memo } from 'react';
import { Section } from './Section';
import { useTranslation } from '../i18n/LanguageContext';

// Separate piece component with zero-JS interaction and hardware-accelerated video
const ArtPiece = memo(({ id, title, webmPath, mp4Path, description, subtitle }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <div className="art-piece-container">
        {/* Background Fallback Label (visible while loading or if missing) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <span className="text-temporal-muted/30 font-mono text-xs uppercase tracking-widest transition-colors">
            [ {id} ]
          </span>
        </div>

        {/* Hardware-Accelerated Video Layer - Zero Flickering */}
        <video 
          className="art-video-layer"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={webmPath} type="video/webm" />
          <source src={mp4Path} type="video/mp4" />
        </video>

        {/* Floating Bio-Art Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-temporal-bg/80 backdrop-blur-sm border border-temporal-border px-2 py-1 text-[8px] font-mono text-temporal-accent uppercase tracking-widest">
            {t('art.badge')}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-temporal-text font-mono font-bold uppercase tracking-tight text-lg">
          {title}
        </h4>
        <div className="space-y-1">
          <p className="text-temporal-muted text-sm leading-relaxed italic">
            {subtitle}
          </p>
          <p className="text-temporal-muted/60 text-xs leading-relaxed font-mono">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
});

ArtPiece.displayName = 'ArtPiece';

const ArtSection = () => {
  const { t } = useTranslation();

  return (
    <Section 
      id="art" 
      title={t('art.title')} 
      description={t('art.description')}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ArtPiece 
          id="Piece 001"
          title={t('art.piece1.title')}
          subtitle={t('art.piece1.subtitle')}
          description={t('art.piece1.caption')}
          webmPath="/seeds_fractal.webm"
          mp4Path="/seeds_fractal.mp4"
        />
        <ArtPiece 
          id="Piece 002"
          title={t('art.piece2.title')}
          subtitle={t('art.piece2.subtitle')}
          description={t('art.piece2.caption')}
          webmPath="/fish_bw.webm"
          mp4Path="/fish_bw.mp4"
        />
      </div>
      
      <div className="mt-16 text-center text-temporal-muted/30 font-mono text-[9px] uppercase tracking-[0.3em]">
        <span>{t('art.footer')}</span>
      </div>
    </Section>
  );
};

export default ArtSection;
