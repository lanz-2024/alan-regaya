/**
 * Lightweight blog post metadata for client bundles (CommandPalette, etc.)
 * Excludes the heavy `content` HTML — server pages import the full
 * `blog-posts.ts` directly, but client islands should not.
 *
 * Keep in sync with `blog-posts.ts` (titles/tags/slugs/dates only).
 */

export interface BlogPostMeta {
  slug: string;
  title: string;
  tags: string[];
  date: string;
  readTime: string;
  description: string;
}

export const blogPostsIndex: BlogPostMeta[] = [
  {
    slug: 'typesense-indexing-patterns-woocommerce',
    title: 'Typesense Indexing Patterns for Headless WooCommerce',
    description: 'How I keep a Typesense index in sync with WooCommerce when product edits, stock changes, and bulk imports all want to break it.',
    date: '2026-05-18',
    readTime: '11 min read',
    tags: ['Typesense', 'WooCommerce', 'Search', 'Headless'],
  },
  {
    slug: 'tauri-vs-electron-lessons',
    title: 'Tauri vs Electron: What I Learned Shipping a Desktop App in Both',
    description: 'I ported a developer tool from Electron to Tauri 2.0. Here is what that actually cost, what it bought, and when I would still pick Electron.',
    date: '2026-05-10',
    readTime: '10 min read',
    tags: ['Tauri', 'Electron', 'Desktop', 'Rust'],
  },
  {
    slug: 'headless-woocommerce-architecture-decisions',
    title: 'Headless WooCommerce: The Architecture Decisions That Actually Matter',
    description: 'The architecture forks every headless WooCommerce project has to call early — and the ones tutorials skip because the answer is "it depends on your team".',
    date: '2026-05-02',
    readTime: '12 min read',
    tags: ['Headless', 'WooCommerce', 'Architecture', 'Next.js'],
  },
  {
    slug: 'core-web-vitals-at-scale',
    title: 'Core Web Vitals at Scale: Lessons from a Headless WooCommerce Rebuild',
    description: 'CWV optimisations that actually moved the needle on a 50k-SKU headless WooCommerce store — and the ones that did not.',
    date: '2026-03-20',
    readTime: '9 min read',
    tags: ['Performance', 'Core Web Vitals', 'Next.js', 'WooCommerce'],
  },
  {
    slug: 'building-mcp-server-wordpress',
    title: 'Building an MCP Server for WordPress',
    description: 'A walk through designing a Model Context Protocol server that lets Claude operate a live WordPress install — what to expose, what to gate, and what surprised me.',
    date: '2026-03-15',
    readTime: '8 min read',
    tags: ['MCP', 'WordPress', 'Claude', 'AI'],
  },
  {
    slug: 'zero-downtime-wordpress-migrations',
    title: 'Zero-Downtime WordPress Migrations',
    description: 'A reproducible playbook for moving WordPress + WooCommerce sites between hosts without losing a single order, using rsync, DNS TTL prep, and a 27-scenario E2E gate.',
    date: '2026-03-10',
    readTime: '11 min read',
    tags: ['WordPress', 'Migrations', 'DevOps'],
  },
  {
    slug: 'ai-augmented-development-workflow',
    title: 'My AI-Augmented Development Workflow',
    description: 'How I use Claude Code as a daily-driver — skills, MCP servers, hooks, and the workflow conventions that make a coding agent feel like a senior pair.',
    date: '2026-03-05',
    readTime: '7 min read',
    tags: ['AI', 'Claude Code', 'Workflow'],
  },
];
