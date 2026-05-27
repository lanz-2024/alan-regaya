import type { Metadata } from 'next';
import Image from 'next/image';
import { getGitHubStats } from '@/lib/github';
import { OriginStory } from '@/components/about/OriginStory';
import { Timeline } from '@/components/about/Timeline';
import { Skills } from '@/components/about/Skills';
import { Principles } from '@/components/about/Principles';
import { ContributionGraph } from '@/components/about/ContributionGraph';
import { ContactSection } from '@/components/shared/ContactSection';
import { siteConfig } from '@/data/site-config';
import { buildBreadcrumbList } from '@/lib/seo/breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn about ${siteConfig.name}'s background, experience, and the journey from tinkering with Friendster profiles to building production e-commerce platforms.`,
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: `Learn about ${siteConfig.name}'s background, experience, and the journey from tinkering with Friendster profiles to building production e-commerce platforms.`,
    url: `${siteConfig.url}/about`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    title: `About | ${siteConfig.name}`,
    description: `Learn about ${siteConfig.name}'s background, experience, and the journey from tinkering with Friendster profiles to building production e-commerce platforms.`,
    images: [siteConfig.ogImage],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: { '@id': `${siteConfig.url}/#person` },
};

const breadcrumbLd = buildBreadcrumbList([{ name: 'About', path: '/about' }]);

export default async function AboutPage() {
  const stats = await getGitHubStats();

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbLd} />
      <div className="pt-16">
        <OriginStory />
        <section id="about-me" className="py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
              <div className="flex justify-center md:justify-start md:sticky md:top-24">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-blue-500/30 opacity-60 blur" aria-hidden="true" />
                  <Image
                    src="/profile.png"
                    alt={`${siteConfig.name} — ${siteConfig.title}`}
                    width={224}
                    height={224}
                    priority={false}
                    sizes="(min-width: 768px) 224px, 176px"
                    className="relative w-44 h-44 md:w-56 md:h-56 rounded-full object-cover ring-2 ring-[var(--color-accent)]/60 ring-offset-4 ring-offset-[var(--color-surface)] shadow-xl"
                  />
                </div>
              </div>
              <div>
            <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-2">Today</p>
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="space-y-4 text-[var(--color-text-muted)] leading-relaxed">
              <p>
                I&apos;m a Full-Stack Developer with {siteConfig.yearsExperience}+ years of experience, currently at Blaze Commerce where I architect and build headless WooCommerce storefronts and the open-source tooling that powers them.
              </p>
              <p>
                My work sits at the intersection of modern frontend (Next.js, React, TypeScript) and deep WordPress/WooCommerce expertise — a combination that&apos;s rare and in demand as more stores migrate to headless architectures.
              </p>
              <p>
                Beyond client work, I maintain open-source projects with real traction:{' '}
                <a href="https://github.com/blaze-commerce/headless-woocommerce" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-text)] underline">
                  headless-woocommerce
                </a>{' '}
                has 91 stars and is used in production across multiple countries.
              </p>
              <p>
                I&apos;m currently exploring Rust and Tauri for cross-platform desktop tooling, and I&apos;m interested in opportunities where I can bring deep technical ownership to complex, high-traffic e-commerce systems.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[var(--color-text-muted)]">Education</p>
                <p className="text-[var(--color-text)] font-medium">BS Computer Science</p>
                <p className="text-[var(--color-text-muted)]">AMA Computer College, 2017</p>
              </div>
              <div>
                <p className="text-[var(--color-text-muted)]">Location</p>
                <p className="text-[var(--color-text)] font-medium">{siteConfig.location}</p>
                <p className="text-[var(--color-text-muted)]">{siteConfig.availability}</p>
              </div>
            </div>
              </div>
            </div>
          </div>
        </section>
        <Principles />
        <Timeline />
        <Skills />
        <ContributionGraph calendar={stats.contributionCalendar} />
        <ContactSection />
      </div>
    </>
  );
}
