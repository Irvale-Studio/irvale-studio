import { SITE_URL } from '@/lib/seo/site';

// Two-tier AI bot policy per docs/seo-ai-search-strategy.md §11.
// Irvale wants maximum corpus presence — explicitly allow citation-driving
// retrieval bots and the major training crawlers, while blocking known
// low-value or abusive scrapers. Common Next.js paths (/api, /_next/) are
// disallowed across the board.

const ALLOWED_AI_BOTS = [
  // Retrieval / citation
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot-Extended',
  'Google-Extended',
  // Training corpora — Irvale opts in
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'cohere-ai',
  'CCBot',
];

const BLOCKED_BOTS = [
  'Bytespider',
  'meta-externalagent',
  'Amazonbot',
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      ...ALLOWED_AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/', '/_next/'],
      })),
      ...BLOCKED_BOTS.map((userAgent) => ({
        userAgent,
        disallow: '/',
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
