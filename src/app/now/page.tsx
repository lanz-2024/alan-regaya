import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site-config';
import { nowUpdated, nowBuilding, nowLearning, nowReading, nowOff, NowEntry } from '@/data/now';
import { buildBreadcrumbList } from '@/lib/seo/breadcrumbs';
import { buildWebPage } from '@/lib/seo/webpage';

const breadcrumbLd = buildBreadcrumbList([{ name: 'Now', path: '/now' }]);
const webPageLd = buildWebPage({
  path: '/now',
  name: `Now | ${siteConfig.name}`,
  description: `What ${siteConfig.name} is currently building, learning, and reading.`,
});

export const metadata: Metadata = {
  title: 'Now',
  description: `What ${siteConfig.name} is currently building, learning, and reading. A /now page in the nownownow.com tradition.`,
  alternates: { canonical: `${siteConfig.url}/now` },
  openGraph: {
    title: `Now | ${siteConfig.name}`,
    description: `What ${siteConfig.name} is currently building, learning, and reading.`,
    url: `${siteConfig.url}/now`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    title: `Now | ${siteConfig.name}`,
    description: `What ${siteConfig.name} is currently building, learning, and reading.`,
    images: [siteConfig.ogImage],
  },
};

function EntryList({ items }: { items: NowEntry[] }) {
  return (
    <ul className="space-y-2.5 text-[var(--color-text-muted)] leading-relaxed">
      {items.map((item) => (
        <li key={item.text} className="flex gap-3">
          <span aria-hidden className="text-[var(--color-text-muted)] mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-text)]" />
          <span>
            {item.href ? (
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-[var(--color-text)] hover:text-[var(--color-accent-text)] underline underline-offset-2 transition-colors"
              >
                {item.text}
              </a>
            ) : (
              item.text
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function NowPage() {
  const formatted = new Date(nowUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <section className="py-20 border-b border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-2">
            Now
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--color-text)]">What I&apos;m doing now</h1>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            A snapshot of what has my attention this month — in the tradition of{' '}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent-text)] underline underline-offset-2"
            >
              /now pages
            </a>
            . Updated when things change, not on a fixed schedule.
          </p>
          <p className="mt-4 text-xs font-mono text-[var(--color-text-muted)]">
            Last updated: {formatted}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-text)]">Building</h2>
            <EntryList items={nowBuilding} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-text)]">Learning</h2>
            <EntryList items={nowLearning} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-text)]">Reading &amp; Following</h2>
            <EntryList items={nowReading} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-text)]">Off-keyboard</h2>
            <EntryList items={nowOff} />
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[var(--color-text-muted)] mb-6">
            Want the longer view? The{' '}
            <Link href="/about" className="text-[var(--color-accent-text)] underline underline-offset-2">
              About page
            </Link>{' '}
            covers background and the{' '}
            <Link href="/projects" className="text-[var(--color-accent-text)] underline underline-offset-2">
              Projects page
            </Link>{' '}
            covers shipped work.
          </p>
        </div>
      </section>
    </div>
  );
}
