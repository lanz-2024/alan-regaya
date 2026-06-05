#!/usr/bin/env node
// Build-time PageSpeed Insights refresher.
//
//   npm run measure:psi   # refreshes src/data/proof.ts from live PSI
//   PSI_SKIP=1 npm run build   # skip the refresh (fast local builds)
//
// Runs on EVERY build via `prebuild` — deploys and redeploys alike — so
// the /proof wall always shows scores measured against the previously
// deployed production site, taken right before this deployment.
//
// Hits the public PSI API once per page+strategy and rewrites
// src/data/proof.ts. Zero runtime cost on the deployed site.
//
// Safety (skip-with-warning, never crash the build):
//   1. PSI_SKIP=1        → skip explicitly
//   2. Any fetch error   → keep existing proof.ts
//
// PSI_API_KEY is optional but recommended — anonymous PSI is throttled;
// the fetcher backs off on 429s either way. Get a free key at
// https://console.cloud.google.com/apis/credentials
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

const skip = (reason) => {
  console.log(`[measure-psi] skip: ${reason}`);
  process.exit(0);
};

// --- Safety gate 1: explicit opt-out only --------------------------------
// Scores MUST refresh on every build (deploys AND redeploys), so there is
// no staleness or env gate. PSI_SKIP=1 is the single escape hatch.
if (process.env.PSI_SKIP === '1') {
  skip('PSI_SKIP=1 set — keeping existing proof.ts');
}
if (!process.env.PSI_API_KEY) {
  console.log('[measure-psi] PSI_API_KEY not set — running anonymously (throttled, with backoff)');
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
  // Retry throttling (429) AND transient PSI server errors (5xx) — a single
  // flaky 500 must not abort the whole refresh (it did, on prod builds).
  if ((r.status === 429 || r.status >= 500) && attempt <= 5) {
    const wait = 5000 * 2 ** (attempt - 1);
    console.log(`  HTTP ${r.status} — backing off ${wait}ms (attempt ${attempt})`);
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
    tbt: fmtMs(tbt),
    cls: cls.toFixed(2),
    ttfb: fmtMs(ttfb),
  };
}

// Previous rows for per-page fallback. Script-generated proof.ts arrays are
// valid JSON; hand-edited legacy data won't parse and simply yields no fallback.
let previousRuns = [];
try {
  const src = await readFile(OUT, 'utf8');
  const m = src.match(/proofRuns: ProofRun\[\] = (\[[\s\S]*?\n\]);/);
  if (m) previousRuns = JSON.parse(m[1]);
} catch {
  // first run or unparseable — no fallback entries
}

// --- Safety gate 2: never crash the build -------------------------------
try {
  const today = new Date().toISOString().slice(0, 10);
  const runs = [];
  for (const { page, url } of PAGES) {
    console.log(`Measuring ${page} (${url})...`);
    try {
      const [mobile, desktop] = await Promise.all([
        fetchPsi(url, 'mobile'),
        fetchPsi(url, 'desktop'),
      ]);
      runs.push({
        page,
        url,
        measuredAt: today,
        mobile: extractScores(mobile),
        desktop: extractScores(desktop),
        vitals: extractVitals(mobile),
      });
    } catch (err) {
      // Per-page fallback: keep this page's previous entry so one stubborn
      // page can't abort the refresh of the other eight.
      const prev = previousRuns.find((r) => r.url === url);
      if (!prev) throw err;
      console.warn(`  WARN: ${err.message} — keeping previous ${page} entry (${prev.measuredAt})`);
      runs.push(prev);
    }
    await sleep(1000);
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
  tbt: string;
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
