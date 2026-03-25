import { siteConfig } from '@/data/site-config';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-center text-sm text-[var(--color-text-muted)]">
        <p>© {new Date().getFullYear()} {siteConfig.name}. Built with Next.js &amp; Tailwind.</p>
      </div>
    </footer>
  );
}
