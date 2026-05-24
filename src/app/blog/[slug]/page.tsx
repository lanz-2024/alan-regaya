import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog-posts';
import { siteConfig } from '@/data/site-config';
import { ContactSection } from '@/components/shared/ContactSection';
import { buildBreadcrumbList } from '@/lib/seo/breadcrumbs';
import { tagToSlug } from '@/lib/blog-tags';
import { buildToc, injectHeadingIds, getRelatedPosts } from '@/lib/blog-post-utils';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const toc = buildToc(post.content);
  const contentHtml = injectHeadingIds(post.content);
  const related = getRelatedPosts(post, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Person', name: siteConfig.name, url: siteConfig.url },
    url: `${siteConfig.url}/blog/${post.slug}`,
  };

  const breadcrumbLd = buildBreadcrumbList([
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <Link href="/blog" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-8 inline-block">
          ← Back to Blog
        </Link>
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <article className="min-w-0">
            <header className="mb-12">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tagToSlug(tag)}`}
                    className="text-xs font-mono px-2 py-1 rounded bg-[var(--color-surface-2)] text-[var(--color-accent-text)] hover:text-[var(--color-text)] transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-4 leading-tight">{post.title}</h1>
              <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </header>
            <div className="prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            <RelatedPosts posts={related} />
          </article>
          {toc.length >= 2 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents items={toc} />
              </div>
            </aside>
          )}
        </div>
      </div>
      <ContactSection />
    </>
  );
}
