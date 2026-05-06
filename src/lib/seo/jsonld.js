// Schema spec version: 2026-05-06

import { SITE_URL, BRAND, absUrl } from './site';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: BRAND.logo,
      width: 600,
      height: 600,
    },
    description: BRAND.description,
    sameAs: BRAND.sameAs,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: BRAND.email,
        availableLanguage: ['English', 'Thai', 'Mandarin'],
        areaServed: ['GB', 'EU', 'US', 'AU', 'TH', 'SG', 'HK', 'JP', 'KR'],
      },
    ],
    founder: {
      '@type': 'Person',
      '@id': `${SITE_URL}/about/jacob-horgan#person`,
    },
  };
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: BRAND.name,
    publisher: { '@id': `${SITE_URL}#organization` },
    inLanguage: 'en-GB',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function localBusinessJsonLd({ city, country, region, slug }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}#location-${slug}`,
    name: `Irvale Studio — ${city}`,
    url: SITE_URL,
    branchOf: { '@id': `${SITE_URL}#organization` },
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: region,
      addressCountry: country,
    },
    areaServed:
      country === 'GB' ? ['GB'] : ['TH', 'SG', 'HK', 'JP', 'KR'],
    priceRange: BRAND.priceRange,
  };
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absUrl(item.url),
    })),
  };
}

export function faqJsonLd(items) {
  if (!items?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function serviceJsonLd({ name, description, url, offers, faq, areaServed }) {
  const node = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absUrl(url)}#service`,
    name,
    description,
    url: absUrl(url),
    provider: { '@id': `${SITE_URL}#organization` },
    areaServed: areaServed || ['GB', 'EU', 'US', 'AU', 'TH', 'SG'],
  };

  if (offers) {
    node.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${name} — Plans`,
      itemListElement: offers.map((o) => ({
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
        eligibleRegion: o.regions || ['GB', 'EU', 'US', 'AU', 'TH', 'SG'],
        availability: 'https://schema.org/InStock',
        description: o.description,
      })),
    };
  }

  // `faq` accepted in API surface for symmetry; emit alongside via JsonLd array.
  // Intentionally not embedded here per spec; pages emit FAQPage as a sibling node.
  void faq;

  return node;
}

export function howToJsonLd({ name, description, totalTime, steps }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: s.anchor ? `${absUrl(s.pageUrl)}#${s.anchor}` : undefined,
    })),
  };
}

export function itemListJsonLd({ name, items }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: absUrl(it.url),
    })),
  };
}

export function collectionPageJsonLd({ name, description, url, items }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absUrl(url)}#collection`,
    name,
    description,
    url: absUrl(url),
    mainEntity: itemListJsonLd({ name, items }),
  };
}

export function comparisonJsonLd({ competitorName, advantages, pageUrl, dateModified }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absUrl(pageUrl)}#comparison`,
    name: `${BRAND.name} vs ${competitorName}`,
    url: absUrl(pageUrl),
    about: { '@id': `${SITE_URL}#organization` },
    mainEntity: {
      '@type': 'CreativeWork',
      name: `${BRAND.name} vs ${competitorName} — Differences`,
      text: advantages.map((a) => `${a.title}: ${a.body}`).join(' '),
    },
    dateModified,
    inLanguage: 'en-GB',
  };
}

export function webApplicationJsonLd({ name, url, description, category, browserRequirements }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url: absUrl(url),
    description,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: category,
    operatingSystem: 'All',
    browserRequirements: browserRequirements || 'Requires JavaScript',
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
  };
}

export function speakableSelector(selectors = ['.speakable']) {
  return {
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: selectors,
    },
  };
}
