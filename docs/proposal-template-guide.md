# Proposal Page Template Guide

How to scaffold a client proposal page that lands close to final on the first pass. Distilled from the Crystal Aura and Black Cap Production builds.

---

## When to use this

Any new client website / Revenue Engineering proposal. Lives as a static HTML page under `public/proposals/<slug>/index.html` and renders at `/proposals/<slug>` via the rewrite in `next.config.mjs`.

**Reference builds:**
- `public/proposals/crystal-aura/index.html` — full Revenue Engineering pitch (longer)
- `public/proposals/black-cap/index.html` — website-redesign pitch (shorter, lots of visual graphics)

Start by copying the closest existing build, then prune.

---

## File + routing

- Path: `public/proposals/<client-slug>/index.html` (lowercase, hyphenated slug).
- Pretty URL works because of this rewrite in `next.config.mjs`:
  ```js
  async rewrites() {
    return [
      { source: '/proposals/:slug', destination: '/proposals/:slug/index.html' },
    ];
  }
  ```
- Add `<meta name="robots" content="noindex, nofollow">` — proposals are confidential, never indexed.
- Title: `A <type> proposal for <Client> | Irvale Studio`
- Description: `A <type> proposal prepared by Irvale Studio for <Client>.`
- Theme color: `#111111` (or page-specific dark).

---

## Visual identity (do not redesign per client)

Same tokens across every proposal. Branded, premium, repeatable.

**Colors:**
- `--color-dark: #0E0E0E` / `--color-dark-2: #161616`
- `--color-cream: #F5F0E8` / `--color-cream-2: #EDE8DF`
- `--color-gold: #C9A96E` / `--color-gold-light: #D9BC89` / `--color-gold-muted: #A8895A`
- `--color-good: #7FB069` / `--color-warn: #D9A05B` / `--color-bad: #B5604E`

**Fonts (load from Google):**
- Display: `Cormorant Garamond` (300/400 + italics) — headings, italic body accents.
- Body: `Raleway` (300/400/500/600) — UI, body, **prices**, buttons.

**Critical font rule:** prices use **body font** (Raleway 500), not display italic. Display italic prices are hard to read — every client will say so. Letter-spacing -0.01em.

**Type scale:** see CSS variables `--type-display`, `--type-h1`, `--type-h2`, `--type-h3`, `--type-body-lg`, `--type-body`, `--type-body-sm`, `--type-label`.

**Layout:** `--max-width: 1320px`, `--gutter: clamp(24px, 5vw, 80px)`, `--section-gap: clamp(72px, 12vw, 140px)`.

---

## Section pattern (alternating backgrounds)

Always alternate `section--dark` ↔ `section--cream`. CSS auto-adds a thin gold-gradient divider between *consecutive same-bg sections* — required so two darks (or two creams) in a row still read as separate beats.

Standard order for a website-redesign pitch:

| # | Section | Bg | Eyebrow |
|---|---------|----|---------|
| — | Hero | dark | (no number) |
| 1 | Brief | cream | `01 · The brief` |
| 2 | Amplify (scorecards + pillars + visuals) | dark | `02 · The amplification` |
| 3 | Process | dark *(divider above)* | `03 · Process` |
| 4 | Investment (pricing) | cream | `04 · Investment` |
| 5 | Next steps | dark | `05 · Next steps` |
| 6 | Recent builds | cream | `06 · Recent builds` |
| — | Footer | dark-2 | — |

Eyebrow numbers always match section position (excluding hero/footer).

---

## Hero

- Constellation canvas backdrop (copy verbatim from black-cap — the JS works, don't reinvent).
- Brand line: `Irvale Studio · <proposal type>` (e.g. "Website redesign", "Revenue Engineering proposal").
- Title pattern: `A <type> proposal for <em>Client Name</em>.` Client name in italic gold.
- **No subtitle.** Hero gets killed every time — even outcome-led ones. Brand line + title + meta row carries the hero alone.
- Meta row: Prepared (date), For (client), By (Jake · Irvale Studio).

---

## Brief section

- Title: keep it project-name simple. `Client Name — <Project Type>.` (e.g. "Black Cap Production — Website Upgrade.")
- **No subtitle/lead**. Clients always strike it.
- Two columns: "What works today" / "Where the gap sits". 4–5 short bullets each.
- Honest tone — name real strengths before naming gaps.

---

## Amplify section (the proof / vision)

This is the most visual section. Three blocks:

### 1. Before/After scorecards

- Two cards side by side, gold arrow between.
- Left card: "Today · `<domain>`" — current Lighthouse-style scores in rings.
- Right card: "After · Irvale rebuild" — `90+` across all rings (don't claim 98/100 — too specific, indefensible if they re-test).
- Tags below: left card = greyed/struck (`Schema`, `Sitemap`, `AEO/GEO`, `Case studies`, `Hardened headers`); right card = gold `+ Schema`, `+ Sitemap`, etc.

**Score numbers — get real ones, do not fabricate:**

```bash
cd /tmp && npx --yes lighthouse https://<domain>/ \
  --quiet \
  --chrome-flags="--headless=new --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --output-path=./lh.json \
  --form-factor=mobile --throttling-method=simulate
```

Then extract:
```bash
cat /tmp/lh.json | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const j=JSON.parse(d);const c=j.categories;console.log('PERF='+Math.round(c.performance.score*100));console.log('ACC='+Math.round(c.accessibility.score*100));console.log('BP='+Math.round(c['best-practices'].score*100));console.log('SEO='+Math.round(c.seo.score*100));})"
```

PageSpeed Insights API at `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?...` is rate-limited on the shared key — local Lighthouse is the reliable path.

**"AI ready" ring** — fabricate. There is no industry metric. Use `40` for the before card. Acknowledge to the client (if asked) that it's an Irvale composite.

### 2. Pillar cards (4 across)

Click-to-expand. Bodies hidden by default, `+` icon rotates to `×` on open. Always 4 cards:

1. **Speed** — Core Web Vitals · Pass
2. **Security** — A+ · Headers locked
3. **Discoverability & AI** — Schema · OG · AEO/GEO  *(combine these two — never split into separate cards)*
4. **Design** — Editorial · Cinematic

Body copy is one sentence each, ~15 words. AEO/GEO is positioned as `Active programme is an optional add-on when you're ready` — never call it an "upsell" in client-facing copy.

### 3. Visual graphics (at least one, ideally two)

Pure CSS/SVG mockups. No third-party tools.

- **Site mockup** (browser-frame card): chrome dots + URL bar, big video/hero panel with pulsing gold play button + caption, faint text-line placeholders, 4-tile media grid below. Implies their assets driving the build.
- **Conversion funnel**: three tapering bars (100% → 80% → 60% width), gold gradient deepening, with `Attract → Engage → Convert` labels and an output pill ("New lead in your inbox"). Sells lead conversion / revenue impact.

These graphics carry the section more than copy does. Always include eyebrow + one short italic line above each.

---

## Process section

Four phases, dead simple. **No tech claims.** Plain English titles, 1–2 bullets each.

| # | Title | Timing |
|---|-------|--------|
| 01 Discovery | `Audit, brief, and direction` | Day 1 |
| 02 Design | `Look and feel` | Days 2–3 |
| 03 Build | `Build it` | Days 3–12 |
| 04 Launch | `Sign-off and launch` | Final 1–2 days |

Bullets: max 1–2 per phase, plain language. Examples:
- "Quick audit of the current site."
- "Brief call to align on goals and direction."
- "Visual direction agreed before build starts."
- "Site built out with regular updates and reviews along the way."
- "Final review, sign-off, and site goes live."

**Do not** mention specific tech (Lighthouse, schema names, CSP headers, etc.) in the process section — those belong in the Amplify pillars.

**No subtitle** under the section title.

---

## Investment / Pricing

### Title
`Choose the package that works for you.` *(no subtitle)*

### Three tiers, always in this order

1. **Starter** — entry tier
2. **Business** — middle, marked `✶ Recommended ✶`
3. **Professional** — top tier

Names always Starter / Business / Professional. Don't use Polish / Studio / Cinematic or Essential / Signature / Cinematic — those got rejected.

### Tier card spec

- **No tier label** ("TIER 01 · ESSENTIAL" etc.) — strip it.
- **No tagline** under tier name — strip it.
- Just: `<h3>` name → price → "ONE TIME PAYMENT" chip → USD line → timeline pill → rule → single italic pitch line → *(no CTA button)*.

### Price formatting

- Use body font (Raleway 500), not display italic.
- Drop the "From" prefix.
- Format: `<big number>` + `THB` (smaller body font), then `ONE TIME PAYMENT` gold chip below.
- USD line: `≈ USD <conv> at current rates` — italic, muted. Use ~35 THB/USD as the rough conversion at time of writing (May 2026); recompute for the actual rate when sending.

### Default Black Cap pricing (use as anchors, scale per client)

| Tier | THB | USD | Timeline |
|------|-----|-----|----------|
| Starter | 4,899 | ~138 | 5–7 days |
| Business | 9,899 | ~280 | 7–10 days |
| Professional | 18,899 | ~540 | 10–14 days |

Larger Revenue Engineering engagements (Crystal Aura model) follow a different structure — ongoing monthly fee + bundled assets. Use that template instead.

### Pitch lines (one each)

Frame around **time invested**, not deliverables. Every package delivers a great site; tiers differ in depth/refinement.

- Starter: `The essentials, done well. A focused build to get you live, fast.`
- Business: `More time on design, depth, and polish. The right balance for most.`
- Professional: `Maximum time, depth, and refinement. Every detail considered.`

### Care plan card (separate, below the three tiers)

Minimal. Centered. Just:
- Eyebrow: `Care plan · all packages`
- Big price: `699 THB / **month**` — body font, "month" in bold.
- Nothing else. No bullets, no "Add care plan" CTA, no feature list.

### Pricing note (small print below)

Three short paragraphs:
1. **One-off build fees, all-inclusive.** Design, build, schema, security, analytics, launch, and handover are all in the tier price. No surprise add-ons.
2. **Site is yours.** Source, content, and assets remain `<Client>`'s. Self-host any time; care plan is opt-in.
3. **AI search programme.** Foundations are baked in. The active monthly AEO/GEO programme is quoted separately when you're ready to layer it on.

---

## Next steps

- Eyebrow only (no h2). Drop "If this lands, here's how we start." style headlines.
- 4 simple steps, decimal-leading-zero counter style:
  1. Decide on the tier that fits your budget.
  2. Project kick-off call and agreement on the brief and direction.
  3. Build starts, updates and reviews throughout.
  4. Final review and sign-off. Hosting and launch.
- **No bottom CTAs.** No "Reply to proposal" / "Back to pricing" buttons. Empty space below the list.

---

## Recent builds (last content section)

Cream bg. Title: `See some of our website builds.`

Two cards minimum, side by side:
- **Use the existing project hero images already in the repo** under `/public/images/projects/<slug>-hero.webp`. They're tuned, optimised, and already shown on the homepage. Source list lives in `src/lib/data/projects.js`.
  - Zatrovo → `/images/projects/zatrovo-hero.webp`
  - BOXX Thailand → `/images/projects/boxx-hero.webp`
  - Reya Lashes, Commu, CMGT, Dynamic Golf Academy etc. — same naming pattern.
- **Do not** use third-party screenshot services (mshots, thum.io, etc.). They get stuck on "Generating Preview" and look broken to clients.
- `LIVE` badge top-left over the image (gold border, dark blurred bg).
- Meta below: site name in display, one-line description, `Visit site →` link.
- Whole card is the link, opens new tab.
- Subtle 1.03x scale on hover.

**Default cards** (use these for any production / video / creative client):
- **Zatrovo** — https://zatrovo.com/ — `Booking SaaS. Multi-language, programmatic SEO, AI-search ready.`
- **BOXX Muay Thai** — https://www.boxxthailand.com/ — `Premium Muay Thai gym in Chiang Mai. Booking, video, multilingual.`

Swap or add cards for industry-specific relevance.

---

## Footer

- Brand: `Irvale. Studio` (gold dot)
- Tagline: `Premium websites for operators who care about craft.`
- Contact: `jake@irvale.com` / `irvale.com` / `Chiang Mai · UK · Remote`
- Confidential line: `This proposal is confidential and prepared specifically for <Client>.`
- Auto-set © year via JS (`document.getElementById('year').textContent = new Date().getFullYear()`).

---

## Nav

- Brand link → `https://irvale.com` (target=_blank, rel=noopener) — never `#top`.
- Section links: Brief, Amplify, Process, Pricing, Next *(skip Builds + Footer)*.
- Mobile mirrors desktop links. Hide-on-scroll-down behaviour already in JS.

---

## Banned phrases / patterns

These get struck through every time. Don't use them.

- **`hand-coded`** / `hand coded` — anywhere. Use `engineered` or just describe outcome.
- **`reels`** as a noun for video — say `videos`. ("Reel-led hero" → "Video-led hero")
- **Cliché triplets** like "Cinematic. Fast. Discoverable." in subtitles.
- **`upsell`** in client copy — use `add-on`.
- **Specific Lighthouse claims like 98/100/100/95** — say `90+` instead. Defensible.
- **`If this lands…`** style headlines — direct beats coy.
- **Tier labels like "TIER 01 · ESSENTIAL"** — they read as filler.
- **Tier taglines under names** ("A flagship production-house site…") — clients strike them.
- **Long bullet lists in pricing tiers** — single italic pitch line beats 6 bullets.
- **"From" prefix** on prices — sounds hedgy, drop it.
- **Display italic for prices** — illegible. Body font 500.
- **About-Irvale section in short proposals** — cut. Footer + recent builds carry the credibility.
- **"What's included" accordion in short proposals** — pillars + tiers cover it.

---

## Always-included technical bits

- `meta name="robots" content="noindex, nofollow"`
- `lang="en" translate="no"` on `<html>`
- `prefers-reduced-motion` respected on every animation (constellation, score rings, pillar plus rotation, video play pulse, scroll reveals).
- `@media print` rules: hide nav/canvas/scroll, force dark sections white, force accordions/pillars open.
- IntersectionObserver `.reveal` system with `data-delay="1|2|3"` increments.
- Scrollspy on `section[id], header[id]`.
- Process rail `scaleY()` fill on scroll (only when reduced motion not set).

---

## Pre-send checklist

1. Date in hero meta = today (absolute, not relative).
2. Client name spelt correctly in: title tag, meta description, hero, footer confidential line, mailto subjects.
3. Real Lighthouse scores plugged into "before" card.
4. USD price conversions recomputed against current THB rate.
5. All `mailto:` subjects URL-encoded with package name (`Black%20Cap%20%C2%B7%20Starter%20package`).
6. No "hand-coded" / no "reels" / no "upsell" anywhere — `Grep` to be sure.
7. Section pattern is dark/cream alternating with auto-divider on consecutive same-bg.
8. Eyebrow numbers (`01 ·` through `06 ·`) match section order exactly.
9. Hero brand link goes to https://irvale.com (not `#top`).
10. Pretty URL works: hit `/proposals/<slug>` locally and confirm 200 (the rewrite must be in `next.config.mjs`).
11. Hard-refresh after every edit — Next dev server caches static `public/` files aggressively.

---

## When the dev server breaks

If `/proposals/<slug>` 404s after edits:
1. Confirm file exists at `public/proposals/<slug>/index.html`.
2. Confirm rewrite block is present in `next.config.mjs`.
3. Kill orphan `next dev` (npm wrapper kill won't kill child) — `taskkill //PID <pid> //F`.
4. Restart `npm run dev`.
5. The rewrite requires a server restart on config change.
