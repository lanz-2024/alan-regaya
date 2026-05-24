#!/usr/bin/env node
// Pre-push Lighthouse gate.
//
// Builds the site, audits changed routes with Lighthouse (mobile), and blocks
// the push if perf/a11y/best-practices/SEO is not 100. On failure, optionally
// invokes `claude -p` with failing-audit context to attempt fixes.
//
// Bypass:
//   git push --no-verify          (native git)
//   LIGHTHOUSE_GATE_SKIP=1 git push
//
// Tuning:
//   LIGHTHOUSE_GATE_AUTOFIX=0     skip Claude auto-fix
//   LIGHTHOUSE_GATE_PORT=4321     local server port
//   LIGHTHOUSE_GATE_FULL=1        audit all routes regardless of diff

import { spawn, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname, '..');
const PORT = Number(process.env.LIGHTHOUSE_GATE_PORT ?? 4321);
const BASE = `http://localhost:${PORT}`;
const AUTOFIX = process.env.LIGHTHOUSE_GATE_AUTOFIX !== '0';

if (process.env.LIGHTHOUSE_GATE_SKIP === '1') {
  console.warn('[lh-gate] LIGHTHOUSE_GATE_SKIP=1 — bypassing gate');
  process.exit(0);
}

// --- 1. Detect changed routes ----------------------------------------------
function git(args) {
  const r = spawnSync('git', args, { cwd: REPO, encoding: 'utf8' });
  return r.status === 0 ? r.stdout.trim() : '';
}

function changedFiles() {
  const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']) || 'HEAD';
  const candidates = [`origin/${branch}`, 'origin/main'];
  for (const base of candidates) {
    const exists = spawnSync('git', ['rev-parse', '--verify', base], { cwd: REPO });
    if (exists.status === 0) {
      const out = git(['diff', '--name-only', `${base}...HEAD`]);
      if (out) return out.split('\n');
    }
  }
  // First commit / no upstream — audit everything as a control.
  return ['__full__'];
}

const ALL_ROUTES = [
  '/', '/about', '/setup', '/projects', '/blog', '/contact', '/privacy',
  '/faq', '/now', '/lessons', '/proof',
];

function routesToAudit(files) {
  if (process.env.LIGHTHOUSE_GATE_FULL === '1' || files.includes('__full__')) {
    return ALL_ROUTES;
  }
  const globalTriggers = [
    'src/app/layout.tsx', 'src/app/globals.css',
    'next.config.ts', 'tailwind.config',
    'postcss.config', 'package.json',
  ];
  if (files.some(f => globalTriggers.some(g => f.includes(g)))) {
    return ALL_ROUTES;
  }
  const routes = new Set();
  for (const f of files) {
    const m = f.match(/^src\/app\/(.*?)\/page\.tsx$/);
    if (m) routes.add('/' + m[1]);
    if (f === 'src/app/page.tsx') routes.add('/');
    if (f.startsWith('src/components/')) routes.add('/');
  }
  if (routes.size === 0) return [];
  routes.add('/');
  return [...routes];
}

const files = changedFiles();
const routes = routesToAudit(files);

if (routes.length === 0) {
  console.log('[lh-gate] no audited routes affected — skipping');
  process.exit(0);
}

console.log(`[lh-gate] auditing ${routes.length} route(s): ${routes.join(', ')}`);

// --- 2. Build + serve -------------------------------------------------------
function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { cwd: REPO, stdio: 'inherit', shell: true, ...opts });
  if (r.status !== 0) {
    console.error(`[lh-gate] ${cmd} ${args.join(' ')} failed`);
    process.exit(1);
  }
}

console.log('[lh-gate] building...');
run('npm', ['run', 'build']);

const serveCmd = existsSync(join(REPO, 'out'))
  ? { cmd: 'npx', args: ['--yes', 'serve', 'out', '-l', String(PORT), '--no-clipboard'] }
  : { cmd: 'npx', args: ['next', 'start', '-p', String(PORT)] };

console.log(`[lh-gate] starting server on ${BASE}...`);
const server = spawn(serveCmd.cmd, serveCmd.args, { cwd: REPO, shell: true, stdio: 'pipe' });
let serverDead = false;
server.on('exit', () => { serverDead = true; });

const cleanup = () => {
  if (!serverDead) {
    try { process.kill(-server.pid); } catch { try { server.kill(); } catch {} }
  }
};
process.on('exit', cleanup);
process.on('SIGINT', () => { cleanup(); process.exit(130); });
process.on('SIGTERM', () => { cleanup(); process.exit(143); });

async function waitForServer(timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(BASE + '/');
      if (r.ok) return;
    } catch {}
    await new Promise(r => setTimeout(r, 500));
  }
  throw new Error(`server did not respond within ${timeoutMs}ms`);
}

try {
  await waitForServer();
} catch (e) {
  console.error(`[lh-gate] ${e.message}`);
  process.exit(1);
}

// --- 3. Run Lighthouse ------------------------------------------------------
const lhDir = mkdtempSync(join(tmpdir(), 'lh-gate-'));

function runLighthouse(path) {
  const file = join(lhDir, path.replace(/[^a-z0-9]+/gi, '_') || 'home') + '.json';
  const args = [
    '--yes', 'lighthouse', BASE + path,
    '--quiet',
    '--chrome-flags=--headless=new --no-sandbox',
    '--form-factor=mobile',
    '--screenEmulation.mobile=true',
    '--throttling-method=devtools',
    '--only-categories=performance,accessibility,best-practices,seo',
    '--output=json',
    `--output-path=${file}`,
  ];
  const r = spawnSync('npx', args, { cwd: REPO, shell: true, stdio: 'pipe' });
  if (r.status !== 0) {
    throw new Error(`lighthouse failed for ${path}: ${r.stderr?.toString().slice(0, 300)}`);
  }
  return JSON.parse(readFileSync(file, 'utf8'));
}

function evaluate(result, path) {
  const cats = result.categories ?? {};
  const audits = result.audits ?? {};
  const scores = {
    performance: Math.round((cats.performance?.score ?? 0) * 100),
    accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
    bestPractices: Math.round((cats['best-practices']?.score ?? 0) * 100),
    seo: Math.round((cats.seo?.score ?? 0) * 100),
  };
  const failing = [];
  for (const [catKey, cat] of Object.entries(cats)) {
    for (const ref of cat.auditRefs ?? []) {
      const a = audits[ref.id];
      if (!a) continue;
      if (a.scoreDisplayMode === 'notApplicable' || a.scoreDisplayMode === 'informative' || a.scoreDisplayMode === 'manual') continue;
      if (a.score === null || a.score === 1) continue;
      failing.push({ category: catKey, id: ref.id, title: a.title, description: a.description, score: a.score });
    }
  }
  return { path, scores, failing };
}

const results = [];
for (const path of routes) {
  console.log(`[lh-gate] auditing ${path}...`);
  try {
    results.push(evaluate(runLighthouse(path), path));
  } catch (e) {
    console.error(`[lh-gate] ${e.message}`);
    cleanup();
    process.exit(1);
  }
}

function summarize(results) {
  let allPass = true;
  for (const r of results) {
    const { performance, accessibility, bestPractices, seo } = r.scores;
    const pass = performance === 100 && accessibility === 100 && bestPractices === 100 && seo === 100;
    if (!pass) allPass = false;
    console.log(`  ${pass ? 'PASS' : 'FAIL'} ${r.path.padEnd(20)} perf=${performance} a11y=${accessibility} bp=${bestPractices} seo=${seo}`);
  }
  return allPass;
}

if (summarize(results)) {
  console.log('[lh-gate] all routes 100/100/100/100 — push allowed');
  cleanup();
  rmSync(lhDir, { recursive: true, force: true });
  process.exit(0);
}

// --- 4. Failing path: report + optional Claude auto-fix ---------------------
console.error('\n[lh-gate] BLOCKED — failing audits:');
for (const r of results) {
  if (r.failing.length === 0) continue;
  console.error(`\n  ${r.path}`);
  for (const f of r.failing) {
    console.error(`    [${f.category}] ${f.id}: ${f.title}`);
  }
}

if (!AUTOFIX) {
  console.error('\n[lh-gate] LIGHTHOUSE_GATE_AUTOFIX=0 — not invoking Claude');
  cleanup();
  process.exit(1);
}

const claudePath = spawnSync(process.platform === 'win32' ? 'where' : 'which', ['claude'], { encoding: 'utf8' });
if (claudePath.status !== 0) {
  console.error('\n[lh-gate] `claude` CLI not on PATH — cannot auto-fix. Install Claude Code or set LIGHTHOUSE_GATE_AUTOFIX=0.');
  cleanup();
  process.exit(1);
}

const prompt = [
  'The pre-push Lighthouse gate blocked a push because the following audits are failing.',
  'Fix the underlying issues in the repo (do not modify the gate script). After fixing, the gate will re-run and decide.',
  '',
  ...results.flatMap(r => r.failing.length === 0 ? [] : [
    `Route ${r.path} — scores perf=${r.scores.performance} a11y=${r.scores.accessibility} bp=${r.scores.bestPractices} seo=${r.scores.seo}`,
    ...r.failing.map(f => `  - [${f.category}] ${f.id}: ${f.title} — ${f.description?.replace(/\s+/g, ' ').slice(0, 200)}`),
    '',
  ]),
].join('\n');

console.log('\n[lh-gate] invoking `claude -p` to attempt fixes...');
const claudeRun = spawnSync('claude', ['-p', prompt], { cwd: REPO, stdio: 'inherit', shell: true });
if (claudeRun.status !== 0) {
  console.error('[lh-gate] claude exited non-zero — aborting');
  cleanup();
  process.exit(1);
}

// --- 5. Re-run audit once ---------------------------------------------------
console.log('\n[lh-gate] re-running audits after Claude fix attempt...');

// Rebuild (Claude may have changed source) then re-audit.
cleanup();
await new Promise(r => setTimeout(r, 1000));

run('npm', ['run', 'build']);

const server2 = spawn(serveCmd.cmd, serveCmd.args, { cwd: REPO, shell: true, stdio: 'pipe' });
let server2Dead = false;
server2.on('exit', () => { server2Dead = true; });
const cleanup2 = () => { if (!server2Dead) { try { process.kill(-server2.pid); } catch { try { server2.kill(); } catch {} } } };
process.on('exit', cleanup2);

try { await waitForServer(); } catch (e) {
  console.error(`[lh-gate] ${e.message}`);
  cleanup2();
  process.exit(1);
}

const results2 = [];
for (const path of routes) {
  console.log(`[lh-gate] re-auditing ${path}...`);
  try {
    results2.push(evaluate(runLighthouse(path), path));
  } catch (e) {
    console.error(`[lh-gate] ${e.message}`);
    cleanup2();
    process.exit(1);
  }
}

const pass2 = summarize(results2);
cleanup2();
rmSync(lhDir, { recursive: true, force: true });

if (pass2) {
  console.log('\n[lh-gate] all 100s after Claude fix. Stage and commit Claude\'s changes, then re-push.');
  process.exit(1); // still block: user must commit the fix
} else {
  console.error('\n[lh-gate] still failing after one fix attempt. Resolve manually or push with --no-verify.');
  process.exit(1);
}
