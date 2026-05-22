'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const linkClass = 'text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors';

export function NavLinks() {
  const pathname = usePathname();
  const navTargetRef = useRef<string | null>(null);

  useEffect(() => {
    if (navTargetRef.current !== null) {
      if (navTargetRef.current === pathname) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      navTargetRef.current = null;
    }
  }, [pathname]);

  const handleNavClick = (path: string) => () => {
    navTargetRef.current = path;
    if (pathname === path) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Link href="/about" className={linkClass} onClick={handleNavClick('/about')}>
        About
      </Link>
      <Link href="/about#experience" className={linkClass}>
        Experience
      </Link>
      <Link href="/projects" className={linkClass} onClick={handleNavClick('/projects')}>
        Projects
      </Link>
      <Link href="/setup" className={linkClass} onClick={handleNavClick('/setup')}>
        Setup
      </Link>
      <Link href="/blog" className={linkClass} onClick={handleNavClick('/blog')}>
        Blog
      </Link>
      <Link href="/faq" className={linkClass} onClick={handleNavClick('/faq')}>
        FAQ
      </Link>
    </>
  );
}
