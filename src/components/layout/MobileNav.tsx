'use client';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/about', label: 'About', scroll: true },
  { href: '/about#experience', label: 'Experience', scroll: false },
  { href: '/projects', label: 'Projects', scroll: true },
];

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

  const overlay = (
    <div
      className={`fixed inset-0 top-16 z-50 bg-[#0a0a0a] px-4 pt-8 flex flex-col gap-6 overflow-y-auto transition-all duration-300 ease-in-out ${
        open ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-full opacity-0 pointer-events-none'
      }`}
    >
      <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
        {navLinks.map(({ href, label, scroll }, i) => (
          <Link
            key={href}
            href={href}
            onClick={() => {
              setOpen(false);
              if (scroll) {
                navTargetRef.current = href;
                if (pathname === href) window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="text-2xl font-light text-[var(--color-text)] hover:text-[var(--color-accent-text)] transition-colors"
            style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
      >
        <span className={`block w-5 h-0.5 bg-current mb-1.5 transition-all duration-300 ease-in-out${open ? ' translate-y-2 rotate-45' : ''}`} />
        <span className={`block w-5 h-0.5 bg-current mb-1.5 transition-all duration-300 ease-in-out${open ? ' opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ease-in-out${open ? ' -translate-y-2 -rotate-45' : ''}`} />
      </button>
      {mounted && createPortal(overlay, document.body)}
    </div>
  );
}
