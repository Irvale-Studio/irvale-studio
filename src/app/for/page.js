import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import JsonLd from '@/components/seo/JsonLd';
import { absUrl } from '@/lib/seo/site';
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
} from '@/lib/seo/jsonld';

const INDUSTRIES = [
  {
    slug: 'plumbers',
    title: 'UK Plumbers',
    group: 'Trades',
    blurb:
      'Direct GBP bookings beating Checkatrade and Bark, cost per booked job halved, review velocity matched to job volume.',
  },
  {
    slug: 'electricians',
    title: 'UK Electricians',
    group: 'Trades',
    blurb:
      'NICEIC and NAPIT signalling, EV charger installation pipeline, landlord EICR retainer revenue, commercial-grade lead capture.',
  },
  {
    slug: 'builders',
    title: 'UK Builders + Construction',
    group: 'Trades',
    blurb:
      'Project gallery as conversion engine, lead-quality scoring on enquiries, FMB signalling, Map Pack for renovation queries.',
  },
  {
    slug: 'restaurants',
    title: 'UK Restaurants',
    group: 'Hospitality',
    blurb:
      'Deposit-taking direct bookings beating OpenTable, Map Pack for "near me" food intent, recovery email lifting repeat covers.',
  },
  {
    slug: 'pubs',
    title: 'UK Pubs',
    group: 'Hospitality',
    blurb:
      'Sunday roast Map Pack, beer garden marketing, table booking with deposits on parties of six plus, midweek events calendar.',
  },
  {
    slug: 'cafes',
    title: 'UK Independent Cafes',
    group: 'Hospitality',
    blurb:
      'Map Pack for "coffee near me", brunch and breakfast service pages, owner photo strategy, loyalty layer that compounds.',
  },
  {
    slug: 'salons',
    title: 'UK Hair + Beauty Salons',
    group: 'Beauty',
    blurb:
      'Deposit-taking booking, Fresha and Treatwell migration, no-show recovery, Map Pack for "hair salon near me".',
  },
  {
    slug: 'dentists',
    title: 'UK Dental Practices',
    group: 'Healthcare',
    blurb:
      'GDC and CMA-compliant by default. Treatment-specific landing pages, AI search citation work, new patient acquisition.',
  },
  {
    slug: 'solicitors',
    title: 'UK Solicitors + Law Firms',
    group: 'Professional',
    blurb:
      'SRA Code-compliant marketing. Practice-area landing pages, conveyancing and family law search, review velocity inside the Code.',
  },
  {
    slug: 'accountants',
    title: 'UK Accountants + Bookkeepers',
    group: 'Professional',
    blurb:
      'Productised pricing pages, MTD-aware service pages, niche-vertical positioning, ICAEW and ACCA signalling.',
  },
];

const GROUPS = ['Trades', 'Hospitality', 'Beauty', 'Healthcare', 'Professional'];

export const metadata = {
  title: 'Industry Playbooks · UK SMBs · Irvale Studio',
  description:
    'Marketing engineered around the failure modes specific to your industry. UK plumbers, electricians, restaurants, salons, dental practices, solicitors and more.',
  alternates: { canonical: absUrl('/for') },
  openGraph: {
    title: 'Industry Playbooks · UK SMBs · Irvale Studio',
    description:
      'Marketing engineered around the failure modes specific to your industry.',
    url: absUrl('/for'),
    type: 'website',
  },
};

export default function IndustriesHubPage() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/for' },
    ]),
    collectionPageJsonLd({
      name: 'Industry Playbooks — UK SMBs',
      description:
        'Hub of industry-specific marketing engagements at Irvale Studio.',
      url: '/for',
      items: INDUSTRIES.map((i) => ({ name: i.title, url: `/for/${i.slug}` })),
    }),
  ];

  return (
    <main>
      <JsonLd data={jsonLd} />

      <section className="relative bg-dark pt-32 pb-[var(--section-gap)] overflow-hidden noise-overlay">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,169,110,0.18),transparent_60%),radial-gradient(ellipse_at_70%_70%,rgba(201,169,110,0.10),transparent_60%)]" />
        <div className="relative mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <Eyebrow className="mb-6 block">Industry Playbooks</Eyebrow>
          <h1 className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[900px] mb-6">
            Marketing engineered around the failure modes specific to your trade.
          </h1>
          <p className="font-body text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-muted-light font-light max-w-[60ch]">
            A plumber, a pub, a dental practice and a solicitor share almost no marketing reality. Different intent funnels, different review platforms, different regulatory frameworks. The playbook starts with the way your buyers actually find and choose your category.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link href="/revenue-engineering" className="btn-primary">
              <span>See Revenue Engineering →</span>
            </Link>
            <Link href="/contact" className="btn-outline">
              <span>Talk to us →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-[var(--section-gap)]">
        <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          {GROUPS.map((group) => {
            const items = INDUSTRIES.filter((i) => i.group === group);
            if (!items.length) return null;
            return (
              <div key={group} className="mb-16 last:mb-0">
                <Eyebrow className="mb-6 block">{group}</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((i) => (
                    <Link
                      key={i.slug}
                      href={`/for/${i.slug}`}
                      className="group bg-white border border-[var(--border-light)] rounded-sm p-7 md:p-8 hover:border-gold/40 transition-colors flex flex-col"
                    >
                      <h3 className="font-display font-normal text-text-dark text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] mb-4">
                        {i.title}
                      </h3>
                      <p className="font-body text-[length:var(--type-body-sm)] text-text-muted-dark font-light leading-relaxed flex-1">
                        {i.blurb}
                      </p>
                      <span className="mt-6 font-body text-[length:var(--type-body-sm)] text-gold-muted group-hover:text-gold transition-colors">
                        Read the playbook →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <p className="mt-4 font-body text-[length:var(--type-body-sm)] text-text-muted-dark font-light max-w-2xl">
            Don’t see your industry yet? Most engagements still start the same way — discovery call, audit, scoped engagement. Talk to us and we’ll size the work to where your buyers actually live.
          </p>
        </div>
      </section>
    </main>
  );
}
