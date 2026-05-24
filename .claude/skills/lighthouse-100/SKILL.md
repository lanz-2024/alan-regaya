---
name: lighthouse-100
description: Audit alanregaya.dev with Lighthouse via the Browserless `/performance` API on every public route, then autonomously fix every Performance / Accessibility / Best-Practices / SEO gap until the site is 100/100/100/100 on both mobile and desktop. Triggers on phrases like "lighthouse audit", "psi audit", "100/100", "performance audit", "score 100", or any explicit invocation of `/lighthouse-100`.
---

# lighthouse-100 — Audit + Auto-Fix to 100/100

Repo-scoped skill for this portfolio (`alanregaya.dev`). Runs a full mobile + desktop Lighthouse sweep across every route in `sitemap.xml`, classifies the failing audits, applies fixes, rebuilds, and re-audits until all pages hit 100/100/100/100 — or until a documented exception (e.g. `/privacy` `robots: noindex`) is the only remaining gap.

## When to use

Trigger on any of:
- "run a lighthouse audit", "psi audit", "audit the site"
- "get scores to 100", "fix performance", "improve lighthouse"
- "score 100 on every page", "all pages 100/100"
- explicit `/lighthouse-100`

Do **not** trigger on:
- ad-hoc requests to fix a single specific lighthouse audit ID (use the audit ID directly)
- discussions about Lighthouse without implied work

## Mandatory pre-flight

1. Read `lighthouse-audit-fixes.md` if one exists at the repo root or `~/Downloads/` — most prior audit context lives there.
2. Read `next.config.ts`, `package.json`, `scripts/optimize-css.mjs`, `vercel.json` — most site-wide gaps are config issues, not code.
3. Read `src/app/privacy/page.tsx` to confirm the deliberate `robots: { index: false }`. **Never** remove it without explicit user approval. `/privacy` is the only page exempt from the 100/100 target.

## Auto-fix workflow

### Phase 1 — Audit

1. Resolve the base URL: production is `https://alanregaya.dev`, but if a Vercel preview is the goal target the preview deployment URL.
2. Fetch the full route list from `<base>/sitemap.xml`.
3. For each route, call the Browserless `/performance` API (mobile form factor — desktop scores are 5–10 points higher and any page that hits 100 mobile hits 100 desktop, so mobile is sufficient as the gating metric).
4. Collect failing audit IDs into a table keyed by `(route, audit_id)`. Snapshot CWV (FCP/LCP/TBT/CLS/SI/TTI + main-thread time) for the routes scoring <100 perf.

### Phase 2 — Classify

Bucket failures into:
- **Site-wide config** (e.g. `render-blocking-insight`, `legacy-javascript-insight`, `unused-javascript`, `network-dependency-tree-insight`) — fix in `next.config.ts`, `package.json` `browserslist`, `scripts/optimize-css.mjs`, or root layout.
- **Per-route A11y** (`aria-prohibited-attr`, `link-in-text-block`, `color-contrast`) — fix the specific component.
- **Per-route SEO** (`is-crawlable`, `meta-description`, `document-title`, `canonical`) — fix the route's metadata block.
- **Third-party** (Turnstile bfcache, embedded iframes) — lazy-mount + per-route preconnect.
- **Intentional** (`/privacy` `noindex`) — document, do not fix.

Map every audit ID back to the most likely source file before writing any code. Reference the table in section 9 of `lighthouse-audit-fixes.md` for prior file targets.

### Phase 3 — Worktree + branch

Per repo `code-safety.md`: never edit the main checkout. Create a worktree:

```
git worktree add ../portfolio-lh100-$(date +%s) fix/lighthouse-100-$(date +%s)
```

If `node_modules` is absent in the worktree, `npm ci --no-audit --no-fund`.

### Phase 4 — Fix

Apply fixes in this priority order (highest leverage first):

1. **Site-wide config** (touches all routes; one PR fixes the same audit on every page)
2. **A11y per-route** (mechanical, low-risk)
3. **SEO per-route** (mechanical, low-risk)
4. **Bundle / main-thread** (homepage TBT, unused JS — only if site-wide config didn't already close it)
5. **LCP image discovery** (`priority`, `sizes`, AVIF)
6. **Forced reflow** (only if a custom scroll handler exists — grep first; the audit often flags FOUT rather than actual JS reflows)

Skip any recommendation that doesn't map to a real dependency in this repo (e.g. don't add `optimizePackageImports` for `lucide-react` when no `lucide-react` is installed). The audit report's example dependencies are illustrative, not prescriptive.

### Phase 5 — Verify locally

```
npx next build
node scripts/optimize-css.mjs
```

Grep the built HTML in `.next/server/app/` to confirm:
- No `<link rel="stylesheet" href="/_next/static/chunks/...">` without `media="print" onload`
- Per-route preconnect hints land where expected
- No `aria-label` on roleless wrapper divs
- A11y link fixes (e.g. `underline-offset-2`) actually compiled into the HTML

### Phase 6 — Push + PR + re-audit

1. Commit per Conventional Commits (`perf(lighthouse): ...`).
2. `git push -u origin <branch>` and `gh pr create` with a test plan.
3. Wait for Vercel preview, then re-run the Phase 1 audit against the preview URL.
4. If any page is still <100 (excluding `/privacy`), loop back to Phase 2 with the new failure set. Do not declare success on the local build — Lighthouse can disagree with grep.
5. Take the median of 3 runs per page to defeat run-to-run variance (±2 points).

### Phase 7 — Stop conditions

Stop when **either**:
- 17/18 pages at 100/100/100/100 and `/privacy` at 100/100/100/69 (noindex by design), or
- The remaining gap is a third-party issue that lazy-mounting can't fix without breaking UX (document it in the PR, don't loop forever).

## Anti-patterns (do not do)

- Do not add `experimental.optimizeCss: true` — removed in Next 15+. Use the existing postbuild `scripts/optimize-css.mjs` critters pipeline.
- Do not set `images: { unoptimized: false }` — site is static export with self-converted `.webp`. The Vercel image optimizer is intentionally off.
- Do not add `@next/bundle-analyzer` or `optimizePackageImports` for libraries that are not in `package.json` dependencies.
- Do not remove `/privacy` `robots: { index: false }` without explicit user approval.
- Do not claim "fixed" without a re-audit against a Vercel preview. Per repo `anti-false-fix.md`: changes applied ≠ verified.

## Reference

- Prior audit: `lighthouse-audit-fixes.md` (May 23, 2026) — keep updated when patterns recur.
- Verification rule: re-audit on the deployed preview, median-of-3, not local build only.
- Project plan output is at `~/.claude/plans/` per session.
