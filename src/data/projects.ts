export type ProjectType = 'open-source' | 'client' | 'in-development';

export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  description: string;
  tech: string[];
  github?: string;
  liveUrl?: string;
  screenshot?: string;
  stars?: number;
  forks?: number;
  featured?: boolean;
  /** My specific role on this project — e.g. "Lead engineer", "Solo developer". */
  role?: string;
  /** Measurable outcome — e.g. "91 stars · 40+ live storefronts", "54 releases". */
  outcome?: string;
  /** Key trade-off / decision log — the "we chose X over Y because Z" reasoning. */
  tradeoff?: { decision: string; rationale: string };
  /** Long-form case study. Presence makes the project linkable at /projects/[id]. */
  caseStudy?: {
    /** Short summary line shown under the title on the detail page. */
    summary: string;
    /** Date the work shipped (ISO). */
    shippedAt: string;
    /** Quantified outcomes shown as stat tiles at the top of the page. */
    metrics?: { label: string; value: string }[];
    /** Sections of the write-up, rendered in order. */
    sections: { heading: string; body: string }[];
  };
}

export const projects: Project[] = [
  {
    id: 'headless-woocommerce',
    name: 'Headless WooCommerce',
    type: 'open-source',
    featured: true,
    description: 'Production-ready Next.js storefront for WooCommerce. Handles cart, checkout, authentication, and real-time search via Typesense. Powers 40+ live BlazeCommerce client storefronts.',
    tech: ['Next.js', 'React', 'TypeScript', 'WooCommerce REST API', 'GraphQL', 'Typesense'],
    github: 'https://github.com/blaze-commerce/headless-woocommerce',
    stars: 91,
    forks: 37,
    screenshot: '/screenshots/headless-woocommerce.webp',
    role: 'Lead engineer',
    outcome: '91 stars · 37 forks · 40+ live storefronts',
    tradeoff: {
      decision: 'Typesense over Algolia for product search',
      rationale: 'Algolia has the better DX out of the box, but Typesense is self-hostable, has predictable cost at our SKU counts, and gives us full schema control for WooCommerce-specific facets. The DX gap closed with our own indexer wrapper.',
    },
  },
  {
    id: 'blazecommerce-wp-plugin',
    name: 'BlazeCommerce WP Plugin',
    type: 'open-source',
    featured: true,
    description: 'WordPress plugin that exposes WooCommerce data via REST/GraphQL for headless storefronts. Manages Typesense index sync, custom fields, and headless routing.',
    tech: ['PHP', 'WordPress', 'WooCommerce', 'Gutenberg', 'Typesense', 'WP-CLI'],
    github: 'https://github.com/blaze-commerce/blazecommerce-wp-plugin',
    screenshot: '/screenshots/blazecommerce-wp-plugin.webp',
    role: 'Lead engineer',
    outcome: 'Production across 40+ headless stores',
    tradeoff: {
      decision: 'Index sync hooks over scheduled cron',
      rationale: 'Cron-based reindex was simpler but lagged behind product edits by minutes. Hooking directly into WooCommerce save_post / order events lands updates in the index within ~2s of the WP save, with a fallback full-rebuild for drift recovery.',
    },
  },
  {
    id: 'blaze-blocksy',
    name: 'Blaze Blocksy',
    type: 'open-source',
    description: 'Blocksy child theme built for BlazeCommerce client storefronts. Provides a standardized WordPress theme base with custom hooks, design tokens, and WooCommerce integration patterns used across client sites.',
    tech: ['PHP', 'WordPress', 'WooCommerce', 'Blocksy', 'CSS'],
    github: 'https://github.com/blaze-commerce/blaze-blocksy',
    stars: 1,
    forks: 1,
    screenshot: '/screenshots/blaze-blocksy.webp',
    role: 'Lead engineer',
    outcome: 'Theme base for 40+ client builds',
    tradeoff: {
      decision: 'Child theme over a fully custom theme',
      rationale: 'A bespoke theme would have given total control, but a Blocksy child inherits years of accessibility and WooCommerce compatibility for free. We trade some structural flexibility for a much faster onboarding path on client builds.',
    },
  },
  {
    id: 'smart-time-tracker',
    name: 'Smart Time Tracker',
    type: 'in-development',
    featured: true,
    description: 'Cross-platform desktop app for automated time tracking with ClickUp integration. Detects active windows, categorizes work sessions, and syncs tracked time to ClickUp tasks without manual input.',
    tech: ['Rust', 'Tauri 2.0', 'React 19', 'TypeScript', 'ClickUp OAuth', 'SQLite'],
    screenshot: '/screenshots/smart-time-tracker.webp',
    role: 'Solo developer',
    outcome: '54 releases shipped',
    tradeoff: {
      decision: 'Tauri 2.0 + Rust over Electron',
      rationale: 'Electron would have meant a faster MVP using the React skills I already had. Tauri ships ~10x smaller binaries, uses less memory, and the Rust core forces stricter handling of the OS-level window/process APIs the tracker depends on. Worth the steeper learning curve.',
    },
  },
  {
    id: 'byron-bay-candles',
    name: 'Byron Bay Candles',
    type: 'client',
    description: 'Premium Australian candle brand running on the BlazeCommerce headless WooCommerce stack I help maintain. My contributions are framework-level (Typesense sync, Gutenberg blocks, build/regression fixes) plus client-site support tickets — theme/typography fixes and catalog menu fixes.',
    tech: ['Next.js', 'TypeScript', 'WooCommerce', 'Typesense'],
    liveUrl: 'https://byronbaycandles.com',
    screenshot: '/screenshots/byronbaycandles.webp',
    role: 'Platform engineer (BlazeCommerce framework) + client support',
  },
  {
    id: 'gourmet-basket',
    name: 'Gourmet Basket',
    type: 'client',
    description: 'Large-scale gift basket e-commerce platform running on the BlazeCommerce headless stack. Complex product bundling, seasonal campaigns, and thousands of SKUs.',
    tech: ['Next.js', 'React', 'WooCommerce', 'Typesense', 'PHP'],
    liveUrl: 'https://gourmetbasket.com.au',
    screenshot: '/screenshots/gourmetbasket.webp',
  },
  {
    id: 'porselli-dancewear',
    name: 'Porselli Dancewear',
    type: 'client',
    description: 'Luxury Italian dancewear brand built for the UK market on WordPress + Blocksy. Multi-currency checkout, custom size guide.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'Blocksy'],
    liveUrl: 'https://dancewear.co.uk',
    screenshot: '/screenshots/porselli.webp',
  },
  {
    id: 'jackie-mack-designs',
    name: 'Jackie Mack Designs',
    type: 'client',
    description: 'Artisan jewelry e-commerce site on the BlazeCommerce headless stack. My documented contributions: storybook configuration for the product card variant ("1 left" badge, wishlist button), build-error fixes on the JMD branch of the BlazeCommerce WP plugin, and post-deploy regression triage on the Typesense-backed homepage.',
    tech: ['Next.js', 'TypeScript', 'WooCommerce', 'Typesense'],
    liveUrl: 'https://jackiemackdesigns.com',
    screenshot: '/screenshots/jackiemackdesigns.webp',
    role: 'Platform engineer (BlazeCommerce framework) + client support',
  },
  {
    id: 'henry-holsters',
    name: 'Henry Holsters',
    type: 'client',
    description: 'Custom leather holster retailer on WordPress + Blocksy. Customers configure firearm model, carry style, hand orientation, and color.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'Blocksy'],
    liveUrl: 'https://henryholsters.com',
    screenshot: '/screenshots/henryholsters.webp',
  },
  {
    id: 'shine-trim',
    name: 'Shine Trim',
    type: 'client',
    description: 'Craft embellishments and trimmings store on WordPress + Blocksy. Built and maintained by the wider BlazeCommerce team; included here as part of the BlazeCommerce client portfolio I support at the framework level.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'Blocksy'],
    liveUrl: 'https://shinetrim.com',
    screenshot: '/screenshots/shinetrim.webp',
  },
  {
    id: 'squadron-nostalgia',
    name: 'Squadron Nostalgia',
    type: 'client',
    description: 'Military collectibles and memorabilia store on the BlazeCommerce headless stack. Detailed product authentication and provenance tracking per item.',
    tech: ['Next.js', 'TypeScript', 'WooCommerce', 'Typesense'],
    liveUrl: 'https://squadronnostalgia.com',
    screenshot: '/screenshots/squadronnostalgia.webp',
  },
  {
    id: 'choice-ammunition',
    name: 'Choice Ammunition',
    type: 'client',
    description: 'High-volume ammunition retailer on WordPress + Blocksy. Age verification, state-based shipping restrictions, multi-warehouse inventory sync.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'Blocksy'],
    liveUrl: 'https://choiceammunition.com',
    screenshot: '/screenshots/choiceammunition.webp',
  },
];
