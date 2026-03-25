'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const aboutSections = [
  { href: '/about#story', label: 'How It Started' },
  { href: '/about#about-me', label: 'About Me' },
  { href: '/about#experience', label: 'Experience' },
  { href: '/about#skills', label: 'Skills' },
  { href: '/about#contributions', label: 'GitHub Activity' },
];

const projectSections = [
  { href: '/projects#open-source', label: 'Open Source' },
  { href: '/projects#client', label: 'Client Sites' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setOpen(false); setAboutOpen(false); setProjectsOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const overlay = open ? (
    <div className="fixed inset-0 top-16 z-50 bg-[#0a0a0a] px-4 pt-8 flex flex-col gap-6 overflow-y-auto">
      <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
        <div>
          <button
            onClick={() => setAboutOpen(!aboutOpen)}
            className="flex items-center gap-2 text-2xl font-light text-[var(--color-text)] hover:text-[var(--color-accent-text)] transition-colors w-full text-left"
            aria-expanded={aboutOpen}
          >
            About
            <svg className={`w-4 h-4 transition-transform duration-150 ${aboutOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {aboutOpen && (
            <div className="mt-3 pl-4 flex flex-col gap-3 border-l border-[var(--color-border)]">
              {aboutSections.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-base text-[var(--color-text-muted)] hover:text-[var(--color-accent-text)] transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => setProjectsOpen(!projectsOpen)}
            className="flex items-center gap-2 text-2xl font-light text-[var(--color-text)] hover:text-[var(--color-accent-text)] transition-colors w-full text-left"
            aria-expanded={projectsOpen}
          >
            Projects
            <svg className={`w-4 h-4 transition-transform duration-150 ${projectsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {projectsOpen && (
            <div className="mt-3 pl-4 flex flex-col gap-3 border-l border-[var(--color-border)]">
              {projectSections.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-base text-[var(--color-text-muted)] hover:text-[var(--color-accent-text)] transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className="inline-flex px-6 py-3 bg-[var(--color-accent)] text-white text-lg rounded hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          Get in Touch
        </Link>
      </nav>
    </div>
  ) : null;

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
      >
        <span className="block w-5 h-0.5 bg-current mb-1.5 transition-all" style={{ transform: open ? 'translateY(8px) rotate(45deg)' : '' }} />
        <span className="block w-5 h-0.5 bg-current mb-1.5 transition-all" style={{ opacity: open ? 0 : 1 }} />
        <span className="block w-5 h-0.5 bg-current transition-all" style={{ transform: open ? 'translateY(-8px) rotate(-45deg)' : '' }} />
      </button>
      {mounted && createPortal(overlay, document.body)}
    </div>
  );
}
