import { ContributionWeek } from '@/lib/types';

const levelColors: Record<number, string> = {
  0: '#1a1a1a',
  1: '#0e3a6b',
  2: '#1a5fa3',
  3: '#2283d8',
  4: '#3b82f6',
};

export function ContributionGraph({ calendar }: { calendar: ContributionWeek[] }) {
  if (!calendar.length) return null;

  return (
    <section id="contributions" className="py-12 max-w-6xl mx-auto px-4 sm:px-6" aria-labelledby="contrib-heading">
      <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-2">Activity</p>
      <h2 id="contrib-heading" className="text-xl font-bold mb-6">GitHub Contributions</h2>
      <div className="overflow-x-auto">
        <svg
          width={calendar.length * 14}
          height={7 * 14}
          aria-label="GitHub contribution heatmap"
          role="img"
        >
          {calendar.map((week, wi) =>
            week.days.map((day, di) => (
              <rect
                key={`${wi}-${di}`}
                x={wi * 14}
                y={di * 14}
                width={11}
                height={11}
                rx={2}
                fill={levelColors[day.level] ?? levelColors[0]}
                aria-label={`${day.date}: ${day.count} contributions`}
              />
            ))
          )}
        </svg>
      </div>
    </section>
  );
}
