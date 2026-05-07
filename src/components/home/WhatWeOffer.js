'use client';

import Link from 'next/link';
import SectionReveal from '@/components/ui/SectionReveal';

function WebsiteGraphic() {
  return (
    <svg viewBox="0 0 480 360" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="webGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(201,169,110,0.35)" />
          <stop offset="100%" stopColor="rgba(201,169,110,0.05)" />
        </linearGradient>
      </defs>
      <rect x="40" y="50" width="400" height="270" rx="6" fill="url(#webGlow)" stroke="rgba(201,169,110,0.45)" strokeWidth="1" />
      <rect x="40" y="50" width="400" height="32" fill="rgba(201,169,110,0.08)" stroke="rgba(201,169,110,0.25)" strokeWidth="1" />
      <circle cx="58" cy="66" r="3" fill="rgba(201,169,110,0.6)" />
      <circle cx="72" cy="66" r="3" fill="rgba(201,169,110,0.4)" />
      <circle cx="86" cy="66" r="3" fill="rgba(201,169,110,0.3)" />
      <rect x="60" y="110" width="180" height="12" rx="2" fill="rgba(255,255,255,0.85)" />
      <rect x="60" y="132" width="280" height="6" rx="1" fill="rgba(255,255,255,0.35)" />
      <rect x="60" y="146" width="240" height="6" rx="1" fill="rgba(255,255,255,0.25)" />
      <rect x="60" y="180" width="100" height="34" rx="3" fill="rgba(201,169,110,0.7)" />
      <rect x="270" y="180" width="150" height="100" rx="3" fill="rgba(201,169,110,0.12)" stroke="rgba(201,169,110,0.4)" strokeWidth="1" />
      <path d="M280 230 L300 215 L320 235 L350 200 L390 220" stroke="rgba(201,169,110,0.8)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="60" y="240" width="190" height="40" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    </svg>
  );
}

function RevenueGraphic() {
  return (
    <svg viewBox="0 0 480 360" className="w-full h-auto" aria-hidden="true">
      <defs>
        <radialGradient id="revFunnel" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="rgba(201,169,110,0.35)" />
          <stop offset="100%" stopColor="rgba(201,169,110,0.02)" />
        </radialGradient>
      </defs>
      <path d="M80 60 L400 60 L300 200 L300 290 L180 290 L180 200 Z" fill="url(#revFunnel)" stroke="rgba(201,169,110,0.5)" strokeWidth="1" />
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = 240 + Math.cos(angle) * 160;
        const y = 60 + Math.abs(Math.sin(angle)) * 30;
        return <circle key={i} cx={x} cy={y < 60 ? 60 : y} r="3" fill="rgba(201,169,110,0.7)" />;
      })}
      <circle cx="240" cy="320" r="22" fill="rgba(201,169,110,0.85)" />
      <text x="240" y="328" textAnchor="middle" fontFamily="serif" fontSize="22" fill="#1a1a1a" fontWeight="500">$</text>
      <path d="M240 240 L240 295" stroke="rgba(201,169,110,0.6)" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M232 285 L240 295 L248 285" stroke="rgba(201,169,110,0.8)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookingGraphic() {
  return (
    <svg viewBox="0 0 480 360" className="w-full h-auto" aria-hidden="true">
      <rect x="60" y="50" width="360" height="270" rx="8" fill="rgba(201,169,110,0.05)" stroke="rgba(201,169,110,0.35)" strokeWidth="1" />
      <rect x="60" y="50" width="360" height="50" rx="8" fill="rgba(201,169,110,0.12)" />
      <text x="80" y="82" fontFamily="serif" fontSize="18" fill="rgba(255,255,255,0.9)">May 2026</text>
      {[...Array(28)].map((_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const x = 80 + col * 48;
        const y = 120 + row * 42;
        const isHot = [4, 11, 18].includes(i);
        return (
          <g key={i}>
            <rect x={x} y={y} width="36" height="32" rx="3" fill={isHot ? 'rgba(201,169,110,0.85)' : 'rgba(255,255,255,0.04)'} stroke={isHot ? 'rgba(201,169,110,1)' : 'rgba(255,255,255,0.12)'} strokeWidth="1" />
            <text x={x + 18} y={y + 21} textAnchor="middle" fontFamily="sans-serif" fontSize="12" fill={isHot ? '#1a1a1a' : 'rgba(255,255,255,0.5)'} fontWeight={isHot ? '600' : '400'}>
              {i + 1}
            </text>
          </g>
        );
      })}
      <circle cx="380" cy="290" r="22" fill="rgba(201,169,110,0.9)" />
      <path d="M370 290 L378 298 L392 282" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AutomationGraphic() {
  return (
    <svg viewBox="0 0 480 360" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="autoLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(201,169,110,0.1)" />
          <stop offset="50%" stopColor="rgba(201,169,110,0.8)" />
          <stop offset="100%" stopColor="rgba(201,169,110,0.1)" />
        </linearGradient>
      </defs>
      {[
        { x: 80, y: 100, label: 'CRM' },
        { x: 80, y: 260, label: 'Mail' },
        { x: 240, y: 80, label: 'AI' },
        { x: 240, y: 280, label: 'API' },
        { x: 400, y: 100, label: 'Web' },
        { x: 400, y: 260, label: 'Pay' },
      ].map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="32" fill="rgba(201,169,110,0.08)" stroke="rgba(201,169,110,0.5)" strokeWidth="1" />
          <text x={n.x} y={n.y + 5} textAnchor="middle" fontFamily="serif" fontSize="13" fill="rgba(255,255,255,0.85)">{n.label}</text>
        </g>
      ))}
      <path d="M112 100 Q176 90 208 80" stroke="url(#autoLine)" strokeWidth="1.5" fill="none" />
      <path d="M112 260 Q176 270 208 280" stroke="url(#autoLine)" strokeWidth="1.5" fill="none" />
      <path d="M272 80 Q336 90 368 100" stroke="url(#autoLine)" strokeWidth="1.5" fill="none" />
      <path d="M272 280 Q336 270 368 260" stroke="url(#autoLine)" strokeWidth="1.5" fill="none" />
      <path d="M240 112 L240 248" stroke="url(#autoLine)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
      <path d="M80 132 L80 228" stroke="rgba(201,169,110,0.3)" strokeWidth="1" strokeDasharray="2 4" />
      <path d="M400 132 L400 228" stroke="rgba(201,169,110,0.3)" strokeWidth="1" strokeDasharray="2 4" />
      <circle cx="240" cy="180" r="6" fill="rgba(201,169,110,0.9)">
        <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

const offerings = [
  {
    eyebrow: '01 — Build',
    title: 'Websites that work.',
    body: 'Bespoke design and development. Built for speed, built to convert. No templates.',
    cta: { href: '/services/website-build', label: 'See web work' },
    Graphic: WebsiteGraphic,
    bg: 'bg-dark',
    text: 'text-text-light',
    muted: 'text-text-muted-light',
  },
  {
    eyebrow: '02 — Grow',
    title: 'More customers. More revenue.',
    body: 'Revenue Engineering. We bring the right buyers to your business and turn them into bookings.',
    cta: { href: '/revenue-engineering', label: 'See the engagement' },
    Graphic: RevenueGraphic,
    bg: 'bg-cream',
    text: 'text-text-dark',
    muted: 'text-text-muted-dark',
  },
  {
    eyebrow: '03 — Book',
    title: 'Get booked in seconds.',
    body: 'Zatrovo. Customers book and pay in a tap. Admins manage everything from one clean dashboard.',
    cta: { href: '/zatrovo', label: 'See Zatrovo' },
    Graphic: BookingGraphic,
    bg: 'bg-dark',
    text: 'text-text-light',
    muted: 'text-text-muted-light',
  },
  {
    eyebrow: '04 — Automate',
    title: 'Custom AI for your stack.',
    body: 'We plug into the tools you already use and automate the work nobody wants to do.',
    cta: { href: '/services/ai-automations', label: 'See automations' },
    Graphic: AutomationGraphic,
    bg: 'bg-cream',
    text: 'text-text-dark',
    muted: 'text-text-muted-dark',
  },
];

export default function WhatWeOffer() {
  return (
    <>
      {offerings.map((o, i) => {
        const reverse = i % 2 === 1;
        const Graphic = o.Graphic;
        return (
          <section
            key={o.eyebrow}
            className={`${o.bg} py-[var(--section-gap)] border-t border-[var(--border-dark)]`}
          >
            <div
              className="mx-auto px-[var(--gutter)]"
              style={{ maxWidth: 'var(--max-width)' }}
            >
              <SectionReveal
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}
              >
                <div>
                  <p className={`font-body text-[length:var(--type-caption)] uppercase tracking-[var(--type-label-ls)] text-gold/80 mb-6`}>
                    {o.eyebrow}
                  </p>
                  <h2 className={`font-display font-normal ${o.text} text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] mb-8`}>
                    {o.title}
                  </h2>
                  <p className={`font-body text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] ${o.muted} font-light max-w-[480px] mb-10`}>
                    {o.body}
                  </p>
                  <Link
                    href={o.cta.href}
                    className={i % 2 === 1 ? 'btn-primary' : 'btn-outline'}
                  >
                    <span>{o.cta.label} →</span>
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.18),transparent_70%)] blur-2xl" />
                  <div className="relative">
                    <Graphic />
                  </div>
                </div>
              </SectionReveal>
            </div>
          </section>
        );
      })}
    </>
  );
}
