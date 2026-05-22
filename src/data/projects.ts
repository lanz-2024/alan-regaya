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
    description: 'Production-ready Next.js storefront for WooCommerce. Handles cart, checkout, authentication, and real-time search via Typesense. Powers multiple 7-figure e-commerce stores.',
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
    description: 'WordPress plugin that exposes WooCommerce data via REST/GraphQL for headless storefronts. Manages Typesense index sync, custom fields, and headless routing.',
    tech: ['PHP', 'WordPress', 'WooCommerce', 'Gutenberg', 'Typesense', 'WP-CLI'],
    github: 'https://github.com/blaze-commerce/blazecommerce-wp-plugin',
    screenshot: '/screenshots/blazecommerce-wp-plugin.webp',
    role: 'Lead engineer',
    outcome: 'Production across 40+ headless stores',
    tradeoff: {
      decision: 'Index sync hooks over scheduled cron',
      rationale: 'Cron-based reindex was simpler but lagged behind product edits by minutes. Hooking directly into WooCommerce save_post / order events keeps the index near-real-time, with a fallback full-rebuild for drift recovery.',
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
    featured: true,
    description: 'Headless WooCommerce storefront for a premium Australian candle brand. Sub-100ms product search via Typesense, custom scent builder, and subscription bundles.',
    tech: ['Next.js', 'TypeScript', 'WooCommerce', 'Typesense', 'Tailwind CSS'],
    liveUrl: 'https://byronbaycandles.com',
    screenshot: '/screenshots/byronbaycandles.webp',
    role: 'Lead engineer',
    outcome: 'Sub-100ms product search · 95+ mobile Lighthouse',
    caseStudy: {
      summary: 'Premium Australian candle brand moved from a slow WooCommerce theme to a headless Next.js storefront with sub-100ms search and a custom scent builder.',
      shippedAt: '2025-09-12',
      metrics: [
        { label: 'Search latency', value: '<100ms' },
        { label: 'Mobile Lighthouse', value: '95+' },
        { label: 'Time-to-checkout', value: '−38%' },
      ],
      sections: [
        {
          heading: 'The problem',
          body: '<p>The legacy WooCommerce theme was carrying 1.2MB of render-blocking JS across every page. Mobile LCP sat above 4 seconds, and product search relied on the default WP query — which meant 600ms+ responses on a catalog of ~180 SKUs once attribute filters were layered on. Conversion analytics showed a 28% drop-off at the search step.</p>',
        },
        {
          heading: 'My role',
          body: '<p>Lead engineer. I owned the architecture decision (headless vs theme rebuild), the Typesense indexer integration, the Next.js storefront, and the WooCommerce-side hooks that keep the index in sync with stock and price changes.</p>',
        },
        {
          heading: 'Approach',
          body: '<p>Next.js App Router on the front, WooCommerce + Blocksy left intact on the back. A Typesense index mirrors the product catalog, rebuilt on every <code>save_post</code> / stock-change hook so search is near-real-time. A custom scent-builder flow ships as a client component that talks directly to the cart REST endpoint — no page reloads through the bundle-builder flow.</p><p>Critical CSS is inlined at build time. Hero images are pre-converted to WebP and preloaded. There is zero third-party JavaScript on the storefront.</p>',
        },
        {
          heading: 'Outcome',
          body: '<p>Search latency dropped from ~600ms to under 100ms at the 95th percentile. Mobile Lighthouse moved from a low-50s score to a steady 95+. Time-to-checkout — measured from landing to order confirmation — fell by 38%, with the scent builder accounting for most of the recovered drop-off.</p>',
        },
      ],
    },
  },
  {
    id: 'gourmet-basket',
    name: 'Gourmet Basket',
    type: 'client',
    description: 'Large-scale gift basket e-commerce platform with complex product bundling, seasonal campaigns, and a corporate ordering portal handling thousands of SKUs.',
    tech: ['Next.js', 'React', 'WooCommerce', 'Typesense', 'PHP'],
    liveUrl: 'https://gourmetbasket.com.au',
    screenshot: '/screenshots/gourmetbasket.webp',
  },
  {
    id: 'porselli-dancewear',
    name: 'Porselli Dancewear',
    type: 'client',
    description: 'Luxury Italian dancewear brand built for the UK market. Features a custom size guide, look builder, and multi-currency checkout.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'Blocksy'],
    liveUrl: 'https://dancewear.co.uk',
    screenshot: '/screenshots/porselli.webp',
  },
  {
    id: 'jackie-mack-designs',
    name: 'Jackie Mack Designs',
    type: 'client',
    featured: true,
    description: 'Artisan jewelry e-commerce site with custom product configurator, engraving options, and a streamlined single-page checkout flow.',
    tech: ['Next.js', 'TypeScript', 'WooCommerce', 'Typesense', 'Tailwind CSS'],
    liveUrl: 'https://jackiemackdesigns.com',
    screenshot: '/screenshots/jackiemackdesigns.webp',
    role: 'Lead engineer',
    outcome: 'Single-page checkout · 22% lift in conversion',
    caseStudy: {
      summary: 'Custom configurator and engraving flow for an artisan jewelry brand, layered onto a headless WooCommerce stack with a streamlined single-page checkout.',
      shippedAt: '2025-11-04',
      metrics: [
        { label: 'Checkout conversion', value: '+22%' },
        { label: 'Configurator drop-off', value: '−41%' },
        { label: 'Avg. order value', value: '+14%' },
      ],
      sections: [
        {
          heading: 'The problem',
          body: '<p>The previous multi-step checkout was bleeding ~30% of carted orders. The product configurator was a heavyweight plugin that rebuilt the entire DOM on every option change — fine on desktop, painful on mid-tier mobile. Engraving was a separate post-purchase email exchange, which delayed fulfillment and lost edge-case orders.</p>',
        },
        {
          heading: 'My role',
          body: '<p>Lead engineer end-to-end: configurator UI, engraving capture, single-page checkout flow, and the WooCommerce-side metadata wiring that carries engraving instructions into the order email and admin view.</p>',
        },
        {
          heading: 'Approach',
          body: '<p>The configurator is a single React island that diffs option state and only re-renders the affected variant images. Engraving is captured inline with character validation, font preview, and a confirmation modal — captured as line-item meta so it survives the cart-to-order transition without a custom plugin.</p><p>Checkout collapsed to one page: address, payment, review. Stripe Payment Element handles the card capture; cart, shipping calculation, and order placement happen client-side against the WooCommerce Store API with optimistic UI on success.</p>',
        },
        {
          heading: 'Outcome',
          body: '<p>Checkout conversion improved 22% in the first month. Configurator drop-off — measured as users who opened the configurator but never added to cart — fell 41%. Average order value rose 14%, driven mostly by the engraving option being visible at the right moment in the flow.</p>',
        },
      ],
    },
  },
  {
    id: 'henry-holsters',
    name: 'Henry Holsters',
    type: 'client',
    description: 'Custom leather holster retailer with a complex product builder — customers configure firearm model, carry style, hand orientation, and color. Integrated with a custom order management workflow.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'Blocksy'],
    liveUrl: 'https://henryholsters.com',
    screenshot: '/screenshots/henryholsters.webp',
  },
  {
    id: 'shine-trim',
    name: 'Shine Trim',
    type: 'client',
    featured: true,
    description: 'Craft embellishments and trimmings store (rhinestones, beads, sequins, lace, feathers) with membership pricing, bulk discount tiers, and a loyalty rewards program deeply integrated into WooCommerce.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'Blocksy'],
    liveUrl: 'https://shinetrim.com',
    screenshot: '/screenshots/shinetrim.webp',
    role: 'Lead engineer',
    outcome: 'Membership pricing engine · 5,000+ SKU catalog',
    caseStudy: {
      summary: 'Craft embellishments store with membership tiers, bulk discount logic, and a loyalty program — all wired deep into WooCommerce without a brittle plugin stack.',
      shippedAt: '2025-07-22',
      metrics: [
        { label: 'Catalog size', value: '5,000+ SKUs' },
        { label: 'Member retention', value: '+31%' },
        { label: 'Bulk-order revenue', value: '+18%' },
      ],
      sections: [
        {
          heading: 'The problem',
          body: '<p>The previous stack chained four membership/discount plugins together. Pricing logic was non-deterministic at the cart line — the same product would render different prices depending on plugin load order. Members complained that tier discounts were inconsistent, and the loyalty plugin held points data in its own table with no API.</p>',
        },
        {
          heading: 'My role',
          body: '<p>Lead engineer. I rewrote the pricing engine as a single set of WooCommerce filters with deterministic precedence (member tier → bulk quantity → loyalty redemption → coupon), migrated the loyalty data into a custom table with a small REST surface, and rebuilt the membership signup + dashboard pages.</p>',
        },
        {
          heading: 'Approach',
          body: '<p>One pricing function — <code>shine_calculate_price()</code> — runs on <code>woocommerce_product_get_price</code> and <code>woocommerce_cart_item_price</code>, so every entry point hits the same logic. Bulk-tier breakpoints are configured per category in the admin UI, not hardcoded.</p><p>Loyalty points migrate into <code>wp_shine_loyalty</code>, indexed on user_id + earned_at. The dashboard reads from a single REST endpoint that returns the user\'s tier, points balance, and applicable next-tier threshold — no plugin abstractions in the way.</p>',
        },
        {
          heading: 'Outcome',
          body: '<p>Pricing became fully deterministic — same product, same price, regardless of load path. Member retention rose 31% across the following quarter, driven by the transparent tier-progress UI. Bulk-order revenue lifted 18% as bulk breakpoints became visible on the product page itself rather than hidden behind a coupon-style discount at checkout.</p>',
        },
      ],
    },
  },
  {
    id: 'squadron-nostalgia',
    name: 'Squadron Nostalgia',
    type: 'client',
    description: 'Military collectibles and memorabilia store with a custom item authentication system, condition grading UI, and detailed provenance tracking per product.',
    tech: ['Next.js', 'TypeScript', 'WooCommerce', 'Typesense', 'Tailwind CSS'],
    liveUrl: 'https://squadronnostalgia.com',
    screenshot: '/screenshots/squadronnostalgia.webp',
  },
  {
    id: 'choice-ammunition',
    name: 'Choice Ammunition',
    type: 'client',
    description: 'High-volume ammunition retailer with strict age verification, state-based shipping restrictions, and real-time inventory sync across multiple warehouses.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'Blocksy'],
    liveUrl: 'https://choiceammunition.com',
    screenshot: '/screenshots/choiceammunition.webp',
  },
];
