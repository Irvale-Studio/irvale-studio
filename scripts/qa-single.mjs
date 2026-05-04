import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = 'http://localhost:3939';
const OUT = path.resolve('scripts/qa-shots');
await mkdir(OUT, { recursive: true });

const targets = [
  { slug: 'ai-visibility', path: '/ai-visibility' },
  { slug: 'zatrovo', path: '/zatrovo' },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'reduce',
});

for (const p of targets) {
  const page = await ctx.newPage();
  await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const t = setInterval(() => {
        window.scrollTo(0, y);
        y += 400;
        if (y > document.body.scrollHeight) {
          clearInterval(t);
          window.scrollTo(0, 0);
          setTimeout(res, 300);
        }
      }, 50);
    });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT, `${p.slug}-fixed-desk.png`), fullPage: true });
  await page.close();
}

await browser.close();
console.log('done');
