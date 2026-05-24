import Link from 'next/link';
import type { BlogPost } from '@/data/blog-posts';

export function PostPrevNext({ prev, next }: { prev: BlogPost | null; next: BlogPost | null }) {
  if (!prev && !next) return null;
  return (
    <nav
      aria-label="Previous and next posts"
      className="mt-16 pt-10 border-t border-[var(--color-border)] grid gap-6 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group block p-5 rounded border border-[var(--color-border)] hover:border-[var(--color-accent-text)] transition-colors"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-text)] mb-2">
            ← Previous
          </p>
          <p className="text-base font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent-text)] transition-colors leading-snug">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div className="hidden sm:block" aria-hidden="true" />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group block p-5 rounded border border-[var(--color-border)] hover:border-[var(--color-accent-text)] transition-colors sm:text-right"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-text)] mb-2">
            Next →
          </p>
          <p className="text-base font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent-text)] transition-colors leading-snug">
            {next.title}
          </p>
        </Link>
      ) : (
        <div className="hidden sm:block" aria-hidden="true" />
      )}
    </nav>
  );
}
