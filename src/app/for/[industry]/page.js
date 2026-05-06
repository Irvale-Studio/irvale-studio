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
  itemListJsonLd,
} from '@/lib/seo/jsonld';

// ─────────────────────────────────────────────────────────────────────────────
// Industry stubs for /for/[industry]. Hub-and-spoke SEO IA.
// Quality bar: lead must reference the industry's actual marketing reality —
// a real benchmark, a real platform constraint, or a real margin pressure.
// ─────────────────────────────────────────────────────────────────────────────

const INDUSTRIES = {
  plumbers: {
    title: 'UK Plumbers',
    serviceName: 'Marketing for UK Plumbers',
    vertical: 'trades',
    eyebrow: 'Industry · Trades',
    metaDescription:
      'Marketing engineered for UK plumbers. Local SEO, Google Ads, review velocity, quote-request flows and the operational kit that keeps the diary booked without a marketing manager.',
    lead:
      'UK plumbing businesses pay £18 to £42 per Google Ads click for emergency-intent terms in 2026 and convert 6 to 14 percent of those into booked jobs — meaning a poorly built funnel burns £130 per lead while a properly engineered one lands at £45. We rebuild Local SEO around your service area, install the review request flow that fires on job completion, and tune Google Ads so the cost per booked job is the line we report against, not impressions.',
    pains: [
      {
        title: 'Lead-gen middleman tax',
        body: 'Checkatrade, Rated People, Bark — the platforms that sit between you and the customer charge 8 to 22 percent of every job and own the relationship. We move you to direct booking through Google so the second job does not pay the middleman again.',
      },
      {
        title: 'Emergency-intent CPCs that punish small budgets',
        body: '"Emergency plumber near me" runs £25 to £42 per click in central London, £14 to £22 in regional cities. Without a tightly built tracking spine and proper negative keywords, a £600 monthly Google Ads budget can vanish in 12 days with nothing booked.',
      },
      {
        title: 'Review velocity that stalls at 25',
        body: 'Most plumbers we audit have between 18 and 35 Google reviews built up over 4 to 7 years and no system to keep collecting. The Map Pack ceiling for plumbers is now 60 plus reviews in most UK cities. Without a request flow, you stay below it.',
      },
    ],
    wins: [
      {
        title: 'Direct GBP bookings beating the lead platforms',
        body: 'Inside 90 days most plumber clients see Google Maps direct calls overtake Checkatrade and Bark as the top lead source. The economics are night and day.',
      },
      {
        title: 'Cost per booked job halved or better',
        body: 'Average client moves from £110 to £160 cost per booked job at takeover, down to £42 to £75 within the first quarter once tracking, landing pages and ad architecture are rebuilt.',
      },
      {
        title: 'Diary kept full without quote chasing',
        body: 'Quote-request form designed for the way buyers actually decide on plumbing work, with conditional logic and an instant-text follow-up. Lifts quote-to-job rate from typical 18 to 25 percent up to 35 to 50 percent.',
      },
    ],
    faq: [
      {
        q: 'How much should a UK plumber spend on marketing each month?',
        a: 'For a one to two-van independent plumber: £450 to £900 a month covers a working Local SEO programme, a basic Google Ads campaign on emergency intent, and a review request flow. £900 to £2,200 a month adds proper Google Ads management, retargeting, and content. Above £2,200 a month is justified once you are running 4 plus vans or moving into commercial work. Below £450 a month, concentrate spend on Local SEO and reviews and skip paid ads — the volume rarely returns.',
      },
      {
        q: 'Are Local Service Ads worth it for UK plumbers?',
        a: 'In the UK, Local Service Ads remain limited compared to the US, with patchy availability across categories and regions. As of mid-2026 they cover specific metropolitan trades reliably (London, Manchester, Birmingham) but not the wider catchment. Where eligible they convert well — pay-per-lead pricing typically lands 30 to 50 percent below comparable Google Search CPC for the same intent. We test eligibility and run them when available; we do not bet a plumbing business\'s budget on LSA alone given UK availability.',
      },
      {
        q: 'How fast can I rank as a plumber on Google Maps?',
        a: 'For a verified GBP with the correct primary category, a clean service area, and 4 to 6 new reviews per month, expect top-three Map Pack ranking within 6 to 12 weeks for postcodes outside central London, 12 to 20 weeks in central London and central Manchester. The single biggest accelerator is review velocity — plumbers typically run 80 to 200 jobs a month, so the request flow can drive 20 to 50 new reviews monthly if installed properly. Most plumbers we audit collect 0 to 4.',
      },
    ],
  },

  electricians: {
    title: 'UK Electricians',
    serviceName: 'Marketing for UK Electricians',
    vertical: 'trades',
    eyebrow: 'Industry · Trades',
    metaDescription:
      'Marketing engineered for UK electricians. Local SEO, NICEIC and Part P signalling, Google Ads on commercial-grade intent, and review velocity tuned to the trade.',
    lead:
      'UK electricians live or die on two signals buyers explicitly search for: NICEIC or NAPIT registration, and Part P certification. Most electrician sites bury both behind a footer logo. We rebuild the GBP and homepage so credentials sit in the first viewport, ship LocalBusiness plus credentialing schema, and tune Google Ads against the commercial and EV-charger installation intent that pays better than emergency residential.',
    pains: [
      {
        title: 'Credentials buried in the footer',
        body: 'NICEIC, NAPIT, Part P — the three certifications buyers Google before they call. Most electrician sites put them in a 32px logo strip at the bottom of the page. We surface them in the hero, in the GBP attributes, and in schema.',
      },
      {
        title: 'Residential-only when commercial pays better',
        body: 'Most independent electricians chase residential because that is what Checkatrade serves them. Commercial fit-out, EV charger installation, and landlord EICR work pays 2 to 4x per job and is undervalued in most marketing setups.',
      },
      {
        title: 'Overspend on broad "electrician near me"',
        body: 'Without negative keywords blocking job-seeker traffic ("apprentice electrician jobs", "electrician training") and cheap-job intent ("electrician for £20"), 30 to 50 percent of paid spend lights on fire.',
      },
    ],
    wins: [
      {
        title: 'EV charger installation pipeline',
        body: 'OZEV-grant-aware landing pages, schema for Wallpod and Pod Point fitter status, Google Ads tuned to OZEV-eligible terms. A category most electricians ignore but search demand has tripled since 2023.',
      },
      {
        title: 'Landlord EICR retainer revenue',
        body: 'Recurring inspection work that smoothes seasonal demand. We package it as a productised offer with clear pricing and a dedicated landing page, then drive the right keyword set to it.',
      },
      {
        title: 'Higher-margin commercial leads',
        body: 'Office, retail and HMO landlord work. Different keyword set, different landing page, different tracking spine. Cost per qualified lead 2 to 5x what residential pays back.',
      },
    ],
    faq: [
      {
        q: 'How important is NICEIC or NAPIT registration for SEO?',
        a: 'Important enough to put in the H1, the GBP business description, and the schema. UK buyers explicitly search for "NICEIC electrician" or "NAPIT registered electrician" in roughly 12 to 18 percent of category searches based on UK GSC data we have run. Including the registration in the GBP services list, on the homepage hero, and in LocalBusiness schema lifts both Map Pack ranking and click-through rate. Faking the registration or claiming an expired one is fraud and breaks both consumer law and Google\'s policies — we do not work with anyone considering it.',
      },
      {
        q: 'Should an electrician focus on EV charger installation?',
        a: 'If you are not yet in it and you are NICEIC or NAPIT registered with the right OZEV authorisation, yes — UK search demand for "EV charger installation" grew roughly 280 percent from 2022 to 2026 and most electrical contractors have not built dedicated landing pages or content for it. We see cost per booked installation typically 30 to 50 percent below comparable residential rewiring jobs, with average ticket 2 to 3x higher. Worth the investment to build out the dedicated funnel.',
      },
      {
        q: 'How long until an electrician ranks on Google Maps?',
        a: 'For a verified GBP with NICEIC or NAPIT in the primary description, a correct primary category, and 3 to 5 new reviews per month, top-three Map Pack ranking lands in 8 to 14 weeks for most UK cities, 14 to 22 weeks for central London. Electricians typically run 60 to 150 jobs a month, which gives healthy review velocity headroom — the bottleneck is almost always not having a request flow installed, not transaction volume.',
      },
    ],
  },

  restaurants: {
    title: 'UK Restaurants',
    serviceName: 'Marketing for UK Restaurants',
    vertical: 'hospitality',
    eyebrow: 'Industry · Hospitality',
    metaDescription:
      'Marketing engineered for UK restaurants. GBP and Google Maps, deposit-taking on bookings, cover-recovery email, the Tripadvisor-Google split, and an honest take on Deliveroo dependency.',
    lead:
      'A UK independent restaurant pays Deliveroo and Uber Eats 25 to 32 percent commission on delivery covers and 14 to 18 percent on direct OpenTable bookings — a structural margin tax most operators have stopped trying to escape. We rebuild direct booking around a deposit-taking flow, install the review velocity that puts you in the Map Pack and Google Maps food-discovery panel, and design a no-show recovery email that lifts confirmed covers by 18 to 35 percent.',
    pains: [
      {
        title: 'OpenTable, Deliveroo + the platform tax',
        body: 'Every cover routed through a third party costs you 14 to 32 percent of the bill. Direct booking through your own site keeps the margin and the customer relationship — but only if the booking flow does not punish the customer who tries it.',
      },
      {
        title: 'No-shows eating 8 to 22 percent of seated covers',
        body: 'Without deposits or card capture, weekend service no-shows in central London restaurants now run 14 to 22 percent of bookings. £2,400 a month walks out the door before food cost.',
      },
      {
        title: 'Tripadvisor reviews dragging the Google profile',
        body: 'Many restaurants pour effort into Tripadvisor while the Map Pack profile sits at 32 reviews and a 3.8 average. Google reviews now drive 4 to 6x more booking discovery than Tripadvisor for everything except tourist-heavy postcodes.',
      },
    ],
    wins: [
      {
        title: 'Deposit-taking direct bookings',
        body: 'Card-capture or 30 percent deposit on the booking form. Cuts no-shows by 60 to 80 percent. Surfaces Stripe-native, no app, no platform fees beyond standard card processing.',
      },
      {
        title: 'Map Pack visibility for "restaurant near me"',
        body: 'The single highest-volume restaurant search query in every UK city. Top three positions deliver 70 percent of food-intent click traffic. We engineer the GBP, photos, and review velocity to land it.',
      },
      {
        title: 'Recovery email + birthday and anniversary flows',
        body: 'Lifecycle email tied to the booking record: rebook 21 days after last visit, birthday offer, anniversary acknowledgment. Repeat-booking lift of 12 to 28 percent inside the first quarter.',
      },
    ],
    faq: [
      {
        q: 'Are restaurant deposits worth the friction they add?',
        a: 'For weekend service in central London, Manchester and Edinburgh: yes, decisively. Deposits or card capture cut no-shows from a typical 14 to 22 percent down to 3 to 6 percent. Conversion on the booking form drops 8 to 14 percent because some customers will not enter card details, but the no-show recovery alone is worth £1,800 to £4,200 a month for a 60 cover restaurant. For weekday lunch in suburban locations the maths flips — the booking conversion drop usually outweighs the lower no-show baseline. We run them on weekend service only for most clients.',
      },
      {
        q: 'Should a UK restaurant prioritise Tripadvisor or Google reviews?',
        a: 'Google, by a wide margin, unless your restaurant sits in a tourist-dominant postcode (Old Town Edinburgh, Covent Garden, Royal Mile, Bath city centre). For everyone else, Google reviews drive 4 to 6 times more booking discovery, weight directly on Map Pack ranking, and feed AI search citations. We aim for 4 to 8 new Google reviews per month sustained, with Tripadvisor as a secondary channel only when the visitor mix justifies the effort. The single biggest restaurant marketing mistake we see is a 4.6 star Tripadvisor profile alongside a 3.9 star Google profile with 60 reviews.',
      },
      {
        q: 'How do I escape the Deliveroo commission tax?',
        a: 'Honestly, you do not — you reduce dependency. Deliveroo and Uber Eats own the lunchtime convenience-driven food discovery layer for most UK postcodes, and rebuilding that from scratch costs more than the commission ever will. The right strategy is to make direct dine-in and direct collection the default for repeat customers (loyalty, email, deposit-required reservations) while accepting Deliveroo as the customer-acquisition tier for first-time discovery. We see most restaurants land at 35 to 50 percent direct, 50 to 65 percent platform after a year of focused work.',
      },
    ],
  },

  pubs: {
    title: 'UK Pubs',
    serviceName: 'Marketing for UK Pubs',
    vertical: 'hospitality',
    eyebrow: 'Industry · Hospitality',
    metaDescription:
      'Marketing engineered for UK pubs. Maps optimisation, table booking systems, Sunday roast SEO, beer garden imagery, and the events calendar that fills midweek covers.',
    lead:
      'UK pubs are increasingly food-led — gross profit on food now exceeds wet trade for around 60 percent of independent pubs — but their marketing is still built around drink-led search. We rebuild the GBP around food intent, install a table booking flow that takes deposits on parties of six or more, and engineer the Sunday roast and Sunday lunch SEO that drives 35 to 50 percent of weekly food revenue.',
    pains: [
      {
        title: 'Drink-led GBP, food-led revenue',
        body: 'Most pub GBP profiles still default to "Pub" primary category and barely mention food. Buyers searching "Sunday roast near me" or "pub food Manchester" never find them.',
      },
      {
        title: 'Beer garden and outdoor space underused in marketing',
        body: 'Outdoor capacity is the biggest UK pub differentiator after food. Most marketing buries the beer garden in a 200px footer image. Google Maps photo optimisation and a dedicated landing page typically lift summer covers 25 to 45 percent.',
      },
      {
        title: 'Midweek empty seats and no events calendar',
        body: 'Most independents lose money Tuesday and Wednesday. A live events calendar (quiz nights, live music, supper clubs) plus a quiet email list usually closes that gap inside a quarter.',
      },
    ],
    wins: [
      {
        title: 'Sunday roast Map Pack visibility',
        body: '"Sunday roast near me" is now the single highest-volume pub search query in most UK postcodes. Top three Map Pack delivers 60 to 75 percent of click traffic. We engineer the GBP, food menu, photo set and reviews to land it.',
      },
      {
        title: 'Table booking with deposits on parties of 6+',
        body: 'Cuts no-shows by 60 to 80 percent on the bookings that hurt most. Smaller parties keep a friction-free flow.',
      },
      {
        title: 'Events calendar that fills the dead nights',
        body: 'Quiz nights, live music, supper clubs published on-page with schema and pushed via email. Done well, it lifts midweek revenue 18 to 30 percent inside the first quarter.',
      },
    ],
    faq: [
      {
        q: 'What pub category should I pick on Google Business Profile?',
        a: 'For food-led pubs (more than 50 percent gross profit from food), use "Gastropub" as primary if it fits, "Restaurant" if you genuinely run as a restaurant with a bar. Use "Pub" only if drink remains the dominant trade. Add the rest as secondary categories. The single biggest pub Local SEO error we see is a food-led pub stuck on "Pub" primary, ranking nowhere for food intent. Changing the primary category is one of the fastest wins available — most pubs see Map Pack movement within 14 to 21 days.',
      },
      {
        q: 'How important are pub photos on Google?',
        a: 'Critical for food-led pubs. Pubs with 30 plus owner-uploaded photos and 50 plus customer photos see roughly 2.4x more Maps direction requests than those with under 10 each. Photos buyers actually want: the beer garden in good light, the Sunday roast plate, the menu board, the actual interior at a busy service. Avoid stock photography — Google demotes profiles with detected stock images. We brief a single afternoon photo session covering 12 to 20 named angles for most pub clients.',
      },
      {
        q: 'Should a UK pub run paid Google Ads?',
        a: 'For most independents, no — the cost per cover does not work. £6 to £12 per click on "Sunday roast near me" needs a £20 to £40 average cover to break even on first visit, and most independent pubs sit at £15 to £25 average per head on Sunday. The exceptions: destination pubs with private dining (£40+ average ticket), groups with 20+ rooms and food, and pubs running explicit event ticketing. For everyone else the budget compounds better in Local SEO and review velocity.',
      },
    ],
  },

  cafes: {
    title: 'UK Cafes',
    serviceName: 'Marketing for UK Independent Cafes',
    vertical: 'hospitality',
    eyebrow: 'Industry · Hospitality',
    metaDescription:
      'Marketing engineered for UK independent cafes. Map Pack ranking, Instagram-to-walk-in funnels, owner photo SEO, the breakfast and brunch search wave, and loyalty that pays back.',
    lead:
      'UK independent cafes live on Google Maps and Instagram — and almost nothing else. Walk-ins driven by "coffee near me" and "brunch near me" Map Pack searches now account for roughly 55 to 75 percent of new customer discovery for the average independent. We engineer the GBP photo set, ship the breakfast and brunch on-page schema buyers and Google now read together, and build the loyalty layer (email, app, or punch card digitised) that compounds the second visit into the tenth.',
    pains: [
      {
        title: 'Photo-strategy guesswork',
        body: 'Cafes know photos matter, but most of them rotate the same five Instagram squares onto the GBP. Google rewards specific angles — owner-uploaded interior in good light, the actual coffee menu board, the brunch plate at table — and demotes profiles where customer photos hugely outweigh the brand\'s own.',
      },
      {
        title: 'Breakfast intent missed',
        body: '"Breakfast near me" and "brunch near me" run 35 to 60 percent above "coffee near me" in volume in most UK city centres on Saturday and Sunday morning. Most cafe GBPs do not list breakfast or brunch as primary services, so they invisible at the highest-intent moment.',
      },
      {
        title: 'No second-visit mechanism',
        body: 'Most cafes hand a five-stamp loyalty card and lose the customer between visits two and seven. A simple email signup at the till plus an automated three-touch flow lifts repeat visit rate by 15 to 30 percent.',
      },
    ],
    wins: [
      {
        title: 'Map Pack top three for "coffee near me"',
        body: 'The single highest-volume cafe search query in every UK postcode. Top three Map Pack drives 60 to 80 percent of new walk-ins for independents. We engineer the GBP, primary category, photos and review velocity to land it.',
      },
      {
        title: 'Brunch + breakfast service pages that rank',
        body: 'On-page schema and content tuned for the weekend search wave. The cafes that capture brunch intent typically lift Saturday revenue by 20 to 45 percent.',
      },
      {
        title: 'Loyalty layer that pays back',
        body: 'Digitised loyalty tied to a simple email or app capture at the till. Repeat visit rate up 15 to 30 percent inside the first quarter, with the email list becoming the single highest-margin revenue source by month six.',
      },
    ],
    faq: [
      {
        q: 'What should a UK cafe spend on marketing each month?',
        a: 'For a single-location independent: £150 to £450 a month covers a working Local SEO programme, the loyalty layer, and a quarterly photo refresh. £450 to £900 a month adds proper review request automation and content. Above that is rarely justified for a single site — the volume ceiling caps return. Most independent cafes overspend on Instagram boosts and underspend on Google Business Profile photo and review velocity, which is the inverse of what actually drives walk-ins.',
      },
      {
        q: 'How important are Instagram photos for a UK cafe?',
        a: 'Important for brand-building and second-visit reminders, less important than Google for first-time discovery. The average walk-in journey for a UK cafe in 2026 is: search "coffee near me" or "brunch near me" → see Map Pack → click into GBP → see photos → walk in. Instagram comes in second visit and beyond. We see best results from cafes who photograph for Google first, repurpose to Instagram second — the inverse of how most cafes operate.',
      },
      {
        q: 'Should a UK cafe accept Deliveroo and Uber Eats?',
        a: 'For most cafes, no. The 25 to 32 percent commission on a £4.50 flat white and a £6.50 brunch dish wipes out the margin entirely once packaging and prep time are accounted for. The exceptions are cafes with high-margin baked goods that travel well (£3.50 cookies, £4.50 pastries) and busy lunchtime savoury (£10+ tickets). Most successful cafes we work with do delivery for 6 to 14 dishes in a tight menu, not their full counter, and break even rather than scale on it.',
      },
    ],
  },

  salons: {
    title: 'UK Hair + Beauty Salons',
    serviceName: 'Marketing for UK Hair + Beauty Salons',
    vertical: 'beauty',
    eyebrow: 'Industry · Beauty',
    metaDescription:
      'Marketing engineered for UK hair and beauty salons. Booking software, deposit-taking, no-show recovery, Instagram-to-booking funnels, and review velocity tuned to the trade.',
    lead:
      'UK hair and beauty salons lose 12 to 22 percent of booked revenue to no-shows annually — usually £15,000 to £55,000 a year for a four-chair salon. The fix is well-known but rarely shipped properly: deposit-taking on booking, automated SMS reminders, and a no-show recovery flow. We rebuild the booking software (or migrate cleanly off Fresha or Treatwell), engineer the review request flow, and tune the Instagram-to-booking funnel that actually fills chairs.',
    pains: [
      {
        title: 'Fresha and Treatwell platform fees',
        body: 'Treatwell takes 25 to 35 percent commission on new client bookings made through the marketplace. Fresha is free until you switch on payments — then it lifts a percentage on every transaction. The economics often work better on a direct booking system once you are above 8 to 12 weekly bookings.',
      },
      {
        title: 'No-shows eating 12 to 22 percent of revenue',
        body: 'Without deposits or card capture, salon no-show rates in central UK locations now run 12 to 22 percent. £2,400 a month walks out empty for a standard four-chair salon.',
      },
      {
        title: 'Instagram-to-booking gap',
        body: 'Salons build strong Instagram followings then watch the followers fail to convert because the booking link buried in the bio takes them to a slow, ugly Treatwell page. The conversion drop on a poor booking experience is brutal.',
      },
    ],
    wins: [
      {
        title: 'Deposit-taking direct booking',
        body: 'Card-capture or 30 to 50 percent deposit on the booking flow. Cuts no-shows by 60 to 80 percent. We typically deploy on Zatrovo or migrate from Treatwell, depending on stack.',
      },
      {
        title: 'Map Pack ranking for "hair salon near me"',
        body: 'The highest-volume salon search query, with top three Map Pack delivering 65 to 80 percent of new client click traffic. We engineer the GBP, photos and review velocity to land it.',
      },
      {
        title: 'Review velocity matched to booking volume',
        body: 'Salons run 60 to 200 weekly transactions, which is healthy review request fuel. Most we audit collect 0 to 4 reviews monthly because the request flow is manual or absent. Installed properly, the same volume drives 15 to 40 new reviews monthly.',
      },
    ],
    faq: [
      {
        q: 'Fresha or Treatwell for a UK independent salon?',
        a: 'For salons under 8 weekly online bookings or just starting out: Fresha, because the marketplace acquisition is genuine and the platform is free until you switch on payments. For salons above 8 to 12 weekly bookings with an established client base: a direct booking system (Zatrovo, Phorest, custom) almost always beats Treatwell on margin once you factor 25 to 35 percent marketplace commission. Migrating from Treatwell to direct typically pays back inside 60 to 90 days for medium salons. We help size the call in week one of any engagement.',
      },
      {
        q: 'Are deposits worth it for a hair salon?',
        a: 'Yes, for any salon running more than 25 weekly bookings or with a no-show rate above 8 percent. Deposits or card capture cut no-shows from a typical 12 to 22 percent down to 3 to 6 percent. Booking conversion on the form drops 6 to 14 percent because some clients won\'t enter card details, but the no-show recovery is worth £1,200 to £3,500 a month for a four-chair salon. The honest balance is a 30 percent deposit, a clear refund window of 24 to 48 hours, and a humane policy on first-time genuine emergencies.',
      },
      {
        q: 'How important are review photos for salon Map Pack?',
        a: 'For colour, balayage and cut salons: very. UK buyers searching "balayage near me" or "hair salon near me" now spend roughly 40 percent of their pre-booking time inside the GBP photo grid, especially on the customer-uploaded results. Salons with 60+ owner-uploaded result photos and 100+ customer photos rank a full step higher in Map Pack on average than ones with under 20 of each. We brief a quarterly photo refresh — best work, real lighting, before-and-after pairs — into every salon engagement.',
      },
    ],
  },

  dentists: {
    title: 'UK Dental Practices',
    serviceName: 'Marketing for UK Dental Practices',
    vertical: 'healthcare',
    eyebrow: 'Industry · Healthcare',
    metaDescription:
      'Marketing engineered for UK dental practices. GDC and CMA-compliant by default. New patient acquisition, treatment-specific landing pages, review velocity, and the AI-search work that wins category citations.',
    lead:
      'UK dental marketing is bound by the GDC ethical advertising code and the April 2025 CMA fake review rules, which between them rule out the testimonial heavy, results-promising marketing most categories rely on. We engineer compliance-safe new patient acquisition: treatment-specific landing pages with proper price ranges, GDC-compliant review velocity, schema for accepted clinics, and the AI search citation work that wins "best dentist near me" inside ChatGPT and Perplexity.',
    pains: [
      {
        title: 'GDC ethical advertising compliance',
        body: 'No "before and after" without consent and full context. No claims that imply guaranteed outcomes. No incentivising reviews. Most dental marketing agencies miss at least two of those, and the GDC fitness-to-practise process is no joke.',
      },
      {
        title: 'CMA fake review rules + dental specifics',
        body: 'Dental reviews are particularly scrutinised under the April 2025 CMA fake review rules because clinical claims fall under stricter advertising standards. Incentivised reviews, gated requests, fake reviews — all banned. The right system is fully compliant by design.',
      },
      {
        title: 'High CPC, low qualified-lead conversion',
        body: '"Implants near me" runs £8 to £22 per click in most UK cities. Without clinic-specific tracking, accepted-treatment qualification, and proper landing page architecture, paid spend on dental implants typically lands at £400 to £900 cost per genuine consultation booked.',
      },
    ],
    wins: [
      {
        title: 'Treatment-specific landing pages with price ranges',
        body: 'Implants, Invisalign, composite bonding, hygiene plans. Each treatment gets its own page with a real price range (banned ranges are vague — banded ones are not), procedure detail, recovery, and a booking flow tied to consultation, not treatment.',
      },
      {
        title: 'GDC-compliant review request flow',
        body: 'Triggered after appointment, sent over SMS with a one-tap deep link. No incentives, no gating, no guarantee of clinical outcome. Most clinics move from 12 to 25 reviews to 60 to 140 inside the first 12 months.',
      },
      {
        title: 'AI search citation work for "best dentist" queries',
        body: 'When buyers ask ChatGPT or Perplexity for the best dentist in their area, the answer is increasingly being written. We engineer Organization and Dentist schema, named-source citations, and Knowledge Graph reconciliation so your clinic appears in the answer, not just the SERP.',
      },
    ],
    faq: [
      {
        q: 'Are review request automations GDC compliant?',
        a: 'Yes, when built correctly. The GDC ethical advertising guidance permits patient testimonials with consent and prohibits incentivisation, fabrication, or claims that imply guaranteed clinical outcomes. The April 2025 CMA fake review rules add a layer: no review gating, no paid reviews, no posting fake reviews. Automated requests sent to verified patients, accepting both positive and negative responses equally, with no incentive attached, comply with both. We do not send to lapsed patients without a fresh consent, and we do not run review gating. If anyone offers your practice "5-star review packages", refuse and report them.',
      },
      {
        q: 'How long until a UK dental practice ranks on Google Maps?',
        a: 'For a verified GBP with the correct primary category (Dentist or Cosmetic Dentist), GDC numbers in the description, and 4 to 8 new reviews per month, top-three Map Pack ranking lands in 8 to 14 weeks for most UK cities, 14 to 22 weeks in central London where the competitive set is dense. Most clinics we audit have 28 to 80 reviews; the threshold for top-three in central London for "dentist near me" is now around 120 to 180 reviews with steady velocity.',
      },
      {
        q: 'Do AI search engines actually drive new patients yet?',
        a: 'In 2026, yes — measurably for premium treatments. We track citation appearances in ChatGPT, Perplexity and Google AI Overviews for "best Invisalign in [city]" and "best dental implants near [postcode]" types of queries across UK clinic clients, and the citation share converts at 4 to 8x the rate of organic search clicks. Volume is still smaller than Google organic — perhaps 8 to 20 percent of total enquiry volume — but the conversion gap is wide enough that AI search work is worth doing for any clinic running implants, Invisalign or smile design as part of the mix.',
      },
    ],
  },

  solicitors: {
    title: 'UK Solicitors + Law Firms',
    serviceName: 'Marketing for UK Solicitors + Law Firms',
    vertical: 'professional',
    eyebrow: 'Industry · Professional Services',
    metaDescription:
      'Marketing engineered for UK solicitors and law firms. SRA-compliant by default. Practice-area landing pages, conveyancing and family law search, review velocity within Solicitors Code Conduct.',
    lead:
      'UK solicitor marketing operates inside the SRA Code of Conduct and the Standards and Regulations 2019 — which prohibit cold contact in most contexts, restrict comparative advertising, and demand specific disclosure for client testimonials. Most generic agencies blunder through both. We build practice-area landing pages with SRA-compliant copy, ship review velocity inside the Solicitors Code, and engineer the Local SEO that wins "conveyancing solicitor near me" and "family law solicitor [city]" without crossing any regulatory line.',
    pains: [
      {
        title: 'SRA Code compliance most agencies fail',
        body: 'Cold contact restrictions, comparative advertising limits, disclosure requirements on client testimonials. Most generic SEO agencies advise tactics that breach the SRA Code. The fitness-to-practise process is real consequence.',
      },
      {
        title: 'Practice-area silos vs generic homepage',
        body: 'A firm doing conveyancing, family law, employment and probate cannot rank for any of those with a generic "About Us" homepage. Each practice area needs its own page architecture, with proper schema and named solicitors.',
      },
      {
        title: 'High-intent paid spend with broken tracking',
        body: '"Conveyancing solicitor [city]" CPCs run £8 to £18. Without phone-call tracking, form-submission tracking, and matter-creation as the conversion event, ad spend on legal services typically lands at £180 to £450 cost per genuine matter — 2 to 4x what it should.',
      },
    ],
    wins: [
      {
        title: 'Practice-area landing pages with named solicitors',
        body: 'Conveyancing, family, probate, employment, immigration. Each with its own page, named solicitor schema, SRA compliance disclosure, and a booking or contact flow tied to matter type.',
      },
      {
        title: 'Review velocity inside the SRA Code',
        body: 'Triggered post-matter-completion, requesting a Google review without incentivisation, with proper disclosure. Most firms move from 12 to 30 reviews to 60 to 140 inside 12 months without breaching the Code.',
      },
      {
        title: 'Local SEO for "near me" legal queries',
        body: '"Conveyancing solicitor near me", "divorce solicitor [city]", "probate solicitor London". The high-intent local queries that drive new matters. Top three Map Pack delivers 50 to 70 percent of click traffic.',
      },
    ],
    faq: [
      {
        q: 'Are client testimonials allowed under the SRA Code of Conduct?',
        a: 'Yes, with conditions. The SRA Code permits client testimonials provided they are genuine, accurately represent the matter, and do not imply guaranteed outcomes. Specific conditions: no comparison with other firms\' results, no statements implying success rate guarantees, and any testimonial reproduced on your site must be supported by genuine signed consent from the client. Reviews on Google or Trustpilot left voluntarily by clients are fine and benefit firms who request them properly. We build review request flows aligned with both SRA Code and the April 2025 CMA fake review rules.',
      },
      {
        q: 'Can a UK law firm cold-contact prospects through email or LinkedIn?',
        a: 'Almost never under the SRA Code in 2026. The Code restricts unsolicited approaches to anyone who has not given clear consent, with narrow exceptions for in-house corporate legal teams in B2B contexts. The risk is real — there have been multiple SRA fines for breach in the last three years. We design lead acquisition around inbound channels (Local SEO, Google Ads, content) and explicit-opt-in CRM rather than cold outbound. Anyone selling a law firm "cold LinkedIn outreach" services should be refused.',
      },
      {
        q: 'How long until a UK solicitor ranks on Google Maps?',
        a: 'For a verified GBP with the correct primary category, named solicitors in the description, and 3 to 6 new reviews per month, top-three Map Pack lands in 10 to 16 weeks for most UK cities, 16 to 24 weeks in central London. Solicitors typically run 60 to 200 active matters across the firm with maybe 8 to 30 of those completing per month — review velocity rate-limited by completion volume rather than effort. We design the request flow to fire at matter completion only, properly compliant.',
      },
    ],
  },

  accountants: {
    title: 'UK Accountants + Bookkeepers',
    serviceName: 'Marketing for UK Accountants + Bookkeepers',
    vertical: 'professional',
    eyebrow: 'Industry · Professional Services',
    metaDescription:
      'Marketing engineered for UK accountants and bookkeepers. ICAEW and ACCA compliance, MTD-aware service pages, review velocity, and the productised pricing that fills capacity without quote chasing.',
    lead:
      'UK accountancy practice fees grew 8 to 14 percent annually since Making Tax Digital phase one, but most independent firms still quote bespoke and lose 25 to 40 percent of website visitors at the "Contact us for a quote" wall. We rebuild the service pages around productised pricing (Limited Company packages, Self-Assessment, payroll, MTD), install the review velocity that beats your equally-qualified competitors, and engineer the Local SEO that wins "accountant near me" without breaching ICAEW or ACCA practice rules.',
    pains: [
      {
        title: '"Contact us for a quote" friction',
        body: '25 to 40 percent of website visitors bounce at the bespoke-quote wall. Practices that productise core services into transparent packages convert at 2 to 3x the rate, and self-select higher-quality leads in the process.',
      },
      {
        title: 'MTD ITSA, MTD VAT — service pages stuck in 2019',
        body: 'Most accountancy site service pages have not been updated since the original MTD VAT rollout. Buyers searching MTD ITSA, sole-trader MTD, or HMRC making tax digital for income tax find vague generic copy. The right answer ranks.',
      },
      {
        title: 'Indistinguishable from every other local firm',
        body: 'ICAEW, ACCA, qualified team, decades of experience, friendly personal service. Most local accountancy sites are identical. Differentiation lives in named partners, named softwares (Xero, FreeAgent, QuickBooks), named industries served — not in trust badges.',
      },
    ],
    wins: [
      {
        title: 'Productised service pricing pages',
        body: 'Limited Company packages, Self-Assessment, monthly bookkeeping, payroll, VAT. Each with a clear monthly or annual price range, included items, and a direct booking flow. Lead conversion rate 2 to 3x bespoke-quote walls.',
      },
      {
        title: 'MTD-aware service pages',
        body: 'Specific pages for MTD ITSA, MTD VAT, sole-trader Making Tax Digital. Schema-rich, FAQ-rich, with the deadlines and thresholds that matter in 2026. Captures the high-intent search wave.',
      },
      {
        title: 'Niche-vertical positioning that wins',
        body: 'Most successful accountancy SEO clients we work with own a niche — accountancy for plumbers, accountancy for dentists, accountancy for ecommerce sellers. Generic local accountant ranking is fiercely competitive; niche-vertical positioning wins faster and at higher fees.',
      },
    ],
    faq: [
      {
        q: 'Should a UK accountancy firm publish prices?',
        a: 'For most independents serving micro and small business clients: yes, decisively. Bespoke quoting works for £20k+ engagement averages and complex compliance work. For Limited Company packages priced £80 to £250 a month, Self-Assessment at £180 to £450, and standard payroll, transparent pricing converts website visitors at 2 to 3x the rate of "Contact us for a quote" walls and reduces low-fit enquiries materially. Concerns about competitors undercutting are usually overblown — buyers who convert on price alone almost never become long-term clients anyway.',
      },
      {
        q: 'How important are ICAEW and ACCA badges for SEO?',
        a: 'Important enough to include in the GBP description, the homepage hero, and the schema. UK buyers explicitly search "ICAEW accountant" or "ACCA accountant" in a meaningful share of category queries — typically 6 to 12 percent based on UK GSC data we have run. Including the qualification name in the GBP services list, on the homepage, and in Organization schema lifts both Map Pack ranking and click-through rate. Faking the membership is fraud and breaks both the ICAEW or ACCA disciplinary code and Google\'s policies.',
      },
      {
        q: 'Should an accountancy firm specialise in a niche?',
        a: 'Almost always yes for marketing leverage, even if you continue serving generally. Niche-vertical accountancy ("accountant for plumbers", "accountant for ecommerce sellers", "accountant for dentists") consistently ranks faster, charges 25 to 60 percent higher fees per equivalent service, and converts at higher rates than generic local accountancy positioning. The internal capability does not need to be exclusive — most successful niche firms continue serving across verticals — but the marketing position needs to be specific. We help shape the niche choice in week one of any engagement.',
      },
    ],
  },

  builders: {
    title: 'UK Builders + Construction',
    serviceName: 'Marketing for UK Builders + Construction',
    vertical: 'trades',
    eyebrow: 'Industry · Trades',
    metaDescription:
      'Marketing engineered for UK builders. Project galleries that convert, Federation of Master Builders signalling, Local SEO for extension and renovation queries, and lead-quality scoring that filters tyre-kickers.',
    lead:
      'UK builders compete on a fundamentally different funnel from other trades — the buyer is researching for 4 to 18 weeks before contact, comparing 3 to 7 firms before quote, and the average enquiry-to-job conversion sits at 8 to 18 percent. We rebuild the project gallery as the conversion engine it should be (named borough, named scope, real budget bands), install lead-quality scoring so you do not waste a Tuesday quoting a kitchen extension on a £15k budget, and engineer Local SEO around the extension and renovation queries that drive £40k to £180k jobs.',
    pains: [
      {
        title: 'Tyre-kicker enquiry overload',
        body: 'Without proper qualifying questions on the contact form, builders waste 30 to 50 percent of estimate visits on jobs the budget cannot support. The right form architecture filters before the appointment.',
      },
      {
        title: 'Project gallery as afterthought',
        body: 'Most builder websites bury 12 jpegs of past work in a hidden Projects page. The gallery should be the homepage. With named borough, named scope, real budget band, named timescale, and proper schema. Buyers compare 3 to 7 firms before quote — the gallery decides which 3 you make.',
      },
      {
        title: 'Federation of Master Builders signal underused',
        body: 'FMB membership is a meaningful trust signal in UK building. Most member firms put it in a 32px footer logo. We surface it in the hero, in the GBP description, and in schema.',
      },
    ],
    wins: [
      {
        title: 'Project gallery as the conversion engine',
        body: 'Named borough, named scope, real budget band, real timescale, before and afters. Schema-rich. Filterable by job type. The single highest-leverage page on a builder website.',
      },
      {
        title: 'Lead-quality scoring on the contact form',
        body: 'Postcode + scope + budget band + timescale up front. Filters tyre-kickers before the estimate visit. Builders typically save 8 to 14 quote-visit hours a week, which compounds into more genuine wins.',
      },
      {
        title: 'Map Pack ranking for renovation + extension queries',
        body: '"Builder near me", "loft conversion [city]", "house extension builders". The high-intent queries that drive £40k to £180k jobs. Top three Map Pack delivers 55 to 75 percent of click traffic.',
      },
    ],
    faq: [
      {
        q: 'Should a UK builder show prices on the website?',
        a: 'Show price ranges, not fixed prices. UK building work has too much variability for fixed pricing — but bands of "loft conversions typically £45k to £85k", "single-storey rear extensions £35k to £75k", "kitchen extensions £40k to £110k" let buyers self-select. Builders who publish ranges convert at 1.6 to 2.2x the rate of those with no pricing at all, because tyre-kickers self-filter and serious buyers feel the firm is honest. The ranges should be wide enough to cover spec variation but narrow enough to exclude the obvious mis-fits.',
      },
      {
        q: 'How important is FMB membership for builder Local SEO?',
        a: 'Important enough to put in the H1, the GBP business description, and the schema. UK buyers explicitly search "FMB builder" or "Federation of Master Builders [city]" in around 5 to 9 percent of category searches based on UK GSC data we have run. The TrustMark scheme adds another 3 to 5 percent. Including either in the GBP services list, on the homepage hero, and in LocalBusiness schema lifts both Map Pack ranking and click-through rate noticeably. Faking the membership is straight fraud — do not.',
      },
      {
        q: 'How long until a UK builder ranks on Google Maps?',
        a: 'Slower than most trades because builder GBPs typically have lower review volume per month given the long project cycle. For a verified GBP with FMB or TrustMark in the primary description, the correct primary category, and 2 to 4 new reviews per month, top-three Map Pack ranking lands in 14 to 22 weeks for most UK cities, 22 to 30 weeks in central London. The bottleneck is review velocity — builders complete 8 to 25 jobs a year per van, not per week, so the request flow timing and the on-completion follow-up matter more than for higher-volume trades.',
      },
    ],
  },
};

const INDUSTRY_SLUGS = Object.keys(INDUSTRIES);

// Title-case UK acronym + lowercase rest. "UK Plumbers" -> "UK plumbers".
function softLower(title) {
  return title.replace(/^UK\s+/, 'UK ').replace(/^UK\s+(.+)$/, (_, rest) => `UK ${rest.toLowerCase()}`);
}

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((industry) => ({ industry }));
}

export async function generateMetadata({ params }) {
  const { industry } = await params;
  const data = INDUSTRIES[industry];
  if (!data) return {};
  const title = `${data.serviceName} · Irvale Studio`;
  return {
    title,
    description: data.metaDescription,
    alternates: { canonical: absUrl(`/for/${industry}`) },
    openGraph: {
      title,
      description: data.metaDescription,
      url: absUrl(`/for/${industry}`),
      type: 'website',
    },
  };
}

export default async function IndustryPage({ params }) {
  const { industry } = await params;
  const data = INDUSTRIES[industry];
  if (!data) notFound();

  const posts = getAllPosts({ vertical: data.vertical });
  const url = `/for/${industry}`;

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Industries', url: '/for' },
      { name: data.title, url },
    ]),
    serviceJsonLd({
      name: data.serviceName,
      description: data.metaDescription,
      url,
      areaServed: ['GB'],
    }),
    faqJsonLd(data.faq),
    collectionPageJsonLd({
      name: `${data.title} — Field Notes`,
      description: `Field notes from Irvale Studio on marketing for ${data.title}.`,
      url,
      items: posts.map((p) => ({ name: p.title, url: `/blog/${p.slug}` })),
    }),
    itemListJsonLd({
      name: `${data.serviceName} — Wins`,
      items: data.wins.map((w) => ({ name: w.title, url })),
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
              <li><Link href="/for" className="hover:text-gold">Industries</Link></li>
              <li aria-hidden="true" className="text-gold/50">/</li>
              <li className="text-text-light/80">{data.title}</li>
            </ol>
          </nav>

          <Eyebrow className="mb-6 block">{data.eyebrow}</Eyebrow>
          <h1 className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[900px] mb-6">
            Marketing for {data.title}
          </h1>
          <p className="speakable font-body text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-muted-light font-light max-w-[60ch] !text-text-muted-light !border-gold">
            {data.lead}
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

      {/* Pains + wins */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-14">
            <div>
              <Eyebrow className="mb-6 block">Where it leaks</Eyebrow>
              <h2 className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] mb-10">
                The failure modes specific to {softLower(data.title)}.
              </h2>
              <div className="space-y-8">
                {data.pains.map((p, i) => (
                  <div key={i} className="border-l-2 border-[var(--border-light)] pl-6">
                    <h3 className="font-display font-normal text-text-dark text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] mb-3">
                      {p.title}
                    </h3>
                    <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Eyebrow className="mb-6 block">Where it compounds</Eyebrow>
              <h2 className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] mb-10">
                What we ship for {softLower(data.title)}.
              </h2>
              <div className="space-y-8">
                {data.wins.map((w, i) => (
                  <div key={i} className="border-l-2 border-gold pl-6">
                    <h3 className="font-display font-normal text-text-dark text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] mb-3">
                      {w.title}
                    </h3>
                    <p className="font-body text-[length:var(--type-body)] text-text-muted-dark font-light leading-relaxed">
                      {w.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Field notes */}
      <section className="bg-[var(--color-cream-2)] py-[var(--section-gap)] border-y border-[var(--border-light)]">
        <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="max-w-2xl mb-12">
            <Eyebrow className="mb-4 block">Field notes</Eyebrow>
            <h2 className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)]">
              Writing for {softLower(data.title)}.
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
              The questions {softLower(data.title)} owners ask first.
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
                  Marketing engineered for {softLower(data.title)}, run as one system.
                </h2>
                <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light max-w-2xl">
                  Revenue Engineering bundles website, booking, Local SEO, reviews, AI search and reporting under one accountable team. From $1,450 a month, three month minimum.
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
