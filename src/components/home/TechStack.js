'use client';

import Eyebrow from '@/components/ui/Eyebrow';

const tools = [
  // AI & Development
  'Claude', 'ChatGPT', 'Cursor', 'Gemini',
  // Frameworks
  'React', 'Next.js', 'Vercel',
  // Platforms
  'Google', 'Instagram', 'Facebook', 'TikTok',
  // Extra
  'Figma', 'Shopify', 'WordPress',
];

export default function TechStack() {
  return (
    <section className="bg-cream-2 py-16 overflow-hidden">
      <div
        className="mx-auto px-[var(--gutter)] mb-8"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="block text-center">Powered By</Eyebrow>
      </div>

      {/* Scrolling tech logos */}
      <div className="relative overflow-hidden">
        <div
          className="flex animate-marquee items-center gap-12 md:gap-16 whitespace-nowrap"
          style={{ '--marquee-speed': '25s' }}
        >
          {[...tools, ...tools].map((name, i) => (
            <span
              key={i}
              className="font-body text-sm md:text-base font-medium text-text-dark/25 tracking-[0.1em] uppercase shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
