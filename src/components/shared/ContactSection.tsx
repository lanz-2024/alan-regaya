import Link from 'next/link';
import { siteConfig } from '@/data/site-config';

export function ContactSection() {
  return (
    <section className="py-24 border-t border-[var(--color-border)]" aria-labelledby="contact-heading">
      <div className="max-w-2xl mx-auto text-center px-4 sm:px-6">
        <p className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-widest mb-4">Get in Touch</p>
        <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold mb-4">Let&apos;s work together</h2>
        <p className="text-[var(--color-text-muted)] mb-8">
          {siteConfig.availability}. I&apos;m particularly interested in headless e-commerce, performance-critical Next.js apps, and projects that push modern web capabilities.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 bg-[var(--color-accent)] text-white rounded hover:bg-[var(--color-accent-hover)] transition-colors font-medium"
          >
            Get in touch
          </Link>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-muted)] rounded hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-muted)] rounded hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors"
          >
            LinkedIn
          </a>
        </div>
        <p className="mt-6 text-sm text-[var(--color-text-muted)]">{siteConfig.location}</p>
      </div>
    </section>
  );
}
