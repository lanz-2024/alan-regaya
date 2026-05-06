import Image from 'next/image';
import { GearItem } from '@/data/gear';

const subcategoryColors: Record<string, string> = {
  Compute: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  Peripherals: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
  Display: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5',
  Audio: 'text-green-400 border-green-400/30 bg-green-400/5',
  Network: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
};

export function GearCard({ item }: { item: GearItem }) {
  return (
    <article className="glow-border rounded-lg overflow-hidden bg-[var(--color-surface)] flex flex-col">
      {item.image && (
        <div className="relative aspect-video overflow-hidden bg-[var(--color-surface-2)]">
          <Image
            src={item.image}
            alt={item.alt ?? item.name}
            fill
            className="object-cover object-top transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      {!item.image && (
        <div className="aspect-video bg-[var(--color-surface-2)] flex items-center justify-center">
          <span className="text-4xl opacity-30">🖥️</span>
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3 gap-2">
          <h3 className="font-semibold text-[var(--color-text)] leading-snug">{item.name}</h3>
          <span className={`shrink-0 text-xs px-2 py-0.5 rounded border font-mono ${subcategoryColors[item.subcategory]}`}>
            {item.subcategory}
          </span>
        </div>
        <ul className="space-y-1 flex-1 mb-4">
          {item.specs.map((spec) => (
            <li key={spec} className="text-sm text-[var(--color-text-muted)] flex items-start gap-1.5">
              <span className="text-[var(--color-accent-text)] mt-0.5 shrink-0">·</span>
              {spec}
            </li>
          ))}
        </ul>
        {item.link && (
          <div className="pt-2 border-t border-[var(--color-border)]">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-accent-text)] hover:underline"
            >
              View speedtest result ↗
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
