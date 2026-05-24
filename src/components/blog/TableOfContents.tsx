'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/blog-post-utils';

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length < 2) return;
    const headings = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -65% 0px', threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-text)] mb-3">
        On this page
      </p>
      <ol className="space-y-2 list-none p-0 m-0">
        {items.map((it) => {
          const isActive = it.id === activeId;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`leading-snug block border-l-2 pl-3 -ml-3 transition-colors ${
                  isActive
                    ? 'text-[var(--color-text)] border-[var(--color-accent-text)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] border-transparent'
                }`}
              >
                {it.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
