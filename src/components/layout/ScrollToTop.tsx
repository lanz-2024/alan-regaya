'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
