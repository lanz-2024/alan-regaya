import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ContactSection } from '@/components/shared/ContactSection';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Projects',
  description: `Open-source libraries, client storefronts, and in-development work by ${siteConfig.name}. Headless WooCommerce, Next.js, WordPress, and more.`,
  alternates: { canonical: `${siteConfig.url}/projects` },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description: `Open-source libraries, client storefronts, and in-development work by ${siteConfig.name}. Headless WooCommerce, Next.js, WordPress, and more.`,
    url: `${siteConfig.url}/projects`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    title: `Projects | ${siteConfig.name}`,
    description: `Open-source libraries, client storefronts, and in-development work by ${siteConfig.name}. Headless WooCommerce, Next.js, WordPress, and more.`,
    images: [siteConfig.ogImage],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Projects by Alan Regaya',
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    description: p.description,
    url: p.caseStudy
      ? `${siteConfig.url}/projects/${p.id}`
      : p.type === 'client'
      ? `${siteConfig.url}/projects#${p.id}`
      : (p.github ?? `${siteConfig.url}/projects#${p.id}`),
  })),
};

const firstScreenshot = projects.find((p) => p.screenshot)?.screenshot;

export default function ProjectsPage() {
  return (
    <>
      {firstScreenshot && <link rel="preload" as="image" href={firstScreenshot} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <SectionHeading
            label="Portfolio"
            title="All Projects"
            subtitle="Open-source tools, client storefronts, and work in progress. 13 projects spanning e-commerce, desktop apps, and web tooling."
          />
          <ProjectGrid projects={projects} />
        </div>
        <ContactSection />
      </div>
    </>
  );
}
