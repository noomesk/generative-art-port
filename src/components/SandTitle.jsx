import React, { useEffect, useRef, useState } from 'react';

/**
 * SandTitle - Un componente de alto impacto visual inspirado en la referencia.
 * Mantiene el texto HTML en su posición original, pero con un color transparente
 * para que el Canvas dibuje las letras con una textura orgánica de grano denso (carbón/spray),
 * y un campo de flujo (Flow Field) de partículas de viento que se desintegran y ondulan de forma natural.
 * Además, añade un foco visual de círculo naranja-rojo en la primera letra "O" de "Yo", imitando la referencia.
 */
const SandTitle = ({ line1, line2, className = '' }) => {
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const canvasRef = useRef(null);

  // Líneas formateadas para que el HTML ocupe el espacio físico real en el layout
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

      width = wrap.clientWidth;
      if (width <= 0) return;

      const measurer = document.createElement('canvas').getContext('2d');
      const fontStr = `${weight} ${fontSize}px ${family}`;
      measurer.font = fontStr;

      // Word-wrap unificado entre HTML y Canvas
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

      setWrappedLines({ lines: finalLines, line1Count: wrappedL1.length });

      const dpr = window.devicePixelRatio || 1;
      const lineHeight = fontSize * 1.1;
      height = finalLines.length * lineHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 2. Renderizar offscreen para leer la silueta de los píxeles
      const off = document.createElement('canvas');
      off.width = width;
      off.height = height;
      const octx = off.getContext('2d');

      octx.font = fontStr;
      octx.textBaseline = 'top';
      octx.letterSpacing = letterSpacing;

      // Dibujar silueta en blanco sobre negro para leer máscara de píxeles
      octx.fillStyle = '#ffffff';
      finalLines.forEach((line, i) => {
        let currentX = 0;
        const lineY = i * lineHeight;

        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          const charWidth = octx.measureText(char).width;

          // Si es la primera 'o' en la primera línea de 'Yo defino...', dibujamos silueta circular
          if (i === 0 && j === 1 && char.toLowerCase() === 'o' && line.toLowerCase().startsWith('yo')) {
            const radius = octx.measureText('M').width * 0.65;
            const centerX = currentX + charWidth / 2;
            const centerY = lineY + radius * 0.85;

            octx.beginPath();
            octx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            octx.fill();
          } else {
            octx.fillText(char, currentX, lineY);
          }
          currentX += charWidth;
        }
      });

      const imgData = octx.getImageData(0, 0, off.width, off.height).data;
      textPixels = [];

      for (let y = 0; y < off.height; y += 1.5) {
        for (let x = 0; x < off.width; x += 1.5) {
          const alpha = imgData[(Math.floor(y) * off.width + Math.floor(x)) * 4 + 3];
          if (alpha > 80) {
            textPixels.push({ x, y });
          }
        }
      }

      if (textPixels.length === 0) return;

      // 3. Inicializar pool de partículas (total: 8000)
      // - 6000 partículas estáticas/carbón que dan la textura granulada (estilo stippling)
      // - 2000 partículas voladoras (Flow Field) que simulan el viento/arena
      const textGrainsCount = 6000;
      const flyingGrainsCount = 2000;
      particles = [];

      // Granos de textura estática (carbón denso)
      for (let i = 0; i < textGrainsCount; i++) {
        const base = textPixels[Math.floor(Math.random() * textPixels.length)];
        particles.push({
          type: 'grain',
          x: base.x,
          y: base.y,
          ox: base.x,
          oy: base.y,
          life: 0.5 + Math.random() * 0.5,
          decay: 0,
          size: Math.random() * 1.3 + 0.4,
          colorType: Math.random() > 0.88 ? 'accent' : Math.random() > 0.45 ? 'muted' : 'text',
        });
      }

      // Granos voladores (humo/viento)
      for (let i = 0; i < flyingGrainsCount; i++) {
        const base = textPixels[Math.floor(Math.random() * textPixels.length)];
        particles.push({
          type: 'fly',
          x: base.x,
          y: base.y,
          ox: base.x,
          oy: base.y,
          vx: 0,
          vy: 0,
          life: Math.random(),
          decay: 0.005 + Math.random() * 0.012,
          size: Math.random() * 1.3 + 0.4,
          colorType: Math.random() > 0.82 ? 'accent' : Math.random() > 0.5 ? 'muted' : 'text',
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

      // 1. Dibujar el texto base con opacidad muy baja (0.08)
      // Esto provee un borde de guía suave para legibilidad perfecta sin verse "sólido" o compacto.
      const style = getComputedStyle(text);
      const fontSize = parseFloat(style.fontSize);
      const family = style.fontFamily;
      const weight = style.fontWeight;
      const letterSpacing = style.letterSpacing;
      const lineHeight = fontSize * 1.1;

      ctx.font = `${weight} ${fontSize}px ${family}`;
      ctx.textBaseline = 'top';
      ctx.letterSpacing = letterSpacing;

      wrappedLines.lines.forEach((line, i) => {
        let currentX = 0;
        const lineY = i * lineHeight;

        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          const charWidth = ctx.measureText(char).width;

          // Si es la primera 'o' de 'Yo...', dibujar círculo de foco naranja
          if (i === 0 && j === 1 && char.toLowerCase() === 'o' && line.toLowerCase().startsWith('yo')) {
            const radius = ctx.measureText('M').width * 0.65;
            const centerX = currentX + charWidth / 2;
            const centerY = lineY + radius * 0.85;

            // Círculo sólido naranja-rojo (con opacidad moderada para textura)
            ctx.fillStyle = 'rgba(236, 94, 63, 0.45)';
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();

            // Dibujar la 'o' calada en negro
            ctx.fillStyle = 'rgba(5, 5, 5, 0.45)';
            ctx.fillText(char, currentX, lineY);
          } else {
            // Un susurro de base sólida para guiar el ojo
            ctx.fillStyle = i >= wrappedLines.line1Count 
              ? 'rgba(136, 136, 136, 0.08)' 
              : 'rgba(237, 237, 237, 0.08)';
            ctx.fillText(char, currentX, lineY);
          }
          currentX += charWidth;
        }
      });

      // 2. Simular y dibujar partículas
      for (const p of particles) {
        if (p.type === 'grain') {
          // El grano de la letra tiembla levemente en su sitio, simulando spray de carbón activo
          p.x = p.ox + (Math.random() - 0.5) * 1.2;
          p.y = p.oy + (Math.random() - 0.5) * 1.2;

          // Granos con alta opacidad (0.85) para máxima definición granulada
          const alpha = 0.85;
          let fillStyle = `rgba(237, 237, 237, ${alpha})`;
          if (p.colorType === 'accent') {
            fillStyle = `rgba(236, 94, 63, ${alpha})`; // grano de arena naranja
          } else if (p.colorType === 'muted') {
            fillStyle = `rgba(136, 136, 136, ${alpha})`;
          }
          ctx.fillStyle = fillStyle;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        } else {
          // Partícula voladora (Flow Field / Campo de flujo)
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

          // Campo de vectores ondulante (Flow Field): el viento fluye como ondas de humo
          const baseWindX = -1.8; // viento hacia la izquierda
          const baseWindY = 0.25; // ligera caída hacia abajo

          // Turbulencias senoidales cruzadas (simula vórtices de fluido)
          const angle = Math.sin(time * 0.0012 + p.y * 0.02) * 0.8 + Math.cos(time * 0.0006 + p.x * 0.015) * 0.4;
          const forceX = Math.cos(angle) * 1.2;
          const forceY = Math.sin(angle) * 0.4;

          p.vx += baseWindX * 0.08 + forceX * 0.12;
          p.vy += baseWindY * 0.08 + forceY * 0.12;
          p.vx *= 0.91; // fricción
          p.vy *= 0.91;

          p.x += p.vx;
          p.y += p.vy;

          const dx = p.x - p.ox;
          const dy = p.y - p.oy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 150;
          const distanceFade = Math.max(0, 1 - dist / maxDist);
          const alpha = p.life * distanceFade * 0.4;

          if (alpha > 0.01) {
            let fillStyle = `rgba(237, 237, 237, ${alpha})`;
            if (p.colorType === 'accent') {
              fillStyle = `rgba(236, 94, 63, ${alpha * 0.95})`; // #ec5e3f
            } else if (p.colorType === 'muted') {
              fillStyle = `rgba(136, 136, 136, ${alpha})`;
            }

            ctx.fillStyle = fillStyle;
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
      {/* El texto HTML real con color transparente: mantiene el layout y la selección exacta de texto */}
      <h1 ref={textRef} className={`${className} select-all relative z-0 text-transparent selection:bg-[#ec5e3f]/30`}>
        {wrappedLines.lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h1>
      {/* Canvas superpuesto que dibuja las letras con grano de carbón y las estelas de humo */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" aria-hidden="true" />
    </div>
  );
};

export default SandTitle;
