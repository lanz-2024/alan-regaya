import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/data/site-config';
import { BlogCard } from '@/components/blog/BlogCard';
import { ContactSection } from '@/components/shared/ContactSection';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { buildBreadcrumbList } from '@/lib/seo/breadcrumbs';
import { getAllTags, getTagBySlug, getPostsByTagSlug } from '@/lib/blog-tags';

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag: slug } = await params;
  const info = getTagBySlug(slug);
  if (!info) return {};
  const url = `${siteConfig.url}/blog/tag/${info.slug}`;
  const title = `#${info.tag} — Blog`;
  const description = `All posts tagged ${info.tag} by ${siteConfig.name}.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function BlogTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: slug } = await params;
  const info = getTagBySlug(slug);
  if (!info) notFound();

  const posts = getPostsByTagSlug(slug);
  const url = `${siteConfig.url}/blog/tag/${info.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Posts tagged ${info.tag}`,
    url,
    author: { '@type': 'Person', name: siteConfig.name, url: siteConfig.url },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${siteConfig.url}/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };

  const breadcrumbLd = buildBreadcrumbList([
    { name: 'Blog', path: '/blog' },
    { name: `#${info.tag}`, path: `/blog/tag/${info.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
        <Link
          href="/blog"
          className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-8 inline-block"
        >
          ← All posts
        </Link>
        <SectionHeading
          label="Tag"
          title={`#${info.tag}`}
          subtitle={`${info.count} ${info.count === 1 ? 'post' : 'posts'} tagged ${info.tag}.`}
        />
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
      <ContactSection />
    </>
  );
}
