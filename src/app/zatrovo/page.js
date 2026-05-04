import Link from 'next/link';
import Image from 'next/image';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import Marquee from '@/components/ui/Marquee';

export const metadata = {
  title: 'Zatrovo — Business Management Software | Irvale Studio',
  description:
    'Built for studios that take real bookings. Zatrovo is a full business management platform — bookings, payments, member CRM, AI assistant, multi-location, white-label.',
};

const trustedFor = [
  'Yoga Studios',
  'Pilates Studios',
  'Fitness Boxes',
  'Massage & Spa',
  'Lash & Beauty',
  'Golf Coaching',
  'Personal Trainers',
  'Wellness Centres',
  'Dance Schools',
  'Martial Arts',
];

const modules = [
  'Classes', 'Appointments', 'Multi Location', 'Staff Management',
  'Stripe Payments', 'Subscriptions', 'Web App', 'AI Assistant',
  'Waitlist Automation', 'Auto Emails', 'Members Dashboard', 'Analytics',
  'Custom Branding', 'Calendar Syncs', 'Customer Management', 'Deposits',
  'Class Packs', 'Instructor Profiles', 'Role-Based Access', 'Booking Reminders',
  'Revenue Reports', 'White Label', 'No-Show Tracking', 'Bulk Invites',
  'Credit System', 'Shared Messaging Inbox', 'Appointment Add-ons', 'Basket Booking',
  'Payment Links + QR', 'Canned Replies', 'Welcome Auto-reply', 'Meta + TikTok Pixels',
  'Google Ads Tracking', 'Zapier', 'Studio Gallery', 'Mobile Admin',
];

const features = [
  {
    name: 'Smart Scheduling',
    description: 'Day, week, and month views. Filter by instructor, location, or class type. Members find what fits their week in one tap.',
  },
  {
    name: 'Class Booking',
    description: 'Members book classes with credits, packs, or cash. Waitlists and auto-promote built in. Zero overbooking, zero no-shows un-tracked.',
  },
  {
    name: 'Services & Appointments',
    description: '1:1 sessions, multi-staff calendars, deposits, add-ons at booking, and basket-style multi-service flows.',
  },
  {
    name: 'Payments & Packs',
    description: 'Stripe connected the same afternoon you sign up. Card, Apple Pay, credit packs, session packs, memberships, instalments, payment links + QR.',
  },
  {
    name: 'AI Assistant',
    description: 'Built-in AI handles waitlists, reminders, member questions, and the repetitive admin your front desk shouldn\'t be doing.',
  },
  {
    name: 'Email & Messaging',
    description: 'Branded transactional emails, auto reminders by email + WhatsApp + LINE + SMS, full template library, welcome auto-replies.',
  },
  {
    name: 'Shared Inbox',
    description: 'Member messaging inbox with native LINE channel. Add Instagram DM and Messenger via Crisp. Reply without leaving Zatrovo.',
  },
  {
    name: 'White Label',
    description: 'Your logo, your colours, your domain. Members never see the Zatrovo name. Custom branding all the way through.',
  },
  {
    name: 'Multi-Location',
    description: 'Run up to 5 locations from one dashboard. Different teams, different calendars, one source of truth.',
  },
  {
    name: 'Analytics & Reports',
    description: 'Revenue, bookings, member engagement, no-show tracking. Advanced analytics + Google Analytics + Meta / TikTok / Google Ads pixels.',
  },
  {
    name: 'API & Zapier',
    description: 'REST API and Zapier webhooks for the integrations we haven\'t pre-built. Connect Zatrovo to anything.',
  },
  {
    name: 'Migration Done For You',
    description: 'Send us your export from Mindbody, Vagaro, Glofox, Zen Planner, WellnessLiving, or Acuity. We import and you\'re live in 48 hours.',
  },
];

const testimonials = [
  {
    quote:
      'We were using three different tools before this — one for scheduling, one for payments, one just for email reminders. Zatrovo killed all three. Honestly wish we\'d switched sooner.',
    author: 'Sarah Mitchell',
    role: 'Yoga Studio Owner',
  },
  {
    quote: 'Live in 10 minutes. No joke.',
    author: 'James Cooper',
    role: 'CrossFit Box Owner',
  },
  {
    quote:
      'The AI assistant surprised me more than anything else. I set it up half-expecting a gimmick, but it genuinely handles the repetitive stuff — reminders, waitlists, basic member questions. My front desk is way less stressed.',
    author: 'Priya Sharma',
    role: 'Pilates Studio Manager',
  },
  {
    quote:
      'Our members have no idea they\'re using Zatrovo. It\'s got our logo, our colours, our name. That matters to us.',
    author: 'Marcus Johnson',
    role: 'Gym Owner',
  },
  {
    quote: 'Cut our software bill by like $130/month after leaving Mindbody. Not even using paid features yet.',
    author: 'Elena Rodriguez',
    role: 'Dance School Director',
  },
  {
    quote:
      'Running two locations was genuinely chaotic before. Different systems, different logins, no easy way to see the big picture. Now it\'s just one dashboard.',
    author: 'Olivia Chen',
    role: 'Multi-Studio Owner',
  },
  {
    quote:
      'Stripe was connected and taking payments the same afternoon I signed up. No developer, no docs rabbit hole. It just worked.',
    author: 'Aisha Patel',
    role: 'Wellness Centre Owner',
  },
];

const liveStudios = [
  { name: 'BOXX Thailand', niche: 'Boutique Boxing', url: 'https://www.boxxthailand.com', image: '/images/projects/boxx-hero.webp', slug: 'boxx-thailand' },
  { name: 'Reya Lashes', niche: 'Beauty Studio', url: 'https://reya-lashes.zatrovo.com', image: '/images/projects/reya-lashes-hero.webp', slug: 'reya-lashes' },
  { name: 'Dynamic Golf Academy', niche: 'Golf Coaching', url: 'https://dynamic-golf-academy.zatrovo.com', image: '/images/projects/dynamic-golf-academy-hero.webp', slug: 'dynamic-golf-academy' },
  { name: 'Commu', niche: 'Community Studio', url: 'https://commu.zatrovo.com', image: '/images/projects/commu-hero.webp', slug: 'commu' },
];

const migrationFrom = ['Mindbody', 'Vagaro', 'Glofox', 'Zen Planner', 'WellnessLiving', 'Acuity'];

const builtOn = ['Stripe', 'Supabase', 'Vercel', 'Cloudflare'];
const compliance = ['PCI-DSS', 'GDPR', 'CCPA'];

const faqs = [
  {
    question: 'Who is Zatrovo built for?',
    answer:
      'Studios and service businesses that take real bookings — yoga, pilates, fitness, massage, lash & beauty, golf coaching, personal training, wellness, dance, martial arts. If you sell time and need members to book it, Zatrovo fits.',
  },
  {
    question: 'How long until I\'m live and accepting bookings?',
    answer:
      'Most studios are live the same day. Stripe connects in minutes, your branded portal is ready immediately, and our migration team imports your members and packs within 48 hours.',
  },
  {
    question: 'Can I migrate from Mindbody, Vagaro, Glofox, or Zen Planner?',
    answer:
      'Yes. Send us your export — CSV, ZIP, or even screenshots — and we\'ll import members, classes, packs, and memberships for free. You review, then go live within 48 hours.',
  },
  {
    question: 'Will my members ever see the Zatrovo name?',
    answer:
      'No. Zatrovo is fully white-labelled. Your logo, your colours, your domain. Members see your brand from booking to receipt to email reminder.',
  },
  {
    question: 'How do payments work? Does Zatrovo take a cut?',
    answer:
      'Payments run through your own Stripe account — money goes directly to you, never through us. Stripe\'s standard processing fee applies. Zatrovo charges a flat monthly subscription, not a per-booking commission.',
  },
  {
    question: 'What does the AI assistant actually do?',
    answer:
      'It handles waitlists, reminders, basic member questions, and the repetitive admin your front desk shouldn\'t be doing. Each tier comes with a budget — solo practitioners get a smaller allocation, studios get more, multi-location businesses get the largest.',
  },
  {
    question: 'Can I sell class packs, memberships, and single drop-ins?',
    answer:
      'Yes — packs, sessions, memberships, single classes, and 1:1 appointments. Members can mix and match. Credit-based bookings, deposits, and instalment plans all supported.',
  },
  {
    question: 'Does Zatrovo connect to my ad platforms?',
    answer:
      'Meta, TikTok, and Google Ads pixels are first-class. Plus Zapier and a REST API for everything else. Track booking conversions back to ad spend without a developer.',
  },
];

export default function ZatrovoPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-dark pt-32 pb-[var(--section-gap)] overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,169,110,0.18),transparent_60%),radial-gradient(ellipse_at_70%_60%,rgba(201,169,110,0.10),transparent_60%)]" />

        <div
          className="relative mx-auto px-[var(--gutter)] text-center"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="font-body text-[10px] font-medium uppercase tracking-[0.25em] bg-gold text-dark px-3 py-1.5">
              14 Days Free
            </span>
            <span className="font-body text-[length:var(--type-caption)] text-text-muted-light/70 uppercase tracking-[var(--type-label-ls)]">
              Business Management Software
            </span>
          </div>

          <RevealText
            as="h1"
            className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[900px] mx-auto justify-center mb-6"
          >
            Built for studios that take real bookings.
          </RevealText>

          <p className="font-body text-[length:var(--type-body-lg)] text-text-muted-light font-light max-w-xl mx-auto mb-8">
            Bookings, payments, member CRM, AI assistant, multi-location, and full white-label. The platform behind every studio and service business we ship.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <Link href="/contact" className="btn-primary">
              <span>Book a Demo →</span>
            </Link>
            <a
              href="https://zatrovo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <span>Visit zatrovo.com ↗</span>
            </a>
          </div>

          {/* Social proof bar */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 border border-gold/15 bg-gold/[0.03] px-6 py-3 rounded-full">
            <span className="inline-flex items-center gap-1.5 font-body text-xs text-emerald-400 font-medium">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </span>
              Live now
            </span>
            <span className="font-body text-xs text-text-muted-light">
              <span className="text-gold font-medium">13,141+</span> members served
            </span>
            <span className="hidden sm:inline w-px h-3 bg-white/10" />
            <span className="font-body text-xs text-text-muted-light">
              <span className="text-gold font-medium">5+</span> live studios on Irvale&apos;s network
            </span>
          </div>
        </div>
      </section>

      {/* Built-for marquee */}
      <div className="bg-dark-2 py-5 border-y border-[var(--border-dark)]">
        <Marquee
          items={trustedFor}
          separator="·"
          className="font-display text-lg text-gold/40 tracking-[0.12em]"
          speed={80}
        />
      </div>

      {/* Live Studios — proof carousel */}
      <section className="bg-dark py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <Eyebrow className="mb-4 block">Live On Zatrovo</Eyebrow>
              <RevealText
                as="h2"
                className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[600px]"
              >
                Real studios. Real bookings. Today.
              </RevealText>
            </div>
            <Link href="/work" className="font-body text-sm text-gold hover:text-gold-light transition-colors shrink-0">
              See all case studies →
            </Link>
          </div>

          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--grid-gap)]">
            {liveStudios.map((s) => (
              <Link
                key={s.slug}
                href={`/work/${s.slug}`}
                className="group block"
              >
                <div className="rounded-lg overflow-hidden border border-white/10 bg-dark-2 transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-dark-2 border-b border-white/5">
                    <span className="w-2 h-2 rounded-full bg-white/10" />
                    <span className="w-2 h-2 rounded-full bg-white/10" />
                    <span className="w-2 h-2 rounded-full bg-white/10" />
                    <span className="ml-2 flex-1 text-center font-body text-[9px] text-text-muted-light/40 truncate">
                      {s.url.replace('https://', '')}
                    </span>
                    <span className="inline-flex items-center gap-1 font-body text-[8px] font-medium uppercase tracking-[0.2em] text-emerald-400 shrink-0">
                      <span className="relative flex w-1 h-1">
                        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                        <span className="relative w-1 h-1 rounded-full bg-emerald-400" />
                      </span>
                      Live
                    </span>
                  </div>
                  <div className="relative aspect-video">
                    <Image
                      src={s.image}
                      alt={`${s.name} — ${s.niche}`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-[length:var(--type-body-lg)] text-text-light">{s.name}</h3>
                    <p className="font-body text-xs text-gold/70 uppercase tracking-[0.2em] mt-1">{s.niche}</p>
                  </div>
                  <span className="font-body text-xs text-gold">View →</span>
                </div>
              </Link>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Module board marquee */}
      <section className="bg-dark-2 py-16 border-y border-[var(--border-dark)] relative noise-overlay">
        <div className="mx-auto px-[var(--gutter)] mb-8 text-center" style={{ maxWidth: 'var(--max-width)' }}>
          <Eyebrow className="block">Module Board · 36+ Built-In Features</Eyebrow>
        </div>
        <div className="relative overflow-hidden mb-3">
          <div className="marquee-track gap-4" style={{ '--marquee-speed': '90s' }}>
            {[...modules, ...modules].map((m, i) => (
              <span
                key={i}
                className="font-body text-sm text-text-light/70 border border-white/10 bg-dark/40 px-4 py-2 rounded-full whitespace-nowrap shrink-0"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="marquee-track gap-4" style={{ '--marquee-speed': '110s', animationDirection: 'reverse' }}>
            {[...modules.slice().reverse(), ...modules.slice().reverse()].map((m, i) => (
              <span
                key={i}
                className="font-body text-sm text-gold/70 border border-gold/15 bg-gold/[0.03] px-4 py-2 rounded-full whitespace-nowrap shrink-0"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="mb-12 md:mb-16">
            <Eyebrow className="mb-6 block">Everything Your Studio Needs</Eyebrow>
            <RevealText
              as="h2"
              className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[700px]"
            >
              One platform. Every booking. Every payment.
            </RevealText>
          </div>
          <SectionReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <div
                key={feature.name}
                className="group relative bg-white border border-[var(--border-light)] p-7 overflow-hidden transition-all duration-500 hover:border-gold/40 hover:shadow-[0_6px_30px_rgba(201,169,110,0.10)]"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/40 transition-all duration-500" />
                <span className="font-display text-[clamp(36px,4vw,48px)] text-gold/15 leading-none block mb-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="font-display text-[clamp(20px,2vw,26px)] leading-tight font-normal text-text-dark mb-3 group-hover:text-gold-muted transition-colors duration-300">
                  {feature.name}
                </h4>
                <p className="font-body text-sm text-text-muted-dark font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Zatrovo in action — BOXX screenshots */}
      <section className="bg-dark py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-6 block">Zatrovo in Action</Eyebrow>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <h2 className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[600px]">
              See how BOXX Thailand runs their entire studio on Zatrovo.
            </h2>
            <Link
              href="/work/boxx-thailand"
              className="font-body text-sm text-gold hover:text-gold-light transition-colors shrink-0"
            >
              Read the case study →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BrowserShot
              src="/images/projects/boxx-zatrovo-admin.webp"
              alt="Zatrovo admin panel showing BOXX class pack products"
              caption="Admin — Class Packs & Memberships"
            />
            <BrowserShot
              src="/images/projects/boxx-zatrovo-booking.webp"
              alt="Zatrovo booking interface showing BOXX class schedule"
              caption="Client — Class Schedule & Booking"
            />
            <div className="md:col-span-2">
              <BrowserShot
                src="/images/projects/boxx-zatrovo-services.webp"
                alt="Zatrovo service booking with coach selection and time slots"
                caption="Client — Service Selection & Time Slots"
                aspect="aspect-[21/9]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-12 block">What Studio Owners Say</Eyebrow>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--grid-gap)]">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="bg-white border border-[var(--border-light)] p-7 flex flex-col"
              >
                <div className="text-gold text-2xl leading-none mb-4">&ldquo;</div>
                <blockquote className="font-display italic text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-dark font-light flex-1 mb-6">
                  {t.quote}
                </blockquote>
                <figcaption>
                  <p className="font-body text-sm font-medium text-text-dark">{t.author}</p>
                  <p className="font-body text-xs text-text-muted-dark mt-0.5">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Migration */}
      <section className="bg-dark-2 py-[var(--section-gap)] relative noise-overlay">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <SectionReveal className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Eyebrow className="mb-6 block">Migration Guarantee</Eyebrow>
              <RevealText
                as="h2"
                className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] mb-6"
              >
                Switching? We do the heavy lifting.
              </RevealText>
              <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light mb-8 max-w-md">
                Send us your export from Mindbody, Vagaro, Glofox, Zen Planner, or any other platform. We migrate your members, classes, packs, and memberships.
              </p>
              <ol className="space-y-4">
                {[
                  'Send us your data — CSV, ZIP, or screenshots',
                  'We import members, packs, and memberships',
                  'You review and go live within 48 hours',
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-display text-gold text-lg shrink-0 w-8">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-body text-sm text-text-light font-light">{step}</span>
                  </li>
                ))}
              </ol>
              <Link href="/contact" className="btn-primary mt-10">
                <span>Request Free Migration →</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {migrationFrom.map((p) => (
                <div
                  key={p}
                  className="border border-white/10 bg-dark/40 p-5 text-center font-body text-sm text-text-light/80"
                >
                  {p}
                </div>
              ))}
              <div className="col-span-2 border border-gold/40 bg-gold/[0.03] p-5 text-center font-display text-xl text-gold">
                zatrovo
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Built On + Compliance */}
      <section className="bg-dark py-20 border-y border-[var(--border-dark)]">
        <div
          className="mx-auto px-[var(--gutter)] grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div>
            <p className="font-body text-[length:var(--type-caption)] text-gold/60 uppercase tracking-[var(--type-label-ls)] mb-5">
              Built On & Secured By
            </p>
            <div className="flex flex-wrap gap-3">
              {builtOn.map((b) => (
                <span
                  key={b}
                  className="font-display text-text-light/70 text-lg border border-white/10 px-5 py-2.5"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-body text-[length:var(--type-caption)] text-gold/60 uppercase tracking-[var(--type-label-ls)] mb-5">
              Compliance & Accreditations
            </p>
            <div className="flex flex-wrap gap-3">
              {compliance.map((c) => (
                <span
                  key={c}
                  className="font-body text-sm text-text-light/80 border border-gold/30 px-4 py-2"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-dark py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-8 block">Questions. Answers.</Eyebrow>
          <SectionReveal className="max-w-3xl">
            {faqs.map((faq, i) => (
              <ZatrovoFAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Founder note */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-6 block">A Note From The Founder</Eyebrow>
          <SectionReveal>
            <h2 className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[800px] mb-8">
              I built Zatrovo because I love active groups and small businesses.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-5 font-body text-[length:var(--type-body)] text-text-muted-dark font-light leading-relaxed">
                <p>
                  Hi, I&apos;m Jake. Every activity I take part in, from my friend&apos;s boxing gym to booking a massage, seems to run on clunky booking systems and far too much manual admin.
                </p>
                <p>
                  So I used my product and engineering background to build the tool I wished existed: something that helps studios run their business, and helps people like me book the classes and sessions that make life better.
                </p>
                <p>
                  Zatrovo is a founder-led project, and it&apos;s growing fast. I&apos;m always looking for feedback to improve it, so please don&apos;t hesitate to reach out.
                </p>
              </div>
              <div className="border-l border-gold/30 pl-6">
                <p className="font-display text-[length:var(--type-h3)] text-text-dark mb-1">Jake Horgan</p>
                <p className="font-body text-sm text-text-muted-dark mb-4">Founder, Zatrovo · Irvale Studio</p>
                <a
                  href="mailto:jake@zatrovo.com"
                  className="font-body text-sm text-gold-muted hover:text-gold transition-colors"
                >
                  jake@zatrovo.com →
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark py-[var(--section-gap)] border-t border-[var(--border-dark)]">
        <div
          className="mx-auto px-[var(--gutter)] text-center"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <RevealText
            as="h2"
            className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[700px] mx-auto justify-center mb-6"
          >
            Ready to run your studio your way?
          </RevealText>
          <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light max-w-md mx-auto mb-8">
            Book a free 30-minute call. We&apos;ll walk you through the platform and get a plan together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary px-10">
              <span>Book a Demo →</span>
            </Link>
            <a
              href="https://zatrovo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <span>Visit zatrovo.com ↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function BrowserShot({ src, alt, caption, aspect = 'aspect-video' }) {
  return (
    <div className="border border-white/10 overflow-hidden bg-dark-2 rounded-lg">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-dark-2 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="ml-3 flex-1 text-center font-body text-[10px] text-text-muted-light/40 truncate">
          {caption}
        </span>
      </div>
      <div className={`relative ${aspect}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
    </div>
  );
}

function ZatrovoFAQItem({ question, answer }) {
  return (
    <div className="border-b border-[var(--border-dark)]">
      <details className="group">
        <summary className="w-full py-6 flex items-center justify-between text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <span className="font-body text-[length:var(--type-body)] text-text-light font-light pr-8">
            {question}
          </span>
          <span className="text-gold text-xl shrink-0 transition-transform duration-300 group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="pb-6">
          <p className="font-body text-sm text-text-muted-light font-light leading-relaxed max-w-2xl">
            {answer}
          </p>
        </div>
      </details>
    </div>
  );
}
