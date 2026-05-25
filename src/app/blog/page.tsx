import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';
import { siteConfig } from '@/data/site-config';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { ContactSection } from '@/components/shared/ContactSection';
import { buildBreadcrumbList } from '@/lib/seo/breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAllTags } from '@/lib/blog-tags';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical writing on Next.js, WordPress, WooCommerce performance, migrations, and AI-augmented development workflows.',
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: 'Technical writing on Next.js, WordPress, WooCommerce performance, migrations, and AI-augmented development workflows.',
    url: `${siteConfig.url}/blog`,
  },
  alternates: {
    canonical: `${siteConfig.url}/blog`,
    types: {
      'application/rss+xml': [{ url: `${siteConfig.url}/feed.xml`, title: `${siteConfig.name} — Blog RSS` }],
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog | ${siteConfig.name}`,
    description: 'Technical writing on Next.js, WordPress, WooCommerce performance, migrations, and AI-augmented development workflows.',
    images: [siteConfig.ogImage],
  },
};

const breadcrumbLd = buildBreadcrumbList([{ name: 'Blog', path: '/blog' }]);

export default function BlogPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${siteConfig.name} Blog`,
    url: `${siteConfig.url}/blog`,
    author: { '@type': 'Person', name: siteConfig.name },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbLd} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
        <header className="mb-12">
          <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-3">Writing</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-4">Blog</h1>
          <p className="text-[var(--color-text-muted)] max-w-2xl">
            Technical writing on performance optimization, WordPress migrations, and building AI-augmented development workflows.
          </p>
        </header>
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
            Browse by topic
          </p>
          <div className="flex flex-wrap gap-2">
            {getAllTags().map((t) => (
              <Link
                key={t.slug}
                href={`/blog/tag/${t.slug}`}
                className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-2)] text-[var(--color-accent-text)] hover:text-[var(--color-text)] transition-colors"
              >
                {t.tag} <span className="text-[var(--color-text-muted)]">·{t.count}</span>
              </Link>
            ))}
          </div>
        </div>
        <BlogSearch posts={blogPosts} />
        <div className="mt-12">
          <Link href="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
            ← Back home
          </Link>
        </div>
      </div>
      <ContactSection />
    </>
  );
}
