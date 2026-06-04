'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { discProfile } from '@/data/disc';

export function DiscProfile() {
  const { ref, isVisible } = useIntersectionObserver(0.25);

  return (
    <section
      id="disc"
      aria-labelledby="disc-heading"
      className="py-24 border-y border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-2">
          Personality
        </p>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
          <h2 id="disc-heading" className="text-3xl font-bold text-[var(--color-text)]">
            How I&apos;m Wired
          </h2>
          <span className="font-mono text-sm text-[var(--color-text-muted)]">
            DISC type {discProfile.type} · {discProfile.typeLabel}
          </span>
        </div>
        <p className="text-[var(--color-text-muted)] leading-relaxed mb-10">{discProfile.intro}</p>

        {/* Bars fill once the list scrolls into view. The transition is gated behind
            motion-safe so reduced-motion users get the final state with no animation. */}
        <div ref={ref}>
          <ul className="space-y-7">
            {discProfile.factors.map((f) => (
              <li key={f.letter}>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    aria-hidden
                    className="grid place-items-center w-7 h-7 shrink-0 rounded-md border font-mono text-sm font-bold"
                    style={{
                      color: f.color,
                      backgroundColor: `${f.color}1a`,
                      borderColor: `${f.color}40`,
                    }}
                  >
                    {f.letter}
                  </span>
                  <span className="font-semibold text-[var(--color-text)]">{f.name}</span>
                  <span className="ml-auto font-mono text-sm text-[var(--color-text-muted)] tabular-nums">
                    {f.score}%
                  </span>
                </div>
                <div
                  className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={f.score}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${f.name}: ${f.score} percent`}
                >
                  <div
                    className="h-full rounded-full motion-safe:transition-[width] motion-safe:duration-1000 motion-safe:ease-out"
                    style={{ width: isVisible ? `${f.score}%` : '0%', backgroundColor: f.color }}
                  />
                </div>
                <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">{f.definition}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-xs text-[var(--color-text-muted)]">
          Assessed via the{' '}
          <a
            href={discProfile.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent-text)] underline"
          >
            {discProfile.source.label}
          </a>
          . Scores total 100% across the four factors.
        </p>
      </div>
    </section>
  );
}
