#!/usr/bin/env node
// Generates public/og-image.png (1200x630) and public/apple-touch-icon.png (180x180) at build time.
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const publicDir = resolve(__dirname, '../public');

// OG Image: 1200x630 with name, title, and tech pills
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <text x="600" y="240" font-family="system-ui, sans-serif" font-size="72" font-weight="700" fill="#fafafa" text-anchor="middle">Alan Regaya</text>
  <text x="600" y="320" font-family="system-ui, sans-serif" font-size="32" fill="#888888" text-anchor="middle">Senior Full-Stack Developer</text>
  <text x="600" y="420" font-family="system-ui, sans-serif" font-size="20" fill="#60a5fa" text-anchor="middle">Next.js · React · TypeScript · WordPress · WooCommerce</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(resolve(publicDir, 'og-image.png'));
console.log('  ✓ og-image.png generated');

// Apple Touch Icon: resize logo.png to 180x180
await sharp(resolve(publicDir, 'logo.png'))
  .resize(180, 180, { fit: 'contain', background: { r: 10, g: 10, b: 10, alpha: 1 } })
  .png()
  .toFile(resolve(publicDir, 'apple-touch-icon.png'));
console.log('  ✓ apple-touch-icon.png generated');
