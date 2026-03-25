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
}

export const projects: Project[] = [
  {
    id: 'headless-woocommerce',
    name: 'Headless WooCommerce',
    type: 'open-source',
    featured: true,
    description: 'Production-ready Next.js storefront for WooCommerce. Handles cart, checkout, authentication, and real-time search via Typesense. Powers multiple 7-figure e-commerce stores.',
    tech: ['Next.js', 'React', 'TypeScript', 'WooCommerce REST API', 'GraphQL', 'Typesense'],
    github: 'https://github.com/blaze-commerce/headless-woocommerce',
    stars: 91,
    forks: 37,
    screenshot: '/screenshots/headless-woocommerce.webp',
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
  },
  {
    id: 'blaze-blocksy',
    name: 'Blaze Blocksy',
    type: 'open-source',
    description: 'Blocksy child theme built for BlazeCommerce headless storefronts. Provides a standardized WordPress theme base with custom hooks, design tokens, and WooCommerce integration patterns used across client sites.',
    tech: ['PHP', 'WordPress', 'WooCommerce', 'Blocksy', 'CSS'],
    github: 'https://github.com/blaze-commerce/blaze-blocksy',
    stars: 1,
    forks: 1,
    screenshot: '/screenshots/blaze-blocksy.webp',
  },
  {
    id: 'smart-time-tracker',
    name: 'Smart Time Tracker',
    type: 'in-development',
    featured: true,
    description: 'Cross-platform desktop app for automated time tracking with ClickUp integration. Detects active windows, categorizes work sessions, and syncs tracked time to ClickUp tasks without manual input.',
    tech: ['Rust', 'Tauri 2.0', 'React 19', 'TypeScript', 'ClickUp OAuth', 'SQLite'],
    screenshot: '/screenshots/smart-time-tracker.webp',
  },
  {
    id: 'byron-bay-candles',
    name: 'Byron Bay Candles',
    type: 'client',
    description: 'Headless WooCommerce storefront for a premium Australian candle brand. Sub-100ms product search via Typesense, custom scent builder, and subscription bundles.',
    tech: ['Next.js', 'TypeScript', 'WooCommerce', 'Typesense', 'Tailwind CSS'],
    liveUrl: 'https://byronbaycandles.com',
    screenshot: '/screenshots/byronbaycandles.webp',
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
    description: 'Luxury Italian dancewear brand with a headless storefront built for the UK market. Features a custom size guide, look builder, and multi-currency checkout.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'Blocksy'],
    liveUrl: 'https://dancewear.co.uk',
    screenshot: '/screenshots/porselli.webp',
  },
  {
    id: 'jackie-mack-designs',
    name: 'Jackie Mack Designs',
    type: 'client',
    description: 'Artisan jewelry e-commerce site with custom product configurator, engraving options, and a streamlined single-page checkout flow.',
    tech: ['Next.js', 'TypeScript', 'WooCommerce', 'Typesense', 'Tailwind CSS'],
    liveUrl: 'https://jackiemackdesigns.com',
    screenshot: '/screenshots/jackiemackdesigns.webp',
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
    description: 'Automotive detailing products store with membership pricing, bulk discount tiers, and a loyalty rewards program deeply integrated into WooCommerce.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'Blocksy'],
    liveUrl: 'https://shinetrim.com',
    screenshot: '/screenshots/shinetrim.webp',
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
  {
    id: 'solutions-screen-printers',
    name: 'Solutions for Screen Printers',
    type: 'in-development',
    description: 'B2B wholesale platform for screen printing supplies with trade account applications, tiered pricing, and a quote builder for bulk custom orders.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'Blocksy'],
  },
];
