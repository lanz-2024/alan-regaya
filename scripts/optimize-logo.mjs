#!/usr/bin/env node
// Generates a small WebP logo from public/logo.png. Output is gitignored;
// run as prebuild. The header renders the logo at max 64px CSS = 128px @2x.
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { statSync } from 'fs';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const src = resolve(__dirname, '../public/logo.png');
const dest = resolve(__dirname, '../public/logo.webp');

await sharp(src).resize(128, 128, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 90 }).toFile(dest);
const before = statSync(src).size;
const after = statSync(dest).size;
console.log(`  ✓ logo.png (${before} B) → logo.webp (${after} B)`);
