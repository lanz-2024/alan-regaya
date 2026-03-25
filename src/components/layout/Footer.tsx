import Link from 'next/link';
import { siteConfig } from '@/data/site-config';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
        <p>© {new Date().getFullYear()} {siteConfig.name}. Built with Next.js &amp; Tailwind.</p>
        <div className="flex items-center gap-6">
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text)] transition-colors">GitHub</a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text)] transition-colors">LinkedIn</a>
          <Link href="/contact" className="hover:text-[var(--color-text)] transition-colors">Contact</Link>
          <Link href="/projects" className="hover:text-[var(--color-text)] transition-colors">Projects</Link>
        </div>
      </div>
    </footer>
  );
}
