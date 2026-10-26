import React, { useEffect, useRef, useState } from 'react';

/**
 * SandTitle - Un componente que mantiene el texto HTML original 100% visible, legible
 * y del tamaño original, garantizando la consistencia del salto de línea entre el HTML
 * y el Canvas de partículas mediante un algoritmo de word-wrap unificado.
 */
const SandTitle = ({ line1, line2, className = '' }) => {
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const canvasRef = useRef(null);

  // Guardamos las líneas formateadas en el estado para que el HTML se redibuje al redimensionar
  const [wrappedLines, setWrappedLines] = useState({ lines: [line1, line2], line1Count: 1 });

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
      // 1. Obtener estilos del elemento del DOM
      const style = getComputedStyle(text);
      const fontSize = parseFloat(style.fontSize);
      const family = style.fontFamily;
      const weight = style.fontWeight;
      const letterSpacing = style.letterSpacing;

      // Medir el ancho disponible para el contenedor
      width = wrap.clientWidth;
      if (width <= 0) return;

      // Crear contexto de medición
      const measurer = document.createElement('canvas').getContext('2d');
      const fontStr = `${weight} ${fontSize}px ${family}`;
      measurer.font = fontStr;

      // Función de ajuste de línea (greedy word-wrap)
      const wrapText = (txt) => {
        const words = txt.split(' ');
        const result = [];
        let currentLine = words[0] || '';

        for (let i = 1; i < words.length; i++) {
          const word = words[i];
          const testLine = currentLine + ' ' + word;
          const testWidth = measurer.measureText(testLine).width;
          if (testWidth < width) {
            currentLine = testLine;
          } else {
            result.push(currentLine);
            currentLine = word;
          }
        }
        if (currentLine) result.push(currentLine);
        return result;
      };

      const wrappedL1 = wrapText(line1);
      const wrappedL2 = wrapText(line2);
      const finalLines = [...wrappedL1, ...wrappedL2];

      // Actualizar el estado para que el HTML renderice exactamente las mismas líneas
      setWrappedLines({ lines: finalLines, line1Count: wrappedL1.length });

      // Configurar dimensiones de canvas con soporte para alta densidad (DPR)
      const dpr = window.devicePixelRatio || 1;
      const lineHeight = fontSize * 1.1;
      height = finalLines.length * lineHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 2. Dibujar en el canvas offscreen para muestrear los píxeles de las letras
      const off = document.createElement('canvas');
      off.width = width;
      off.height = height;
      const octx = off.getContext('2d');

      octx.font = fontStr;
      octx.fillStyle = '#ffffff';
      octx.textBaseline = 'top';
      octx.letterSpacing = letterSpacing;

      finalLines.forEach((line, i) => {
        octx.fillText(line, 0, i * lineHeight);
      });

      // Leer píxeles para el muestreo de las partículas
      const imgData = octx.getImageData(0, 0, off.width, off.height).data;
      textPixels = [];

      for (let y = 0; y < off.height; y += 2) {
        for (let x = 0; x < off.width; x += 2) {
          const alpha = imgData[(y * off.width + x) * 4 + 3];
          if (alpha > 120) {
            textPixels.push({ x, y });
          }
        }
      }

      if (textPixels.length === 0) return;

      // Inicializar el pool de partículas sopladas por el viento (2600 granos)
      const particleCount = 2600;
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
          life: Math.random(),
          decay: 0.007 + Math.random() * 0.015,
          size: Math.random() * 1.5 + 0.5,
          colorType: Math.random() > 0.82 ? 'accent' : Math.random() > 0.55 ? 'muted' : 'text',
        });
      }
    };

    const frame = (time) => {
      ctx.clearRect(0, 0, width, height);

      if (textPixels.length === 0) {
        build();
        raf = requestAnimationFrame(frame);
        return;
      }

      for (const p of particles) {
        p.life -= p.decay;

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

        // --- SIMULACIÓN DE VIENTO RECTA / DISPERSIÓN DE ARENA ---
        // Viento constante a la izquierda y turbulencia armónica
        const windX = -1.8;
        const windY = 0.2;
        
        const turbulenceX = Math.sin(time * 0.0012 + p.y * 0.02) * 0.8;
        const turbulenceY = Math.cos(time * 0.0008 + p.x * 0.02) * 0.2;

        p.vx += windX * 0.08 + turbulenceX * 0.1;
        p.vy += windY * 0.08 + turbulenceY * 0.1;
        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;

        const dx = p.x - p.ox;
        const dy = p.y - p.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const maxDist = 160;
        const distanceFade = Math.max(0, 1 - dist / maxDist);
        const alpha = p.life * distanceFade * 0.45;

        if (alpha > 0.01) {
          let fillStyle = `rgba(237, 237, 237, ${alpha})`;
          if (p.colorType === 'accent') {
            fillStyle = `rgba(236, 94, 63, ${alpha * 0.9})`; // #ec5e3f
          } else if (p.colorType === 'muted') {
            fillStyle = `rgba(136, 136, 136, ${alpha})`;
          }

          ctx.fillStyle = fillStyle;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      }

      raf = requestAnimationFrame(frame);
    };

    build();
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', build);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', build);
    };
  }, [line1, line2]);

  return (
    <div ref={wrapRef} className="relative w-full">
      {/* El texto HTML real con su tamaño original, alineación y peso */}
      <h1 ref={textRef} className={`${className} select-all relative z-0`}>
        {wrappedLines.lines.map((line, i) => (
          <span key={i} className={`block ${i >= wrappedLines.line1Count ? 'text-temporal-muted' : ''}`}>
            {line}
          </span>
        ))}
      </h1>
      {/* Canvas superpuesto que dibuja las estelas de arena */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" aria-hidden="true" />
    </div>
  );
};

export default SandTitle;
