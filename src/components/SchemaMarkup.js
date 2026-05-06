// Schema spec version: 2026-05-06
//
// Legacy compatibility shims. Site-wide Organization, WebSite, and
// LocalBusiness schemas are now emitted by the root layout via
// `<JsonLd />` + factories in `src/lib/seo/jsonld.js`.
//
// New code should import directly from `@/lib/seo/jsonld` and render with
// `<JsonLd />` from `@/components/seo/JsonLd`. The exports below remain for
// existing callsites in /revenue-engineering and /work/[slug].

import JsonLd from '@/components/seo/JsonLd';
import { absUrl, SITE_URL, BRAND } from '@/lib/seo/site';
import { serviceJsonLd } from '@/lib/seo/jsonld';

// /revenue-engineering — delegates to the new serviceJsonLd factory.
export function RevenueEngineeringSchema() {
  const data = serviceJsonLd({
    name: 'Revenue Engineering',
    description:
      'One accountable team for your entire digital funnel. Website, booking software, SEO, AI search, multilingual expansion, reviews, paid media and reporting, engineered end to end. Bespoke website rebuild and Zatrovo booking platform included at every tier.',
    url: '/revenue-engineering',
    areaServed: ['GB', 'EU', 'US', 'AU', 'TH', 'SG'],
    offers: [
      {
        name: 'Foundation',
        price: '1450',
        description: 'Starting from, 6-month minimum',
      },
      {
        name: 'Growth',
        price: '3450',
        description: 'Starting from, 6-month minimum',
      },
      {
        name: 'Bespoke',
        price: '5500',
        description: 'Starting from, 12-month minimum',
      },
    ],
  });

  return <JsonLd data={data} />;
}

// /work/[slug] — case-study CreativeWork. Kept inline; fixed canonical domain
// and now rendered via the hardened JsonLd component.
export function CreativeWorkSchema({ name, description, image, datePublished }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    image,
    datePublished,
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: BRAND.name,
      url: SITE_URL,
    },
  };

  return <JsonLd data={data} />;
}

// Removed (now redundant with root-layout schemas or unused):
//   - LocalBusinessSchema  → replaced by site-wide localBusinessJsonLd × 2
//   - ServiceSchema        → unused; tier copy migrated into pages/factories
//   - FAQPageSchema        → unused; new pages use faqJsonLd from @/lib/seo/jsonld

// Helper for absolute work-image URLs at callsites.
export const workImageUrl = (path) => absUrl(path);
