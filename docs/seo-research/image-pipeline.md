# Image Pipeline Reference — Irvale Studio Blog

> Source: research agent 8. Audience: Irvale Studio devs + content lead. Validated against 2026 docs for Unsplash, Pexels, Pixabay, Vercel Image Optimization, Next.js 16 Image + opengraph-image.

## 1. Unsplash API

- **Tiers (2026):** Demo = **50 requests/hour** by default; Production = **5,000 requests/hour** after approval. Only JSON API calls count; `images.unsplash.com` asset fetches do **not**.
- **Endpoints we'll use:** `GET /search/photos?query=...&orientation=landscape&content_filter=high` and `GET /photos/random`. Each photo response includes `urls.{raw,full,regular,small}`, `links.download_location`, `user.name`, `user.links.html`.
- **Per-image trigger rule:** every time the app "uses" a photo (renders on the live blog, saves to a slug folder, ships in OG), fire `GET <photo.links.download_location>?client_id=...` once. This is a tracking beacon, not a download URL — fire async at build time.
- **Attribution format (mandatory):** "Photo by [Photographer Name](https://unsplash.com/@handle?utm_source=irvale&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=irvale&utm_medium=referral)". `utm_source` must be the registered application name; `utm_medium=referral`.
- **Hotlinking vs self-hosting:** Unsplash *prefers* hotlinking from `images.unsplash.com` so view stats reach the photographer. Self-hosting is allowed. For a UK blog at scale we will **self-host** (cache cost, perf, archive resilience) and **fire the download_location beacon** at build — the de-facto compromise across production WP/Ghost integrations.
- **Production application:** required once we (a) ship to a public production domain, (b) exceed demo limits, or (c) have any commercial intent. With ~100 posts and a build-time fetcher we'll exceed 50/hr in a single full rebuild — apply before launch. Submit screenshots showing the attribution rendered in context.
- **Production-use definition:** any app that is "live" or commercial. Internal/personal demos can stay on demo tier.

## 2. Alternative free libraries (2026)

| Source | Auth | Rate limit | Attribution | UK content quality | Notes |
|---|---|---|---|---|---|
| **Pexels** | API key | 200 req/hr, 20k/mo (unlimited on request, free) | "Photo by X on Pexels" link recommended; not strictly required | Good — broad European set | Hotlinking allowed; download also fine. Best Unsplash backup. |
| **Pixabay** | API key | 100 req/min | Not required, encouraged | Mid — heavier on generic/staged shots | **Must** download, no permanent hotlinking; max 500 results/query. |
| **Burst (Shopify)** | None / no API | n/a | Not required | Mid; commerce-flavoured | **Maintenance mode** — no new photos, library still usable. Manual download only. |
| **Openverse** | Optional | Anonymous = 1 req/sec & ≤20 results/page; authenticated tiers higher | License-dependent (CC-BY etc.) | Variable, includes Wikimedia | Mixed CC licences: each result needs per-image attribution check. |

**Recommendation:** Unsplash primary, Pexels fallback, Pixabay third. Skip Openverse for hero imagery (licence complexity not worth the effort across 100 posts) — use only for niche topical illustrations where Unsplash/Pexels miss.

## 3. Stock-photo selection rubric — UK SMB feel

**Avoid:** generic suit-handshake shots, US license plates, Stars and Stripes, "$" / dollar bills, US-style strip-mall storefronts, big-box chain interiors, US fire hydrants, yellow school buses, red Solo cups, US power outlets, drive-thru cars on the right.

**Prefer:** UK high-street terraces, sash windows, brick frontage with hanging signs, painted shopfronts, independent cafes with espresso machines and tea, mid-century interiors, Victorian/Edwardian shop windows, neutral close-up workspaces (laptop + flat-white), pubs without flag overload, market stalls, Nordic-styled cafes, small workshops, female and ethnically mixed founders.

**Search-term filters that bias UK:**
- Append: `"london"`, `"manchester"`, `"british"`, `"uk high street"`, `"english cafe"`, `"independent shop"`, `"terraced"`.
- Use Unsplash `orientation=landscape` for hero, `content_filter=high`, `color=` parameter for brand harmony.
- Negative-screen at curation time: any visible US flag, dollar sign, state license plate, or recognisable US chain logo → reject.
- For "neutral workspace" posts, prefer `query=desk laptop notebook tea` over generic "office" — kills the American-corporate aesthetic.

## 4. Storage & delivery on Vercel

**Decision: store fetched assets in `/public/images/blog/<slug>/`** committed to git as JPG/WebP. Reasoning:

- **Local images cache better on Vercel.** Local-image cache key is content-hash based; remote-image cache key includes the upstream URL. Local hits avoid round-trips and reduce cache writes.
- **Hobby/Pro Image Optimization budgets (2026):** Hobby = 5K transformations, 300K cache reads, 100K cache writes / month free. Excess on Pro: ~$0.05–$0.0812 per 1K transformations, $0.40–$0.64 per 1M reads, $4.00–$6.40 per 1M writes. Source max 8192×8192, output max 10 MB, accepted formats JPEG/PNG/WebP/AVIF.
- **Bandwidth:** charged separately as Fast Data Transfer + Edge Requests. Self-hosting WebP at ~150 KB hero × 100 posts × N visitors stays inside Hobby fair-use easily; Pro is a no-brainer if traffic grows.
- **CDN best practice:** let `next/image` produce AVIF/WebP variants on demand — do **not** pre-generate every breakpoint. Store one **1600 px wide JPG** master per hero.
- **Why not a remote loader:** depending on Unsplash's CDN at runtime means (a) we eat Unsplash terms forever, (b) any takedown breaks our archive, (c) every visitor to a cold cache pays the upstream round-trip.

## 5. `next/image` configuration

```js
// next.config.mjs
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [360, 640, 768, 1024, 1280, 1600],
  imageSizes: [64, 128, 256, 384],
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
  ], // only needed if any post still hotlinks
}
```

Component pattern for a hero:

```jsx
<Image
  src={`/images/blog/${slug}/hero.jpg`}
  alt={hero.alt}
  width={1600}
  height={900}
  quality={80}                 // required in Next 16
  sizes="(min-width: 1024px) 960px, 100vw"
  placeholder="blur"
  blurDataURL={hero.blurDataURL}
  preload                      // replaces deprecated `priority` in Next 16
/>
```

Generate `blurDataURL` at build with `plaiceholder` (10×10 base64). Next 16 makes `quality` mandatory and deprecates `priority` in favour of `preload`.

## 6. Build-time fetcher script (spec)

Path: `scripts/fetch-blog-images.mjs`. Run via `pnpm run images:sync` before `next build`.

```js
// pseudocode
import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { glob } from 'glob'
import matter from 'gray-matter'
import { getPlaiceholder } from 'plaiceholder'

const KEY = process.env.UNSPLASH_ACCESS_KEY
const APP = 'irvale'

for (const file of await glob('content/blog/**/*.mdx')) {
  const { data } = matter(await fs.readFile(file, 'utf8'))
  const slug = path.basename(file, '.mdx')
  const dir = `public/images/blog/${slug}`
  if (await exists(`${dir}/hero.jpg`)) continue   // idempotent

  // 1. search
  const r = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(data.hero.search)}` +
    `&orientation=landscape&content_filter=high&per_page=10`,
    { headers: { Authorization: `Client-ID ${KEY}` } }
  ).then(r => r.json())
  const pick = r.results[0]                       // or score by tags + colour

  // 2. download 1600w master
  const url = `${pick.urls.raw}&w=1600&fm=jpg&q=80&fit=max`
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer())
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(`${dir}/hero.jpg`, buf)

  // 3. fire download tracking beacon (REQUIRED)
  await fetch(`${pick.links.download_location}?client_id=${KEY}`)

  // 4. write credit json
  await fs.writeFile(`${dir}/hero.credit.json`, JSON.stringify({
    photographer: pick.user.name,
    photographerUrl: `${pick.user.links.html}?utm_source=${APP}&utm_medium=referral`,
    sourceUrl: `${pick.links.html}?utm_source=${APP}&utm_medium=referral`,
    source: 'Unsplash',
    unsplashId: pick.id,
    altSeed: pick.alt_description,
  }, null, 2))

  // 5. blur placeholder
  const { base64 } = await getPlaiceholder(buf)
  await fs.writeFile(`${dir}/hero.blur.txt`, base64)
}
```

Failure path: if Unsplash returns 0 results or 403, fall through to Pexels with the same query then Pixabay. Log every fetched-vs-fallback decision to `scripts/.images.log` for human review.

## 7. OpenGraph image generation

Per-post dynamic OG via `app/blog/[slug]/opengraph-image.jsx`:

```jsx
import { ImageResponse } from 'next/og'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OG({ params }) {
  const post = await getPost(params.slug)
  const cormorant = await fetch(new URL('./CormorantGaramond-SemiBold.ttf', import.meta.url)).then(r => r.arrayBuffer())
  const dmSans = await fetch(new URL('./DMSans-Regular.ttf', import.meta.url)).then(r => r.arrayBuffer())

  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: '#0b0b0b', color: '#f4f1ea', padding: 80, justifyContent: 'space-between' }}>
      <div style={{ fontFamily: 'DM Sans', fontSize: 24, letterSpacing: 4, textTransform: 'uppercase' }}>Irvale</div>
      <div style={{ fontFamily: 'Cormorant', fontSize: 84, lineHeight: 1.05 }}>{post.title}</div>
      <div style={{ fontFamily: 'DM Sans', fontSize: 22, opacity: 0.7 }}>irvale.com / journal</div>
    </div>,
    { ...size, fonts: [
      { name: 'Cormorant', data: cormorant, weight: 600, style: 'normal' },
      { name: 'DM Sans', data: dmSans, weight: 400, style: 'normal' },
    ]}
  )
}
```

**Constraints:** `ImageResponse` bundle ≤500 KB (font + JSX + any embedded images) — ship one weight per family, subset if needed. TTF/OTF only. 1200×630 standard.

## 8. Alt-text patterns (WCAG 2.2 / SC 1.1.1)

Rules: descriptive of *content + relevant context*, ≤125 characters, no "image of" / "photo of" prefix, no keyword-stuffing, end with full stop. Decorative imagery uses `alt=""` and `role="presentation"`. Charts and infographics get long-description via `aria-describedby` or adjacent prose.

Ten exemplar alt strings:

1. "Independent cafe owner in a navy apron leaning on a wooden counter beside a brass espresso machine."
2. "Plumber in branded navy overalls stepping out of a white panel van on a UK terraced street."
3. "Hairdresser sectioning a client's hair at a salon chair under warm filament lighting."
4. "Local florist arranging eucalyptus and white roses on a galvanised steel workbench."
5. "Pub landlord pouring a pint of cask ale at a Victorian wood-panelled bar."
6. "Dentist in pale-blue scrubs reviewing a patient chart on a tablet in a quiet treatment room."
7. "Two co-founders working on a laptop at a shared desk with mugs of tea and a notebook."
8. "Bakery owner sliding a tray of sourdough loaves into a deck oven, flour dusting her forearms."
9. "Dog groomer brushing a wet spaniel on a stainless-steel grooming table."
10. "Bicycle mechanic adjusting rear gears on a workshop stand inside a brick-walled repair shop."

## 9. Image schema, filenames, CLS

- **Filenames:** descriptive kebab-case slug: `hero.jpg`, `inline-01-cafe-owner-counter.jpg`. Search engines do read these.
- **Width/height:** always set `width` and `height` on `<Image>` to reserve aspect-ratio space — kills CLS.
- **`ImageObject` JSON-LD:** worth it for blog hero only. Inside the existing `Article` JSON-LD, set `image` to an `ImageObject` with `url`, `width`, `height`, `caption`, `creditText`, `creator.name`, `copyrightNotice`, `license` (Unsplash licence URL). Skip per-inline schema — diminishing returns.

## 10. Risk + compliance

- **Unsplash/Pexels licences (2026):** free for commercial use, no model release passed through. Cannot sell unaltered copies; cannot imply endorsement; cannot use identifiable people in misleading or sensitive contexts (medical condition implications, illegal activity, derogatory framing). For posts touching health, finance distress, dating, or legal topics, prefer non-identifiable people (back-of-head, hands-only, environmental).
- **Pixabay:** cannot redistribute the image as-is on a competing stock platform; cannot use identifiable people for "sensitive" topics; hotlinking forbidden (always self-host).
- **Trademarks:** stock licence does not clear trademarks visible in shot — avoid Apple logos, Coke cans, Premier League shirts, etc., for hero use.
- **AI imagery:** if we generate any with Midjourney / Imagen / Flux, label visibly in caption ("Illustration generated with [tool]") and flag in `hero.credit.json` (`source: 'ai', model: 'flux-1.1-pro'`). EU AI Act Article 50 transparency obligations apply from August 2026 — material AI imagery must be machine-readably marked. Add `<meta name="generator" content="ai">` on AI-illustrated posts as a forward-compat hedge.
- **Due diligence log:** keep `hero.credit.json` per slug forever — the paper trail.

## 11. Implementation deliverable for Irvale

**Env vars (.env.local):**

```
UNSPLASH_ACCESS_KEY=...
PEXELS_API_KEY=...
PIXABAY_API_KEY=...
NEXT_PUBLIC_SITE_URL=https://irvale.com
```

**npm packages:**
```
pnpm add gray-matter glob plaiceholder sharp
pnpm add -D dotenv
```

**Folder structure:**
```
content/blog/<slug>.mdx
public/images/blog/<slug>/
  hero.jpg
  hero.credit.json
  hero.blur.txt
  inline-01.jpg ...
scripts/
  fetch-blog-images.mjs
  validate-credits.mjs
app/blog/[slug]/opengraph-image.jsx
```

**Sample frontmatter `hero` block:**
```yaml
---
title: "How a Bristol cafe doubled morning covers with one tweak"
slug: "bristol-cafe-morning-covers"
publishedAt: 2026-05-12
hero:
  search: "independent cafe owner london counter morning"
  alt: "Cafe owner in a green apron arranging pastries on a wooden counter at opening time."
  focalPoint: "0.5 0.4"
ogTitle: "Bristol cafe x2 morning covers"
---
```

**Sample build invocation:**
```
pnpm run images:sync && pnpm run build
```

`images:sync` runs `node scripts/fetch-blog-images.mjs`. Re-running is idempotent: existing `hero.jpg` is skipped. Add `pnpm run images:audit` (`scripts/validate-credits.mjs`) to assert every slug folder has the `hero.credit.json` triple (photographer + URL + source) before deploy — block CI if missing.

**Launch order:**
1. Get Unsplash key, run fetcher in demo mode against ~10 posts to validate.
2. Submit Unsplash production application with screenshots showing `<figcaption>` attribution rendering on a real post page.
3. Add Pexels + Pixabay keys for fallback.
4. Wire `app/blog/[slug]/opengraph-image.jsx` and verify with the LinkedIn/Twitter card validators.
5. Add `images:audit` to the Vercel build command so a missing credit file fails the deploy.

## Sources

- [Unsplash API Documentation](https://unsplash.com/documentation)
- [Unsplash API Guidelines](https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines)
- [Unsplash — Triggering a Download](https://help.unsplash.com/en/articles/2511258-guideline-triggering-a-download)
- [Unsplash — Hotlinking Images](https://help.unsplash.com/en/articles/2511271-guideline-hotlinking-images)
- [Unsplash — Production rate limit](https://help.unsplash.com/en/articles/3887917-when-should-i-apply-for-a-higher-rate-limit)
- [Pexels API Documentation](https://www.pexels.com/api/documentation/)
- [Pexels — Unlimited requests](https://help.pexels.com/hc/en-us/articles/900005852323-How-do-I-get-unlimited-requests)
- [Pexels — Crediting photographers](https://help.pexels.com/hc/en-us/articles/360042790533)
- [Pixabay API Documentation](https://pixabay.com/api/docs/)
- [Pixabay Content License](https://pixabay.com/service/license-summary/)
- [Burst by Shopify](https://www.shopify.com/stock-photos)
- [Openverse — Auth and Throttling](https://docs.openverse.org/api/reference/authentication_and_throttling.html)
- [Vercel — Image Optimization Limits and Pricing](https://vercel.com/docs/image-optimization/limits-and-pricing)
- [Next.js — Image Component (App Router)](https://nextjs.org/docs/app/api-reference/components/image)
- [Next.js — opengraph-image file convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [W3C WAI — Alternative Text](https://www.w3.org/WAI/alt/)
