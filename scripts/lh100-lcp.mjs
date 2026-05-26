// Find actual LCP element on each route - PSI audit ID is "largest-contentful-paint-element"
import { writeFile } from 'fs/promises';

const KEY = process.env.PSI_API_KEY;
const ROUTES = [
  '/', '/about', '/projects', '/blog', '/setup', '/services', '/proof', '/faq',
  '/contact', '/lessons', '/now',
  '/blog/zero-downtime-wordpress-migrations',
  '/blog/headless-woocommerce-architecture-decisions',
  '/blog/tag/core-web-vitals',
  '/blog/tag/architecture',
  '/blog/tag/claude',
];
const sleep = ms => new Promise(r => setTimeout(r, ms));

const out = [];
for (const route of ROUTES) {
  const u = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  u.searchParams.set('url', 'https://alanregaya.dev' + (route === '/' ? '' : route));
  u.searchParams.set('strategy', 'mobile');
  u.searchParams.append('category', 'performance');
  u.searchParams.set('key', KEY);
  try {
    const r = await fetch(u);
    const j = await r.json();
    const a = j.lighthouseResult?.audits || {};
    const lcpEl = a['largest-contentful-paint-element']?.details?.items?.[0];
    const node = lcpEl?.node || lcpEl?.items?.[0]?.node;
    const info = {
      route,
      perf: Math.round((j.lighthouseResult?.categories?.performance?.score ?? 0) * 100),
      lcp: a['largest-contentful-paint']?.displayValue,
      fcp: a['first-contentful-paint']?.displayValue,
      tbt: a['total-blocking-time']?.displayValue,
      lcpElementSnippet: node?.snippet,
      lcpElementSelector: node?.selector,
      lcpElementType: node?.nodeLabel,
      // Diagnostics
      networkRttMs: a['network-rtt']?.numericValue,
      mainThreadWorkBreakdownMs: a['mainthread-work-breakdown']?.numericValue,
      bootupTimeMs: a['bootup-time']?.numericValue,
      // LCP phases
      lcpPhases: a['largest-contentful-paint']?.numericValue,
      preloadLcpImage: a['prioritize-lcp-image']?.details?.items,
    };
    out.push(info);
    console.log(`${route} perf=${info.perf} lcp=${info.lcp} LCP=${(node?.nodeLabel || '?').slice(0,60)} ${(node?.snippet || '').slice(0,80)}`);
  } catch (e) {
    console.log(`${route} ERR ${e.message}`);
  }
  await sleep(2000);
}

await writeFile('.lh100/lcp.json', JSON.stringify(out, null, 2));
