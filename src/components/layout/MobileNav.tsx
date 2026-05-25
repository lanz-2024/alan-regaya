'use client';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const primaryLinks = [
  { href: '/about', label: 'About', scroll: true },
  { href: '/projects', label: 'Projects', scroll: true },
  { href: '/blog', label: 'Blog', scroll: true },
  { href: '/setup', label: 'Setup', scroll: true },
  { href: '/services', label: 'Services', scroll: true },
  { href: '/contact', label: 'Contact', scroll: true },
];

const moreLinks = [
  { href: '/about#experience', label: 'Experience', scroll: false },
  { href: '/faq', label: 'FAQ', scroll: true },
  { href: '/proof', label: 'Proof', scroll: true },
  { href: '/lessons', label: 'Lessons', scroll: true },
  { href: '/now', label: 'Now', scroll: true },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const navTargetRef = useRef<string | null>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);
  // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const renderLink = (link: { href: string; label: string; scroll: boolean }, i: number, size: 'lg' | 'sm') => {
    const isActive = pathname === link.href || (link.href !== '/' && !link.href.includes('#') && pathname.startsWith(link.href + '/'));
    return (
      <Link
        key={link.href}
        href={link.href}
        aria-current={isActive ? 'page' : undefined}
        onClick={() => {
          setOpen(false);
          if (link.scroll) {
            navTargetRef.current = link.href;
            if (pathname === link.href) window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        className={`${
          size === 'lg' ? 'text-2xl font-light' : 'text-base'
        } transition-colors ${
          isActive
            ? 'text-[var(--color-accent-text)]'
            : 'text-[var(--color-text)] hover:text-[var(--color-accent-text)]'
        }`}
        style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}
      >
        {link.label}
      </Link>
    );
  };

  const overlay = (
    <div
      className={`fixed inset-0 top-16 z-50 bg-[#0a0a0a] px-4 pt-8 pb-12 flex flex-col gap-8 overflow-y-auto transition-all duration-300 ease-in-out ${
        open ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-full opacity-0 pointer-events-none'
      }`}
    >
      <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
        {primaryLinks.map((link, i) => renderLink(link, i, 'lg'))}
      </nav>
      <div className="border-t border-[var(--color-border)] pt-6">
        <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-4">More</p>
        <nav className="flex flex-col gap-3" aria-label="Secondary navigation">
          {moreLinks.map((link, i) => renderLink(link, i + primaryLinks.length, 'sm'))}
        </nav>
      </div>
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
