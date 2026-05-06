import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:3942';
const OUT = path.resolve('scripts/qa-shots');
const TARGET_PATH = '/blog/google-maps-seo-uk-guide';

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce',
});

const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
});

const url = `${BASE}${TARGET_PATH}`;
console.log(`-> ${url}`);
const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
console.log(`status: ${res?.status()}`);

// Trigger any lazy/scrolltrigger content
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0;
    const step = 600;
    const t = setInterval(() => {
      window.scrollTo(0, y);
      y += step;
      if (y > document.body.scrollHeight) {
        clearInterval(t);
        window.scrollTo(0, 0);
        setTimeout(resolve, 500);
      }
    }, 80);
  });
});

await page.waitForTimeout(800);
await page.screenshot({
  path: path.join(OUT, 'blog-slug-desk.png'),
  fullPage: true,
});

console.log('errors:', JSON.stringify(errors, null, 2));
await browser.close();
console.log('done');
