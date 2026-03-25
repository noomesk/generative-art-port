import React, { memo } from 'react';
import { Section } from './Section';

// Separate piece component with zero-JS interaction and hardware-accelerated video
const ArtPiece = memo(({ id, title, webmPath, mp4Path, description, subtitle }) => {
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
            Bio-Inspired Generative Art
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
  return (
    <Section 
      id="art" 
      title="Generative Art" 
      description="Exploring the edges of digital growth, biological patterns, and algorithmic serendipity."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ArtPiece 
          id="Piece 001"
          title="Fractal Growth"
          subtitle="Seeds of Cleome gynandra (Capparaceae) mixed with Delphinium peregrinum (Ranunculaceae). Algorithmic exploration of plant morphology and generative seed distribution patterns."
          description="[ Piece 001 ] — Biologically inspired generative art"
          webmPath="/seeds_fractal.webm"
          mp4Path="/seeds_fractal.mp4"
        />
        <ArtPiece 
          id="Piece 002"
          title="Neural Flow"
          subtitle="Pterois volitans (lionfish) in motion. Movement simulated using Mandelbrot sets to calculate rhythmic cycles of fading and emergence. Hardware-accelerated decoder · Bio-Art Sync v5.0"
          description="[ Piece 002 ] — Biologically inspired generative art"
          webmPath="/fish_bw.webm"
          mp4Path="/fish_bw.mp4"
        />
      </div>
      
      <div className="mt-16 text-center text-temporal-muted/30 font-mono text-[9px] uppercase tracking-[0.3em]">
        <span>Hardware Accelerated Decoder • Bio-Art Sync v5.0</span>
      </div>
    </Section>
  );
};

export default ArtSection;
