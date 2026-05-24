import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site-config';
import { lessons } from '@/data/lessons';
import { buildBreadcrumbList } from '@/lib/seo/breadcrumbs';
import { buildWebPage } from '@/lib/seo/webpage';
import { JsonLd } from '@/components/seo/JsonLd';

const breadcrumbLd = buildBreadcrumbList([{ name: 'Lessons', path: '/lessons' }]);
const webPageLd = buildWebPage({
  path: '/lessons',
  name: `Lessons | ${siteConfig.name}`,
  description: `Short post-mortems from production incidents and design mistakes ${siteConfig.name} has shipped.`,
  type: 'CollectionPage',
});

export const metadata: Metadata = {
  title: 'Lessons',
  description: `Short post-mortems from production incidents and design mistakes ${siteConfig.name} has shipped — context, what was missed, and what changed afterward.`,
  alternates: { canonical: `${siteConfig.url}/lessons` },
  openGraph: {
    title: `Lessons | ${siteConfig.name}`,
    description: `Short post-mortems from production incidents and design mistakes ${siteConfig.name} has shipped.`,
    url: `${siteConfig.url}/lessons`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    title: `Lessons | ${siteConfig.name}`,
    description: `Short post-mortems from production incidents and design mistakes ${siteConfig.name} has shipped.`,
    images: [siteConfig.ogImage],
  },
};

export default function LessonsPage() {
  return (
    <div className="pt-16">
      <JsonLd data={webPageLd} />
      <JsonLd data={breadcrumbLd} />
      <section className="py-20 border-b border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-2">
            Wall of Mistakes
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--color-text)]">Lessons</h1>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Things I&apos;ve shipped, broken, or over-engineered — and what I changed in my process because of
            them. Public because hiding mistakes is how you repeat them, and because the only post-mortems
            worth writing are the ones someone else can read.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
          {lessons.map((l, i) => (
            <article
              key={l.id}
              id={l.id}
              className="scroll-mt-24 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <span className="font-mono text-xs text-[var(--color-text-muted)] tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-xs text-[var(--color-text-muted)]">{l.date}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-[var(--color-text)] leading-snug">
                {l.title}
              </h2>
              <dl className="space-y-5 text-[var(--color-text-muted)] leading-relaxed">
                <div>
                  <dt className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-text)] mb-1">
                    Context
                  </dt>
                  <dd>{l.context}</dd>
                </div>
                <div>
                  <dt className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-text)] mb-1">
                    What happened
                  </dt>
                  <dd>{l.whatHappened}</dd>
                </div>
                <div>
                  <dt className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-text)] mb-1">
                    What I missed
                  </dt>
                  <dd>{l.whatIMissed}</dd>
                </div>
                <div>
                  <dt className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-text)] mb-1">
                    What changed
                  </dt>
                  <dd>{l.whatChanged}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[var(--color-text-muted)] mb-6">
            More context on how I approach this work lives in the principles on the{' '}
            <Link href="/about#principles" className="text-[var(--color-accent-text)] underline underline-offset-2">
              About page
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
