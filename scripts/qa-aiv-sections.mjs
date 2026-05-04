import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:3939';
const OUT = path.resolve('scripts/qa-shots');
await mkdir(OUT, { recursive: true });
const url = `${BASE}/ai-visibility`;

const browser = await chromium.launch();

async function captureSections(label, viewport) {
  const ctx = await browser.newContext({
    viewport,
    reducedMotion: 'reduce',
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
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
          setTimeout(res, 600);
        }
      }, 50);
    });
  });
  await page.waitForTimeout(800);

  const sections = await page.$$('main > section');
  for (let i = 0; i < sections.length; i++) {
    await sections[i].scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await sections[i].screenshot({
      path: path.join(OUT, `aiv-${label}-sec-${String(i).padStart(2, '0')}.png`),
    });
  }
  await page.close();
  await ctx.close();
}

await captureSections('desk', { width: 1440, height: 900 });
await captureSections('mob', { width: 390, height: 844 });

await browser.close();
console.log('done');
