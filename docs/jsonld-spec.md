# JSON-LD Specification — Irvale Studio

> Implementation contract for `src/lib/seo/jsonld.js` and `src/lib/blog/jsonld.js`. Every factory returns a plain object; render via `<JsonLd data={...} />` which accepts an object or array (multiple `<script type="application/ld+json">` per page).

## 0. Constants + helpers

```js
// src/lib/seo/site.js
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://irvale.com';
export const BRAND = {
  name: 'Irvale Studio',
  legalName: 'Irvale Studio Ltd',
  logo: `${SITE_URL}/brand/irvale-logo-mark.png`,        // square 600×600
  description: 'UK + Chiang Mai hybrid digital studio engineering revenue systems for SMBs — websites, AI visibility, conversion, reviews, paid media, and APAC market entry.',
  email: 'hello@irvale.com',
  founders: [{ slug: 'jacob-horgan' }],
  sameAs: [
    'https://www.linkedin.com/company/irvale-studio',
    'https://github.com/jakesjacob',
    // 'https://x.com/...',
  ],
  addresses: [
    { city: 'London', country: 'GB', region: 'Greater London' },
    { city: 'Chiang Mai', country: 'TH', region: 'Chiang Mai' },
  ],
  priceRange: '$$$',                                     // luxury studio
  defaultLanguages: ['en-GB', 'en'],
};

export const absUrl = (path = '/') =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
```

## 1. Site-wide factories — `src/lib/seo/jsonld.js`

### `organizationJsonLd()`

```js
{
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: BRAND.name,
  legalName: BRAND.legalName,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: BRAND.logo, width: 600, height: 600 },
  description: BRAND.description,
  sameAs: BRAND.sameAs,
  contactPoint: [{
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: BRAND.email,
    availableLanguage: ['English', 'Thai', 'Mandarin'],
    areaServed: ['GB', 'EU', 'US', 'AU', 'TH', 'SG', 'HK', 'JP', 'KR'],
  }],
  founder: { '@type': 'Person', '@id': `${SITE_URL}/about/jacob-horgan#person` },
}
```

### `webSiteJsonLd()`

```js
{
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  url: SITE_URL,
  name: BRAND.name,
  publisher: { '@id': `${SITE_URL}#organization` },
  inLanguage: 'en-GB',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}
```

### `localBusinessJsonLd({ city, country, region, slug })`

Emit twice in the root layout — once per office (London, Chiang Mai). Both `branchOf` the parent Organization.

```js
{
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}#location-${slug}`,         // 'location-london' | 'location-chiang-mai'
  name: `Irvale Studio — ${city}`,
  url: SITE_URL,
  branchOf: { '@id': `${SITE_URL}#organization` },
  address: { '@type': 'PostalAddress', addressLocality: city, addressRegion: region, addressCountry: country },
  areaServed: country === 'GB' ? ['GB'] : ['TH', 'SG', 'HK', 'JP', 'KR'],
  priceRange: BRAND.priceRange,
  // openingHoursSpecification, geo if known
}
```

### `breadcrumbJsonLd(items)`

```js
{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absUrl(item.url),
  })),
}
```

### `faqJsonLd(items)` — returns `null` if `items` empty

```js
items?.length ? {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
} : null
```

### `serviceJsonLd({ name, description, url, offers, faq, areaServed })`

For `/services/[pillar]` and `/revenue-engineering`. Includes `OfferCatalog` if `offers` is provided.

```js
{
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${absUrl(url)}#service`,
  name,
  description,
  url: absUrl(url),
  provider: { '@id': `${SITE_URL}#organization` },
  areaServed: areaServed || ['GB','EU','US','AU','TH','SG'],
  hasOfferCatalog: offers ? {
    '@type': 'OfferCatalog',
    name: `${name} — Plans`,
    itemListElement: offers.map(o => ({
      '@type': 'Offer',
      name: o.name,
      priceCurrency: 'USD',
      price: o.price,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'USD',
        price: o.price,
        unitCode: 'MON',
        billingDuration: 'P1M',
      },
      eligibleRegion: o.regions || ['GB','EU','US','AU','TH','SG'],
      availability: 'https://schema.org/InStock',
      description: o.description,
    })),
  } : undefined,
}
```

### `howToJsonLd({ name, description, totalTime, steps })`

```js
{
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name,
  description,
  totalTime,                                       // ISO 8601 duration
  step: steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.name,
    text: s.text,
    url: s.anchor ? `${absUrl(s.pageUrl)}#${s.anchor}` : undefined,
  })),
}
```

### `itemListJsonLd({ name, items })`

```js
{
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    url: absUrl(it.url),
  })),
}
```

### `collectionPageJsonLd({ name, description, url, items })`

For `/services`, `/blog`, `/guides`, `/local`, `/for`, `/resources`.

```js
{
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${absUrl(url)}#collection`,
  name,
  description,
  url: absUrl(url),
  mainEntity: itemListJsonLd({ name, items }),
}
```

### `comparisonJsonLd({ competitorName, advantages, pageUrl, dateModified })`

For `/compare/[slug]`. Pairs with `faqJsonLd` and `breadcrumbJsonLd` on every comparison page.

```js
{
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absUrl(pageUrl)}#comparison`,
  name: `${BRAND.name} vs ${competitorName}`,
  url: absUrl(pageUrl),
  about: { '@id': `${SITE_URL}#organization` },
  mainEntity: {
    '@type': 'CreativeWork',
    name: `${BRAND.name} vs ${competitorName} — Differences`,
    text: advantages.map(a => `${a.title}: ${a.body}`).join(' '),
  },
  dateModified,
  inLanguage: 'en-GB',
}
```

### `webApplicationJsonLd({ name, url, description, category, browserRequirements })`

For `/resources/[slug]` calculator pages.

```js
{
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name,
  url: absUrl(url),
  description,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: category,
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
}
```

### `speakableSelector(selectors = ['.speakable'])`

Embedded inside `WebPage` / `Article` / `BlogPosting`:

```js
{
  speakable: { '@type': 'SpeakableSpecification', cssSelector: selectors }
}
```

## 2. Blog/article factories — `src/lib/blog/jsonld.js`

### `blogPostingJsonLd(post, author)`

This is the load-bearing factory for AI citation. Every field below is one AI engines actually consume.

```js
{
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${absUrl(`/blog/${post.slug}`)}#article`,
  mainEntityOfPage: { '@id': absUrl(`/blog/${post.slug}`) },
  headline: post.title,
  description: post.description,
  image: [{
    '@type': 'ImageObject',
    url: absUrl(`/images/blog/${post.slug}/hero.jpg`),
    width: 1600, height: 900,
    caption: post.hero.alt,
    creditText: post.hero.credit?.photographer,
    license: 'https://unsplash.com/license',
  }],
  datePublished: post.publishedAt,
  dateModified: post.updatedAt,
  author: { '@type': 'Person', '@id': `${absUrl(`/about/${author.slug}`)}#person` },
  publisher: { '@id': `${SITE_URL}#organization` },
  articleSection: post.category,
  keywords: post.tags.join(', '),
  wordCount: post.wordCount,
  inLanguage: 'en-GB',
  ...(post.schema?.speakable && speakableSelector()),
}
```

### `personJsonLd(author)`

For `/about/<slug>`.

```js
{
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${absUrl(`/about/${author.slug}`)}#person`,
  name: author.name,
  givenName: author.givenName,
  familyName: author.familyName,
  url: absUrl(`/about/${author.slug}`),
  image: absUrl(author.avatar),
  jobTitle: author.role,
  worksFor: { '@id': `${SITE_URL}#organization` },
  sameAs: author.sameAs,
  knowsAbout: author.knowsAbout,
  alumniOf: author.alumniOf || undefined,
  hasCredential: (author.credentials || []).map(c => ({
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: c.category,
    name: c.name,
    recognizedBy: c.body ? { '@type': 'Organization', name: c.body } : undefined,
  })),
}
```

### `profilePageJsonLd(author)` wraps `personJsonLd`:

```js
{
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: absUrl(`/about/${author.slug}`),
  mainEntity: personJsonLd(author),
}
```

## 3. Render component — `src/components/seo/JsonLd.jsx`

```jsx
export default function JsonLd({ data }) {
  if (!data) return null;
  const items = Array.isArray(data) ? data.filter(Boolean) : [data].filter(Boolean);
  return items.map((item, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
    />
  ));
}
```

Usage in a blog post page:

```jsx
<JsonLd data={[
  breadcrumbJsonLd(crumbs),
  blogPostingJsonLd(post, author),
  personJsonLd(author),
  faqJsonLd(post.faq),
]} />
```

## 4. Validation gate

`scripts/validate-jsonld.mjs` runs after build, fetches every emitted page, extracts the JSON-LD, and asserts:

- Every page has the required schemas listed in the matrix in `seo-ai-search-strategy.md` §6.
- All `@id` URLs resolve.
- All `image` URLs return 200.
- `dateModified >= datePublished` on every Article/BlogPosting.
- Comparison pages have ≥1 `WebPage`, ≥1 `FAQPage`, ≥1 `BreadcrumbList`.
- No `Review` / `AggregateRating` is emitted on `Organization` or `LocalBusiness` (Google's self-serving rule).

Failure blocks deploy.

## 5. Versioning

When schemas change in this doc, bump the comment header in `src/lib/seo/jsonld.js`:

```js
// Schema spec version: 2026-05-06
```

This makes diffs grep-able when AI-search vendors update their structured-data preferences.
