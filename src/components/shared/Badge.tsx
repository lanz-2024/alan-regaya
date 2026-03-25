export function Badge({ label }: { label: string }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-mono bg-[var(--color-surface-2)] text-[var(--color-text-muted)] rounded border border-[var(--color-border)]">
      {label}
    </span>
  );
}
