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
