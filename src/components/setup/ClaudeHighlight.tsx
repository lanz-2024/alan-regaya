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
          <div className="relative aspect-video overflow-hidden bg-[var(--color-surface-2)]">
            <Image
              src="/setup/claude-cli.png"
              alt="Claude CLI terminal session showing AI-assisted development workflow"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1152px"
            />
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
