import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import Marquee from '@/components/ui/Marquee';
import { RevenueEngineeringSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'Revenue Engineering — The Flagship Engagement | Irvale Studio',
  description:
    'A single accountable team for your entire digital funnel. Website, booking software, SEO, AI search, multilingual expansion, reviews, paid media — engineered end-to-end. Website rebuild and Zatrovo booking included at no extra cost.',
};

const stats = [
  { value: '1', label: 'Accountable team' },
  { value: '14', label: 'Capabilities under one roof' },
  { value: '6 wks', label: 'Foundation live' },
  { value: '6 mo', label: 'Minimum engagement' },
];

const takeover = [
  {
    title: 'Website design, build and optimisation',
    body: 'Bespoke build, no template. Rebuilt every quarter against metrics that move revenue.',
  },
  {
    title: 'Booking and customer management',
    body: 'Zatrovo, our own SaaS, runs your bookings under your brand. Included free.',
  },
  {
    title: 'Google Business Profile and local SEO',
    body: 'Profile optimisation, citations, location pages, review velocity. The boring discipline that compounds.',
  },
  {
    title: 'Programmatic SEO and content',
    body: 'AI augmented production at a scale traditional agencies cannot match. Location pages, service pages, FAQ libraries, topical clusters.',
  },
  {
    title: 'AI search visibility (GEO/AEO)',
    body: 'Engineered presence inside ChatGPT, Perplexity, Claude, Gemini and Google AI Overviews. Full GEO programme bundled in.',
  },
  {
    title: 'Multilingual and APAC expansion',
    body: 'Chinese, Korean and Thai market expansion where it fits. Naver, Xiaohongshu and WeChat. The channels Western agencies miss.',
  },
  {
    title: 'Reviews and reputation systems',
    body: 'Automated requests, multi platform monitoring, AI assisted responses. Reviews run as a system, not a hope.',
  },
  {
    title: 'Social media presence',
    body: 'Consistency, not virality. Branded, on cadence, a trust signal buyers check before they book.',
  },
  {
    title: 'Paid advertising',
    body: 'Optional add on. Google, Meta, TikTok and LinkedIn. Managed end to end with conversion tracking that attributes revenue.',
  },
  {
    title: 'Reporting and strategy',
    body: 'Monthly reports tied to revenue. Quarterly strategy reviews. No vanity dashboards.',
  },
];

const phases = [
  {
    n: '01',
    name: 'Discovery',
    cadence: 'Week 1',
    summary:
      'Audit of your current presence. Baseline captured. Gaps identified. Honest read on what works and what leaks.',
    deliverables: [
      'Digital presence audit across every channel',
      'Conversion funnel mapping and leak analysis',
      'Baseline metrics: bookings, traffic, citation share, review velocity',
      'Competitor benchmark across the same surfaces',
      'Prioritised remediation plan with effort and impact scoring',
    ],
  },
  {
    n: '02',
    name: 'Foundation',
    cadence: 'Weeks 2 to 6',
    summary:
      'Website rebuilt. Booking live. Profiles optimised. Tracking in place. The substrate everything else compounds on.',
    deliverables: [
      'Bespoke website rebuild launched live',
      'Zatrovo booking platform configured and embedded',
      'Google Business Profile and local SEO foundation',
      'Schema markup, JSON-LD architecture and AI crawler policy',
      'GA4, server side tracking and attribution architecture',
      'Review request automation deployed',
    ],
  },
  {
    n: '03',
    name: 'Compounding',
    cadence: 'Month 3 onwards',
    summary:
      'Content at scale. Ongoing optimisation. Channel expansion. Monthly reports, quarterly strategy. The phase where investment turns into rankings, citations and bookings.',
    deliverables: [
      'Programmatic SEO and content rollout against the topical map',
      'AI search visibility programme and citation outreach',
      'APAC channel expansion when it fits the buyer',
      'Monthly performance review tied to revenue',
      'Quarterly strategy reset and roadmap',
      'Continuous CRO and on page iteration',
    ],
  },
];

const principles = [
  {
    label: 'Single accountability',
    body: 'One team owns the funnel. No blame games between vendors. When something breaks, you call one number.',
  },
  {
    label: 'Tech and strategy combined',
    body: 'Most agencies are creative shops or technical implementers. We are both. We design the funnel and ship the code that runs it.',
  },
  {
    label: 'Owned infrastructure',
    body: 'We built our own SaaS. Zatrovo handles bookings, payments and messaging. Included free, not outsourced. Fixed when you need it fixed.',
  },
  {
    label: 'AI augmented production',
    body: 'Modern workflows produce content and optimise at a volume traditional agencies cannot match. Lower hours per output, higher cadence per retainer dollar.',
  },
  {
    label: 'Skin in the game',
    body: 'Monthly reporting on real metrics. Bookings, revenue, enquiries, citation share. No vanity numbers.',
  },
  {
    label: 'Small client list',
    body: 'We work with a small number of clients at a time. Each one gets a senior team, not a junior on rotation.',
  },
];

const pricing = [
  {
    name: 'Foundation',
    price: 'from $1,450',
    cadence: 'per month · six month minimum',
    summary:
      'For owner operators who want the funnel professionally run without hiring a marketing team. Website rebuild and Zatrovo included free.',
    includes: [
      'Bespoke website rebuild, launched live',
      'Zatrovo booking under your brand, included free',
      'Google Business Profile and local SEO',
      'Reviews and reputation system',
      'Schema, AI crawler policy, baseline GEO',
      'Monthly performance report',
    ],
  },
  {
    name: 'Growth',
    featured: true,
    price: 'from $3,450',
    cadence: 'per month · six month minimum',
    summary:
      'For businesses ready to compound. Full content engine, AI search visibility, email lifecycle. Where most clients settle after six months.',
    includes: [
      'Everything in Foundation',
      'Programmatic SEO and topical map at scale',
      'Full AI search visibility programme (GEO/AEO)',
      'Email and CRM lifecycle (Klaviyo, Mailchimp or Resend)',
      'Content retainer of four to eight pieces per month',
      'Quarterly strategy reviews with the founder',
    ],
  },
  {
    name: 'Bespoke',
    price: 'from $5,500',
    cadence: 'per month · twelve month minimum',
    summary:
      'For multi location or multi market businesses. Includes paid media and APAC expansion. Scoped to the brand, category and competitive set.',
    includes: [
      'Everything in Growth',
      'Paid media: Google, Meta, TikTok, LinkedIn',
      'APAC expansion (Naver, Xiaohongshu, WeChat)',
      'Dedicated account manager',
      'Multi location coordination',
      'Custom dashboards and server side attribution',
    ],
  },
];

const wedontdo = [
  'We are not a traditional creative agency churning out viral campaigns. Different discipline. Different deliverables.',
  'We do not pretend to have decades of experience. We are a small, technically-strong team using modern AI workflows. That is the advantage, not the apology.',
  'We will not promise rank #1 in 30 days or 10× your bookings overnight. SEO and AI visibility compound on a 90-day floor.',
  'We work with a small number of clients at a time. If we are at capacity, we will say so and recommend someone honest.',
];

export default function RevenueEngineeringPage() {
  return (
    <main>
      <RevenueEngineeringSchema />
      {/* Hero */}
      <section className="relative bg-dark pt-32 pb-[var(--section-gap)] overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,169,110,0.15),transparent_60%),radial-gradient(ellipse_at_70%_70%,rgba(201,169,110,0.10),transparent_60%)]" />

        <div
          className="relative mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-6 block">The Flagship Engagement</Eyebrow>
          <RevealText
            as="h1"
            className="font-display font-normal italic text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[1000px] mb-6"
          >
            One accountable team for your entire digital funnel.
          </RevealText>
          <p className="font-body text-[length:var(--type-body-lg)] text-text-muted-light font-light max-w-2xl mb-10">
            We own your digital funnel end to end and engineer every step for measurable revenue. Website, booking, search, AI visibility, reviews, paid media, reporting. One team. One number to call.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/contact" className="btn-primary">
              <span>Book a Discovery Call →</span>
            </Link>
            <Link href="#pricing" className="btn-outline">
              <span>See Engagement Tiers →</span>
            </Link>
          </div>

          <SectionReveal className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-[var(--border-dark)]">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-[clamp(32px,4vw,56px)] text-gold leading-none mb-2">
                  {s.value}
                </p>
                <p className="font-body text-xs text-text-muted-light uppercase tracking-[var(--type-label-ls)]">
                  {s.label}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Marquee divider */}
      <div className="bg-dark-2 py-5 border-y border-[var(--border-dark)]">
        <Marquee
          items={[
            'Website',
            'Booking',
            'SEO',
            'AI Search',
            'Reviews',
            'Email',
            'Paid Media',
            'APAC Expansion',
            'Analytics',
            'Strategy',
          ]}
          separator="·"
          className="font-display text-[length:var(--type-body)] text-gold/30 tracking-[0.12em]"
          speed={90}
        />
      </div>

      {/* The Problem */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <SectionReveal className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <Eyebrow className="mb-6 block">The Problem</Eyebrow>
              <h2 className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)]">
                Most businesses have a fragmented digital presence.
              </h2>
            </div>
            <div className="md:col-span-7 space-y-5">
              <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light leading-relaxed">
                A web designer built the site three years ago. Someone&apos;s nephew runs the Facebook page. The owner half-manages Google. There is a booking system, or there are three. There is no schema, no AI search strategy, and no one knows whether the contact form is actually delivering email.
              </p>
              <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light leading-relaxed">
                When something stops working, no one is responsible for the whole funnel. The web designer blames the SEO consultant. The SEO consultant blames the platform. The owner is left translating between vendors who do not speak to each other and have no shared incentive to fix the leak.
              </p>
              <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light leading-relaxed">
                Revenue Engineering replaces all of that with a single accountable team. We become the one number to call.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* What We Take Over */}
      <section className="bg-dark py-[var(--section-gap)] border-y border-[var(--border-dark)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="mb-14 max-w-2xl">
            <Eyebrow className="mb-6 block">What We Take Over</Eyebrow>
            <RevealText
              as="h2"
              className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] mb-4"
            >
              Ten components, owned end-to-end.
            </RevealText>
            <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light">
              Every layer of the funnel, run by one team. Website and Zatrovo booking are included free at every tier — the value-stack you would otherwise pay for separately.
            </p>
          </div>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-dark)]">
            {takeover.map((t, i) => (
              <div key={i} className="bg-dark p-7 lg:p-8">
                <span className="font-display text-gold/40 text-base block mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl leading-snug text-text-light mb-3">
                  {t.title}
                </h3>
                <p className="font-body text-sm text-text-muted-light font-light leading-relaxed">
                  {t.body}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="mb-14 max-w-2xl">
            <Eyebrow className="mb-6 block">How It Works</Eyebrow>
            <RevealText
              as="h2"
              className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)]"
            >
              Discovery. Foundation. Compounding.
            </RevealText>
          </div>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-[var(--grid-gap)]">
            {phases.map((p) => (
              <div key={p.n} className="bg-white border border-[var(--border-light)] p-8">
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="font-display text-gold-muted text-2xl">{p.n}</span>
                  <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark">
                    {p.name}
                  </h3>
                </div>
                <p className="font-body text-[11px] uppercase tracking-[0.18em] text-gold-muted mb-5">
                  {p.cadence}
                </p>
                <p className="font-body text-sm text-text-muted-dark font-light leading-relaxed mb-6">
                  {p.summary}
                </p>
                <ul className="space-y-2">
                  {p.deliverables.map((d, di) => (
                    <li
                      key={di}
                      className="font-body text-xs text-text-muted-dark font-light leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-2 before:h-px before:bg-gold-muted"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-dark py-[var(--section-gap)] border-y border-[var(--border-dark)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <SectionReveal className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <Eyebrow className="mb-6 block">Who It&apos;s For</Eyebrow>
              <h2 className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)]">
                Owner-operators who want a partner, not five vendors.
              </h2>
            </div>
            <div className="md:col-span-7 space-y-5">
              <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light leading-relaxed">
                Small-to-medium businesses doing roughly $6k to $60k monthly revenue. Service-based, hospitality, wellness, fitness, professional services. Multi-location welcome. Founders who want one accountable partner instead of managing a vendor stack of five.
              </p>
              <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light leading-relaxed">
                Particularly suited to businesses in Thailand and Southeast Asia targeting a mix of local, expat, and international (Chinese, Korean, Western) markets. We operate from Chiang Mai and London — meaning we know both buyer cultures, and which channels each one actually uses.
              </p>
              <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light leading-relaxed">
                If your funnel is stitched together with three platforms and four contractors, this is the engagement that consolidates it.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Why This Works */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="mb-14 max-w-2xl">
            <Eyebrow className="mb-6 block">Why This Works</Eyebrow>
            <RevealText
              as="h2"
              className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)]"
            >
              Six principles. One operating model.
            </RevealText>
          </div>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {principles.map((p) => (
              <div key={p.label}>
                <p className="font-body text-[11px] uppercase tracking-[0.18em] text-gold-muted mb-3">
                  {p.label}
                </p>
                <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-dark py-[var(--section-gap)] border-y border-[var(--border-dark)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="mb-6 block">Engagement Tiers</Eyebrow>
            <RevealText
              as="h2"
              className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] mb-4"
            >
              Three tiers. One value stack.
            </RevealText>
            <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light">
              Website rebuild and Zatrovo booking are included free at every tier. The retainer covers the team and the discipline that runs the funnel.
            </p>
          </div>

          <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-[var(--grid-gap)]">
            {pricing.map((p) => (
              <div
                key={p.name}
                className={`p-8 md:p-10 ${
                  p.featured
                    ? 'border border-gold bg-[rgba(201,169,110,0.05)] md:-translate-y-3'
                    : 'border border-white/10 bg-dark-2/40'
                }`}
              >
                {p.featured && (
                  <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gold block mb-4">
                    Most chosen
                  </span>
                )}
                <h3 className="font-display text-2xl text-text-light mb-3">{p.name}</h3>
                <p className="font-display text-3xl text-gold leading-none mb-1">{p.price}</p>
                <p className="font-body text-[11px] uppercase tracking-[0.16em] text-text-muted-light/70 mb-6">
                  {p.cadence}
                </p>
                <p className="font-body text-sm text-text-muted-light font-light leading-relaxed mb-6">
                  {p.summary}
                </p>
                <ul className="space-y-2 pt-6 border-t border-white/10">
                  {p.includes.map((d, di) => (
                    <li
                      key={di}
                      className="font-body text-xs text-text-muted-light font-light leading-relaxed pl-5 relative before:content-['✓'] before:absolute before:left-0 before:top-0 before:text-gold/70"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </SectionReveal>

          <p className="font-body text-xs text-text-muted-light/60 font-light mt-10 max-w-3xl">
            Indicative starting prices. Scopes are sized to the brand, the category and the competitive set. Multi-location estates and enterprise engagements quoted individually. Pricing is in USD and excludes VAT where applicable.
          </p>
        </div>
      </section>

      {/* What We Don't Do */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="mb-6 block">What We Don&apos;t Do</Eyebrow>
            <RevealText
              as="h2"
              className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)]"
            >
              Honest about the edges of the engagement.
            </RevealText>
          </div>
          <SectionReveal className="space-y-5 max-w-3xl">
            {wedontdo.map((line, i) => (
              <p
                key={i}
                className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light leading-relaxed pl-6 relative before:content-['—'] before:absolute before:left-0 before:top-0 before:text-gold-muted"
              >
                {line}
              </p>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)] text-center"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <RevealText
            as="h2"
            className="font-display font-normal italic text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[800px] mx-auto justify-center mb-6"
          >
            One team. One funnel. One number to call.
          </RevealText>
          <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light max-w-xl mx-auto mb-10">
            Book a 30-minute discovery call. We will walk through your current presence, baseline the gaps, and tell you honestly whether Revenue Engineering is the right shape of engagement for you.
          </p>
          <Link href="/contact" className="btn-primary px-10">
            <span>Book a Discovery Call →</span>
          </Link>
          <p className="font-body text-xs text-text-muted-light/50 mt-6">
            We respond within 24 hours.
          </p>
        </div>
      </section>
    </main>
  );
}
