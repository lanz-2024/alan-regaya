import type { TocItem } from '@/lib/blog-post-utils';

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-text)] mb-3">
        On this page
      </p>
      <ol className="space-y-2 list-none p-0 m-0">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors leading-snug block"
            >
              {it.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
