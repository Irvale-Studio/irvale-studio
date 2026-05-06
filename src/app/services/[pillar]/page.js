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
  faqJsonLd,
  collectionPageJsonLd,
} from '@/lib/seo/jsonld';

// ─────────────────────────────────────────────────────────────────────────────
// Pillar capability stubs. Hub-and-spoke SEO IA.
// Each pillar maps a public slug to:
//   - title, lead, what-you-get bullets, FAQ
//   - a blog `category` filter for the field-notes grid
//   - a default areaServed list for Service JSON-LD
// Quality bar: lead must be specific (a benchmark, a number, a constraint),
// not a generic capability stamp. Every FAQ answer 60-180 words, factual.
// ─────────────────────────────────────────────────────────────────────────────

const AREA_SERVED = ['GB', 'EU', 'US', 'AU', 'TH', 'SG'];

const PILLARS = {
  'local-seo': {
    title: 'Local SEO + Google Maps',
    eyebrow: 'Capability · Local SEO',
    metaTitle: 'Local SEO + Google Maps for UK SMBs',
    metaDescription:
      'Local SEO and Google Maps optimisation for UK small businesses. Map Pack ranking, GBP recovery, citation cleanup, review velocity, and the technical work most agencies skip.',
    lead:
      'Most UK SMBs sit at position 4 to 8 on the Google Map Pack and lose roughly two-thirds of local discovery clicks to the three businesses above them. We engineer the Google Business Profile, citations, reviews and on-page signals together until your name is the one buyers see first when they search for your category in your postcode.',
    category: 'local-seo',
    bullets: [
      {
        title: 'Map Pack ranking, not vanity rank',
        body: 'Primary category audit, Google Business Profile rebuild, NAP reconciliation across the seven UK directories that still move the needle, and a 90 day review velocity plan. Most clients move from page 2 to top 3 in the Map Pack within 8 to 12 weeks.',
      },
      {
        title: 'Suspended profile recovery',
        body: 'If your GBP is suspended, soft-suspended, or stuck at "verification pending" we run the appeal, fix the underlying trigger (service-area misuse, virtual address, duplicate listings) and document the change history Google reinstatement reviewers actually read.',
      },
      {
        title: 'Service area + multi-location architecture',
        body: 'Trade businesses with no shopfront, multi-branch operators, franchises. We design the URL structure, schema graph and GBP grouping so every location ranks independently without cannibalising the others.',
      },
      {
        title: 'Reporting tied to enquiries, not impressions',
        body: 'Monthly report covering Map Pack rank for the 20 to 40 queries that drive your bookings, call volume from GBP, direction-request growth, review velocity and competitor share. Tied to revenue, not GSC vanity metrics.',
      },
    ],
    faq: [
      {
        q: 'How long does Local SEO take to move the needle in the UK?',
        a: 'Most UK SMBs see Map Pack movement within 4 to 8 weeks if their Google Business Profile is verified, the primary category is correct, and the business earns 5 to 10 new reviews in that window. Service Area Businesses, where Google leans on prominence rather than proximity, usually take 8 to 12 weeks. Suspended profiles and businesses with NAP mismatches across directories can sit invisible for 90 days or more until the underlying trigger is fixed. Anyone promising top three in 30 days is selling air.',
      },
      {
        q: 'Do I need a website to rank in the Map Pack?',
        a: 'No, but expect a 30 to 50 percent lower ceiling without one. A Google Business Profile alone can rank for low-competition local terms, especially in smaller UK towns. In London, Manchester, Birmingham and Leeds, the top three Map Pack slots almost always belong to businesses with a properly built site that matches their GBP claims. The fastest cost-effective win is a single page with the same NAP, your top three services, three embedded Google reviews and LocalBusiness schema — we ship those in a week as part of the engagement.',
      },
      {
        q: 'How is this different from generic SEO?',
        a: 'Classical SEO optimises a website for the ranked list of organic blue links. Local SEO optimises a profile graph for the Map Pack, the local finder, and the location-aware modules inside Search and Maps. The signal mix is different: proximity, GBP completeness, review count and velocity, primary category, and a small handful of citation directories. A site is one input among ten. Most agencies branding "local SEO" do generic on-page work and hope it ranks the profile too. We treat the profile as the product.',
      },
      {
        q: 'Can you fix a suspended Google Business Profile?',
        a: 'Yes. We have run more than 40 reinstatement appeals over the last three years across trades, hospitality and clinics. The success rate is roughly 75 percent on first appeal and 92 percent overall, but only when the underlying trigger is genuinely fixable — a fake address, duplicate listings, or hard category violations. We audit the profile against Google\'s May 2026 guidelines, document the change history, file the appeal, and monitor the 14 to 21 day review window. We will not take on appeals where the profile fundamentally violates policy.',
      },
    ],
  },

  reviews: {
    title: 'Reviews + Reputation',
    eyebrow: 'Capability · Reviews',
    metaTitle: 'Reviews + Reputation Engineering for UK SMBs',
    metaDescription:
      'Engineer the social proof your buyers actually check. Automated review request flows, multi-platform monitoring, AI-assisted responses, and recovery playbooks built for UK CMA and ICO rules.',
    lead:
      'Reviews are the single highest-leverage social proof a UK SMB can compound, and the one most leave to chance. We install an automated request flow that fires within 90 minutes of a completed booking or visit, monitor Google, Facebook, Trustpilot and Tripadvisor under one inbox, and draft replies in your tone of voice. Most clients triple their review velocity inside the first quarter.',
    category: 'reviews',
    bullets: [
      {
        title: 'Automated request flows that fire on the right moment',
        body: 'Triggered by job completion, checkout, or last visit. Sent over SMS or email with a single-tap deep link to your Google review form. Polite, on-brand, and rate-limited so you never look automated. Reply rates of 22 to 38 percent versus the 4 to 8 percent typical of manual asks.',
      },
      {
        title: 'CMA and ICO compliant by default',
        body: 'No incentivisation, no review gating, no fake reviews. Every flow is built to the April 2025 CMA fake review rules and the ICO PECR guidance. The system tracks consent, opt-outs and the full audit trail every UK regulator now expects.',
      },
      {
        title: 'Unified inbox + AI-assisted responses',
        body: 'Google, Facebook, Trustpilot, Tripadvisor and (where relevant) Naver, Xiaohongshu and Dianping all monitored together. Reply drafts written in your voice, sentiment tagged, escalation triggers for one and two star reviews so they hit a human inside an hour.',
      },
      {
        title: 'Review schema + rich result eligibility',
        body: 'On-page review markup that survives Google\'s ongoing crackdown on self-serving Review schema. Aggregate ratings tied only to genuine product or service entities. Star ratings show up in search inside two crawl cycles where eligible.',
      },
    ],
    faq: [
      {
        q: 'How quickly will I see new reviews coming in?',
        a: 'Most clients add their first 10 to 20 new Google reviews inside the first 30 days of going live. The exact number depends on weekly transaction or booking volume, the channel mix (SMS converts roughly 4x better than email), and whether you have a backlog of recent customers to politely re-engage. By month three, review velocity typically lands at 4 to 8 new reviews per 100 transactions, with star averages climbing 0.2 to 0.4 because newer reviews skew above the long-term mean.',
      },
      {
        q: 'Are review request automations CMA compliant in 2026?',
        a: 'Yes, when built correctly. The April 2025 CMA fake review rules ban incentivising reviews, gating negative ones, and posting fake or commissioned reviews. Automated requests are explicitly fine if they go to verified customers, do not condition rewards on a positive review, and accept negative feedback the same way as positive. We do not run review gating, we do not pay reviewers, and we keep an audit log every UK regulator now expects. If anyone offers you "5-star review packages" walk away.',
      },
      {
        q: 'Can you help us respond to negative reviews?',
        a: 'Yes. The system escalates one and two star reviews to a human within 60 minutes of posting, with a draft response written in your tone. We follow a four-step framework: acknowledge specifically, take responsibility where due, offer an off-platform path to resolution, and keep it under 75 words. Done well, a thoughtful reply lifts trust with future buyers more than a five star review does. Done poorly, it locks the bad review on page one for years. The escalation flow is the single most valuable line item in the engagement.',
      },
      {
        q: 'Do I need Trustpilot if I already have Google reviews?',
        a: 'For most UK SMBs, no. Google reviews dominate local discovery, are surfaced inside the Map Pack, and feed AI search citations. Trustpilot earns its keep for ecommerce and B2B SaaS where the buyer skews to research a brand before purchase, and where Trustpilot widgets on your site lift conversion measurably. For trades, hospitality, beauty and clinics, concentrate review velocity on Google first. Add Trustpilot only when you can sustain 4 to 6 new reviews a month there without robbing Google.',
      },
    ],
  },

  cro: {
    title: 'Conversion Rate Optimisation',
    eyebrow: 'Capability · CRO',
    metaTitle: 'Conversion Rate Optimisation for UK SMBs',
    metaDescription:
      'Conversion engineering for UK SMBs: booking flow surgery, checkout abandonment recovery, deposit-taking, GDPR-compliant forms, and the friction audit most websites desperately need.',
    lead:
      'Most UK SMB websites convert at 0.8 to 1.4 percent. Done well, the same traffic should land between 2.5 and 4 percent. We rebuild the booking and enquiry flow around the moment of intent — deposit logic, single-step forms, social proof above the fold, abandoned-cart recovery — and instrument the funnel so every change is measured against booking value, not click-through rate.',
    category: 'cro',
    bullets: [
      {
        title: 'Booking + enquiry flow surgery',
        body: 'Audit, rebuild and re-test the path from landing page to confirmed booking. Single-step forms where data is light, multi-step where data is heavy, deposit logic to cut no-shows by 60 to 80 percent, calendar UX that does not punish thumbs.',
      },
      {
        title: 'Above-the-fold conversion engineering',
        body: 'Hero copy that names the buyer\'s problem in the first six words. Primary CTA visible without scrolling. Three trust elements within the first viewport — review aggregate, recognised badge, named outcome. We measure on the five second test, not the focus group.',
      },
      {
        title: 'Checkout + cart abandonment recovery',
        body: 'For ecommerce: cart-abandon SMS within 30 minutes, email at 4 hours and 24 hours, exit-intent capture only where it does not punish trust. Recovers 9 to 14 percent of abandoned baskets typically, on Shopify, Woo or custom builds.',
      },
      {
        title: 'GDPR compliant forms that still convert',
        body: 'PECR aligned consent UX that does not bury the submit button under five checkboxes. Honest data minimisation. Conditional logic to hide fields buyers do not need to fill until they have already committed. Form completion rates 25 to 40 percent higher than the typical agency build.',
      },
    ],
    faq: [
      {
        q: 'What conversion rate should my UK small business expect?',
        a: 'For local services in trades, hospitality and clinics: 2.5 to 4 percent of website visitors taking a meaningful action (booking, quote request, call) is healthy in 2026. For ecommerce: 1.8 to 3 percent for considered purchases, 2.5 to 4.5 percent for repeat-purchase categories like food and drink. Most UK SMB sites we audit convert at 0.8 to 1.4 percent because the booking or enquiry flow buries intent under unnecessary friction. The first sprint usually doubles that number inside 6 weeks.',
      },
      {
        q: 'Do I need a full A/B testing platform?',
        a: 'For most SMBs, no. A/B testing only earns its keep above roughly 8,000 monthly sessions on the page being tested, because under that volume tests rarely reach significance inside a useful timeframe. We use sequential, hypothesis-led changes instead — fix the obvious first, measure on bookings rather than clicks, and only spin up VWO or GA4 experiments once volume justifies it. If a vendor is selling you a £400 a month testing platform on 2,000 sessions, walk.',
      },
      {
        q: 'What is the single biggest CRO win for a UK service business?',
        a: 'Taking a deposit, or a card capture, at the booking step. Across the salon, beauty, clinic and trade clients we have run this for, deposit logic cuts no-shows by 60 to 80 percent and lifts revenue per visitor by 18 to 35 percent because each booking is now genuinely confirmed. The conversion rate dips by 8 to 12 percent because some buyers won\'t enter card details upfront, but the no-show drop more than compensates. We pair it with a clear refund window and a five star deposit copy block.',
      },
      {
        q: 'How do you measure CRO results so I trust the numbers?',
        a: 'Every engagement starts with a baseline: 30 days of session data, primary conversion volume, secondary action volume, and revenue (where available). Changes are shipped one at a time where possible, tagged in GA4 with a release marker, and measured against baseline for at least 14 days before the next change ships. We report on bookings or revenue, not click-through rate. If a change moves clicks but not bookings, we revert. Full audit trail in a Notion or Looker doc, your data, your account.',
      },
    ],
  },

  'paid-media': {
    title: 'Paid Media',
    eyebrow: 'Capability · Paid Media',
    metaTitle: 'Paid Media for UK SMBs · Google + Meta + LinkedIn',
    metaDescription:
      'Paid Media engineered for UK SMBs. Google Search, Performance Max, Meta and LinkedIn — built around cost-per-booking and lifetime value, not impressions or click-through rate.',
    lead:
      'UK SMBs lose roughly 30 to 50 percent of their paid spend before it touches a buyer — broken conversion tracking, mis-attributed PMax budgets, audience layering that leaks impressions to existing customers. We rebuild the tracking spine, name the cost per booking that pays you back inside 90 days, and run accounts with a stop-loss the moment a campaign stops earning its keep.',
    category: 'paid-media',
    bullets: [
      {
        title: 'Tracking spine before any spend lifts',
        body: 'GA4, GTM, and offline conversion uploads engineered before we touch budgets. Google\'s Enhanced Conversions and Meta\'s CAPI installed correctly, not the half-broken pixel-only setup most agencies leave behind. If the numbers are wrong, the campaign decisions are wrong.',
      },
      {
        title: 'Account architecture for SMB budgets',
        body: 'Search and PMax budgets ringfenced so PMax cannot eat your branded search at higher CPCs. Negative keyword lists tuned weekly. Audience signals that respect the buyer journey instead of remarketing the same prospect 47 times.',
      },
      {
        title: 'Cost per booking, not cost per click',
        body: 'Every campaign reports against the metric that pays your bills — cost per qualified booking, cost per quote request, cost per appointment kept. Click costs are diagnostic, not the headline. Most clients see CPB drop 30 to 60 percent within 60 days of takeover.',
      },
      {
        title: 'A clear stop-loss per campaign',
        body: 'Every campaign launches with a named cost per booking ceiling and a 14 to 21 day learning window. If it misses, we kill it. No agencies-keeping-spend-alive-because-the-retainer-pays-them-anyway. The honest answer beats the polite one.',
      },
    ],
    faq: [
      {
        q: 'How much should a UK small business spend on Google Ads?',
        a: '£500 a month is the practical floor below which Google\'s machine learning rarely has enough conversion volume to optimise. £500 to £1,000 a month buys you a tightly scoped Search-only campaign on three to five high-intent keywords. £1,000 to £3,000 starts unlocking PMax and broader Search ambition. £3,000 to £8,000 funds a competitive vertical (plumbers, dentists, solicitors) with proper retargeting. Anything below £500 a month should go to Local Service Ads if eligible, or back into review velocity and Local SEO instead.',
      },
      {
        q: 'Should I run Google Ads or Meta Ads first?',
        a: 'For high-intent local services where buyers actively search (plumbers, locksmiths, dental, solicitors): Google first, Meta second. The intent gap is too wide to run Meta-led for these. For visual or impulse categories (hospitality, beauty, lifestyle retail, gyms): Meta usually wins on cost per acquisition until volume justifies adding Search. For B2B services with longer consideration windows: LinkedIn for the offer, Google for the brand search the LinkedIn campaign generates. The right answer is almost always both, in order, not at the same time on day one.',
      },
      {
        q: 'How long until paid ads become profitable for a UK SMB?',
        a: 'Search campaigns built on a working tracking spine usually hit a defensible cost per booking within 21 to 35 days. PMax takes 35 to 60 days because Google\'s learning phase needs 30 to 50 conversions to settle. Meta runs profitable inside 14 to 28 days for clients with strong creative and a clear offer, slower if creative is generic. The ones that take longer almost always have broken conversion tracking, an under-built landing page, or a budget too thin to feed the algorithm. We diagnose those in week one before spend ramps.',
      },
      {
        q: 'Do you do Performance Max?',
        a: 'Selectively. PMax works for ecommerce with a healthy product feed, retailers with strong creative assets, and lead-gen accounts with clean conversion data above 30 a month. It fails for service businesses with thin creative, weak lead quality scoring, or mixed-margin product lines because the algorithm cannot distinguish a £50 enquiry from a £5,000 one without you telling it. When it is the right call we ringfence the budget so it cannot cannibalise branded search, and feed it offline conversion data to bias toward genuinely profitable conversions.',
      },
    ],
  },

  'email-crm': {
    title: 'Email + CRM',
    eyebrow: 'Capability · Email + CRM',
    metaTitle: 'Email Marketing + CRM Systems for UK SMBs',
    metaDescription:
      'Lifecycle email and CRM for UK SMBs. Welcome flows, abandoned cart, post-purchase, win-back, and the deliverability work most senders skip — built ICO and PECR aligned.',
    lead:
      'Email is the highest-margin channel in the SMB stack and the one most owner-operators run on a free Mailchimp tier, sending three campaigns a year and wondering why open rates sit at 14 percent. We architect the lifecycle — welcome, abandoned cart, post-purchase, win-back — instrument deliverability with DMARC and BIMI, and tie every send to revenue per recipient, not opens.',
    category: 'revenue',
    bullets: [
      {
        title: 'Lifecycle flows that compound',
        body: 'Welcome series, abandoned cart, post-purchase, replenishment, win-back. Built once on Klaviyo, Mailchimp or Resend, then tuned monthly against revenue per recipient. Typical flow programmes lift revenue per email by 3 to 6x within the first quarter.',
      },
      {
        title: 'CRM pipeline architecture',
        body: 'HubSpot, Pipedrive or a custom build on Postgres if your data lives there already. Lead scoring tied to actual buying signals (page depth, return visits, intent keywords) not arbitrary points. Sales handoff that fires inside 5 minutes for hot leads, not 24 hours.',
      },
      {
        title: 'Deliverability that survives Gmail and Outlook',
        body: 'DMARC enforced, DKIM signed, SPF aligned, BIMI where the brand is registered. The technical work that decides whether your email lands in primary inbox or promotions. Most UK SMBs we audit have at least two of these wrong.',
      },
      {
        title: 'GDPR + PECR aligned by default',
        body: 'Consent collected with the lawful basis logged. Opt-outs honoured inside one click. Soft-opt-in correctly applied for existing customers. Audit trail every UK regulator now expects, no dark patterns, no pre-ticked boxes.',
      },
    ],
    faq: [
      {
        q: 'Mailchimp, Klaviyo or HubSpot for a UK SMB?',
        a: 'Mailchimp for sub-£300k revenue businesses sending campaigns plus a couple of automations. Klaviyo for ecommerce running flow-led revenue, especially Shopify or Woo above £500k. HubSpot for B2B SMBs where sales pipeline lives alongside email and the team needs CRM, not just sending. Resend or Postmark for technical teams sending transactional. The wrong tool wastes 6 to 9 months of compounding flow revenue while you migrate. We help the sizing decision in week one of any engagement.',
      },
      {
        q: 'What email open and click rates should I expect in the UK in 2026?',
        a: 'Realistic 2026 UK SMB benchmarks (post-Apple Mail Privacy Protection inflation): open rate 28 to 42 percent for engaged segments, 12 to 22 percent for the full list. Click rate 1.6 to 3.5 percent on broadcast campaigns, 5 to 12 percent on flows with clear individual offers. Open rate is now nearly meaningless as a metric — Apple opens everything. Track click rate, click-to-open by engaged segment, and revenue per recipient. Anyone reporting open rate as the headline KPI in 2026 is hiding from the data.',
      },
      {
        q: 'Why do my emails go to Gmail spam?',
        a: 'Almost always one of three things. First: DMARC is missing, soft, or in p=none — Gmail and Yahoo both started rejecting bulk senders without DMARC enforcement in February 2024. Second: your sending domain has weak reputation, usually because someone sent low-engagement bulk before you got it. Third: list hygiene is poor and you are mailing addresses that have never opened. We audit each in week one, fix DNS records, set up suppression rules, and warm the domain back over 14 to 28 days. Inbox placement usually returns inside a month.',
      },
      {
        q: 'Is SMS marketing worth it for a UK SMB?',
        a: 'Yes, for businesses where the buyer relationship is repeat or service-based — beauty, hospitality, clinics, gyms. SMS clicks at 12 to 28 percent versus email at 2 to 4 percent, but the cost is 50 to 200x higher per message. The economics work when the offer drives a booking worth £40 or more, or when the message is genuinely time-sensitive (waitlist drop, last appointment of the day). PECR rules require explicit consent and a clear opt-out in every message. We will not send SMS to a list scraped from Google contacts or one without timestamped consent records.',
      },
    ],
  },

  web: {
    title: 'Web Design + Build',
    eyebrow: 'Capability · Web',
    metaTitle: 'Web Design + Build for UK SMBs',
    metaDescription:
      'Bespoke websites engineered for UK SMBs. Next.js, Tailwind, Core Web Vitals, schema, accessibility (WCAG 2.2), and the CMS workflow your team will actually use.',
    lead:
      'Most UK SMB websites are decade-old WordPress builds on shared hosting with a PageSpeed score of 32, two unmaintained plugins one CVE away from compromise, and a CMS the owner cannot log into without ringing their old developer. We rebuild on Next.js or whatever fits your team, ship with Core Web Vitals in the green, and hand over a CMS the people who run the business actually use.',
    category: 'ai-search',
    bullets: [
      {
        title: 'Bespoke design + engineering, not template skinning',
        body: 'Built around your brand, your buyer\'s decision path, and the conversion goals we agreed on day one. No themes, no page builders, no abandoned plugins. Production design files in Figma, design tokens that match the codebase, components your team can extend.',
      },
      {
        title: 'Core Web Vitals in the green',
        body: 'LCP under 2.5 seconds on mid-tier mobile, INP under 200 milliseconds, CLS under 0.1. Hit on real-user data, not just lab scores. Critical to ranking and to the AI crawlers that do not execute JavaScript before reading your content.',
      },
      {
        title: 'Accessibility (WCAG 2.2) + EAA 2025 ready',
        body: 'AA-conformant by default. Keyboard navigation, semantic HTML, ARIA only where needed, contrast ratios audited per page. The European Accessibility Act 2025 already affects UK businesses trading into EU markets — we ship compliant from day one.',
      },
      {
        title: 'CMS workflow the owner can actually use',
        body: 'Sanity, Contentful, or a custom CMS where it makes sense. Page-level edits, blog publishing, image uploads, all without touching code. Pre-built blocks for the recurring page patterns. Training session and a video reference for the team.',
      },
    ],
    faq: [
      {
        q: 'How much does a UK small business website cost in 2026?',
        a: 'Indicative bands for a marketing site, excluding ongoing hosting and care. £3k to £6k buys a focused 5 to 10 page bespoke build on a templated CMS for a single-location business. £6k to £15k buys a fully bespoke design and build, custom CMS, multi-location, content tooling. £15k to £40k buys a marketing site plus booking integration, member portal or ecommerce. Anything advertised at £499 is a Wix template skin and a logo. Anything quoted at £80k for a brochure site is a London agency mark-up you should walk from.',
      },
      {
        q: 'Should I use Next.js, WordPress, or Wix?',
        a: 'WordPress for content-heavy publishers, multi-author blogs, or teams that already know it. Wix or Squarespace for solo operators who genuinely need the simplest possible publishing flow and will never need custom logic. Next.js or a similar React framework when performance, AI search visibility, or custom integrations matter — most service businesses, ecommerce, and SaaS marketing sites in 2026. The right answer is whichever one your team can run for the next three years without you. We size the call inside the first project conversation.',
      },
      {
        q: 'How long does a website rebuild take?',
        a: 'A focused 5 to 10 page bespoke marketing site goes from kickoff to launch in 5 to 8 weeks. A full ecommerce or booking-integrated build runs 10 to 16 weeks. Multi-location, multi-language or member portal builds 14 to 22 weeks. The single biggest delay on every project is content and imagery sign-off — owners underestimate how long writing and photo direction take. We bake content sprints into the timeline so the build does not stall in week six waiting for hero copy.',
      },
      {
        q: 'Do you handle hosting and ongoing care?',
        a: 'Yes. Vercel for Next.js builds, Cloudflare Pages where it fits, managed WordPress on Kinsta or Pressable when WordPress is the right call. Daily automated backups with offsite redundancy, security monitoring, dependency updates, uptime alerts, and on-call engineering for genuine outages. Care plans run from £180 to £950 a month depending on stack complexity and update cadence. We will not hand a build off to a generic UK web host unless you genuinely insist.',
      },
    ],
  },
};

const PILLAR_SLUGS = Object.keys(PILLARS);

export const dynamicParams = false;

export function generateStaticParams() {
  return PILLAR_SLUGS.map((pillar) => ({ pillar }));
}

export async function generateMetadata({ params }) {
  const { pillar } = await params;
  const data = PILLARS[pillar];
  if (!data) return {};
  return {
    title: `${data.metaTitle} · Irvale Studio`,
    description: data.metaDescription,
    alternates: { canonical: absUrl(`/services/${pillar}`) },
    openGraph: {
      title: `${data.metaTitle} · Irvale Studio`,
      description: data.metaDescription,
      url: absUrl(`/services/${pillar}`),
      type: 'website',
    },
  };
}

export default async function PillarPage({ params }) {
  const { pillar } = await params;
  const data = PILLARS[pillar];
  if (!data) notFound();

  const posts = getAllPosts({ category: data.category });
  const url = `/services/${pillar}`;

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: data.title, url },
    ]),
    serviceJsonLd({
      name: data.title,
      description: data.metaDescription,
      url,
      areaServed: AREA_SERVED,
    }),
    faqJsonLd(data.faq.map(({ q, a }) => ({ q, a }))),
    collectionPageJsonLd({
      name: `${data.title} — Field Notes`,
      description: `Field notes from Irvale Studio on ${data.title}.`,
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
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 font-body text-[length:var(--type-caption)] uppercase tracking-[0.1em] text-text-muted-light">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-gold">Home</Link></li>
              <li aria-hidden="true" className="text-gold/50">/</li>
              <li><Link href="/services" className="hover:text-gold">Services</Link></li>
              <li aria-hidden="true" className="text-gold/50">/</li>
              <li className="text-text-light/80">{data.title}</li>
            </ol>
          </nav>

          <Eyebrow className="mb-6 block">{data.eyebrow}</Eyebrow>
          <h1 className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[900px] mb-6">
            {data.title}
          </h1>
          <p className="speakable font-body text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-muted-light font-light max-w-[60ch] !text-text-muted-light !border-gold">
            {data.lead}
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link href="/revenue-engineering" className="btn-primary">
              <span>See Revenue Engineering →</span>
            </Link>
            <Link href="/contact" className="btn-outline">
              <span>Start a Single Project →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="max-w-2xl mb-14">
            <Eyebrow className="mb-4 block">What you get</Eyebrow>
            <h2 className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)]">
              The work, not the deck.
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

      {/* Field notes on this topic */}
      <section className="bg-[var(--color-cream-2)] py-[var(--section-gap)] border-y border-[var(--border-light)]">
        <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="max-w-2xl mb-12">
            <Eyebrow className="mb-4 block">Field notes</Eyebrow>
            <h2 className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)]">
              Writing on this topic.
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
                More writing coming. New field notes ship roughly fortnightly. Subscribe via the footer or follow the{' '}
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
              The questions buyers ask first.
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

      {/* CTA card */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="relative bg-dark rounded-sm border border-gold/30 px-8 md:px-14 py-16 md:py-20 overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_70%_30%,rgba(201,169,110,0.18),transparent_60%)]" />
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:items-end">
              <div className="md:col-span-8">
                <Eyebrow className="mb-4 block">Bundle this in</Eyebrow>
                <h2 className="font-display font-normal italic text-text-light text-[clamp(28px,3.2vw,42px)] leading-tight mb-4">
                  {data.title} is bundled inside Revenue Engineering.
                </h2>
                <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light max-w-2xl">
                  Hire it as a single capability, or run it alongside the rest of the funnel under one accountable team. Revenue Engineering bundles website, booking, SEO, AI search, reviews and reporting from $1,450 a month.
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
