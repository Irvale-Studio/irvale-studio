# Irvale Studio — Technical SEO & AI-Citation Reference (2026)

> Source: research agent 7. A working reference for a Next.js 16 + React 19 + Tailwind v4 site optimised for both classical search and AI-engine citation (ChatGPT, Claude, Perplexity, Gemini/AI Overviews, Copilot). UK English.

## 1. Schema.org — Types Irvale should ship

Use JSON-LD (Google's recommended format for 2026) injected via Next.js 16's `generateMetadata` or per-page `<script type="application/ld+json">`. Schema is now treated by AI engines as a *verification layer*: late-2026 Gemini-powered AI Mode cross-references schema claims against live sources and discounts mismatches, so accuracy beats volume.

**Site-wide (root layout):**
- `Organization` — primary entity with `name`, `url`, `logo`, `sameAs[]` (LinkedIn, X, Crunchbase, Companies House, GitHub), `contactPoint`, `foundingDate`, `founder` linked to a `Person`.
- `WebSite` — with `potentialAction: SearchAction` and `inLanguage`.
- `LocalBusiness` (or industry-specific subtype like `ProfessionalService`) — for the UK + Chiang Mai hybrid presence, emit two `LocalBusiness` nodes, both `branchOf` the parent `Organization`. Include `priceRange`, `geo`, `areaServed`, `openingHoursSpecification`.

**Page-type schemas:**
- `WebPage` / `CollectionPage` — wrap each route. Use `CollectionPage` for `/services`, `/blog`, `/guides`, `/resources`, `/local`, `/for`.
- `BreadcrumbList` — every non-root page; `position` integers from 1; the `item` must be a real URL.
- `Service` + `OfferCatalog` — for `/services` and per-pillar pages. Nest `Offer` items inside `hasOfferCatalog`. Canonical structure for productised service businesses; AI engines parse it as a "menu".
- `Article` / `BlogPosting` — `/blog/*`, `/guides/*`. Mandatory: `headline`, `datePublished`, `dateModified`, `author` (full `Person` node), `publisher`, `mainEntityOfPage`, `image`. AI platforms cite content ~25.7% fresher than classical search picks, so `dateModified` is load-bearing — bump it only on substantive changes.
- `FAQPage` — Google deprecated the rich snippet in 2023 but Gemini/ChatGPT/Perplexity/Claude still parse it during answer extraction. Keep using on `/guides/*`, `/compare/*`, `/services/*` FAQ blocks.
- `HowTo` — process pages.
- `ItemList` — `/compare/*` and any ranked list page.
- `VideoObject` — for any embedded explainers; required for YouTube to surface in AI Overviews multi-modal results.
- `Person` (+ `ProfilePage` wrapper) — author bio pages.
- `Speakable` — see §1a.
- `Review` / `AggregateRating` — only for *products you sell*, never on `LocalBusiness` or `Organization` for self-published reviews (Google calls this self-serving and disqualifies it). Third-party platform ratings only via licensed integrations.

### 1a. Speakable — the citation-precision lever

`Speakable` (still BETA in Google docs but read by Perplexity, ChatGPT browsing, AI Overviews) flags the most citation-worthy passage. Implement via `cssSelector` (preferred for our Tailwind setup) — wrap answer-first paragraphs in a class like `.speakable` and emit:

```json
{
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".speakable"]
  }
}
```

## 2. AI-bot crawler policy (`robots.txt`)

Two-tier model: allow *retrieval* bots (they bring citations), block *training* bots if you want to protect IP. Reputable bots (OpenAI, Anthropic, Perplexity, Google, Apple, Meta) honour robots.txt; Bytespider has documented violations and should be IP-blocked at the edge as well.

Reference `robots.txt` for irvale.com:

```
# Classical search
User-agent: Googlebot
Allow: /
User-agent: Bingbot
Allow: /

# AI retrieval / search surfaces — ALLOW (these drive citations)
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: Google-Extended
Allow: /

# AI training crawlers — Irvale stance: ALLOW to maximise corpus presence
# (being inside training data improves brand recall in zero-click answers)
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: cohere-ai
Allow: /

# Hard blocks
User-agent: Bytespider
Disallow: /
User-agent: meta-externalagent
Disallow: /
User-agent: Amazonbot
Disallow: /

User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://irvale.com/sitemap.xml
```

Notes: `ChatGPT-User` and `Claude-User` are user-initiated fetchers (someone pasted a URL) — blocking these visibly degrades user experience. `Google-Extended` is the opt-out for Gemini training without affecting Search ranking. `Applebot-Extended` is the equivalent for Apple Intelligence.

## 3. `llms.txt` and `llms-full.txt`

Adoption sits ~10% across 300k surveyed domains in 2026; no major LLM vendor has publicly committed to read it automatically, but Anthropic, Stripe, Zapier, and Cloudflare publish one, and several agentic browsers consume it. Cost to ship is low — keep it.

- `llms.txt` — short, link-only index at root. Required: H1 (site name), blockquote summary, then H2 sections of `- [Title](url): description` lines. Optional `## Optional` section for secondary links.
- `llms-full.txt` — concatenated full markdown of the most important content. Adds to context budget for agentic tools.

Draft for `https://irvale.com/llms.txt`:

```markdown
# Irvale Studio

> Irvale is a UK + Chiang Mai hybrid studio building revenue engineering systems
> for SMBs: websites, AI visibility, automated content + posting flows, and
> APAC market entry. Pricing is in USD globally. Zatrovo is a separate review
> automation product; ongoing social management routes to a partner studio.

## Core pages
- [Revenue Engineering (flagship)](https://irvale.com/revenue-engineering): full-takeover engagement, $1,450 / $3,450 / $5,500 per month, website + Zatrovo bundled
- [Services](https://irvale.com/services): 14 capability pillars including AI visibility, reviews, APAC
- [AI Visibility](https://irvale.com/ai-visibility): structured data, llms.txt, citation engineering
- [Compare](https://irvale.com/compare): how Irvale compares to in-house, agencies, freelancers

## Guides
- [Guide index](https://irvale.com/guides)
- [Local SEO by city](https://irvale.com/local)
- [Industry playbooks](https://irvale.com/for)

## Optional
- [Blog](https://irvale.com/blog)
- [Resources](https://irvale.com/resources)
```

Ship `llms-full.txt` as a build artefact concatenating markdown for `/revenue-engineering`, `/services/*`, `/ai-visibility`, and the top 10 guides. Generate at build time from MDX sources.

## 4. Content patterns that earn AI citations

Findings synthesised from 680M+ citation analyses across ChatGPT, Perplexity, AI Overviews, Gemini, Claude (Aug 2024 – Apr 2026):

- **Answer-first paragraphs.** Lead each section with a 2–3 sentence direct answer; long explanation goes underneath. AI extractors prefer self-contained passages.
- **Sourced statistics with primary citations.** Bare stats are discounted; "X% (Source, 2026)" with a link is what gets pulled. ChatGPT favours encyclopedic sources (47.9% Wikipedia-leaning), Perplexity favours Reddit (46.7%) and recent sources (82% within 30 days), AI Overviews favour multi-modal/YouTube (23.3%).
- **`dateModified` hygiene.** Auto-bump from CMS git timestamp on substantive changes only.
- **FAQ blocks with `FAQPage`.** Still parsed for extraction even though no rich snippet.
- **Definition tables.** Two-column "Term / Definition" tables earn passage-level citations.
- **"How it works" ordered lists with `HowTo` schema.**
- **Semantic HTML.** `<article>`, `<section>`, `<aside>`, `<time datetime="..."`, `<cite>`, `<dfn>`. Headings strictly hierarchical (no h2 → h4 jumps).
- **Speakable wrapping** of the answer-first paragraph.

Authors with visible credentials see ~40% more AI citations.

## 5. Internal linking — hub-and-spoke for AI

Sites with hub-and-spoke see AI citation rates rise from ~12% to ~41% on pillar-topic queries. Architecture:

- **Pillars (hubs).** `/revenue-engineering`, `/ai-visibility`, `/services/[pillar]` (each of the 14). Every pillar links *out* to all of its cluster pages.
- **Clusters (spokes).** `/blog/*`, `/guides/*`, `/compare/*`, `/local/[city]`, `/for/[industry]`. Every cluster page links *back* to its pillar with descriptive, semantically-consistent anchor text.
- **Breadcrumbs as IA.** The visible breadcrumb plus `BreadcrumbList` schema teach the crawler the topology.
- **Related-posts scoring.** Vertical (same pillar) > category > tag. Compute at build time from MDX frontmatter, not at request time.
- **Anchor-text discipline.** AI crawlers (GPTBot, ClaudeBot, PerplexityBot) use anchor text *and surrounding paragraph context* to assign authority — keep both on-topic.

Caveat: Reddit dominates ~40% of AI citations across all major models; pair on-site authority with off-site presence in topical subreddits.

## 6. EEAT — `Person` schema and author bios

Author content with verifiable credentials gets ~40% more AI citations. For every `/blog/*` and `/guides/*` author, ship a `/about/[author]` page with `ProfilePage` wrapping a full `Person`:

```json
{
  "@type": "Person",
  "name": "Jacob Horgan",
  "givenName": "Jacob",
  "familyName": "Horgan",
  "jobTitle": "Founder",
  "worksFor": { "@id": "https://irvale.com/#organization" },
  "url": "https://irvale.com/about/jacob-horgan",
  "image": "https://irvale.com/people/jacob-horgan.webp",
  "sameAs": [
    "https://www.linkedin.com/in/...",
    "https://github.com/jakesjacob",
    "https://x.com/..."
  ],
  "knowsAbout": ["Revenue engineering", "Programmatic SEO", "AI search visibility"],
  "alumniOf": { "@type": "EducationalOrganization", "name": "..." },
  "hasCredential": [{
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Professional certification",
    "name": "..."
  }]
}
```

`sameAs` is the single most load-bearing property — it lets AI engines resolve the entity across platforms. Reviewer bylines (`reviewedBy`) on `Article` increase trust signals further.

## 7. Sitemap strategy

- **`sitemap-index.xml`** at root, listing children: `pages.xml`, `posts.xml`, `guides.xml`, `images.xml`, `local.xml`, `for.xml`. Single sitemap caps at 50k URLs / 50MB; index avoids that cliff and lets you update only changed shards.
- **`lastmod`** must be accurate — Google treats inaccurate `lastmod` as a negative signal. Source from git commit timestamps of MDX or DB `updated_at`.
- **Drop `priority` and `changefreq`** — both ignored by every modern crawler.
- **Image sitemap** — emit via Next.js `sitemap.js` `images` array property; lifts inclusion in Google Images and Lens.
- **News sitemap** — only for content < 48h old; Irvale's blog cadence doesn't justify it. Skip.
- **Use absolute URLs**, always.

In Next.js 16, generate dynamically through the `sitemap.js` file convention; for multi-sitemap, return a `MetadataRoute.Sitemap` array per route group and a parent `sitemap.xml` that references each.

## 8. Core Web Vitals 2026 + Next.js 16

Thresholds (75th percentile, "good"):

| Metric | Threshold |
|---|---|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |

INP is the most-failed metric — 43% of sites still miss 200ms.

**What Next.js 16 gives you free:**
- ~50% faster SSR vs 15.x; ~400% faster dev startup (16.2).
- Streaming metadata reduces TTFB and LCP.
- Layout dedup during prefetch.
- React 19 server components → smaller hydration payload → better INP.
- Cache Components (`"use cache"`) for explicit caching of pages, components, and data fetches.

**What still needs custom work:**
- Long-task breakup with `scheduler.yield()` or `requestIdleCallback` for any client work > 50ms.
- GSAP timelines must respect `prefers-reduced-motion` (already in Irvale's CLAUDE.md) and use `will-change` sparingly to avoid CLS.
- Lenis smooth scroll: pin scroll containers and never animate non-composited properties.
- `next/image` with `priority` on the LCP element only.
- Ship critical CSS for above-the-fold; defer Tailwind utility CSS that only applies below.

## 9. Image SEO

- **Filenames.** Descriptive kebab-case: `revenue-engineering-launch-package-pricing.webp`, never `IMG_1234.webp`.
- **Alt text.** Describe purpose and context, not keywords. `alt=""` for decorative.
- **Format hierarchy 2026.** AVIF first (50% smaller than JPEG), WebP fallback (25–35% smaller), JPEG/PNG only as final fallback. `next/image` negotiates AVIF→WebP→JPEG automatically.
- **OpenGraph.** 1200×630 PNG/JPEG (not AVIF — many scrapers still don't decode it).
- **Twitter.** `summary_large_image` card; same 1200×630 asset.
- **`ImageObject` schema** on hero/feature images of each Article.

## 10. MDX → AI-friendly HTML

- **Heading hierarchy** strictly h1 → h2 → h3, no skips. One h1 per page; `<title>` matches.
- **Auto-generated TOC** from h2/h3 with anchor IDs (`rehype-slug` + `rehype-autolink-headings`).
- **`<time datetime="2026-05-06">`** for dates; `<cite>` for source attributions; `<dfn>` for first-use definitions.
- **`<abbr title="...">`** for acronyms on first use.
- **Code blocks** with language labels for accurate AI extraction.

## 11. Search Console + Bing Webmaster + IndexNow

- **Google Search Console + Bing Webmaster Tools** verified for both `irvale.com` and historical `irvale.studio`.
- **IndexNow** (Bing, Yandex, Naver, Seznam — *not* Google as of Feb 2026; 22% of Bing-clicked URLs originate from IndexNow):
  1. Generate API key in Bing Webmaster.
  2. Host `https://irvale.com/<key>.txt` containing the key (place in `/public`).
  3. On every successful build/deploy that changes a route's `lastmod`, POST to `https://api.indexnow.org/IndexNow`:
     ```json
     {
       "host": "irvale.com",
       "key": "<key>",
       "keyLocation": "https://irvale.com/<key>.txt",
       "urlList": ["https://irvale.com/blog/new-post", "..."]
     }
     ```
  4. Wire into the Next.js build pipeline via a post-build script that diffs the previous sitemap against the new one and submits only changed URLs.

## 12. Prioritised 30-item checklist for Irvale Studio

Order by leverage × cost. P0 = ship this week, P1 = within 30 days, P2 = roadmap.

**P0 — foundational schema and crawl policy (week 1)**
1. Replace any legacy `irvale.studio` references with `irvale.com` site-wide; canonical tags, OG URLs, sitemap.
2. Ship root-layout JSON-LD: `Organization` + `WebSite` + two `LocalBusiness` (UK, Chiang Mai) `branchOf` Organization.
3. Publish reference `robots.txt` (§2) with AI-allow / training-block split.
4. Generate `sitemap-index.xml` with `pages.xml`, `posts.xml`, `guides.xml`, `images.xml` shards; accurate `lastmod` from git.
5. Add `BreadcrumbList` schema to every non-root page; render visible breadcrumbs.
6. Verify Google Search Console + Bing Webmaster + Yandex.

**P0 — flagship pages (week 1–2)**
7. `/revenue-engineering` — `Service` + `OfferCatalog` with three `Offer` nodes ($1,450 / $3,450 / $5,500/mo USD), `priceCurrency: USD`, `availability`, `eligibleRegion`.
8. `/services` — `CollectionPage` with `ItemList` of 14 pillars; each pillar page gets its own `Service` schema.
9. `/ai-visibility` — `Service` + answer-first explanation of structured data, `llms.txt`, citation engineering, with `Speakable`.
10. Author bio at `/about/jacob-horgan` with full `Person` + `ProfilePage` (§6).

**P1 — content engine (weeks 2–4)**
11. Ship `llms.txt` and `llms-full.txt` (§3); generate `llms-full.txt` from MDX at build.
12. Wire IndexNow post-build script (§11).
13. Add `FAQPage` blocks to `/services/*`, `/compare/*`, `/revenue-engineering`, top 10 guides.
14. Build `/compare` hub: `/compare/in-house-vs-irvale`, `/compare/agency-vs-irvale`, `/compare/freelancer-vs-irvale` — each `ItemList` + comparison table.
15. Convert all blog/guide MDX to use answer-first paragraphs wrapped in `.speakable`.
16. Auto-update `dateModified` from git on substantive content changes only.
17. `/blog/*` and `/guides/*` ship `BlogPosting`/`Article` with full `author` `Person` node, `reviewedBy` where applicable.
18. Implement `HowTo` schema on every "how it works" guide.

**P1 — programmatic pages (weeks 3–6)**
19. `/local/[city]` template with city-specific `LocalBusiness` `areaServed` and a `CollectionPage` listing relevant case studies.
20. `/for/[industry]` template with `Service` schema scoped to industry, FAQ block, case-study `ItemList`.
21. Internal linking pass: every cluster page links back to its pillar with descriptive anchor; every pillar links to all its clusters (§5).
22. Build related-posts engine in MDX: vertical > category > tags scoring.

**P1 — performance and assets (weeks 2–4)**
23. Convert all images to AVIF + WebP via `next/image`; rename to descriptive kebab-case filenames; write purposeful alt text.
24. Audit INP — break long tasks > 50ms with `scheduler.yield`; defer non-critical GSAP timelines below the fold.
25. Add `priority` to LCP image only; preconnect to font and image origins.
26. Ship 1200×630 OG/Twitter images per route via Next.js dynamic OG image API.

**P2 — moat (weeks 4–12)**
27. Off-site: seed topical Reddit + Quora + LinkedIn presence (Reddit drives ~40% of AI citations cross-model).
28. `VideoObject` schema on any embedded explainers; add a YouTube channel for AI Overviews multi-modal coverage.
29. Author bylines on every long-form piece with full `Person` schema; commission outside expert reviewers for `reviewedBy`.
30. Quarterly schema-accuracy audit — AI engines now penalise mismatched schema vs page content; treat schema as a verified contract, not decoration.

## Sources

- [Structured Data AI Search: Schema Markup Guide (2026) — Stackmatix](https://www.stackmatix.com/blog/structured-data-ai-search)
- [Schema Markup After March 2026 — Digital Applied](https://www.digitalapplied.com/blog/schema-markup-after-march-2026-structured-data-strategies)
- [Schema Markup for AI Citations 2026 — Soar Agency](https://www.soar.sh/blog/schema-markup-ai-citations-2026)
- [Speakable BETA Structured Data — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/speakable)
- [LocalBusiness Structured Data — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Organization Schema — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Robots.txt — Guide for AI Ranking — BotRank](https://www.botrank.ai/technical-doc/robots-txt)
- [The AI User-Agent Landscape in 2026 — No Hacks](https://nohacks.co/blog/ai-user-agents-landscape-2026)
- [Overview of OpenAI Crawlers — OpenAI Developers](https://developers.openai.com/api/docs/bots)
- [The /llms.txt File — llmstxt.org](https://llmstxt.org/)
- [What is LLMs.txt & Should You Use It — Semrush](https://www.semrush.com/blog/llms-txt/)
- [How ChatGPT, Google AI Overviews, and Perplexity Source Information 2026 — Leapd](https://www.leapd.ai/blog/ai-visibility/how-chatgpt-google-ai-overviews-and-perplexity-source-information-in-2026)
- [Hub-and-Spoke Content Model 2026 — Koanthic](https://koanthic.com/en/hub-and-spoke-content-model-complete-guide-for-2026/)
- [E-E-A-T for AI: +40% Citations with Credentials — Qwairy](https://www.qwairy.co/blog/eeat-for-ai-authority-signals-guide)
- [XML Sitemaps in 2026 — Two Squares](https://twosquares.co.uk/blog/xml-sitemaps)
- [Metadata Files: sitemap.xml — Next.js Docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Core Web Vitals 2026: INP, LCP, CLS — Senorit](https://senorit.de/en/blog/core-web-vitals-2026)
- [Next.js 16 Release Notes — Next.js Blog](https://nextjs.org/blog/next-16)
- [How to Add IndexNow to Your Website — Bing Webmaster Tools](https://www.bing.com/indexnow/getstarted)
- [Image SEO 2026 Complete Optimization Guide — Digital Applied](https://www.digitalapplied.com/blog/image-seo-complete-optimization-guide-2026)
- [Author Schema Markup for SEO Success 2026 — JoseOne](https://joseone.com/author-schema-markup-for-seo-success/)
