#!/usr/bin/env node
// Validate frontmatter against docs/frontmatter-contract.md §5.
// Run with: npm run validate:frontmatter
// Exits non-zero on any violation. Prints file:line + message.

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const TYPES = ['blog', 'guides', 'resources'];

const ALLOWED_CATEGORIES = ['local-seo', 'reviews', 'cro', 'paid-media', 'ai-search', 'revenue'];
const ALLOWED_VERTICALS = ['trades', 'hospitality', 'beauty', 'healthcare', 'professional', 'retail'];
const ALLOWED_RESOURCE_CATEGORIES = ['financial', 'pricing', 'operations', 'growth', 'retention'];
const PRODUCT_PREFIXES = ['/services/', '/ai-visibility', '/revenue-engineering', '/zatrovo'];

const errors = [];

function err(file, line, msg) {
  errors.push({ file, line, msg });
}

function listFiles(type) {
  const dir = path.join(ROOT, 'content', type);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
    .map((f) => path.join(dir, f));
}

function lineOfKey(raw, key) {
  // approximate — finds the first top-level YAML key match
  const lines = raw.split(/\r?\n/);
  const re = new RegExp(`^${key}\\s*:`);
  for (let i = 0; i < lines.length; i++) {
    if (re.test(lines[i])) return i + 1;
  }
  return 1;
}

function isISODate(s) {
  if (typeof s !== 'string') return false;
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
}

function isKebab(s) {
  return typeof s === 'string' && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(s);
}

function isRelativePath(s) {
  return typeof s === 'string' && s.startsWith('/');
}

function wordCount(s) {
  return String(s).trim().split(/\s+/).filter(Boolean).length;
}

function authorExists(slug) {
  const file = path.join(ROOT, 'content', 'authors', `${slug}.json`);
  return fs.existsSync(file);
}

function knownContentSlug(type, slug) {
  const candidates = [
    path.join(ROOT, 'content', type, `${slug}.mdx`),
    // Allow cross-type for relatedPosts (blog or guides)
    path.join(ROOT, 'content', 'blog', `${slug}.mdx`),
    path.join(ROOT, 'content', 'guides', `${slug}.mdx`),
  ];
  return candidates.some((p) => fs.existsSync(p));
}

function calculatorComponentExists(name) {
  const dir = path.join(ROOT, 'src', 'components', 'calculators');
  if (!fs.existsSync(dir)) return false;
  // Match either file or directory named <Name>.{js,jsx,ts,tsx} — case sensitive
  const candidates = [
    `${name}.js`, `${name}.jsx`, `${name}.tsx`, `${name}.ts`,
    `${name}/index.js`, `${name}/index.jsx`,
  ];
  return candidates.some((c) => fs.existsSync(path.join(dir, c)));
}

function validateFaqEquality(file, type, raw, fm, body) {
  // Only enforce on blog/guides — resources don't ship inline <FAQ>.
  if (type === 'resources') return;
  if (!Array.isArray(fm.faq) || fm.faq.length === 0) return;

  // Look for an inline `<FAQ ... />` block. If none, skip — frontmatter-only
  // FAQ is permitted (page renders it natively from frontmatter).
  if (!/<FAQ\b/.test(body)) return;

  // Relaxed text match: every frontmatter q + a string must appear verbatim
  // (whitespace-collapsed) inside the body. That guards against inline JSX
  // FAQs drifting out of sync with the schema-emitting frontmatter.
  const haystack = body.replace(/\s+/g, ' ');

  fm.faq.forEach((entry, i) => {
    if (!entry || typeof entry.q !== 'string' || typeof entry.a !== 'string') return;
    const q = entry.q.replace(/\s+/g, ' ').trim();
    const a = entry.a.replace(/\s+/g, ' ').trim();
    if (!haystack.includes(q)) {
      err(file, lineOfKey(raw, 'faq'), `inline <FAQ> is missing question from frontmatter faq[${i}]: "${q.slice(0, 80)}…"`);
    }
    if (!haystack.includes(a)) {
      err(file, lineOfKey(raw, 'faq'), `inline <FAQ> is missing answer from frontmatter faq[${i}] (q: "${q.slice(0, 60)}…").`);
    }
  });
}

function validatePost(file, type, raw, fm) {
  const filename = path.basename(file, '.mdx');

  // title
  if (typeof fm.title !== 'string' || !fm.title.trim()) {
    err(file, lineOfKey(raw, 'title'), 'title is required (string).');
  } else {
    const len = fm.title.length;
    if (len < 30 || len > 80) err(file, lineOfKey(raw, 'title'), `title must be 30–80 chars (got ${len}).`);
    if (/[.!?,;:]$/.test(fm.title.trim())) err(file, lineOfKey(raw, 'title'), 'title must not end with trailing punctuation.');
  }

  // slug
  if (!isKebab(fm.slug)) err(file, lineOfKey(raw, 'slug'), 'slug must be kebab-case.');
  if (fm.slug !== filename) err(file, lineOfKey(raw, 'slug'), `slug ("${fm.slug}") must match filename ("${filename}").`);

  // description
  if (typeof fm.description !== 'string') {
    err(file, lineOfKey(raw, 'description'), 'description is required.');
  } else {
    const len = fm.description.length;
    if (len < 140 || len > 160) err(file, lineOfKey(raw, 'description'), `description must be 140–160 chars (got ${len}).`);
    if (!/[.?]$/.test(fm.description.trim())) err(file, lineOfKey(raw, 'description'), 'description must end with "." or "?".');
  }

  // dates
  if (!isISODate(fm.publishedAt)) err(file, lineOfKey(raw, 'publishedAt'), 'publishedAt must be ISO date YYYY-MM-DD.');
  if (!isISODate(fm.updatedAt)) err(file, lineOfKey(raw, 'updatedAt'), 'updatedAt must be ISO date YYYY-MM-DD.');
  if (isISODate(fm.publishedAt) && isISODate(fm.updatedAt)) {
    if (Date.parse(fm.updatedAt) < Date.parse(fm.publishedAt)) {
      err(file, lineOfKey(raw, 'updatedAt'), 'updatedAt must be >= publishedAt.');
    }
  }

  // author
  if (typeof fm.author !== 'string' || !fm.author) {
    err(file, lineOfKey(raw, 'author'), 'author is required.');
  } else if (!authorExists(fm.author)) {
    err(file, lineOfKey(raw, 'author'), `author "${fm.author}" does not resolve to content/authors/${fm.author}.json.`);
  }

  if (type !== 'resources') {
    // category
    if (!ALLOWED_CATEGORIES.includes(fm.category)) {
      err(file, lineOfKey(raw, 'category'), `category must be one of ${ALLOWED_CATEGORIES.join(', ')}.`);
    }
    // vertical
    if (fm.vertical !== null && fm.vertical !== undefined && !ALLOWED_VERTICALS.includes(fm.vertical)) {
      err(file, lineOfKey(raw, 'vertical'), `vertical must be null or one of ${ALLOWED_VERTICALS.join(', ')}.`);
    }
  } else {
    if (!ALLOWED_RESOURCE_CATEGORIES.includes(fm.category)) {
      err(file, lineOfKey(raw, 'category'), `resource category must be one of ${ALLOWED_RESOURCE_CATEGORIES.join(', ')}.`);
    }
    if (typeof fm.calculator !== 'string' || !/^[A-Z][A-Za-z0-9]+$/.test(fm.calculator)) {
      err(file, lineOfKey(raw, 'calculator'), 'calculator must be a PascalCase component name.');
    } else if (!calculatorComponentExists(fm.calculator)) {
      err(
        file,
        lineOfKey(raw, 'calculator'),
        `calculator "${fm.calculator}" must exist under src/components/calculators/.`,
      );
    }
  }

  // tags
  if (!Array.isArray(fm.tags) || fm.tags.length < 2 || fm.tags.length > 8) {
    err(file, lineOfKey(raw, 'tags'), `tags must be an array of 2–8 entries (got ${Array.isArray(fm.tags) ? fm.tags.length : 'none'}).`);
  }

  // hero
  if (!fm.hero || typeof fm.hero !== 'object') {
    err(file, lineOfKey(raw, 'hero'), 'hero block is required.');
  } else {
    if (typeof fm.hero.search !== 'string' || !fm.hero.search.trim()) {
      err(file, lineOfKey(raw, 'hero'), 'hero.search must be a non-empty string.');
    }
    if (typeof fm.hero.alt !== 'string') {
      err(file, lineOfKey(raw, 'hero'), 'hero.alt is required.');
    } else {
      const al = fm.hero.alt.length;
      if (al < 30 || al > 125) err(file, lineOfKey(raw, 'hero'), `hero.alt must be 30–125 chars (got ${al}).`);
      if (!/\.$/.test(fm.hero.alt.trim())) err(file, lineOfKey(raw, 'hero'), 'hero.alt must end with ".".');
    }
  }

  // faq
  if (!Array.isArray(fm.faq) || fm.faq.length < 4 || fm.faq.length > 6) {
    err(file, lineOfKey(raw, 'faq'), `faq must have 4–6 entries (got ${Array.isArray(fm.faq) ? fm.faq.length : 'none'}).`);
  } else {
    fm.faq.forEach((entry, i) => {
      if (!entry || typeof entry.q !== 'string' || typeof entry.a !== 'string') {
        err(file, lineOfKey(raw, 'faq'), `faq[${i}] must have string q and a.`);
        return;
      }
      const wc = wordCount(entry.a);
      if (wc < 60 || wc > 180) {
        err(file, lineOfKey(raw, 'faq'), `faq[${i}].a must be 60–180 words (got ${wc}).`);
      }
    });
  }

  // seo.canonical
  if (fm.seo && fm.seo.canonical !== null && fm.seo.canonical !== undefined) {
    if (!isRelativePath(fm.seo.canonical)) {
      err(file, lineOfKey(raw, 'seo'), 'seo.canonical must be null or a relative path starting with "/".');
    }
  }

  // internalLinks (blog/guides only — resources use relatedPosts)
  if (type !== 'resources') {
    if (!Array.isArray(fm.internalLinks) || fm.internalLinks.length < 2) {
      err(file, lineOfKey(raw, 'internalLinks'), 'internalLinks must have at least 2 entries.');
    } else {
      const hasProduct = fm.internalLinks.some((l) => PRODUCT_PREFIXES.some((p) => l.startsWith(p)));
      if (!hasProduct) {
        err(
          file,
          lineOfKey(raw, 'internalLinks'),
          'internalLinks must include at least one /services/* or /ai-visibility or /revenue-engineering or /zatrovo URL.',
        );
      }
    }
  } else {
    // resources: relatedPosts must have ≥1 entry that resolves
    if (!Array.isArray(fm.relatedPosts) || fm.relatedPosts.length < 1) {
      err(file, lineOfKey(raw, 'relatedPosts'), 'relatedPosts must have at least 1 entry.');
    } else {
      fm.relatedPosts.forEach((s, i) => {
        if (!knownContentSlug('blog', s)) {
          err(file, lineOfKey(raw, 'relatedPosts'), `relatedPosts[${i}]="${s}" does not resolve to a blog/guide slug.`);
        }
      });
    }
  }
}

let scanned = 0;
for (const type of TYPES) {
  const files = listFiles(type);
  for (const file of files) {
    scanned += 1;
    let raw, parsed;
    try {
      raw = fs.readFileSync(file, 'utf8');
      parsed = matter(raw);
    } catch (e) {
      err(file, 1, `failed to parse: ${e.message}`);
      continue;
    }
    if (!parsed.data || Object.keys(parsed.data).length === 0) {
      err(file, 1, 'no frontmatter found.');
      continue;
    }
    validatePost(file, type, raw, parsed.data);
    validateFaqEquality(file, type, raw, parsed.data, parsed.content || '');
  }
}

if (errors.length === 0) {
  console.log(`OK — validated ${scanned} file${scanned === 1 ? '' : 's'}, no frontmatter violations.`);
  process.exit(0);
}

console.error(`Frontmatter validation failed (${errors.length} issue${errors.length === 1 ? '' : 's'} across ${scanned} file${scanned === 1 ? '' : 's'}):\n`);
for (const e of errors) {
  const rel = path.relative(ROOT, e.file).replace(/\\/g, '/');
  console.error(`  ${rel}:${e.line}  ${e.msg}`);
}
process.exit(1);
