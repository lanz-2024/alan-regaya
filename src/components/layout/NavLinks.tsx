'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const linkClass = 'text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors';

export function NavLinks() {
  const pathname = usePathname();

  const scrollToTop = () => {
    if (pathname === '/about') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Link href="/about" className={linkClass} onClick={scrollToTop}>
        About
      </Link>
      <Link href="/about#experience" className={linkClass}>
        Experience
      </Link>
      <Link href="/projects" className={linkClass}>
        Projects
      </Link>
    </>
  );
}
