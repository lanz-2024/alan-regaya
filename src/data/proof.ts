export type LighthouseScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

export type CoreWebVitals = {
  lcp: string;
  inp: string;
  cls: string;
  ttfb: string;
};

export type ProofRun = {
  page: string;
  url: string;
  measuredAt: string;
  mobile: LighthouseScores;
  desktop: LighthouseScores;
  vitals: CoreWebVitals;
};

export const proofRuns: ProofRun[] = [
  {
    page: 'Home',
    url: 'https://alanregaya.dev/',
    measuredAt: '2026-05-23',
    mobile: { performance: 100, accessibility: 100, bestPractices: 100, seo: 100 },
    desktop: { performance: 100, accessibility: 100, bestPractices: 100, seo: 100 },
    vitals: { lcp: '1.1s', inp: '24ms', cls: '0.00', ttfb: '180ms' },
  },
  {
    page: 'About',
    url: 'https://alanregaya.dev/about',
    measuredAt: '2026-05-23',
    mobile: { performance: 100, accessibility: 100, bestPractices: 100, seo: 100 },
    desktop: { performance: 100, accessibility: 100, bestPractices: 100, seo: 100 },
    vitals: { lcp: '1.0s', inp: '20ms', cls: '0.00', ttfb: '170ms' },
  },
  {
    page: 'Projects',
    url: 'https://alanregaya.dev/projects',
    measuredAt: '2026-05-23',
    mobile: { performance: 99, accessibility: 100, bestPractices: 100, seo: 100 },
    desktop: { performance: 100, accessibility: 100, bestPractices: 100, seo: 100 },
    vitals: { lcp: '1.2s', inp: '22ms', cls: '0.00', ttfb: '175ms' },
  },
  {
    page: 'Blog',
    url: 'https://alanregaya.dev/blog',
    measuredAt: '2026-05-23',
    mobile: { performance: 100, accessibility: 100, bestPractices: 100, seo: 100 },
    desktop: { performance: 100, accessibility: 100, bestPractices: 100, seo: 100 },
    vitals: { lcp: '1.0s', inp: '18ms', cls: '0.00', ttfb: '165ms' },
  },
  {
    page: 'FAQ',
    url: 'https://alanregaya.dev/faq',
    measuredAt: '2026-05-24',
    mobile: { performance: 51, accessibility: 100, bestPractices: 100, seo: 100 },
    desktop: { performance: 41, accessibility: 92, bestPractices: 92, seo: 92 },
    vitals: { lcp: '3.3s', inp: '80ms', cls: '0.00', ttfb: '—' },
  },
  {
    page: 'Setup',
    url: 'https://alanregaya.dev/setup',
    measuredAt: '2026-05-24',
    mobile: { performance: 51, accessibility: 78, bestPractices: 75, seo: 92 },
    desktop: { performance: 96, accessibility: 95, bestPractices: 92, seo: 92 },
    vitals: { lcp: '3.8s', inp: '500ms', cls: '0.00', ttfb: '600ms' },
  },
  {
    page: 'Proof',
    url: 'https://alanregaya.dev/proof',
    measuredAt: '2026-05-24',
    mobile: { performance: 96, accessibility: 95, bestPractices: 92, seo: 92 },
    desktop: { performance: 100, accessibility: 100, bestPractices: 100, seo: 100 },
    vitals: { lcp: '2.1s', inp: '0ms', cls: '0.00', ttfb: '900ms' },
  },
  {
    page: 'Lessons',
    url: 'https://alanregaya.dev/lessons',
    measuredAt: '2026-05-24',
    mobile: { performance: 93, accessibility: 95, bestPractices: 92, seo: 90 },
    desktop: { performance: 99, accessibility: 95, bestPractices: 92, seo: 100 },
    vitals: { lcp: '1.7s', inp: '30ms', cls: '0.00', ttfb: '600ms' },
  },
  {
    page: 'Now',
    url: 'https://alanregaya.dev/now',
    measuredAt: '2026-05-24',
    mobile: { performance: 51, accessibility: 91, bestPractices: 92, seo: 92 },
    desktop: { performance: 51, accessibility: 100, bestPractices: 100, seo: 100 },
    vitals: { lcp: '3.4s', inp: '149ms', cls: '0.00', ttfb: '601ms' },
  },
];

export const proofStack = [
  { label: 'Framework', value: 'Next.js 16 (App Router, static export)' },
  { label: 'Rendering', value: 'Pre-rendered static HTML' },
  { label: 'Styling', value: 'Tailwind CSS v4 + critters CSS inlining' },
  { label: 'Images', value: 'AVIF/WebP, responsive sizes, lazy-loaded' },
  { label: 'Fonts', value: 'next/font (subset, swap), preload disabled for mono' },
  { label: 'Hosting', value: 'Vercel edge CDN' },
  { label: 'Security', value: 'CSP, HSTS, Turnstile on contact form' },
];
