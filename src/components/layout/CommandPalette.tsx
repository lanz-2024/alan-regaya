'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { blogPosts } from '@/data/blog-posts';
import { projects } from '@/data/projects';
import { siteConfig } from '@/data/site-config';

type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  group: 'Pages' | 'Projects' | 'Blog' | 'Actions';
  keywords?: string;
  perform: () => void | Promise<void>;
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQueryRaw] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);

  const setQuery = useCallback((v: string) => {
    setQueryRaw(v);
    setActiveIdx(0);
  }, []);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQueryRaw('');
    setActiveIdx(0);
    setCopied(false);
  }, []);

  const go = useCallback(
    (href: string) => {
      router.push(href);
      close();
    },
    [router, close],
  );

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => close(), 700);
    } catch {
      close();
    }
  }, [close]);

  const items: CommandItem[] = useMemo(() => {
    const pages: CommandItem[] = [
      { id: 'p-home', label: 'Home', hint: '/', group: 'Pages', perform: () => go('/') },
      { id: 'p-about', label: 'About', hint: '/about', group: 'Pages', perform: () => go('/about') },
      { id: 'p-experience', label: 'Experience', hint: '/about#experience', group: 'Pages', keywords: 'work history resume', perform: () => go('/about#experience') },
      { id: 'p-projects', label: 'Projects', hint: '/projects', group: 'Pages', keywords: 'portfolio case studies', perform: () => go('/projects') },
      { id: 'p-setup', label: 'Setup', hint: '/setup', group: 'Pages', keywords: 'gear tools', perform: () => go('/setup') },
      { id: 'p-blog', label: 'Blog', hint: '/blog', group: 'Pages', keywords: 'writing posts articles', perform: () => go('/blog') },
      { id: 'p-faq', label: 'FAQ', hint: '/faq', group: 'Pages', keywords: 'questions answers interview', perform: () => go('/faq') },
      { id: 'p-lessons', label: 'Lessons', hint: '/lessons', group: 'Pages', keywords: 'mistakes post-mortem learnings failures', perform: () => go('/lessons') },
      { id: 'p-now', label: 'Now', hint: '/now', group: 'Pages', keywords: 'current building learning reading', perform: () => go('/now') },
      { id: 'p-contact', label: 'Contact', hint: '/contact', group: 'Pages', keywords: 'email hire reach', perform: () => go('/contact') },
      { id: 'p-privacy', label: 'Privacy', hint: '/privacy', group: 'Pages', perform: () => go('/privacy') },
    ];
    const projectItems: CommandItem[] = projects.map((p) => ({
      id: `proj-${p.id}`,
      label: p.name,
      hint: 'Project',
      group: 'Projects',
      keywords: p.description ?? '',
      perform: () => go(`/projects#${p.id}`),
    }));
    const blogItems: CommandItem[] = blogPosts.map((post) => ({
      id: `blog-${post.slug}`,
      label: post.title,
      hint: 'Post',
      group: 'Blog',
      keywords: post.tags?.join(' ') ?? '',
      perform: () => go(`/blog/${post.slug}`),
    }));
    const actions: CommandItem[] = [
      {
        id: 'a-copy-email',
        label: copied ? 'Copied!' : `Copy email — ${siteConfig.email}`,
        hint: 'Action',
        group: 'Actions',
        keywords: 'clipboard contact',
        perform: copyEmail,
      },
      {
        id: 'a-github',
        label: 'Open GitHub',
        hint: 'External',
        group: 'Actions',
        keywords: 'source code repos',
        perform: () => {
          window.open(siteConfig.github, '_blank', 'noopener,noreferrer');
          close();
        },
      },
      {
        id: 'a-linkedin',
        label: 'Open LinkedIn',
        hint: 'External',
        group: 'Actions',
        perform: () => {
          window.open(siteConfig.linkedin, '_blank', 'noopener,noreferrer');
          close();
        },
      },
      {
        id: 'a-rss',
        label: 'Open RSS feed',
        hint: 'External',
        group: 'Actions',
        keywords: 'feed subscribe',
        perform: () => {
          window.open('/feed.xml', '_blank', 'noopener,noreferrer');
          close();
        },
      },
    ];
    return [...pages, ...projectItems, ...blogItems, ...actions];
  }, [go, copyEmail, close, copied]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => {
      const hay = `${it.label} ${it.hint ?? ''} ${it.keywords ?? ''} ${it.group}`.toLowerCase();
      return q.split(/\s+/).every((tok) => hay.includes(tok));
    });
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx, open]);

  if (!open) return null;

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[activeIdx]?.perform();
    }
  };

  let lastGroup: CommandItem['group'] | null = null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      onClick={close}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
      <div
        className="relative w-full max-w-xl rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onListKey}
      >
        <div className="border-b border-[var(--color-border)]">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to page, project, post, or action…"
            aria-label="Search commands"
            className="w-full bg-transparent px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none"
          />
        </div>
        <ul ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto py-1">
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-[var(--color-text-muted)]">No results</li>
          )}
          {filtered.map((it, idx) => {
            const showHeader = it.group !== lastGroup;
            lastGroup = it.group;
            const active = idx === activeIdx;
            return (
              <li key={it.id}>
                {showHeader && (
                  <div className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                    {it.group}
                  </div>
                )}
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  data-idx={idx}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => it.perform()}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm transition-colors ${
                    active
                      ? 'bg-[var(--color-border)] text-[var(--color-text)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  <span className="truncate">{it.label}</span>
                  {it.hint && <span className="shrink-0 text-xs text-[var(--color-text-muted)]">{it.hint}</span>}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-2 text-[11px] text-[var(--color-text-muted)]">
          <span>
            <kbd className="rounded border border-[var(--color-border)] px-1">↑</kbd>{' '}
            <kbd className="rounded border border-[var(--color-border)] px-1">↓</kbd> navigate{' '}
            <kbd className="ml-2 rounded border border-[var(--color-border)] px-1">↵</kbd> select{' '}
            <kbd className="ml-2 rounded border border-[var(--color-border)] px-1">esc</kbd> close
          </span>
          <span>
            <kbd className="rounded border border-[var(--color-border)] px-1">⌘</kbd>
            <kbd className="rounded border border-[var(--color-border)] px-1">K</kbd>
          </span>
        </div>
      </div>
    </div>
  );
}
