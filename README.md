This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Pre-push Lighthouse gate

Every `git push` runs `scripts/gate-lighthouse.mjs` (installed via `simple-git-hooks` on `npm install`). The hook:

1. Detects changed routes from `git diff` against the remote branch (falls back to `origin/main`). Global files (`layout.tsx`, `globals.css`, `next.config.ts`, etc.) trigger a full-site audit.
2. Runs `npm run build`, serves the output on `http://localhost:4321`, and audits each route with mobile Lighthouse (`performance,accessibility,best-practices,seo`).
3. Blocks the push if any category is below 100. Failing audit IDs are printed with titles + descriptions.
4. If `claude` is on `PATH`, invokes `claude -p` with the failing-audit context to attempt fixes, then re-runs the audit once. The push remains blocked until you stage and commit the fix.

Bypass / tuning:

- `git push --no-verify` — skip the hook (native git).
- `LIGHTHOUSE_GATE_SKIP=1 git push` — explicit bypass with logged warning.
- `LIGHTHOUSE_GATE_AUTOFIX=0` — block-only mode (no Claude invocation).
- `LIGHTHOUSE_GATE_FULL=1` — audit every route regardless of diff.
- `LIGHTHOUSE_GATE_PORT=4321` — change the local server port.

Expected duration: <1s for docs-only pushes, ~2-3 min per route on a warm cache.
