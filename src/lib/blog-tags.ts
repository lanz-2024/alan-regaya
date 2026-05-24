import { blogPosts, type BlogPost } from '@/data/blog-posts';

export function tagToSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export interface TagInfo {
  tag: string;
  slug: string;
  count: number;
}

let cached: TagInfo[] | null = null;

export function getAllTags(): TagInfo[] {
  if (cached) return cached;
  const map = new Map<string, { tag: string; count: number }>();
  const slugToTag = new Map<string, string>();
  for (const post of blogPosts) {
    for (const tag of post.tags) {
      const slug = tagToSlug(tag);
      if (!slug) continue;
      const existing = slugToTag.get(slug);
      if (existing && existing !== tag) {
        throw new Error(`Tag slug collision: "${tag}" and "${existing}" both slugify to "${slug}"`);
      }
      slugToTag.set(slug, tag);
      const entry = map.get(slug);
      if (entry) entry.count += 1;
      else map.set(slug, { tag, count: 1 });
    }
  }
  cached = Array.from(map.entries())
    .map(([slug, { tag, count }]) => ({ slug, tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  return cached;
}

export function getTagBySlug(slug: string): TagInfo | undefined {
  return getAllTags().find((t) => t.slug === slug);
}

export function getPostsByTagSlug(slug: string): BlogPost[] {
  return blogPosts
    .filter((p) => p.tags.some((t) => tagToSlug(t) === slug))
    .sort((a, b) => b.date.localeCompare(a.date));
}
