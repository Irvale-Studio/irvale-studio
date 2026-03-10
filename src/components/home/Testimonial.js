'use client';

import SectionReveal from '@/components/ui/SectionReveal';

export default function Testimonial() {
  return (
    <section className="bg-cream py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <SectionReveal className="max-w-3xl mx-auto text-center">
          {/* Gold rule */}
          <div className="w-16 h-px bg-gold mx-auto mb-12" />

          <blockquote className="font-display italic text-[clamp(24px,3.5vw,56px)] leading-[1.2] text-text-dark mb-8">
            &ldquo;Irvale understood our club in a way no agency has before. The result speaks for itself.&rdquo;
          </blockquote>

          <div>
            <p className="font-body text-sm font-medium text-text-dark">
              James Whitfield
            </p>
            <p className="font-body text-xs text-text-muted-dark mt-1">
              Chairman, Heathland Golf Club
            </p>
          </div>

          {/* Gold rule */}
          <div className="w-16 h-px bg-gold mx-auto mt-12" />
        </SectionReveal>
      </div>
    </section>
  );
}
