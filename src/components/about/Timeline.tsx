import { experience } from '@/data/experience';
import { Badge } from '@/components/shared/Badge';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function Timeline() {
  return (
    <section className="py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]" aria-labelledby="timeline-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeading label="Experience" title="Work History" />
        <div id="timeline-heading" className="sr-only">Work History</div>
        <ol className="relative border-l border-[var(--color-border)] space-y-10 pl-6">
          {experience.map((entry, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[25px] w-3 h-3 rounded-full bg-[var(--color-accent)] border-2 border-[var(--color-background)]" aria-hidden="true" />
              <article>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="font-semibold text-[var(--color-text)]">{entry.role}</h3>
                    <p className="text-sm text-[var(--color-accent-text)]">{entry.company} · {entry.location}</p>
                  </div>
                  <time className="text-xs font-mono text-[var(--color-text-muted)] shrink-0">{entry.period}</time>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] mb-3">{entry.description}</p>
                <ul className="space-y-1 mb-3">
                  {entry.highlights.map((h, j) => (
                    <li key={j} className="text-sm text-[var(--color-text-muted)] flex gap-2">
                      <span className="text-[var(--color-accent-text)] shrink-0">›</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {entry.tech.map((t) => <Badge key={t} label={t} />)}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
