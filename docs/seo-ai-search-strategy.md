# Irvale Studio — SEO + AI Search Strategy (Master Doc)

> **Single source of truth** for content, schema, and AI-citation engineering at irvale.com. Read this before opening any sub-spec.
> Sub-specs live in `docs/seo-research/*` (raw research) and `docs/frontmatter-contract.md`, `docs/jsonld-spec.md`, `docs/mdx-components.md`, `docs/seo-content-plan-100.md` (deliverables).
>
> Last reviewed: 2026-05-06 · Owner: Jacob Horgan · Status: ready to implement.

---

## 1. Outcome we are buying

Two outcomes, ranked:

1. **Rank for high-intent commercial UK SMB queries** in classical search (Google, Bing) so Irvale captures organic enquiries from owner-operators searching "google maps optimisation manchester", "checkout abandonment recovery uk", "site not appearing in chatgpt", etc.
2. **Become a citable source** in AI answer engines (ChatGPT, Claude, Perplexity, Gemini/AI Overviews, Copilot) so Irvale shows up *inside* the answer when a UK SMB asks an LLM "how do I get more google reviews" or "should I block GPTBot".

Everything in this doc is in service of those two outcomes. If a tactic doesn't move (1) or (2), it is out of scope.

## 2. Brand frame (so content stays on-brand)

- **Identity:** Irvale Studio — UK-founded, London + Chiang Mai dual presence, USD pricing globally. APAC capability (Naver, Xiaohongshu, WeChat, KakaoTalk, LINE) is a deliberate, *named* differentiator.
- **Flagship:** Revenue Engineering at `/revenue-engineering` — full-takeover engagement at $1,450 / $3,450 / $5,500 per month, website + Zatrovo bundled.
- **Capability pillars (14):** Web Design + Build · CRO · Conversion Copy · Brand · Local SEO + Maps · Reviews + Reputation · AI Visibility · Email + CRM · Paid Media · Content · Analytics · Bookings + Automation · APAC Market Entry · Ongoing Care. (Ongoing social/KOC routes to a partner studio, not Irvale.)
- **Voice:** premium-editorial, calm, confident. UK English (optimisation, not optimization; favourite, not favorite; £ when quoting UK costs in body; USD always for Irvale's prices). No marketing fluff. No exclamation marks. No emojis except where a section asks for them.
- **Don't claim:** native-language editorial review of multilingual content (it's AI-generated). Don't position as "Chiang Mai-based" — it's hybrid. Don't position as social media managers — Irvale builds automated posting flows + profile setup, ongoing social goes to partner.

## 3. Audience

UK SMB owners and marketing managers, businesses doing £100k–£5M revenue, sectors:

- **Trades:** plumbers, electricians, builders, joiners, decorators, garages/MOT, locksmiths, removals, dog groomers
- **Hospitality:** cafes, restaurants, takeaways, pubs, hotels, B&Bs
- **Beauty + wellness:** hairdressers, barbers, beauticians, nail technicians, gyms, yoga studios, physiotherapists, chiropractors
- **Healthcare-adjacent:** dentists, opticians, vets, private clinics
- **Professional services:** accountants, solicitors, estate agents, financial advisors, IFAs, mortgage brokers
- **Independent retail + e-com:** boutiques, lifestyle DTC, food/drink brands

Cross-cutting: tradespeople with no shopfront (service-area businesses), multi-location groups, owner-operators with no in-house marketer, fractional-CMO clients.

## 4. Information architecture (route map)

Hub-and-spoke topology. Every spoke links to its hub; every hub links to all its spokes.

```
/                                       Home
/revenue-engineering                    Flagship pillar (Service + OfferCatalog)
/services                               Hub of 14 capabilities (CollectionPage)
/services/[pillar]                      One per pillar — Service + FAQPage
/ai-visibility                          AI search pillar — Service + Speakable
/work                                   Case studies index
/work/[slug]                            Case study (CreativeWork + Service)
/about/[author]                         Author bio (ProfilePage + Person)
/contact                                Contact

/blog                                   Blog index (paginated, CollectionPage)
/blog/[slug]                            Article (BlogPosting + FAQPage + Person + Breadcrumb)
/blog/category/[category]               Category landing
/blog/tag/[tag]                         Tag landing
/blog/page/[page]                       Pagination

/guides                                 Guide index — long-form pillars
/guides/[slug]                          Guide (Article + HowTo + FAQPage)

/compare                                Comparison hub (ItemList)
/compare/[slug]                         vs-competitor / vs-channel page (ItemList + FAQPage)

/alternatives                           Alternatives hub
/alternatives/[slug]                    "Best X alternatives" pages

/local                                  Local SEO hub (CollectionPage)
/local/[city]                           City landing — UK only — LocalBusiness areaServed

/for                                    Industry hub
/for/[industry]                         Industry playbook — Service + ItemList of guides + FAQ

/resources                              Tools + calculators hub
/resources/[slug]                       Calculator/tool page (WebApplication + FAQPage)

/zatrovo                                Zatrovo product page (SoftwareApplication)
/sitemap.xml + /sitemap-*.xml           Sitemap index
/robots.txt                             Bot policy
/llms.txt + /llms-full.txt              LLM index + concatenated context
```

## 5. Topic clusters (the editorial backbone)

Six pillar clusters, each with 12–20 spokes. Total ≥100 posts/pages. Full keyword research lives in `docs/seo-research/cluster-0[1–6]-*.md`. Full 100-post breakdown in `docs/seo-content-plan-100.md`.

| # | Pillar cluster | Hub page | Spoke types | Primary intent |
|---|---|---|---|---|
| 1 | **Local SEO + Google Maps** | `/services/local-seo` + `/local` | guides, /local/[city], comparisons | UK SMB local rank |
| 2 | **Reviews + Reputation** | `/services/reviews` (+ `/zatrovo`) | guides by industry, schema how-tos | Get + manage reviews |
| 3 | **Bookings + CRO + Conversions** | `/services/cro` | system comparisons, tactic playbooks | Lift bookings/revenue per visitor |
| 4 | **Ads + Paid Media** | `/services/paid-media` | platform guides, vertical playbooks | Run profitable paid spend |
| 5 | **Website + Digital Presence + AI Search** | `/ai-visibility` + `/services/web` | technical + answer-engine pieces | Be visible to AI + classical search |
| 6 | **Revenue + Email/CRM + Retention** | `/services/email-crm` | flow guides, comparisons, vertical | Lift LTV + repeat purchase |

Cross-cluster: every comparison/guide links to the relevant `/local/[city]` if hyperlocal, the relevant `/for/[industry]` if vertical, and back to its pillar's hub.

## 6. JSON-LD library spec

Implementation lives in `docs/jsonld-spec.md`. Summary of required schemas per page type:

| Page type | Required schemas |
|---|---|
| `/` (home) | Organization, WebSite, LocalBusiness × 2 (UK + Chiang Mai), ItemList |
| `/revenue-engineering` | Service, OfferCatalog (3 Offers in USD), FAQPage, BreadcrumbList, Speakable |
| `/services` | CollectionPage, ItemList, BreadcrumbList |
| `/services/[pillar]` | Service, FAQPage, BreadcrumbList, Speakable |
| `/ai-visibility` | Service, FAQPage, BreadcrumbList, Speakable |
| `/work/[slug]` | CreativeWork, ImageObject, BreadcrumbList |
| `/blog/[slug]` | BlogPosting (with Person author + reviewedBy where applicable), ImageObject, FAQPage, BreadcrumbList, Speakable |
| `/guides/[slug]` | Article, HowTo (where applicable), FAQPage, BreadcrumbList, Speakable |
| `/compare/[slug]` | ItemList, FAQPage, BreadcrumbList, comparison-specific JSON-LD |
| `/local/[city]` | CollectionPage, LocalBusiness with `areaServed`, BreadcrumbList |
| `/for/[industry]` | Service, FAQPage, ItemList, BreadcrumbList |
| `/resources/[slug]` | WebApplication, FAQPage, BreadcrumbList |
| `/about/[author]` | ProfilePage, Person, BreadcrumbList |

**Critical rules:**
- Every JSON-LD `@id` is a stable URL fragment (`https://irvale.com/#organization`, `https://irvale.com/blog/<slug>#article`).
- `dateModified` is sourced from git commit timestamp on substantive change only — never auto-bump on copyright-year edits.
- `image` arrays include the 1200×630 OG image plus the in-page hero `ImageObject`.
- `sameAs` on Organization + Person is the single highest-leverage property for AI entity resolution. Keep it accurate.
- `Review`/`AggregateRating` only on real product entities (Zatrovo software, paid resources). Never on Organization or LocalBusiness — Google calls that self-serving.

## 7. Frontmatter contract

Full spec in `docs/frontmatter-contract.md`. Summary:

```yaml
---
title: "..."                      # H1 + <title> (template: "%s — Irvale Studio")
slug: "..."                       # kebab-case; matches filename
description: "..."                # 140–160 chars; appears in metadata + JSON-LD
publishedAt: "2026-05-06"
updatedAt: "2026-05-06"           # bump on substantive change only
author: "jacob-horgan"            # references content/authors/<slug>.json
category: "local-seo" | "reviews" | "cro" | "paid-media" | "ai-search" | "revenue"
vertical: "trades" | "hospitality" | "beauty" | "healthcare" | "professional" | "retail" | null
tags: ["..."]
featured: false
hero:
  search: "uk independent cafe owner counter morning"   # Unsplash query
  alt: "..."                                            # ≤125 chars, descriptive
  focalPoint: "0.5 0.4"
faq:                              # 4–6 entries; emitted as FAQPage
  - q: "..."
    a: "..."                      # 60–120 words; factual; no hedging
seo:
  canonical: null                 # override only when needed
  noindex: false
internalLinks:                    # author-curated; build asserts ≥2 cluster links + 1 product/feature
  - "/services/local-seo"
  - "/local/manchester"
related:                          # auto-fill via build script if empty
  - "<slug>"
---
```

Resource (calculator) pages add `category` ∈ `['financial','operations','growth','retention']` and `calculator: "PascalCaseComponent"`.

## 8. MDX components

Spec in `docs/mdx-components.md`. Whitelisted via `mdxComponents`:

- `<Callout variant="insight|tip|warning|danger" title?>` — coloured card with uppercase eyebrow
- `<Comparison headers={[...]} rows={[[...]]} caption?>` — bordered HTML table; every comparison post has ≥1
- `<Stats items={[{value,label,source}]}>` — sourced metric grid; AI engines extract these as cited stats
- `<CTA href label sublabel>` — gradient card → `/contact` or `/revenue-engineering`
- `<FAQ items={[...]}>` — `<details>` accordion; mirrors schema FAQ
- `<Figure src alt caption credit creditUrl width height>` — captioned image with credit
- `<Speakable>` — wraps the answer-first paragraph; mapped to `.speakable` CSS class consumed by Speakable JSON-LD
- `<KeywordTable>` — short variant of Comparison for keyword matrices
- Override `a` and `img` to use `next/link` + `next/image`. External links: new tab, `rel="noopener noreferrer"`.

MDX rehype pipeline:
1. `remark-gfm` — tables + footnotes
2. `rehype-slug` — heading IDs
3. `rehype-autolink-headings` — `behavior: 'wrap'`, class `heading-anchor`
4. `rehype-pretty-code` — theme `github-dark-dimmed`, `keepBackground: false`

## 9. Image pipeline

Full spec in `docs/seo-research/image-pipeline.md`. Headlines:

- **Primary source: Unsplash** with build-time fetcher (`scripts/fetch-blog-images.mjs`) reading `frontmatter.hero.search`, downloading 1600w master to `/public/images/blog/<slug>/hero.jpg`, firing the `download_location` beacon, writing `hero.credit.json` for attribution.
- **Fallbacks:** Pexels → Pixabay if Unsplash returns zero. Skip Openverse for hero.
- **Apply for Unsplash production tier** before launch (>50 req/hr in any rebuild).
- **Self-host masters in git** — Vercel local-image cache is content-hash keyed (cheaper, more reliable than remote loader).
- **`next/image`** generates AVIF/WebP variants on demand. Next 16 requires explicit `quality`, deprecates `priority` in favour of `preload`.
- **Dynamic OG** at `/blog/[slug]/opengraph-image.jsx` — 1200×630 PNG, dark background, Cormorant + DM Sans.
- **Alt text:** ≤125 chars, no "image of", end with full stop. UK SMB framing — see 10 exemplars in image-pipeline.md.
- **AI-generated images:** label visibly + flag in `hero.credit.json` (`source: 'ai'`). EU AI Act Article 50 transparency from August 2026.
- **CI guard:** `images:audit` script blocks deploy if any `<slug>` folder is missing `hero.credit.json`.

## 10. Internal linking rules

- Every `/blog/[slug]` and `/guides/[slug]` MUST link to:
  - ≥2 sibling spokes inside the same cluster
  - ≥1 hub page (its pillar) — *with descriptive anchor text*, not "click here"
  - ≥1 product/feature surface (`/revenue-engineering`, `/services/[pillar]`, `/ai-visibility`, or `/zatrovo`)
- Every `/compare/[slug]` MUST link to: `/alternatives`, ≥2 related blog posts, and the relevant `/services/[pillar]`.
- Related-posts engine scoring: `vertical match: +4`, `category match: +3`, `shared tag: +2`, `same author: +1`. Top 3 per post.
- Anchor text discipline: descriptive entity names, no exact-match keyword stuffing, no "learn more".

## 11. AI bot policy + `robots.txt`

Two-tier model:

- **Allow** retrieval bots (`OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`, `Applebot-Extended`, `Google-Extended`) — these drive citations.
- **Allow** training crawlers (`GPTBot`, `ClaudeBot`, `cohere-ai`) — Irvale stance: maximise corpus presence so brand is recalled in zero-click answers.
- **Disallow** `Bytespider`, `meta-externalagent`, `Amazonbot` — repeat offenders or low value.
- **Disallow** `/api/`, `/_next/` for all bots.

Full `robots.txt` template in `docs/seo-research/ai-search-architecture-2026.md` §2.

## 12. `llms.txt` + `llms-full.txt`

- `llms.txt` at root with H1, blockquote summary, then `## Core pages` / `## Guides` / `## Optional`. See template in `docs/seo-research/ai-search-architecture-2026.md` §3.
- `llms-full.txt` built from MDX at build time — concatenates `/revenue-engineering`, `/services/*`, `/ai-visibility`, top 10 guides.
- Re-generate on every deploy via `scripts/build-llms.mjs`.

## 13. Sitemaps

- `sitemap-index.xml` at root.
- Shards: `pages.xml`, `posts.xml`, `guides.xml`, `compare.xml`, `local.xml`, `for.xml`, `resources.xml`, `images.xml`.
- `lastmod` from git commit timestamp of source file (MDX or page.js).
- **Drop** `priority` and `changefreq` — both ignored by modern crawlers.
- Image sitemap emitted via Next 16 `sitemap.js` `images` array.
- Submit to Google Search Console + Bing Webmaster + Yandex Webmaster on first publish; resubmit on shard change.

## 14. IndexNow

- Generate IndexNow API key in Bing Webmaster.
- Host `/public/<key>.txt` containing the key.
- Post-build script (`scripts/indexnow.mjs`) diffs sitemap against previous build, posts changed URLs to `https://api.indexnow.org/IndexNow`. Targets Bing, Yandex, Naver, Seznam (not Google as of 2026).

## 15. Editorial standards (the part most teams skip)

These are non-negotiable on every long-form post.

- **Answer-first.** Every H2 starts with a 2–3 sentence direct answer. Wrap that paragraph in `<Speakable>`. AI engines lift the first 1–2 sentences after an H2 as the canonical answer.
- **Sourced stats.** Every numerical claim has a `source` field on its `<Stats>` item, with the date verified. ChatGPT/Perplexity discount unsourced numbers.
- **`updatedAt` discipline.** Bump on substantive change (new data, rewritten section). Never on copyright-year touches. AI engines weight freshness — content cited by ChatGPT skews ~26% fresher than classical search picks.
- **FAQ entries: 60–120 words** of factual prose. No hedging. No "depends on your situation" — give a number, give a band, cite the source.
- **Disclosure block** at top of every comparison post: state who you are, that you publish the site, and that competitor data was verified on a stated date.
- **Cite vendor sources inline** for pricing/feature claims with the verification date.
- **One `<Comparison>` table or `<Stats>` block** per non-opinion post.
- **Internal links** per §10.
- **UK English** — "optimisation", "behaviour", "favourite", "centre", "metres". UK currency in body for UK-specific costs (£), USD for Irvale's pricing.
- **No emojis** unless the section explicitly requires one.
- **Author byline** with full Person schema; commission outside reviewer for `reviewedBy` on regulated topics (legal, dental, financial).

## 16. Validation checklist (gate before merge)

For every post/page:

- [ ] `description` is 140–160 chars and a complete sentence.
- [ ] `publishedAt` and `updatedAt` set; `updatedAt` bumped on this change if substantive.
- [ ] At least one `<Comparison>` table OR `<Stats>` block with sourced numbers (non-opinion posts).
- [ ] 4–6 FAQ entries.
- [ ] Every external claim links to its source with the date verified.
- [ ] H2 headings start with the answer, not the topic.
- [ ] Internal links to ≥2 cluster spokes + 1 hub + 1 product/feature.
- [ ] First paragraph after every H2 wrapped in `<Speakable>`.
- [ ] `view-source:` shows the schemas listed in §6 for that page type.
- [ ] Run page URL through Google Rich Results Test + Schema.org Validator — zero errors.
- [ ] Hero image present, `alt` ≤125 chars, `hero.credit.json` written by fetcher.
- [ ] Lighthouse: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1.

## 17. Build order (week-by-week)

**Week 1 — foundations**
1. Fix any legacy `irvale.studio` references → `irvale.com`.
2. Install MDX stack: `next-mdx-remote`, `gray-matter`, `fast-glob`, `reading-time`, `rehype-slug`, `rehype-autolink-headings`, `rehype-pretty-code`, `remark-gfm`, `plaiceholder`.
3. Scaffold `content/blog/`, `content/guides/`, `content/authors/`, `content/resources/`.
4. Build `src/lib/seo/jsonld.js` + `src/lib/blog/jsonld.js` factories.
5. Build `src/lib/blog/index.js` loader (cached, slug-keyed, sorts by date desc).
6. Ship root-layout JSON-LD: Organization, WebSite, LocalBusiness × 2.
7. Ship `robots.txt`, `sitemap-index.xml`, first sitemap shards.
8. Submit Search Console + Bing + Yandex.

**Week 2 — first cluster live**
9. Wire `/blog`, `/blog/[slug]`, `/blog/[slug]/opengraph-image.jsx`, `/blog/page/[page]`, `/blog/category/[category]`, `/blog/tag/[tag]`.
10. Author bio at `/about/jacob-horgan` with full ProfilePage + Person.
11. Ship 10 priority blog posts from `seo-content-plan-100.md` (the 10 marked **P0** below).
12. Build `scripts/fetch-blog-images.mjs` + apply for Unsplash production tier.
13. Add `<Speakable>` wrapping; verify all four schemas attached on a sample post.

**Week 3 — guides + compare**
14. Wire `/guides`, `/guides/[slug]` (Article + HowTo + FAQPage).
15. Wire `/compare`, `/compare/[slug]` with COMPETITORS map.
16. Ship 10 guides + 5 compare pages.
17. Build `/alternatives` hub.

**Week 4 — programmatic + resources**
18. Wire `/local/[city]` with COUNCILS map.
19. Wire `/for/[industry]` with INDUSTRIES map.
20. Wire `/resources/[slug]` with one calculator (e.g. NoShowCostCalculator).
21. Ship 10 city pages + 6 industry playbooks + 1 calculator.
22. Wire IndexNow post-build script.

**Weeks 5–8 — backfill content**
23. Ship the remaining 60+ posts/guides per `seo-content-plan-100.md`.
24. Generate `llms-full.txt` from MDX.
25. Quarterly schema-accuracy audit cadence established.

## 18. Measurement

- **Google Search Console** — impressions/clicks per cluster, top queries, indexing coverage. Weekly review.
- **Bing Webmaster** — same metrics; IndexNow submissions verified.
- **Plausible** — page-level traffic + outbound clicks to `/contact`, `/revenue-engineering`. Defer until launch (per dev-spec).
- **AI citation tracking** — manual quarterly checks: search a sample of 25 target queries inside ChatGPT, Claude, Perplexity, Gemini AI Mode. Log whether `irvale.com` is cited and on what query. Optional: Profound, Otterly, ALLMO, Qwairy as automated trackers later.
- **KPI:** by month 6, ≥30 keywords ranking top 10 in UK Google, ≥5 AI-engine citations on target queries, ≥10 inbound enquiries from organic per month.

## 19. Out of scope (to keep us focused)

- Paid distribution (Twitter ads, LinkedIn ads, Reddit ads).
- Video/podcast production beyond embedding existing material.
- Translation of content (multilingual content is AI-generated only via Zatrovo flows for client sites — Irvale's own site stays UK English).
- Social media management (routes to partner studio).
- Backlink-buying or PBN tactics.

---

## Appendix — file map

```
docs/
  seo-ai-search-strategy.md            ← THIS FILE (master)
  frontmatter-contract.md              ← MDX frontmatter spec
  jsonld-spec.md                       ← JSON-LD factories spec
  mdx-components.md                    ← MDX component whitelist + props
  seo-content-plan-100.md              ← 100 post/page titles with metadata
  seo-research/
    cluster-01-local-seo.md
    cluster-02-reviews-reputation.md
    cluster-03-bookings-cro.md
    cluster-04-ads-paid-media.md
    cluster-05-website-ai-search.md
    cluster-06-revenue-email-crm.md
    ai-search-architecture-2026.md
    image-pipeline.md
content/
  blog/<slug>.mdx
  guides/<slug>.mdx
  resources/<slug>.mdx
  authors/<slug>.json
public/
  images/blog/<slug>/hero.jpg
  images/blog/<slug>/hero.credit.json
  llms.txt
  llms-full.txt
  <indexnow-key>.txt
src/
  lib/seo/jsonld.js
  lib/blog/index.js
  lib/blog/jsonld.js
  lib/resources/index.js
  components/blog/MDXComponents.jsx
scripts/
  fetch-blog-images.mjs
  build-llms.mjs
  indexnow.mjs
  validate-credits.mjs
```
