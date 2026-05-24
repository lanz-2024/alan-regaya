---
name: seo-schema-audit
description: Audit JSON-LD structured data + page metadata for every public route under src/app, and (when invoked with auto-fix intent) inject missing WebPage / BreadcrumbList schema and metadata fields. Triggers on phrases like "audit seo schema", "schema audit", "check structured data", "rich results", "fix schema", "schema gate", or any time a new src/app/**/page.tsx is added/edited.
---

# SEO Schema Audit (portfolio-local)

This is a repo-local skill that wraps `scripts/gate-schema.mjs`. The same script runs as a pre-push gate via `simple-git-hooks`, so this skill is the manual equivalent.

## When to invoke

- User says: "audit seo", "audit the schema", "schema audit", "check structured data", "verify rich results", "fix the schema", "missing breadcrumb", "missing webpage schema".
- Any work that adds or modifies `src/app/**/page.tsx`, `src/lib/seo/**`, `src/app/layout.tsx`, `src/app/sitemap.ts`, or `src/app/robots.ts`.
- Before opening a PR that touches routes or metadata.

## Workflow

### 1. Read-only audit (default first step)

```bash
npm run audit:schema
```

Reports per-page findings. Exits non-zero if any page is missing:
- `export const metadata` with `title`, `description`, `alternates`, `openGraph`, `twitter`
- `<script type="application/ld+json">` tag
- `buildBreadcrumbList(...)` call (static routes only)
- Page-level schema type (WebPage / Article / BlogPosting / etc.)

### 2. Auto-fix mode (when user asks to fix, OR when new pages exist)

```bash
npm run fix:schema
```

Auto-injects missing breadcrumb + WebPage schema using helpers in `src/lib/seo/`. Leaves a `TODO:` description placeholder where it cannot infer copy from the file. After running, **show the diff** and ask the user to review before committing:

```bash
git diff
```

Then propose a commit:

```bash
git add -p
git commit -m "fix(seo): auto-inject WebPage/BreadcrumbList schema for <route(s)>"
```

### 3. Strict mode (CI-grade — invokes Claude for non-fixable findings)

```bash
npm run gate:schema
```

Use only if `--fix` cannot resolve everything (e.g., missing metadata fields that need real copy). This is what the pre-push hook runs.

## Auto-fix on this skill's invocation

When the user's phrasing implies they want fixes ("fix the schema", "make the audit pass", "audit and fix"), **skip step 1 and go straight to `npm run fix:schema`** — the script is idempotent and reports findings even when there's nothing to fix. Then show the diff and offer to commit.

When phrasing is purely investigative ("audit", "what's missing"), run `npm run audit:schema` only.

## Helpers reused

- `src/lib/seo/breadcrumbs.ts` — `buildBreadcrumbList(items)`
- `src/lib/seo/webpage.ts` — `buildWebPage({ path, name, description, type? })`

Both reference stable `@id`s emitted by `src/app/layout.tsx` (`${siteConfig.url}/#person`, `${siteConfig.url}/#website`).

## Validation (post-fix, manual)

After committing, validate the live URLs:
1. https://search.google.com/test/rich-results — paste each affected route
2. https://validator.schema.org/ — spec conformance

## Bypass

The pre-push gate honors:
```
SCHEMA_GATE_SKIP=1 git push
git push --no-verify
```

Use only as a last resort and tell the user why.
