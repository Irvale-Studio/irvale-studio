import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:4017';
const OUT = path.resolve('scripts/qa-shots');
await mkdir(OUT, { recursive: true });

const targets = [
  { url: '/services/local-seo', file: 'services-local-seo-desk.png' },
  { url: '/local/london', file: 'local-london-desk.png' },
  { url: '/for/plumbers', file: 'for-plumbers-desk.png' },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce',
});

const errors = [];

for (const t of targets) {
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`[${t.url}] pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`[${t.url}] console: ${m.text()}`);
  });

  const url = `${BASE}${t.url}`;
  console.log(`-> ${url}`);
  const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  console.log(`status: ${res?.status()}`);

  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = 600;
      const timer = setInterval(() => {
        window.scrollTo(0, y);
        y += step;
        if (y > document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          setTimeout(resolve, 500);
        }
      }, 80);
    });
  });

  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(OUT, t.file),
    fullPage: true,
  });
  await page.close();
}

await ctx.close();
await browser.close();

console.log('errors:', JSON.stringify(errors, null, 2));
console.log('done');
