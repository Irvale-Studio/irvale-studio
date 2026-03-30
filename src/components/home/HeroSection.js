'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import RevealText from '@/components/ui/RevealText';

gsap.registerPlugin(ScrollTrigger);

function HeroConstellation() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h;
    const nodes = [];
    const nodeCount = 60;
    const connectionDistance = 160;

    const colors = [
      { r: 201, g: 169, b: 110 },
      { r: 201, g: 169, b: 110 },
      { r: 201, g: 169, b: 110 },
      { r: 180, g: 160, b: 130 },
      { r: 140, g: 165, b: 190 },
      { r: 160, g: 140, b: 110 },
      { r: 130, g: 170, b: 170 },
    ];

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Center exclusion zone — no nodes spawn or drift here
    function isInExclusionZone(x, y) {
      const zoneW = w * 0.45;
      const zoneH = h * 0.35;
      const cx = w / 2;
      const cy = h / 2 - h * 0.02;
      return Math.abs(x - cx) < zoneW / 2 && Math.abs(y - cy) < zoneH / 2;
    }

    function initNodes() {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const sizeTier = Math.random();
        const radius = sizeTier > 0.92 ? 2.5
                      : sizeTier > 0.7  ? 1.5
                      : 0.8;

        // Keep generating positions until outside the exclusion zone
        let x, y;
        do {
          x = Math.random() * w;
          y = Math.random() * h;
        } while (isInExclusionZone(x, y));

        nodes.push({
          x,
          y,
          baseVx: (Math.random() - 0.5) * 0.2,
          baseVy: (Math.random() - 0.5) * 0.2,
          wanderAngle: Math.random() * Math.PI * 2,
          wanderSpeed: Math.random() * 0.003 + 0.001,
          wanderRadius: Math.random() * 0.15 + 0.05,
          radius,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.008 + 0.006,
          color,
          shimmer: Math.random() > 0.7,
          shimmerPhase: Math.random() * Math.PI * 2,
        });
      }
    }

    function lerpColor(c1, c2, t) {
      return {
        r: c1.r + (c2.r - c1.r) * t,
        g: c1.g + (c2.g - c1.g) * t,
        b: c1.b + (c2.b - c1.b) * t,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const node of nodes) {
        node.wanderAngle += node.wanderSpeed;
        node.pulse += node.pulseSpeed;
        node.shimmerPhase += 0.008;

        node.x += node.baseVx + Math.cos(node.wanderAngle) * node.wanderRadius;
        node.y += node.baseVy + Math.sin(node.wanderAngle * 0.7) * node.wanderRadius;

        // Mouse repulsion
        const mdx = node.x - mx;
        const mdy = node.y - my;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 150 && mDist > 0) {
          const force = (1 - mDist / 150) * 0.8;
          node.x += (mdx / mDist) * force;
          node.y += (mdy / mDist) * force;
        }

        // Push nodes away from exclusion zone
        if (isInExclusionZone(node.x, node.y)) {
          const cx = w / 2;
          const cy = h / 2 - h * 0.02;
          const dx = node.x - cx;
          const dy = node.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          node.x += (dx / dist) * 2;
          node.y += (dy / dist) * 2;
        }

        // Wrap edges
        if (node.x < -20) node.x = w + 20;
        if (node.x > w + 20) node.x = -20;
        if (node.y < -20) node.y = h + 20;
        if (node.y > h + 20) node.y = -20;
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const t = 1 - dist / connectionDistance;
            const c = lerpColor(nodes[i].color, nodes[j].color, 0.5);
            ctx.strokeStyle = `rgba(${c.r|0}, ${c.g|0}, ${c.b|0}, ${t * 0.12})`;
            ctx.lineWidth = t * 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes — sharp dots, no big glows
      for (const node of nodes) {
        let c = node.color;
        if (node.shimmer) {
          const alt = colors[(colors.indexOf(node.color) + 3) % colors.length];
          c = lerpColor(node.color, alt, (Math.sin(node.shimmerPhase) + 1) * 0.25);
        }

        const alpha = 0.3 + Math.sin(node.pulse) * 0.15;
        const r = node.radius + Math.sin(node.pulse) * 0.3;
        const cr = c.r|0, cg = c.g|0, cb = c.b|0;

        // Small tight glow — just 2x radius, not 6x
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha * 0.08})`;
        ctx.fill();

        // Core dot — solid, bright
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha + 0.35})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    initNodes();
    draw();

    const onResize = () => { resize(); initNodes(); };
    const onMouse = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };

    window.addEventListener('resize', onResize);
    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      aria-hidden="true"
    />
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from(contentRef.current.children, {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      delay: 0.3,
    });

    gsap.to(overlayRef.current, {
      opacity: 1,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '60% top',
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-dark"
    >
      {/* Constellation */}
      <div className="absolute inset-0">
        <HeroConstellation />
      </div>

      {/* Scroll-darken overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-dark"
        style={{ opacity: 0 }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-[var(--gutter)] w-full"
        style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}
      >
        <p
          className="font-display text-gold tracking-[0.35em] text-[length:var(--type-body-sm)] uppercase mb-8"
          style={{ textShadow: '0 2px 20px rgba(201,169,110,0.3)' }}
        >
          Irvale Studio
        </p>

        <RevealText
          as="h1"
          className="font-display font-normal text-white text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] max-w-[700px] mx-auto justify-center"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)' }}
        >
          Software Solutions.
        </RevealText>

        <p
          className="mt-6 font-display text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-light/80 font-light max-w-xl mx-auto"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
        >
          We build, automate, and manage your digital operations. Saving you time and increasing your revenue.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
          <Link href="/contact" className="btn-primary w-full sm:w-auto text-center">
            <span>Start a Project →</span>
          </Link>
          <Link href="/work" className="btn-outline border-white/30 text-text-light hover:text-dark w-full sm:w-auto text-center">
            <span>See Client Results</span>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {['Bespoke Websites', 'Booking Systems', 'AI Automations', 'E-commerce', 'Managed Hosting', 'Email Marketing'].map((service) => (
            <span
              key={service}
              className="font-body text-xs text-text-light/50 border border-gold/15 bg-gold/5 px-3 py-1.5 rounded-full"
            >
              {service}
            </span>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-2">
          <span className="font-body text-[length:var(--type-caption)] text-text-light/50 uppercase tracking-[var(--type-label-ls)]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
