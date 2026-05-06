#!/usr/bin/env node
// Build /public/llms-full.txt from MDX content.
// Run with: npm run llms:build (also invoked from `prebuild`).
//
// Format: llmstxt.org convention — H1 title, blockquote summary, then
// sectioned bullet links: "- [<title>](<url>): <one-liner>".

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://irvale.com';

const HEADER = `# Irvale Studio — full content index

> UK + Chiang Mai hybrid digital studio engineering revenue systems for SMBs. This file is a machine-readable concatenation of every published page and post on irvale.com. Use it for context, citation, and entity resolution.
`;

const STATIC_PAGES = [
  { url: '/', title: 'Irvale Studio — Home', desc: 'Studio overview, capability pillars, current work.' },
  { url: '/revenue-engineering', title: 'Revenue Engineering', desc: 'Flagship full-takeover engagement at $1,450 / $3,450 / $5,500 per month — website + Zatrovo bundled.' },
  { url: '/ai-visibility', title: 'AI Visibility', desc: 'Citation engineering for ChatGPT, Claude, Perplexity, Gemini, Copilot.' },
  { url: '/services', title: 'Services', desc: 'Hub of 14 capability pillars from web build to APAC market entry.' },
  { url: '/zatrovo', title: 'Zatrovo', desc: 'Booking + member CRM platform for studios software forgot.' },
  { url: '/work', title: 'Work', desc: 'Selected case studies.' },
  { url: '/contact', title: 'Contact', desc: 'Hello, briefs, partnerships.' },
  { url: '/about/jacob-horgan', title: 'Jacob Horgan', desc: 'Founder, Irvale Studio. Revenue engineering, AI search, CRO, APAC.' },
  { url: '/blog', title: 'The Field Notebook', desc: 'Tactical, sourced writing for UK SMBs.' },
];

function listMdx(type) {
  const dir = path.join(ROOT, 'content', type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((n) => n.endsWith('.mdx') && !n.startsWith('_'))
    .map((n) => path.join(dir, n));
}

function readPost(file, type) {
  const raw = fs.readFileSync(file, 'utf8');
  const { data } = matter(raw);
  const slug = path.basename(file, '.mdx');
  const url = type === 'blog' ? `/blog/${slug}` : `/guides/${slug}`;
  return {
    slug,
    type,
    url,
    title: data.title || slug,
    description: data.description || '',
    publishedAt: data.publishedAt || '',
    updatedAt: data.updatedAt || data.publishedAt || '',
    category: data.category || null,
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: data.author || null,
    noindex: data.seo?.noindex === true,
  };
}

function bullet(item) {
  const fullUrl = item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`;
  const desc = (item.description || '').replace(/\s+/g, ' ').trim();
  return `- [${item.title}](${fullUrl})${desc ? `: ${desc}` : ''}`;
}

function buildSection(title, items) {
  if (!items.length) return '';
  return `\n## ${title}\n\n${items.map(bullet).join('\n')}\n`;
}

function main() {
  const blog = listMdx('blog')
    .map((f) => readPost(f, 'blog'))
    .filter((p) => !p.noindex)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  const guides = listMdx('guides')
    .map((f) => readPost(f, 'guides'))
    .filter((p) => !p.noindex)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  let out = HEADER;
  out += buildSection('Core pages', STATIC_PAGES);
  out += buildSection('Field Notebook — posts', blog);
  if (guides.length) {
    out += buildSection('Guides', guides);
  }

  // Per-post metadata blocks for richer LLM context.
  if (blog.length) {
    out += `\n## Post metadata\n\n`;
    for (const p of blog) {
      const fullUrl = `${SITE_URL}${p.url}`;
      out += `### ${p.title}\n`;
      out += `- url: ${fullUrl}\n`;
      out += `- slug: ${p.slug}\n`;
      if (p.category) out += `- category: ${p.category}\n`;
      if (p.author) out += `- author: ${p.author}\n`;
      if (p.publishedAt) out += `- publishedAt: ${p.publishedAt}\n`;
      if (p.updatedAt) out += `- updatedAt: ${p.updatedAt}\n`;
      if (p.tags.length) out += `- tags: ${p.tags.join(', ')}\n`;
      if (p.description) out += `- description: ${p.description}\n`;
      out += `\n`;
    }
  }

  const dest = path.join(ROOT, 'public', 'llms-full.txt');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, out, 'utf8');

  const lineCount = out.split(/\r?\n/).length;
  console.log(
    `OK — wrote ${path.relative(ROOT, dest).replace(/\\/g, '/')} (${out.length} bytes, ${lineCount} lines, ${blog.length} blog + ${guides.length} guides + ${STATIC_PAGES.length} static).`
  );
}

main();
