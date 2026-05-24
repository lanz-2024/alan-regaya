#!/usr/bin/env node
// Converts source PNG/JPG under public/ to right-sized WebP + AVIF at prebuild.
// Outputs are gitignored; sources stay tracked. Per-format mtime-skip keeps
// incremental builds fast.
import { readdir, stat } from 'fs/promises';
import { resolve, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PUBLIC = resolve(__dirname, '../public');

// Per-directory target: max width in px — chosen for display * 2 (retina).
// AVIF quality scale runs lower than WebP for similar visual quality.
const TARGETS = [
  { dir: 'gear', maxWidth: 800, webpQuality: 82, avifQuality: 60 },
  { dir: 'setup', maxWidth: 1200, webpQuality: 82, avifQuality: 60 },
];

async function isFresh(src, dest) {
  try {
    const [s, d] = await Promise.all([stat(src), stat(dest).catch(() => null)]);
    return Boolean(d && d.mtimeMs >= s.mtimeMs);
  } catch {
    return false;
  }
}

async function convertOne(src, maxWidth, { webpQuality, avifQuality }) {
  const stem = basename(src, extname(src));
  const webpDest = resolve(dirname(src), stem + '.webp');
  const avifDest = resolve(dirname(src), stem + '.avif');

  const pipeline = () =>
    sharp(src).resize(maxWidth, undefined, { fit: 'inside', withoutEnlargement: true });

  const results = [];

  if (!(await isFresh(src, webpDest))) {
    await pipeline().webp({ quality: webpQuality }).toFile(webpDest);
    const [before, after] = await Promise.all([stat(src), stat(webpDest)]);
    results.push({ format: 'webp', dest: basename(webpDest), before: before.size, after: after.size });
  }

  if (!(await isFresh(src, avifDest))) {
    // effort: 4 is a reasonable size/speed tradeoff; default 9 is much slower.
    await pipeline().avif({ quality: avifQuality, effort: 4 }).toFile(avifDest);
    const [before, after] = await Promise.all([stat(src), stat(avifDest)]);
    results.push({ format: 'avif', dest: basename(avifDest), before: before.size, after: after.size });
  }

  return { src: basename(src), results };
}

let totalWebp = 0;
let totalAvif = 0;

for (const t of TARGETS) {
  const dirAbs = resolve(PUBLIC, t.dir);
  let files;
  try { files = await readdir(dirAbs); } catch { continue; }
  const sources = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));
  for (const f of sources) {
    const r = await convertOne(resolve(dirAbs, f), t.maxWidth, { webpQuality: t.webpQuality, avifQuality: t.avifQuality });
    for (const out of r.results) {
      console.log(`  ✓ ${t.dir}/${r.src} (${out.before} B) → ${out.dest} (${out.after} B)`);
      if (out.format === 'webp') totalWebp++; else totalAvif++;
    }
  }
}

// logo.png → logo.webp/.avif at 128 px (header renders at max 64 CSS px).
const logoSrc = resolve(PUBLIC, 'logo.png');
try {
  const r = await convertOne(logoSrc, 128, { webpQuality: 90, avifQuality: 80 });
  for (const out of r.results) {
    console.log(`  ✓ logo.png (${out.before} B) → ${out.dest} (${out.after} B)`);
    if (out.format === 'webp') totalWebp++; else totalAvif++;
  }
} catch {}

console.log(`Converted ${totalWebp} WebP + ${totalAvif} AVIF image(s).`);
