import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site-config';
import { faqCategories } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'FAQ',
  description: `Answers to common questions about ${siteConfig.name} — background, experience, tech stack, work style, and availability.`,
  alternates: { canonical: `${siteConfig.url}/faq` },
  openGraph: {
    title: `FAQ | ${siteConfig.name}`,
    description: `Common questions about ${siteConfig.name} — background, experience, stack, and how I work.`,
    url: `${siteConfig.url}/faq`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    title: `FAQ | ${siteConfig.name}`,
    description: `Common questions about ${siteConfig.name} — background, experience, stack, and how I work.`,
    images: [siteConfig.ogImage],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqCategories.flatMap((cat) =>
    cat.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  ),
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pt-16">
        <section className="py-20 border-b border-[var(--color-border)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-2">
              Frequently Asked
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--color-text)]">Questions &amp; Answers</h1>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              A consolidated answer set to the questions I most often get asked — about my background, stack,
              projects, and how I work. If something isn&apos;t covered here, the{' '}
              <Link href="/contact" className="text-[var(--color-accent-text)] underline underline-offset-2">
                contact page
              </Link>{' '}
              is the fastest way to ask.
            </p>
            <nav aria-label="FAQ categories" className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {faqCategories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-text)] transition-colors"
                >
                  {cat.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-16">
            {faqCategories.map((cat) => (
              <div key={cat.id} id={cat.id} className="scroll-mt-24">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-text)]">{cat.title}</h2>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[var(--color-text)] font-medium hover:text-[var(--color-accent-text)] transition-colors">
                        <span>{item.q}</span>
                        <span
                          aria-hidden
                          className="text-[var(--color-text-muted)] transition-transform duration-200 group-open:rotate-45 text-xl leading-none"
                        >
                          +
                        </span>
                      </summary>
                      <div className="px-5 pb-5 text-[var(--color-text-muted)] leading-relaxed">{item.a}</div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl font-bold mb-3 text-[var(--color-text)]">Didn&apos;t find your answer?</h2>
            <p className="text-[var(--color-text-muted)] mb-6">
              Happy to answer specifics over email — usually within a day or two.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-md bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-medium transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
