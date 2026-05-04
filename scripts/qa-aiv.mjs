import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:3939';
const OUT = path.resolve('scripts/qa-shots');
await mkdir(OUT, { recursive: true });

const slug = 'ai-visibility';
const url = `${BASE}/${slug}`;

const browser = await chromium.launch();

async function snap(label, viewport) {
  const ctx = await browser.newContext({
    viewport,
    reducedMotion: 'reduce',
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`console: ${m.text()}`);
  });

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const t = setInterval(() => {
        window.scrollTo(0, y);
        y += 400;
        if (y > document.body.scrollHeight) {
          clearInterval(t);
          window.scrollTo(0, 0);
          setTimeout(res, 400);
        }
      }, 50);
    });
  });
  await page.waitForTimeout(700);

  await page.screenshot({
    path: path.join(OUT, `${slug}-${label}.png`),
    fullPage: true,
  });

  const dims = await page.evaluate(() => ({
    bodyW: document.body.scrollWidth,
    bodyH: document.body.scrollHeight,
    docW: document.documentElement.scrollWidth,
    docH: document.documentElement.scrollHeight,
    inner: { w: window.innerWidth, h: window.innerHeight },
  }));

  const overflowX = dims.docW > dims.inner.w + 1;

  await page.close();
  await ctx.close();
  return { errors, dims, overflowX };
}

const results = {};
results.desk = await snap('qa-desk', { width: 1440, height: 900 });
results.tab = await snap('qa-tab', { width: 768, height: 1024 });
results.mob = await snap('qa-mob', { width: 390, height: 844 });

await browser.close();
console.log(JSON.stringify(results, null, 2));
