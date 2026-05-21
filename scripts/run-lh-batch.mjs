#!/usr/bin/env node
import { spawnSync } from 'child_process';
import { mkdirSync, existsSync, rmSync } from 'fs';

const BASE = 'https://alan-regaya-git-fix-lighthouse-10-2d5931-lans-projects-f6203869.vercel.app';
const PATHS = [
  '/about', '/setup', '/projects', '/blog',
  '/blog/core-web-vitals-at-scale',
  '/blog/building-mcp-server-wordpress',
  '/blog/zero-downtime-wordpress-migrations',
  '/blog/ai-augmented-development-workflow',
  '/contact', '/privacy',
];
const STRATEGIES = ['mobile', 'desktop'];
const OUT = process.argv[2] || '/tmp/lh3';

if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });

function slug(p) { return p.replace(/^\//, '').replace(/\//g, '_') || 'home'; }

function runOne(path, strategy) {
  const url = `${BASE}${path}`;
  const file = `${OUT}/${slug(path)}-${strategy}.json`;
  const args = [
    '--yes', 'lighthouse', url,
    '--quiet',
    '--chrome-flags=--headless=new --no-sandbox',
    `--form-factor=${strategy}`,
    `--screenEmulation.mobile=${strategy === 'mobile'}`,
    '--throttling-method=devtools',
    '--only-categories=performance,accessibility,best-practices,seo',
    '--output=json',
    `--output-path=${file}`,
  ];
  console.log(`> ${strategy} ${path}`);
  const r = spawnSync('npx', args, { stdio: 'pipe', shell: true });
  if (r.status !== 0) console.error(`  FAILED: ${r.stderr?.toString().slice(0,200)}`);
}

for (const p of PATHS) {
  for (const s of STRATEGIES) {
    runOne(p, s);
  }
}
console.log(`\nDone. Results in ${OUT}`);
