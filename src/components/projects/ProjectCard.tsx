import Image from 'next/image';
import { Badge } from '@/components/shared/Badge';
import { Project } from '@/data/projects';

const typeLabels: Record<string, string> = {
  'open-source': 'Open Source',
  'client': 'Client',
  'in-development': 'In Dev',
};

const typeColors: Record<string, string> = {
  'open-source': 'text-green-400 border-green-400/30 bg-green-400/5',
  'client': 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  'in-development': 'text-orange-400 border-orange-400/30 bg-orange-400/5',
};

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="glow-border rounded-lg overflow-hidden bg-[var(--color-surface)] flex flex-col">
      {project.screenshot && (
        <div className="relative aspect-video overflow-hidden bg-[var(--color-surface-2)]">
          <Image
            src={project.screenshot}
            alt={`Screenshot of ${project.name}`}
            fill
            priority={priority}
            fetchPriority={priority ? 'high' : 'auto'}
            className="object-cover object-top transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="font-semibold text-[var(--color-text)]">{project.name}</h3>
          <span className={`shrink-0 text-xs px-2 py-0.5 rounded border font-mono ${typeColors[project.type]}`}>
            {typeLabels[project.type]}
          </span>
        </div>
        {project.role && (
          <p className="text-xs font-mono text-[var(--color-text-muted)] mb-2">{project.role}</p>
        )}
        {project.outcome && (
          <p className="text-sm text-[var(--color-accent-text)] mb-3 font-medium">{project.outcome}</p>
        )}
        <p className="text-sm text-[var(--color-text-muted)] mb-4 flex-1 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 5).map((t) => <Badge key={t} label={t} />)}
        </div>
        <div className="flex items-center gap-3 text-sm pt-2 border-t border-[var(--color-border)]">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-text)] hover:underline flex items-center gap-1">
              GitHub {project.stars && <span className="text-[var(--color-text-muted)]">★ {project.stars}</span>}
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel={project.type === 'client' ? 'noopener noreferrer nofollow' : 'noopener noreferrer'} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] ml-auto">
              Live ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
