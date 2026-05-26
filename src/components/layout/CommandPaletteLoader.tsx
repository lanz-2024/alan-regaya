'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const CommandPalette = dynamic(() => import('./CommandPalette').then(m => ({ default: m.CommandPalette })), {
  ssr: false,
  loading: () => null,
});

export function CommandPaletteLoader() {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (armed) return;
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setArmed(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [armed]);

  if (!armed) return null;
  return <CommandPalette defaultOpen />;
}
