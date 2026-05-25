# Case Study Audit — Featured Projects

**Audit date:** 2026-05-26
**Scope:** 3 featured case studies in `src/data/projects.ts`
**Evidence bar:** Strict — ClickUp tasks assigned to Lan + GitHub commits/PRs authored by `lanz-2024` (alan@blazecommerce.io) + live-site stack checks.

> **Bottom line:** the case studies as written significantly overstate Lan's role. Across all three projects there is **zero evidence** of Lan personally architecting, leading, or building the features described. The available evidence supports a much narrower role: **platform engineer at BlazeCommerce maintaining the shared headless-WooCommerce framework, with occasional client-site bug fixes** — not "lead engineer, end-to-end" on these specific client builds. Several feature claims (scent builder, single-page checkout, engraving capture, `shine_calculate_price()`, `wp_shine_loyalty` table) have no traceable authorship by Lan in any searched source.

---

## Caveats up front

- ClickUp `search` returns at most 100 tasks per query (sorted by recency). Older 2024–early-2025 tasks may not surface. Findings below are based on what is visible.
- Lan could conceivably have authored work under a non-GitHub account or in private client repos this audit can't see. No private client repos were found under `blaze-commerce/*` matching the three client names (`gh search repos byron|jackie|shine --owner=blaze-commerce` → empty).
- Live URLs were inspected via HEAD/GET only (no full Playwright run) — stack detection is from HTTP headers + HTML keyword scan.

---

## Project 1 — Byron Bay Candles

**File:** `src/data/projects.ts:99-135` · **Claimed shipped:** 2025-09-12

### Verdicts

| Claim | Evidence | Verdict |
|---|---|---|
| Role: "Lead engineer" | **ClickUp:** Lan is assigned to 2 maintenance tickets only — `86exmw0rt` "Candle Refill Category: Products missing from main menu after category description edit" (closed 2026-05-18) and `86exkbnzr` "Client Staging Site Review Feedback Batch: Theme colour, typography, and footer fixes" (to-do, 2026-05-13). **GitHub:** no commits authored by Lan in any byron-named repo (no such repo exists under blaze-commerce). The current active homepage rebuild task `BBC Homepage rebuild using Kadence` is **assigned to Jayr Sullano, not Lan.** | **SUSPECT** |
| Stack: Next.js / TypeScript / WooCommerce / Typesense / Tailwind | Site is served by Vercel with `X-Powered-By: Next.js` — so the headless Next.js stack itself is real. But Lan is not the architect of this specific deploy. | **Partial** (stack confirmed; role overstated) |
| Feature: custom **scent builder** (React island) | No commits, PRs, or ClickUp tasks reference `scent`, `scent-builder`, or anything candle-customisation related authored by Lan. | **SUSPECT** |
| Feature: Typesense product search | Typesense is a BlazeCommerce-platform-wide capability (Lan does contribute to `blazecommerce-wp-plugin` Typesense sync code), so it exists on the site — but it's not a Byron-specific build by Lan. | **Partial** |
| Feature: zero third-party JS, critical CSS inlined, WebP hero preload | Site HTML actually contains Elementor markup (`elementor`, `wp-content`) — meaning WordPress/Elementor is present in the rendered page. This contradicts the "zero third-party JS, fully headless" framing. | **SUSPECT** |
| Metric: search <100ms (from ~600ms) | No commit/task source. | **Unverifiable** |
| Metric: mobile Lighthouse 95+ (from low-50s) | No commit/task source; not measured in this audit. | **Unverifiable** |
| Metric: time-to-checkout −38% | No commit/task source. | **Unverifiable** |
| Shipped: 2025-09-12 | No evidence either way; cannot confirm. | **Unverifiable** |

### Recommendation
Either rewrite to reflect a **maintenance / framework engineer** role on the BlazeCommerce platform that powers Byron Bay Candles, or drop this case study entirely. The "scent builder" feature should be removed unless you can show the code; the live site shows an Elementor-heavy WordPress build, not the headless minimalism described.

---

## Project 2 — Jackie Mack Designs

**File:** `src/data/projects.ts:156-193` · **Claimed shipped:** 2025-11-04

### Verdicts

| Claim | Evidence | Verdict |
|---|---|---|
| Role: "Lead engineer, end-to-end" | **ClickUp:** Lan assigned to 1 ticket — `86exph3xe` (backlog, 2026-05-22) "Hero banner & offer not updating after redeploy (US region content empty, post-Typesense migration regression)." Pure regression-triage work. **GitHub (BC org):** only 2 commits naming Jackie Mack, both from 2023-06-24 in `blaze-commerce-front-end-site-build-next.js`: `set jackie mack hasItemsLeftBadge and showWishlistButton to true` and `storybook 1 left item for jackie mack`. Plus one framework-level commit `WOOLESS-3033 Update-and-fix-jmd-build-errors`. None of these are "end-to-end build" work. | **SUSPECT** |
| Stack: Next.js / TypeScript / WooCommerce / Typesense / Tailwind | Confirmed live (`_next/` assets present). Lan didn't build the deploy. | **Partial** |
| Feature: single-page checkout | No PR, commit, or task by Lan references checkout consolidation. | **SUSPECT** |
| Feature: custom product configurator (React island, diffing re-renders) | No source. | **SUSPECT** |
| Feature: inline engraving capture + font preview | `gh search commits --author=lanz-2024 engraving` → empty. No ClickUp ticket assigned to Lan mentions engraving. | **SUSPECT** |
| Feature: Stripe Payment Element; client-side cart vs Store API | No source. | **SUSPECT** |
| Feature: engraving via WooCommerce line-item meta | No source. | **SUSPECT** |
| Metric: checkout conversion +22% | No source. | **Unverifiable** |
| Metric: configurator drop-off −41% | No source. | **Unverifiable** |
| Metric: AOV +14% | No source. | **Unverifiable** |
| Shipped: 2025-11-04 | No evidence. | **Unverifiable** |

### Recommendation
The 2023 storybook commits and the regression-triage ticket from May 2026 are the **only** documented Lan involvement. Either rewrite as "supported the JMD storefront on the BlazeCommerce headless platform, contributing fixes" — or remove the case study.

---

## Project 3 — Shine Trim

**File:** `src/data/projects.ts:204-241` · **Claimed shipped:** 2025-07-22

### Verdicts

| Claim | Evidence | Verdict |
|---|---|---|
| Role: "Lead engineer" | **ClickUp:** **zero** tickets assigned to Lan referencing Shine Trim. The only shine ticket in the workspace is an Apple Pay checkout fix assigned to Jayr Sullano. **GitHub:** zero commits authored by `lanz-2024` referencing `shine`, `shinetrim`, `shine_calculate_price`, or `wp_shine_loyalty` across any repo. | **SUSPECT** |
| Stack: WordPress / WooCommerce / PHP / Blocksy | Site HTML confirms Blocksy theme + WordPress (Kinsta). Lan is not the builder, but the stack is real. | **Partial** |
| Feature: `shine_calculate_price()` single-function pricing engine | `gh search code shine_calculate_price` → no result; no commit. | **SUSPECT** |
| Feature: pricing order tier→bulk→loyalty→coupon | No source. | **SUSPECT** |
| Feature: custom `wp_shine_loyalty` table + REST API | No source. | **SUSPECT** |
| Feature: admin UI for per-category bulk-tier breakpoints | No source. | **SUSPECT** |
| Metric: 5,000+ SKUs | Plausible (large catalog claim), but not measured here. | **Unverifiable** |
| Metric: member retention +31% | No source. | **Unverifiable** |
| Metric: bulk-order revenue +18% | No source. | **Unverifiable** |
| Shipped: 2025-07-22 | No evidence. | **Unverifiable** |

### Recommendation
**Strongest case for removal.** Nothing in ClickUp or GitHub places Lan on this project at all. Either remove the case study or replace with an honest description if there is private evidence the audit can't see (e.g., a non-BC private repo).

---

## What the evidence *does* support

Lan's **actual visible work** (across all three case studies combined):

- **2 maintenance tickets** on Byron Bay Candles (theme colours/footer; menu fix after category description edit) — 2026-05
- **1 regression-triage ticket** on Jackie Mack Designs (US region content empty after Typesense migration) — 2026-05
- **2 minor 2023 commits** flipping storybook flags for Jackie Mack
- **1 build-error fix** on a JMD branch in `blazecommerce-wp-plugin` (WOOLESS-3033)
- **Substantial framework contributions** to `blaze-commerce/headless-woocommerce` and `blaze-commerce/blazecommerce-wp-plugin` — the platform that powers many BlazeCommerce client storefronts. These are real and verifiable (6858 commits across BC org by `lanz-2024`).

This profile reads as: **"BlazeCommerce platform engineer — maintains the shared headless framework powering 40+ storefronts, with occasional client-site bug-fixes."** That's a genuine, defensible positioning. The current case studies invent a "lead engineer on a specific client build, designed features X/Y/Z, delivered metrics A/B/C" narrative that the sources don't support.

---

## Suggested edits to `src/data/projects.ts`

1. **Demote** Byron Bay Candles, Jackie Mack Designs, Shine Trim from `featured` with full case studies → short outline cards similar to the non-featured ones, attributing role honestly (e.g., "Platform engineer — BlazeCommerce headless framework").
2. **Or** delete the `caseStudy` objects on lines 99–135, 156–193, 204–241 entirely, and re-feature the open-source work (`headless-woocommerce`, `blazecommerce-wp-plugin`, `blaze-blocksy`) plus `smart-time-tracker` where Lan has unambiguous authorship.
3. **Remove all unsourced metrics** (`+22%`, `−38%`, `+31%`, etc.) unless an analytics screenshot or stakeholder quote can back each one.
4. If keeping any client mention: replace specific feature claims (`scent builder`, `engraving capture`, `shine_calculate_price`) with honest framework-level contributions (Typesense sync, Gutenberg blocks, build/regression fixes — all of which are real per the BC PRs).

---

## How to extend this audit

- Pull older ClickUp pages (the search caps at 100). Use the ClickUp API directly with `assignee[]=54603746` + date filters to enumerate Lan's full 2023–2025 history.
- Search for private client repos under any other GitHub org (not just `blaze-commerce/*`).
- Run Lighthouse against each live URL to confirm/deny the `95+` mobile score and `<100ms` search claims.
- Ask BC stakeholders directly to confirm Lan's role on each project; if they confirm a deeper role, get them to point at the artifacts so the case studies can cite real evidence.
