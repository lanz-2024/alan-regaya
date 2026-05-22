export interface NowEntry {
  text: string;
  href?: string;
}

export const nowUpdated = '2026-05-23';

export const nowBuilding: NowEntry[] = [
  { text: 'Smart Time Tracker — cross-platform Tauri 2.0 + Rust desktop app with ClickUp sync', href: '/projects#smart-time-tracker' },
  { text: 'Headless WooCommerce — ongoing maintenance, perf, and DX work on the open-source toolkit', href: 'https://github.com/blaze-commerce/headless-woocommerce' },
  { text: 'BlazeCommerce client storefronts — Next.js + Typesense headless migrations' },
];

export const nowLearning: NowEntry[] = [
  { text: 'Rust ownership and lifetimes — deeper than "I can read it"' },
  { text: 'Tauri 2.0 internals — IPC, plugin system, packaging on Windows + macOS' },
  { text: 'SQLite query planning — for embedded data layers in desktop apps' },
];

export const nowReading: NowEntry[] = [
  { text: 'Designing Data-Intensive Applications — Martin Kleppmann (re-read, slowly)' },
  { text: 'The Rust Programming Language ("the book") — chapter by chapter alongside Tauri work' },
  { text: 'Following: fasterthanli.me, Patrick Walton, Tanner Linsley for React/state thinking' },
];

export const nowOff: NowEntry[] = [
  { text: 'Cooking — currently obsessed with sourdough and the math behind hydration ratios' },
  { text: 'Family time — based in the Philippines, async work makes evenings possible' },
];
