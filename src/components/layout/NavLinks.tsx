'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const primaryLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/setup', label: 'Setup' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
] as const;

const baseClass = 'text-sm transition-colors';

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
      {primaryLinks.map(({ href, label }) => {
        const isActive = pathname === href || pathname.startsWith(href + '/');
        return (
          <Link
            key={href}
            href={href}
            onClick={handleNavClick(href)}
            aria-current={isActive ? 'page' : undefined}
            className={`${baseClass} ${
              isActive
                ? 'text-[var(--color-text)] font-medium'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}
