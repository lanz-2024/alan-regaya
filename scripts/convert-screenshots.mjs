#!/usr/bin/env node
// Converts public/screenshots/*.png to WebP + AVIF at build time.
// Runs as prebuild — outputs are gitignored, PNGs stay in source.
import { readdir } from 'fs/promises';
import { resolve, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const screenshotsDir = resolve(__dirname, '../public/screenshots');

const files = await readdir(screenshotsDir);
const pngs = files.filter(f => extname(f) === '.png');

if (pngs.length === 0) {
  console.log('No PNG screenshots to convert.');
  process.exit(0);
}

await Promise.all(pngs.map(async (png) => {
  const src = resolve(screenshotsDir, png);
  const stem = basename(png, '.png');
  const webpDest = resolve(screenshotsDir, stem + '.webp');
  const avifDest = resolve(screenshotsDir, stem + '.avif');
  const pipeline = () =>
    sharp(src).resize(640, undefined, { fit: 'inside', withoutEnlargement: true });
  await pipeline().webp({ quality: 78 }).toFile(webpDest);
  await pipeline().avif({ quality: 55, effort: 4 }).toFile(avifDest);
  console.log(`  ✓ ${png} → ${basename(webpDest)} + ${basename(avifDest)}`);
}));

console.log(`Converted ${pngs.length} screenshots to WebP + AVIF.`);
