'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Eyebrow from '@/components/ui/Eyebrow';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'We Learn Your Business',
    description:
      "Your goals, your customers, your competitors. We go deep so the strategy is built on reality — not guesswork.",
  },
  {
    number: '02',
    title: 'We Map the Growth Plan',
    description:
      "A clear roadmap covering what we'll build, how it'll convert, and where the traffic will come from. You'll know the ROI before we write a line of code.",
  },
  {
    number: '03',
    title: 'We Build & Launch',
    description:
      'Bespoke design and development with weekly progress updates. You see everything as it comes together — no surprises.',
  },
  {
    number: '04',
    title: 'You Grow',
    description:
      'Your site goes live and starts working. We monitor performance, optimise for conversions, and make sure the growth keeps compounding.',
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const mm = gsap.matchMedia();

      // Desktop: progress bar + card fade-ins tied to scroll
      mm.add('(min-width: 768px)', () => {
        // Animate the progress line as user scrolls through the right column
        gsap.to(progressRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 30%',
            end: 'bottom 70%',
            scrub: true,
          },
        });

        // Fade in each step card
        cardsRef.current.forEach((card) => {
          if (!card) return;
          gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              once: true,
            },
          });
        });
      });

      // Mobile: simple fade-in for each card
      mm.add('(max-width: 767px)', () => {
        cardsRef.current.forEach((card) => {
          if (!card) return;
          gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: 'power2.out',
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
    <section ref={sectionRef} className="bg-dark py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        {/* Two-column layout on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-[var(--grid-gap)]">
          {/* Left column — sticky on desktop */}
          <div className="md:sticky md:top-[30vh] md:self-start">
            <Eyebrow className="mb-6 block">From Brief to Growth</Eyebrow>

            <h2 className="font-display text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light mb-6">
              A process built
              <br className="hidden md:block" /> for results
            </h2>

            <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-muted-light mb-8 max-w-md">
              Most clients see measurable results within 90 days of launch.
            </p>

            {/* Progress indicator — desktop only */}
            <div className="hidden md:block relative h-32 w-px ml-1">
              {/* Track */}
              <div className="absolute inset-0 bg-white/10 rounded-full" />
              {/* Fill */}
              <div
                ref={progressRef}
                className="absolute inset-0 bg-gold rounded-full origin-top"
                style={{ transform: 'scaleY(0)' }}
              />
            </div>
          </div>

          {/* Right column — scrolling step cards */}
          <div className="flex flex-col gap-8 md:gap-0">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => (cardsRef.current[i] = el)}
                className="border-t border-gold/30 pt-8 pb-8 md:min-h-[40vh] md:flex md:flex-col md:justify-center"
              >
                <span className="font-display text-gold text-sm tracking-wider block mb-4">
                  {step.number}
                </span>
                <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-light mb-4">
                  {step.title}
                </h3>
                <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-muted-light font-light max-w-lg">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
