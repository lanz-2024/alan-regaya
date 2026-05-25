import { readFileSync } from 'fs';
const s = JSON.parse(readFileSync('.lh100/summary.json', 'utf8'));
const byAudit = {};
for (const r of s) {
  if (!r.failed) continue;
  for (const f of r.failed) {
    const k = f.id + '|' + f.cat;
    byAudit[k] = byAudit[k] || { id: f.id, cat: f.cat, title: f.title, weight: f.weight, routes: [] };
    byAudit[k].routes.push(r.route);
  }
}
const list = Object.values(byAudit).sort((a, b) => b.routes.length - a.routes.length);
for (const x of list) {
  console.log(`[${x.cat}] ${x.id} (w=${x.weight}) → ${x.routes.length} routes  | ${x.title}`);
  if (x.routes.length <= 5) console.log('   ', x.routes.join(', '));
}
console.log('\n--- perf scores ---');
for (const r of s) if (r.scores && r.scores.performance < 100) console.log(`  ${r.scores.performance}  ${r.route}`);
