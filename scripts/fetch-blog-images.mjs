// scripts/fetch-blog-images.mjs
//
// Build-time image fetcher for Irvale Studio blog/guides.
// Reads frontmatter `hero.search` from MDX files, downloads a 1600px landscape
// hero from Unsplash (primary) → Pexels → Pixabay, writes hero.jpg + hero.blur.txt
// + hero.credit.json into /public/images/blog/<slug>/.
//
// Spec: docs/seo-research/image-pipeline.md §6
// Frontmatter contract: docs/frontmatter-contract.md §6
//
// Usage: node scripts/fetch-blog-images.mjs   (or `npm run images:sync`)
// Idempotent: re-running skips slugs whose hero.jpg already exists.

import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'glob';
import matter from 'gray-matter';
import { getPlaiceholder } from 'plaiceholder';

const APP = 'irvale';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://irvale.com';
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;
const PEXELS_KEY = process.env.PEXELS_API_KEY;
const PIXABAY_KEY = process.env.PIXABAY_API_KEY;

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public', 'images', 'blog');
const LOG_PATH = path.join(ROOT, 'scripts', '.images.log');
const CONCURRENCY = 4;

// ----- helpers -----------------------------------------------------------

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function appendLog(line) {
  const stamped = `[${new Date().toISOString()}] ${line}\n`;
  try {
    await fs.appendFile(LOG_PATH, stamped, 'utf8');
  } catch {
    // log file is best-effort
  }
}

function utm(url) {
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}utm_source=${APP}&utm_medium=referral`;
}

// Run an array of async tasks with a fixed concurrency cap.
async function runWithConcurrency(items, worker, limit = CONCURRENCY) {
  const results = [];
  let i = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await worker(items[idx], idx).then(
        (value) => ({ status: 'fulfilled', value }),
        (reason) => ({ status: 'rejected', reason })
      );
    }
  });
  await Promise.all(runners);
  return results;
}

// ----- providers ---------------------------------------------------------

// Returns a unified pick object or null.
// {
//   url: string (1600w jpg URL to download),
//   source: 'Unsplash' | 'Pexels' | 'Pixabay',
//   sourceId: string,
//   sourceUrl: string (page URL with utm),
//   photographer: string,
//   photographerUrl: string (with utm where applicable),
//   altSeed: string | null,
//   trackDownload?: () => Promise<void>  (Unsplash only)
// }

async function searchUnsplash(query) {
  if (!UNSPLASH_KEY) {
    return { skipped: true, reason: 'no Unsplash key' };
  }
  const url =
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}` +
    `&orientation=landscape&content_filter=high&per_page=10`;
  let res;
  try {
    res = await fetch(url, { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } });
  } catch (err) {
    return { error: `unsplash fetch failed: ${err.message}` };
  }
  if (res.status === 403) return { error: 'unsplash 403 (rate limit / forbidden)' };
  if (!res.ok) return { error: `unsplash http ${res.status}` };
  const json = await res.json();
  if (!json.results || json.results.length === 0) return { empty: true };
  const pick = json.results[0];
  return {
    pick: {
      url: `${pick.urls.raw}&w=1600&fm=jpg&q=80&fit=max`,
      source: 'Unsplash',
      sourceId: pick.id,
      sourceUrl: utm(pick.links.html),
      photographer: pick.user?.name || 'Unknown',
      photographerUrl: utm(pick.user?.links?.html || 'https://unsplash.com'),
      altSeed: pick.alt_description || null,
      trackDownload: async () => {
        try {
          await fetch(`${pick.links.download_location}?client_id=${UNSPLASH_KEY}`);
        } catch {
          // fire-and-forget
        }
      },
    },
  };
}

async function searchPexels(query) {
  if (!PEXELS_KEY) return { skipped: true, reason: 'no Pexels key' };
  const url =
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}` +
    `&orientation=landscape&per_page=10`;
  let res;
  try {
    res = await fetch(url, { headers: { Authorization: PEXELS_KEY } });
  } catch (err) {
    return { error: `pexels fetch failed: ${err.message}` };
  }
  if (!res.ok) return { error: `pexels http ${res.status}` };
  const json = await res.json();
  if (!json.photos || json.photos.length === 0) return { empty: true };
  const pick = json.photos[0];
  // Pexels exposes per-size URLs; `landscape` is roughly 1200×627. Use src.large2x or
  // a sized variant. The src.original is the full-res file. We'll download
  // src.landscape or large2x for a reasonable size.
  const downloadUrl = pick.src?.large2x || pick.src?.landscape || pick.src?.original;
  return {
    pick: {
      url: downloadUrl,
      source: 'Pexels',
      sourceId: String(pick.id),
      sourceUrl: pick.url,
      photographer: pick.photographer || 'Unknown',
      photographerUrl: pick.photographer_url || 'https://www.pexels.com',
      altSeed: pick.alt || null,
    },
  };
}

async function searchPixabay(query) {
  if (!PIXABAY_KEY) return { skipped: true, reason: 'no Pixabay key' };
  const url =
    `https://pixabay.com/api/?key=${encodeURIComponent(PIXABAY_KEY)}` +
    `&q=${encodeURIComponent(query)}` +
    `&orientation=horizontal&safesearch=true&per_page=10`;
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    return { error: `pixabay fetch failed: ${err.message}` };
  }
  if (!res.ok) return { error: `pixabay http ${res.status}` };
  const json = await res.json();
  if (!json.hits || json.hits.length === 0) return { empty: true };
  const pick = json.hits[0];
  // largeImageURL is up to 1280px; fullHDURL (1920) is in some plans; webformatURL is 640.
  const downloadUrl = pick.fullHDURL || pick.largeImageURL || pick.webformatURL;
  return {
    pick: {
      url: downloadUrl,
      source: 'Pixabay',
      sourceId: String(pick.id),
      sourceUrl: pick.pageURL,
      photographer: pick.user || 'Unknown',
      photographerUrl: `https://pixabay.com/users/${encodeURIComponent(pick.user || '')}-${pick.user_id}/`,
      altSeed: pick.tags || null,
    },
  };
}

// ----- core per-slug -----------------------------------------------------

async function processSlug({ file, data, slug }) {
  const dir = path.join(PUBLIC_DIR, slug);
  const heroPath = path.join(dir, 'hero.jpg');

  if (await exists(heroPath)) {
    await appendLog(`${slug}\tskip-cached`);
    return { slug, status: 'skipped' };
  }

  const query = data?.hero?.search;
  if (!query || typeof query !== 'string' || !query.trim()) {
    await appendLog(`${slug}\tskip-no-search`);
    return { slug, status: 'skipped-no-query' };
  }

  // try providers in order
  const providers = [
    { name: 'unsplash', run: () => searchUnsplash(query) },
    { name: 'pexels', run: () => searchPexels(query) },
    { name: 'pixabay', run: () => searchPixabay(query) },
  ];

  let chosen = null;
  const trail = [];
  for (const p of providers) {
    const out = await p.run();
    if (out.pick) {
      chosen = out.pick;
      trail.push(`${p.name}:hit`);
      break;
    }
    if (out.skipped) trail.push(`${p.name}:skip(${out.reason})`);
    else if (out.empty) trail.push(`${p.name}:empty`);
    else if (out.error) trail.push(`${p.name}:err(${out.error})`);
  }

  if (!chosen) {
    const msg = `no provider returned a hit (${trail.join(', ')})`;
    console.warn(`  ! ${slug}: ${msg}`);
    await appendLog(`${slug}\tfailed\t${trail.join(',')}`);
    return { slug, status: 'failed', reason: msg };
  }

  // download the master JPG
  let buf;
  try {
    const r = await fetch(chosen.url);
    if (!r.ok) throw new Error(`http ${r.status}`);
    buf = Buffer.from(await r.arrayBuffer());
  } catch (err) {
    const msg = `download failed: ${err.message}`;
    console.warn(`  ! ${slug}: ${msg}`);
    await appendLog(`${slug}\tfailed-download\t${chosen.source}\t${err.message}`);
    return { slug, status: 'failed', reason: msg };
  }

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(heroPath, buf);

  // fire Unsplash beacon (REQUIRED by their terms)
  if (chosen.trackDownload) {
    await chosen.trackDownload();
  }

  // credit json
  const credit = {
    photographer: chosen.photographer,
    photographerUrl: chosen.photographerUrl,
    sourceUrl: chosen.sourceUrl,
    source: chosen.source,
    sourceId: chosen.sourceId,
    altSeed: chosen.altSeed,
  };
  await fs.writeFile(path.join(dir, 'hero.credit.json'), JSON.stringify(credit, null, 2));

  // blur placeholder
  try {
    const { base64 } = await getPlaiceholder(buf);
    await fs.writeFile(path.join(dir, 'hero.blur.txt'), base64);
  } catch (err) {
    console.warn(`  ! ${slug}: blur generation failed: ${err.message}`);
  }

  console.log(`  ✓ ${slug}  [${chosen.source}]  ${chosen.photographer}`);
  await appendLog(`${slug}\tfetched\t${chosen.source}\t${chosen.sourceId}`);
  return { slug, status: 'fetched', source: chosen.source };
}

// ----- entrypoint --------------------------------------------------------

async function main() {
  // env summary
  const haveAny = Boolean(UNSPLASH_KEY || PEXELS_KEY || PIXABAY_KEY);
  console.log(`Irvale image sync — site: ${SITE_URL}`);
  console.log(
    `Providers configured: ` +
      [
        UNSPLASH_KEY ? 'Unsplash' : null,
        PEXELS_KEY ? 'Pexels' : null,
        PIXABAY_KEY ? 'Pixabay' : null,
      ]
        .filter(Boolean)
        .join(', ') || '(none)'
  );
  if (!UNSPLASH_KEY) console.log('  - no Unsplash key, skipping primary; trying Pexels...');
  if (!PEXELS_KEY) console.log('  - no Pexels key, skipping fallback');
  if (!PIXABAY_KEY) console.log('  - no Pixabay key, skipping final fallback');
  if (!haveAny) {
    console.warn(
      '  ! WARNING: no provider keys set. Add UNSPLASH_ACCESS_KEY / PEXELS_API_KEY / ' +
        'PIXABAY_API_KEY to .env.local. Existing cached heroes will still be reused.'
    );
  }

  // discover
  const patterns = ['content/blog/**/*.mdx', 'content/guides/**/*.mdx'];
  const allFiles = (await glob(patterns, { cwd: ROOT, posix: true })).filter(
    (f) => !f.endsWith('_template.mdx')
  );

  const slugs = [];
  for (const rel of allFiles) {
    const abs = path.join(ROOT, rel);
    const raw = await fs.readFile(abs, 'utf8');
    const { data } = matter(raw);
    const slug = data?.slug || path.basename(rel, '.mdx');
    slugs.push({ file: abs, data, slug });
  }

  console.log(`Found ${slugs.length} content file(s).`);

  const results = await runWithConcurrency(slugs, processSlug, CONCURRENCY);

  // tally
  let fetched = 0,
    skipped = 0,
    failed = 0;
  for (const r of results) {
    if (r.status === 'fulfilled') {
      const v = r.value;
      if (v.status === 'fetched') fetched++;
      else if (v.status === 'skipped' || v.status === 'skipped-no-query') skipped++;
      else if (v.status === 'failed') failed++;
    } else {
      failed++;
      console.warn(`  ! task rejected: ${r.reason?.message || r.reason}`);
    }
  }

  console.log('');
  console.log('Summary:');
  console.log(`  total:   ${slugs.length}`);
  console.log(`  fetched: ${fetched}`);
  console.log(`  skipped: ${skipped} (cached or no hero.search)`);
  console.log(`  failed:  ${failed}`);

  // never crash the build. failed slugs are warnings only.
  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error in fetch-blog-images:', err);
  // graceful exit; don't break the build pipeline
  process.exit(0);
});
