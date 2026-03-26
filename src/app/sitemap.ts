import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site-config';
import { blogPosts } from '@/data/blog-posts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, lastModified: new Date('2026-03-26'), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteConfig.url}/about`, lastModified: new Date('2026-03-26'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/projects`, lastModified: new Date('2026-03-26'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteConfig.url}/contact`, lastModified: new Date('2026-03-26'), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${siteConfig.url}/blog`, lastModified: new Date('2026-03-26'), changeFrequency: 'weekly', priority: 0.8 },
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
