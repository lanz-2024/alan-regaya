import type { Metadata } from 'next';
import { ProofGrid } from '@/components/proof/ProofGrid';
import { ContactSection } from '@/components/shared/ContactSection';
import { siteConfig } from '@/data/site-config';
import { buildBreadcrumbList } from '@/lib/seo/breadcrumbs';

const breadcrumbLd = buildBreadcrumbList([{ name: 'Proof', path: '/proof' }]);

export const metadata: Metadata = {
  title: 'Proof',
  description: `Lighthouse and Core Web Vitals scores for ${siteConfig.name}'s portfolio — verifiable on PageSpeed Insights.`,
  alternates: { canonical: `${siteConfig.url}/proof` },
  openGraph: {
    title: `Proof | ${siteConfig.name}`,
    description: `Lighthouse and Core Web Vitals scores for ${siteConfig.name}'s portfolio.`,
    url: `${siteConfig.url}/proof`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    title: `Proof | ${siteConfig.name}`,
    description: `Lighthouse and Core Web Vitals scores for ${siteConfig.name}'s portfolio.`,
    images: [siteConfig.ogImage],
  },
};

export default function ProofPage() {
  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ProofGrid />
      <ContactSection />
    </div>
  );
}
