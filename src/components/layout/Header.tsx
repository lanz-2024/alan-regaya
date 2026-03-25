import Image from 'next/image';
import Link from 'next/link';
import { MobileNav } from './MobileNav';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 grid grid-cols-[auto_1fr_auto] items-center">
        <Link href="/" aria-label="Home">
          <Image
            src="/logo.png"
            alt="AR logo"
            width={36}
            height={36}
            className="h-12 w-12 sm:h-14 sm:w-14"
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8 justify-self-center" aria-label="Main navigation">
          <Link href="/about" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
            About
          </Link>
          <Link href="/about#experience" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
            Experience
          </Link>
          <Link href="/projects" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
            Projects
          </Link>
        </nav>
        <div className="flex items-center gap-3 ml-auto">
          <Link
            href="/contact"
            className="hidden md:inline-flex px-4 py-2 bg-[var(--color-accent)] text-white text-sm rounded hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Get in Touch
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
