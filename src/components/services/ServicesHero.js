'use client';

import Eyebrow from '@/components/ui/Eyebrow';
import RevealText from '@/components/ui/RevealText';
import NodeConstellation from '@/components/ui/NodeConstellation';

export default function ServicesHero() {
  return (
    <section className="relative bg-dark pt-32 pb-[var(--section-gap)] overflow-hidden noise-overlay">
      {/* Constellation — hero version: more nodes, bigger connections, brighter */}
      <div className="absolute inset-0">
        <NodeConstellation
          nodeCount={35}
          connectionDistance={180}
          speed={0.25}
          glowMultiplier={1.6}
        />
      </div>

      {/* Radial gradient overlay — smooth multi-stop */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(17,17,17,0.2) 0%, rgba(17,17,17,0.4) 30%, rgba(17,17,17,0.65) 55%, rgba(17,17,17,0.85) 80%)' }} />

      <div
        className="relative mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-6 block">Services & Pricing</Eyebrow>
        <RevealText
          as="h1"
          className="font-display font-normal text-text-light text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[800px] mb-6"
        >
          Transparent pricing. No surprises.
        </RevealText>
        <p className="font-body text-[length:var(--type-body-lg)] text-text-muted-light font-light max-w-lg">
          See the full picture before you commit. From a clean brochure site
          to a fully custom platform with admin tools, SEO, and AI search
          optimisation.
        </p>
      </div>
    </section>
  );
}
