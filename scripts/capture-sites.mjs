import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.resolve('public/images/projects');
const SCRAPE_OUT = path.resolve('scripts/scraped-zatrovo.txt');

const targets = [
  { slug: 'crystal-aura', url: 'https://crystal-aura.zatrovo.com', label: 'Crystal Aura' },
  { slug: 'reya-lashes', url: 'https://reya-lashes.zatrovo.com', label: 'Reya Lashes' },
  { slug: 'dynamic-golf-academy', url: 'https://dynamic-golf-academy.zatrovo.com', label: 'Dynamic Golf Academy' },
  { slug: 'commu', url: 'https://commu.zatrovo.com', label: 'Commu' },
  { slug: 'realspace-marketing-v2', url: 'https://www.realspacemarketing.com', label: 'Realspace Marketing' },
  { slug: 'zatrovo', url: 'https://zatrovo.com', label: 'Zatrovo' },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

const fs = await import('node:fs/promises');
const scraped = [];

for (const t of targets) {
  const page = await ctx.newPage();
  console.log(`-> ${t.url}`);
  try {
    await page.goto(t.url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(2500);

    // hero shot
    await page.screenshot({
      path: path.join(OUT, `${t.slug}-hero.png`),
      fullPage: false,
    });

    // full page shot
    await page.screenshot({
      path: path.join(OUT, `${t.slug}-full.png`),
      fullPage: true,
    });

    // For zatrovo.com, scrape text content
    if (t.slug === 'zatrovo') {
      const text = await page.evaluate(() => document.body.innerText);
      scraped.push(`===== ${t.url} =====\n${text}\n`);

      // Scroll + take more screenshots at sections
      const sections = await page.locator('section').all();
      for (let i = 0; i < Math.min(sections.length, 8); i++) {
        try {
          await sections[i].scrollIntoViewIfNeeded();
          await page.waitForTimeout(700);
          await sections[i].screenshot({
            path: path.join(OUT, `zatrovo-section-${i + 1}.png`),
          });
        } catch (e) {
          console.log(`  section ${i} fail: ${e.message}`);
        }
      }
    }

    // For dashboard sites, also try the /dashboard path
    if (t.url.includes('zatrovo.com') && t.slug !== 'zatrovo') {
      try {
        await page.goto(`${t.url}/dashboard`, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(2000);
        await page.screenshot({
          path: path.join(OUT, `${t.slug}-dashboard.png`),
          fullPage: false,
        });
      } catch (e) {
        console.log(`  dashboard fail: ${e.message}`);
      }
    }
  } catch (err) {
    console.log(`  ERR: ${err.message}`);
  } finally {
    await page.close();
  }
}

await fs.writeFile(SCRAPE_OUT, scraped.join('\n\n'));
await browser.close();
console.log('done');
