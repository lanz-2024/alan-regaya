'use client';
import { useState } from 'react';
import { PdfModal } from '@/components/shared/PdfModal';

export function HeaderPdfButtons({ resumeHref, portfolioHref }: { resumeHref: string; portfolioHref: string }) {
  const [modal, setModal] = useState<{ src: string; title: string } | null>(null);

  return (
    <>
      <button
        onClick={() => setModal({ src: resumeHref, title: 'Resume — Alan Regaya' })}
        className="text-sm px-4 py-1.5 rounded border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors"
      >
        Resume
      </button>
      <button
        onClick={() => setModal({ src: portfolioHref, title: 'Portfolio — Alan Regaya' })}
        className="text-sm px-4 py-1.5 rounded border bg-[var(--color-accent)] border-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors"
      >
        Portfolio
      </button>
      {modal && <PdfModal src={modal.src} title={modal.title} onClose={() => setModal(null)} />}
    </>
  );
}
