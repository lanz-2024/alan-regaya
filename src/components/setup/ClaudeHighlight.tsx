'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/shared/Badge';
import { ImageModal } from './ImageModal';

const CLAUDE_IMG = '/setup/claude-cli.webp';
const CLAUDE_ALT = 'Claude CLI terminal session — Opus 4.7 plan mode, status bar, usage stats';

const capabilities = [
  'workflow automation',
  'CI/CD',
  'documentation',
  'e2e testing',
  'regression',
  'edge cases',
  'security',
  'performance',
  'migrations',
  'MCPs',
  'agents',
];

export function ClaudeHighlight() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]" aria-label="Claude CLI highlight">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-2">AI workflow</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-6">
          AI-Assisted Development with Claude CLI
        </h2>
        <div className="glow-border rounded-lg overflow-hidden bg-[var(--color-background)]">
          {/* Desktop: hover pan-reveal. Mobile/tablet: tap to open zoom modal. */}
          <div className="group relative aspect-video overflow-hidden bg-[var(--color-surface-2)] cursor-zoom-in">
            <Image
              src={CLAUDE_IMG}
              alt={CLAUDE_ALT}
              fill
              priority
              className="object-cover object-top [transition:object-position_3s_ease-in-out] lg:group-hover:object-bottom"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1152px"
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500 lg:group-hover:opacity-0 pointer-events-none" />
            <span className="hidden lg:inline absolute bottom-3 right-4 text-xs font-mono text-white/50 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none select-none">
              hover to reveal ↓
            </span>
            <span className="lg:hidden absolute bottom-3 right-4 text-xs font-mono text-white/60 pointer-events-none select-none">
              tap to zoom
            </span>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              aria-label={`View full image: ${CLAUDE_ALT}`}
              className="absolute inset-0 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-6 max-w-3xl">
              Claude CLI is my primary tool for AI-assisted development — driving workflow automation, CI/CD pipelines,
              documentation, e2e/regression/edge-case testing, security and performance testing, migrations, custom
              skills, MCPs, and agent orchestration.
            </p>
            <div className="flex flex-wrap gap-2">
              {capabilities.map((cap) => (
                <Badge key={cap} label={cap} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <ImageModal src={CLAUDE_IMG} alt={CLAUDE_ALT} onClose={() => setModalOpen(false)} />
      )}
    </section>
  );
}
