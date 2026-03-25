import Link from 'next/link';
import { siteConfig } from '@/data/site-config';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden pt-16" aria-labelledby="hero-heading">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-[var(--color-background)] to-[var(--color-background)] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="font-mono text-[var(--color-accent-text)] text-sm mb-6">Hello, I&apos;m</p>
        <h1 id="hero-heading" className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">
          {siteConfig.name}
        </h1>
        <p className="text-xl sm:text-2xl text-[var(--color-text-muted)] mb-3">{siteConfig.title}</p>
        <p className="text-[var(--color-text-muted)] max-w-xl mx-auto mb-10 leading-relaxed">{siteConfig.tagline}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/projects"
            className="w-full sm:w-auto px-8 py-3.5 bg-[var(--color-accent)] text-white rounded hover:bg-[var(--color-accent-hover)] transition-colors font-medium"
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
