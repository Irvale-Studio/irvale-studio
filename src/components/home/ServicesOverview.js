'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Get Found',
    subtitle: 'Design & Development',
    description:
      'A website that looks premium and converts. Faster load times, intuitive booking flows, and a design that builds trust the moment someone lands. No templates — built for your brand, your audience, your goals.',
    outcome: 'Clients see 2–3x more enquiries within the first quarter.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Get Chosen',
    subtitle: 'SEO & Search Strategy',
    description:
      'Rank for the searches your ideal customers are making. We build the technical foundation and content strategy that puts you ahead of competitors in Google — and keeps you there.',
    outcome: 'Average #1 local ranking within 6 months.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Get Recommended',
    subtitle: 'AI Visibility',
    description:
      "When someone asks ChatGPT for \"the best spa near me\" or \"top golf clubs in London\" — your name comes up. We optimise your brand for the AI-powered search that's replacing Google for millions.",
    outcome: 'Crestview Members Club built a 400+ waitlist in 3 months.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

export default function ServicesOverview() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const lineRef = useRef(null);
  const numbersRef = useRef([]);
  const accentsRef = useRef([]);
  const iconsRef = useRef([]);
  const outcomesRef = useRef([]);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        // Animate the connecting line across top of cards
        if (lineRef.current) {
          gsap.from(lineRef.current, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.5,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              once: true,
            },
          });
        }

        // Staggered card reveal with clip-path wipe
        cardsRef.current.forEach((card, i) => {
          if (!card) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              once: true,
            },
          });

          // Card slides up and fades in
          tl.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.2,
          });

          // Number slides up from below
          if (numbersRef.current[i]) {
            tl.from(
              numbersRef.current[i],
              {
                yPercent: 100,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.out',
              },
              '-=0.6'
            );
          }

          // Icon fades and scales in
          if (iconsRef.current[i]) {
            tl.from(
              iconsRef.current[i],
              {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(1.7)',
              },
              '-=0.5'
            );
          }

          // Gold accent line draws across
          if (accentsRef.current[i]) {
            tl.from(
              accentsRef.current[i],
              {
                scaleX: 0,
                transformOrigin: 'left center',
                duration: 0.8,
                ease: 'power2.inOut',
              },
              '-=0.4'
            );
          }

          // Outcome text fades in last
          if (outcomesRef.current[i]) {
            tl.from(
              outcomesRef.current[i],
              {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
              },
              '-=0.3'
            );
          }
        });
      });

      // Mobile: simpler staggered fade-in
      mm.add('(max-width: 767px)', () => {
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          });
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-cream py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-4 block">How We Grow Your Business</Eyebrow>
        <RevealText
          as="h2"
          className="font-display font-normal text-text-dark text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[700px] mb-16"
        >
          Three ways we put more customers through your door
        </RevealText>

        {/* Connecting line — desktop only */}
        <div className="hidden md:block mb-12">
          <div
            ref={lineRef}
            className="h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[var(--grid-gap)]">
          {services.map((service, i) => (
            <div
              key={service.number}
              ref={(el) => (cardsRef.current[i] = el)}
              className="service-card group relative border border-[var(--border-light)] bg-cream p-8 md:p-10 transition-all duration-500 ease-out hover:border-gold/30 hover:shadow-[0_8px_40px_rgba(201,169,110,0.08)] hover:-translate-y-1"
            >
              {/* Top row: number + icon */}
              <div className="flex items-start justify-between mb-6">
                <div className="overflow-hidden">
                  <span
                    ref={(el) => (numbersRef.current[i] = el)}
                    className="font-display text-[clamp(48px,5vw,72px)] text-gold/15 leading-none block"
                  >
                    {service.number}
                  </span>
                </div>
                <div
                  ref={(el) => (iconsRef.current[i] = el)}
                  className="text-gold/40 transition-colors duration-500 group-hover:text-gold"
                >
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-dark mb-1 transition-colors duration-500 group-hover:text-gold-muted">
                {service.title}
              </h3>

              {/* Subtitle */}
              <p className="font-body text-xs text-gold-muted uppercase tracking-[0.15em] mb-5">
                {service.subtitle}
              </p>

              {/* Gold accent line */}
              <div
                ref={(el) => (accentsRef.current[i] = el)}
                className="h-px bg-gradient-to-r from-gold/50 to-gold/0 w-2/3 mb-5"
              />

              {/* Description */}
              <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-muted-dark font-light mb-6">
                {service.description}
              </p>

              {/* Outcome */}
              <div
                ref={(el) => (outcomesRef.current[i] = el)}
                className="border-t border-[var(--border-light)] pt-5"
              >
                <p className="font-body text-sm text-gold-muted font-medium italic">
                  {service.outcome}
                </p>
              </div>

              {/* Hover corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-gold/0 border-l-[40px] border-l-transparent transition-all duration-500 group-hover:border-t-gold/10" />
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="btn-outline inline-block"
          >
            <span>See Pricing & Packages</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
