import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/site-config';

const siteLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
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
const linkClass = 'text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors inline-flex items-center gap-2';
const iconClass = 'w-4 h-4 flex-shrink-0';

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export function Footer() {
  const connectLinks = [
    { href: siteConfig.github, label: 'GitHub', icon: <GitHubIcon /> },
    { href: siteConfig.linkedin, label: 'LinkedIn', icon: <LinkedInIcon /> },
    { href: '/contact', label: 'Contact', icon: <EmailIcon /> },
  ];

  return (
    <footer className="mt-24 border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1 text-center md:text-left">
            <Link href="/" aria-label="Alan Regaya — home" className="flex md:inline-flex justify-center md:justify-start items-center gap-3">
              <Image
                src="/logo.webp"
                alt=""
                width={80}
                height={80}
                className="h-10 w-10"
              />
              <span className="text-lg font-medium text-[var(--color-text)]">{siteConfig.name}</span>
            </Link>
            <p className="mt-3 text-sm text-[var(--color-text-muted)] max-w-xs mx-auto md:mx-0">
              {siteConfig.tagline}
            </p>
          </div>

          <nav aria-labelledby="footer-site" className="text-center md:text-left">
            <h3 id="footer-site" className={headingClass}>Site</h3>
            <ul className="flex flex-col gap-2 items-center md:items-start">
              {siteLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className={linkClass}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-writing" className="text-center md:text-left">
            <h3 id="footer-writing" className={headingClass}>Writing</h3>
            <ul className="flex flex-col gap-2 items-center md:items-start">
              {writingLinks.map((l) =>
                l.external ? (
                  <li key={l.href}><a href={l.href} className={linkClass}>{l.label}</a></li>
                ) : (
                  <li key={l.href}><Link href={l.href} className={linkClass}>{l.label}</Link></li>
                )
              )}
            </ul>
          </nav>

          <nav aria-labelledby="footer-connect" className="text-center md:text-left">
            <h3 id="footer-connect" className={headingClass}>Connect</h3>
            <ul className="flex flex-col gap-2 items-center md:items-start">
              {connectLinks.map((l) =>
                l.href.startsWith('http') ? (
                  <li key={l.href}>
                    <a href={l.href} className={linkClass} target="_blank" rel="noopener noreferrer">
                      {l.icon}
                      <span>{l.label}</span>
                    </a>
                  </li>
                ) : (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.icon}
                      <span>{l.label}</span>
                    </Link>
                  </li>
                )
              )}
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
