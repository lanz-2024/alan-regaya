import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactSection } from '@/components/shared/ContactSection';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { siteConfig } from '@/data/site-config';
import { buildBreadcrumbList } from '@/lib/seo/breadcrumbs';
import { buildWebPage } from '@/lib/seo/webpage';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Services',
  description: `What ${siteConfig.name} offers — headless WooCommerce builds, Next.js e-commerce, WordPress development, performance optimization, custom plugins, and architecture consulting. ${siteConfig.yearsExperience}+ years powering 7-figure online stores.`,
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    title: `Services | ${siteConfig.name}`,
    description: `What ${siteConfig.name} offers — headless WooCommerce builds, Next.js e-commerce, WordPress development, performance optimization, custom plugins, and architecture consulting.`,
    url: `${siteConfig.url}/services`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    title: `Services | ${siteConfig.name}`,
    description: `What ${siteConfig.name} offers — headless WooCommerce builds, Next.js e-commerce, WordPress development, performance optimization, custom plugins, and architecture consulting.`,
    images: [siteConfig.ogImage],
  },
};

const breadcrumbLd = buildBreadcrumbList([{ name: 'Services', path: '/services' }]);
const webPageLd = buildWebPage({
  path: '/services',
  name: `Services | ${siteConfig.name}`,
  description: `What ${siteConfig.name} offers — headless WooCommerce builds, Next.js e-commerce, WordPress development, performance optimization, custom plugins, and architecture consulting.`,
});

const services = [
  {
    icon: '🛒',
    name: 'Headless WooCommerce builds',
    description:
      'Next.js storefronts wired to a WordPress + WooCommerce back-end via REST/GraphQL. The exact stack behind blaze-commerce/headless-woocommerce — an open-source project running in production across multiple countries.',
    deliverables: ['Next.js storefront', 'WP/WC back-end', 'Typesense search', 'Order/cart sync'],
  },
  {
    icon: '⚡',
    name: 'Next.js & React applications',
    description:
      'Production Next.js apps with App Router, server components, ISR, and edge runtime. TypeScript end-to-end. Focused on TTFB, Core Web Vitals, and code that other engineers can maintain after I hand it off.',
    deliverables: ['App Router', 'Server Components', 'Vercel deploy', 'TypeScript strict'],
  },
  {
    icon: '🔧',
    name: 'WordPress & WooCommerce development',
    description:
      'Custom plugins, themes, payment/integration work, and back-of-house tooling. PHP 8.x, WP-CLI, properly tested. ~3 years of Laravel, CodeIgniter, and ASP.NET (C#) experience for custom internal apps and integrations outside WordPress. Equally comfortable in classic, block-based, and page-builder stacks — including Divi child themes and custom modules where a visual builder is non-negotiable.',
    deliverables: ['Custom plugins', 'Payment integrations', 'REST endpoints', 'WP-CLI tooling'],
  },
  {
    icon: '📊',
    name: 'Performance & Core Web Vitals',
    description: (
      <>
        Lighthouse audits and concrete fixes to hit 90+ across Performance, Accessibility, Best
        Practices, and SEO. This site holds 100/100/100/100 mobile —{' '}
        <Link href="/proof" className="underline hover:text-[var(--color-text)] transition-colors">
          see the proof
        </Link>
        .
      </>
    ),
    deliverables: ['Lighthouse 90+', 'Core Web Vitals', 'Bundle analysis', 'Image/font strategy'],
  },
  {
    icon: '🔍',
    name: 'Search, data & integrations',
    description:
      'Typesense-powered storefront search, MySQL schema design, Redis caching, and third-party API integrations (REST, GraphQL, webhooks). Indexes designed so a reindex is idempotent and a failed sync can’t corrupt the storefront.',
    deliverables: ['Typesense', 'MySQL / SQLite', 'Redis', 'REST / GraphQL'],
  },
  {
    icon: '🚚',
    name: 'Site & DNS migrations',
    description:
      'Zero-downtime moves between hosts and registrars — full WordPress/WooCommerce migrations, DNS cutovers with TTL pre-staging, MX/SPF/DKIM preservation, and Cloudflare proxy setup. Pre-flight checks, dry-run on staging, then go-live with rollback ready.',
    deliverables: ['DNS cutover', 'Host-to-host', 'Cloudflare', 'Zero downtime'],
  },
  {
    icon: '🛠️',
    name: 'WordPress maintenance & management',
    description:
      'Ongoing care for production WordPress and WooCommerce sites — core/plugin/theme updates on staging first, daily backups, uptime and security monitoring, malware cleanup, and monthly performance reports. Predictable retainers, not break-fix.',
    deliverables: ['Staged updates', 'Backups', 'Security', 'Uptime monitoring'],
  },
  {
    icon: '☁️',
    name: 'Hosting & CDN setup',
    description:
      'Provisioning and tuning across Kinsta, WP Engine, SiteGround, and Hostinger, with Cloudflare and Bunny.net for CDN/edge, and registrar work on GoDaddy and others. PHP/MySQL tuning, object cache, page rules, and TLS — set up so the host’s defaults actually work for you.',
    deliverables: ['Kinsta / WPE', 'SiteGround / Hostinger', 'Cloudflare / Bunny', 'GoDaddy DNS'],
  },
  {
    icon: '🧭',
    name: 'Architecture review & consulting',
    description: (
      <>
        Short engagements for teams considering a headless migration, stuck on a WooCommerce scaling
        problem, or weighing framework decisions. Same stack I run for paying clients, not theory —{' '}
        <Link href="/about" className="underline hover:text-[var(--color-text)] transition-colors">
          read more about me
        </Link>
        .
      </>
    ),
    deliverables: ['Tech audits', 'Migration plans', 'Code review', 'Team mentoring'],
  },
];

const process = [
  {
    step: '01',
    title: 'Scope',
    body: 'Async or a single call to map goals, constraints, and what success looks like.',
  },
  {
    step: '02',
    title: 'Proposal',
    body: 'A short written plan with scope, timeline, and a fixed or hourly rate before any code.',
  },
  {
    step: '03',
    title: 'Build',
    body: 'Weekly demos against a working branch. You hold the repo from commit one.',
  },
  {
    step: '04',
    title: 'Handover',
    body: 'README, runbook, and two weeks of bugfix support after launch.',
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <JsonLd data={webPageLd} />
      <JsonLd data={breadcrumbLd} />

      <section className="py-24" aria-labelledby="services-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            headingId="services-heading"
            label="What I Offer"
            title="Services"
            subtitle={`${siteConfig.yearsExperience}+ years building headless WooCommerce, Next.js, and WordPress for clients across AU, UK, and US. Below is what I take on most often.`}
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((s) => (
              <article
                key={s.name}
                className="glow-border rounded-lg p-6 bg-[var(--color-surface)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" aria-hidden="true">
                    {s.icon}
                  </span>
                  <h3 className="font-semibold text-lg">{s.name}</h3>
                </div>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">{s.description}</p>
                <ul className="flex flex-wrap gap-2" aria-label={`${s.name} — key tools`}>
                  {s.deliverables.map((d) => (
                    <li
                      key={d}
                      className="text-xs font-mono px-2 py-1 rounded border border-[var(--color-border)] text-[var(--color-text-muted)]"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]" aria-labelledby="process-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            headingId="process-heading"
            label="How I Work"
            title="Engagement"
            subtitle="Most engagements run async with a weekly check-in. I work remotely from the Philippines (UTC+8) with regular overlap into AU, UK, and US hours."
          />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p) => (
              <li key={p.step} className="rounded-lg p-6 bg-[var(--color-surface-2)] border border-[var(--color-border)]">
                <p className="text-xs font-mono text-[var(--color-accent-text)] mb-2">{p.step}</p>
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16" aria-label="Next steps">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            Want to see the stack in depth?{' '}
            <Link href="/about" className="underline hover:text-[var(--color-text)] transition-colors">
              Skills &amp; experience
            </Link>
            . Want proof the performance claims are real?{' '}
            <Link href="/proof" className="underline hover:text-[var(--color-text)] transition-colors">
              Live Lighthouse scores
            </Link>
            .
          </p>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
