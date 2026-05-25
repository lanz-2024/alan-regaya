import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { siteConfig } from '@/data/site-config';
import { Badge } from '@/components/shared/Badge';
import { ContactSection } from '@/components/shared/ContactSection';
import { buildBreadcrumbList } from '@/lib/seo/breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug && p.caseStudy);
  if (!project || !project.caseStudy) return {};
  const url = `${siteConfig.url}/projects/${project.id}`;
  const title = `${project.name} — Case Study`;
  return {
    title,
    description: project.caseStudy.summary,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: project.caseStudy.summary,
      url,
      type: 'article',
      publishedTime: project.caseStudy.shippedAt,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: project.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.caseStudy.summary,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug && p.caseStudy);
  if (!project || !project.caseStudy) notFound();

  const cs = project.caseStudy;
  const url = `${siteConfig.url}/projects/${project.id}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${project.name} — Case Study`,
    description: cs.summary,
    datePublished: cs.shippedAt,
    author: { '@type': 'Person', name: siteConfig.name, url: siteConfig.url },
    url,
  };

  const breadcrumbLd = buildBreadcrumbList([
    { name: 'Projects', path: '/projects' },
    { name: project.name, path: `/projects/${project.id}` },
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbLd} />
      <div className="pt-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
          <Link
            href="/projects"
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-8 inline-block"
          >
            ← All projects
          </Link>

          <header className="mb-10">
            {project.role && (
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-text)] mb-3">
                {project.role}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-4 leading-tight">
              {project.name}
            </h1>
            <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">{cs.summary}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-muted)]">
              <time dateTime={cs.shippedAt}>
                Shipped{' '}
                {new Date(cs.shippedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
              </time>
              {project.liveUrl && (
                <>
                  <span aria-hidden>·</span>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-[var(--color-accent-text)] hover:underline"
                  >
                    Visit live site ↗
                  </a>
                </>
              )}
            </div>
          </header>

          {project.screenshot && (
            <div className="relative aspect-video overflow-hidden rounded-lg bg-[var(--color-surface-2)] mb-10 glow-border">
              <Image
                src={project.screenshot}
                alt={`Screenshot of ${project.name}`}
                fill
                priority
                fetchPriority="high"
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 960px"
              />
            </div>
          )}

          {cs.metrics && cs.metrics.length > 0 && (
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12">
              {cs.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
                >
                  <dt className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                    {m.label}
                  </dt>
                  <dd className="text-xl font-semibold text-[var(--color-accent-text)] mt-1">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="space-y-10 mb-12">
            {cs.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-xl font-semibold text-[var(--color-text)] mb-3">{s.heading}</h2>
                <div
                  className="prose prose-sm"
                  dangerouslySetInnerHTML={{ __html: s.body }}
                />
              </section>
            ))}
          </div>

          {project.tradeoff && (
            <aside className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 mb-12">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-accent-text)] mb-2">
                Key trade-off
              </p>
              <p className="text-[var(--color-text)] font-medium mb-1">{project.tradeoff.decision}</p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {project.tradeoff.rationale}
              </p>
            </aside>
          )}

          <div className="mb-12">
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
              Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <Badge key={t} label={t} />
              ))}
            </div>
          </div>
        </article>
        <ContactSection />
      </div>
    </>
  );
}
