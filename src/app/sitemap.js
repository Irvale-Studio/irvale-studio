import { projects } from '@/lib/data/projects';
import { SITE_URL } from '@/lib/seo/site';
import {
  getAllPosts,
  getAllSlugs,
  getAllCategories,
  getAllTags,
  slugifyTag,
} from '@/lib/content/blog';

// Hub stubs being built in parallel by another agent. If a route doesn't exist
// yet the entry will surface as a 404 in Search Console but won't break build.
const SERVICE_PILLARS = [
  'local-seo',
  'reviews',
  'cro',
  'paid-media',
  'email-crm',
  'web',
];

const LOCAL_CITIES = ['london', 'manchester', 'edinburgh', 'bristol'];

const INDUSTRIES = [
  'plumbers',
  'electricians',
  'restaurants',
  'pubs',
  'cafes',
  'salons',
  'dentists',
  'solicitors',
  'accountants',
  'builders',
];

const STATIC_AUTHORS = ['jacob-horgan'];

export default function sitemap() {
  const now = new Date();
  const url = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

  const entries = [];

  // ---------- top-level surfaces ----------
  entries.push(
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: url('/revenue-engineering'), lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: url('/ai-visibility'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/services'), lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: url('/work'), lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: url('/zatrovo'), lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: url('/contact'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  );

  // ---------- services pillars ----------
  for (const pillar of SERVICE_PILLARS) {
    entries.push({
      url: url(`/services/${pillar}`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // ---------- local hub + cities ----------
  entries.push({
    url: url('/local'),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  });
  for (const city of LOCAL_CITIES) {
    entries.push({
      url: url(`/local/${city}`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // ---------- industry hub + verticals ----------
  entries.push({
    url: url('/for'),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  });
  for (const industry of INDUSTRIES) {
    entries.push({
      url: url(`/for/${industry}`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // ---------- work / case studies ----------
  for (const p of projects) {
    entries.push({
      url: url(`/work/${p.slug}`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // ---------- author pages ----------
  for (const slug of STATIC_AUTHORS) {
    entries.push({
      url: url(`/about/${slug}`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  // ---------- blog index + pagination + posts + categories + tags ----------
  entries.push({
    url: url('/blog'),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  });

  const allPosts = getAllPosts();
  // Map slug -> updatedAt for fast lookup
  const postMeta = new Map(allPosts.map((p) => [p.slug, p]));
  for (const slug of getAllSlugs()) {
    const post = postMeta.get(slug);
    const lastModified = post?.updatedAt ? new Date(post.updatedAt) : now;
    entries.push({
      url: url(`/blog/${slug}`),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  for (const category of getAllCategories()) {
    entries.push({
      url: url(`/blog/category/${category}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  for (const tag of getAllTags()) {
    entries.push({
      url: url(`/blog/tag/${slugifyTag(tag)}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    });
  }

  // ---------- blog pagination ----------
  const PAGE_SIZE = 20;
  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));
  for (let i = 2; i <= totalPages; i++) {
    entries.push({
      url: url(`/blog/page/${i}`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.4,
    });
  }

  return entries;
}
