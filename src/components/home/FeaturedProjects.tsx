'use client';
import Link from 'next/link';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projects } from '@/data/projects';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  const { ref, isVisible } = useIntersectionObserver(0.1);

  return (
    <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6" aria-labelledby="featured-heading">
      <SectionHeading label="Selected Work" title="Featured Projects" subtitle="A selection of client work and open-source tools I'm proud of." />
      <div id="featured-heading" className="sr-only">Featured Projects</div>
      <div ref={ref} className={`fade-in${isVisible ? ' visible' : ''} grid md:grid-cols-3 gap-6`}>
        {featured.map((project, i) => (
          <ProjectCard key={project.id} project={project} priority={i === 0} />
        ))}
      </div>
      <div className="text-center mt-10">
        <Link href="/projects" className="text-sm text-[var(--color-accent-text)] hover:underline">
          View all {projects.length} projects →
        </Link>
      </div>
    </section>
  );
}
