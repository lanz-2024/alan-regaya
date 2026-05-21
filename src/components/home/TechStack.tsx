'use client';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { techStackIcons } from '@/data/skills';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const categoryColors: Record<string, string> = {
  frontend: 'text-blue-400',
  backend: 'text-purple-400',
  data: 'text-green-400',
  systems: 'text-orange-400',
  devops: 'text-cyan-400',
};

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  data: 'Data',
  systems: 'Systems',
  devops: 'DevOps',
};

const categoryOrder = ['frontend', 'backend', 'data', 'systems', 'devops'];

export function TechStack() {
  const { ref, isVisible } = useIntersectionObserver(0.15);

  const grouped = categoryOrder.reduce<Record<string, typeof techStackIcons>>((acc, cat) => {
    acc[cat] = techStackIcons.filter((t) => t.category === cat);
    return acc;
  }, {});

  return (
    <section className="py-24" aria-labelledby="techstack-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading headingId="techstack-heading" label="Tools & Tech" title="What I Build With" />
        <div ref={ref} className={`fade-in${isVisible ? ' visible' : ''} grid sm:grid-cols-2 gap-6`}>
          {categoryOrder.map((cat) => {
            const items = grouped[cat];
            if (!items?.length) return null;
            return (
              <div key={cat} className="glow-border rounded-lg p-6 bg-[var(--color-surface-2)]">
                <p className={`text-xs font-mono uppercase tracking-widest mb-3 ${categoryColors[cat]}`}>
                  {categoryLabels[cat]}
                </p>
                <div className="flex flex-wrap gap-3">
                  {items.map((tech) => (
                    <span
                      key={tech.name}
                      className={`px-4 py-2 rounded-full border border-[var(--color-border)] text-sm font-mono ${categoryColors[tech.category] ?? 'text-[var(--color-text-muted)]'} bg-[var(--color-surface-2)] hover:border-current transition-colors`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
