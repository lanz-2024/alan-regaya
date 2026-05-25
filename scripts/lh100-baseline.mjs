#!/usr/bin/env node
// Baseline audit via PSI API (mobile). Compact output: scores + failing audit IDs per route.
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const BASE = process.env.LH_BASE || 'https://alanregaya.dev';
const ROUTES = [
  '/', '/about', '/services', '/projects', '/setup', '/contact',
  '/blog', '/faq', '/lessons', '/now', '/proof', '/privacy',
  '/blog/typesense-indexing-patterns-woocommerce',
  '/blog/tauri-vs-electron-lessons',
  '/blog/headless-woocommerce-architecture-decisions',
  '/blog/core-web-vitals-at-scale',
  '/blog/building-mcp-server-wordpress',
  '/blog/zero-downtime-wordpress-migrations',
  '/blog/ai-augmented-development-workflow',
  ...['woocommerce','headless','next-js','wordpress','ai','architecture','claude','claude-code','core-web-vitals','desktop','devops','electron','mcp','migrations','performance'].map(t => `/blog/tag/${t}`),
];

const outDir = join(process.cwd(), '.lh100');
await mkdir(outDir, { recursive: true });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function psi(url, attempt = 1) {
  const api = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  api.searchParams.set('url', url);
  api.searchParams.set('strategy', 'mobile');
  for (const c of ['performance', 'accessibility', 'best-practices', 'seo']) api.searchParams.append('category', c);
  if (process.env.PSI_API_KEY) api.searchParams.set('key', process.env.PSI_API_KEY);
  const r = await fetch(api);
  if (r.status === 429 && attempt <= 6) {
    const wait = 8000 * 2 ** (attempt - 1);
    console.log(`  429 backoff ${wait}ms (attempt ${attempt})`);
    await sleep(wait);
    return psi(url, attempt + 1);
  }
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

const summary = [];
for (const route of ROUTES) {
  const url = BASE + (route === '/' ? '' : route);
  process.stdout.write(`${route} ... `);
  try {
    const data = await psi(url);
    const lr = data.lighthouseResult;
    const scores = Object.fromEntries(Object.entries(lr.categories).map(([k, v]) => [k, Math.round((v.score ?? 0) * 100)]));
    const failed = new Map();
    for (const cat of Object.values(lr.categories)) {
      for (const ref of cat.auditRefs) {
        const a = lr.audits[ref.id];
        if (!a) continue;
        if (a.score !== null && a.score < 1 && ref.weight > 0) {
          failed.set(ref.id, { id: ref.id, cat: cat.id, weight: ref.weight, title: a.title, score: a.score });
        }
      }
    }
    const failedArr = [...failed.values()];
    summary.push({ route, scores, failed: failedArr });
    console.log(`${JSON.stringify(scores)} fails=${failedArr.length}`);
  } catch (e) {
    console.log(`ERR ${e.message}`);
    summary.push({ route, error: e.message });
  }
  await sleep(3000); // rate-limit cushion
}

await writeFile(join(outDir, 'summary.json'), JSON.stringify(summary, null, 2));
console.log(`\nwrote ${join(outDir, 'summary.json')}`);
