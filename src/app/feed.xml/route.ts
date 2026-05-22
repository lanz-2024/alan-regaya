import { blogPosts } from '@/data/blog-posts';
import { siteConfig } from '@/data/site-config';

export const dynamic = 'force-static';

const escapeXml = (unsafe: string) =>
  unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export async function GET() {
  const sorted = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const lastBuildDate = sorted[0]?.date
    ? new Date(sorted[0].date).toUTCString()
    : new Date().toUTCString();

  const items = sorted
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const categories = post.tags.map((t) => `<category>${escapeXml(t)}</category>`).join('');
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      ${categories}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} &mdash; Blog</title>
    <link>${siteConfig.url}/blog</link>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(stripHtml(siteConfig.description))}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
