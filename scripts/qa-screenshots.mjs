import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = 'http://localhost:3939';
const OUT = path.resolve('scripts/qa-shots');

const pages = [
  { slug: 'home', path: '/' },
  { slug: 'work', path: '/work' },
  { slug: 'zatrovo', path: '/zatrovo' },
  { slug: 'ai-visibility', path: '/ai-visibility' },
  { slug: 'contact', path: '/contact' },
  { slug: 'work-zatrovo', path: '/work/zatrovo' },
  { slug: 'work-reya-lashes', path: '/work/reya-lashes' },
  { slug: 'work-dynamic-golf', path: '/work/dynamic-golf-academy' },
  { slug: 'work-commu', path: '/work/commu' },
  { slug: 'work-boxx', path: '/work/boxx-thailand' },
  { slug: 'work-realspace', path: '/work/realspace-marketing' },
  { slug: 'work-cmgt', path: '/work/chiang-mai-go-tours' },
];

const viewports = [
  { name: 'desk', width: 1440, height: 900 },
  { name: 'mob', width: 390, height: 844 },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const consoleErrors = {};

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });

  for (const p of pages) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
    });

    try {
      console.log(`[${vp.name}] ${p.path}`);
      const res = await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle', timeout: 30000 });
      if (!res || !res.ok()) console.log(`  status: ${res?.status()}`);

      // Scroll through page to trigger any lazy/scroll-triggered content
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let y = 0;
          const step = 400;
          const t = setInterval(() => {
            window.scrollTo(0, y);
            y += step;
            if (y > document.body.scrollHeight) {
              clearInterval(t);
              window.scrollTo(0, 0);
              setTimeout(resolve, 300);
            }
          }, 50);
        });
      });

      await page.waitForTimeout(1000);
      await page.screenshot({
        path: path.join(OUT, `${p.slug}-${vp.name}.png`),
        fullPage: true,
      });
    } catch (err) {
      console.log(`  ERR: ${err.message}`);
      errors.push(`navigation: ${err.message}`);
    }

    if (errors.length) consoleErrors[`${p.slug}-${vp.name}`] = errors;
    await page.close();
  }

  await ctx.close();
}

console.log('\n--- Errors ---');
console.log(JSON.stringify(consoleErrors, null, 2));

await browser.close();
console.log('done');
