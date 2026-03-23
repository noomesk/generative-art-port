import React, { useRef, useEffect } from 'react';

// Perlin noise classic
const _perm = (() => {
  const base = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,
    140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,
    26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,
    20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,
    83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,
    54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,
    130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,
    5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,
    28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,
    43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,
    218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,
    235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,
    121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,
    128,195,78,66,215,61,156,180];
  const p = new Uint8Array(512);
  for (let i = 0; i < 256; i++) p[i] = p[i+256] = base[i];
  return p;
})();

function _fade(t) { return t*t*t*(t*(t*6-15)+10); }
function _lerp(a,b,t) { return a+(b-a)*t; }
function _grad(h, x, y, z) {
  h &= 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
  return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
}

function perlin(x, y, z) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
  x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
  const u = _fade(x), v = _fade(y), w = _fade(z);
  const A  = _perm[X]+Y,   AA = _perm[A]+Z,   AB = _perm[A+1]+Z;
  const B  = _perm[X+1]+Y, BA = _perm[B]+Z,   BB = _perm[B+1]+Z;
  return _lerp(
    _lerp(_lerp(_grad(_perm[AA],   x,   y,   z), _grad(_perm[BA],   x-1, y,   z), u),
          _lerp(_grad(_perm[AB],   x,   y-1, z), _grad(_perm[BB],   x-1, y-1, z), u), v),
    _lerp(_lerp(_grad(_perm[AA+1], x,   y,   z-1), _grad(_perm[BA+1], x-1, y,   z-1), u),
          _lerp(_grad(_perm[AB+1], x,   y-1, z-1), _grad(_perm[BB+1], x-1, y-1, z-1), u), v),
    w);
}

// fBm — fractal Brownian Motion
function fbm(x, y, z, octaves) {
  let val = 0, amp = 1, freq = 1, max = 0;
  for (let o = 0; o < octaves; o++) {
    val += perlin(x*freq, y*freq, z) * amp;
    max += amp;
    amp  *= 0.5;
    freq *= 2;
  }
  return val / max;
}

// Bilinear pixel sampling
function sample(sx, sy, W, H, srcData, outBuf, idx) {
  sx = Math.max(0, Math.min(W - 1.001, sx));
  sy = Math.max(0, Math.min(H - 1.001, sy));
  const x0 = sx|0, y0 = sy|0, x1 = Math.min(x0+1, W-1), y1 = Math.min(y0+1, H-1);
  const fx = sx-x0, fy = sy-y0, fx1 = 1-fx, fy1 = 1-fy;
  const i00 = (y0*W+x0)*4, i10 = (y0*W+x1)*4;
  const i01 = (y1*W+x0)*4, i11 = (y1*W+x1)*4;
  for (let c = 0; c < 3; c++) {
    outBuf[idx+c] = (srcData[i00+c]*fx1*fy1 + srcData[i10+c]*fx*fy1 +
                     srcData[i01+c]*fx1*fy  + srcData[i11+c]*fx*fy) | 0;
  }
  outBuf[idx+3] = 255;
}

const PerlinWarp = ({ imgSrc }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let W, H, srcData;
    let animId;
    let tick = 0;
    
    const CONFIG = {
      displayWidth : 400, // Increased resolution slightly for quality, keeping performance
      amplitude    : 26,
      amplitude2   : 12,
      freq         : 0.0042,
      freq2        : 0.0018,
      timeSpeed    : 0.09,
      octaves      : 3,
      offset       : 5.1,
    };

    let outImg, outBuf;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Calculate drawing size
      const drawW = CONFIG.displayWidth;
      const drawH = Math.round(drawW * img.naturalHeight / img.naturalWidth);
      
      // Calculate padding based on maximum warp amplitude to prevent edge cutoff
      const padding = CONFIG.amplitude + CONFIG.amplitude2 + 4;
      
      // Total canvas size includes padding on all sides
      W = drawW + padding * 2;
      H = drawH + padding * 2;

      canvas.width  = W;
      canvas.height = H;

      const oc  = document.createElement('canvas');
      oc.width  = W; oc.height = H;
      // Draw image in the center, leaving padding around it
      oc.getContext('2d').drawImage(img, padding, padding, drawW, drawH);
      srcData = oc.getContext('2d').getImageData(0, 0, W, H).data;

      outImg = ctx.createImageData(W, H);
      outBuf = outImg.data;

      const frame = () => {
        const { amplitude: AMP, amplitude2: AMP2, freq: FREQ, freq2: FREQ2, timeSpeed: TS, octaves: OCT, offset: OFF } = CONFIG;
        const tz  = tick * TS;
        const tz2 = tick * TS * 0.35;

        for (let y = 0; y < H; y++) {
          const yn = y * FREQ, yn2 = y * FREQ2;
          for (let x = 0; x < W; x++) {
            const xn = x * FREQ, xn2 = x * FREQ2;

            // Primary high-frequency fBm warp
            const dx1 = fbm(xn,       yn,       tz,  OCT) * AMP*2 - AMP;
            const dy1 = fbm(xn+OFF,   yn+OFF,   tz,  OCT) * AMP*2 - AMP;

            // Secondary slow breathing warp
            const dx2 = fbm(xn2+10,   yn2,      tz2, 3)   * AMP2*2 - AMP2;
            const dy2 = fbm(xn2,      yn2+10,   tz2, 3)   * AMP2*2 - AMP2;

            sample(x + dx1 + dx2, y + dy1 + dy2, W, H, srcData, outBuf, (y*W+x)*4);
          }
        }

        ctx.putImageData(outImg, 0, 0);
        tick++;
        animId = requestAnimationFrame(frame);
      };

      frame();
    };
    
    // Setting src starts the load
    img.src = imgSrc;

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [imgSrc]);

  return (
    <div className="relative inline-block w-full max-w-[650px] scale-110 md:scale-125 xl:scale-150 -translate-x-8 md:-translate-x-16 xl:-translate-x-24 flex items-center justify-center mix-blend-screen origin-center">
      <canvas ref={canvasRef} className="block w-full h-auto rounded-md opacity-90 transition-opacity duration-1000 hover:opacity-100" />
      <span className="absolute bottom-6 right-8 text-[10px] tracking-widest text-temporal-muted/30 pointer-events-none select-none font-mono">
        PERLIN fBm
      </span>
    </div>
  );
};

export default PerlinWarp;
