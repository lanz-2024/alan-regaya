'use client';
import { useEffect, useCallback } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function ImageModal({ src, alt, onClose }: ImageModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 cursor-zoom-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview: ${alt}`}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl font-light leading-none w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        onClick={onClose}
        aria-label="Close preview"
      >
        ×
      </button>

      {/* Image container — stops propagation so clicking image doesn't close */}
      <div
        className="relative max-w-5xl max-h-[90vh] w-full cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={900}
          className="object-contain w-full h-auto max-h-[90vh] rounded-lg shadow-2xl"
          unoptimized
        />
      </div>
    </div>
  );
}
