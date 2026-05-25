import Link from 'next/link';
import type { BlogPost } from '@/data/blog-posts';
import { tagToSlug } from '@/lib/blog-tags';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="glow-border rounded-lg bg-[var(--color-surface)] p-6">
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.slice(0, 3).map((tag) => (
          <Link
            key={tag}
            href={`/blog/tag/${tagToSlug(tag)}`}
            className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-2)] text-[var(--color-accent-text)] hover:text-[var(--color-text)] transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
      <Link href={`/blog/${post.slug}`} className="block group">
        <h2 className="text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent-text)] transition-colors mb-2 leading-snug">
          {post.title}
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">{post.description}</p>
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</time>
          <span>{post.readTime}</span>
        </div>
      </Link>
    </article>
  );
}
