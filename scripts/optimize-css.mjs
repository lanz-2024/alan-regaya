/**
 * Post-build critical CSS inlining for static export.
 * Next.js experimental.optimizeCss only runs server-side and doesn't
 * apply to output:'export'. This script runs critters on:
 *   1. out/ — for local/static hosting
 *   2. .next/server/app/ — for Vercel's Next.js integration which
 *      reads these HTML files directly for SSG pages
 */
import { readdir, readFile, writeFile, access } from 'fs/promises';
import { join, relative } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const Critters = require('critters');

const cwd = process.cwd();

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

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

async function processDir(htmlDir, cssBaseDir, label) {
  if (!(await exists(htmlDir))) {
    console.log(`  skip ${label} (directory not found)`);
    return 0;
  }

  const critters = new Critters({
    ssrMode: true,
    reduceInlineStyles: false,
    path: cssBaseDir,
    publicPath: '/_next/',
    preload: 'media',
    fonts: false,
    logLevel: 'warn',
  });

  const htmlFiles = await findHtmlFiles(htmlDir);
  let count = 0;
  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const optimized = await critters.process(html);
    await writeFile(file, optimized, 'utf8');
    count++;
    console.log(`  ✓ [${label}] ${relative(htmlDir, file)}`);
  }
  return count;
}

let total = 0;

// 1. Static export output (local + static hosting)
total += await processDir(
  join(cwd, 'out'),
  join(cwd, 'out', '_next'),
  'out',
);

// 2. Next.js server output (Vercel Next.js integration for SSG pages)
total += await processDir(
  join(cwd, '.next', 'server', 'app'),
  join(cwd, '.next'),
  '.next',
);

console.log(`\nCritical CSS inlined: ${total} HTML files`);
