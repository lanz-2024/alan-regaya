import Link from 'next/link';
import { siteConfig } from '@/data/site-config';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-sm text-[var(--color-text-muted)]">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-center">© {new Date().getFullYear()} {siteConfig.name}. Built with Next.js &amp; Tailwind.</p>
          <Link href="/privacy" className="hover:text-[var(--color-text)] transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
