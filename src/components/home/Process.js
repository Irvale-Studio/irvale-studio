'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';
import Eyebrow from '@/components/ui/Eyebrow';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'Your goals, your customers, your competitors. Strategy built on reality, not guesswork.',
  },
  {
    number: '02',
    title: 'Strategy & Roadmap',
    description:
      'A clear plan covering what we build, how it converts, and where the traffic comes from.',
  },
  {
    number: '03',
    title: 'Build & Launch',
    description:
      'Bespoke design and development with weekly updates. No surprises.',
  },
  {
    number: '04',
    title: 'Growth',
    description:
      'Your site goes live and starts working. We optimise, refine, and compound the results.',
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  const cardsRef = useRef([]);
  const sliderRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  // Track active card on mobile scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const cardWidth = slider.firstElementChild?.offsetWidth || 1;
      const gap = 16;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveStep(Math.min(index, steps.length - 1));
    };

    slider.addEventListener('scroll', handleScroll, { passive: true });
    return () => slider.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
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

      mm.add('(max-width: 767px)', () => {
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          gsap.set(card, { opacity: 0, y: 20 });
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
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
        {/* Desktop: two-column layout */}
        <div className="hidden md:grid md:grid-cols-[1fr_1.2fr] gap-[var(--grid-gap)]">
          <div className="md:sticky md:top-[30vh] md:self-start">
            <Eyebrow className="mb-6 block">From Brief to Growth</Eyebrow>
            <h2 className="font-display text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light mb-6">
              Four steps.
              <br /> Guaranteed results.
            </h2>
            <p className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-text-muted-light mb-8 max-w-md">
              A proven process refined across every project we deliver.
            </p>
            <div className="relative h-32 w-px ml-1">
              <div className="absolute inset-0 bg-white/10 rounded-full" />
              <div
                ref={progressRef}
                className="absolute inset-0 bg-gold rounded-full origin-top"
                style={{ transform: 'scaleY(0)' }}
              />
            </div>
          </div>

          <div className="flex flex-col">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => (cardsRef.current[i] = el)}
                className="border-t border-gold/30 pt-8 pb-8 md:min-h-[40vh] md:flex md:flex-col md:justify-center"
              >
                <span className="font-display text-gold text-[length:var(--type-body-sm)] tracking-wider block mb-4">
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

        {/* Mobile: horizontal swipe slider */}
        <div className="md:hidden">
          <Eyebrow className="mb-6 block">From Brief to Growth</Eyebrow>
          <h2 className="font-display text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] text-text-light mb-8">
            Four steps. Guaranteed results.
          </h2>

          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-[var(--gutter)] px-[var(--gutter)] pb-6"
          >
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => (cardsRef.current[i] = el)}
                className="snap-center shrink-0 w-[80vw] border border-white/[0.06] bg-dark-2/40 p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display text-gold text-[length:var(--type-body-sm)] tracking-wider">
                    {step.number}
                  </span>
                  <div className="h-px flex-1 bg-gold/20" />
                </div>
                <h3 className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-light mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-[length:var(--type-body-sm)] leading-[var(--type-body-sm-lh)] text-text-muted-light font-light">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStep === i ? 'w-6 bg-gold' : 'w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
