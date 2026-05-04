'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import { projects, niches } from '@/lib/data/projects';
import { cn } from '@/lib/utils';

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.nicheSlug === activeFilter);

  return (
    <main>
      {/* Header */}
      <section className="bg-dark pt-32 pb-16">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-6 block">Selected Work</Eyebrow>
          <RevealText
            as="h1"
            className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[700px] mb-4"
          >
            Live businesses. Real results.
          </RevealText>
          <p className="font-body text-[length:var(--type-body-lg)] text-text-muted-light font-light max-w-lg">
            Every project below is a paying client running on software we built. Click through to read the case study, or visit the live site to see it in action.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-block font-body text-xs text-gold border border-gold/30 px-3 py-1">
              {projects.length} Live Clients
            </span>
            <span className="inline-flex items-center gap-1.5 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400 border border-emerald-400/30 px-3 py-1">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </span>
              All Sites Live
            </span>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="bg-dark sticky top-[65px] z-50 border-b border-[var(--border-dark)]">
        <div
          className="mx-auto px-[var(--gutter)] py-4 flex gap-6 overflow-x-auto scrollbar-hide"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          {niches.map((niche) => (
            <button
              key={niche.slug}
              onClick={() => setActiveFilter(niche.slug)}
              className={cn(
                'font-body text-sm whitespace-nowrap transition-colors',
                activeFilter === niche.slug
                  ? 'text-gold font-medium'
                  : 'text-text-muted-light hover:text-text-light'
              )}
            >
              {niche.label}
            </button>
          ))}
        </div>
      </div>

      {/* Project List */}
      <section className="bg-dark py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)]"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <SectionReveal className="flex flex-col gap-24">
            {filtered.map((project, i) => {
              const reversed = i % 2 === 1;

              return (
                <article
                  key={project.slug}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
                >
                  {/* Screenshot in browser frame */}
                  <Link
                    href={`/work/${project.slug}`}
                    className={cn(
                      'col-span-1 md:col-span-7 block',
                      reversed && 'md:order-2'
                    )}
                  >
                    <div className="rounded-lg overflow-hidden border border-white/10 bg-dark-2 shadow-2xl shadow-black/40 transition-transform duration-500 group-hover:scale-[1.02]">
                      {/* Browser chrome */}
                      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-dark-2 border-b border-white/5">
                        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <span className="ml-3 flex-1 text-center font-body text-[10px] text-text-muted-light/40 truncate">
                          {project.url?.replace('https://', '')}
                        </span>
                      </div>
                      {/* Screenshot */}
                      <div className="relative aspect-video">
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover object-top"
                          sizes="(min-width: 768px) 58vw, 100vw"
                          priority={i === 0}
                        />
                      </div>
                    </div>
                  </Link>

                  {/* Project info */}
                  <div className={cn(
                    'col-span-1 md:col-span-5',
                    reversed && 'md:order-1'
                  )}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-body text-[length:var(--type-caption)] text-gold uppercase tracking-[var(--type-label-ls)]">
                        {project.niche}
                      </span>
                      {project.url && (
                        <span className="inline-flex items-center gap-1.5 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400">
                          <span className="relative flex w-1.5 h-1.5">
                            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                            <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          </span>
                          Live
                        </span>
                      )}
                    </div>
                    <Link href={`/work/${project.slug}`} className="block">
                      <h2 className="font-display text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light mb-4 group-hover:text-gold transition-colors">
                        {project.name}
                      </h2>
                    </Link>
                    <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-muted-light font-light mb-6">
                      {project.headline}
                    </p>

                    {/* Metric pill */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className="font-body text-sm text-gold border border-gold/30 px-3 py-1.5">
                        {project.metric}
                      </span>
                      <span className="font-body text-sm text-text-muted-light border border-white/10 px-3 py-1.5">
                        {project.timeline}
                      </span>
                    </div>

                    {/* Services tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.services.map((s) => (
                        <span key={s} className="font-body text-xs text-text-muted-light/60 bg-white/5 px-2.5 py-1 rounded-sm">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <Link
                        href={`/work/${project.slug}`}
                        className="font-body text-sm text-gold hover:text-gold-light transition-colors"
                      >
                        View Case Study →
                      </Link>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-sm text-text-muted-light hover:text-text-light transition-colors"
                        >
                          Visit Live Site ↗
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
