#!/usr/bin/env node
// Pre-push SEO schema gate.
//
// Static-audits every public page under src/app/**/page.tsx for:
//   - JSON-LD <script type="application/ld+json"> (page-level WebPage/etc)
//   - BreadcrumbList via buildBreadcrumbList(...)
//   - Required Next.js metadata (title, description, canonical, OG, Twitter)
//
// Modes:
//   --report   read-only, prints findings, exit 1 on any failure
//   --fix      auto-inject missing breadcrumb + WebPage schema, then re-audit
//              (push is still blocked so the dev can review the diff)
//   --strict   --report + invokes `claude -p` to fix anything not auto-fixable
//   (default)  same as --fix (used by simple-git-hooks pre-push)
//
// Bypass:
//   git push --no-verify
//   SCHEMA_GATE_SKIP=1 git push

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname, '..');
const APP_DIR = join(REPO, 'src', 'app');

const args = new Set(process.argv.slice(2));
const MODE = args.has('--report') ? 'report' : args.has('--strict') ? 'strict' : 'fix';

if (process.env.SCHEMA_GATE_SKIP === '1') {
  console.warn('[schema-gate] SCHEMA_GATE_SKIP=1 — bypassing');
  process.exit(0);
}

// --- 1. Discover public page.tsx files -------------------------------------
function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, acc);
    else if (entry === 'page.tsx') acc.push(p);
  }
  return acc;
}

function routeFromPath(filePath) {
  const rel = relative(APP_DIR, filePath).replace(/\\/g, '/').replace(/\/page\.tsx$/, '');
  if (rel === 'page.tsx' || rel === '') return '/';
  return '/' + rel;
}

// Routes excluded from the gate (noindex or dynamic with parent coverage).
const EXCLUDE_ROUTES = new Set(['/privacy']);

function isDynamic(route) {
  return route.includes('[');
}

// --- 2. Per-page checks -----------------------------------------------------
const REQUIRED_META_FIELDS = ['title', 'description', 'alternates', 'openGraph', 'twitter'];

function audit(filePath) {
  const src = readFileSync(filePath, 'utf8');
  const route = routeFromPath(filePath);

  const findings = [];
  const has = {
    metadata: /export\s+const\s+metadata\s*:/.test(src) || /export\s+async\s+function\s+generateMetadata/.test(src),
    jsonLd: /type="application\/ld\+json"/.test(src) || /<JsonLd[\s/>]/.test(src),
    breadcrumb: /buildBreadcrumbList\s*\(/.test(src),
    webPage: /buildWebPage\s*\(/.test(src) || /'@type'\s*:\s*'(WebPage|CollectionPage|ProfilePage|ContactPage|AboutPage|FAQPage|ItemPage|Article|BlogPosting|Blog|ItemList)'/.test(src),
  };

  // Metadata field presence (only if exported as const literal).
  const metaMatch = src.match(/export\s+const\s+metadata\s*:\s*Metadata\s*=\s*\{([\s\S]*?)\n\};/);
  const metaBody = metaMatch ? metaMatch[1] : '';
  const missingMeta = metaMatch
    ? REQUIRED_META_FIELDS.filter((f) => !new RegExp(`\\b${f}\\s*:`).test(metaBody))
    : [];

  // Homepage inherits metadata from src/app/layout.tsx — don't require its own.
  if (route !== '/' && !has.metadata) findings.push({ severity: 'block', msg: 'missing `export const metadata` or `generateMetadata`' });
  if (!has.jsonLd) findings.push({ severity: 'fixable', msg: 'no JSON-LD script tag' });
  // Breadcrumbs are not meaningful on the home route itself.
  if (route !== '/' && !has.breadcrumb && !isDynamic(route)) findings.push({ severity: 'fixable', msg: 'missing buildBreadcrumbList()' });
  if (!has.webPage) findings.push({ severity: 'fixable', msg: 'missing page-level schema (WebPage/Article/etc)' });
  if (route !== '/') for (const f of missingMeta) findings.push({ severity: 'block', msg: `metadata missing \`${f}\`` });

  return { route, filePath, findings, has };
}

// --- 3. Auto-fix templates --------------------------------------------------
function deriveLabel(route) {
  const seg = route.replace(/^\//, '').split('/').filter(Boolean).pop() || 'Home';
  return seg.replace(/\[(\.\.\.)?(\w+)\]/g, '$2').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function autofix(result) {
  const { filePath, route, has } = result;
  let src = readFileSync(filePath, 'utf8');
  let changed = false;
  const label = deriveLabel(route);

  // 1. Ensure siteConfig import.
  if (!/from\s+['"]@\/data\/site-config['"]/.test(src)) {
    src = `import { siteConfig } from '@/data/site-config';\n` + src;
    changed = true;
  }

  // 2. Ensure breadcrumb import + ld.
  if (!has.breadcrumb && !isDynamic(route)) {
    if (!/from\s+['"]@\/lib\/seo\/breadcrumbs['"]/.test(src)) {
      src = src.replace(/(^import[^\n]+\n)(?!import)/m, `$1import { buildBreadcrumbList } from '@/lib/seo/breadcrumbs';\n`);
    }
    src = src.replace(/(\n)(export\s+const\s+metadata)/, `\nconst breadcrumbLd = buildBreadcrumbList([{ name: '${label}', path: '${route}' }]);\n$2`);
    changed = true;
  }

  // 3. Ensure WebPage helper import + ld.
  if (!has.webPage) {
    if (!/from\s+['"]@\/lib\/seo\/webpage['"]/.test(src)) {
      src = src.replace(/(^import[^\n]+\n)(?!import)/m, `$1import { buildWebPage } from '@/lib/seo/webpage';\n`);
    }
    src = src.replace(
      /(\n)(export\s+(?:default|async)\s+function)/,
      `\nconst webPageLd = buildWebPage({ path: '${route}', name: '${label} | ' + siteConfig.name, description: 'TODO: write a 1-2 sentence description for ${label}.' });\n$2`
    );
    changed = true;
  }

  // 4. Inject script tags into the JSX return (best-effort: after first wrapper open tag).
  if (!has.jsonLd && (changed || !has.breadcrumb || !has.webPage)) {
    src = src.replace(
      /(return\s*\(\s*\n\s*<[A-Za-z][^>]*>)/,
      `$1\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />`
    );
    changed = true;
  }

  if (changed) writeFileSync(filePath, src);
  return changed;
}

// --- 4. Run -----------------------------------------------------------------
const pages = walk(APP_DIR)
  .map((p) => ({ p, route: routeFromPath(p) }))
  .filter(({ route }) => !EXCLUDE_ROUTES.has(route));

console.log(`[schema-gate] scanning ${pages.length} page(s) — mode=${MODE}`);

let results = pages.map(({ p }) => audit(p));

function report(results) {
  const failing = results.filter((r) => r.findings.length);
  for (const r of failing) {
    console.error(`\n  ${r.route}  (${relative(REPO, r.filePath)})`);
    for (const f of r.findings) console.error(`    [${f.severity}] ${f.msg}`);
  }
  return failing;
}

let failing = report(results);

if (failing.length === 0) {
  console.log('[schema-gate] ✓ all pages pass');
  process.exit(0);
}

if (MODE === 'report') {
  console.error(`\n[schema-gate] ✗ ${failing.length} page(s) failing — re-run with --fix to auto-inject templates`);
  process.exit(1);
}

// --fix or default: attempt auto-fix for fixable findings, then re-audit.
console.log(`\n[schema-gate] auto-fixing ${failing.length} page(s)...`);
let fixedAny = false;
for (const r of failing) {
  if (r.findings.some((f) => f.severity === 'fixable')) {
    const changed = autofix(r);
    if (changed) {
      fixedAny = true;
      console.log(`  ✎ ${r.route}`);
    }
  }
}

if (!fixedAny) {
  console.error('\n[schema-gate] ✗ nothing auto-fixable — block findings require manual edit');
  process.exit(1);
}

results = pages.map(({ p }) => audit(p));
failing = report(results);

if (failing.length === 0) {
  console.error('\n[schema-gate] ⚠ auto-fixed all issues. Review the diff, commit, then re-push:');
  console.error('    git diff');
  console.error('    git add -p && git commit -m "fix(seo): auto-inject WebPage/BreadcrumbList schema"');
  process.exit(1);
}

if (MODE === 'strict') {
  const claudePath = spawnSync(process.platform === 'win32' ? 'where' : 'which', ['claude'], { encoding: 'utf8' });
  if (claudePath.status === 0) {
    const prompt = [
      'The SEO schema gate blocked a push. Some findings could not be auto-fixed.',
      'Fix the underlying issues in the source files (do not modify the gate script).',
      '',
      ...failing.flatMap((r) => [
        `${r.route} (${relative(REPO, r.filePath)})`,
        ...r.findings.map((f) => `  - [${f.severity}] ${f.msg}`),
        '',
      ]),
    ].join('\n');
    console.log('\n[schema-gate] invoking `claude -p` for remaining issues...');
    spawnSync('claude', ['-p', prompt], { cwd: REPO, stdio: 'inherit', shell: true });
  }
}

console.error(`\n[schema-gate] ✗ ${failing.length} page(s) still failing after auto-fix`);
process.exit(1);
