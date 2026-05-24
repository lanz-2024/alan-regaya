import fs from 'node:fs';
import path from 'node:path';

const proofSource = fs.readFileSync(path.resolve('src/data/proof.ts'), 'utf8');
const expectedCards = (proofSource.match(/^\s*page:\s*'/gm) ?? []).length;

if (expectedCards === 0) {
  console.error('[verify-prerender] could not parse proofRuns entries from src/data/proof.ts');
  process.exit(1);
}

const candidates = [
  '.vercel/output/static/proof.html',
  '.next/server/app/proof.html',
];
const htmlPath = candidates.find((p) => fs.existsSync(p));
if (!htmlPath) {
  console.warn('[verify-prerender] /proof prerender HTML not found; skipping (likely a non-production build)');
  process.exit(0);
}

const html = fs.readFileSync(htmlPath, 'utf8');
const renderedCards = (html.match(/text-xl font-semibold/g) ?? []).length;

if (renderedCards !== expectedCards) {
  console.error(
    `[verify-prerender] STALE: ${htmlPath} has ${renderedCards} receipt cards but src/data/proof.ts has ${expectedCards}.\n` +
      'Likely cause: Next.js incremental build cache reused a pre-existing /proof prerender ' +
      '(data-only edits to files imported via path aliases are not always tracked as route inputs).\n' +
      'Fix: edit src/components/proof/ProofGrid.tsx (a component-file change WILL invalidate /proof), ' +
      'or trigger a Vercel redeploy without build cache.'
  );
  process.exit(1);
}

console.log(`[verify-prerender] /proof OK: ${renderedCards} cards match source (${htmlPath})`);
