import React, { memo } from 'react';
import { Section } from './Section';

// Separate piece component with zero-JS interaction and hardware-accelerated video
const ArtPiece = memo(({ id, title, webmPath, mp4Path }) => {
  return (
    <div className="art-piece-container">
      {/* Background Fallback Label (visible while loading or if missing) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="text-temporal-muted/30 font-mono text-xs uppercase tracking-widest transition-colors">
          [ {id} - {title} ]
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
    </div>
  );
});

ArtPiece.displayName = 'ArtPiece';

const ArtSection = () => {
  return (
    <Section 
      id="art" 
      title="Generative Art" 
      description="Exploring the boundaries of digital growth, biological patterns, and algorithmic serendipity."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ArtPiece 
          id="Piece 001"
          title="Fractal Growth"
          webmPath="/seeds_fractal.webm"
          mp4Path="/seeds_fractal.mp4"
        />
        <ArtPiece 
          id="Piece 002"
          title="Fish Dissolve"
          webmPath="/fish_bw.webm"
          mp4Path="/fish_bw.mp4"
        />
      </div>
      
      <div className="mt-12 text-center text-temporal-muted/30 font-mono text-[9px] uppercase tracking-[0.3em]">
        <span>Hardware Accelerated Decoder • Zero-Flicker Sync v4.0</span>
      </div>
    </Section>
  );
};

export default ArtSection;
