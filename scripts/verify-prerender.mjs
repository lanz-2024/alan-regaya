import fs from 'node:fs';
import path from 'node:path';

// Parse the unique receipt URLs straight from src/data/proof.ts so we don't depend on importing
// TS at runtime. Each entry has a single `url: 'https://...'` line.
const proofSource = fs.readFileSync(path.resolve('src/data/proof.ts'), 'utf8');
const expectedUrls = [...proofSource.matchAll(/^\s*url:\s*'([^']+)'/gm)].map((m) => m[1]);

if (expectedUrls.length === 0) {
  console.error('[verify-prerender] could not parse any proofRuns URLs from src/data/proof.ts');
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
const missing = expectedUrls.filter((url) => !html.includes(url));

if (missing.length > 0) {
  console.error(
    `[verify-prerender] STALE: ${htmlPath} is missing ${missing.length} of ${expectedUrls.length} receipt URL(s):\n` +
      missing.map((u) => `  - ${u}`).join('\n') +
      '\nLikely cause: Next.js incremental build cache reused a pre-existing /proof prerender ' +
      '(data-only edits to files imported via path aliases are not always tracked as route inputs).\n' +
      'Fix: edit src/components/proof/ProofGrid.tsx (a component-file change WILL invalidate /proof), ' +
      'or trigger a Vercel redeploy without build cache.'
  );
  process.exit(1);
}

console.log(`[verify-prerender] /proof OK: all ${expectedUrls.length} receipt URLs present in ${htmlPath}`);
