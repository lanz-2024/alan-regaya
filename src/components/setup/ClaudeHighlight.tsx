import Image from 'next/image';
import { Badge } from '@/components/shared/Badge';

const capabilities = [
  'workflow automation',
  'CI/CD',
  'documentation',
  'e2e testing',
  'regression',
  'edge cases',
  'security',
  'performance',
  'migrations',
  'MCPs',
  'agents',
];

export function ClaudeHighlight() {
  return (
    <section className="py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]" aria-label="Claude CLI highlight">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-2">AI workflow</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-6">
          AI-Assisted Development with Claude CLI
        </h2>
        <div className="glow-border rounded-lg overflow-hidden bg-[var(--color-background)]">
          {/* Terminal screenshot with hover pan-reveal effect */}
          <div className="group relative aspect-video overflow-hidden bg-[var(--color-surface-2)] cursor-zoom-in">
            <Image
              src="/setup/claude-cli.png"
              alt="Claude CLI terminal session — Opus 4.7 plan mode, status bar, usage stats"
              fill
              priority
              className="object-cover object-top [transition:object-position_3s_ease-in-out] group-hover:object-bottom"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1152px"
            />
            {/* Bottom gradient hint — fades on hover to reveal status bar */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500 group-hover:opacity-0 pointer-events-none" />
            <span className="absolute bottom-3 right-4 text-xs font-mono text-white/50 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none select-none">
              hover to reveal ↓
            </span>
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-6 max-w-3xl">
              Claude CLI is my primary tool for AI-assisted development — driving workflow automation, CI/CD pipelines,
              documentation, e2e/regression/edge-case testing, security and performance testing, migrations, custom
              skills, MCPs, and agent orchestration.
            </p>
            <div className="flex flex-wrap gap-2">
              {capabilities.map((cap) => (
                <Badge key={cap} label={cap} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
