import { readFileSync } from 'fs';
const file = process.argv[2];
const ids = process.argv.slice(3);
const r = JSON.parse(readFileSync(file, 'utf8'));
for (const id of ids) {
  const a = r.audits[id];
  if (!a) { console.log(`\n=== ${id}: not found`); continue; }
  console.log(`\n=== ${id} (score=${a.score})`);
  console.log('title:', a.title);
  if (a.displayValue) console.log('value:', a.displayValue);
  if (a.details && a.details.items) {
    for (const item of a.details.items.slice(0, 8)) {
      console.log('item:', JSON.stringify(item).slice(0, 500));
    }
  } else if (a.details) {
    console.log('details:', JSON.stringify(a.details).slice(0, 500));
  }
}
