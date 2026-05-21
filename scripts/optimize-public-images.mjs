#!/usr/bin/env node
// Converts source PNG/JPG under public/ to right-sized WebP at prebuild.
// Outputs are gitignored; sources stay tracked. Skips files already WebP
// and skips when the WebP target is newer than the source.
import { readdir, stat } from 'fs/promises';
import { resolve, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PUBLIC = resolve(__dirname, '../public');

// Per-directory target: max width in px (WebP) — chosen for display * 2 (retina).
const TARGETS = [
  { dir: 'gear', maxWidth: 800, quality: 82 },
  { dir: 'setup', maxWidth: 1200, quality: 82 },
];

async function convertOne(src, maxWidth, quality) {
  const dest = resolve(dirname(src), basename(src, extname(src)) + '.webp');
  try {
    const [s, d] = await Promise.all([stat(src), stat(dest).catch(() => null)]);
    if (d && d.mtimeMs >= s.mtimeMs) return null;
  } catch {}
  await sharp(src)
    .resize(maxWidth, undefined, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality })
    .toFile(dest);
  const after = (await stat(dest)).size;
  const before = (await stat(src)).size;
  return { src: basename(src), dest: basename(dest), before, after };
}

let total = 0;
for (const t of TARGETS) {
  const dirAbs = resolve(PUBLIC, t.dir);
  let files;
  try { files = await readdir(dirAbs); } catch { continue; }
  const sources = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));
  for (const f of sources) {
    const r = await convertOne(resolve(dirAbs, f), t.maxWidth, t.quality);
    if (r) { console.log(`  ✓ ${t.dir}/${r.src} (${r.before} B) → ${r.dest} (${r.after} B)`); total++; }
  }
}

// logo.png → logo.webp at 128 px (header renders at max 64 CSS px).
const logoSrc = resolve(PUBLIC, 'logo.png');
try {
  const r = await convertOne(logoSrc, 128, 90);
  if (r) { console.log(`  ✓ logo.png (${r.before} B) → ${r.dest} (${r.after} B)`); total++; }
} catch {}

console.log(`Converted ${total} image(s) to WebP.`);
