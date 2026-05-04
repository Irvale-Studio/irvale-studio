import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = 'http://localhost:3940';
const OUT = path.resolve('scripts/qa-shots');
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const errors = [];

for (const vp of [
  { name: 'desk', width: 1440, height: 900 },
  { name: 'mob', width: 390, height: 844 },
]) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`[${vp.name}] pageerror: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`[${vp.name}] console: ${m.text()}`); });

  await page.goto(`${BASE}/services`, { waitUntil: 'networkidle', timeout: 45000 });
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const t = setInterval(() => {
        window.scrollTo(0, y);
        y += 600;
        if (y > document.body.scrollHeight) {
          clearInterval(t);
          window.scrollTo(0, 0);
          setTimeout(res, 400);
        }
      }, 40);
    });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT, `services-v2-${vp.name}.png`), fullPage: true });
  await ctx.close();
}

console.log('errors:', JSON.stringify(errors, null, 2));
await browser.close();
console.log('done');
