import Link from 'next/link';
import Image from 'next/image';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';

export const metadata = {
  title: 'AI Visibility · GEO, AEO & Answer Engine Optimisation | Irvale Studio',
  description:
    'Generative Engine Optimisation for luxury brands. Entity engineering, citation strategy, schema architecture, and share-of-voice monitoring across ChatGPT, Perplexity, Gemini, Claude, Google AI Overviews, Copilot and Meta AI.',
};

const surfaces = [
  { name: 'ChatGPT', note: '900M weekly users. OpenAI index + Bing fallback.' },
  { name: 'Google AI Overviews', note: 'Triggers on ~48% of searches. Citation overlap with organic now 54%.' },
  { name: 'Google AI Mode', note: 'Fan-out querying, 16 parallel sub-queries. 13.7% citation overlap with AIO.' },
  { name: 'Perplexity', note: 'Velocity-weighted. Fresh content (<14 days) lands in top citations 72% of the time.' },
  { name: 'Claude', note: 'Skews technical. Rewards primary sources and structured documentation.' },
  { name: 'Microsoft Copilot', note: 'Inherits Bing ranking. Over-indexes on LinkedIn and Microsoft properties.' },
  { name: 'Meta AI', note: 'Llama + Bing. Pulls from Reddit, Facebook and Instagram public content.' },
  { name: 'Grok', note: 'Real-time X firehose. Recency on X is the dominant signal.' },
];

const stats = [
  {
    value: '900M',
    label: 'weekly active users now ask ChatGPT before they ask Google',
    source: 'OpenAI, Feb 2026',
  },
  {
    value: '8%',
    label: 'click through rate on results with an AI summary, half the traditional rate',
    source: 'Pew Research, 2025',
  },
  {
    value: '4.4×',
    label: 'higher conversion rate from LLM-referred visitors than organic search',
    source: 'Semrush, 2025',
  },
  {
    value: '9%',
    label: 'of AI responses about a brand contain a fabricated fact',
    source: 'Four Dots Hallucination Index, 2025',
  },
];

const buildBlocks = [
  {
    n: '01',
    phase: 'Diagnose',
    title: 'AI Visibility Index + Prompt Universe',
    body: 'A named, scored diagnostic across ChatGPT, Perplexity, Gemini, Claude, AI Overviews, AI Mode, Copilot and Meta AI. Mapped to the actual prompts your buyers type — discovery, comparison and high-intent queries.',
  },
  {
    n: '02',
    phase: 'Engineer',
    title: 'Entity reconciliation + Knowledge Graph',
    body: 'Wikidata claims, Knowledge Panel acquisition, sameAs linking, entity disambiguation. Brands with verified Wikidata are 3.2× more likely to appear in AI Overview citations.',
  },
  {
    n: '03',
    phase: 'Engineer',
    title: 'Content + schema architecture',
    body: 'Passage-level content engineered for retrieval (80–100 word answer blocks). JSON-LD layered for sector — LodgingBusiness, SpaBusiness, GolfCourse — with Review, FAQPage and Speakable nodes.',
  },
  {
    n: '04',
    phase: 'Earn',
    title: 'Citation + source placement',
    body: 'Tier-1 PR (Condé Nast Traveler, Robb Report, FT, Bloomberg), trade press, YouTube transcripts, Reddit and review-platform corroboration. Unlinked brand mentions now correlate ~3× more strongly with AI visibility than backlinks.',
  },
  {
    n: '05',
    phase: 'Engineer',
    title: 'Crawler + render substrate',
    body: 'GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot governed in robots.txt. Critical content shipped server-rendered — these crawlers do not execute JavaScript. The plumbing most agencies miss.',
  },
  {
    n: '06',
    phase: 'Monitor',
    title: 'Share-of-voice + perception drift',
    body: 'Weekly tracking across all eight engines. Visibility, position, sentiment, hallucination patrol. Perception-drift alerts when descriptors shift. Monthly report tied to the prompts that drive direct bookings.',
  },
];

const technicals = [
  {
    label: 'Crawler policy',
    body:
      'GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended and ChatGPT-User are each governed separately in robots.txt. Block training crawlers, allow retrieval crawlers, never the other way around.',
  },
  {
    label: 'Render guarantees',
    body:
      'GPTBot, ClaudeBot and PerplexityBot do not execute JavaScript. Critical content must ship in the initial HTML response. Server rendered, not hydrated client side.',
  },
  {
    label: 'Schema layering',
    body:
      'JSON-LD remains the only structured data format every major engine ingests reliably. We layer Organization, Service, FAQPage, Speakable, Review and sector specific types, and validate them against each engine\'s extraction model.',
  },
];

const faqs = [
  {
    question: 'How is this different from SEO?',
    answer:
      'SEO optimises for the ranked list of blue links. GEO optimises for the answer the model writes. Different ranking models, different inputs, different artefacts. There is overlap. Both reward authoritative content and good schema. But citation logic, surface coverage and measurement systems are distinct. Most agencies branding "AI SEO" are doing the same on page work they always did and hoping it lands.',
  },
  {
    question: 'How long until I see results?',
    answer:
      'The Visibility Index baseline ships in two weeks. Schema, entity reconciliation and crawler policy take effect four to six weeks after deployment. Citation share typically begins shifting after 60 to 90 days of corroborated signals across 8 to 12 independent domains. Anyone promising rank inside 30 days is selling air.',
  },
  {
    question: 'Do I need an existing PR or content team?',
    answer:
      'No. We can run the citation programme, brief your team if you have one, or hand the 90 day authority brief to your PR partner. Most clients start with us running it and shift to internal ownership over months six to twelve.',
  },
  {
    question: 'What if the AI engine has wrong information about my brand?',
    answer:
      'Hallucinations are common. Roughly one in eleven AI responses about a brand contains a fabricated fact. We engineer the substrate (entity reconciliation, schema, authoritative source corroboration) so the model has a stronger prior to draw from. Wrong descriptors fade as new corroborated ones compound. Typical drift correction window is 60 to 120 days.',
  },
  {
    question: 'Is llms.txt worth implementing?',
    answer:
      'No major model provider has confirmed production ingestion in 2026. We implement it because it is cheap insurance, not because it moves the needle. Belt and braces, not strategy.',
  },
  {
    question: 'Can this be bundled with broader marketing work?',
    answer:
      'Yes. The full GEO programme is included inside our flagship Revenue Engineering engagement at the Growth tier and above, alongside website, booking, SEO, reviews and reporting. Useful when you want one team accountable for the whole funnel.',
  },
];

const pricing = [
  {
    name: 'AI Visibility Audit',
    price: '$1,150',
    cadence: 'one-off',
    summary:
      'Full AI Visibility Index across 8 engines, prompt universe map, hallucination audit, competitor share-of-voice, prioritised remediation plan. Fixed scope, two-week turnaround.',
  },
  {
    name: 'AI Visibility Project',
    price: 'from $3,000',
    cadence: 'project',
    featured: true,
    summary:
      'The full Diagnose → Engineer build. Entity and schema architecture, content engineering, citation source plan, technical infrastructure, and a 90 day authority brief handed to your PR team, or ours.',
  },
  {
    name: 'AI Visibility Retainer',
    price: 'from $950',
    cadence: 'per month',
    summary:
      'Ongoing monitoring, monthly content cadence, citation outreach, perception-drift alerts and quarterly strategy reviews. Built for brands that intend to defend their category.',
  },
];

export default function AIVisibilityPage() {
  return (
    <main className="bg-navy">
      {/* Hero */}
      <section className="relative pt-32 pb-[var(--section-gap)] overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_20%_50%,rgba(201,169,110,0.15),transparent_70%),radial-gradient(ellipse_at_80%_50%,rgba(201,169,110,0.1),transparent_70%)]" />

        <div
          className="relative mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-6 block">Generative Engine Optimisation</Eyebrow>
          <RevealText
            as="h1"
            className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[900px] mb-6"
          >
            Be the brand AI recommends.
          </RevealText>
          <p className="font-body text-[length:var(--type-body-lg)] text-text-muted-light font-light max-w-xl mb-10">
            Search has changed. Your guests now ask ChatGPT, Perplexity and Google AI Mode which hotel to book, which spa to visit, which club to join. We engineer the answer.
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-10">
            {['ChatGPT', 'Perplexity', 'Gemini', 'Claude', 'AI Overviews', 'AI Mode', 'Copilot', 'Meta AI', 'Grok'].map((s) => (
              <span
                key={s}
                className="font-body text-xs uppercase tracking-[0.18em] text-text-muted-light/80"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn-primary">
              <span>Book an AI Visibility Audit →</span>
            </Link>
            <div className="font-body text-sm text-text-muted-light font-light">
              <span className="text-gold font-medium">$1,150</span> · fixed scope · two-week turnaround
            </div>
          </div>
        </div>
      </section>

      {/* Sourced Stats */}
      <section className="py-[var(--component-gap)] border-y border-gold/10">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="border-l border-gold/30 pl-5">
                <p className="font-display text-[clamp(40px,4vw,56px)] text-gold leading-none mb-3">
                  {stat.value}
                </p>
                <p className="font-body text-sm text-text-muted-light font-light leading-relaxed mb-3">
                  {stat.label}
                </p>
                <p className="font-body text-[11px] uppercase tracking-[0.16em] text-text-muted-light/60">
                  {stat.source}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* The Shift Narrative */}
      <section className="py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <SectionReveal className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <Eyebrow className="mb-6 block">The Shift</Eyebrow>
              <h2 className="font-display text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light">
                The result page is being replaced by the answer.
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light leading-relaxed">
                The page is now the answer itself. AI Overviews trigger on roughly half of all Google searches; Perplexity, ChatGPT and Claude have eaten the discovery layer for high-intent buyers. Generative Engine Optimisation decides whether your brand is named, fairly described and recommended inside those answers — through entity engineering, schema architecture and citation strategy. Done late, your competitors own the answer.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* The Surfaces */}
      <section className="py-[var(--section-gap)] border-t border-gold/10">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="mb-4 block">The Surfaces</Eyebrow>
            <h2 className="font-display text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light mb-4">
              Eight engines. Eight ranking models.
            </h2>
            <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light">
              Citation overlap between ChatGPT and Perplexity is roughly 11%. AI Overviews and AI Mode share citations 13.7% of the time. A single channel strategy fails by design. Every engine needs its own playbook.
            </p>
          </div>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/15">
            {surfaces.map((s, i) => (
              <div key={i} className="bg-navy p-6 lg:p-7">
                <p className="font-display text-text-light text-lg mb-3">
                  {s.name}
                </p>
                <p className="font-body text-xs text-text-muted-light font-light leading-relaxed">
                  {s.note}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* How We Build It · 6 modules across 4 phases */}
      <section className="py-[var(--section-gap)] border-t border-gold/10">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="mb-14 max-w-2xl">
            <Eyebrow className="mb-4 block">How We Build It</Eyebrow>
            <h2 className="font-display text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light mb-4">
              Diagnose. Engineer. Earn. Monitor.
            </h2>
            <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light">
              Six modules across four disciplines. Each one produces a named artefact your team can inspect, review and own.
            </p>
          </div>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/15">
            {buildBlocks.map((b) => (
              <div key={b.n} className="bg-navy p-7 lg:p-8">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-display text-gold/40 text-base">{b.n}</span>
                  <span className="font-body text-[10px] uppercase tracking-[0.18em] text-gold">
                    {b.phase}
                  </span>
                </div>
                <h3 className="font-display text-lg leading-snug text-text-light mb-3">
                  {b.title}
                </h3>
                <p className="font-body text-sm text-text-muted-light font-light leading-relaxed">
                  {b.body}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Technical Depth */}
      <section className="py-[var(--section-gap)] border-t border-gold/10 bg-[rgba(0,0,0,0.18)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="mb-14 max-w-2xl">
            <Eyebrow className="mb-4 block">The Technical Substrate</Eyebrow>
            <h2 className="font-display text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light mb-4">
              The plumbing most agencies miss.
            </h2>
            <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light">
              An AI visibility programme that does not address crawler policy, render guarantees, schema validity and entity reconciliation is a content programme with a new logo. Here is what we audit and ship at the infrastructure layer.
            </p>
          </div>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10">
            {technicals.map((t, i) => (
              <div key={i}>
                <p className="font-body text-[11px] uppercase tracking-[0.18em] text-gold mb-3">
                  {t.label}
                </p>
                <p className="font-body text-sm text-text-muted-light font-light leading-relaxed">
                  {t.body}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Risk */}
      <section className="py-[var(--section-gap)] border-t border-gold/10">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <SectionReveal className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <Eyebrow className="mb-6 block">The Cost of Silence</Eyebrow>
              <h2 className="font-display text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light">
                If you don&rsquo;t shape the answer, the model invents one.
              </h2>
            </div>
            <div className="md:col-span-7 space-y-6">
              <div>
                <p className="font-body text-sm uppercase tracking-[0.16em] text-gold mb-2">Hallucinated facts</p>
                <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light leading-relaxed">
                  Roughly one in eleven AI responses about a brand contains a fabricated detail. Wrong pricing, wrong location, a service you don&rsquo;t offer. At 10,000 monthly mentions, that is 900 prospects misinformed.
                </p>
              </div>
              <div>
                <p className="font-body text-sm uppercase tracking-[0.16em] text-gold mb-2">Competitor capture</p>
                <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light leading-relaxed">
                  When users ask about your category, or worse your name, and the AI cites a competitor, the answer is the booking. The retraction window is the next training cycle.
                </p>
              </div>
              <div>
                <p className="font-body text-sm uppercase tracking-[0.16em] text-gold mb-2">Direct booking erosion</p>
                <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light leading-relaxed">
                  AI assistants increasingly route to OTAs by default. Without a deliberate citation strategy, every AI-mediated enquiry costs you commission you should never have paid.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Case Study · Zatrovo */}
      <section className="py-[var(--component-gap)] border-y border-gold/10">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Eyebrow className="mb-4 block">Live Case Study</Eyebrow>
              <h3 className="font-display text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light mb-4">
                Zatrovo
              </h3>
              <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light mb-4">
                Our flagship SaaS reaches 13,000+ members across multiple studios. Structured data, passage level content and a citation programme built for the way modern search actually works. Surfaced when buyers ask AI for &ldquo;the best booking platform for boutique studios.&rdquo;
              </p>
              <Link
                href="/work/zatrovo"
                className="font-body text-sm text-gold hover:text-gold-light transition-colors"
              >
                Read the Zatrovo case study →
              </Link>
            </div>
            <Link
              href="/work/zatrovo"
              className="block relative aspect-[4/3] overflow-hidden rounded border border-gold/15 group"
            >
              <Image
                src="/images/projects/zatrovo-hero.webp"
                alt="Zatrovo · Built for studios"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-[var(--section-gap)] border-t border-gold/10">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="mb-4 block">Engagement Models</Eyebrow>
            <h2 className="font-display text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light">
              Three ways to begin.
            </h2>
          </div>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-[var(--grid-gap)]">
            {pricing.map((p, i) => (
              <div
                key={i}
                className={`p-8 md:p-10 ${
                  p.featured
                    ? 'border border-gold bg-[rgba(201,169,110,0.05)] md:-translate-y-3'
                    : 'border border-gold/20 bg-[rgba(255,255,255,0.02)]'
                }`}
              >
                {p.featured && (
                  <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gold block mb-4">
                    Most chosen
                  </span>
                )}
                <h3 className="font-display text-xl text-text-light mb-3">{p.name}</h3>
                <p className="font-display text-3xl text-gold leading-none mb-1">{p.price}</p>
                <p className="font-body text-[11px] uppercase tracking-[0.16em] text-text-muted-light/70 mb-6">
                  {p.cadence}
                </p>
                <p className="font-body text-sm text-text-muted-light font-light leading-relaxed">
                  {p.summary}
                </p>
              </div>
            ))}
          </SectionReveal>
          <p className="font-body text-xs text-text-muted-light/60 font-light mt-10 max-w-3xl">
            Indicative pricing. Project and retainer scopes are sized to the brand, the category and the competitive set. Larger groups, multi-property estates and bespoke engagements are quoted individually.
          </p>
          <p className="font-body text-sm text-gold/80 mt-4 max-w-3xl">
            Or bundled into our flagship engagement,{' '}
            <Link href="/revenue-engineering" className="text-gold hover:text-gold-light underline underline-offset-4 decoration-gold/30">
              Revenue Engineering →
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[var(--section-gap)] border-t border-gold/10">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="mb-4 block">Frequently Asked</Eyebrow>
            <h2 className="font-display text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light">
              The questions buyers ask first.
            </h2>
          </div>
          <SectionReveal className="max-w-3xl">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gold/15">
                <details className="group">
                  <summary className="w-full py-6 flex items-center justify-between text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="font-body text-[length:var(--type-body)] text-text-light font-light pr-8">
                      {faq.question}
                    </span>
                    <span className="text-gold text-xl shrink-0 transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="pb-6">
                    <p className="font-body text-sm text-text-muted-light font-light leading-relaxed max-w-2xl">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[var(--section-gap)] border-t border-gold/10">
        <div
          className="mx-auto px-[var(--gutter)] text-center"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <RevealText
            as="h2"
            className="font-display font-normal italic text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[720px] mx-auto justify-center mb-6"
          >
            The answer is being written. Make sure your brand is in it.
          </RevealText>
          <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light max-w-xl mx-auto mb-10">
            Start with a fixed scope AI Visibility Audit. Two weeks. One named report. A clear view of where your brand stands across every engine that matters.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link href="/contact" className="btn-primary px-10">
              <span>Book your AI Visibility Audit →</span>
            </Link>
            <Link href="/revenue-engineering" className="btn-outline px-10">
              <span>Or bundle into Revenue Engineering →</span>
            </Link>
          </div>
          <p className="font-body text-xs text-text-muted-light/50">
            We respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Closing rule */}
      <div className="border-t border-gold/15">
        <div
          className="mx-auto px-[var(--gutter)] py-10 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <p className="font-body text-[length:var(--type-caption)] text-text-muted-light/50 uppercase tracking-[var(--type-label-ls)]">
            Generative Engine Optimisation · GEO · AEO
          </p>
          <p className="font-body text-[length:var(--type-caption)] text-text-muted-light/50 uppercase tracking-[var(--type-label-ls)]">
            ChatGPT · Perplexity · Gemini · Claude · AI Overviews · AI Mode · Copilot · Meta AI · Grok
          </p>
        </div>
      </div>
    </main>
  );
}
