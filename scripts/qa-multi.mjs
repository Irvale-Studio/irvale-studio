import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://localhost:3955';
const PATHS = [
  '/',
  '/blog',
  '/about/jacob-horgan',
  '/blog/google-maps-seo-uk-guide',
  '/blog/google-business-profile-uk-setup-verification',
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  reducedMotion: 'reduce',
});
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push({ path: page.url(), msg: `pageerror: ${e.message}` }));

for (const p of PATHS) {
  const before = errors.length;
  const res = await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(700);
  const newErrs = errors.slice(before);
  const has418 = newErrs.some((e) => e.msg.includes('#418'));
  console.log(`${p}\tstatus=${res?.status()}\t418=${has418}\terrors=${newErrs.length}`);
  for (const e of newErrs) console.log('   ', e.msg.slice(0, 160));
}

await browser.close();
