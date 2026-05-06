// Server-only MDX content loader for blog/guides/resources.
// Reads from /content/<type>/*.mdx, parses frontmatter via gray-matter,
// computes wordCount + readingTime, and exposes filter/related helpers.
//
// NEVER import this from a 'use client' module — it touches the filesystem.

import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

// Module-level caches keyed per content type. These survive across requests
// within the same Node process (dev: HMR-resilient; prod: per-instance).
const _cache = {
  blog: null,
  guides: null,
  resources: null,
  authors: null,
};

// ---------- low-level helpers ----------

function listMdxFiles(type) {
  const dir = path.join(CONTENT_ROOT, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.mdx') && !name.startsWith('_'))
    .map((name) => path.join(dir, name));
}

function stripCodeAndFrontmatter(mdx) {
  // gray-matter already removed frontmatter; strip fenced + inline code
  return mdx
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ');
}

function computeWordCount(body) {
  const tokens = stripCodeAndFrontmatter(body)
    .replace(/<[^>]+>/g, ' ') // crude JSX/HTML strip for counting
    .split(/\s+/)
    .filter(Boolean);
  return tokens.length;
}

function readMdxFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, '.mdx');
  const wordCount = computeWordCount(content);
  const readingTime = `${Math.max(1, Math.ceil(wordCount / 220))} min read`;
  return { slug, frontmatter: data, content, wordCount, readingTime };
}

function loadAll(type) {
  if (_cache[type]) return _cache[type];
  const files = listMdxFiles(type);
  const items = files.map(readMdxFile).map((entry) => ({
    slug: entry.slug,
    ...entry.frontmatter,
    content: entry.content,
    wordCount: entry.wordCount,
    readingTime: entry.readingTime,
  }));
  // Sort by publishedAt desc (fallback to slug)
  items.sort((a, b) => {
    const ad = a.publishedAt || '';
    const bd = b.publishedAt || '';
    if (ad === bd) return a.slug.localeCompare(b.slug);
    return ad < bd ? 1 : -1;
  });
  _cache[type] = items;
  return items;
}

function publicListing(items) {
  return items.filter((p) => !(p.seo && p.seo.noindex === true));
}

/**
 * Slugify a tag string for URL use.
 * Lowercases, replaces non-alphanumerics with `-`, collapses + trims hyphens.
 */
export const slugifyTag = (t) =>
  String(t || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// ---------- public API: blog ----------

/**
 * @param {{category?: string, tag?: string, vertical?: string, author?: string, limit?: number, offset?: number}} opts
 */
export function getAllPosts(opts = {}) {
  const { category, tag, vertical, author, limit, offset = 0 } = opts;
  let posts = publicListing(loadAll('blog')).map(({ content, ...rest }) => rest);

  if (category) posts = posts.filter((p) => p.category === category);
  if (vertical) posts = posts.filter((p) => p.vertical === vertical);
  if (tag) posts = posts.filter((p) => Array.isArray(p.tags) && p.tags.includes(tag));
  if (author) posts = posts.filter((p) => p.author === author);

  if (offset) posts = posts.slice(offset);
  if (typeof limit === 'number') posts = posts.slice(0, limit);
  return posts;
}

export function getPost(slug) {
  const items = loadAll('blog');
  const found = items.find((p) => p.slug === slug);
  if (!found) return null;
  return { ...found };
}

export function getAllSlugs() {
  return loadAll('blog').map((p) => p.slug);
}

export function getAllCategories() {
  const set = new Set();
  for (const p of publicListing(loadAll('blog'))) {
    if (p.category) set.add(p.category);
  }
  return Array.from(set).sort();
}

export function getAllTags() {
  const set = new Set();
  for (const p of publicListing(loadAll('blog'))) {
    if (Array.isArray(p.tags)) p.tags.forEach((t) => set.add(t));
  }
  return Array.from(set).sort();
}

/**
 * Auto-related: same vertical first, then same category, then tag overlap.
 * Always dedupes self and any post already declared in `post.related`.
 */
export function getRelatedPosts(post, n = 3) {
  if (!post) return [];
  const all = publicListing(loadAll('blog')).filter((p) => p.slug !== post.slug);

  const declared = Array.isArray(post.related) ? post.related : [];
  const declaredHits = declared
    .map((slug) => all.find((p) => p.slug === slug))
    .filter(Boolean);

  if (declaredHits.length >= n) return declaredHits.slice(0, n).map(stripContent);

  const seen = new Set(declaredHits.map((p) => p.slug));
  const score = (p) => {
    let s = 0;
    if (post.vertical && p.vertical === post.vertical) s += 4;
    if (post.category && p.category === post.category) s += 3;
    const tagsA = new Set(post.tags || []);
    const overlap = (p.tags || []).filter((t) => tagsA.has(t)).length;
    s += overlap * 2;
    return s;
  };

  const ranked = all
    .filter((p) => !seen.has(p.slug))
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s)
    .map((x) => x.p);

  const merged = [...declaredHits, ...ranked].slice(0, n).map(stripContent);
  return merged;
}

function stripContent(p) {
  // never leak raw MDX through related cards
  const { content, ...rest } = p;
  return rest;
}

// ---------- author ----------

export function getAuthor(slug) {
  if (!slug) return null;
  const file = path.join(CONTENT_ROOT, 'authors', `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  if (!_cache.authors) _cache.authors = new Map();
  if (_cache.authors.has(slug)) return _cache.authors.get(slug);
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  _cache.authors.set(slug, json);
  return json;
}
