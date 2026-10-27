import React, { memo } from 'react';
import { Section } from './Section';
import { useTranslation } from '../i18n/LanguageContext';

// Separate piece component with zero-JS interaction and hardware-accelerated video
const ArtPiece = memo(({ id, title, webmPath, mp4Path, description, subtitle, hasSound = false, badgeText, isSquare = false }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <div className={isSquare ? "art-piece-container" : "art-piece-container relative overflow-hidden bg-black/40 border border-temporal-border/50 aspect-video flex items-center justify-center"}>
        {/* Background Fallback Label (visible while loading or if missing) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <span className="text-temporal-muted/30 font-mono text-xs uppercase tracking-widest transition-colors">
            [ {id} ]
          </span>
        </div>

        {/* Hardware-Accelerated Video Layer - Zero Flickering */}
        <video 
          className={isSquare ? "art-video-layer" : "w-full h-full object-cover relative z-10"}
          autoPlay={!hasSound} // Autoplay directo si no tiene sonido; si tiene sonido requiere click del usuario
          loop 
          muted={!hasSound} // Muted si no tiene sonido; con sonido permitimos el audio del set
          controls={hasSound} // Habilitar barra de reproducción, volumen, pantalla completa y play/pausa para VJ
          playsInline
        >
          {webmPath && <source src={webmPath} type="video/webm" />}
          <source src={mp4Path} type="video/mp4" />
        </video>

        {/* Floating Bio-Art / VJ Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-temporal-bg/80 backdrop-blur-sm border border-temporal-border px-2 py-1 text-[8px] font-mono text-temporal-accent uppercase tracking-widest">
            {badgeText || t('art.badge')}
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
      {/* --- SUBSECCIÓN 1: BIOMORFOLOGÍA GENERATIVA --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <ArtPiece 
          id="Piece 001"
          title={t('art.piece1.title')}
          subtitle={t('art.piece1.subtitle')}
          description={t('art.piece1.caption')}
          webmPath="/seeds_fractal.webm"
          mp4Path="/seeds_fractal.mp4"
          isSquare={true}
        />
        <ArtPiece 
          id="Piece 002"
          title={t('art.piece2.title')}
          subtitle={t('art.piece2.subtitle')}
          description={t('art.piece2.caption')}
          webmPath="/fish_bw.webm"
          mp4Path="/fish_bw.mp4"
          isSquare={true}
        />
      </div>

      {/* --- SUBSECCIÓN 2: VISUAL DJ (VJ) • LIVE CODE SET --- */}
      <div className="pt-16 border-t border-temporal-border/30 mb-16">
        <h3 className="text-3xl md:text-4xl font-prata mb-8 leading-tight tracking-tight uppercase animate-prism-text origin-left">
          {t('art.vjSectionTitle')}
        </h3>
        <p className="text-lg text-temporal-muted max-w-4xl leading-relaxed whitespace-pre-line">
          {t('art.vjSectionDesc')}
        </p>
        <span className="text-xs text-temporal-muted/50 font-mono mt-6 block leading-relaxed max-w-4xl">
          {t('art.vjSectionFooter')}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ArtPiece 
            id="VJ Set 001"
            title={t('art.vjPiece1.title')}
            subtitle={t('art.vjPiece1.subtitle')}
            description={t('art.vjPiece1.caption')}
            mp4Path="/video/FLUIDO.MOV"
            hasSound={true}
            badgeText={t('art.vjBadge')}
          />
          <ArtPiece 
            id="VJ Set 002"
            title={t('art.vjPiece2.title')}
            subtitle={t('art.vjPiece2.subtitle')}
            description={t('art.vjPiece2.caption')}
            mp4Path="/video/VJ2.MOV"
            hasSound={true}
            badgeText={t('art.vjBadge')}
          />
        </div>
      </div>
      
      <div className="mt-16 text-center text-temporal-muted/30 font-mono text-[9px] uppercase tracking-[0.3em]">
        <span>{t('art.footer')}</span>
      </div>
    </Section>
  );
};

export default ArtSection;
