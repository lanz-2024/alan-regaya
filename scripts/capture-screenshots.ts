import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const sites = [
  { id: 'byronbaycandles', url: 'https://byronbaycandles.com.au' },
  { id: 'gourmetbasket', url: 'https://gourmetbasket.com.au' },
  { id: 'porselli', url: 'https://porselli.co.uk' },
  { id: 'jackiemackdesigns', url: 'https://jackiemackdesigns.com' },
  { id: 'henryholsters', url: 'https://henryholsters.com' },
  { id: 'shinetrim', url: 'https://shinetrim.com' },
  { id: 'squadronnostalgia', url: 'https://squadronnostalgia.com' },
  { id: 'choiceammunition', url: 'https://choiceammunition.com' },
  { id: 'kajalnaina', url: 'https://kajalnaina.com' },
];

const outputDir = path.join(process.cwd(), 'public', 'screenshots');

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (const site of sites) {
    const outputPath = path.join(outputDir, `${site.id}.png`);
    console.log(`Capturing ${site.url}...`);

    try {
      const page = await browser.newPage();
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });

      // Check for CF challenge
      const title = await page.title();
      if (title.toLowerCase().includes('just a moment') || title.toLowerCase().includes('attention required')) {
        console.warn(`  CF challenge detected for ${site.url} — skipping`);
        await page.close();
        continue;
      }

      await page.screenshot({ path: outputPath, type: 'png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
      console.log(`  Saved ${outputPath}`);
      await page.close();
    } catch (err) {
      console.warn(`  Failed ${site.url}: ${(err as Error).message}`);
    }
  }

  await browser.close();
  console.log('\nScreenshot capture complete.');
}

main().catch(console.error);
