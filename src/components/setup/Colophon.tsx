import { SectionHeading } from '@/components/shared/SectionHeading';

const stack: { label: string; href: string }[] = [
  { label: 'Next.js 14', href: 'https://nextjs.org/' },
  { label: 'TypeScript', href: 'https://www.typescriptlang.org/' },
  { label: 'Tailwind CSS', href: 'https://tailwindcss.com/' },
  { label: 'Vercel', href: 'https://vercel.com/' },
];

const scores: { metric: string; value: string }[] = [
  { metric: 'Performance', value: '100' },
  { metric: 'Accessibility', value: '100' },
  { metric: 'Best Practices', value: '100' },
  { metric: 'SEO', value: '100' },
];

export function Colophon() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6" aria-labelledby="colophon-heading">
      <SectionHeading
        headingId="colophon-heading"
        label="Colophon"
        title="This site, built in public"
        subtitle="A working sample of the craft I bring to client work — same stack, same standards."
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Built with</p>
          <ul className="flex flex-wrap gap-2">
            {stack.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-1 text-sm rounded border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent-text)] transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--color-text-muted)] mt-4">
            Source on{' '}
            <a
              href="https://github.com/lanz-2024/alan-regaya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent-text)] hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Lighthouse · mobile</p>
          <ul className="grid grid-cols-4 gap-3 text-center">
            {scores.map((s) => (
              <li key={s.metric}>
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-green-500/60 text-green-400 font-bold text-base"
                  aria-label={`${s.metric} ${s.value} out of 100`}
                >
                  {s.value}
                </div>
                <p className="text-[10px] sm:text-xs text-[var(--color-text-muted)] mt-2 leading-tight">{s.metric}</p>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--color-text-muted)] mt-4">
            Re-runnable via{' '}
            <a
              href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Falanregaya.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent-text)] hover:underline"
            >
              PageSpeed Insights
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
