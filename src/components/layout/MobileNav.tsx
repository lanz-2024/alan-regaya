'use client';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const navTargetRef = useRef<string | null>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (navTargetRef.current !== null) {
      if (navTargetRef.current === pathname) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      navTargetRef.current = null;
    }
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const overlay = open ? (
    <div className="fixed inset-0 top-16 z-50 bg-[#0a0a0a] px-4 pt-8 flex flex-col gap-6 overflow-y-auto">
      <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
        <Link
          href="/about"
          onClick={() => { setOpen(false); navTargetRef.current = '/about'; if (pathname === '/about') window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-2xl font-light text-[var(--color-text)] hover:text-[var(--color-accent-text)] transition-colors"
        >
          About
        </Link>
        <Link
          href="/about#experience"
          onClick={() => setOpen(false)}
          className="text-2xl font-light text-[var(--color-text)] hover:text-[var(--color-accent-text)] transition-colors"
        >
          Experience
        </Link>
        <Link
          href="/projects"
          onClick={() => { setOpen(false); navTargetRef.current = '/projects'; if (pathname === '/projects') window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-2xl font-light text-[var(--color-text)] hover:text-[var(--color-accent-text)] transition-colors"
        >
          Projects
        </Link>
      </nav>
    </div>
  ) : null;

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
      {mounted && createPortal(overlay, document.body)}
    </div>
  );
}
