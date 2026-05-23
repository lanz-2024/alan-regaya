import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';
import { siteConfig } from '@/data/site-config';
import { BlogCard } from '@/components/blog/BlogCard';
import { buildBreadcrumbList } from '@/lib/seo/breadcrumbs';

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
        <header className="mb-12">
          <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-3">Writing</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-4">Blog</h1>
          <p className="text-[var(--color-text-muted)] max-w-2xl">
            Technical writing on performance optimization, WordPress migrations, and building AI-augmented development workflows.
          </p>
        </header>
        <div className="flex flex-col gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="mt-12">
          <Link href="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
            ← Back home
          </Link>
        </div>
      </div>
    </>
  );
}
