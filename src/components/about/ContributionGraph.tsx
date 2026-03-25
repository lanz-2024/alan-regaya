import { ContributionWeek } from '@/lib/types';

const CELL = 11;
const STEP = 14; // cell + gap
const LEFT_PAD = 28;
const TOP_PAD = 20;

const levelColors: Record<number, string> = {
  0: '#1a1a1a',
  1: '#0e3a6b',
  2: '#1a5fa3',
  3: '#2283d8',
  4: '#3b82f6',
};

const dayLabels = [
  { index: 1, label: 'Mon' },
  { index: 3, label: 'Wed' },
  { index: 5, label: 'Fri' },
];

function getMonthLabels(calendar: ContributionWeek[]) {
  const labels: { x: number; label: string }[] = [];
  let lastMonth = -1;
  calendar.forEach((week, wi) => {
    const firstDay = week.days.find((d) => d.date);
    if (!firstDay) return;
    const date = new Date(firstDay.date + 'T00:00:00');
    const month = date.getMonth();
    if (month !== lastMonth) {
      labels.push({
        x: LEFT_PAD + wi * STEP,
        label: date.toLocaleString('en-US', { month: 'short' }),
      });
      lastMonth = month;
    }
  });
  return labels;
}

export function ContributionGraph({ calendar }: { calendar: ContributionWeek[] }) {
  const totalContributions = calendar.reduce(
    (sum, week) => sum + week.days.reduce((s, d) => s + d.count, 0),
    0,
  );

  const svgWidth = LEFT_PAD + calendar.length * STEP;
  const svgHeight = TOP_PAD + 7 * STEP;
  const monthLabels = getMonthLabels(calendar);

  return (
    <section id="contributions" className="py-12 max-w-6xl mx-auto px-4 sm:px-6" aria-labelledby="contrib-heading">
      <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-2">Activity</p>
      <h2 id="contrib-heading" className="text-xl font-bold mb-1">GitHub Contributions</h2>

      {calendar.length > 0 ? (
        <>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">
            {totalContributions.toLocaleString()} contributions in the last year
          </p>
          <div className="overflow-x-auto">
            <svg
              width={svgWidth}
              height={svgHeight}
              aria-label={`GitHub contribution heatmap — ${totalContributions.toLocaleString()} contributions in the last year`}
              role="img"
            >
              {/* Month labels */}
              {monthLabels.map(({ x, label }) => (
                <text
                  key={label + x}
                  x={x}
                  y={12}
                  fontSize={10}
                  fill="#888888"
                  fontFamily="monospace"
                  aria-hidden="true"
                >
                  {label}
                </text>
              ))}

              {/* Day labels */}
              {dayLabels.map(({ index, label }) => (
                <text
                  key={label}
                  x={0}
                  y={TOP_PAD + index * STEP + CELL - 1}
                  fontSize={9}
                  fill="#888888"
                  fontFamily="monospace"
                  aria-hidden="true"
                >
                  {label}
                </text>
              ))}

              {/* Contribution cells */}
              {calendar.map((week, wi) =>
                week.days.map((day, di) => (
                  <rect
                    key={`${wi}-${di}`}
                    x={LEFT_PAD + wi * STEP}
                    y={TOP_PAD + di * STEP}
                    width={CELL}
                    height={CELL}
                    rx={2}
                    fill={levelColors[day.level] ?? levelColors[0]}
                    aria-hidden="true"
                  />
                )),
              )}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1.5 mt-3 text-xs text-[var(--color-text-muted)]">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <span
                key={level}
                role="img"
                style={{ backgroundColor: levelColors[level] }}
                className="inline-block w-[11px] h-[11px] rounded-[2px]"
                aria-label={`Level ${level}`}
              />
            ))}
            <span>More</span>
          </div>
        </>
      ) : (
        <p className="text-sm text-[var(--color-text-muted)]">4,500+ contributions in the last year.</p>
      )}
    </section>
  );
}
