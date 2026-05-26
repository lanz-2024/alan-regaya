// Median-of-3 audit on the 8 goal routes
import { writeFile } from 'fs/promises';

const BASE = process.env.LH_BASE || 'https://alanregaya.dev';
const KEY = process.env.PSI_API_KEY;
const GOAL = ['/', '/about', '/projects', '/blog', '/setup', '/services', '/proof', '/faq'];
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function psi(url, attempt = 1) {
  const u = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  u.searchParams.set('url', url);
  u.searchParams.set('strategy', 'mobile');
  for (const c of ['performance', 'accessibility', 'best-practices', 'seo']) u.searchParams.append('category', c);
  u.searchParams.set('key', KEY);
  const r = await fetch(u);
  if (r.status === 429 && attempt <= 5) {
    await sleep(8000 * 2 ** (attempt - 1));
    return psi(url, attempt + 1);
  }
  if (r.status === 500 && attempt <= 3) {
    await sleep(10000);
    return psi(url, attempt + 1);
  }
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

const median = arr => arr.sort((a,b) => a-b)[Math.floor(arr.length/2)];

const results = [];
for (const route of GOAL) {
  const url = BASE + (route === '/' ? '' : route);
  console.log(`\n=== ${route} ===`);
  const runs = [];
  for (let i = 0; i < 3; i++) {
    try {
      const j = await psi(url);
      const lr = j.lighthouseResult;
      const s = Object.fromEntries(Object.entries(lr.categories).map(([k,v])=>[k, Math.round((v.score??0)*100)]));
      const failed = [];
      for (const cat of Object.values(lr.categories)) {
        for (const ref of cat.auditRefs) {
          const a = lr.audits[ref.id];
          if (a?.score !== null && a?.score < 1 && ref.weight > 0) failed.push(ref.id);
        }
      }
      runs.push({ scores: s, failed: [...new Set(failed)] });
      console.log(`  run${i+1}: ${JSON.stringify(s)} fails=${failed.length}`);
    } catch (e) {
      console.log(`  run${i+1}: ERR ${e.message}`);
    }
    await sleep(3000);
  }
  const med = {
    performance: median(runs.map(r => r.scores.performance)),
    accessibility: median(runs.map(r => r.scores.accessibility)),
    'best-practices': median(runs.map(r => r.scores['best-practices'])),
    seo: median(runs.map(r => r.scores.seo)),
  };
  const allFails = [...new Set(runs.flatMap(r => r.failed))];
  results.push({ route, median: med, runs, allFails });
  console.log(`  MEDIAN: ${JSON.stringify(med)} | unique-fails: ${allFails.join(',')}`);
}

await writeFile('.lh100/goal.json', JSON.stringify(results, null, 2));
console.log('\n=== SUMMARY ===');
for (const r of results) {
  const all100 = Object.values(r.median).every(s => s === 100);
  console.log(`${all100 ? '✓' : '✗'} ${r.route.padEnd(12)} ${JSON.stringify(r.median)}`);
}
