import { proofRuns, proofStack } from '@/data/proof';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ScoreCard } from './ScoreCard';

// Component edit forces Next.js to re-prerender /proof when src/data/proof.ts changes
// (data-only edits via path alias were not invalidating this segment).

const psiUrl = (target: string) => `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(target)}`;

export function ProofGrid() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 space-y-20" aria-label="Performance proof">
      <div className="space-y-12">
        <SectionHeading
          label="Receipts"
          title="Lighthouse scores, page by page"
          subtitle="Live PageSpeed Insights runs from a recent measurement. Click any “Verify on PSI” link to re-run against the production URL yourself."
        />
        <div className="space-y-8">
          {proofRuns.map((run) => (
            <article key={run.url} className="space-y-4">
              <header className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-text)]">{run.page}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] font-mono">{run.url}</p>
                </div>
                <a
                  href={psiUrl(run.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[var(--color-accent-text)] hover:underline"
                >
                  Verify on PSI →
                </a>
              </header>
              <div className="grid sm:grid-cols-2 gap-4">
                <ScoreCard scores={run.mobile} label="Mobile" />
                <ScoreCard scores={run.desktop} label="Desktop" />
              </div>
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">LCP</dt>
                  <dd className="font-mono text-[var(--color-text)]">{run.vitals.lcp}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">INP</dt>
                  <dd className="font-mono text-[var(--color-text)]">{run.vitals.inp}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">CLS</dt>
                  <dd className="font-mono text-[var(--color-text)]">{run.vitals.cls}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">TTFB</dt>
                  <dd className="font-mono text-[var(--color-text)]">{run.vitals.ttfb}</dd>
                </div>
              </dl>
              <p className="text-[11px] text-[var(--color-text-muted)] font-mono">Last measured {run.measuredAt}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <SectionHeading label="How" title="What makes it fast" />
        <ul className="grid sm:grid-cols-2 gap-3">
          {proofStack.map((s) => (
            <li
              key={s.label}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-1">{s.label}</p>
              <p className="text-sm text-[var(--color-text)]">{s.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
