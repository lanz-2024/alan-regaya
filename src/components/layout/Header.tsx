import Link from 'next/link';
import { MobileNav } from './MobileNav';

const aboutSections = [
  { href: '/about#story', label: 'How It Started' },
  { href: '/about#about-me', label: 'About Me' },
  { href: '/about#experience', label: 'Experience' },
  { href: '/about#skills', label: 'Skills' },
  { href: '/about#contributions', label: 'GitHub Activity' },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
          <span className="text-[var(--color-accent-text)]">alan</span>@regaya:~$
        </Link>
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <Link href="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Home</Link>
          <div className="relative group">
            <Link
              href="/about"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-1"
            >
              About
              <svg className="w-3 h-3 transition-transform duration-150 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg py-1.5 shadow-xl min-w-44">
                {aboutSections.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="block px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <Link href="/projects" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Projects</Link>
          <Link href="/contact" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Contact</Link>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
