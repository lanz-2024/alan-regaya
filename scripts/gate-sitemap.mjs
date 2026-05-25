#!/usr/bin/env node
// Pre-push sitemap-coverage gate.
//
// Walks src/app/**/page.tsx, enumerates static routes, and confirms each one
// has a matching entry in src/app/sitemap.ts. Dynamic routes ([slug], [tag])
// are skipped — they're data-driven in sitemap.ts.
//
// Bypass:
//   git push --no-verify
//   SITEMAP_GATE_SKIP=1 git push

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname, '..');
const APP_DIR = join(REPO, 'src', 'app');
const SITEMAP_FILE = join(APP_DIR, 'sitemap.ts');

if (process.env.SITEMAP_GATE_SKIP === '1') {
  console.warn('[sitemap-gate] SITEMAP_GATE_SKIP=1 — bypassing');
  process.exit(0);
}

// Routes excluded from the gate (noindex etc.) — kept in sync with gate-schema.mjs.
const EXCLUDE_ROUTES = new Set(['/privacy']);

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, acc);
    else if (entry === 'page.tsx') acc.push(p);
  }
  return acc;
}

function routeFromPath(filePath) {
  const rel = relative(APP_DIR, filePath).replace(/\\/g, '/').replace(/\/page\.tsx$/, '');
  if (rel === 'page.tsx' || rel === '') return '/';
  return '/' + rel;
}

function isDynamic(route) {
  return route.includes('[');
}

// --- Discover static routes from filesystem --------------------------------
const discovered = walk(APP_DIR)
  .map(routeFromPath)
  .filter((r) => !isDynamic(r) && !EXCLUDE_ROUTES.has(r));

// --- Parse declared routes from sitemap.ts ---------------------------------
const sitemapSrc = readFileSync(SITEMAP_FILE, 'utf8');

// Match every `${siteConfig.url}` and `${siteConfig.url}<path>` literal.
// Examples we want to match:
//   `${siteConfig.url}`                  -> /
//   `${siteConfig.url}/about`            -> /about
//   `${siteConfig.url}/blog/${post.slug}` (dynamic — ignored, has nested interpolation)
const declared = new Set();
const tplRe = /`\$\{siteConfig\.url\}([^`]*)`/g;
let m;
while ((m = tplRe.exec(sitemapSrc)) !== null) {
  const tail = m[1];
  if (tail.includes('${')) continue; // dynamic expansion, skip
  declared.add(tail === '' ? '/' : tail);
}
// Bare `url: siteConfig.url,` (no template literal) = homepage entry.
if (/url\s*:\s*siteConfig\.url\s*[,}]/.test(sitemapSrc)) {
  declared.add('/');
}

// --- Diff ------------------------------------------------------------------
const missing = discovered.filter((r) => !declared.has(r));

console.log(`[sitemap-gate] discovered ${discovered.length} static route(s), sitemap declares ${declared.size}`);

if (missing.length === 0) {
  console.log('[sitemap-gate] ✓ all static routes covered');
  process.exit(0);
}

console.error(`\n[sitemap-gate] ✗ ${missing.length} route(s) missing from ${relative(REPO, SITEMAP_FILE)}:\n`);
const today = new Date().toISOString().slice(0, 10);
for (const route of missing) {
  console.error(`  ${route}`);
  console.error(`    Add to src/app/sitemap.ts:`);
  console.error(
    `      { url: \`\${siteConfig.url}${route === '/' ? '' : route}\`, lastModified: new Date('${today}'), changeFrequency: 'monthly', priority: 0.7 },`
  );
  console.error('');
}
console.error('[sitemap-gate] bypass: SITEMAP_GATE_SKIP=1 git push  (or --no-verify)');
process.exit(1);
