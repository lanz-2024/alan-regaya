import { blogPosts, type BlogPost } from '@/data/blog-posts';

export interface TocItem {
  id: string;
  text: string;
}

export function headingSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  const used = new Set<string>();
  const re = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    if (!text) continue;
    let id = headingSlug(text);
    let n = 2;
    while (used.has(id)) id = `${headingSlug(text)}-${n++}`;
    used.add(id);
    items.push({ id, text });
  }
  return items;
}

export function injectHeadingIds(html: string): string {
  const used = new Set<string>();
  return html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    if (!text) return `<h2${attrs}>${inner}</h2>`;
    let id = headingSlug(text);
    let n = 2;
    while (used.has(id)) id = `${headingSlug(text)}-${n++}`;
    used.add(id);
    if (/\sid=/.test(attrs)) return `<h2${attrs}>${inner}</h2>`;
    return `<h2${attrs} id="${id}">${inner}</h2>`;
  });
}

export function getAdjacentPosts(post: BlogPost): { prev: BlogPost | null; next: BlogPost | null } {
  const sorted = [...blogPosts].sort((a, b) => a.date.localeCompare(b.date));
  const i = sorted.findIndex((p) => p.slug === post.slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? sorted[i - 1] : null,
    next: i < sorted.length - 1 ? sorted[i + 1] : null,
  };
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const tagSet = new Set(post.tags);
  return blogPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ post: p, score: p.tags.filter((t) => tagSet.has(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map((x) => x.post);
}
