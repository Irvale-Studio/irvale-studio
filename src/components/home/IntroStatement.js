'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import RevealText from '@/components/ui/RevealText';
import SectionReveal from '@/components/ui/SectionReveal';
import Eyebrow from '@/components/ui/Eyebrow';
import Counter from '@/components/ui/Counter';

const stats = [
  { value: 85, suffix: '%', label: 'Bookings moved online' },
  { value: 35, suffix: '+', label: 'Tours bookable instantly' },
  { value: 4, suffix: 'x', label: 'Client conversion rate' },
];

const CYCLE_DURATION = 4000;
const PAUSE_DURATION = 10000;

export default function IntroStatement() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const pauseTimerRef = useRef(null);

  // Auto-cycle
  useEffect(() => {
    if (paused) return;

    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % stats.length);
    }, CYCLE_DURATION);

    return () => clearTimeout(timerRef.current);
  }, [activeIndex, paused]);

  const handleClick = useCallback((i) => {
    clearTimeout(timerRef.current);
    clearTimeout(pauseTimerRef.current);
    setActiveIndex(i);
    setPaused(true);
    pauseTimerRef.current = setTimeout(() => setPaused(false), PAUSE_DURATION);
  }, []);

  return (
    <section className="bg-dark py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-8 block">What We Do For You</Eyebrow>

        <RevealText
          as="h2"
          className="font-display font-normal text-text-light text-[length:var(--type-h2)] leading-[var(--type-h2-lh)] max-w-[800px] mb-12"
        >
          We handle the technology so you can focus on what you do best.
        </RevealText>

        <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <p className="font-body text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-muted-light font-light">
            From bespoke websites and booking systems to AI visibility and email marketing — we build, automate, and manage the digital infrastructure that drives your revenue.
          </p>
          <p className="hidden md:block font-body text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-muted-light font-light">
            No templates. No outsourced freelancers. Every project is built in-house, around your business, with transparent pricing and support you can actually reach.
          </p>
        </SectionReveal>

        {/* Client result stats — expanding cards */}
        <SectionReveal className="pt-8 border-t border-[var(--border-dark)]">
          {/* Mobile: static grid, no animation, no layout shift */}
          <div className="grid grid-cols-3 gap-3 md:hidden">
            {stats.map((stat, i) => (
              <div key={i} className="border border-white/[0.06] bg-dark-2/60 p-5">
                <div className="font-display text-[clamp(28px,8vw,40px)] text-gold leading-none mb-2">
                  +<Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="font-body text-[length:var(--type-caption)] leading-[var(--type-caption-lh)] text-text-muted-light uppercase tracking-[var(--type-label-ls)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop: expanding cards with auto-cycle */}
          <div className="hidden md:flex gap-4 min-h-[160px]">
            {stats.map((stat, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={i}
                  onClick={() => handleClick(i)}
                  className="relative text-left cursor-pointer border border-white/[0.06] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    flex: isActive ? 4 : 1,
                    borderColor: isActive ? 'rgba(201,169,110,0.2)' : undefined,
                    background: isActive ? 'rgba(26,26,26,0.8)' : 'rgba(26,26,26,0.3)',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 h-[2px] bg-gold/50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ width: isActive ? '100%' : '0%' }}
                  />

                  <div className="p-6 h-full flex flex-col justify-center">
                    <div
                      className="font-display leading-none mb-1 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        fontSize: isActive ? 'clamp(40px, 5vw, 64px)' : 'clamp(28px, 3vw, 36px)',
                        color: isActive ? 'var(--color-gold)' : 'rgba(201,169,110,0.3)',
                      }}
                    >
                      +<Counter target={stat.value} suffix={stat.suffix} />
                    </div>

                    <div
                      className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        maxHeight: isActive ? '40px' : '0px',
                        opacity: isActive ? 1 : 0,
                        marginTop: isActive ? '8px' : '0px',
                      }}
                    >
                      <p className="font-body text-[length:var(--type-caption)] leading-[var(--type-caption-lh)] text-text-muted-light uppercase tracking-[var(--type-label-ls)]">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
