import Link from 'next/link';
import { siteConfig } from '@/data/site-config';

const siteLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/setup', label: 'Setup' },
  { href: '/now', label: 'Now' },
  { href: '/about#experience', label: 'Experience' },
];

const writingLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/lessons', label: 'Lessons' },
  { href: '/proof', label: 'Proof' },
  { href: '/faq', label: 'FAQ' },
  { href: '/feed.xml', label: 'RSS', external: true },
];

const headingClass = 'text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-4';
const linkClass = 'text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors';

export function Footer() {
  const connectLinks = [
    { href: siteConfig.github, label: 'GitHub' },
    { href: siteConfig.linkedin, label: 'LinkedIn' },
    { href: `mailto:${siteConfig.email}`, label: 'Email' },
  ];

  return (
    <footer className="mt-24 border-t border-[var(--color-border)]">
      <section
        aria-labelledby="footer-cta"
        className="border-b border-[var(--color-border)]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="footer-cta" className="text-2xl sm:text-3xl font-light text-[var(--color-text)]">
              Let&apos;s build something.
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {siteConfig.availability} — {siteConfig.location}.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center px-5 py-3 bg-[var(--color-accent)] text-white text-sm font-medium rounded hover:bg-[var(--color-accent-hover)] transition-colors whitespace-nowrap"
          >
            Get in Touch →
          </Link>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-lg font-medium text-[var(--color-text)]">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-xs">
              {siteConfig.tagline}
            </p>
          </div>

          <nav aria-labelledby="footer-site">
            <h3 id="footer-site" className={headingClass}>Site</h3>
            <ul className="flex flex-col gap-2">
              {siteLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className={linkClass}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-writing">
            <h3 id="footer-writing" className={headingClass}>Writing</h3>
            <ul className="flex flex-col gap-2">
              {writingLinks.map((l) =>
                l.external ? (
                  <li key={l.href}><a href={l.href} className={linkClass}>{l.label}</a></li>
                ) : (
                  <li key={l.href}><Link href={l.href} className={linkClass}>{l.label}</Link></li>
                )
              )}
            </ul>
          </nav>

          <nav aria-labelledby="footer-connect">
            <h3 id="footer-connect" className={headingClass}>Connect</h3>
            <ul className="flex flex-col gap-2">
              {connectLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={linkClass}
                    {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col items-center gap-2 text-xs text-[var(--color-text-muted)] sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Built with Next.js &amp; Tailwind.</p>
          <Link href="/privacy" className="hover:text-[var(--color-text)] transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
