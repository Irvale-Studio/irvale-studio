import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import JsonLd from '@/components/seo/JsonLd';
import { absUrl } from '@/lib/seo/site';
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
} from '@/lib/seo/jsonld';

const CITIES = [
  {
    slug: 'london',
    city: 'London',
    region: 'Greater London',
    blurb:
      '33 boroughs, 33 competitive sets. The sharpest local SEO market in the UK, with top-three Map Pack thresholds now at 80 to 140 reviews and 18 plus months of profile maturity.',
  },
  {
    slug: 'manchester',
    city: 'Manchester',
    region: 'Greater Manchester',
    blurb:
      'Northern Quarter, Ancoats and Ardwick concentrate the central competition. Inner suburbs (Withington, Chorlton, Didsbury) are wide open. Strong indie press citation gravity.',
  },
  {
    slug: 'edinburgh',
    city: 'Edinburgh',
    region: 'Edinburgh, City of',
    blurb:
      'Old Town and New Town behave as separate markets. Tripadvisor matters in EH1, barely registers in EH10. August festival demand reshapes hospitality search by 3 to 5x.',
  },
  {
    slug: 'bristol',
    city: 'Bristol',
    region: 'Bristol, City of',
    blurb:
      'Harbourside, Stokes Croft and Clifton concentrate the buyer demand. Bristol 24/7 and the Bristol Cable carry unusually strong AI-citation weight for category recommendations.',
  },
];

export const metadata = {
  title: 'Local SEO + Google Maps · UK Cities · Irvale Studio',
  description:
    'Local SEO and Google Maps optimisation for UK small businesses, tuned to the city you actually trade in. London, Manchester, Edinburgh, Bristol — and more launching soon.',
  alternates: { canonical: absUrl('/local') },
  openGraph: {
    title: 'Local SEO + Google Maps · UK Cities · Irvale Studio',
    description:
      'Local SEO and Google Maps optimisation for UK small businesses, tuned to the city you actually trade in.',
    url: absUrl('/local'),
    type: 'website',
  },
};

export default function LocalHubPage() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Local SEO', url: '/local' },
    ]),
    collectionPageJsonLd({
      name: 'Local SEO + Google Maps — UK Cities',
      description:
        'Hub of city-specific Local SEO and Google Maps engagements at Irvale Studio.',
      url: '/local',
      items: CITIES.map((c) => ({ name: c.city, url: `/local/${c.slug}` })),
    }),
  ];

  return (
    <main>
      <JsonLd data={jsonLd} />

      <section className="relative bg-dark pt-32 pb-[var(--section-gap)] overflow-hidden noise-overlay">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,169,110,0.18),transparent_60%),radial-gradient(ellipse_at_70%_70%,rgba(201,169,110,0.10),transparent_60%)]" />
        <div className="relative mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <Eyebrow className="mb-6 block">Local SEO · UK Cities</Eyebrow>
          <h1 className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[900px] mb-6">
            Google Maps optimisation, tuned to the city you actually trade in.
          </h1>
          <p className="font-body text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-muted-light font-light max-w-[60ch]">
            UK Local SEO is not one market. London competition runs at 80 plus reviews to enter the Map Pack; Bristol’s outer postcodes need 25 to 40. We tune the engagement to the city, the borough and the buyer profile that actually drives your bookings.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link href="/services/local-seo" className="btn-primary">
              <span>Local SEO capability →</span>
            </Link>
            <Link href="/revenue-engineering" className="btn-outline">
              <span>See Revenue Engineering →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-[var(--section-gap)]">
        <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="max-w-2xl mb-14">
            <Eyebrow className="mb-4 block">Cities we cover</Eyebrow>
            <h2 className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)]">
              Pick your market.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/local/${c.slug}`}
                className="group bg-white border border-[var(--border-light)] rounded-sm p-8 md:p-10 hover:border-gold/40 transition-colors"
              >
                <div className="flex items-baseline justify-between mb-4">
                  <Eyebrow>{c.region}</Eyebrow>
                  <span className="font-body text-[length:var(--type-body-sm)] text-gold-muted group-hover:text-gold transition-colors">
                    Read →
                  </span>
                </div>
                <h3 className="font-display font-normal text-text-dark text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] mb-4">
                  {c.city}
                </h3>
                <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light leading-relaxed">
                  {c.blurb}
                </p>
              </Link>
            ))}
          </div>

          <p className="mt-12 font-body text-[length:var(--type-body-sm)] text-text-muted-dark font-light max-w-2xl">
            Birmingham, Leeds, Glasgow, Cardiff and Belfast city pages are in the build queue. For other UK cities or service-area businesses, talk to us about a tailored engagement.
          </p>
        </div>
      </section>
    </main>
  );
}
