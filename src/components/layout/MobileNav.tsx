'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileNav({ resumeHref, portfolioHref }: { resumeHref: string; portfolioHref: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
      >
        <span className="block w-5 h-0.5 bg-current mb-1.5 transition-all" style={{ transform: open ? 'translateY(8px) rotate(45deg)' : '' }} />
        <span className="block w-5 h-0.5 bg-current mb-1.5 transition-all" style={{ opacity: open ? 0 : 1 }} />
        <span className="block w-5 h-0.5 bg-current transition-all" style={{ transform: open ? 'translateY(-8px) rotate(-45deg)' : '' }} />
      </button>
      {open && (
        <div className="fixed inset-0 top-16 z-30 bg-[var(--color-background)] px-4 pt-8 flex flex-col gap-6">
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {[['/', 'Home'], ['/about', 'About'], ['/projects', 'Projects']].map(([href, label]) => (
              <Link key={href} href={href} className="text-2xl font-light text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 pt-4 border-t border-[var(--color-border)]">
            <a href={resumeHref} target="_blank" rel="noopener noreferrer" className="text-center py-3 border border-[var(--color-border)] rounded text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors">
              Resume
            </a>
            <a href={portfolioHref} target="_blank" rel="noopener noreferrer" className="text-center py-3 bg-[var(--color-accent)] rounded text-white hover:bg-[var(--color-accent-hover)] transition-colors">
              Portfolio
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
