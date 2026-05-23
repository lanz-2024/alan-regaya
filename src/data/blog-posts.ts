export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'typesense-indexing-patterns-woocommerce',
    title: 'Typesense Indexing Patterns for Headless WooCommerce',
    description: 'Real-world patterns for indexing 10k+ WooCommerce products into Typesense — schema design, incremental sync hooks, faceted search, and the gotchas of running a search engine alongside WordPress.',
    date: '2026-05-18',
    readTime: '11 min read',
    tags: ['Typesense', 'WooCommerce', 'Search', 'Headless'],
    content: `<h2>Why Typesense Over Algolia or Elasticsearch</h2>
<p>For most headless WooCommerce projects, the search engine choice comes down to three options. Algolia is the easy answer — and the expensive one, with per-search pricing that scales painfully past 50k operations/month. Elasticsearch is powerful but operationally heavy: a JVM, a cluster, and a learning curve that's hard to justify for product search. Typesense lands in the middle — open-source, single-binary, sub-50ms queries on millions of documents, and a pricing model (self-hosted or Typesense Cloud) that doesn't penalize success.</p>
<p>On a recent project syncing 12k WooCommerce products, the entire Typesense Cloud bill came to $19/month. The equivalent Algolia bill would have been north of $400.</p>
<h2>Schema Design: Flatten, Don't Nest</h2>
<p>Typesense supports nested fields, but querying and faceting against flat fields is dramatically faster. The pattern I use: flatten WooCommerce's taxonomy and meta structure into a denormalized document per product.</p>
<pre><code>{
  id: '1234',
  name: 'Soy Wax Candle — Vanilla',
  price: 29.95,
  on_sale: false,
  in_stock: true,
  categories: ['Candles', 'Soy Wax', 'Vanilla'],
  category_ids: [12, 45, 78],
  attributes_scent: ['Vanilla', 'Sweet'],
  attributes_size: ['200ml'],
  permalink: '/product/soy-wax-candle-vanilla/',
  image: 'https://cdn.example.com/...',
  updated_at: 1747094400
}</code></pre>
<p>Faceting on <code>categories</code> and <code>attributes_*</code> as string arrays gives instant filter counts. The <code>updated_at</code> Unix timestamp drives incremental sync.</p>
<h2>Incremental Sync via WP Hooks</h2>
<p>A full reindex of 12k products takes ~90 seconds. Doing that on every product save is unacceptable. Instead, hook into WooCommerce's save events and push only the changed document:</p>
<pre><code>add_action('woocommerce_update_product', function($product_id) {
  $product = wc_get_product($product_id);
  $doc = build_typesense_doc($product);
  wp_remote_post(TYPESENSE_URL . '/collections/products/documents?action=upsert', [
    'headers' => ['X-TYPESENSE-API-KEY' => TYPESENSE_KEY],
    'body' => wp_json_encode($doc),
    'timeout' => 5,
  ]);
}, 20, 1);</code></pre>
<p>Deletes hook into <code>before_delete_post</code> with a guard that the post type is <code>product</code>. Stock changes hook into <code>woocommerce_product_set_stock</code> separately — they fire on every order and you want the lightest possible payload there.</p>
<h2>The Full-Reindex Safety Net</h2>
<p>Hooks miss things. A bulk SQL update, a WP-CLI import, a database restore — none of these fire the save action. The pattern: a nightly WP-Cron job that walks the product catalog and upserts any document where the WordPress <code>post_modified</code> is newer than Typesense's <code>updated_at</code>.</p>
<p>This catches drift without rebuilding the index from scratch. On the 12k-product site, the nightly reconciliation processes ~50 documents on average and finishes in under 4 seconds.</p>
<h2>Search-as-You-Type with InstantSearch</h2>
<p>Typesense ships a drop-in adapter for Algolia's <code>react-instantsearch</code>. The Next.js side becomes trivial:</p>
<pre><code>import { TypesenseInstantSearchAdapter } from 'typesense-instantsearch-adapter';

const adapter = new TypesenseInstantSearchAdapter({
  server: { apiKey: process.env.NEXT_PUBLIC_TS_SEARCH_KEY, nodes: [...] },
  additionalSearchParameters: {
    query_by: 'name,categories,attributes_scent',
    query_by_weights: '4,2,1',
  },
});</code></pre>
<p>The search-only API key is scoped to read-only on the products collection — safe to ship to the browser. The admin key, which can write and create collections, lives only on the server.</p>
<h2>The Gotchas</h2>
<p><strong>Collection aliases for zero-downtime reindexes.</strong> When the schema changes, you can't mutate fields on a live collection. Build a new collection (<code>products_v2</code>), reindex into it, then swap the alias atomically. The frontend always queries <code>products</code>, which points to whichever version is current.</p>
<p><strong>Variable products need a strategy.</strong> Indexing each variation as its own document explodes the index size and confuses search results. The cleaner approach: index the parent product with a <code>variation_prices</code> range and a <code>variation_attributes</code> array. Variation-level filtering happens client-side on the result.</p>
<p><strong>Multi-currency means multi-field.</strong> If the storefront ships in USD, AUD, and EUR, store <code>price_usd</code>, <code>price_aud</code>, <code>price_eur</code> as separate fields. Sorting and filtering by price requires a single numeric field; you can't sort by a per-locale lookup.</p>
<h2>When Not to Use Typesense</h2>
<p>If the catalog is under 500 products and the WooCommerce default search (with FibSearch or similar) hits acceptable latency, the operational overhead isn't worth it. Typesense earns its place when search becomes a primary UX surface — instant results, faceted refinement, typo tolerance — not just a fallback when navigation fails.</p>`,
  },
  {
    slug: 'tauri-vs-electron-lessons',
    title: 'Tauri vs Electron: What I Learned Shipping a Desktop App in Both',
    description: 'After porting a developer tool from Electron to Tauri, here is the honest breakdown — bundle size, native webview quirks, IPC patterns, Rust learning curve, and when each framework is actually the right call.',
    date: '2026-05-10',
    readTime: '10 min read',
    tags: ['Tauri', 'Electron', 'Desktop', 'Rust'],
    content: `<h2>The Setup</h2>
<p>I shipped the first version of a developer-tooling desktop app in Electron — React frontend, Node.js backend, the standard stack. Bundle size was 138MB. Cold start was around 1.4 seconds. Memory at rest was ~210MB. For an app that mostly proxies SSH commands and renders a tree view, that felt absurd.</p>
<p>Six months later I ported it to Tauri. Same React frontend, Rust backend, same feature set. Bundle dropped to 14MB. Cold start became 380ms. Memory at rest hovers at 65MB. Here's the honest accounting of what that cost.</p>
<h2>Where Tauri Wins, Clearly</h2>
<p><strong>Bundle size.</strong> Tauri uses the OS's native webview — WebView2 on Windows, WKWebView on macOS, WebKitGTK on Linux. No bundled Chromium. The frontend assets compress to a few MB; the Rust binary is small. The 10x reduction is real and immediately noticeable when users download the installer.</p>
<p><strong>Memory.</strong> Native webviews share processes with the OS in ways Chromium can't. The "Electron app eats 500MB at idle" jokes don't apply.</p>
<p><strong>Security model.</strong> Tauri's permission system requires you to allowlist exactly which APIs the frontend can call. Electron's default-allow nodeIntegration is a footgun that's caused real CVEs. Tauri's allowlist forces you to think about attack surface from day one.</p>
<p><strong>Update flow.</strong> Tauri's built-in updater signs releases with a public/private key pair and verifies before applying. Setting this up in Electron requires either electron-updater (which works) or rolling your own (which most teams do, badly).</p>
<h2>Where Electron Still Wins</h2>
<p><strong>Webview consistency.</strong> This is the big one. Chromium is Chromium everywhere. WebKitGTK on Linux is months behind WKWebView on macOS. Modern CSS features — container queries, <code>:has()</code>, view transitions — land at different times on each platform. I shipped one release with a perfectly working layout on macOS that broke on Linux because the GTK webview was too old.</p>
<p><strong>Node.js ecosystem access.</strong> Want to call <code>simple-git</code> or <code>better-sqlite3</code> from the backend? In Electron, you just import it. In Tauri, you write Rust — or you shell out to Node via <code>tauri::api::process::Command</code>, which negates the bundle-size argument.</p>
<p><strong>Debugging.</strong> Electron's renderer is just Chrome DevTools. Tauri's renderer on Linux is WebKitGTK's inspector, which is functional but feels like 2017.</p>
<p><strong>Team velocity.</strong> If your team is JavaScript-first, the Rust ramp-up is real. Simple things — async file I/O, error handling across the IPC boundary, lifetime annotations — take weeks to internalize. For a small utility, you'll ship Electron faster.</p>
<h2>IPC: The Pattern That Actually Scales</h2>
<p>Both frameworks let you call backend functions from the frontend. In Tauri:</p>
<pre><code>// src-tauri/src/main.rs
#[tauri::command]
async fn run_ssh(host: String, cmd: String) -> Result&lt;String, String&gt; {
    ssh_exec(&host, &cmd).await.map_err(|e| e.to_string())
}

// frontend
import { invoke } from '@tauri-apps/api/core';
const output = await invoke&lt;string&gt;('run_ssh', { host, cmd });</code></pre>
<p>The serialization is automatic, but the error type matters. Returning <code>Result&lt;T, String&gt;</code> means the frontend gets stringified errors. For structured errors (with error codes, retryable flags, etc.), define a serializable error enum:</p>
<pre><code>#[derive(Debug, thiserror::Error, serde::Serialize)]
enum AppError {
    #[error("ssh failed: {0}")]
    Ssh(String),
    #[error("timeout")]
    Timeout,
}</code></pre>
<p>This pattern took me three iterations to get right. The first version threw away too much information; the second over-engineered with a 12-variant enum; the final shape is ~5 variants that map to specific UI behaviors.</p>
<h2>The Rust Learning Curve, Honestly</h2>
<p>If you've never written Rust, plan on 2-3 weeks before you're productive. The borrow checker fights you on patterns that are trivial in JavaScript — passing a callback into a closure, sharing state across async tasks, mutating a Vec from multiple places. Once it clicks, you stop fighting and start designing around ownership.</p>
<p>The unexpected benefit: the bugs that compile-time checks catch are exactly the bugs that cause hard-to-reproduce crashes in production Electron apps. Race conditions, use-after-free, null pointer access. The compiler refuses to let you ship them.</p>
<h2>Which to Choose</h2>
<p>If you're shipping to non-technical users who'll judge the app by its download size and battery impact, Tauri. If your team is JavaScript-only and you need to ship in weeks not months, Electron. If you need bleeding-edge web platform features and Linux is a primary target, Electron.</p>
<p>For my use case — a developer tool that needs to feel native and not eat the user's RAM — Tauri was the right call. The Rust investment paid for itself in the first major release.</p>`,
  },
  {
    slug: 'headless-woocommerce-architecture-decisions',
    title: 'Headless WooCommerce: The Architecture Decisions That Actually Matter',
    description: 'A frank look at the decisions that shape a headless WooCommerce project — REST vs GraphQL, cart-on-WP vs cart-on-frontend, ISR vs SSR, and the operational realities most tutorials skip.',
    date: '2026-05-02',
    readTime: '12 min read',
    tags: ['WooCommerce', 'Headless', 'Next.js', 'Architecture'],
    content: `<h2>The Question Behind the Question</h2>
<p>"Should we go headless?" is rarely the right question. The right one is: what does the existing WooCommerce stack cost us that a headless rebuild would fix? If the answer is "the storefront is slow", that's solvable inside WordPress with caching and a CDN — no rebuild needed. If the answer is "we want to ship the same catalog to a mobile app, a kiosk, and a marketing site", headless starts to earn its keep.</p>
<p>Assuming the rebuild makes sense, here are the architecture decisions that determine whether the project ships in three months or twelve.</p>
<h2>Decision 1: REST vs GraphQL</h2>
<p>WooCommerce ships with a mature REST API. WPGraphQL + WooGraphQL adds a GraphQL layer on top. Both work; the choice depends on your team and your read patterns.</p>
<p><strong>Pick REST when:</strong> the storefront does mostly category and product page fetches, your team has no GraphQL experience, or you want to avoid the N+1 query performance trap that bites unoptimized GraphQL resolvers under load.</p>
<p><strong>Pick GraphQL when:</strong> the frontend needs to compose data from products, categories, posts, and ACF fields in a single request, or when you're already running GraphQL elsewhere in the stack.</p>
<p>On a recent project, I migrated from GraphQL to REST mid-build. The reason: WPGraphQL's variable-product queries were generating 80+ SQL queries per request, and the fix required patching WooGraphQL's resolvers. Falling back to two REST calls plus client-side composition was faster to ship and easier to cache at the CDN edge.</p>
<h2>Decision 2: Cart on WordPress or Cart on Frontend</h2>
<p>This is the decision that quietly defines the entire project.</p>
<p><strong>Cart on WordPress (CoCart, Store API):</strong> sessions, shipping, taxes, coupons, payment all stay in WooCommerce. The frontend is a view layer. Pros: zero risk of cart divergence from order; all extensions (subscriptions, bookings, bundles) work; payment methods stay PCI-scoped to WordPress. Cons: every cart interaction is a network round-trip to WordPress, and WordPress becomes a hard runtime dependency for the frontend.</p>
<p><strong>Cart on frontend (custom Stripe/Square integration):</strong> the cart lives in the frontend (Zustand, localStorage), and the order is created on WordPress only at checkout completion. Pros: instant cart interactions, frontend can work briefly during WordPress downtime. Cons: you reimplement every WooCommerce cart feature — shipping, taxes, coupons, stock validation — which is months of work and a permanent maintenance tax.</p>
<p>For 90% of projects, cart-on-WordPress via Store API is the right answer. The latency cost is real but manageable with optimistic UI updates. Reimplementing WooCommerce's cart logic is a trap.</p>
<h2>Decision 3: ISR, SSR, or Static</h2>
<p>Next.js gives you the full spectrum. The pattern I've settled on for medium catalogs (under 50k SKUs):</p>
<ul>
<li><strong>Static + revalidate:</strong> product pages, category pages, marketing pages. <code>generateStaticParams</code> for top-100 products, ISR with a 5-minute revalidate window for the long tail.</li>
<li><strong>Server-rendered:</strong> search results, account pages, anything authenticated.</li>
<li><strong>Client-side:</strong> cart, mini-cart, recently viewed.</li>
</ul>
<p>The static-with-revalidate pattern is what makes headless feel fast. A product page that's been generated once serves from the CDN in &lt;100ms regardless of WordPress load. The 5-minute window means stock counts may be slightly stale, but a webhook from WooCommerce on stock change triggers an on-demand revalidate within seconds for popular SKUs.</p>
<h2>Decision 4: Hosting Split</h2>
<p>The frontend wants edge caching, instant deploys, and global distribution — Vercel, Netlify, Cloudflare Pages. WordPress wants a beefy origin with predictable database performance — Kinsta, WP Engine, or a tuned VPS. Putting them on the same host optimizes for neither.</p>
<p>The split I use: WordPress on Kinsta (admin + REST/GraphQL endpoint), Next.js on Vercel (frontend), Cloudflare in front of both. WordPress hostname is treated as an internal API; the public domain points at Vercel.</p>
<h2>Decision 5: How Authentication Actually Works</h2>
<p>WooCommerce assumes WordPress sessions — a PHP session cookie, set by WordPress, read by WooCommerce. Headless breaks this assumption.</p>
<p>The pattern that works: JWT auth via the <code>jwt-authentication-for-wp-rest-api</code> plugin (or a custom equivalent), with the JWT stored in an HttpOnly cookie set by the Next.js server. The frontend forwards this cookie on every API call; WordPress validates and returns the user-scoped data.</p>
<p>For checkout specifically, CoCart's cart-key-based guest session is essential. New visitors get a cart key on first add-to-cart, and that key persists in localStorage until login, at which point the guest cart merges into the user cart.</p>
<h2>Decision 6: What the Migration Looks Like</h2>
<p>You don't rebuild a live store overnight. The pattern I've used twice now:</p>
<ol>
<li><strong>Subdomain launch:</strong> ship the headless frontend to <code>new.example.com</code>. Both stores share the same WooCommerce backend, so orders flow into the same admin.</li>
<li><strong>Soft migrate top SKUs:</strong> redirect the top 50 product URLs to the new frontend. Monitor conversion, fix what breaks.</li>
<li><strong>Full cutover:</strong> swap DNS, set up 301 redirects for any URL structure changes, keep WordPress at <code>shop.example.com</code> for admin.</li>
</ol>
<p>The "shared backend during migration" approach lets you ship in stages without holding two databases in sync. The admin team keeps working in WordPress; the storefront just changes which frontend renders the catalog.</p>
<h2>The Operational Reality</h2>
<p>Headless WooCommerce adds runtime dependencies. A broken WPGraphQL plugin update can take down your frontend. A misconfigured CDN can serve stale stock. A WordPress migration with a different domain breaks every <code>permalink</code> field in the frontend cache.</p>
<p>The fix is monitoring and graceful degradation: health checks on the WordPress endpoint, fallback static catalog snapshots for true outages, and a frontend that can show "checkout temporarily unavailable" without 500-ing the whole page. None of this is glamorous, and all of it is what keeps the architecture viable in production.</p>`,
  },
  {
    slug: 'core-web-vitals-at-scale',
    title: 'Core Web Vitals at Scale: Lessons from 30+ Production Sites',
    description: 'What actually moves the needle on LCP, CLS, and INP when optimizing WooCommerce storefronts in production — from critical CSS inlining to image pipelines and font loading strategies.',
    date: '2026-03-20',
    readTime: '8 min read',
    tags: ['Performance', 'Next.js', 'WooCommerce', 'Core Web Vitals'],
    content: `<h2>The Real Problem with WooCommerce Performance</h2>
<p>After optimizing 30+ production WooCommerce sites, I've learned that the standard advice — "enable caching, compress images, use a CDN" — gets you to a 70 Lighthouse score. Getting to 90+ requires a fundamentally different approach.</p>
<p>Here's what actually works at scale.</p>
<h2>Critical CSS Inlining</h2>
<p>The single biggest LCP win on static Next.js sites is eliminating render-blocking CSS. With the <code>critters</code> library in the postbuild step, above-the-fold styles are inlined into the HTML and the full stylesheet is loaded asynchronously.</p>
<pre><code>// next.config.ts
experimental: {
  optimizeCss: true, // uses critters internally
}</code></pre>
<p>For custom implementations, a postbuild script using Critters directly gives more control over which routes get inlined and what threshold to use for "above the fold".</p>
<h2>Image Pipeline: WebP at Build Time</h2>
<p>Rather than relying on Next.js Image's on-demand optimization (which adds latency on first load), I pre-convert all screenshots and hero images to WebP at build time using Sharp:</p>
<pre><code>// scripts/convert-screenshots.mjs
await sharp(src)
  .resize(960, undefined, { fit: 'inside', withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(dest);</code></pre>
<p>This runs as a <code>prebuild</code> script. WebP files are gitignored (generated artifacts), PNGs stay in source control.</p>
<h2>Font Loading: The Swap vs Block Tradeoff</h2>
<p>Using <code>next/font</code> with <code>display: 'swap'</code> eliminates FOIT but can cause CLS if the fallback font has different metrics. The fix: use <code>adjustFontFallback: false</code> and manually set <code>size-adjust</code> in the font-face fallback.</p>
<p>For monospace fonts used in code blocks, <code>preload: false</code> avoids an unnecessary preload hint for a font that's only visible after scroll.</p>
<h2>Eliminating Third-Party JS</h2>
<p>Every third-party script — analytics, chat widgets, cookie banners — adds to INP. On the portfolio itself, there is zero third-party JavaScript. Analytics can wait; the user experience cannot.</p>
<p>For client sites where analytics is non-negotiable, <code>next/script</code> with <code>strategy="afterInteractive"</code> defers execution until after the page is interactive.</p>
<h2>Measuring What Matters</h2>
<p>Lighthouse scores are a proxy. The real metric is field data from CrUX. A page can score 95 in Lighthouse and still have poor field LCP if the server is slow for real users.</p>
<p>The workflow: optimize locally with Lighthouse, verify with PageSpeed Insights (which uses real CrUX data), then monitor with Core Web Vitals in Search Console.</p>`,
  },
  {
    slug: 'building-mcp-server-wordpress',
    title: 'Building an MCP Server for WordPress Site Management',
    description: 'How I built a Model Context Protocol server to manage 30+ WordPress sites via Claude — SSH over pure JS, WP-CLI auto-detection, and the gotchas of running server infrastructure in a serverless context.',
    date: '2026-03-15',
    readTime: '10 min read',
    tags: ['MCP', 'WordPress', 'Claude', 'SSH', 'WP-CLI'],
    content: `<h2>Why an MCP Server for WordPress?</h2>
<p>Managing 30+ WordPress sites means a lot of repetitive SSH sessions, WP-CLI commands, and database operations. The Model Context Protocol (MCP) lets Claude directly call tools — so instead of copy-pasting commands, Claude can run them.</p>
<p>The result: a natural language interface for WordPress operations. "Check if the staging site has the latest plugin versions" becomes a single request, not a five-minute SSH session.</p>
<h2>The Architecture</h2>
<p>MCP servers are Node.js processes that communicate with Claude via stdio. The server exposes tools (functions with JSON Schema definitions) that Claude can call with structured arguments.</p>
<pre><code>// Tool definition
{
  name: 'wp_cli',
  description: 'Run a WP-CLI command on a remote site',
  inputSchema: {
    type: 'object',
    properties: {
      site: { type: 'string', description: 'Site identifier' },
      command: { type: 'string', description: 'WP-CLI command (without wp prefix)' },
    },
    required: ['site', 'command'],
  },
}</code></pre>
<h2>SSH in a Serverless Context: Why ssh2</h2>
<p>The obvious approach — <code>child_process.spawn('ssh', [...])</code> — doesn't work in environments without a system SSH binary (CI, some serverless runtimes). The <code>ssh2</code> package is a pure-JS SSH2 implementation with no native binaries.</p>
<pre><code>import { Client } from 'ssh2';

async function sshExec(host, command) {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    let output = '';
    conn.on('ready', () => {
      conn.exec(command, (err, stream) => {
        stream.on('data', (data) => output += data);
        stream.on('close', () => { conn.end(); resolve(output); });
      });
    }).connect({ host, username: 'root', privateKey: fs.readFileSync(keyPath) });
  });
}</code></pre>
<h2>WP-CLI Auto-Detection</h2>
<p>WP-CLI isn't always at <code>/usr/local/bin/wp</code>. On Kinsta, it's at a different path. The auto-detection checks common paths and falls back to searching the PATH:</p>
<pre><code>const WP_CLI_PATHS = [
  '/usr/local/bin/wp',
  '/usr/bin/wp',
  '~/.composer/vendor/bin/wp',
];

async function findWpCli(conn) {
  for (const path of WP_CLI_PATHS) {
    const result = await sshExec(conn, \`test -f \${path} && echo found\`);
    if (result.includes('found')) return path;
  }
  return 'wp'; // hope it's in PATH
}</code></pre>
<h2>Parsing WP-CLI JSON Output</h2>
<p>WP-CLI's <code>--format=json</code> output is usually clean, but plugins sometimes write to stdout during hooks, prepending garbage before the JSON. The fix:</p>
<pre><code>function parseWpCliJson(output) {
  const jsonStart = output.indexOf('[');
  const jsonStartObj = output.indexOf('{');
  const start = Math.min(
    jsonStart === -1 ? Infinity : jsonStart,
    jsonStartObj === -1 ? Infinity : jsonStartObj
  );
  if (start === Infinity) throw new Error('No JSON in output');
  return JSON.parse(output.slice(start));
}</code></pre>
<h2>Safety Gates</h2>
<p>An MCP server with direct SSH access to production sites needs safety guardrails. Every write operation goes through a hook that checks a <code>.active-migration</code> file — if it doesn't exist, write operations are blocked.</p>
<p>Read operations (SSH exec with grep/cat/ls) are always allowed. Write operations require explicit unlock.</p>`,
  },
  {
    slug: 'zero-downtime-wordpress-migrations',
    title: 'Zero-Downtime WordPress Migrations: Lessons from 30+ Sites',
    description: 'The non-obvious failures that bite you during WordPress migrations — silent WP Importer failures, attachment ID collisions, Fluid Checkout\'s hidden options, and the go-live simulation that prevents production disasters.',
    date: '2026-03-10',
    readTime: '12 min read',
    tags: ['WordPress', 'WooCommerce', 'Migrations', 'DevOps'],
    content: `<h2>The Migration That Looks Successful (But Isn't)</h2>
<p>After 30+ WordPress/WooCommerce migrations, I've learned that the danger isn't the migration that fails loudly — it's the one that appears to succeed.</p>
<p>Here are the silent failures that have caused real production incidents, and the processes built to prevent them.</p>
<h2>WP Importer's Silent Failures</h2>
<p>WP Importer is not a migration tool. It's a content-import tool, and it has fundamental limitations that aren't documented prominently:</p>
<ul>
<li><strong>Menu hierarchy is lost.</strong> Nested menu items become flat. The <code>_menu_item_menu_item_parent</code> post meta doesn't survive the round-trip reliably.</li>
<li><code>_menu_item_classes</code> is stripped. Custom CSS classes on menu items disappear silently.</li>
<li>The <code>--allow-updates</code> flag doesn't exist in WP-CLI's importer. It's a myth that persists in blog posts.</li>
</ul>
<p>The fix: use rsync for file transfer and MySQL dump/import for the database. WP Importer is only appropriate for moving content between incompatible environments (different hosting, different DB credentials).</p>
<h2>Attachment ID Collisions</h2>
<p>When you clone a production database to staging, WooCommerce order IDs occupy the same auto-increment ranges as attachment IDs. If staging accumulates test orders, a subsequent production clone will have attachment IDs that collide with staging's order IDs.</p>
<p>The result: images that point to order objects instead of media files. ACF image fields that return incorrect post IDs.</p>
<p>The fix: always reset the staging database completely before a production clone. Never accumulate staging state across migration cycles.</p>
<h2>Blocksy Content Blocks Are NOT Theme Mods</h2>
<p>This one cost me a day. Blocksy's "Content Blocks" (headers, footers, hooks) look like theme customizer settings, but they're stored as a custom post type (<code>ct_content_block</code>) — not in <code>wp_options</code> as theme mods.</p>
<p>A theme export/import (via <code>wp customize export</code>) won't capture them. They require a separate post-type migration with ID remapping if any other content references those IDs.</p>
<h2>Fluid Checkout's 69 Hidden Options</h2>
<p>Fluid Checkout stores its configuration in 69+ <code>fc_*</code> options in <code>wp_options</code> — not in theme mods, not in a single serialized option. A database clone captures all of these correctly.</p>
<p>But if you migrate content only (via WP Importer or WP-CLI post export), the checkout configuration is missing entirely. The checkout page renders, but every Fluid Checkout feature is at its default state.</p>
<p>Always migrate the full database for WooCommerce sites.</p>
<h2>The Go-Live Simulation</h2>
<p>Before any production DNS cutover, we run a "go-live simulation" — a full dry run on a GLS staging environment that mirrors production DNS via <code>/etc/hosts</code> overrides.</p>
<p>The simulation runs 27 E2E scenarios across 6 Playwright spec files: homepage, navigation, product listing, product detail, cart, checkout, account pages, and WooCommerce email flows.</p>
<p>If any scenario fails, the go-live is blocked. No exceptions.</p>
<p>This caught a Freemius license activation bug (caused by a <code>stdClass</code> vs array mismatch in <code>fs_accounts</code>) that would have caused a fatal error on the live site within 48 hours of launch.</p>
<h2>The S2S Transfer Protocol</h2>
<p>Kinsta-to-Kinsta transfers via relay (local machine as intermediary) are 3-5x slower than direct server-to-server transfers. The solution: generate a temporary ed25519 key pair on the destination server, add the public key to the source server's <code>authorized_keys</code>, run rsync directly between servers, then remove the temporary key.</p>
<p>For a 2GB site, this reduces transfer time from 20 minutes to 4 minutes.</p>`,
  },
  {
    slug: 'ai-augmented-development-workflow',
    title: 'My AI-Augmented Development Workflow with Claude Code',
    description: 'How I built a system of 48+ custom skills, safety gates, and automated workflows that make Claude Code a genuine force multiplier — not just a code autocomplete.',
    date: '2026-03-05',
    readTime: '9 min read',
    tags: ['Claude Code', 'AI', 'Workflow', 'Productivity'],
    content: `<h2>Beyond Code Autocomplete</h2>
<p>Most developers use AI as a faster Stack Overflow — paste an error, get a fix. That's useful, but it barely scratches the surface.</p>
<p>After a year of building with Claude Code, I've developed a workflow where Claude can independently execute multi-hour development tasks, manage WordPress migrations, run E2E test suites, and make architecture decisions with appropriate guardrails.</p>
<p>Here's how it's structured.</p>
<h2>The Skills System</h2>
<p>Claude Code supports custom "skills" — markdown files with detailed instructions that Claude loads on demand. I've built 48+ skills covering everything from WordPress migration protocols to ClickUp documentation workflows.</p>
<p>Each skill is a domain-specific playbook. The <code>migration-production-to-staging</code> skill, for example, is ~600 lines covering pre-flight checks, rsync transfer, database manipulation, WooCommerce configuration, and a 27-scenario E2E verification gate.</p>
<p>Skills activate via a trigger map — keyword patterns that automatically load the relevant skill. The keyword <code>wp-content</code> in a message triggers the WordPress context manager and ClickUp workflow skills simultaneously.</p>
<h2>Safety Gates</h2>
<p>With an AI that can execute shell commands, safety isn't optional. The system uses git hooks and Claude Code's PreToolUse hooks to enforce rules:</p>
<ul>
<li><strong>Worktree isolation:</strong> All code changes happen in a git worktree, never the main checkout</li>
<li><strong>Read-only SSH by default:</strong> SSH write operations require an explicit unlock file</li>
<li><strong>Database backup gate:</strong> <code>wp db reset</code> or <code>wp db import</code> requires a verified backup first</li>
<li><strong>Credential protection:</strong> Reading <code>.env</code> files, SSH keys, or <code>wp-config.php</code> is blocked</li>
</ul>
<p>These gates run as shell scripts — they're fast, deterministic, and don't require Claude to "remember" the rules.</p>
<h2>Parallel Agent Patterns</h2>
<p>Claude Code can spawn sub-agents that run in parallel. For a task like "audit the portfolio site", one agent can explore the codebase while another fetches GitHub PR history while a third searches MCP memory for relevant past decisions.</p>
<p>The results feed back into the main agent's context, which synthesizes them into an implementation plan. This mirrors how a senior engineer would approach a large task — delegate the research, synthesize the findings, implement with full context.</p>
<h2>Session Handoffs</h2>
<p>Long tasks span multiple sessions. The system writes a <code>HANDOFF.md</code> file at 50% context usage — capturing the current task, decisions made, files modified, and blockers. The next session reads this file first.</p>
<p>Combined with Claude Code's <code>--resume</code> flag (which restores the full conversation context), complex multi-day tasks maintain continuity without losing context.</p>
<h2>The Result</h2>
<p>The system handles things I used to spend hours on: migrating a production WordPress site takes one command and ~45 minutes of autonomous execution with human approval gates at key decision points. A full portfolio audit — the one that generated this very post — took a planning session and a single implementation run.</p>
<p>The key insight: AI force-multiplies when you treat it as a system to design, not just a tool to use.</p>`,
  },
];
