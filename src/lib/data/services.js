// ─────────────────────────────────────────────
// Services Data — Single source of truth
// All pricing in USD
// ─────────────────────────────────────────────

// ── SERVICE ONE: Website Build ──────────────
export const websiteBuildTiers = [
  {
    name: 'Essential',
    price: '$599',
    priceNote: 'one-time · up to 5 pages',
    badge: null,
    highlighted: false,
    cta: 'Get Started',
    ctaHref: '/contact',
    features: [
      'Up to 5 custom-designed pages',
      'Responsive design',
      'Speed optimisation',
      'SSL security certificate & domain hosting',
      'Contact form',
      'On-page SEO foundations',
      '2 rounds of revisions',
    ],
  },
  {
    name: 'Professional',
    price: '$999',
    priceNote: 'one-time · up to 12 pages',
    badge: 'MOST POPULAR',
    highlighted: true,
    cta: 'Get Started',
    ctaHref: '/contact',
    features: [
      'Up to 12 custom-designed pages',
      'Responsive design',
      'Speed optimisation',
      'SSL security certificate & domain hosting',
      'Contact forms & CTA integration',
      'Full on-page SEO + Schema markup',
      '3 rounds of revisions',
    ],
  },
  {
    name: 'Premium',
    price: '$1,599+',
    priceNote: 'one-time · unlimited scope',
    badge: null,
    highlighted: false,
    cta: "Let's Talk",
    ctaHref: '/contact',
    features: [
      'Unlimited pages',
      'Responsive design',
      'Speed optimisation & Core Web Vitals tuned',
      'SSL security certificate & domain hosting',
      'Advanced forms, CTAs & booking integration',
      'Full SEO suite — on-page, Schema & local SEO',
      'AI search optimisation (ChatGPT, Gemini, Perplexity)',
      'Multi-language support',
      'Secure staff admin portal',
      'Multi-employee logins & role permissions',
      'E-commerce & online payment flows',
      'Third-party API & plugin integrations',
      'CRM & sales pipeline integration',
      'Custom-built components & automations',
      'Unlimited revisions during build',
    ],
  },
];

// ── SERVICE TWO: Zatrovo Booking Software ───
export const zatrovoTiers = [
  {
    name: 'Starter',
    price: '$49',
    priceNote: 'per month',
    badge: null,
    highlighted: false,
    cta: 'Get Started',
    ctaHref: '/contact',
    features: [
      'Full setup & onboarding by Irvale Studio',
      'Dedicated admin panel',
      'Client / member CRM list',
      'Online appointment booking page',
      'Calendar sync (Google / Outlook)',
      'Client intake form on booking',
      'Automated email confirmations & reminders',
      'Cash & card payments',
      'AI assistant (standard budget)',
      'Up to 100 bookings / month',
      '1 staff calendar',
      'Email support — standard response',
    ],
  },
  {
    name: 'Growth',
    price: '$79',
    priceNote: 'per month',
    badge: 'MOST POPULAR',
    highlighted: true,
    cta: 'Get Started',
    ctaHref: '/contact',
    features: [
      'Full setup & onboarding by Irvale Studio',
      'Dedicated admin panel',
      'Client / member CRM list',
      'Promotional campaigns + bespoke landing pages',
      'Online booking with service & class selection',
      'Calendar sync (Google / Outlook)',
      'Custom client intake forms',
      'Email, WhatsApp, phone, LINE & SMS reminders',
      'Cash, card & Apple Pay',
      'Credit & session pack system',
      'Basic analytics dashboard',
      'AI assistant (growth budget)',
      'Up to 500 bookings / month',
      'Up to 10 staff calendars',
      'Priority email & LINE support',
    ],
  },
  {
    name: 'Studio',
    price: '$129+',
    priceNote: 'per month',
    badge: null,
    highlighted: false,
    cta: "Let's Talk",
    ctaHref: '/contact',
    features: [
      'Full setup & onboarding by Irvale Studio',
      'Dedicated admin panel',
      'Client / member CRM list',
      'Promotional campaigns + bespoke landing pages',
      'Full booking & class management suite',
      'Calendar sync (all platforms)',
      'Advanced intake forms & client profiles',
      'Email, WhatsApp, phone, LINE & SMS reminders',
      'All payment methods incl. instalments',
      'Credit, session pack & membership system',
      'Full analytics dashboard + custom reports',
      'Multi-location management',
      'AI assistant (studio budget — largest allocation)',
      'Unlimited bookings / month',
      'Unlimited staff calendars',
      'Dedicated account manager — same-day support',
    ],
  },
];

// ── SERVICE THREE: Hosting & Maintenance ────
export const hostingTiers = [
  {
    name: 'Managed',
    price: '$29',
    priceNote: 'per month',
    badge: null,
    highlighted: false,
    cta: 'Get Started',
    ctaHref: '/contact',
    features: [
      'Managed cloud hosting (global CDN)',
      'SSL certificate (HTTPS)',
      'Weekly automated backups',
      'Security monitoring',
      'Monthly software & plugin updates',
      'Up to 2 hrs content changes / month',
      'Email support — 48hr response',
    ],
  },
  {
    name: 'Growth',
    price: '$59',
    priceNote: 'per month',
    badge: 'MOST POPULAR',
    highlighted: true,
    cta: 'Get Started',
    ctaHref: '/contact',
    features: [
      'Managed cloud hosting (global CDN)',
      'SSL certificate (HTTPS)',
      'Daily automated backups',
      'Security monitoring + malware scanning',
      'Bi-weekly software & plugin updates',
      'Up to 5 hrs content changes / month',
      'Email & LINE support — 24hr response',
      'Performance monitoring & alerts',
      'Dedicated account manager',
    ],
  },
  {
    name: 'Premium',
    price: '$99+',
    priceNote: 'per month',
    badge: null,
    highlighted: false,
    cta: "Let's Talk",
    ctaHref: '/contact',
    features: [
      'Managed cloud hosting (global CDN)',
      'SSL certificate (HTTPS)',
      'Daily backups + offsite redundancy',
      'Advanced security + web application firewall',
      'Weekly software & plugin updates',
      'Unlimited content changes',
      'Priority phone & LINE — same-day response',
      'Real-time performance monitoring',
      'Monthly SEO & analytics report',
      'API & automation support',
      'Dedicated account manager',
      'Dedicated engineer',
    ],
  },
];

// ── ADD-ON SERVICES ─────────────────────────
export const addOnServices = [
  {
    category: 'STRATEGY',
    name: 'Technical Consultancy',
    price: '$129+',
    priceNote: 'per month · retainer',
    description:
      'We analyse your business operations and produce a concrete strategy for improving efficiency through technology, software, and automation.',
    features: [
      'Business process & workflow audit',
      'Software stack review & recommendations',
      'Automation opportunity mapping',
      'AI tool selection & implementation roadmap',
      'CRM & sales pipeline strategy',
      'Written report + follow-up call',
    ],
  },
  {
    category: 'GROWTH',
    name: 'Email Marketing',
    price: '$99+',
    priceNote: 'per month · retainer',
    description:
      'We build and manage email systems designed to win new customers and bring existing ones back — from list setup to full campaign management.',
    features: [
      'Email platform setup & list management',
      'Audience segmentation strategy',
      'Monthly campaign design & copywriting',
      'Automated welcome & nurture sequences',
      'A/B testing & performance optimisation',
      'Monthly analytics report',
    ],
  },
  {
    category: 'VISIBILITY',
    name: 'AI Search Visibility',
    price: '$69+',
    priceNote: 'per month · retainer',
    description:
      'We monitor ChatGPT, Gemini, Perplexity, and Google AI Overviews and continuously optimise your content so your business gets recommended.',
    features: [
      'AI citation & brand mention monitoring',
      'Content restructured for AI extractability',
      'Schema & structured data optimisation',
      'Entity building & knowledge graph work',
      'Monthly AI visibility report',
      'Ongoing updates as AI platforms evolve',
    ],
  },
  {
    category: 'INTELLIGENCE',
    name: 'Analytics & Reporting',
    price: '$39+',
    priceNote: 'per month · retainer',
    description:
      'Turn your website and booking data into decisions. Custom dashboards and a monthly report showing what\u2019s working and what to do next.',
    features: [
      'Google Analytics 4 setup & custom events',
      'Monthly performance dashboard',
      'Traffic, conversion & booking analysis',
      'Actionable recommendations each month',
      'Quarterly strategy review call',
    ],
  },
];

// ── FAQ DATA ────────────────────────────────
export const servicesFaqs = [
  {
    question: 'How long does a website build take?',
    answer:
      'Essential sites are typically delivered within 2–3 weeks. Professional builds take around 4–6 weeks. Premium projects vary based on scope — we provide a detailed timeline after our initial consultation.',
  },
  {
    question: 'What does the monthly hosting subscription cover?',
    answer:
      'Your hosting fee covers managed cloud hosting, SSL certificate, automated backups, security monitoring, software updates, content changes, and customer support. Think of it as your entire web presence, professionally managed.',
  },
  {
    question: 'What is Zatrovo?',
    answer:
      'Zatrovo is our proprietary booking and scheduling platform built specifically for professional service businesses. We handle the full setup, embed it into your website, and support you throughout. Every tier includes a dedicated admin panel.',
  },
  {
    question: 'Can I upgrade my plan later?',
    answer:
      'Absolutely. We build every site with scalability in mind. Many clients start with Essential and move to Professional as their business grows. The same applies to hosting and Zatrovo tiers — upgrading is seamless.',
  },
  {
    question: 'What if I need changes to my website?',
    answer:
      'Content edits are included in every hosting plan — from 2 hours per month on Managed up to unlimited changes on Premium. For larger structural changes or new features, we provide a clear quote before any work begins.',
  },
  {
    question: 'Do I own my website?',
    answer:
      'Yes. You own all custom design and content created for your site. The monthly hosting subscription covers the infrastructure, maintenance, and support that keeps it running.',
  },
  {
    question: 'What are the payment terms?',
    answer:
      'Website builds are invoiced 50% upfront and 50% on launch day. Monthly subscriptions (hosting and Zatrovo) can be cancelled at any time and continue until the end of the billing month. All prices are in USD and exclude VAT where applicable.',
  },
];
