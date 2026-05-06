'use client';
import { useState } from 'react';
import Image from 'next/image';
import { GearItem } from '@/data/gear';
import { ImageModal } from './ImageModal';

const subcategoryColors: Record<string, string> = {
  Compute: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  Peripherals: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
  Display: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5',
  Audio: 'text-green-400 border-green-400/30 bg-green-400/5',
  Network: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
};

export function GearCard({ item }: { item: GearItem }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <article className="glow-border rounded-lg overflow-hidden bg-[var(--color-surface)] flex flex-col">
        {item.image ? (
          <button
            type="button"
            className="group relative aspect-video overflow-hidden bg-[var(--color-surface-2)] cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            onClick={() => setModalOpen(true)}
            aria-label={`View full image: ${item.alt ?? item.name}`}
          >
            <Image
              src={item.image}
              alt={item.alt ?? item.name}
              fill
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-xs font-mono bg-black/60 px-2 py-1 rounded">
                click to expand
              </span>
            </div>
          </button>
        ) : (
          <div className="aspect-video bg-[var(--color-surface-2)] flex items-center justify-center">
            <span className="text-4xl opacity-30" aria-hidden="true">🖥️</span>
          </div>
        )}

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-3 gap-2">
            <h3 className="font-semibold text-[var(--color-text)] leading-snug">{item.name}</h3>
            <span className={`shrink-0 text-xs px-2 py-0.5 rounded border font-mono ${subcategoryColors[item.subcategory]}`}>
              {item.subcategory}
            </span>
          </div>
          <ul className="space-y-1 flex-1 mb-4">
            {item.specs.map((spec) => (
              <li key={spec} className="text-sm text-[var(--color-text-muted)] flex items-start gap-1.5">
                <span className="text-[var(--color-accent-text)] mt-0.5 shrink-0">·</span>
                {spec}
              </li>
            ))}
          </ul>
          {item.link && (
            <div className="pt-2 border-t border-[var(--color-border)]">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-accent-text)] hover:underline"
              >
                View speedtest result ↗
              </a>
            </div>
          )}
        </div>
      </article>

      {modalOpen && item.image && (
        <ImageModal
          src={item.image}
          alt={item.alt ?? item.name}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
