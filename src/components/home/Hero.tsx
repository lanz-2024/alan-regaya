import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/site-config';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden pt-20 sm:pt-24 lg:pt-16 pb-8 lg:pb-0" aria-labelledby="hero-heading">
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center pointer-events-none -z-10"
        aria-hidden="true"
      />
      {/* Dark overlay for legibility over the photo */}
      <div className="absolute inset-0 bg-black/70 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[var(--color-background)] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 mb-4 lg:mb-6 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono"
          role="status"
          aria-label={`Availability: ${siteConfig.availability}`}
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          {siteConfig.availability}
        </div>

        <p className="font-mono text-[var(--color-accent-text)] text-sm mb-2 lg:mb-4">Hello, I&apos;m</p>
        <h1 id="hero-heading" className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-3 lg:mb-4">
          {siteConfig.name}
        </h1>
        <p className="text-xl sm:text-2xl text-[var(--color-text-muted)] mb-4 lg:mb-6">{siteConfig.title}</p>

        <p className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto mb-6 lg:mb-10 leading-relaxed">
          I build fast, scalable{' '}
          <Link
            href="/projects"
            className="text-white underline decoration-[var(--color-accent)] decoration-2 underline-offset-4 hover:text-[var(--color-accent-text)] transition-colors"
          >
            headless WooCommerce storefronts, Next.js e-commerce apps, and WordPress platforms
          </Link>
          . Currently powering 7-figure online stores for clients across AU, UK, and US &mdash; based in the Philippines, working remotely.
        </p>

        <div className="flex items-center justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-accent)] text-white rounded hover:bg-[var(--color-accent-hover)] transition-colors font-medium"
          >
            Get in touch
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <a
          href="#stats"
          className="mt-6 lg:mt-12 inline-block animate-bounce text-[var(--color-text-muted)] hover:text-white transition-colors"
          aria-label="Scroll to next section"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </div>
    </section>
  );
}
