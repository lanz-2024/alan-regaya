/**
 * Post-build critical CSS inlining for static export.
 * Next.js experimental.optimizeCss only runs server-side,
 * so we run critters manually on all HTML files in out/.
 */
import { readdir, readFile, writeFile } from 'fs/promises';
import { join, relative } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const Critters = require('critters');

const outDir = join(process.cwd(), 'out');

const critters = new Critters({
  ssrMode: true,
  reduceInlineStyles: false,
  path: join(outDir, '_next'),
  publicPath: '/_next/',
  preload: 'media',
  fonts: false,
  logLevel: 'warn',
});

async function findHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findHtmlFiles(full)));
    } else if (entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = await findHtmlFiles(outDir);
let processed = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const optimized = await critters.process(html);
  await writeFile(file, optimized, 'utf8');
  processed++;
  console.log(`  ✓ ${relative(outDir, file)}`);
}

console.log(`\nCritical CSS inlined: ${processed} HTML files`);
