import React, { useEffect, useRef, useState } from 'react';

/**
 * SandTitle - Un componente de alto impacto visual que implementa la especificación técnica de stippling:
 * 1. Mapea el texto "YO DEFINO LAS REGLAS, LOS SISTEMAS SUEÑAN" (todo en mayúsculas, peso pesado, tracking ajustado) a un canvas offscreen.
 * 2. Obtiene la máscara de píxeles exacta (alpha > 0).
 * 3. Rellena el interior de cada letra con miles de partículas de arena muy densas (grano de carbón de 1px a 2px)
 *    en una gama de blanco y grises (eliminando el rojo).
 * 4. Damos un poquitín más de movimiento aleatorio (micro-corrientes / Brownian motion) fuertemente anclado a su origen,
 *    consiguiendo un Shimmering orgánico vivo pero manteniendo los bordes ultra nítidos y legibles.
 * 5. Añade una estela de viento de arena voladora hacia la izquierda.
 */
const SandTitle = ({ line1, line2, className = '' }) => {
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const canvasRef = useRef(null);

  // Líneas formateadas en mayúsculas por el algoritmo de word-wrap
  const [wrappedLines, setWrappedLines] = useState({ lines: [line1.toUpperCase(), line2.toUpperCase()], line1Count: 1 });

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
      const style = getComputedStyle(text);
      const fontSize = parseFloat(style.fontSize);
      const family = style.fontFamily;
      const weight = '900'; // Fuerza peso pesado/black
      const letterSpacing = '-0.05em'; // Tracking súper ajustado de la especificación

      width = wrap.clientWidth;
      if (width <= 0) return;

      const measurer = document.createElement('canvas').getContext('2d');
      const fontStr = `${weight} ${fontSize}px ${family}`;
      measurer.font = fontStr;

      // Word-wrap unificado entre HTML y Canvas
      const wrapText = (txt) => {
        const uppercaseTxt = txt.toUpperCase().replace(/[.,]/g, ''); // Limpiar puntuación para estricto mayúsculas
        const words = uppercaseTxt.split(' ');
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

      setWrappedLines({ lines: finalLines, line1Count: wrappedL1.length });

      const dpr = window.devicePixelRatio || 1;
      const lineHeight = fontSize * 1.05; // Interlineado compacto de la especificación
      height = finalLines.length * lineHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Dibujar texto offscreen para muestrear posiciones de partículas
      const off = document.createElement('canvas');
      off.width = width;
      off.height = height;
      const octx = off.getContext('2d');

      octx.font = fontStr;
      octx.textBaseline = 'top';
      octx.letterSpacing = letterSpacing;
      octx.fillStyle = '#ffffff';

      finalLines.forEach((line, i) => {
        octx.fillText(line, 0, i * lineHeight);
      });

      const imgData = octx.getImageData(0, 0, off.width, off.height).data;
      textPixels = [];

      // Muestrear con alta densidad (paso de 1.2px) para rellenar las letras con grano fino
      for (let y = 0; y < off.height; y += 1.2) {
        for (let x = 0; x < off.width; x += 1.2) {
          const idx = (Math.floor(y) * off.width + Math.floor(x)) * 4;
          const alpha = imgData[idx + 3];

          if (alpha > 80) {
            textPixels.push({ x, y });
          }
        }
      }

      if (textPixels.length === 0) return;

      // Inicializar pool de partículas (granos de arena fina)
      // - 7500 partículas de grano estático que rellenan el interior de las letras
      // - 1800 partículas voladoras que son arrastradas por el viento a la izquierda
      const textGrainsCount = 7500;
      const flyingGrainsCount = 1800;
      particles = [];

      // Granos de textura interna (carbón comprimido)
      for (let i = 0; i < textGrainsCount; i++) {
        const base = textPixels[Math.floor(Math.random() * textPixels.length)];
        particles.push({
          type: 'grain',
          ox: base.x,
          oy: base.y,
          x: base.x,
          y: base.y,
          size: Math.random() * 1.3 + 0.5, // 0.5px a 1.8px de radio (granulado muy fino)
          opacity: 0.5 + Math.random() * 0.5,
          colorType: Math.random() > 0.4 ? 'text' : 'muted', // Mezcla exclusiva de blanco (#ededed) y gris (#888888)
        });
      }

      // Granos voladores (humo de arena soplada)
      for (let i = 0; i < flyingGrainsCount; i++) {
        const base = textPixels[Math.floor(Math.random() * textPixels.length)];
        particles.push({
          type: 'fly',
          ox: base.x,
          oy: base.y,
          x: base.x,
          y: base.y,
          vx: 0,
          vy: 0,
          life: Math.random(),
          decay: 0.006 + Math.random() * 0.015,
          size: Math.random() * 1.2 + 0.4,
          colorType: Math.random() > 0.45 ? 'text' : 'muted',
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

      // Simular y dibujar partículas granuladas
      for (const p of particles) {
        if (p.type === 'grain') {
          // MOVIMIENTO ALEATORIO/BROWNIANO CON RESORTE:
          // Las partículas de la letra tienen un movimiento aleatorio continuo un poquitín mayor,
          // pero son atraídas fuertemente a su posición original (ox, oy) mediante un resorte (fuerza elástica),
          // simulando micro-corrientes activas sin perder la definición ni la nitidez de los bordes.
          p.x += (p.ox - p.x) * 0.12 + (Math.random() - 0.5) * 1.8;
          p.y += (p.oy - p.y) * 0.12 + (Math.random() - 0.5) * 1.8;

          // Variación de opacidad en tiempo real (0.5 a 1.0) de la especificación
          const opacity = Math.max(0.5, Math.min(1.0, p.opacity + (Math.random() - 0.5) * 0.15));

          // Color del grano: blanco (#ededed) o gris (#888888)
          ctx.fillStyle = p.colorType === 'text'
            ? `rgba(237, 237, 237, ${opacity})`
            : `rgba(136, 136, 136, ${opacity})`;

          ctx.fillRect(p.x, p.y, p.size, p.size);
        } else {
          // Partículas de viento/humo arrastradas
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

          // Campo de vectores del viento (Flow Field)
          const baseWindX = -1.6;
          const baseWindY = 0.2;

          const angle = Math.sin(time * 0.0012 + p.y * 0.02) * 0.8 + Math.cos(time * 0.0006 + p.x * 0.015) * 0.4;
          const forceX = Math.cos(angle) * 1.2;
          const forceY = Math.sin(angle) * 0.4;

          p.vx += baseWindX * 0.08 + forceX * 0.12;
          p.vy += baseWindY * 0.08 + forceY * 0.12;
          p.vx *= 0.91;
          p.vy *= 0.91;

          p.x += p.vx;
          p.y += p.vy;

          const dx = p.x - p.ox;
          const dy = p.y - p.oy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 130;
          const distanceFade = Math.max(0, 1 - dist / maxDist);
          const alpha = p.life * distanceFade * 0.4;

          if (alpha > 0.01) {
            ctx.fillStyle = p.colorType === 'text'
              ? `rgba(237, 237, 237, ${alpha})`
              : `rgba(136, 136, 136, ${alpha})`;

            ctx.fillRect(p.x, p.y, p.size, p.size);
          }
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
      {/* Texto HTML real transparente: mantiene posicionamiento, SEO y selección al 100% */}
      <h1 ref={textRef} className={`${className} select-all relative z-0 text-transparent selection:bg-temporal-accent/20 font-black uppercase tracking-[-0.05em] leading-[1.05]`}>
        {wrappedLines.lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h1>
      {/* Canvas que dibuja el texto granulado y las estelas de viento con bordes ultra nítidos */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" aria-hidden="true" />
    </div>
  );
};

export default SandTitle;
