'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/data/projects';

const featured = projects.slice(0, 3);

export default function FeaturedWork() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const mobileCardsRef = useRef([]);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const track = trackRef.current;
      const scrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });

    mm.add('(max-width: 767px)', () => {
      const cards = mobileCardsRef.current.filter(Boolean);

      cards.forEach((card, i) => {
        if (i === 0) return;

        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            once: true,
          },
        });
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  const CardContent = ({ project }) => (
    <div className="flex flex-col h-full">
      {/* Browser frame with screenshot */}
      <div className="rounded-t-lg overflow-hidden border border-white/10 border-b-0 bg-dark-2">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-dark-2 border-b border-white/5">
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="ml-2 flex-1 text-center font-body text-[9px] text-text-muted-light/40 truncate">
            {project.url?.replace('https://', '')}
          </span>
          {project.url && (
            <span className="inline-flex items-center gap-1 font-body text-[8px] font-medium uppercase tracking-[0.2em] text-emerald-400 shrink-0">
              <span className="relative flex w-1 h-1">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative w-1 h-1 rounded-full bg-emerald-400" />
              </span>
              Live
            </span>
          )}
        </div>
        <div className="relative aspect-video">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="(min-width: 768px) 45vw, 100vw"
          />
        </div>
      </div>

      {/* Info below image */}
      <div className="border border-white/10 border-t-0 rounded-b-lg px-5 py-4 bg-dark-2/50">
        <span className="font-body text-[length:var(--type-caption)] text-gold uppercase tracking-[var(--type-label-ls)] mb-1 block">
          {project.niche}
        </span>
        <h3 className="font-display text-[length:var(--type-h4)] leading-[var(--type-h4-lh)] text-text-light mb-2">
          {project.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-body text-xs text-text-muted-light/70">
            {project.metric}
          </span>
          <span className="font-body text-xs text-gold">
            View →
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="bg-dark overflow-hidden">
      <div className="py-[var(--section-gap)]">
        {/* Desktop: horizontal scroll track */}
        <div
          ref={trackRef}
          className="hidden md:flex flex-nowrap gap-[var(--grid-gap)] px-[var(--gutter)] will-change-transform"
        >
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group relative flex-shrink-0 w-[42vw]"
            >
              <CardContent project={project} />
            </Link>
          ))}
        </div>

        {/* Mobile: scroll-stacking cards */}
        <div className="md:hidden flex flex-col gap-6 px-[var(--gutter)]">
          {featured.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              ref={(el) => (mobileCardsRef.current[i] = el)}
              className="group relative w-full"
            >
              <CardContent project={project} />
            </Link>
          ))}
        </div>

        <div
          className="mx-auto px-[var(--gutter)] mt-12"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Link
            href="/work"
            className="font-body text-[length:var(--type-body-sm)] font-medium text-gold hover:text-gold-light transition-colors"
          >
            See All Work →
          </Link>
        </div>
      </div>
    </section>
  );
}
