'use client';

import Image from 'next/image';
import Eyebrow from '@/components/ui/Eyebrow';

const tools = [
  { name: 'Claude', logo: '/logos/claude.svg' },
  { name: 'ChatGPT', logo: '/logos/chatgpt.svg' },
  { name: 'Cursor', logo: '/logos/cursor.svg' },
  { name: 'Gemini', logo: '/logos/gemini.svg' },
  { name: 'React', logo: '/logos/react.svg' },
  { name: 'Next.js', logo: '/logos/nextjs.svg' },
  { name: 'Vercel', logo: '/logos/vercel.svg' },
  { name: 'Google', logo: '/logos/google.svg' },
  { name: 'Instagram', logo: '/logos/instagram.svg' },
  { name: 'Facebook', logo: '/logos/facebook.svg' },
  { name: 'TikTok', logo: '/logos/tiktok.svg' },
  { name: 'Figma', logo: '/logos/figma.svg' },
  { name: 'Shopify', logo: '/logos/shopify.svg' },
  { name: 'WordPress', logo: '/logos/wordpress.svg' },
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
          className="marquee-track"
          style={{ '--marquee-speed': '25s' }}
        >
          {/* First set */}
          <div className="flex items-center gap-12 md:gap-16 shrink-0">
            {tools.map((tool, i) => (
              <Image
                key={i}
                src={tool.logo}
                alt={tool.name}
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto shrink-0 opacity-25 grayscale px-2"
              />
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex items-center gap-12 md:gap-16 shrink-0">
            {tools.map((tool, i) => (
              <Image
                key={`dup-${i}`}
                src={tool.logo}
                alt={tool.name}
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto shrink-0 opacity-25 grayscale px-2"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
