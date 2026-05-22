export interface NowEntry {
  text: string;
  href?: string;
}

export const nowUpdated = '2026-05-23';

export const nowBuilding: NowEntry[] = [
  { text: 'Smart Time Tracker — Tauri 2.0 + Rust desktop app with Claude CLI session logging and ClickUp sync', href: '/projects#smart-time-tracker' },
  { text: 'Headless WooCommerce — ongoing maintenance, perf, and DX work on the open-source toolkit', href: 'https://github.com/blaze-commerce/headless-woocommerce' },
  { text: 'BlazeCommerce client storefronts — Next.js + Typesense headless migrations' },
];

export const nowLearning: NowEntry[] = [
  { text: 'Rust ownership and lifetimes — deeper than "I can read it"' },
  { text: 'Tauri 2.0 internals — IPC, plugin system, packaging on Windows + macOS' },
  { text: 'Workflow automation patterns — turning repeat tasks into Claude CLI + scripted pipelines' },
];

export const nowReading: NowEntry[] = [
  { text: 'r/webdev, r/nextjs, r/rust, r/woocommerce on Reddit — for real-world threads, not curated content' },
  { text: 'LinkedIn posts from senior engineers and founders in the e-commerce / dev tooling space' },
  { text: 'Release notes and GitHub discussions for the tools I ship with (Next.js, Tauri, WooCommerce)' },
];

export const nowOff: NowEntry[] = [
  { text: 'Mountain biking — hitting trails and exploring terrain on two wheels' },
  { text: 'Bodyweight & core training — pushups, pull-ups, planks, squats, calf raises (no gym)' },
  { text: 'Nintendo Switch OLED when the build queue is clear — Pokémon Mystery Dungeon DX, Pokémon FireRed, Pokémon UNITE, Naruto Ultimate Ninja Storm, Naruto Ultimate Ninja Storm 4: Road to Boruto' },
  { text: 'Choir service — Tenor 2 in the Catholic Church choir' },
  { text: 'DeFi and staking — exploring protocols and passive-income setups on the side' },
];
