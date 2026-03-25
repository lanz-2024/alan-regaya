import Link from 'next/link';
import { Badge } from '@/components/shared/Badge';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { projects } from '@/data/projects';

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6" aria-labelledby="featured-heading">
      <SectionHeading label="Selected Work" title="Featured Projects" subtitle="A selection of open-source tools and client work I'm proud of." />
      <div id="featured-heading" className="sr-only">Featured Projects</div>
      <div className="grid md:grid-cols-3 gap-6">
        {featured.map((project) => (
          <article key={project.id} className="glow-border rounded-lg p-6 bg-[var(--color-surface)] flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-[var(--color-text)]">{project.name}</h3>
              {project.stars && (
                <span className="font-mono text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                  ★ {project.stars}
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mb-4 flex-1 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.slice(0, 4).map((t) => <Badge key={t} label={t} />)}
            </div>
            <div className="flex items-center gap-3 text-sm">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-text)] hover:underline">
                  GitHub →
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel={project.type === 'client' ? 'noopener noreferrer nofollow' : 'noopener noreferrer'} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                  Live site ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link href="/projects" className="text-sm text-[var(--color-accent-text)] hover:underline">
          View all 13 projects →
        </Link>
      </div>
    </section>
  );
}
