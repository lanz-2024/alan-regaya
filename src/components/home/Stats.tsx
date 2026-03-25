'use client';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export function Stats({ stats }: { stats: { commits: number; prs: number; stars: number } }) {
  const { ref, isVisible } = useIntersectionObserver(0.2);

  const items: StatItem[] = [
    { value: stats.commits, suffix: '+', label: 'Commits' },
    { value: stats.prs, suffix: '+', label: 'Pull Requests' },
    { value: stats.stars, suffix: '', label: 'GitHub Stars' },
    { value: 30, suffix: '+', label: 'Production Sites' },
  ];

  return (
    <section id="stats" className="py-16 border-y border-[var(--color-border)] bg-[var(--color-surface)]" aria-label="GitHub statistics">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref} className={`fade-in${isVisible ? ' visible' : ''}`}>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {items.map((item) => (
              <div key={item.label} className="text-center">
                <dt className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] font-mono">
                  <AnimatedCounter target={item.value} suffix={item.suffix} />
                </dt>
                <dd className="mt-2 text-sm text-[var(--color-text-muted)]">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
