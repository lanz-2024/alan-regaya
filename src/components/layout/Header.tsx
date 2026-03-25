import Link from 'next/link';
import { MobileNav } from './MobileNav';
import { siteConfig } from '@/data/site-config';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
          <span className="text-[var(--color-accent)]">alan</span>@regaya:~$
        </Link>
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <Link href="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Home</Link>
          <Link href="/about" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">About</Link>
          <Link href="/projects" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">Projects</Link>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <ResumeButton href={siteConfig.resumePdf} label="Resume" />
          <ResumeButton href={siteConfig.portfolioPdf} label="Portfolio" primary />
        </div>
        <MobileNav resumeHref={siteConfig.resumePdf} portfolioHref={siteConfig.portfolioPdf} />
      </div>
    </header>
  );
}

function ResumeButton({ href, label, primary }: { href: string; label: string; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-sm px-4 py-1.5 rounded border transition-colors ${
        primary
          ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]'
          : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)]'
      }`}
    >
      {label}
    </a>
  );
}
