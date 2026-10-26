import React, { useEffect, useRef } from 'react';

/**
 * SandTitle - Un componente que mantiene el texto HTML original 100% visible y legible,
 * y superpone un canvas que emite continuamente partículas de arena/humo granulado
 * que se difuminan con el viento (hacia la izquierda y ligeramente hacia abajo),
 * logrando un efecto muy similar a la referencia visual sin comprometer el tamaño o la legibilidad.
 */
const SandTitle = ({ lines, className = '' }) => {
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const canvasRef = useRef(null);
  const key = lines.join('|');

  useEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !text || !canvas) return;

    const ctx = canvas.getContext('2d');
    let raf;
    let particles = [];
    let textPixels = [];
    let width = 0;
    let height = 0;

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;

      // Sincronizar dimensiones de canvas con alta densidad de píxeles
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Obtener estilos reales del elemento del DOM para clonarlos en el muestreo
      const style = getComputedStyle(text);
      const fontSize = parseFloat(style.fontSize);
      const family = style.fontFamily;
      const weight = style.fontWeight;
      const letterSpacing = style.letterSpacing;
      const lineHeight = parseFloat(style.lineHeight) || fontSize * 1.1;

      // Crear canvas offscreen para dibujar el texto y leer la silueta de los píxeles
      const off = document.createElement('canvas');
      off.width = width;
      off.height = height;
      const octx = off.getContext('2d');

      octx.font = `${weight} ${fontSize}px ${family}`;
      octx.fillStyle = '#ffffff';
      octx.textBaseline = 'top';
      octx.letterSpacing = letterSpacing;

      lines.forEach((line, i) => {
        octx.fillText(line, 0, i * lineHeight);
      });

      // Leer píxeles del texto renderizado
      const imgData = octx.getImageData(0, 0, off.width, off.height).data;
      textPixels = [];

      // Muestrear píxeles con un paso de 2 para tener suficiente densidad
      for (let y = 0; y < off.height; y += 2) {
        for (let x = 0; x < off.width; x += 2) {
          const alpha = imgData[(y * off.width + x) * 4 + 3];
          if (alpha > 120) {
            textPixels.push({ x, y });
          }
        }
      }

      // Si no hay píxeles (ej. texto no cargado), salir
      if (textPixels.length === 0) return;

      // Inicializar el pool de partículas (2000 granos de arena)
      const particleCount = 2200;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const base = textPixels[Math.floor(Math.random() * textPixels.length)];
        particles.push({
          x: base.x,
          y: base.y,
          ox: base.x,
          oy: base.y,
          vx: 0,
          vy: 0,
          life: Math.random(), // fase inicial aleatoria
          decay: 0.008 + Math.random() * 0.015,
          size: Math.random() * 1.5 + 0.5,
          // Mezcla de tonos grises y arena/naranja muy sutiles para profundidad analógica
          colorType: Math.random() > 0.85 ? 'accent' : Math.random() > 0.5 ? 'muted' : 'text',
        });
      }
    };

    const frame = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Si el redimensionamiento o la carga no han completado el muestreo, reintentar
      if (textPixels.length === 0) {
        build();
        raf = requestAnimationFrame(frame);
        return;
      }

      for (const p of particles) {
        // Decrementar vida
        p.life -= p.decay;

        // Si muere, respawnear instantáneamente en un píxel aleatorio del texto original
        if (p.life <= 0) {
          const base = textPixels[Math.floor(Math.random() * textPixels.length)];
          p.ox = base.x;
          p.oy = base.y;
          p.x = base.x;
          p.y = base.y;
          p.vx = 0;
          p.vy = 0;
          p.life = 1.0;
        }

        // --- SIMULACIÓN DE VIENTO HACIA LA IZQUIERDA ---
        // Viento constante a la izquierda + ráfagas/turbulencia basadas en ruido armónico
        const windX = -1.6;
        const windY = 0.3; // sopla ligeramente hacia abajo
        
        const turbulenceX = Math.sin(time * 0.0012 + p.y * 0.03) * 0.7;
        const turbulenceY = Math.cos(time * 0.0008 + p.x * 0.03) * 0.3;

        // Aplicar aceleración y fricción para fluidez de humo/arena
        p.vx += windX * 0.08 + turbulenceX * 0.1;
        p.vy += windY * 0.08 + turbulenceY * 0.1;
        p.vx *= 0.93;
        p.vy *= 0.93;

        p.x += p.vx;
        p.y += p.vy;

        // Opacidad basada en la vida restante y la distancia recorrida desde el origen
        const dx = p.x - p.ox;
        const dy = p.y - p.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Se desvanecen gradualmente hasta un rango de 140px
        const maxDist = 140;
        const distanceFade = Math.max(0, 1 - dist / maxDist);
        const alpha = p.life * distanceFade * 0.45;

        if (alpha > 0.01) {
          let fillStyle = `rgba(237, 237, 237, ${alpha})`; // temporal-text
          if (p.colorType === 'accent') {
            fillStyle = `rgba(236, 94, 63, ${alpha * 0.85})`; // #ec5e3f (naranja de referencia)
          } else if (p.colorType === 'muted') {
            fillStyle = `rgba(136, 136, 136, ${alpha})`; // temporal-muted
          }

          ctx.fillStyle = fillStyle;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      }

      raf = requestAnimationFrame(frame);
    };

    // Construcción inicial diferida para asegurar la carga de fuentes
    const timer = setTimeout(() => {
      build();
      raf = requestAnimationFrame(frame);
    }, 120);

    window.addEventListener('resize', build);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', build);
    };
  }, [key]);

  return (
    <div ref={wrapRef} className="relative w-full">
      {/* El texto HTML real y original: 100% visible, legible, con su tamaño completo */}
      <h1 ref={textRef} className={`${className} select-all relative z-0`}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${i === 1 ? 'text-temporal-muted' : ''}`}>
            {line}
          </span>
        ))}
      </h1>
      {/* Canvas superpuesto que dibuja las estelas de arena/humo granulado */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" aria-hidden="true" />
    </div>
  );
};

export default SandTitle;
