import { SectionHeading } from '@/components/shared/SectionHeading';
import { techStackIcons } from '@/data/skills';

const categoryColors: Record<string, string> = {
  frontend: 'text-blue-400',
  backend: 'text-purple-400',
  data: 'text-green-400',
  systems: 'text-orange-400',
  devops: 'text-cyan-400',
};

export function TechStack() {
  return (
    <section className="py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]" aria-labelledby="techstack-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading label="Tools & Tech" title="What I Build With" />
        <div id="techstack-heading" className="sr-only">Tech Stack</div>
        <div className="flex flex-wrap gap-3">
          {techStackIcons.map((tech) => (
            <span
              key={tech.name}
              className={`px-4 py-2 rounded-full border border-[var(--color-border)] text-sm font-mono ${categoryColors[tech.category] ?? 'text-[var(--color-text-muted)]'} bg-[var(--color-surface-2)] hover:border-current transition-colors`}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
