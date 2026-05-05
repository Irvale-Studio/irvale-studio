import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import Marquee from '@/components/ui/Marquee';
import { RevenueEngineeringSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'Revenue Engineering · The Flagship Engagement | Irvale Studio',
  description:
    'Discovery and conversion, owned end to end as one system. Website, booking, SEO, AI search, multilingual content, reviews. Engineered for measurable revenue. Website rebuild and Zatrovo booking included free.',
};

const stats = [
  { value: '1', label: 'Accountable team' },
  { value: '9', label: 'Capabilities owned end to end' },
  { value: '4 wks', label: 'Foundation live' },
  { value: '3 mo', label: 'Minimum engagement' },
];

const capabilities = [
  {
    code: '01',
    label: 'Foundation',
    title: 'Website rebuild and Zatrovo booking',
    body: 'Bespoke build, no template. Multilingual where it fits. Zatrovo, our own SaaS, runs your bookings under your brand. Both included free at every tier.',
    partner: false,
  },
  {
    code: '02',
    label: 'Discovery',
    title: 'Programmatic SEO and content',
    body: 'AI augmented production at a volume traditional agencies cannot match. Location pages, treatment pages, FAQ libraries, topical clusters. Platform-native content in every language we ship.',
    partner: false,
  },
  {
    code: '03',
    label: 'Emerging',
    title: 'AEO and GEO for AI search',
    body: 'Engineered presence inside ChatGPT, Perplexity, Claude, Gemini and Google AI Overviews. Schema, structured content and source placement so the LLMs can quote you.',
    partner: false,
  },
  {
    code: '04',
    label: 'Korean market',
    title: 'Naver presence and optimisation',
    body: 'Naver Place, Naver Blog, Naver Map. Korean tourists do not use Google. Most agencies skip Naver entirely, which is exactly why it is a real competitive gap.',
    partner: false,
  },
  {
    code: '05',
    label: 'Local discovery',
    title: 'Google Business Profile and local SEO',
    body: 'Profile optimisation, citations, multilingual GBP posts, location pages. Often the highest-ROI digital channel for service businesses, and almost always under-utilised.',
    partner: false,
  },
  {
    code: '06',
    label: 'Reputation',
    title: 'Review and reputation systems',
    body: 'Automated requests post-visit, multi-platform monitoring across Google, Facebook, TripAdvisor and Naver, AI-assisted responses with human approval. Reviews run as a system, not a hope.',
    partner: false,
  },
  {
    code: '07',
    label: 'Measurement',
    title: 'Analytics, GA4 and insights',
    body: 'GA4 set up to track traffic, bookings and channel mix. Performance reporting against the metrics that matter.',
    partner: false,
  },
  {
    code: '08',
    label: 'Partner studio · Chinese market',
    title: 'Xiaohongshu (RED) and KOC partnerships',
    body: 'Account setup, content production, channel management and KOL/KOC partnerships, run end-to-end via our partner content studio. Optional add-on, quoted separately.',
    partner: true,
  },
  {
    code: '09',
    label: 'Partner studio · Social and video',
    title: 'Active social, video production and Meta ads',
    body: 'Day-to-day social channel management, short-form video for Reels, TikTok and Xiaohongshu, and Meta ad campaigns. Run via our partner content studio when you need active social. Optional add-on.',
    partner: true,
  },
];

const flywheelStages = [
  {
    n: '02',
    name: 'Attract',
    title: 'Get found across every channel that matters.',
    body: 'Multilingual SEO, AEO/GEO for AI search, Google Business Profile, Naver, programmatic content. Every surface where your customers research, your business shows up first.',
  },
  {
    n: '03',
    name: 'Convert',
    title: 'Turn visits into bookings.',
    body: 'A funnel built around Zatrovo. Fast multilingual website, frictionless booking, deposits, automated reminders, no-show protection. Traffic that other businesses leak to third-party platforms lands directly in your calendar, commission free.',
  },
  {
    n: '04',
    name: 'Retain',
    title: 'Rebuild margin from existing customers.',
    body: 'Customer database, post-visit email and message automations, packages, gift vouchers, loyalty mechanics. Every booking feeds a profile that keeps customers coming back without re-acquisition cost.',
  },
  {
    n: '05',
    name: 'Amplify',
    title: 'Reviews and referrals feed the next cycle.',
    body: 'Automated review requests, multi-platform monitoring, AI-assisted responses. Happy customers leave reviews and bring friends, which boosts rankings, social proof and discovery. The wheel turns again, faster.',
  },
];

const principles = [
  {
    label: 'Single accountability',
    body: 'One team owns the funnel. No blame games between vendors. When something breaks, you call one number.',
  },
  {
    label: 'Tech and strategy combined',
    body: 'Most agencies are creative shops or technical implementers. Irvale is both. We design the funnel and ship the code that runs it.',
  },
  {
    label: 'Owned infrastructure',
    body: 'Zatrovo, our own SaaS, handles bookings, payments and messaging. Included free, not outsourced. Fixed when you need it fixed.',
  },
  {
    label: 'AI augmented production',
    body: 'Modern workflows produce content and optimise at a volume traditional agencies cannot match. Lower hours per output, higher cadence per retainer dollar.',
  },
  {
    label: 'Skin in the game',
    body: 'Reporting on real metrics. Bookings, revenue, enquiries, citation share. No vanity dashboards.',
  },
  {
    label: 'Small client list',
    body: 'A small number of clients at a time. Each one gets a senior team, not a junior on rotation.',
  },
];

const caseStudies = [
  {
    label: 'Our own SaaS · Live',
    title: 'Zatrovo',
    body: 'The full Revenue Engineering playbook applied to ourselves. Website built from scratch, programmatic SEO at scale, multi-language and multi-service architecture, AEO/GEO foundations, AI search optimisation. Every approach proposed for clients runs on Zatrovo first.',
    services: [
      'Website build',
      'Programmatic SEO',
      '300+ blog pages',
      'Multi-language content',
      'Multi-service architecture',
      'AEO/GEO foundations',
      'AI search optimisation',
    ],
  },
  {
    label: 'Active partnership · Chiang Mai',
    title: 'BOXX Muay Thai',
    body: 'High-volume Muay Thai gym. Website rebuild, Zatrovo booking integration, ongoing social media management with paid video ad campaigns driving customer acquisition, multilingual content and review automation.',
    services: [
      'Website rebuild',
      'Zatrovo booking',
      'Social media management',
      'Video ad campaigns',
      'Review automation',
      'Multilingual content',
    ],
  },
  {
    label: 'In progress · Beauty studio',
    title: 'Reya Lashes',
    status: 'In progress',
    body: 'Full Revenue Engineering engagement just started. Closest profile to a typical service-business client. Same playbook, deployed live right now.',
    services: [
      'Website rebuild',
      'Zatrovo booking',
      'Programmatic SEO',
      'Multilingual content',
      'GBP optimisation',
      'AEO/GEO foundations',
      'Review automation',
      'Naver presence',
    ],
  },
];

const pricing = [
  {
    name: 'Launch',
    price: 'from $1,450',
    cadence: 'per month · three month minimum',
    summary:
      'For owner-operators who want the funnel professionally run without hiring a marketing team. Website rebuild and Zatrovo included free.',
    includes: [
      'Bespoke website rebuild, launched live',
      'Zatrovo booking under your brand, included free',
      'Google Business Profile and local SEO',
      'Reviews and reputation system',
      'Schema, AI crawler policy, baseline GEO',
      'GA4 setup and performance reporting',
    ],
  },
  {
    name: 'Growth',
    featured: true,
    price: 'from $3,450',
    cadence: 'per month · three month minimum',
    summary:
      'For businesses ready to compound. Full content engine, AI search visibility, Korean market entry. Where most clients settle after the launch phase.',
    includes: [
      'Everything in Launch',
      'Programmatic SEO and topical map at scale',
      'Full AI search visibility programme (GEO/AEO)',
      'Naver presence and optimisation',
      'Multilingual content production',
      'Email and CRM lifecycle (Klaviyo, Mailchimp or Resend)',
      'Strategy reviews with the founder',
    ],
  },
  {
    name: 'Bespoke',
    price: 'from $5,500',
    cadence: 'per month · six month minimum',
    summary:
      'For multi-location or multi-market businesses. Includes partner-studio social, video and Meta ads coordinated under one roof. Scoped to brand, category and competitive set.',
    includes: [
      'Everything in Growth',
      'Partner studio: Xiaohongshu and KOC partnerships',
      'Partner studio: active social, short-form video, Meta ads',
      'Multi-location coordination',
      'Custom dashboards and server-side attribution',
      'Dedicated account manager',
    ],
  },
];

const wedontdo = [
  'Active day-to-day social media management, video production, KOC outreach and Meta ad operations sit with our partner studio. Available as an add-on, single point of contact through Irvale.',
  'No promises of rank one in 30 days or 10x bookings overnight. SEO and AI visibility compound over 90 days minimum.',
  'A small client roster at any given time. If we are at capacity we say so and recommend someone honest.',
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
            Discovery and conversion, owned end to end as one system.
          </RevealText>
          <p className="font-body text-[length:var(--type-body-lg)] text-text-muted-light font-light max-w-2xl mb-10">
            Revenue Engineering is what Irvale specialises in. Making your business discoverable across every channel that matters, then converting that traffic into paying, repeat customers. One accountable team for the full funnel.
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
            'Attract',
            'Convert',
            'Retain',
            'Amplify',
            'Website',
            'Booking',
            'SEO',
            'AI Search',
            'Naver',
            'GBP',
            'Reviews',
            'APAC',
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
                A web designer built the site three years ago. Someone&apos;s nephew runs Facebook. There is one booking system, or three. No schema, no AI search strategy. Nobody is sure the contact form even delivers email.
              </p>
              <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light leading-relaxed">
                When something breaks, nobody owns the whole funnel. The web designer blames the SEO consultant. The SEO consultant blames the platform. The owner translates between vendors who do not talk to each other.
              </p>
              <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light leading-relaxed">
                Revenue Engineering replaces that with one accountable team.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Capabilities */}
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
              Nine capabilities. Seven core. Two partner-studio add-ons.
            </RevealText>
            <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light">
              Seven layers of the funnel run by Irvale directly. Two delivered through a partner content studio when you need active social, video and Meta ads. Single point of contact across all nine.
            </p>
          </div>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-dark)]">
            {capabilities.map((c) => (
              <div
                key={c.code}
                className={`p-7 lg:p-8 ${c.partner ? 'bg-dark-2/60' : 'bg-dark'}`}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-display text-gold/40 text-base">{c.code}</span>
                  <span className="font-body text-[10px] uppercase tracking-[0.18em] text-gold-muted">
                    {c.label}
                  </span>
                </div>
                <h3 className="font-display text-xl leading-snug text-text-light mb-3">
                  {c.title}
                </h3>
                <p className="font-body text-sm text-text-muted-light font-light leading-relaxed mb-4">
                  {c.body}
                </p>
                {c.partner && (
                  <span className="inline-block font-body text-[10px] uppercase tracking-[0.2em] text-gold border border-gold/30 px-2 py-1">
                    Partner studio · optional
                  </span>
                )}
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* The Flywheel */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="mb-14 max-w-2xl">
            <Eyebrow className="mb-6 block">The Bigger Picture</Eyebrow>
            <RevealText
              as="h2"
              className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] mb-4"
            >
              Phase 01 sets the foundation. The flywheel compounds.
            </RevealText>
            <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light">
              Setup feeds a four-stage flywheel. Attract gets the right traffic. Convert turns visits into bookings. Retain rebuilds margin from existing customers. Amplify feeds reviews and referrals back into discovery. Each turn fuels the next.
            </p>
          </div>

          <SectionReveal className="grid grid-cols-1 lg:grid-cols-[280px_60px_1fr] gap-10 items-center mb-16">
            {/* Phase 01 card */}
            <div className="border border-gold-muted/40 bg-gold/5 p-7 max-w-[320px] justify-self-center lg:justify-self-end">
              <span className="font-body text-[11px] uppercase tracking-[0.22em] text-gold-muted font-medium block mb-3">
                Phase 01
              </span>
              <h3 className="font-display text-2xl text-text-dark leading-tight mb-3">
                Setup
              </h3>
              <p className="font-body text-sm text-text-muted-dark font-light leading-relaxed mb-4">
                Audit. Website rebuild. Booking. Profiles. Tracking. The substrate everything compounds on.
              </p>
              <span className="font-body text-[11px] uppercase tracking-[0.18em] text-gold-muted font-medium">
                Once live →
              </span>
            </div>

            {/* Connector arrow — points right on desktop, rotated to point down on mobile */}
            <div aria-hidden="true" className="flex justify-center">
              <svg viewBox="0 0 110 40" className="w-20 h-8 lg:w-24 lg:h-10 rotate-90 lg:rotate-0">
                <defs>
                  <marker id="phaseArrowRE" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,10 L9,5 z" fill="rgba(168,137,90,0.7)" />
                  </marker>
                </defs>
                <path d="M 4,20 L 100,20" fill="none" stroke="rgba(168,137,90,0.5)" strokeWidth="1.4" strokeDasharray="4 6" markerEnd="url(#phaseArrowRE)" />
              </svg>
            </div>

            {/* Flywheel */}
            <div className="relative w-[min(88vw,360px)] lg:w-full lg:max-w-[440px] aspect-square mx-auto justify-self-center">
              <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none flywheel-spin" aria-hidden="true">
                <defs>
                  <marker id="fwArrowRE" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,8 L7,4 z" fill="rgba(168,137,90,0.7)" />
                  </marker>
                </defs>
                <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(168,137,90,0.25)" strokeWidth="1" strokeDasharray="2 6" />
                <circle cx="200" cy="200" r="172" fill="none" stroke="rgba(168,137,90,0.15)" strokeWidth="1" strokeDasharray="1 8" />
                <path d="M 239,55 A 150,150 0 0 1 345,161" fill="none" stroke="rgba(168,137,90,0.5)" strokeWidth="1.4" markerEnd="url(#fwArrowRE)" />
                <path d="M 345,239 A 150,150 0 0 1 239,345" fill="none" stroke="rgba(168,137,90,0.5)" strokeWidth="1.4" markerEnd="url(#fwArrowRE)" />
                <path d="M 161,345 A 150,150 0 0 1 55,239" fill="none" stroke="rgba(168,137,90,0.5)" strokeWidth="1.4" markerEnd="url(#fwArrowRE)" />
                <path d="M 55,161 A 150,150 0 0 1 161,55" fill="none" stroke="rgba(168,137,90,0.5)" strokeWidth="1.4" markerEnd="url(#fwArrowRE)" />
              </svg>

              {/* Core */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] aspect-square rounded-full border border-gold-muted/40 bg-[radial-gradient(circle_at_30%_30%,rgba(201,169,110,0.18),rgba(201,169,110,0.02)_75%)] flex flex-col items-center justify-center text-center px-3 z-10">
                <span className="font-body text-[9px] uppercase tracking-[0.24em] text-gold-muted font-medium mb-1">
                  The flywheel
                </span>
                <span className="font-display text-lg md:text-xl text-text-dark leading-tight mb-1">
                  Compounding
                </span>
                <span className="font-body text-[10px] text-text-muted-dark leading-tight">
                  Each turn fuels the next
                </span>
              </div>

              {/* Nodes — Attract anchored to N on mobile (Setup arrow points down), W on desktop (Setup arrow points right) */}
              {[
                { mobile: 'top-0 left-1/2', desktop: 'lg:top-1/2 lg:left-0', n: '02', name: 'Attract' },
                { mobile: 'top-1/2 left-full', desktop: 'lg:top-0 lg:left-1/2', n: '03', name: 'Convert' },
                { mobile: 'top-full left-1/2', desktop: 'lg:top-1/2 lg:left-full', n: '04', name: 'Retain' },
                { mobile: 'top-1/2 left-0', desktop: 'lg:top-full lg:left-1/2', n: '05', name: 'Amplify' },
              ].map((node) => (
                <div
                  key={node.n}
                  className={`absolute ${node.mobile} ${node.desktop} -translate-x-1/2 -translate-y-1/2 w-[88px] h-[88px] md:w-[112px] md:h-[112px] rounded-full flex flex-col items-center justify-center gap-1 border border-gold-muted/40 bg-cream-2 z-20`}
                >
                  <span className="font-display italic text-xl md:text-2xl text-gold-muted leading-none">
                    {node.n}
                  </span>
                  <span className="font-display text-sm md:text-base text-text-dark leading-tight">
                    {node.name}
                  </span>
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Stage detail cards */}
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flywheelStages.map((s) => (
              <div key={s.n} className="border border-[var(--border-light)] bg-white p-6">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-display italic text-gold-muted text-xl">{s.n}</span>
                  <span className="font-body text-[11px] uppercase tracking-[0.2em] text-gold-muted font-medium">
                    {s.name}
                  </span>
                </div>
                <h3 className="font-display text-lg text-text-dark leading-snug mb-3">
                  {s.title}
                </h3>
                <p className="font-body text-sm text-text-muted-dark font-light leading-relaxed">
                  {s.body}
                </p>
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
                Small and medium businesses doing roughly $6k to $60k in monthly revenue. Service businesses, hospitality, wellness, fitness, professional services. Multi-location welcome. Founders who want one accountable partner instead of five.
              </p>
              <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light leading-relaxed">
                Especially suited to businesses in Thailand and Southeast Asia targeting local, expat and international (Chinese, Korean, Western) buyers. Operating from London and Chiang Mai means real coverage of both cultures and the channels each one actually uses.
              </p>
              <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light leading-relaxed">
                If your funnel is stitched together from three platforms and four contractors, this is the engagement that consolidates it.
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

      {/* Recent Work */}
      <section className="bg-cream-2 py-[var(--section-gap)] border-y border-[var(--border-light)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="mb-14 max-w-2xl">
            <Eyebrow className="mb-6 block">Recent and Ongoing Work</Eyebrow>
            <RevealText
              as="h2"
              className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] mb-4"
            >
              The same playbook, running live.
            </RevealText>
            <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light">
              Every approach proposed for clients runs first on Zatrovo, our own SaaS, then ships to the businesses below.
            </p>
          </div>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs) => (
              <div
                key={cs.title}
                className="border border-[var(--border-light)] bg-white p-7 flex flex-col"
              >
                <p className="font-body text-[10px] uppercase tracking-[0.22em] text-gold-muted font-medium mb-3">
                  {cs.label}
                </p>
                <h3 className="font-display text-2xl text-text-dark leading-tight mb-2">
                  {cs.title}
                </h3>
                {cs.status && (
                  <span className="inline-block self-start font-body text-[10px] uppercase tracking-[0.18em] text-gold-muted border border-gold-muted/40 px-2 py-0.5 mb-3">
                    {cs.status}
                  </span>
                )}
                <p className="font-body text-sm text-text-muted-dark font-light leading-relaxed mb-5">
                  {cs.body}
                </p>
                <ul className="flex flex-wrap gap-2 mt-auto">
                  {cs.services.map((s) => (
                    <li
                      key={s}
                      className="font-body text-[10px] tracking-[0.06em] text-text-muted-dark border border-gold/25 bg-gold/5 px-2.5 py-1 rounded-full"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
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
            Indicative starting prices. Scopes are sized to brand, category and competitive set. Multi-location estates and enterprise engagements quoted individually. Pricing is in USD and excludes VAT where applicable.
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
            <Eyebrow className="mb-6 block">Honest Edges</Eyebrow>
            <RevealText
              as="h2"
              className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)]"
            >
              What sits outside the engagement.
            </RevealText>
          </div>
          <SectionReveal className="space-y-5 max-w-3xl">
            {wedontdo.map((line, i) => (
              <p
                key={i}
                className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light leading-relaxed pl-6 relative before:content-['•'] before:absolute before:left-0 before:top-0 before:text-gold-muted"
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
            Book a 30 minute discovery call. We walk through your presence, baseline the gaps, and tell you honestly whether Revenue Engineering fits.
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
