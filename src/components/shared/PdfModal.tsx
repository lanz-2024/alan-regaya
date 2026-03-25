'use client';
import { useEffect, useRef } from 'react';

export function PdfModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 w-full h-full max-w-none max-h-none bg-transparent p-0 m-0"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      aria-label={title}
    >
      <div className="w-full h-full flex flex-col bg-[var(--color-background)]">
        <div className="flex items-center justify-between px-4 sm:px-6 h-14 border-b border-[var(--color-border)] shrink-0">
          <h2 className="text-sm font-medium text-[var(--color-text)]">{title}</h2>
          <div className="flex items-center gap-3">
            <a href={src} download className="text-sm px-3 py-1.5 border border-[var(--color-border)] rounded text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors">
              Download
            </a>
            <button onClick={onClose} className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors" aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <object
            data={src}
            type="application/pdf"
            className="w-full h-full"
            aria-label={title}
          >
            <div className="flex flex-col items-center justify-center h-full gap-4 text-[var(--color-text-muted)]">
              <p>PDF preview not supported in this browser.</p>
              <a href={src} download className="px-4 py-2 bg-[var(--color-accent)] text-white rounded hover:bg-[var(--color-accent-hover)] transition-colors">
                Download PDF
              </a>
            </div>
          </object>
        </div>
      </div>
    </dialog>
  );
}
