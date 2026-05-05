// ─────────────────────────────────────────────
// Capabilities · full service catalogue for /services
// No pricing. Pure deliverables + outcomes.
// ─────────────────────────────────────────────

export const capabilities = [
  {
    slug: 'websites',
    number: '01',
    name: 'Websites & Web Apps',
    tagline: 'Bespoke. Fast. Built to convert.',
    summary:
      'Custom-engineered marketing sites and full web applications. No templates. Built around your business, not someone else\'s patterns.',
    deliverables: [
      'Bespoke marketing websites',
      'Custom web applications & portals',
      'E-commerce platforms with Stripe & multi-currency',
      'Membership sites & gated content',
      'Properly internationalised builds (hreflang, localised content, region specific SEO)',
      'Headless CMS integration (Sanity, Contentful)',
      'Core Web Vitals & speed engineering',
      'Accessibility (WCAG 2.2)',
      'Schema markup & structured data',
      'Progressive Web Apps (PWA)',
    ],
    caseStudy: { name: 'Chiang Mai Go Tours', slug: 'chiang-mai-go-tours' },
  },
  {
    slug: 'booking-software',
    number: '02',
    name: 'Booking & Operations Software',
    tagline: 'Powered by Zatrovo, our flagship platform.',
    summary:
      'A full business-management platform for studios, salons, coaches, and service businesses. White-labelled to your brand. Live in days, not months.',
    deliverables: [
      'Class & appointment booking',
      'Multi-location calendars',
      'Member CRM with intake forms',
      'Credit packs, session packs & memberships',
      'Stripe payments + Apple Pay + payment links',
      'Deposits, instalments & basket booking',
      'White label tenant under your brand and your domain',
      'Waitlists & auto-promote',
      'Email + WhatsApp + LINE + SMS reminders',
      'Migration from Mindbody, Vagaro, Glofox, Zen Planner',
    ],
    caseStudy: { name: 'Zatrovo', slug: 'zatrovo' },
  },
  {
    slug: 'seo',
    number: '03',
    name: 'SEO & Organic Search',
    tagline: 'Compound traffic that doesn\'t reset every month.',
    summary:
      'Technical SEO, on page strategy, content architecture and link building that earns traffic for years, not days.',
    deliverables: [
      'Technical SEO audits',
      'On-page SEO & meta architecture',
      'Local SEO & Google Business Profile',
      'International SEO (hreflang, geo-targeting)',
      'Programmatic SEO at scale across location, service and FAQ matrices',
      'AI augmented content production pipelines',
      'Content strategy & topic clusters',
      'Editorial briefs & content commissioning',
      'Internal linking & site architecture',
      'Backlink strategy & digital PR',
      'Core Web Vitals tuning',
      'Schema markup for rich results',
    ],
    caseStudy: { name: 'BOXX Thailand', slug: 'boxx-thailand' },
  },
  {
    slug: 'ai-search',
    number: '04',
    name: 'AI Search & AI Visibility',
    tagline: 'Be the brand AI recommends.',
    summary:
      'When customers ask ChatGPT, Gemini or Perplexity for the best in your category, make sure your name comes up first.',
    deliverables: [
      'AI search visibility audits',
      'ChatGPT / Gemini / Perplexity citation tracking',
      'Entity & knowledge graph optimisation',
      'Authority & citation building',
      'LLM-readable content restructuring',
      'Google AI Overviews optimisation',
      'Schema & structured data for AI extraction',
      'Custom AI assistants for ops & support',
      'AI booking chatbots',
      'LLM content generation pipelines',
    ],
    caseStudy: { name: 'Zatrovo', slug: 'zatrovo' },
  },
  {
    slug: 'automations',
    number: '05',
    name: 'Automations & Integrations',
    tagline: 'Stop doing what software should do for you.',
    summary:
      'Custom workflows that move data between every tool you use. Zapier grade and beyond, including bespoke backend integrations no off the shelf tool can handle.',
    deliverables: [
      'Zapier & Make workflow design',
      'Custom backend automation engineering',
      'CRM integrations (HubSpot, Pipedrive, Salesforce)',
      'Email / SMS / WhatsApp automation pipelines',
      'Webhook architecture & event-driven systems',
      'Data sync across booking, CRM & finance tools',
      'Internal admin tools & dashboards',
      'AI-powered workflow agents',
      'Process automation audits',
      'Slack / Teams notification workflows',
    ],
    caseStudy: { name: 'Zatrovo', slug: 'zatrovo' },
  },
  {
    slug: 'paid-media',
    number: '06',
    name: 'Paid Media & Performance',
    tagline: 'Spend less. Acquire more.',
    summary:
      'Google, Meta, TikTok and LinkedIn, managed end to end with conversion tracking that actually attributes revenue.',
    deliverables: [
      'Google Ads: Search, Performance Max, Display, YouTube',
      'Meta Ads across Facebook and Instagram',
      'TikTok Ads',
      'LinkedIn Ads (B2B)',
      'Conversion tracking & attribution architecture',
      'Pixel & GTM setup (Meta, TikTok, Google, LinkedIn)',
      'Landing page conversion optimisation',
      'Audience strategy & lookalike modelling',
      'Creative direction for ad assets',
      'Monthly reporting & spend optimisation',
    ],
    caseStudy: { name: 'Realspace Marketing', slug: 'realspace-marketing' },
  },
  {
    slug: 'mobile-apps',
    number: '07',
    name: 'Mobile Apps',
    tagline: 'Native experiences. Cross-platform speed.',
    summary:
      'iOS and Android apps built once and shipped everywhere. React Native and Expo, paired with native modules where it counts.',
    deliverables: [
      'iOS & Android native apps (React Native / Expo)',
      'Progressive Web Apps (installable from browser)',
      'App Store & Play Store submission & launch',
      'Push notifications (APNs, FCM)',
      'In-app purchases & subscriptions',
      'Offline-first architecture',
      'Deep linking & universal links',
      'Mobile booking & member apps',
      'Biometric auth (Face ID, Touch ID)',
      'Over-the-air (OTA) updates',
    ],
  },
  {
    slug: 'email-crm',
    number: '08',
    name: 'Email & CRM',
    tagline: 'Bring customers back. Without lifting a finger.',
    summary:
      'Lifecycle marketing, transactional email design, and CRM pipelines that turn one-time customers into repeat revenue.',
    deliverables: [
      'Klaviyo / Mailchimp / Resend setup',
      'Automated welcome & nurture flows',
      'Abandoned cart & abandoned booking recovery',
      'Transactional email design (branded)',
      'Newsletter strategy & monthly campaigns',
      'CRM pipeline architecture',
      'Lifecycle segmentation',
      'A/B testing & deliverability tuning',
      'List growth strategy & lead magnets',
      'Loyalty & winback campaigns',
    ],
  },
  {
    slug: 'analytics',
    number: '09',
    name: 'Analytics & Reporting',
    tagline: 'Decisions backed by data, not guesses.',
    summary:
      'GA4, custom dashboards, and monthly reports that show what\'s working, what isn\'t, and what to do next.',
    deliverables: [
      'Google Analytics 4 setup with custom events',
      'Looker Studio dashboards',
      'Custom internal analytics dashboards',
      'Booking & revenue attribution modelling',
      'Funnel & cohort analysis',
      'A/B testing infrastructure',
      'Server-side tracking (privacy-safe)',
      'Monthly performance reports',
      'Quarterly strategy reviews',
      'Custom event taxonomy design',
    ],
  },
  {
    slug: 'brand-design',
    number: '10',
    name: 'Brand & Design',
    tagline: 'Look the way you want to be remembered.',
    summary:
      'Brand identity, design systems, and the visual fundamentals that make every customer touchpoint feel deliberate.',
    deliverables: [
      'Brand identity & visual systems',
      'UI/UX design for web & app',
      'Figma component libraries & design tokens',
      'Logo, wordmark & monogram design',
      'Typography systems',
      'Iconography & illustration',
      'Photography direction & art direction',
      'Brand guidelines & toolkits',
      'Pitch decks & investor materials',
      'Print collateral when print still matters',
    ],
  },
  {
    slug: 'hosting-infra',
    number: '11',
    name: 'Hosting & Infrastructure',
    tagline: 'Always on. Always fast. Always backed up.',
    summary:
      'Managed cloud hosting on Vercel and Cloudflare. Daily backups, security monitoring, uptime alerts, and the engineering layer that keeps it all running.',
    deliverables: [
      'Managed cloud hosting (Vercel, Cloudflare)',
      'Global CDN configuration',
      'Daily automated backups + offsite redundancy',
      'Security monitoring & WAF (Web Application Firewall)',
      'Uptime monitoring & alerting',
      'SSL certificates & HTTPS enforcement',
      'Domain & DNS management',
      'CI/CD pipelines (GitHub Actions, Vercel)',
      'Database hosting (Supabase, Neon, Postgres)',
      'On-call engineering for critical issues',
    ],
  },
  {
    slug: 'strategy',
    number: '12',
    name: 'Strategy & Consultancy',
    tagline: 'Software-led growth, mapped to your business.',
    summary:
      'Audits, roadmaps, and strategy work for founders who want a technical partner, not just a vendor.',
    deliverables: [
      'Digital strategy audits',
      'Software stack reviews & rationalisation',
      'Workflow & efficiency audits',
      'AI roadmaps & implementation plans',
      'Tech-led growth strategy',
      'Vendor selection & RFP support',
      'Fractional CTO advisory',
      'Quarterly roadmap planning',
      'Investor-ready tech due diligence',
      'Founder-to-founder calls',
    ],
  },
  {
    slug: 'reviews-reputation',
    number: '13',
    name: 'Reviews & Reputation Systems',
    tagline: 'Engineer the social proof your buyers actually check.',
    summary:
      'Automated review requests, multi platform monitoring and AI assisted response drafting. Reviews are the highest converting content most businesses never operationalise.',
    deliverables: [
      'Automated review request flows after booking, purchase or visit',
      'Multi platform monitoring across Google, Facebook, TripAdvisor and Trustpilot',
      'APAC platform monitoring across Naver, Xiaohongshu and Dianping',
      'AI assisted response drafting in your tone of voice',
      'Review velocity strategy and cadence design',
      'Negative review escalation and resolution workflows',
      'Review schema markup for rich results',
      'Internal alerts via Slack, email or LINE',
      'Sentiment tracking and monthly reputation reports',
      'Recovery playbooks after critical incidents',
    ],
  },
  {
    slug: 'apac-expansion',
    number: '14',
    name: 'APAC & Asian Market Expansion',
    tagline: 'The channels Western agencies miss.',
    summary:
      'For brands targeting Chinese and Korean customers, typically hospitality, wellness and tourism. Built on real Chiang Mai operating experience, not theory. We know the platforms, cadence and cultural nuance Google only strategies skip.',
    deliverables: [
      'Korean market: Naver Place, Naver Blog, Naver SEO',
      'Chinese market: Xiaohongshu (RED), WeChat Official Account, Dianping',
      'Multilingual SEO across simplified Chinese, traditional Chinese, Korean and Thai',
      'Culturally localised content, not machine translated',
      'KakaoTalk channel setup for Korean customer messaging',
      'WeChat mini programme and QR booking integration',
      'Influencer and KOL strategy for RED and Naver',
      'Region specific schema, hreflang and crawler policy',
      'LINE channel integration for Thai and Japanese customers',
      'Content production from Chiang Mai on the ground',
    ],
  },
];

// Tech & integration ecosystem · for the marquee strip
export const techStack = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Stripe',
  'Supabase', 'Postgres', 'Vercel', 'Cloudflare', 'OpenAI', 'Anthropic',
  'Google Ads', 'Meta Ads', 'TikTok Ads', 'GA4', 'Looker Studio',
  'HubSpot', 'Pipedrive', 'Salesforce', 'Klaviyo', 'Mailchimp', 'Resend',
  'Zapier', 'Make', 'Twilio', 'WhatsApp Business', 'LINE', 'Crisp',
  'React Native', 'Expo', 'Sanity', 'Contentful', 'Plausible', 'Sentry',
];

// FAQ for services page
export const servicesFaqs = [
  {
    question: 'Do you work on retainer or project-by-project?',
    answer:
      'Both. Most clients start with a defined project (a website, a booking platform, an SEO sprint) and roll into an ongoing retainer once we\'re working well together. We don\'t lock anyone into long contracts.',
  },
  {
    question: 'What size of business do you work with?',
    answer:
      'From founders shipping their first product to multi location businesses with established teams. We\'re selective. We work best with clients who care about craft and want a real partner, not a vendor.',
  },
  {
    question: 'Can you take over from another agency or developer?',
    answer:
      'Yes. We regularly inherit codebases, ad accounts and CRM setups from previous teams. We start with a full audit, document what we find, and either improve or rebuild, whichever serves you best.',
  },
  {
    question: 'How do projects start?',
    answer:
      'A 30-minute call. We\'ll talk through what you\'re trying to build, what you\'ve tried, and where the gaps are. If we\'re a fit, we send a written proposal within 48 hours with scope, timeline, and a clear path forward.',
  },
  {
    question: 'How fast can you ship?',
    answer:
      'Booking platforms typically go live in 5 to 7 business days. Marketing sites take 2 to 8 weeks depending on scope. Custom web apps and mobile apps run longer, scoped per project. We don\'t pad timelines.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer:
      'Always. Every build comes with a hosting & maintenance plan covering content updates, security monitoring, performance tuning, and on-call engineering. Ongoing growth retainers are available for SEO, AI search, paid media, and email.',
  },
  {
    question: 'Where are you based and who do you work with?',
    answer:
      'We\'re a UK-founded studio working with clients globally. Time zones haven\'t been a problem since 2020. Most communication runs through Slack, Linear, or whatever your team already uses.',
  },
  {
    question: 'Can you work with my existing team?',
    answer:
      'Yes. We embed with internal product, marketing or engineering teams regularly. Sometimes we lead, sometimes we support. Depends on what you need.',
  },
];
