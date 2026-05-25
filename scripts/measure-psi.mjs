#!/usr/bin/env node
// Build-time PageSpeed Insights refresher.
//
//   npm run measure:psi           # respects all safety conditions
//   PSI_FORCE=1 npm run measure:psi   # bypass staleness + env checks
//
// Hits the public PSI API once per page+strategy and rewrites
// src/data/proof.ts. Designed to run on a developer machine or in CI
// — zero runtime cost on the deployed site, so refreshing never
// hinders the live scores.
//
// Safety conditions (skip-with-warning, never crash the build):
//   1. No PSI_API_KEY            → skip (anonymous PSI is throttled)
//   2. VERCEL_ENV !== 'production' (preview/dev) → skip
//   3. Existing data younger than PSI_MAX_AGE_DAYS (default 7) → skip
//   4. Any fetch error           → skip, keep existing proof.ts
//
// Override with PSI_FORCE=1.
//
// Get a free key at https://console.cloud.google.com/apis/credentials
// (restrict to "PageSpeed Insights API").

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '..', 'src/data/proof.ts');

const PAGES = [
  { page: 'Home',     url: 'https://alanregaya.dev/' },
  { page: 'About',    url: 'https://alanregaya.dev/about' },
  { page: 'Projects', url: 'https://alanregaya.dev/projects' },
  { page: 'Blog',     url: 'https://alanregaya.dev/blog' },
  { page: 'FAQ',      url: 'https://alanregaya.dev/faq' },
  { page: 'Setup',    url: 'https://alanregaya.dev/setup' },
  { page: 'Proof',    url: 'https://alanregaya.dev/proof' },
  { page: 'Lessons',  url: 'https://alanregaya.dev/lessons' },
  { page: 'Now',      url: 'https://alanregaya.dev/now' },
];

const FORCE = process.env.PSI_FORCE === '1';
const MAX_AGE_DAYS = Number(process.env.PSI_MAX_AGE_DAYS ?? 7);

const skip = (reason) => {
  console.log(`[measure-psi] skip: ${reason} (set PSI_FORCE=1 to override)`);
  process.exit(0);
};

// --- Safety gate 1: API key ---------------------------------------------
if (!process.env.PSI_API_KEY && !FORCE) {
  skip('PSI_API_KEY not set — anonymous PSI is rate-limited');
}

// --- Safety gate 2: production-only -------------------------------------
// VERCEL_ENV is "production" | "preview" | "development".
// Locally (no VERCEL_ENV), allow the run so devs can refresh manually.
if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production' && !FORCE) {
  skip(`VERCEL_ENV=${process.env.VERCEL_ENV} — only refresh on production`);
}

// --- Safety gate 3: data freshness --------------------------------------
let existing = '';
try {
  existing = await readFile(OUT, 'utf8');
} catch {
  // first run; existing stays empty
}
if (!FORCE && existing) {
  const m = existing.match(/"measuredAt":\s*"(\d{4}-\d{2}-\d{2})"/);
  if (m) {
    const ageMs = Date.now() - new Date(m[1]).getTime();
    const ageDays = ageMs / 86400000;
    if (ageDays < MAX_AGE_DAYS) {
      skip(`data is ${ageDays.toFixed(1)} days old (< ${MAX_AGE_DAYS}d threshold)`);
    }
  }
}

const round = (n) => Math.round(Number(n) * 100);
const fmtMs = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}s` : `${Math.round(n)}ms`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchPsi(url, strategy, attempt = 1) {
  const api = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  api.searchParams.set('url', url);
  api.searchParams.set('strategy', strategy);
  for (const c of ['performance', 'accessibility', 'best-practices', 'seo']) {
    api.searchParams.append('category', c);
  }
  if (process.env.PSI_API_KEY) api.searchParams.set('key', process.env.PSI_API_KEY);
  const r = await fetch(api, { headers: { 'User-Agent': 'measure-psi/1.0' } });
  if (r.status === 429 && attempt <= 5) {
    const wait = 5000 * 2 ** (attempt - 1);
    console.log(`  429 — backing off ${wait}ms (attempt ${attempt})`);
    await sleep(wait);
    return fetchPsi(url, strategy, attempt + 1);
  }
  if (!r.ok) throw new Error(`PSI ${url} ${strategy}: HTTP ${r.status}`);
  return r.json();
}

function extractScores(data) {
  const cats = data.lighthouseResult?.categories ?? {};
  return {
    performance: round(cats.performance?.score ?? 0),
    accessibility: round(cats.accessibility?.score ?? 0),
    bestPractices: round(cats['best-practices']?.score ?? 0),
    seo: round(cats.seo?.score ?? 0),
  };
}

function extractVitals(mobileData) {
  const audits = mobileData.lighthouseResult?.audits ?? {};
  const lcp = audits['largest-contentful-paint']?.numericValue ?? 0;
  const cls = audits['cumulative-layout-shift']?.numericValue ?? 0;
  const tbt = audits['total-blocking-time']?.numericValue ?? 0;
  const ttfb = audits['server-response-time']?.numericValue ?? 0;
  return {
    lcp: fmtMs(lcp),
    inp: fmtMs(tbt),
    cls: cls.toFixed(2),
    ttfb: fmtMs(ttfb),
  };
}

// --- Safety gate 4: never crash the build -------------------------------
try {
  const today = new Date().toISOString().slice(0, 10);
  const runs = [];
  for (const { page, url } of PAGES) {
    console.log(`Measuring ${page} (${url})...`);
    const mobile = await fetchPsi(url, 'mobile');
    await sleep(2000);
    const desktop = await fetchPsi(url, 'desktop');
    await sleep(2000);
    runs.push({
      page,
      url,
      measuredAt: today,
      mobile: extractScores(mobile),
      desktop: extractScores(desktop),
      vitals: extractVitals(mobile),
    });
  }

  const stack = [
    { label: 'Framework', value: 'Next.js 16 (App Router, static export)' },
    { label: 'Rendering', value: 'Pre-rendered static HTML' },
    { label: 'Styling', value: 'Tailwind CSS v4 + critters CSS inlining' },
    { label: 'Images', value: 'AVIF/WebP, responsive sizes, lazy-loaded' },
    { label: 'Fonts', value: 'next/font (subset, swap), preload disabled for mono' },
    { label: 'Hosting', value: 'Vercel edge CDN' },
    { label: 'Security', value: 'CSP, HSTS, Turnstile on contact form' },
  ];

  const out = `export type LighthouseScores = {
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

export const proofRuns: ProofRun[] = ${JSON.stringify(runs, null, 2)};

export const proofStack = ${JSON.stringify(stack, null, 2)};
`;

  await writeFile(OUT, out, 'utf8');
  console.log(`[measure-psi] wrote ${OUT}`);
  for (const r of runs) {
    console.log(`  ${r.page.padEnd(10)} mobile ${JSON.stringify(r.mobile)} | desktop ${JSON.stringify(r.desktop)}`);
  }
} catch (err) {
  console.warn(`[measure-psi] WARN: ${err.message} — keeping existing proof.ts`);
  process.exit(0);
}
