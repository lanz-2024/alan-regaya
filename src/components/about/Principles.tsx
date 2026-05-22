import { principles } from '@/data/principles';

export function Principles() {
  return (
    <section id="principles" className="py-24 border-y border-[var(--color-border)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-2">
          How I Work
        </p>
        <h2 className="text-3xl font-bold mb-3 text-[var(--color-text)]">Principles</h2>
        <p className="text-[var(--color-text-muted)] leading-relaxed mb-10">
          A short list of opinions I&apos;ve formed by shipping production e-commerce for six years. They&apos;re
          falsifiable — every project on this site should reflect them.
        </p>
        <ol className="space-y-8">
          {principles.map((p, i) => (
            <li key={p.title} className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-6">
              <span
                aria-hidden
                className="font-mono text-sm text-[var(--color-text-muted)] tabular-nums pt-1"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[var(--color-text)] font-semibold mb-1.5">{p.title}</h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
