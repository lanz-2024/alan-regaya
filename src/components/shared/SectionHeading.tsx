export function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-12">
      <p className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-widest mb-2">{label}</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)]">{title}</h2>
      {subtitle && <p className="mt-3 text-[var(--color-text-muted)] max-w-2xl">{subtitle}</p>}
    </div>
  );
}
