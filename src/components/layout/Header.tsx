'use client';
import { useEffect, useState } from 'react';
import { PictureImage } from '@/components/shared/PictureImage';
import Link from 'next/link';
import { MobileNav } from './MobileNav';
import { NavLinks } from './NavLinks';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="fixed top-0 left-0 right-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200 border-b border-transparent data-[scrolled]:border-[var(--color-border)] data-[scrolled]:bg-[var(--color-background)]/85 data-[scrolled]:backdrop-blur-sm"
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-16 grid grid-cols-[1fr_auto_1fr] items-center gap-6">
        <div className="flex items-center gap-3 justify-self-start">
          <MobileNav />
          <Link
            href="/"
            aria-label="Alan Regaya — home"
            className="hidden md:flex items-center"
          >
            <PictureImage
              src="/logo.webp"
              alt="Alan Regaya"
              width={72}
              height={72}
              className="h-9 w-9"
              priority
            />
          </Link>
        </div>
        <Link
          href="/"
          aria-label="Alan Regaya — home"
          className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center"
        >
          <PictureImage
            src="/logo.webp"
            alt="Alan Regaya"
            width={72}
            height={72}
            className="h-9 w-9"
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center justify-center gap-6 justify-self-center" aria-label="Main navigation">
          <NavLinks />
        </nav>
        <div className="col-start-3 flex items-center justify-end justify-self-end">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center px-4 py-2 bg-[var(--color-accent)] text-white text-sm font-medium rounded hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Get in Touch
          </Link>
          <Link
            href="/contact"
            aria-label="Contact"
            className="sm:hidden py-2 pl-2 pr-0 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ transform: 'translateX(4px)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
