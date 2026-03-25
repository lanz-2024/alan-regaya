'use client';
import { useState } from 'react';
import { Project, ProjectType } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

const filters: { label: string; value: 'all' | ProjectType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Open Source', value: 'open-source' },
  { label: 'Client Sites', value: 'client' },
  { label: 'In Development', value: 'in-development' },
];

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<'all' | ProjectType>('all');
  const filtered = active === 'all' ? projects : projects.filter((p) => p.type === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter projects by type">
        {filters.map((f) => (
          <button
            key={f.value}
            role="tab"
            aria-selected={active === f.value}
            onClick={() => setActive(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              active === f.value
                ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white'
                : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" role="tabpanel" aria-label={`${active} projects`}>
        {filtered.map((project, index) => (
          <ProjectCard key={project.id} project={project} priority={index === 0} />
        ))}
      </div>
    </div>
  );
}
