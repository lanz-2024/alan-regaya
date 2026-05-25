export type GearCategory = 'Current' | 'Future';
export type GearSubcategory = 'Compute' | 'Peripherals' | 'Display' | 'Audio' | 'Network';

export interface GearItem {
  id: string;
  name: string;
  category: GearCategory;
  subcategory: GearSubcategory;
  image?: string;
  alt?: string;
  specs: string[];
  link?: string;
}

export const gear: GearItem[] = [
  {
    id: 'macbook-m4-14',
    name: 'MacBook Pro 14" M4 Pro',
    category: 'Current',
    subcategory: 'Compute',
    image: '/gear/macbook-m4-14.png',
    alt: 'macOS About This Mac — MacBook Pro 14", M4 Pro, 24GB RAM',
    specs: ['Apple M4 Pro', '24GB Unified Memory', '500GB SSD', 'macOS Sequoia'],
  },
  {
    id: 'bow-k700-keyboard',
    name: 'BOW K700 Ergonomic Wireless Keyboard',
    category: 'Current',
    subcategory: 'Peripherals',
    image: '/gear/bow-k700-keyboard.webp',
    alt: 'BOW K700 ergonomic wireless keyboard',
    specs: ['2.4G Wireless', 'Ergonomic Split Layout', 'Numeric Pad', 'Multi-device'],
  },
  {
    id: 'external-displays',
    name: 'External Displays',
    category: 'Current',
    subcategory: 'Display',
    image: '/gear/external-displays.webp',
    alt: 'Dual display setup — 52.5" Devant Smart TV (primary) and 23.5" Samsung Monitor (secondary)',
    specs: [
      '52.5" Devant Smart TV (primary, HDMI)',
      '23.5" Samsung Monitor (secondary, HDMI)',
      'Dual display setup',
    ],
  },
  {
    id: 'realme-buds-t200',
    name: 'Realme Buds T200 Lite',
    category: 'Current',
    subcategory: 'Audio',
    image: '/gear/realme-buds-t200-lite.jpg',
    alt: 'Realme Buds T200 Lite wireless earbuds',
    specs: ['Active Noise Cancellation', 'Wireless Earbuds', 'Used for meetings'],
  },
  {
    id: 'xiaomi-ax3000',
    name: 'Xiaomi Mesh System AX3000',
    category: 'Current',
    subcategory: 'Network',
    image: '/gear/xiaomi-ax3000-mesh.webp',
    alt: 'Xiaomi Mesh System AX3000 router',
    specs: [
      'PLDT Home Fiber · Primary ISP',
      'DL 83.94 Mbps · UL 92.37 Mbps · 1 ms ping',
      'WiFi 6 Mesh',
      'AX3000',
    ],
    link: 'https://www.speedtest.net/result/19162634516',
  },
  {
    id: 'smart-5g-max',
    name: 'Smart 5G Max Home WiFi',
    category: 'Current',
    subcategory: 'Network',
    image: '/gear/smart-5g-max.jpg',
    alt: 'Smart 5G Max Home WiFi router',
    specs: ['5G Home WiFi · Backup ISP', 'Failover connectivity'],
    link: 'https://www.speedtest.net/my-result/a/11639336392',
  },
  {
    id: 'ugreen-vertical-mouse',
    name: 'UGREEN Vertical Ergonomic Mouse',
    category: 'Current',
    subcategory: 'Peripherals',
    image: '/gear/ugreen-vertical-mouse.jpg',
    alt: 'UGREEN vertical ergonomic wireless mouse',
    specs: ['4000 DPI', 'Wireless', 'Vertical Ergonomic Design', 'USB-C Charging'],
  },
  {
    id: 'viture-luma-ultra',
    name: 'VITURE Luma Ultra XR/AR Glasses',
    category: 'Future',
    subcategory: 'Display',
    image: '/gear/viture-luma-ultra.webp',
    alt: 'VITURE Luma Ultra XR/AR Glasses',
    specs: ['XR/AR Display', 'Replaces physical monitors', 'Micro-OLED panels', '120Hz Refresh'],
  },
  {
    id: 'macbook-m4-max-16',
    name: 'MacBook Pro 14" M5 Pro',
    category: 'Future',
    subcategory: 'Compute',
    image: '/gear/macbook-m4-max-16.jpg',
    alt: 'MacBook Pro 14" with M5 Pro chip',
    specs: [
      'Apple M5 Pro',
      '48GB Unified Memory',
      '2TB SSD',
      '18-core CPU',
      '20-core GPU',
      'Source: UpTrade (refurbished)',
    ],
  },
  {
    id: 'dygma-defy',
    name: 'Dygma Defy',
    category: 'Future',
    subcategory: 'Peripherals',
    image: '/gear/dygma-defy.jpg',
    alt: 'Dygma Defy split mechanical keyboard',
    specs: ['Split Ergonomic Layout', 'Mechanical Switches', 'Customizable Thumb Cluster', 'Wireless'],
  },
  {
    id: 'macbook-m5-max-14',
    name: 'MacBook Pro 14" M5 Max',
    category: 'Future',
    subcategory: 'Compute',
    image: '/gear/macbook-m5-max-14.webp',
    alt: 'MacBook Pro 14" with M5 Max chip',
    specs: [
      'Apple M5 Max',
      '128GB Unified Memory',
      '18-core CPU',
      '40-core GPU',
      '2TB SSD',
      'Source: UpTrade (refurbished)',
    ],
  },
  {
    id: 'mac-studio-m5-ultra',
    name: 'Mac Studio M5 Ultra',
    category: 'Future',
    subcategory: 'Compute',
    image: '/gear/mac-studio-m5-ultra.webp',
    alt: 'Apple Mac Studio with M5 Ultra chip',
    specs: [
      'Apple M5 Ultra',
      '36-core CPU',
      '80-core GPU',
      '4TB SSD',
      'Home workstation',
    ],
  },
  {
    id: 'local-llms',
    name: 'Local LLMs',
    category: 'Future',
    subcategory: 'Compute',
    image: '/gear/local-llms.webp',
    alt: 'Local LLM inference on Apple Silicon (Ollama / LM Studio)',
    specs: [
      'Pairs with M5 Max + M5 Ultra above',
      'Replaces paid AI (Claude, etc.) for daily dev',
      'No context window caps — full repo in working memory',
      'No rate limits (5-hour / weekly quotas)',
      'Zero per-token cost after hardware',
      'Code & secrets stay on-device (privacy)',
      'Offline-capable — no network round-trips',
    ],
  },
];
