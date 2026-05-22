import type { LighthouseScores } from '@/data/proof';

const scoreColor = (n: number) => {
  if (n >= 90) return 'text-green-400';
  if (n >= 50) return 'text-yellow-400';
  return 'text-red-400';
};

const ringColor = (n: number) => {
  if (n >= 90) return 'stroke-green-400';
  if (n >= 50) return 'stroke-yellow-400';
  return 'stroke-red-400';
};

function ScoreRing({ value, label }: { value: number; label: string }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-14 h-14">
        <svg viewBox="0 0 50 50" className="-rotate-90 w-full h-full" aria-hidden="true">
          <circle cx="25" cy="25" r={r} className="stroke-white/10 fill-none" strokeWidth="4" />
          <circle
            cx="25"
            cy="25"
            r={r}
            className={`fill-none ${ringColor(value)}`}
            strokeWidth="4"
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${scoreColor(value)}`}
        >
          {value}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">{label}</span>
    </div>
  );
}

export function ScoreCard({ scores, label }: { scores: LighthouseScores; label: string }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <p className="mb-4 text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)]">{label}</p>
      <div className="grid grid-cols-4 gap-2">
        <ScoreRing value={scores.performance} label="Perf" />
        <ScoreRing value={scores.accessibility} label="A11y" />
        <ScoreRing value={scores.bestPractices} label="BP" />
        <ScoreRing value={scores.seo} label="SEO" />
      </div>
    </div>
  );
}
