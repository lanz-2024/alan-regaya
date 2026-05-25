'use client';
import { useEffect, useCallback, useRef, useState } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const STEP = 0.25;

export function ImageModal({ src, alt, onClose }: ImageModalProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const draggingRef = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(null);
  const pinchRef = useRef<{ startDist: number; startZoom: number } | null>(null);

  const reset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === '+' || e.key === '=') setZoom((z) => clampZoom(z + STEP));
      else if (e.key === '-' || e.key === '_') setZoom((z) => clampZoom(z - STEP));
      else if (e.key === '0') reset();
    },
    [onClose, reset]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  // Pan only applies when zoomed in; resetting to 1× effectively recenters via this guard.
  const effectivePan = zoom > 1 ? pan : { x: 0, y: 0 };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => clampZoom(z + (-e.deltaY * 0.002)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    draggingRef.current = { startX: e.clientX, startY: e.clientY, baseX: pan.x, baseY: pan.y };
    setIsInteracting(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = draggingRef.current;
    if (!d) return;
    setPan({ x: d.baseX + (e.clientX - d.startX), y: d.baseY + (e.clientY - d.startY) });
  };
  const onPointerUp = () => {
    draggingRef.current = null;
    if (!pinchRef.current) setIsInteracting(false);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchRef.current = { startDist: Math.hypot(dx, dy), startZoom: zoom };
      setIsInteracting(true);
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const next = pinchRef.current.startZoom * (dist / pinchRef.current.startDist);
      setZoom(clampZoom(next));
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      pinchRef.current = null;
      if (!draggingRef.current) setIsInteracting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 ${zoom === 1 ? 'cursor-zoom-out' : ''}`}
      onClick={zoom === 1 ? onClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview: ${alt}`}
    >
      <button
        className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl font-light leading-none w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close preview"
      >
        ×
      </button>

      <div
        className="relative max-w-5xl max-h-[90vh] w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'none', cursor: zoom > 1 ? (isInteracting ? 'grabbing' : 'grab') : 'default' }}
      >
        <div
          style={{
            transform: `translate(${effectivePan.x}px, ${effectivePan.y}px) scale(${zoom})`,
            transformOrigin: 'center',
            transition: isInteracting ? 'none' : 'transform 120ms ease-out',
            willChange: 'transform',
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={900}
            className="object-contain w-full h-auto max-h-[90vh] rounded-lg shadow-2xl select-none pointer-events-none"
            draggable={false}
            unoptimized
          />
        </div>
      </div>

      <div
        role="group"
        aria-label="Zoom controls"
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white"
      >
        <button
          type="button"
          onClick={() => setZoom((z) => clampZoom(z - STEP))}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Zoom out"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed text-lg leading-none"
        >
          −
        </button>
        <input
          type="range"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(clampZoom(Number(e.target.value)))}
          aria-label="Zoom level"
          aria-valuetext={`${Math.round(zoom * 100)}%`}
          className="w-32 sm:w-48 accent-[var(--color-accent)]"
        />
        <button
          type="button"
          onClick={() => setZoom((z) => clampZoom(z + STEP))}
          disabled={zoom >= MAX_ZOOM}
          aria-label="Zoom in"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed text-lg leading-none"
        >
          +
        </button>
        <span className="text-xs font-mono tabular-nums w-10 text-center text-white/70">
          {Math.round(zoom * 100)}%
        </span>
        {zoom > 1 && (
          <button
            type="button"
            onClick={reset}
            aria-label="Reset zoom"
            className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 hover:bg-white/10"
          >
            1:1
          </button>
        )}
      </div>
    </div>
  );
}
