# MDX Components — Irvale Studio

> Whitelist of React components exposed inside `.mdx` content. Anything not on this list will not render. The whitelist lives in `src/components/blog/MDXComponents.jsx` and is imported by every MDX renderer.

## 1. `<Speakable>`

Wraps the answer-first paragraph after each H2. Renders as `<p class="speakable">…</p>`. The Speakable JSON-LD selector reads `.speakable` on the page.

```mdx
## How long does Google Maps SEO take in the UK?

<Speakable>
Most UK SMBs see Map Pack movement within 4–8 weeks if their Google Business Profile is verified, primary category is correct, and they earn 5–10 reviews in the period. Service Area Businesses can take 8–12 weeks because Google leans more on prominence signals.
</Speakable>

Below the answer, expand on each lever in turn...
```

## 2. `<Callout>`

```mdx
<Callout variant="insight" title="Quick win">
  Verifying via the GBP video flow now takes 2–4 days instead of the old postcard's
  2–3 weeks. If you're starting today, pick video.
</Callout>
```

Variants: `insight` (gold border), `tip` (green), `warning` (amber), `danger` (red). Renders an uppercase eyebrow label using the `--type-label` token.

## 3. `<Comparison>`

The flagship table for `/compare/*` pages and any side-by-side post.

```mdx
<Comparison
  caption="Fresha vs Treatwell — UK salons (2026)"
  headers={["Feature", "Fresha", "Treatwell"]}
  rows={[
    ["Commission on new clients", "20% (Marketplace listing)", "20–30% (Treatwell Connect)"],
    ["Subscription cost", "Free for core software", "From £35/month + commission"],
    ["Deposit handling", "Native, Stripe-backed", "Native, but routed via Treatwell"],
    ["Cancellation rules", "Studio-set", "Studio-set within Treatwell limits"],
    ["UK customer support", "Email + phone, UK hours", "Email + phone, UK hours"],
  ]}
/>
```

Renders a bordered HTML `<table>` with sticky first column on mobile. Every comparison post must have ≥1.

## 4. `<Stats>`

Sourced metric grid. AI engines extract these as cited stats — `source` is non-optional.

```mdx
<Stats items={[
  { value: "26%", label: "Of AI-cited content is fresher than top classical search picks", source: "Profound, 2026" },
  { value: "40%", label: "More AI citations earned by content with author credentials", source: "Qwairy E-E-A-T study, 2026" },
  { value: "200ms", label: "INP threshold for 'good' Core Web Vitals (failed by 43% of sites)", source: "web.dev, 2026" },
]} />
```

## 5. `<CTA>`

Brand gradient card linking to `/contact`, `/revenue-engineering`, or another product surface.

```mdx
<CTA
  href="/revenue-engineering"
  label="See how Revenue Engineering bundles this in"
  sublabel="$1,450 / $3,450 / $5,500 per month — website + Zatrovo included"
/>
```

## 6. `<FAQ>`

Mirrors the schema FAQ. Always render the same items as the FAQPage JSON-LD; the build script asserts equality.

```mdx
<FAQ items={[
  { q: "How much does a UK web designer charge per day?", a: "..." },
  { q: "Is Squarespace SEO good enough for a small business?", a: "..." },
]} />
```

Renders as native `<details>` accordions for accessibility + AI extractability.

## 7. `<Figure>`

Captioned image with credit:

```mdx
<Figure
  src="/images/blog/google-maps-seo-uk-guide/inline-01-gbp-categories.jpg"
  alt="Google Business Profile primary category dropdown showing 'Plumber' as the selected option."
  caption="Choosing the wrong primary category is the single most common GBP suspension trigger."
  credit="Photo by Stephen Phillips on Unsplash"
  creditUrl="https://unsplash.com/@hostreviews?utm_source=irvale&utm_medium=referral"
  width={1600}
  height={900}
/>
```

`credit` and `creditUrl` are required when the image came from a stock library; auto-populated from `hero.credit.json` for hero images.

## 8. `<KeywordTable>`

Compact two-column table for keyword matrices inside content.

```mdx
<KeywordTable
  rows={[
    ["GEO", "Generative Engine Optimisation — getting cited inside AI-generated answers"],
    ["AEO", "Answer Engine Optimisation — answering specific questions at the top of a page"],
    ["LLMO", "Large Language Model Optimisation — being correctly represented in model training data"],
  ]}
/>
```

## 9. Native overrides

- `<a href>` → `next/link` with prefetch; external links automatically get `target="_blank" rel="noopener noreferrer"` and a small NE arrow icon.
- `<img>` → `next/image` with content-derived width/height when not supplied; throws build error if `alt` is missing.
- `<table>` → adds responsive horizontal scroll on mobile + striped rows.
- `<blockquote>` → adds left gold rule + `<cite>` styling.
- Headings → `rehype-slug` IDs + autolink anchors.
- Code blocks → `rehype-pretty-code` with `github-dark-dimmed`, `keepBackground: false`, `transformers` for line numbers + diff markers.

## 10. What's NOT exposed in MDX (deliberately)

- Raw HTML — strip via `rehype-sanitize` with the Irvale allowlist.
- `<script>` — never.
- Custom client-side widgets that aren't on this whitelist. (Calculators on `/resources/<slug>` are loaded by slug from `src/components/calculators/`, not from MDX.)
- Inline styles — use Tailwind utilities through component props only.

## 11. Source of truth

```jsx
// src/components/blog/MDXComponents.jsx
import Link from 'next/link';
import Image from 'next/image';
import Speakable from './Speakable';
import Callout from './Callout';
import Comparison from './Comparison';
import Stats from './Stats';
import CTA from './CTA';
import FAQ from './FAQ';
import Figure from './Figure';
import KeywordTable from './KeywordTable';

export const mdxComponents = {
  Speakable, Callout, Comparison, Stats, CTA, FAQ, Figure, KeywordTable,
  a: ({ href, children, ...rest }) => {
    const isExternal = /^https?:/.test(href);
    return isExternal
      ? <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
      : <Link href={href} {...rest}>{children}</Link>;
  },
  img: (props) => {
    if (!props.alt) throw new Error(`Image missing alt: ${props.src}`);
    return <Image {...props} sizes="(min-width:1024px) 960px, 100vw" />;
  },
};
```
