import React, { useRef, useEffect } from 'react';

// ─── Vertex Shader ────────────────────────────────────────────────────────────
const VERT_SRC = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// ─── Fragment Shader (Perlin fBm warp entirely on GPU) ────────────────────────
const FRAG_SRC = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_image;
  uniform float u_time;

  // Simplex 2D noise (Stefan Gustavson)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1  = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy  -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                             + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                              dot(x12.zw, x12.zw)), 0.0);
    m = m * m * m * m;
    vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
    vec3 h   = abs(x_) - 0.5;
    vec3 ox  = floor(x_ + 0.5);
    vec3 a0  = x_ - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x   + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // fBm — 3 octaves (cheap on GPU, silky smooth)
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * snoise(p);
      p  = p * 2.0 + vec2(3.7, 1.9);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Increased safe zone to 16% to fully accommodate the high amplitudes of the "breathing" effect
    float margin = 0.16;
    vec2 safeUV = v_uv * (1.0 - 2.0 * margin) + margin;

    vec2 p  = safeUV * 3.5;          // spatial scale — high freq warp (fine texture detail)
    vec2 p2 = safeUV * 1.2;          // spatial scale — low freq warp (large breathing undulations)
    float t  = u_time * 0.30;      // primary speed
    float t2 = u_time * 0.10;      // secondary breathing: much slower = more organic

    // ── Primary fine-detail warp (like water ripples on skin)
    float dx1 = fbm(p  + vec2(0.0, 0.0) + t);
    float dy1 = fbm(p  + vec2(5.1, 5.1) + t);

    // ── Secondary BIG breathing warp (organ/lung contortion)
    float dx2 = fbm(p2 + vec2(10.0,  0.0) + t2) * 1.4;
    float dy2 = fbm(p2 + vec2( 0.0, 10.0) + t2) * 1.4;

    // ── Tertiary ultra-slow pulse (heartbeat-like global swell)
    float pulse = sin(u_time * 0.18) * 0.012;

    float ampFine    = 0.040;
    float ampBreath  = 0.095;

    vec2 warpedUV = safeUV
      + vec2(dx1, dy1) * ampFine
      + vec2(dx2, dy2) * ampBreath
      + pulse;

    warpedUV = clamp(warpedUV, 0.001, 0.999);
    gl_FragColor = texture2D(u_image, warpedUV);
  }
`;

// ─── WebGL helpers ─────────────────────────────────────────────────────────────
function createShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('Shader error:', gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function createProgram(gl, vert, frag) {
  const p = gl.createProgram();
  gl.attachShader(p, vert);
  gl.attachShader(p, frag);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}

// ─── Component ─────────────────────────────────────────────────────────────────
const PerlinWarpGL = ({ imgSrc }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Compile shaders
    const vert = createShader(gl, gl.VERTEX_SHADER, VERT_SRC);
    const frag = createShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    const program = createProgram(gl, vert, frag);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1,  -1, 1,
      -1,  1,  1, -1,   1, 1,
    ]), gl.STATIC_DRAW);

    const posLoc  = gl.getAttribLocation(program, 'a_position');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const imgLoc  = gl.getUniformLocation(program, 'u_image');

    // Load image as texture
    const texture = gl.createTexture();
    const img = new Image();
    img.crossOrigin = 'anonymous';
    let animId;
    let startTime = null;

    img.onload = () => {
      // Set canvas size to match image aspect at target display width
      const DW = 900;
      const DH = Math.round(DW * img.naturalHeight / img.naturalWidth);
      canvas.width  = DW;
      canvas.height = DH;
      gl.viewport(0, 0, DW, DH);

      // Upload texture
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      const render = (ts) => {
        if (!startTime) startTime = ts;
        const t = (ts - startTime) * 0.001; // seconds

        gl.useProgram(program);

        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(imgLoc, 0);
        gl.uniform1f(timeLoc, t);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        animId = requestAnimationFrame(render);
      };

      animId = requestAnimationFrame(render);
    };

    img.src = imgSrc;

    return () => {
      cancelAnimationFrame(animId);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.deleteBuffer(buf);
      gl.deleteTexture(texture);
    };
  }, [imgSrc]);

  return (
    <div className="relative inline-block w-full max-w-[650px] scale-100 md:scale-110 xl:scale-125 -translate-x-8 md:-translate-x-16 xl:-translate-x-24 flex items-center justify-center mix-blend-screen origin-center">
      <canvas
        ref={canvasRef}
        className="block w-full h-auto rounded-md opacity-90 transition-opacity duration-1000 hover:opacity-100"
      />
      <span className="absolute bottom-6 right-8 text-[10px] tracking-widest text-temporal-muted/30 pointer-events-none select-none font-mono">
        GLSL fBm
      </span>
    </div>
  );
};

export default PerlinWarpGL;
