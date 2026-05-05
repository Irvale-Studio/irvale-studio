import Link from 'next/link';
import Image from 'next/image';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import Counter from '@/components/ui/Counter';

export default function CaseStudyContent({ project, nextProject }) {
  const metricMatch = project.metric.match(/(\d+)/);
  const metricNumber = metricMatch ? parseInt(metricMatch[1]) : null;

  return (
    <main>
      {/* Hero — dark text section, no image overlay */}
      <section className="bg-dark pt-32 md:pt-40 pb-16">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Link
            href="/work"
            className="font-body text-sm text-text-muted-light hover:text-gold transition-colors mb-8 inline-block"
          >
            ← Back to Work
          </Link>

          <Eyebrow className="mb-4 block">{project.niche}</Eyebrow>
          <h1 className="font-display text-[length:var(--type-display)] leading-[var(--type-display-lh)] text-text-light max-w-[800px] mb-6">
            {project.name}
          </h1>
          <p className="font-display italic text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-muted-light font-light max-w-xl">
            {project.headline}
          </p>
        </div>
      </section>

      {/* Metadata bar */}
      <section className="bg-dark-2 border-y border-[var(--border-dark)]">
        <div
          className="mx-auto px-[var(--gutter)] py-8 grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div>
            <Eyebrow className="block mb-2">Client Type</Eyebrow>
            <p className="font-body text-sm text-text-light">{project.niche}</p>
          </div>
          <div>
            <Eyebrow className="block mb-2">Timeline</Eyebrow>
            <p className="font-body text-sm text-text-light">{project.timeline}</p>
          </div>
          <div>
            <Eyebrow className="block mb-2">Services</Eyebrow>
            <p className="font-body text-sm text-text-light">{project.services_detail}</p>
          </div>
          <div>
            <Eyebrow className="block mb-2">Key Result</Eyebrow>
            <p className="font-body text-sm text-gold font-medium">{project.metric}</p>
          </div>
        </div>
      </section>

      {/* Hero screenshot — browser mockup, not full-bleed */}
      <section className="bg-dark py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <div className="rounded-lg overflow-hidden border border-white/10 bg-dark-2 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-dark-2 border-b border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="ml-3 flex-1 text-center font-body text-[10px] text-text-muted-light/40 truncate">
                {project.url?.replace('https://', '')}
              </span>
            </div>
            <div className="relative aspect-video">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover object-top"
                sizes="(min-width: 768px) 80vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-8 block">The Challenge</Eyebrow>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <blockquote className="font-display italic text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark">
              {project.headline}
            </blockquote>
            <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-muted-dark font-light">
              {project.challenge}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-dark py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-8 block">Our Approach</Eyebrow>
          <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.approach.map((step, i) => (
              <div key={i} className="flex gap-4">
                <span className="font-display text-gold text-lg shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-light font-light">
                  {step}
                </p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Design Gallery */}
      <section className="bg-dark-2 py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-8 block">Design Gallery</Eyebrow>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--grid-gap)]">
            {project.gallery.map((src, i) => (
              <div
                key={i}
                className={`relative aspect-video bg-dark overflow-hidden rounded-lg border border-white/5 ${i === 0 ? 'md:col-span-2' : ''}`}
              >
                <Image
                  src={src}
                  alt={`${project.name} screenshot ${i + 1}`}
                  fill
                  className="object-cover object-top"
                  sizes={i === 0 ? '100vw' : '(min-width: 768px) 50vw, 100vw'}
                />
              </div>
            ))}
          </div>
          {project.url && (
            <div className="mt-8">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-gold hover:text-gold-light transition-colors"
              >
                Visit Live Site →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* The Outcome */}
      <section className="bg-cream py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-8 block">The Outcome</Eyebrow>
          <SectionReveal>
            <div className="mb-12">
              <p className="font-display text-[clamp(48px,8vw,96px)] text-gold leading-none">
                {project.metric}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {project.results.map((result, i) => (
                <div key={i} className="border-l border-gold/30 pl-6">
                  <p className="font-body text-[length:var(--type-body)] text-text-dark font-light">
                    {result}
                  </p>
                </div>
              ))}
            </div>

            {project.testimonial && (
              <div className="max-w-2xl">
                <div className="w-12 h-px bg-gold mb-8" />
                <blockquote className="font-display italic text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark mb-4">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>
                <p className="font-body text-sm text-text-dark font-medium">
                  {project.testimonial.author}
                </p>
                <p className="font-body text-xs text-text-muted-dark mt-1">
                  {project.testimonial.role}
                </p>
              </div>
            )}
          </SectionReveal>
        </div>
      </section>

      {/* Next Project */}
      <section className="bg-dark py-16">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Link
            href={`/work/${nextProject.slug}`}
            className="group flex items-center justify-between"
          >
            <div>
              <Eyebrow className="block mb-2">Next Project</Eyebrow>
              <h3 className="font-display text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light group-hover:text-gold transition-colors">
                {nextProject.name}
              </h3>
            </div>
            <span className="font-body text-2xl text-gold">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
