import { notFound } from 'next/navigation';
import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import PostCard from '@/components/blog/PostCard';
import JsonLd from '@/components/seo/JsonLd';
import { getAllPosts } from '@/lib/content/blog';
import { absUrl } from '@/lib/seo/site';
import {
  breadcrumbJsonLd,
  serviceJsonLd,
  localBusinessJsonLd,
  faqJsonLd,
  collectionPageJsonLd,
} from '@/lib/seo/jsonld';

// ─────────────────────────────────────────────────────────────────────────────
// City stubs for /local/[city]. Hub-and-spoke SEO IA.
// Quality bar: lead must reference real local geography (boroughs, named
// districts, real high streets). No "vibrant local economy" filler.
// ─────────────────────────────────────────────────────────────────────────────

const CITIES = {
  london: {
    city: 'London',
    region: 'Greater London',
    country: 'GB',
    population: '8.9 million',
    descriptor:
      'There is no single Map Pack in London — there are 33 boroughs, each with their own competitive set, search density and local intent. A plumber ranking in Hackney is invisible in Hammersmith. We engineer the GBP graph borough by borough, prioritise the ten postcodes that drive your bookings, and contend with the sharpest local SEO competition in the UK. The benchmark for top-3 Map Pack visibility in central London now sits at roughly 80 to 140 reviews and a profile that has been continuously verified for 18 months or more.',
    bullets: [
      {
        title: 'Borough-level GBP architecture',
        body: 'One Google Business Profile is rarely enough in London. We design the multi-location or service-area structure across the boroughs that buy from you — Camden, Islington, Westminster, Tower Hamlets, Southwark — without triggering Google\'s duplicate-listing flag.',
      },
      {
        title: 'Review velocity calibrated to London competition',
        body: 'Top-three Map Pack slots in central London now demand 80 to 140 reviews and a steady drumbeat of fresh ones. We install the request flow tuned to your transaction volume so you compound, not stall.',
      },
      {
        title: 'Citation cleanup across the directories that still count',
        body: 'Yell, Thomson Local, Bing Places, Apple Business Connect, FreeIndex, plus the niche directories your category buys from (Tripadvisor for hospitality, Bark for trades, FindAPro for clinics). NAP reconciled across all of them.',
      },
      {
        title: 'AI search citation work for London queries',
        body: 'When buyers ask ChatGPT or Perplexity for the best plumber in Clapham or the best dentist near Liverpool Street, the answer is being written. We engineer schema, entity reconciliation and citation sources so your name is cited.',
      },
    ],
    faq: [
      {
        q: 'How long does Local SEO take to rank a London business in the Map Pack?',
        a: 'For a service-area business in a competitive central London borough, expect 12 to 20 weeks to a stable top-three position, conditional on review velocity (4 to 8 new reviews monthly), a verified GBP, the correct primary category, and a website that ships LocalBusiness schema. For outer boroughs and smaller niches the window shrinks to 8 to 14 weeks. New profiles or recently suspended ones add 30 to 60 days because Google\'s sandboxing applies harder in London than anywhere else in the UK.',
      },
      {
        q: 'How many reviews does my London business need to rank?',
        a: 'In central London for trades, hospitality, beauty and clinics: 80 to 140 reviews puts you in the top-three Map Pack consideration set, with velocity (new reviews in the last 90 days) often weighing more than total count. For outer boroughs the threshold drops to 40 to 80. The single biggest mistake London SMBs make is buying a one-time burst of reviews and stopping — Google\'s freshness signal punishes that. We run a steady flow of 4 to 8 new reviews monthly, sustained over the year.',
      },
      {
        q: 'Do I need a London-specific landing page?',
        a: 'Not for a single-location business actually based in London — your homepage and a properly built GBP do the work. For multi-location operators, yes: a London hub page with sub-pages for the boroughs you serve, each with unique content, embedded local schema, and a real reason for the page to exist (locally specific case studies, named team members, contact details). Generic city-name pages with paragraph-level keyword swaps are exactly what Google\'s Helpful Content Update was built to demote.',
      },
    ],
  },
  manchester: {
    city: 'Manchester',
    region: 'Greater Manchester',
    country: 'GB',
    population: '2.8 million (Greater Manchester)',
    descriptor:
      'Manchester\'s independent scene is concentrated in the Northern Quarter, Ancoats and Ardwick, with strong category competition in the city centre and surprisingly thin density in the inner suburbs (Withington, Chorlton, Didsbury). We tune the Map Pack strategy to where your buyers actually live, not where your shopfront sits, and treat the city\'s strong indie media scene (Manchester Evening News, Confidentials, the Mill) as a citation source AI engines weight heavily.',
    bullets: [
      {
        title: 'Northern Quarter, Ancoats + Didsbury split strategy',
        body: 'Map Pack competition in central Manchester is dense; in the inner suburbs it\'s wide open. We map the ten postcodes that drive your bookings and prioritise effort by competitive ratio, not vanity coverage.',
      },
      {
        title: 'Local press citation strategy',
        body: 'Manchester has unusually strong independent media — Manchester Evening News, Confidentials, the Mill, I Love MCR. AI search engines lean on these citations heavily. We brief your story so the press place actually mentions you when buyers ask Perplexity for the best in town.',
      },
      {
        title: 'GBP rebuilt to Manchester search behaviour',
        body: 'Primary category, attributes, services and Q&A engineered to the search intent we see in the Manchester catchment — short queries, strong "near me" usage, heavy Maps preference over organic.',
      },
      {
        title: 'Review velocity matched to Manchester competition',
        body: 'Top-three Map Pack in central Manchester typically demands 50 to 90 reviews. We install the request flow and steady the cadence so you compound past the local ceiling.',
      },
    ],
    faq: [
      {
        q: 'How competitive is Local SEO in Manchester?',
        a: 'High in central Manchester (M1 to M4), moderate in Salford and the inner suburbs, low to moderate in Trafford, Stockport and Bury. The competition gradient is steep. A trade business based in M3 will face 30 to 60 well-optimised competitors in their primary category; the same business serving Stockport will face 8 to 15. We size the engagement to where you actually buy from, so you\'re not paying central Manchester rates for a Map Pack you don\'t need.',
      },
      {
        q: 'Should I list my Manchester business on Confidentials and the Mill?',
        a: 'Where the editorial fit is genuine, yes. AI search engines (Perplexity, ChatGPT, Claude) lean heavily on Manchester\'s independent press as citation sources for "best of" queries — far more than they lean on Yell or Thomson Local. A genuine editorial mention from the Mill or Manchester Confidentials is now worth roughly 15 to 25 generic directory listings in AI citation lift. We brief your story, but we don\'t buy placements.',
      },
      {
        q: 'How long until a Manchester business ranks in the Map Pack?',
        a: 'For service businesses outside central Manchester (Trafford, Stockport, Bury), 6 to 10 weeks to a stable top three, given a verified GBP, correct category, and 4 to 6 new reviews monthly. For central Manchester (M1 to M4) categories, 12 to 18 weeks because the top three slots are typically held by businesses with 60 plus reviews and 18 plus months of profile maturity. Suspended or recently rebuilt profiles add another 30 to 45 days.',
      },
    ],
  },
  edinburgh: {
    city: 'Edinburgh',
    region: 'Edinburgh, City of',
    country: 'GB',
    population: '530,000',
    descriptor:
      'Edinburgh divides into two operating realities for Local SEO: the Old Town and Royal Mile catchment dominated by tourist-driven hospitality, and the Princes Street, Stockbridge, Morningside catchment driven by resident SMBs. We treat them as different markets — different category mixes, different review platforms (Tripadvisor matters in EH1, barely registers in EH10), different competitor sets. The Edinburgh Festival in August also reshapes search demand by 3 to 5x for hospitality categories every year.',
    bullets: [
      {
        title: 'Old Town vs New Town strategy split',
        body: 'EH1 and EH8 (Royal Mile, Old Town) are tourist-driven, English-language plus international, Tripadvisor-heavy. EH3 to EH10 (New Town, Stockbridge, Morningside) are resident-led, Google-dominant, less Tripadvisor-dependent. We tune accordingly.',
      },
      {
        title: 'Festival season demand modelling',
        body: 'August demand for hospitality, beauty and clinic categories in EH1 to EH3 lifts 3 to 5x. We build the GBP attributes, service catalogue and review request cadence so your profile is ready to absorb the demand, not invisible inside it.',
      },
      {
        title: 'Edinburgh-specific citation sources',
        body: 'The Skinny, Edinburgh Live, the Scotsman, plus Visit Scotland for relevant categories. AI engines pull heavily on Edinburgh\'s editorial press for category recommendations.',
      },
      {
        title: 'Reviews in a low-volume, high-competition market',
        body: 'Edinburgh\'s smaller resident base means fewer monthly transactions, which puts a ceiling on review velocity. We install the request flow tuned for sub-100-transaction-month businesses so you still compound past local competitors.',
      },
    ],
    faq: [
      {
        q: 'Does the Edinburgh Festival actually move Local SEO?',
        a: 'For hospitality, beauty and clinics in EH1 to EH3, yes — measurably. August search demand lifts 3 to 5x in those categories, and the temporary visitor profile shifts the search behaviour (longer queries, more "near me" usage, higher Tripadvisor click-through). We see GBP profiles that are well-optimised heading into July land 30 to 50 percent more bookings during the festival than ones that scramble in late July. The work to capture festival demand needs to be done in May and June, not August.',
      },
      {
        q: 'How important is Tripadvisor for Edinburgh businesses?',
        a: 'Critical for Old Town hospitality (EH1, EH8), modest for New Town hospitality, near-zero for resident-led services in Morningside, Stockbridge or Leith. The rule we use: if more than 30 percent of your bookings come from visitors staying fewer than 7 nights, prioritise Tripadvisor reviews alongside Google. For everyone else, concentrate review velocity on Google and treat Tripadvisor as a secondary channel.',
      },
      {
        q: 'How long until Local SEO ranks an Edinburgh business?',
        a: 'For most resident-facing categories in New Town, Stockbridge, Morningside, Leith: 8 to 14 weeks to a stable top-three Map Pack position, given the standard prerequisites (verified GBP, correct primary category, 3 to 5 new reviews monthly). For Old Town hospitality where Tripadvisor and tour operator listings matter alongside Google, 12 to 20 weeks. The lower transaction volume in Edinburgh versus London or Manchester slows review accumulation, which is the main rate-limit.',
      },
    ],
  },
  bristol: {
    city: 'Bristol',
    region: 'Bristol, City of',
    country: 'GB',
    population: '480,000',
    descriptor:
      'Bristol\'s Local SEO map is shaped by three centres of buyer demand: the harbourside and city centre (BS1), the Stokes Croft, Montpelier, Gloucester Road belt (BS6, BS7) where the indie scene concentrates, and Clifton (BS8) for premium-leaning categories. The independent scene is unusually strong relative to city size — Bristol 24/7 and the Bristol Cable rank as named citation sources for AI engines on category queries — and the buyer profile skews younger and more progressive than equivalent UK cities, which changes copy and offer expectations.',
    bullets: [
      {
        title: 'BS1, BS6 + BS8 split strategy',
        body: 'Bristol\'s buyer demand concentrates in the harbourside, the Gloucester Road belt and Clifton. We map your ten highest-value postcodes and tune the GBP service area + on-page geo signals to match.',
      },
      {
        title: 'Independent press citation work',
        body: 'Bristol 24/7, the Bristol Cable, BBC Bristol — AI engines treat these as named local citations. We brief your story so genuine editorial mentions land where buyers (and AI crawlers) read them.',
      },
      {
        title: 'Buyer-profile-led copy',
        body: 'Bristol skews younger, more values-led and more independent-friendly than most UK cities of similar size. Generic "established 1996" trust copy under-converts here. We rewrite hero, services and contact CTAs against that profile.',
      },
      {
        title: 'Review velocity for Bristol competition',
        body: 'Central Bristol top-three Map Pack typically lands at 40 to 80 reviews; the wider catchment, 20 to 50. We size the request flow accordingly, no over-engineering for competition that does not exist.',
      },
    ],
    faq: [
      {
        q: 'Is Bristol genuinely competitive for Local SEO?',
        a: 'Moderately. Central Bristol (BS1) and Clifton (BS8) carry meaningful Map Pack competition for trades, hospitality and clinics — 15 to 35 well-optimised competitors per category typically. The Gloucester Road belt (BS6, BS7) is less crowded, with 8 to 18 serious competitors per category, often run by indie operators. The wider Bristol catchment (BS3 to BS5, BS9 to BS16) drops to 5 to 12 serious competitors. We size effort to where your buyers actually live, not the postcode you happen to trade from.',
      },
      {
        q: 'Do Bristol-specific citation sources matter?',
        a: 'Yes, more than in most UK cities. Bristol 24/7 and the Bristol Cable both rank as named local citation sources for ChatGPT and Perplexity on category queries — we have tracked them in citations 4 to 6 times more often than Yell or FreeIndex listings. The local NHS and BBC Bristol, where editorially appropriate, weight even higher. Genuine editorial mentions in any of those is worth pursuing if the story is real; paid placement schemes are not.',
      },
      {
        q: 'How long for a Bristol SMB to rank in the Map Pack?',
        a: 'For most categories outside central Bristol: 8 to 12 weeks to a stable top-three position given a verified GBP, correct primary category, and 3 to 5 new reviews monthly. Central Bristol categories (BS1, BS8) run 12 to 18 weeks because the top slots are typically held by mature profiles with 50 plus reviews. Service-area businesses covering the wider catchment can land top-three in 10 to 14 weeks if the GBP service area is configured correctly and the on-page service pages are unique per area.',
      },
    ],
  },
};

const CITY_SLUGS = Object.keys(CITIES);

export const dynamicParams = false;

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const data = CITIES[city];
  if (!data) return {};
  const title = `Google Maps Optimisation in ${data.city} · Irvale Studio`;
  const description = `Local SEO and Google Maps optimisation for ${data.city} small businesses. Map Pack ranking, GBP recovery, review velocity and citation work tuned to the ${data.region} market.`;
  return {
    title,
    description,
    alternates: { canonical: absUrl(`/local/${city}`) },
    openGraph: {
      title,
      description,
      url: absUrl(`/local/${city}`),
      type: 'website',
    },
  };
}

export default async function CityPage({ params }) {
  const { city } = await params;
  const data = CITIES[city];
  if (!data) notFound();

  const posts = getAllPosts({ category: 'local-seo' });
  const url = `/local/${city}`;
  const heading = `Google Maps Optimisation in ${data.city}`;

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Local SEO', url: '/local' },
      { name: data.city, url },
    ]),
    serviceJsonLd({
      name: heading,
      description: `Local SEO and Google Maps optimisation for ${data.city} small businesses.`,
      url,
      areaServed: [data.city],
    }),
    localBusinessJsonLd({
      city: data.city,
      country: data.country,
      region: data.region,
      slug: city,
    }),
    faqJsonLd(data.faq),
    collectionPageJsonLd({
      name: `${heading} — Field Notes`,
      description: `Field notes from Irvale Studio on Local SEO in ${data.city}.`,
      url,
      items: posts.map((p) => ({ name: p.title, url: `/blog/${p.slug}` })),
    }),
  ];

  return (
    <main>
      <JsonLd data={jsonLd} />

      {/* Dark hero */}
      <section className="relative bg-dark pt-32 pb-[var(--section-gap)] overflow-hidden noise-overlay">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,169,110,0.18),transparent_60%),radial-gradient(ellipse_at_70%_70%,rgba(201,169,110,0.10),transparent_60%)]" />
        <div className="relative mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <nav aria-label="Breadcrumb" className="mb-8 font-body text-[length:var(--type-caption)] uppercase tracking-[0.1em] text-text-muted-light">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-gold">Home</Link></li>
              <li aria-hidden="true" className="text-gold/50">/</li>
              <li><Link href="/local" className="hover:text-gold">Local SEO</Link></li>
              <li aria-hidden="true" className="text-gold/50">/</li>
              <li className="text-text-light/80">{data.city}</li>
            </ol>
          </nav>

          <Eyebrow className="mb-6 block">Local SEO · {data.region}</Eyebrow>
          <h1 className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[900px] mb-6">
            {heading}
          </h1>
          <p className="speakable font-body text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-muted-light font-light max-w-[60ch] !text-text-muted-light !border-gold">
            {data.descriptor}
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link href="/revenue-engineering" className="btn-primary">
              <span>See Revenue Engineering →</span>
            </Link>
            <Link href="/services/local-seo" className="btn-outline">
              <span>Local SEO capability →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* What ranking takes */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="max-w-2xl mb-14">
            <Eyebrow className="mb-4 block">What ranking in {data.city} takes</Eyebrow>
            <h2 className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)]">
              Built for the {data.city} buyer, not a national template.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {data.bullets.map((b, i) => (
              <div key={i} className="border-l-2 border-gold/60 pl-6">
                <h3 className="font-display font-normal text-text-dark text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] mb-3">
                  {b.title}
                </h3>
                <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light leading-relaxed">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Field notes */}
      <section className="bg-[var(--color-cream-2)] py-[var(--section-gap)] border-y border-[var(--border-light)]">
        <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="max-w-2xl mb-12">
            <Eyebrow className="mb-4 block">Field notes</Eyebrow>
            <h2 className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)]">
              Writing on Local SEO.
            </h2>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-[var(--border-light)] rounded-sm p-10 text-center bg-white/40">
              <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light max-w-md mx-auto">
                More writing coming. Subscribe via the footer or follow the{' '}
                <Link href="/blog" className="text-gold-muted underline underline-offset-4 decoration-gold/40 hover:text-gold">
                  Field Notebook
                </Link>{' '}
                for the latest.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-dark py-[var(--section-gap)] noise-overlay relative overflow-hidden">
        <div className="relative mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="max-w-2xl mb-12">
            <Eyebrow className="mb-4 block">Frequently asked</Eyebrow>
            <h2 className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)]">
              The questions {data.city} owners ask first.
            </h2>
          </div>
          <div className="max-w-3xl">
            {data.faq.map((item, i) => (
              <details key={i} className="group border-b border-[var(--border-dark)]">
                <summary className="w-full py-6 flex items-center justify-between text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-body text-[length:var(--type-body)] text-text-light font-light pr-8">
                    {item.q}
                  </span>
                  <span className="text-gold text-xl shrink-0 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-6">
                  <p className="font-body text-sm text-text-muted-light font-light leading-relaxed max-w-2xl">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="relative bg-dark rounded-sm border border-gold/30 px-8 md:px-14 py-16 md:py-20 overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_70%_30%,rgba(201,169,110,0.18),transparent_60%)]" />
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:items-end">
              <div className="md:col-span-8">
                <Eyebrow className="mb-4 block">Bundle this in</Eyebrow>
                <h2 className="font-display font-normal italic text-text-light text-[clamp(28px,3.2vw,42px)] leading-tight mb-4">
                  Get {data.city} Local SEO run alongside the rest of the funnel.
                </h2>
                <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light max-w-2xl">
                  Revenue Engineering bundles Local SEO with website, booking, reviews, AI search and reporting under one accountable team. From $1,450 a month, three month minimum.
                </p>
              </div>
              <div className="md:col-span-4 flex flex-wrap gap-3 md:justify-end">
                <Link href="/revenue-engineering" className="btn-primary">
                  <span>See Revenue Engineering →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
