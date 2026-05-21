import Image from 'next/image';
import Link from 'next/link';
import { MobileNav } from './MobileNav';
import { NavLinks } from './NavLinks';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 grid grid-cols-[auto_1fr_auto] items-center">
        <MobileNav />
        <Link href="/" aria-label="Home" className="justify-self-center md:justify-self-start">
          <Image
            src="/logo.webp"
            alt="AR logo"
            width={128}
            height={128}
            className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16"
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8 justify-self-center" aria-label="Main navigation">
          <NavLinks />
        </nav>
        <div className="flex items-center">
          {/* Mobile (<640px): envelope icon */}
          <Link
            href="/contact"
            aria-label="Get in Touch"
            className="sm:hidden p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </Link>
          {/* Tablet (640–767px) + Desktop (768px+): "Get in Touch" text */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex px-4 py-2 bg-[var(--color-accent)] text-white text-sm rounded hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </header>
  );
}
