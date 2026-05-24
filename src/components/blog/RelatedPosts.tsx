import type { BlogPost } from '@/data/blog-posts';
import { BlogCard } from './BlogCard';

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    <aside className="mt-16 pt-10 border-t border-[var(--color-border)]" aria-labelledby="related-heading">
      <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-3">
        Related reading
      </p>
      <h2 id="related-heading" className="text-2xl font-bold text-[var(--color-text)] mb-6">
        More posts you might like
      </h2>
      <div className="flex flex-col gap-6">
        {posts.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </div>
    </aside>
  );
}
