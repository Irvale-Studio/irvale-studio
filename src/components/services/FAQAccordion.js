'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionReveal from '@/components/ui/SectionReveal';
import { servicesFaqs } from '@/lib/data/services';
import { cn } from '@/lib/utils';

// Animated node constellation — subtle, premium
function NodeConstellation() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h;
    const nodes = [];
    const nodeCount = 18;
    const connectionDistance = 140;
    const goldRgb = { r: 201, g: 169, b: 110 }; // --color-gold

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
    }

    function initNodes() {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.015;

        // Bounce off edges
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.12;
            ctx.strokeStyle = `rgba(${goldRgb.r}, ${goldRgb.g}, ${goldRgb.b}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulseAlpha = 0.15 + Math.sin(node.pulse) * 0.1;
        const pulseRadius = node.radius + Math.sin(node.pulse) * 0.5;

        // Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${goldRgb.r}, ${goldRgb.g}, ${goldRgb.b}, ${pulseAlpha * 0.15})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${goldRgb.r}, ${goldRgb.g}, ${goldRgb.b}, ${pulseAlpha + 0.2})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    initNodes();
    draw();

    window.addEventListener('resize', () => {
      resize();
      initNodes();
    });

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

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
            <NodeConstellation />
            {/* Subtle text overlay */}
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
