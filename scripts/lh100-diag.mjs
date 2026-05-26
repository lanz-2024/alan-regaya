// Deep diagnostic on a single route
import { writeFile } from 'fs/promises';
const KEY = process.env.PSI_API_KEY;
const BASE = process.env.LH_BASE || 'https://alanregaya.dev';
const ROUTE = process.argv[2] || '/setup';
const u = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
u.searchParams.set('url', BASE + (ROUTE === '/' ? '' : ROUTE));
u.searchParams.set('strategy', 'mobile');
u.searchParams.append('category', 'performance');
u.searchParams.set('key', KEY);
const r = await fetch(u);
const j = await r.json();
const a = j.lighthouseResult?.audits || {};
const lcp = a['largest-contentful-paint'];

function dumpAudit(id) {
  const x = a[id];
  if (!x) return console.log(`  ${id}: (missing)`);
  console.log(`  ${id}: score=${x.score} display=${x.displayValue}`);
  if (x.details?.items?.length) {
    for (const i of x.details.items.slice(0, 5)) {
      const node = i.node || i.element;
      const snippet = (node?.snippet || '').slice(0, 100);
      const sel = (node?.selector || '').slice(0, 80);
      const url = (i.url || '').slice(0, 100);
      const wbytes = i.wastedBytes;
      const wms = i.wastedMs;
      console.log(`    - sel=${sel} sn="${snippet}" url=${url} wb=${wbytes} wms=${wms}`);
    }
  }
}

console.log(`Route ${ROUTE} perf=${Math.round((j.lighthouseResult?.categories?.performance?.score ?? 0) * 100)}`);
console.log(`CWV: FCP=${a['first-contentful-paint']?.displayValue} LCP=${lcp?.displayValue} TBT=${a['total-blocking-time']?.displayValue} CLS=${a['cumulative-layout-shift']?.displayValue} SI=${a['speed-index']?.displayValue} TTI=${a['interactive']?.displayValue}`);
console.log('\n[opportunities + diagnostics]');
for (const id of [
  'largest-contentful-paint-element',
  'prioritize-lcp-image',
  'lcp-lazy-loaded',
  'render-blocking-resources',
  'render-blocking-insight',
  'unused-css-rules',
  'unused-javascript',
  'unminified-css',
  'unminified-javascript',
  'modern-image-formats',
  'uses-optimized-images',
  'uses-responsive-images',
  'efficient-animated-content',
  'duplicated-javascript',
  'legacy-javascript',
  'preload-fonts',
  'font-display',
  'uses-text-compression',
  'uses-rel-preconnect',
  'uses-rel-preload',
  'critical-request-chains',
  'network-server-latency',
  'network-rtt',
  'bootup-time',
  'mainthread-work-breakdown',
  'dom-size',
  'third-party-summary',
  'third-party-facades',
]) dumpAudit(id);
