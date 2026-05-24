'use client';

import { useMemo, useState } from 'react';
import type { BlogPost } from '@/data/blog-posts';
import { BlogCard } from './BlogCard';

export function BlogSearch({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      const haystack = [
        p.title,
        p.description,
        ...p.tags,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query]);

  return (
    <>
      <div className="mb-8">
        <label htmlFor="blog-search" className="sr-only">
          Search posts
        </label>
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts by title, description, or tag…"
          className="w-full px-4 py-3 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-text)] transition-colors"
          autoComplete="off"
          spellCheck={false}
        />
        {query.trim() && (
          <p className="mt-2 text-xs font-mono text-[var(--color-text-muted)]" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'post' : 'posts'} matching &ldquo;{query.trim()}&rdquo;
          </p>
        )}
      </div>
      {filtered.length === 0 ? (
        <p className="text-sm text-[var(--color-text-muted)] py-8">
          No posts match your search. Try a different term or clear the filter.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
