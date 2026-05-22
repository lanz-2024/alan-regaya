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
