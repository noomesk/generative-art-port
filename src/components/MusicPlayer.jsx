import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { tracks } from '../data/music';

const pad = (n) => String(Math.floor(n)).padStart(2, '0');
const formatTime = (s) => (Number.isFinite(s) ? `${pad(s / 60)}:${pad(s % 60)}` : '--:--');

const MusicPlayer = () => {
  const audioRef = useRef(null);
  // Indica si el usuario quiere que suene (no cambia al terminar una pista)
  const wantsPlayRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const track = tracks[index];
  const hasTracks = tracks.length > 0;

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume, hasTracks]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    setError(false);
    audio.load();
    // Solo reproduce la nueva pista si el usuario ya había dado play
    if (wantsPlayRef.current) {
      audio.play().catch(() => {
        wantsPlayRef.current = false;
        setPlaying(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    if (playing) {
      wantsPlayRef.current = false;
      audio.pause();
      setPlaying(false);
    } else {
      wantsPlayRef.current = true;
      audio.play().then(() => setPlaying(true)).catch(() => setError(true));
    }
  };

  const go = (dir) => {
    if (!hasTracks) return;
    setIndex((i) => (i + dir + tracks.length) % tracks.length);
  };

  const progress = duration ? (current / duration) * 100 : 0;

  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  return (
    <div
      className="w-full mt-12 pt-6 px-4 pb-4 bg-[#0a0a0a] relative select-none"
      style={{ transform: 'rotate(3deg)' }}
    >
      {/* Filtro de humo para el borde: ruido animado que desplaza los píxeles del marco */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="edge-smoke" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise">
            <animate attributeName="baseFrequency" values="0.035;0.05;0.035" dur="9s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Marco con distorsión: capa separada para que solo el borde se mueva, no el contenido */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-temporal-border/40"
        style={{ filter: 'url(#edge-smoke)' }}
      />

      {/* Grano analógico: ruido SVG superpuesto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative grayscale font-mono text-temporal-muted">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={!hasTracks}
            aria-label="Pista anterior"
            className="p-2 hover:text-temporal-text disabled:opacity-30 transition-colors cursor-pointer"
          >
            <SkipBack size={14} />
          </button>
          <button
            type="button"
            onClick={toggle}
            disabled={!hasTracks}
            aria-label={playing ? 'Pausar' : 'Reproducir'}
            className="p-2 border border-temporal-border hover:border-temporal-muted hover:text-temporal-text disabled:opacity-30 transition-colors cursor-pointer"
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={!hasTracks}
            aria-label="Pista siguiente"
            className="p-2 hover:text-temporal-text disabled:opacity-30 transition-colors cursor-pointer"
          >
            <SkipForward size={14} />
          </button>

          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-[0.2em] truncate">
              {!hasTracks
                ? 'Sin pistas'
                : error
                  ? 'Archivo no disponible'
                  : track.artist
                    ? `${track.title} — ${track.artist}`
                    : track.title}
            </div>
            <div
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              onClick={seek}
              className="mt-2 h-px w-full bg-temporal-border cursor-pointer relative"
            >
              <div
                className="absolute left-0 top-0 h-px bg-temporal-muted transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <span className="text-[10px] tabular-nums tracking-[0.1em] hidden sm:inline">
            {formatTime(current)} / {formatTime(duration)}
          </span>

          <label className="hidden sm:flex items-center gap-2 text-temporal-muted/70 hover:text-temporal-text transition-colors">
            <Volume2 size={12} aria-hidden="true" />
            <span className="sr-only">Volumen</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-16 h-px appearance-none bg-temporal-border cursor-pointer accent-temporal-muted"
            />
          </label>
        </div>
      </div>

      {hasTracks && (
        <audio
          ref={audioRef}
          src={track.src}
          preload="none"
          onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => go(1)}
          onPause={() => {
            // Al terminar una pista el navegador también dispara pause; no lo tomamos como pausa del usuario
            if (!audioRef.current?.ended) setPlaying(false);
          }}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

export default MusicPlayer;
