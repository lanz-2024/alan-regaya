'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const linkClass = 'text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors';

export function NavLinks() {
  const pathname = usePathname();

  const scrollToTopIfCurrent = (path: string) => () => {
    if (pathname === path) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Link href="/about" className={linkClass} onClick={scrollToTopIfCurrent('/about')}>
        About
      </Link>
      <Link href="/about#experience" className={linkClass}>
        Experience
      </Link>
      <Link href="/projects" className={linkClass} onClick={scrollToTopIfCurrent('/projects')}>
        Projects
      </Link>
    </>
  );
}
