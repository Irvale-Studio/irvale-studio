# Frontmatter Contract — Irvale Studio MDX

> The frontmatter block at the top of every `.mdx` file is a contract between the writer, the build pipeline, and the JSON-LD/metadata layer. Validation runs at build time; violations fail CI.

## 1. Blog post (`content/blog/<slug>.mdx`)

```yaml
---
title: "Google Maps SEO for UK Small Businesses: A Plain-English Guide"
slug: "google-maps-seo-uk-guide"             # must match filename
description: "What UK small businesses really need to know about Google Maps SEO in 2026 — without the agency jargon, and with the tactics that actually move the needle."
publishedAt: "2026-05-06"
updatedAt: "2026-05-06"                      # bump on substantive change only
author: "jacob-horgan"                       # references content/authors/<slug>.json

category: "local-seo"                        # one of: local-seo, reviews, cro, paid-media, ai-search, revenue
vertical: null                               # one of: trades, hospitality, beauty, healthcare, professional, retail, null
tags: ["google maps", "local seo", "google business profile"]
featured: false

hero:
  search: "uk high street independent shop morning light"   # Unsplash query seed
  alt: "Independent UK high street shop frontage at morning with sandwich-board sign and hanging flower basket."
  focalPoint: "0.5 0.4"                      # x y, 0..1, used by next/image object-position

faq:                                         # 4–6 entries, emitted as FAQPage JSON-LD
  - q: "How long does Google Maps SEO take to show results in the UK?"
    a: "Most UK SMBs see Map Pack movement within 4–8 weeks if their Google Business Profile is verified, primary category is correct, and they earn 5–10 reviews in that period. Service Area Businesses can take longer (8–12 weeks) because Google relies more heavily on prominence signals where physical proximity is absent."
  # ... 3–5 more

seo:
  canonical: null                            # null = derive from /blog/<slug>; set to override
  noindex: false

internalLinks:                               # writer-curated; build asserts ≥2 + ≥1 hub + ≥1 product
  - "/services/local-seo"
  - "/local/manchester"
  - "/blog/google-business-profile-uk-setup-verification"
  - "/revenue-engineering"

related: []                                  # auto-fill via build script (vertical>category>tags)

# Optional fields
ogTitle: null                                # falls back to title
ogDescription: null                          # falls back to description
schema:                                      # extra JSON-LD opt-ins
  howTo: false                               # true emits HowTo schema for the headings
  speakable: true                            # default true; emits Speakable selector
reviewedBy: null                             # author slug of subject-matter reviewer (for regulated topics)
---
```

## 2. Guide post (`content/guides/<slug>.mdx`)

Same as blog plus:

```yaml
schema:
  howTo: true                                # almost always true for guides
  speakable: true
guideLevel: "beginner" | "intermediate" | "advanced"
estimatedTime: "PT45M"                       # ISO 8601 duration; feeds HowTo.totalTime
```

## 3. Resource (calculator) (`content/resources/<slug>.mdx`)

```yaml
title: "No-Show Cost Calculator"
slug: "no-show-cost-calculator"
description: "Work out exactly how much your salon, clinic, or barbershop loses to no-shows each month — and what a deposit policy would recover."
publishedAt: "2026-05-06"
updatedAt: "2026-05-06"
author: "jacob-horgan"

category: "operations"                       # one of: financial, pricing, operations, growth, retention
calculator: "NoShowCostCalculator"           # PascalCase React component in src/components/calculators/

tags: ["no-shows", "deposits", "salons", "cro"]

hero:
  search: "uk salon empty diary calculator"
  alt: "Empty salon diary page with calculator on a wooden counter."

faq:
  - q: "..."
    a: "..."

relatedPosts:                                # blog/guide slugs
  - "reduce-no-shows-uk-hair-salon"
  - "take-deposits-for-appointments-uk-stripe"

seo:
  canonical: null
  noindex: false
---
```

## 4. Author (`content/authors/<slug>.json`)

```json
{
  "slug": "jacob-horgan",
  "name": "Jacob Horgan",
  "givenName": "Jacob",
  "familyName": "Horgan",
  "role": "Founder, Irvale Studio",
  "bio": "Jacob founded Irvale Studio after a decade engineering revenue systems for hospitality, beauty, and trades businesses across the UK and APAC. He writes about AI-search visibility, conversion engineering, and the practical end of running a small studio.",
  "avatar": "/people/jacob-horgan.webp",
  "sameAs": [
    "https://www.linkedin.com/in/...",
    "https://github.com/jakesjacob",
    "https://x.com/..."
  ],
  "knowsAbout": [
    "Revenue engineering",
    "Programmatic SEO",
    "AI search visibility",
    "Conversion rate optimisation",
    "UK SMB marketing"
  ],
  "alumniOf": null,
  "credentials": []
}
```

## 5. Validation rules (enforced by `scripts/validate-frontmatter.mjs`)

For blog + guide:

- `title` is 30–80 chars; ends without trailing punctuation.
- `slug` is kebab-case; matches filename without `.mdx`.
- `description` is 140–160 chars; ends with `.` or `?`.
- `publishedAt` and `updatedAt` are valid ISO dates; `updatedAt >= publishedAt`.
- `author` resolves to an existing `content/authors/<slug>.json`.
- `category` is one of the allowed enum values.
- `vertical` is null or one of the allowed enum values.
- `tags` array length 2–8.
- `hero.search` is non-empty string.
- `hero.alt` is 30–125 chars; ends with `.`.
- `faq` has 4–6 entries; each `a` is 60–180 words.
- `internalLinks` has ≥2 entries; ≥1 must be a `/services/*` or `/ai-visibility` or `/revenue-engineering` or `/zatrovo` URL.
- `seo.canonical` is null or a valid relative path starting `/`.

For resource:

- `category` ∈ `['financial','pricing','operations','growth','retention']`.
- `calculator` is PascalCase, matches a component file in `src/components/calculators/`.
- `relatedPosts` has ≥1 entry; each must resolve to a real blog/guide slug.

For author:

- `slug` matches filename.
- `sameAs` array length ≥1, each is a valid HTTPS URL.
- `name`, `bio`, `avatar` non-empty.

## 6. Image fetcher contract

`scripts/fetch-blog-images.mjs` reads `hero.search`, queries Unsplash, downloads to `/public/images/blog/<slug>/hero.jpg`, writes `hero.credit.json`. The `hero.alt` and `hero.focalPoint` are *not* derived from the API — they are author-curated for accuracy.

If `hero.search` returns zero hits, the script falls through to Pexels then Pixabay. If all three fail, the build emits a warning but does not block (writer is expected to manually set the hero in that case).
