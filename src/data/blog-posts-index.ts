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
    title: 'Typesense indexing patterns for headless WooCommerce',
    description: 'How I keep a Typesense index in sync with WooCommerce when product edits, stock changes, and bulk imports all want to break it.',
    date: '2026-05-18',
    readTime: '11 min read',
    tags: ['Typesense', 'WooCommerce', 'Search', 'Headless'],
  },
  {
    slug: 'tauri-vs-electron-lessons',
    title: 'Tauri vs Electron: what I learned shipping a desktop app in both',
    description: 'I ported a developer tool from Electron to Tauri 2.0. Here is what that cost, what it bought, and when I would still pick Electron.',
    date: '2026-05-10',
    readTime: '10 min read',
    tags: ['Tauri', 'Electron', 'Desktop', 'Rust'],
  },
  {
    slug: 'headless-woocommerce-architecture-decisions',
    title: 'Headless WooCommerce: The architecture decisions that matter',
    description: 'The architecture forks every headless WooCommerce project has to call early, and the ones tutorials skip because the answer is "it depends on your team".',
    date: '2026-05-02',
    readTime: '12 min read',
    tags: ['Headless', 'WooCommerce', 'Architecture', 'Next.js'],
  },
  {
    slug: 'core-web-vitals-at-scale',
    title: 'Core Web Vitals at scale: lessons from 30+ production sites',
    description: 'The standard caching-and-CDN advice gets a WooCommerce storefront to a 70 Lighthouse score. This is what it takes to push past 90 on real production traffic.',
    date: '2026-03-20',
    readTime: '9 min read',
    tags: ['Performance', 'Core Web Vitals', 'Next.js', 'WooCommerce'],
  },
  {
    slug: 'building-mcp-server-wordpress',
    title: 'Building an MCP server for WordPress site management',
    description: 'Why SSH + WP-CLI beat a pure-JS implementation when I built the MCP server that lets Claude manage 30+ WordPress sites, and what broke on the way there.',
    date: '2026-03-15',
    readTime: '8 min read',
    tags: ['MCP', 'WordPress', 'Claude', 'AI'],
  },
  {
    slug: 'zero-downtime-wordpress-migrations',
    title: 'Zero-downtime WordPress migrations: lessons from 30+ sites',
    description: 'The silent failures that cause WordPress migrations to roll back at 2am, and the go-live simulation I now run before any production cutover.',
    date: '2026-03-10',
    readTime: '11 min read',
    tags: ['WordPress', 'Migrations', 'DevOps'],
  },
  {
    slug: 'ai-augmented-development-workflow',
    title: 'My AI-augmented development workflow with Claude Code',
    description: 'How 48 custom skills and a handful of safety gates turn Claude Code into something I trust on production WordPress, instead of a fancier autocomplete.',
    date: '2026-03-05',
    readTime: '7 min read',
    tags: ['AI', 'Claude Code', 'Workflow'],
  },
];
