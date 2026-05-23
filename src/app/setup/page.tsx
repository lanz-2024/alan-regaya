import type { Metadata } from 'next';
import { ClaudeHighlight } from '@/components/setup/ClaudeHighlight';
import { GearGrid } from '@/components/setup/GearGrid';
import { HobbiesSection } from '@/components/setup/HobbiesSection';
import { Colophon } from '@/components/setup/Colophon';
import { ContactSection } from '@/components/shared/ContactSection';
import { siteConfig } from '@/data/site-config';
import { buildBreadcrumbList } from '@/lib/seo/breadcrumbs';

export const metadata: Metadata = {
  title: 'Setup',
  description: `The workstation gear, AI development workflow, and hobbies of ${siteConfig.name} — a full-stack developer based in the Philippines.`,
  alternates: { canonical: `${siteConfig.url}/setup` },
  openGraph: {
    title: `Setup | ${siteConfig.name}`,
    description: `The workstation gear, AI development workflow, and hobbies of ${siteConfig.name}.`,
    url: `${siteConfig.url}/setup`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    title: `Setup | ${siteConfig.name}`,
    description: `The workstation gear, AI development workflow, and hobbies of ${siteConfig.name}.`,
    images: [siteConfig.ogImage],
  },
};

const breadcrumbLd = buildBreadcrumbList([{ name: 'Setup', path: '/setup' }]);

export default function SetupPage() {
  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ClaudeHighlight />
      <GearGrid />
      <HobbiesSection />
      <Colophon />
      <ContactSection />
    </div>
  );
}
