'use client';

import { useState } from 'react';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionReveal from '@/components/ui/SectionReveal';
import NodeConstellation from '@/components/ui/NodeConstellation';
import { servicesFaqs } from '@/lib/data/services';
import { cn } from '@/lib/utils';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-dark py-[var(--section-gap)] relative overflow-hidden">
      <div
        className="relative mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* FAQ — left side */}
          <div className="md:col-span-7">
            <Eyebrow className="mb-8 block">Frequently Asked Questions</Eyebrow>
            <SectionReveal>
              {servicesFaqs.map((faq, i) => (
                <div key={i} className="border-b border-[var(--border-dark)]">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full py-6 flex items-center justify-between text-left"
                  >
                    <span className="font-body text-[length:var(--type-body)] text-text-light font-light pr-8">
                      {faq.question}
                    </span>
                    <span className={cn(
                      'text-gold text-xl transition-transform duration-300 shrink-0',
                      openIndex === i && 'rotate-45'
                    )}>
                      +
                    </span>
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300',
                      openIndex === i ? 'max-h-96 pb-6' : 'max-h-0'
                    )}
                  >
                    <p className="font-body text-sm text-text-muted-light font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </SectionReveal>
          </div>

          {/* Animated constellation — right side */}
          <div className="hidden md:block md:col-span-5 relative min-h-[400px]">
            <NodeConstellation
              nodeCount={18}
              connectionDistance={140}
              speed={0.3}
              glowMultiplier={1}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
              <span className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-gold/40 mb-3">
                Still have questions?
              </span>
              <p className="font-display text-[length:var(--type-h3)] leading-[var(--type-h3-lh)] text-text-light/20">
                We&rsquo;re here to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
