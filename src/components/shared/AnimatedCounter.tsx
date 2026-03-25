'use client';
import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const { ref, isVisible } = useIntersectionObserver(0.3);
  const [count, setCount] = useState(target);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isVisible || hasRun.current) return;
    hasRun.current = true;
    setCount(0);
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isVisible, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}
