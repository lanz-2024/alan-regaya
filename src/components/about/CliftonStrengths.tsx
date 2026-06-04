import { csDomains, csThemes, csBlurbs, cliftonMeta } from '@/data/cliftonstrengths';

const colorOf = Object.fromEntries(csDomains.map((d) => [d.name, d.color]));

const top10 = csThemes.filter((t) => t.rank <= 10);

// Distribution of the top 10 across the four domains, ordered like csDomains.
const domainMix = csDomains.map((d) => ({
  ...d,
  count: top10.filter((t) => t.domain === d.name).length,
}));

export function CliftonStrengths() {
  return (
    <section
      id="strengths"
      aria-labelledby="strengths-heading"
      className="py-24 border-b border-[var(--color-border)]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-2">
          Talent DNA
        </p>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
          <h2 id="strengths-heading" className="text-3xl font-bold text-[var(--color-text)]">
            CliftonStrengths
          </h2>
          <span className="font-mono text-sm text-[var(--color-text-muted)]">
            I lead with {cliftonMeta.leadDomain}
          </span>
        </div>
        <p className="text-[var(--color-text-muted)] leading-relaxed mb-10">{cliftonMeta.intro}</p>

        {/* Domain mix across the top 10 */}
        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
            Domain mix · top 10
          </p>
          <ul className="space-y-2.5">
            {domainMix.map((d) => (
              <li key={d.name} className="flex items-center gap-3">
                <span className="text-sm text-[var(--color-text)] w-44 sm:w-48 shrink-0">{d.name}</span>
                <div
                  className="flex-1 h-2 bg-[var(--color-border)] rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={d.count}
                  aria-valuemin={0}
                  aria-valuemax={10}
                  aria-label={`${d.name}: ${d.count} of top 10`}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(d.count / 10) * 100}%`, backgroundColor: d.color }}
                  />
                </div>
                <span className="font-mono text-sm text-[var(--color-text-muted)] tabular-nums w-4 text-right">
                  {d.count}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top 10, ranked */}
        <ol className="space-y-6">
          {top10.map((t) => (
            <li key={t.rank} className="grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-5">
              <span
                aria-hidden
                className="font-mono text-sm text-[var(--color-text-muted)] tabular-nums pt-0.5"
              >
                {String(t.rank).padStart(2, '0')}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-[var(--color-text)] font-semibold">{t.name}</h3>
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      aria-hidden
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: colorOf[t.domain] }}
                    />
                    <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: colorOf[t.domain] }}>
                      {t.domain}
                    </span>
                  </span>
                </div>
                <p className="mt-1 text-sm text-[var(--color-text-muted)] leading-relaxed">{csBlurbs[t.rank]}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Full 34, collapsed by default (native disclosure — no JS) */}
        <details className="mt-10 group">
          <summary className="cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-text)] hover:underline list-none">
            <span className="transition-transform group-open:rotate-90" aria-hidden>›</span>
            Show all 34 themes in order
          </summary>
          <ol className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
            {csThemes.map((t) => (
              <li key={t.rank} className="flex items-baseline gap-2.5 text-sm">
                <span className="font-mono text-xs text-[var(--color-text-muted)] tabular-nums w-6 shrink-0 text-right">
                  {t.rank}
                </span>
                <span
                  aria-hidden
                  className="w-2 h-2 rounded-full shrink-0 translate-y-1.5"
                  style={{ backgroundColor: colorOf[t.domain] }}
                />
                <span className={t.rank <= 10 ? 'text-[var(--color-text)]' : 'text-[var(--color-text-muted)]'}>
                  {t.name}
                </span>
              </li>
            ))}
          </ol>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Domain legend">
            {csDomains.map((d) => (
              <li key={d.name} className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                <span aria-hidden className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}
              </li>
            ))}
          </ul>
        </details>

        <p className="mt-10 text-xs text-[var(--color-text-muted)]">
          {cliftonMeta.source.label} · assessed {cliftonMeta.assessedOn}.{' '}
          <a
            href={cliftonMeta.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent-text)] underline"
          >
            About the 34 themes
          </a>
          .
        </p>
      </div>
    </section>
  );
}
