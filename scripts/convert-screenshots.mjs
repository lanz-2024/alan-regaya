#!/usr/bin/env node
// Converts public/screenshots/*.png to WebP at build time.
// Runs as prebuild — WebP files are gitignored, PNGs stay in source.
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
  const dest = resolve(screenshotsDir, basename(png, '.png') + '.webp');
  await sharp(src).resize(960, undefined, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
  console.log(`  ✓ ${png} → ${basename(dest)}`);
}));

console.log(`Converted ${pngs.length} screenshots to WebP.`);
