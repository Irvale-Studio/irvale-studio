// scripts/validate-credits.mjs
//
// CI gate: every blog/guide MDX with a hero.search frontmatter must have a
// matching public/images/blog/<slug>/hero.credit.json with non-empty
// photographer / photographerUrl / sourceUrl. Exit 1 on first failure summary.
//
// Usage: node scripts/validate-credits.mjs   (or `npm run images:audit`)

import fs from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'glob';
import matter from 'gray-matter';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public', 'images', 'blog');

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function readJson(p) {
  try {
    const raw = await fs.readFile(p, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function main() {
  const patterns = ['content/blog/**/*.mdx', 'content/guides/**/*.mdx'];
  const allFiles = (await glob(patterns, { cwd: ROOT, posix: true })).filter(
    (f) => !f.endsWith('_template.mdx')
  );

  const errors = [];
  let checked = 0;
  let skipped = 0;

  for (const rel of allFiles) {
    const abs = path.join(ROOT, rel);
    const raw = await fs.readFile(abs, 'utf8');
    const { data } = matter(raw);
    const slug = data?.slug || path.basename(rel, '.mdx');

    // template files / posts with no hero.search are exempt
    const heroSearch = data?.hero?.search;
    if (!heroSearch || typeof heroSearch !== 'string' || !heroSearch.trim()) {
      skipped++;
      continue;
    }

    checked++;
    const dir = path.join(PUBLIC_DIR, slug);
    const creditPath = path.join(dir, 'hero.credit.json');

    if (!(await exists(creditPath))) {
      errors.push(`  - ${slug}: missing ${path.relative(ROOT, creditPath)}`);
      continue;
    }

    const credit = await readJson(creditPath);
    if (!credit) {
      errors.push(`  - ${slug}: hero.credit.json is not valid JSON`);
      continue;
    }
    const required = ['photographer', 'photographerUrl', 'sourceUrl'];
    for (const key of required) {
      const v = credit[key];
      if (!v || typeof v !== 'string' || !v.trim()) {
        errors.push(`  - ${slug}: hero.credit.json.${key} missing or empty`);
      }
    }
  }

  console.log(`Image-credit audit: ${checked} checked, ${skipped} skipped (no hero.search).`);

  if (errors.length > 0) {
    console.error(`\nFAIL — ${errors.length} issue(s):`);
    for (const e of errors) console.error(e);
    console.error(
      '\nFix: run `npm run images:sync` to fetch heroes, or add a manual hero.credit.json.'
    );
    process.exit(1);
  }

  console.log('OK — all hero credits present.');
  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error in validate-credits:', err);
  process.exit(1);
});
