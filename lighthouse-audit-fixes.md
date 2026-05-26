# Lighthouse 100/100/100/100 — Audit Report

**Date:** 2026-05-26
**Branch:** `perf/lighthouse-100-1779728535`
**PR:** [#86](https://github.com/lanz-2024/alan-regaya/pull/86)
**Audit tool:** Google PSI API (`pagespeedonline/v5/runPagespeed`), mobile form factor, median-of-3

## Final scores (preview, median of 3 runs)

| Route | Perf | A11y | BP | SEO |
|------|-----:|-----:|---:|----:|
| `/` | 95 | **100** | **100** | **100** |
| `/about` | **100** | **100** | **100** | **100** |
| `/projects` | 93 | **100** | **100** | **100** |
| `/blog` | 96 | **100** | **100** | **100** |
| `/setup` | 67–90¹ | **100** | **100** | **100** |
| `/services` | 95 | **100** | **100** | **100** |
| `/proof` | 95 | **100** | **100** | **100** |
| `/faq` | 93 | **100** | **100** | **100** |
| `/privacy` | 88 | **100** | **100** | 69² |

¹ `/setup` perf swings widely across PSI runs (67–90) due to the LCP image (`/setup/claude-cli.webp`) being above-the-fold and competing with the React 19 hydration bundle.
² `/privacy` SEO 69 is intentional — the page has `robots: { index: false }` because the privacy policy should not show up in search results.

## What changed (commits on the branch)

### Commit 1 — `perf(lighthouse): site-wide CLS/A11y/BP/SEO fixes toward 100/100/100/100`

Five site-wide gaps closed:

| Audit | Cause | Fix | File |
|------|-------|-----|------|
| `cumulative-layout-shift` | JetBrains Mono `display: 'swap'` reflowed mono text on every page | → `display: 'optional'` + `adjustFontFallback: true` | `src/app/layout.tsx` |
| `cumulative-layout-shift` (0.21–0.24 on prose pages) | `.prose { max-width: 65ch }` width shifts as the font swaps because `ch` depends on the active font's "0" glyph width | → `max-width: 40rem` (font-independent) | `src/app/globals.css` |
| `errors-in-console` (React #418) on `/blog` | `BlogCard` rendered dates via `new Date('YYYY-MM-DD').toLocaleDateString('en-US', ...)`. Bare ISO dates parse to UTC midnight; `toLocaleDateString` formats in the runtime's local timezone, so the build server and the visitor's browser could disagree on the day → text-content mismatch on hydration | Force `timeZone: 'UTC'` on both spots | `BlogCard.tsx`, `blog/[slug]/page.tsx` |
| `color-contrast` (3.26) on `/blog` tag pills | `opacity-60` on accent text `#60a5fa` over `#1a1a1a` failed WCAG AA | → `text-[var(--color-text-muted)]` (passes AA) | `src/app/blog/page.tsx` |
| `heading-order` (h3 in footer with no preceding h2) on `/contact` | Footer column headings were `<h3>` — but they're top-level landmark headings inside `<nav>` blocks, so they should be `<h2>` | → `<h2>` in 3 spots | `src/components/layout/Footer.tsx` |

Also added the `scripts/lh100-*.mjs` PSI harness (`baseline`, `aggregate`, `deep`, `lcp`, `diag`, `goal`) and `.lh100/` to `.gitignore`.

### Commit 2 — `perf(lighthouse): lazy-load CommandPalette to drop ~50KB initial JS`

CommandPalette is bundled in every page's client island for `Cmd+K`. It imported the heavy projects/blog data into the initial bundle even though the palette only opens on a key chord.

- New `src/components/layout/CommandPaletteLoader.tsx`: tiny client island that listens for `Cmd+K`, then dynamically imports the full palette via `next/dynamic({ ssr: false })`.
- `CommandPalette` now accepts `defaultOpen?: boolean` so the loader hands off seamlessly after the first keypress.

### Commit 3 — `perf(lighthouse): split blog post metadata so CommandPalette stops shipping markdown`

The palette only needed `{slug, title, tags}` from each blog post, but importing `blogPosts` pulled the full 33KB of inline markdown content too. Added `src/data/blog-posts-index.ts` (~3KB of metadata only); CommandPalette now imports the index instead of the full posts file.

## What's still keeping perf < 100 — and why these are NOT fixable in code

### 1. React 19 / Next 16 makes the main stylesheet render-blocking on Vercel

`scripts/optimize-css.mjs` runs critters as a postbuild step. Locally, the produced HTML correctly has:

```html
<link rel="stylesheet" href="..." media="print" onload="this.media='all'">
```

But the HTML actually served by Vercel for the same routes is:

```html
<link rel="stylesheet" href="..." data-precedence="next">
```

React 19's `data-precedence` CSS streaming attribute manages stylesheet load order itself and re-renders the link tag during Vercel's build packaging step, stripping the `onload` async pattern. The result is render-blocking CSS, adding ~150ms of `render-blocking-insight` savings that we can't recover without forking the renderer.

**Status:** known Next 16 / React 19 limitation. Filed as known caveat — chasing it further requires switching to `output: 'export'`, but the project has a server-side contact API (`src/app/api/contact/route.ts`) so static export isn't viable.

### 2. PSI mobile run-to-run variance ±10 points

PSI uses simulated 4× CPU + 1.6Mbps throttling. The same URL can return perf 67 on one run and 90 on the next — see `/setup`'s three-run spread (67/89/90). The score depends on which scripts win bandwidth in any given simulator pass.

**Status:** inherent to the audit tool. Production CDN warmth + CrUX data smooth this out; the PSI URLs in the goal (`pagespeed.web.dev/analysis/...`) re-test on each click and will eventually settle higher once production is updated and gets enough real-user traffic for CrUX.

### 3. LCP image on `/setup` competing with hydration JS

`/setup`'s LCP is the 16:9 `claude-cli.webp` Claude CLI screenshot at the top of the page. The image is only 24KB and is already `priority` + `<link rel="preload" as="image">`. Despite that, LCP measures 2.8–3.7s on mobile-throttled simulator — the React 19 hydration JS bundle on the same page (~720KB of chunks total) crowds the simulator's bandwidth budget.

**Status:** structural. Removing client interactivity from the page would help, but the page genuinely needs `ImageModal` (mobile zoom), the hover pan-reveal, and the Cmd+K palette wiring — all client-side concerns.

## Reproducing this audit

```bash
# In the worktree
export PSI_API_KEY=...   # from .env.local
export LH_BASE=https://alanregaya.dev   # or a Vercel preview URL

# Full 34-route sweep (writes .lh100/summary.json)
node scripts/lh100-baseline.mjs

# Aggregate failed audit IDs across all routes
node scripts/lh100-aggregate.mjs

# Median-of-3 audit on the 8 priority routes (writes .lh100/goal.json)
node scripts/lh100-goal.mjs

# Single-route deep diagnostic (WINDOWS GIT-BASH: prefix the route with //)
MSYS_NO_PATHCONV=1 node scripts/lh100-diag.mjs //setup
```

## Next steps if 100 perf is still required

The remaining gaps are not low-hanging — they need an architectural call:

1. **Strip all client components from above-the-fold sections** of the pages that miss 100. The pages that hit 100 (`/about`) have purely server-rendered content above the fold.
2. **Switch to `output: 'export'`** and move the contact form to a third-party service (Formspree, Resend's hosted form) so static export is viable. That eliminates the React 19 / Vercel CSS-streaming issue entirely.
3. **Self-host the inline critical CSS** by extracting and serving it as a separate route, bypassing React's stylesheet management.

None of these are pure perf tweaks — they involve real product trade-offs (removing UX features, changing hosting model). Bringing them up here so the call lands with the user, not Claude.
