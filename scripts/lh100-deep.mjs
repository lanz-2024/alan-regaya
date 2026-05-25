// Deep-dive: pull LCP element + CWV numerics for worst pages
import { writeFile } from 'fs/promises';

const KEY = process.env.PSI_API_KEY;
const WORST = [
  '/blog/zero-downtime-wordpress-migrations',
  '/blog/tag/core-web-vitals',
  '/blog/headless-woocommerce-architecture-decisions',
  '/blog/tag/architecture',
  '/blog/tag/claude',
  '/about',
  '/blog',
  '/contact',
];
const sleep = ms => new Promise(r => setTimeout(r, ms));

const out = [];
for (const route of WORST) {
  const u = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  u.searchParams.set('url', 'https://alanregaya.dev' + (route === '/' ? '' : route));
  u.searchParams.set('strategy', 'mobile');
  for (const c of ['performance', 'accessibility', 'best-practices', 'seo']) u.searchParams.append('category', c);
  u.searchParams.set('key', KEY);
  const r = await fetch(u);
  const j = await r.json();
  const a = j.lighthouseResult?.audits || {};
  const info = {
    route,
    perfScore: Math.round((j.lighthouseResult?.categories?.performance?.score ?? 0) * 100),
    fcp: a['first-contentful-paint']?.displayValue,
    lcp: a['largest-contentful-paint']?.displayValue,
    tbt: a['total-blocking-time']?.displayValue,
    cls: a['cumulative-layout-shift']?.displayValue,
    si: a['speed-index']?.displayValue,
    tti: a['interactive']?.displayValue,
    lcpElement: a['largest-contentful-paint-element']?.details?.items?.[0]?.node?.snippet
              || a['largest-contentful-paint-element']?.details?.items?.[0]?.node?.selector,
    consoleErrors: (a['errors-in-console']?.details?.items || []).map(i => i.description || i.source).slice(0, 5),
    cls_layoutShifts: (a['layout-shifts']?.details?.items || []).map(i => ({ node: i.node?.snippet || i.node?.selector, score: i.score })).slice(0, 3),
    unusedJsBytes: a['unused-javascript']?.details?.overallSavingsBytes,
    unusedJsItems: (a['unused-javascript']?.details?.items || []).map(i => ({ url: i.url, wastedBytes: i.wastedBytes })).slice(0, 3),
    renderBlockingItems: (a['render-blocking-resources']?.details?.items || []).map(i => ({ url: i.url, wastedMs: i.wastedMs })).slice(0, 5),
    headingOrder: (a['heading-order']?.details?.items || []).map(i => i.node?.snippet).slice(0, 3),
    colorContrast: (a['color-contrast']?.details?.items || []).map(i => ({ node: i.node?.snippet, snippet: i.node?.explanation })).slice(0, 3),
  };
  out.push(info);
  console.log(JSON.stringify(info, null, 2));
  await sleep(2000);
}

await writeFile('.lh100/deep.json', JSON.stringify(out, null, 2));
