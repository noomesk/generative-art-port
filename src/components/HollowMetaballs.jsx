import React, { useEffect, useRef } from 'react';

const HollowMetaballs = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let dots = [];
    const dotCount = 15;

    const resize = () => {
      if (!containerRef.current) return;
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;
    };

    class Dot {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        
        // Scale down dimensions for the smaller grid column
        const scale = Math.min(canvas.width, canvas.height) / 800; // Normalize
        
        this.radius = (Math.random() * 80 + 60) * scale; 
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.005 + Math.random() * 0.01;
        this.range = (50 + Math.random() * 100) * scale;
        this.baseX = this.x;
        this.baseY = this.y;
      }

      update() {
        this.angle += this.speed;
        this.x = this.baseX + Math.cos(this.angle) * this.range;
        this.y = this.baseY + Math.sin(this.angle) * this.range;
      }

      draw() {
        // We draw white dots because the filter only cares about the Alpha channel
        ctx.fillStyle = "white"; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      dots = [];
      for (let i = 0; i < dotCount; i++) {
        dots.push(new Dot());
      }
      animate();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(dot => {
        dot.update();
        dot.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    
    // Slight delay to ensure layout is complete before sizing canvas
    const timer = setTimeout(init, 50);

    return () => {
      window.removeEventListener('resize', resize);
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-temporal-bg rounded-sm border border-temporal-border">
      <div 
        ref={containerRef} 
        className="w-full h-full absolute inset-0"
        style={{ filter: 'url(#topo-hollow)' }}
      >
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
      
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="topo-hollow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            
            <feComponentTransfer in="blur" result="rings">
              <feFuncA type="discrete" tableValues="0 1 0 1 0 1 0 1 0 1 0 1 0 1 0" />
            </feComponentTransfer>

            <feFlood floodColor="#EAEAEA" result="whiteFill" />
            <feComposite in="whiteFill" in2="rings" operator="in" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default HollowMetaballs;
