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
    specs: ['52.5" HDMI Smart TV (primary)', '23.5" HDMI Monitor (secondary)', 'Dual display setup'],
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
    name: 'MacBook Pro 16" M4 Max',
    category: 'Future',
    subcategory: 'Compute',
    image: '/gear/macbook-m4-max-16.jpg',
    alt: 'MacBook Pro 16" with M4 Max chip',
    specs: ['Apple M4 Max', '48GB Unified Memory', '1TB SSD', 'Upgrade from 14" M4 Pro'],
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
];
