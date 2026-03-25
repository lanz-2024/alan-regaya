import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const sites = [
  { id: 'byronbaycandles', url: 'https://byronbaycandles.com' },
  { id: 'gourmetbasket', url: 'https://gourmetbasket.com.au' },
  { id: 'porselli', url: 'https://dancewear.co.uk' },
  { id: 'jackiemackdesigns', url: 'https://jackiemackdesigns.com' },
  { id: 'henryholsters', url: 'https://henryholsters.com' },
  { id: 'shinetrim', url: 'https://shinetrim.com' },
  { id: 'squadronnostalgia', url: 'https://squadronnostalgia.com' },
  { id: 'choiceammunition', url: 'https://choiceammunition.com' },
];

const outputDir = path.join(process.cwd(), 'public', 'screenshots');

const CF_SIGNALS = ['just a moment', 'attention required', 'verify you are human', 'access denied', 'challenge-form'];

function isCfChallenge(text: string): boolean {
  const lower = text.toLowerCase();
  return CF_SIGNALS.some((s) => lower.includes(s));
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const site of sites) {
    const outputPath = path.join(outputDir, `${site.id}.png`);
    console.log(`Capturing ${site.url}...`);

    let captured = false;

    for (const waitUntil of ['load', 'domcontentloaded'] as const) {
      if (captured) break;
      try {
        const context = await browser.newContext({
          ignoreHTTPSErrors: true,
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        });
        const page = await context.newPage();
        await page.setViewportSize({ width: 1440, height: 900 });

        await page.goto(site.url, { waitUntil, timeout: 45000 });
        await page.waitForTimeout(2000);

        const title = await page.title();
        const bodySnippet = await page.evaluate(() => document.body?.innerText?.slice(0, 500) ?? '');

        if (isCfChallenge(title) || isCfChallenge(bodySnippet)) {
          console.warn(`  ⚠ CF challenge detected (${waitUntil}) — trying next strategy`);
          await context.close();
          continue;
        }

        await page.screenshot({ path: outputPath, type: 'png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
        console.log(`  ✓ Saved (strategy: ${waitUntil})`);
        captured = true;
        await context.close();
      } catch (err) {
        console.warn(`  ✗ ${waitUntil} failed: ${(err as Error).message.split('\n')[0]}`);
      }
    }

    if (!captured) {
      console.warn(`  ✗ All strategies failed for ${site.url} — skipping`);
    }
  }

  await browser.close();
  console.log('\nDone.');
}

main().catch(console.error);
