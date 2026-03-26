'use client';
import { useState, useEffect } from 'react';
import { Project, ProjectType } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

const filters: { label: string; value: 'all' | ProjectType; hash: string }[] = [
  { label: 'All', value: 'all', hash: '' },
  { label: 'Open Source', value: 'open-source', hash: 'open-source' },
  { label: 'Client Sites', value: 'client', hash: 'client' },
  { label: 'In Development', value: 'in-development', hash: 'in-development' },
];

function hashToFilter(hash: string): 'all' | ProjectType {
  const match = filters.find((f) => f.hash === hash.replace('#', ''));
  return match ? match.value : 'all';
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<'all' | ProjectType>(() =>
    typeof window !== 'undefined' ? hashToFilter(window.location.hash) : 'all'
  );

  useEffect(() => {
    const onHashChange = () => setActive(hashToFilter(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  function selectFilter(value: 'all' | ProjectType, hash: string) {
    setActive(value);
    history.replaceState(null, '', hash ? `#${hash}` : window.location.pathname);
  }

  const filtered = active === 'all' ? projects : projects.filter((p) => p.type === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter projects by type">
        {filters.map((f) => (
          <button
            key={f.value}
            role="tab"
            aria-selected={active === f.value}
            onClick={() => selectFilter(f.value, f.hash)}
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
