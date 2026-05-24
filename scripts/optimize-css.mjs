/**
 * Post-build critical CSS inlining for static export.
 * Next.js experimental.optimizeCss only runs server-side and doesn't
 * apply to output:'export'. This script runs critters on:
 *   1. out/ — for local/static hosting
 *   2. .next/server/app/ — for Vercel's Next.js integration which
 *      reads these HTML files directly for SSG pages
 *
 * After critters runs, we also inline @font-face rules directly into the
 * critical <style> tag. Critters can't detect font-family usage via CSS
 * variables (next/font uses var(--font-inter)), so we do it manually.
 * URLs are rewritten from relative (../media/) to absolute (/_next/static/media/).
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

/**
 * Extract @font-face rules from a CSS string and rewrite relative URLs.
 * CSS chunks use url(../media/foo.woff2) relative to _next/static/chunks/.
 * In HTML context, these must be absolute: url(/_next/static/media/foo.woff2).
 */
function extractFontFaceRules(cssContent) {
  const rules = [];
  const regex = /@font-face\{[^}]+\}/g;
  let match;
  while ((match = regex.exec(cssContent)) !== null) {
    const rule = match[0].replace(/url\(\.\.\/media\//g, 'url(/_next/static/media/');
    rules.push(rule);
  }
  return rules.join('');
}

/**
 * Inject @font-face rules into the HTML's inlined <style> tag.
 * Places them at the start so they're available before other critical CSS.
 */
function injectFontFace(html, fontFaceCSS) {
  if (!fontFaceCSS) return html;
  // Prepend to the first <style> tag (critters creates one for critical CSS)
  return html.replace(/(<style[^>]*>)/, `$1${fontFaceCSS}`);
}

// Cache CSS content per cssBaseDir to avoid re-reading for each HTML file
const cssCache = new Map();

async function getFontFaceCSS(html, cssBaseDir) {
  if (cssCache.has(cssBaseDir)) return cssCache.get(cssBaseDir);

  // Find the main CSS chunk href, e.g. /_next/static/chunks/FILENAME.css
  const match = html.match(/href="(\/_next\/static\/chunks\/[^"]+\.css)"/);
  if (!match) { cssCache.set(cssBaseDir, ''); return ''; }

  const cssHref = match[1]; // /_next/static/chunks/FILENAME.css
  const cssRelPath = cssHref.replace(/^\/_next\//, ''); // static/chunks/FILENAME.css
  const cssFilePath = join(cssBaseDir, cssRelPath);

  if (!(await exists(cssFilePath))) { cssCache.set(cssBaseDir, ''); return ''; }

  const cssContent = await readFile(cssFilePath, 'utf8');
  const fontFaceCSS = extractFontFaceRules(cssContent);
  cssCache.set(cssBaseDir, fontFaceCSS);
  return fontFaceCSS;
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
    let optimized = await critters.process(html);

    // Inline @font-face rules with correct absolute URLs
    const fontFaceCSS = await getFontFaceCSS(optimized, cssBaseDir);
    optimized = injectFontFace(optimized, fontFaceCSS);

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

// 3. Vercel build-adapter output — what Vercel actually serves at runtime
total += await processDir(
  join(cwd, '.vercel', 'output', 'static'),
  join(cwd, '.vercel', 'output', 'static'),
  '.vercel',
);

console.log(`\nCritical CSS inlined: ${total} HTML files`);
