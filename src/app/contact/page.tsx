import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { siteConfig } from '@/data/site-config';
import { buildBreadcrumbList } from '@/lib/seo/breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${siteConfig.name} — available for full-stack roles, headless WooCommerce builds, WordPress and Next.js development, and performance optimization. Based in the Philippines, working remotely with AU, UK, and US clients.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name} — available for full-stack roles, headless WooCommerce builds, WordPress and Next.js development, and performance optimization. Based in the Philippines, working remotely with AU, UK, and US clients.`,
    url: `${siteConfig.url}/contact`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    title: `Contact | ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name} — available for full-stack roles, headless WooCommerce builds, WordPress and Next.js development, and performance optimization. Based in the Philippines, working remotely with AU, UK, and US clients.`,
    images: [siteConfig.ogImage],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Contact ${siteConfig.name}`,
  url: `${siteConfig.url}/contact`,
  mainEntity: { '@id': `${siteConfig.url}/#person` },
};

const breadcrumbLd = buildBreadcrumbList([{ name: 'Contact', path: '/contact' }]);

export default function ContactPage() {
  return (
    <>
      <link rel="preconnect" href="https://challenges.cloudflare.com" crossOrigin="anonymous" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24">
          <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-2">Get in Touch</p>
          <h1 className="text-4xl font-bold mb-4">Let&apos;s work together</h1>
          <p className="text-[var(--color-text-muted)] mb-8 text-lg leading-relaxed">
            {siteConfig.availability}. Currently powering 7-figure online stores for clients across AU, UK, and US &mdash; based in the Philippines, working remotely.
          </p>

          <ul className="flex flex-wrap gap-2 mb-12" aria-label="Services">
            {[
              'Headless WooCommerce',
              'Next.js e-commerce',
              'WordPress development',
              'Performance optimization',
              'Core Web Vitals',
              'Open-source collaboration',
            ].map((service) => (
              <li
                key={service}
                className="text-xs font-mono px-3 py-1 rounded border border-[var(--color-border)] text-[var(--color-text-muted)]"
              >
                {service}
              </li>
            ))}
          </ul>

          <div className="md:grid md:grid-cols-[1fr_2fr] md:gap-12">
            {/* Sidebar — info cards */}
            <div className="space-y-4 mb-12 md:mb-0 text-sm">
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4">
                <p className="text-[var(--color-text-muted)] mb-1">Response time</p>
                <p className="font-medium">1&ndash;2 business days</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">PHT &middot; UTC+8</p>
              </div>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4">
                <p className="text-[var(--color-text-muted)] mb-1">Location</p>
                <p className="font-medium">{siteConfig.location}</p>
              </div>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4">
                <p className="text-[var(--color-text-muted)] mb-1">Availability</p>
                <p className="font-medium">{siteConfig.availability}</p>
              </div>
              <div className="pt-4 border-t border-[var(--color-border)] flex gap-4">
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Main column — form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
