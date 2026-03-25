import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${siteConfig.name} — open to senior and lead full-stack roles, headless e-commerce projects, and open-source collaboration.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name} — open to senior and lead full-stack roles, headless e-commerce projects, and open-source collaboration.`,
    url: `${siteConfig.url}/contact`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    title: `Contact | ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name} — open to senior and lead full-stack roles, headless e-commerce projects, and open-source collaboration.`,
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

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24">
          <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-2">Get in Touch</p>
          <h1 className="text-4xl font-bold mb-4">Let&apos;s work together</h1>
          <p className="text-[var(--color-text-muted)] mb-12 text-lg leading-relaxed">
            {siteConfig.availability}. I&apos;m particularly interested in headless e-commerce, performance-critical Next.js apps, and projects that push modern web capabilities.
          </p>

          <div className="md:grid md:grid-cols-[1fr_2fr] md:gap-12">
            {/* Sidebar — info cards */}
            <div className="space-y-4 mb-12 md:mb-0 text-sm">
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4">
                <p className="text-[var(--color-text-muted)] mb-1">Response time</p>
                <p className="font-medium">1–2 business days</p>
              </div>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4">
                <p className="text-[var(--color-text-muted)] mb-1">Location</p>
                <p className="font-medium">{siteConfig.location}</p>
              </div>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4">
                <p className="text-[var(--color-text-muted)] mb-1">Availability</p>
                <p className="font-medium">Open to opportunities</p>
              </div>
              <div className="pt-4 border-t border-[var(--color-border)] flex flex-col gap-3">
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                  GitHub ↗
                </a>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                  LinkedIn ↗
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
