'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import Image from 'next/image';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import { projects } from '@/lib/data/projects';

const projectImages = {
  'heathland-golf-club': '/images/work-heathland.svg',
  'aura-wellness-retreat': '/images/work-aura.svg',
  'blackwood-performance': '/images/work-blackwood.svg',
};

gsap.registerPlugin(ScrollTrigger);

const featured = projects.slice(0, 3);

export default function FeaturedWork() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const mobileCardsRef = useRef([]);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();

    // Desktop: horizontal pinned scroll
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

    // Mobile: scroll-stacking cards
    mm.add('(max-width: 767px)', () => {
      const cards = mobileCardsRef.current.filter(Boolean);

      cards.forEach((card, i) => {
        if (i === 0) return;

        gsap.fromTo(
          card,
          { yPercent: 60, scale: 0.95, opacity: 0.5 },
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              end: 'top 55%',
              scrub: true,
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  const CardContent = ({ project }) => (
    <>
      {projectImages[project.slug] && (
        <Image
          src={projectImages[project.slug]}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 768px) 45vw, 100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-2/40 to-dark/60" />

      <div className="absolute top-6 left-6 z-10">
        <span className="font-display text-[clamp(20px,2.5vw,32px)] text-gold leading-none">
          {project.metric}
        </span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent md:bg-dark/70 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
        <span className="font-body text-[length:var(--type-caption)] text-gold uppercase tracking-[var(--type-label-ls)] mb-2">
          {project.niche}
        </span>
        <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-light">
          {project.name}
        </h3>
        <p className="hidden md:block font-body text-[length:var(--type-body-sm)] leading-[var(--type-body-sm-lh)] text-text-muted-light mt-2 max-w-sm">
          {project.headline}
        </p>
        <span className="font-body text-[length:var(--type-body-sm)] text-gold mt-3">
          View Project →
        </span>
      </div>
    </>
  );

  return (
    <section ref={sectionRef} className="bg-dark overflow-hidden">
      <div className="py-[var(--section-gap)]">
        <div
          className="mx-auto px-[var(--gutter)] mb-12"
          style={{ maxWidth: 'var(--max-width)' }}
        >
          <Eyebrow className="mb-4 block">Trusted Clients</Eyebrow>
          <RevealText
            as="h2"
            className="font-display font-normal text-text-light text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] max-w-[600px]"
          >
            Valuable results and growth.
          </RevealText>
        </div>

        {/* Desktop: horizontal scroll track */}
        <div
          ref={trackRef}
          className="hidden md:flex flex-nowrap gap-[var(--grid-gap)] px-[var(--gutter)]"
        >
          {featured.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group relative flex-shrink-0 w-[45vw] aspect-[4/3] bg-dark-2 overflow-hidden"
            >
              <CardContent project={project} />
            </Link>
          ))}
        </div>

        {/* Mobile: scroll-stacking cards */}
        <div className="md:hidden flex flex-col gap-4 px-[var(--gutter)]">
          {featured.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              ref={(el) => (mobileCardsRef.current[i] = el)}
              className="group sticky top-[20vh] relative w-full aspect-[4/3] bg-dark-2 overflow-hidden"
              style={{
                zIndex: i + 1,
                boxShadow: '0 -8px 30px rgba(0,0,0,0.3)',
              }}
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
