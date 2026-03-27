'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import RevealText from '@/components/ui/RevealText';

gsap.registerPlugin(ScrollTrigger);

// Homepage constellation — unique from services version
// More nodes, varying sizes, occasional color shifts, organic movement
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
    const nodeCount = 55;
    const connectionDistance = 160;

    // Color palette — gold base with subtle shifts
    const colors = [
      { r: 201, g: 169, b: 110 }, // gold
      { r: 201, g: 169, b: 110 }, // gold (weighted)
      { r: 201, g: 169, b: 110 }, // gold (weighted)
      { r: 180, g: 160, b: 130 }, // warm muted gold
      { r: 140, g: 165, b: 190 }, // steel blue
      { r: 160, g: 140, b: 110 }, // amber muted
      { r: 130, g: 170, b: 170 }, // teal hint
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

    function initNodes() {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        // Vary sizes more — some prominent, most small
        const sizeTier = Math.random();
        const radius = sizeTier > 0.92 ? (Math.random() * 2.5 + 2)    // 8% large
                      : sizeTier > 0.7  ? (Math.random() * 1.5 + 1)   // 22% medium
                      : (Math.random() * 0.8 + 0.3);                   // 70% small

        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          // Organic drift — each node has its own wander pattern
          baseVx: (Math.random() - 0.5) * 0.2,
          baseVy: (Math.random() - 0.5) * 0.2,
          wanderAngle: Math.random() * Math.PI * 2,
          wanderSpeed: Math.random() * 0.003 + 0.001,
          wanderRadius: Math.random() * 0.15 + 0.05,
          radius,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.008 + 0.006,
          color,
          // Some nodes shimmer between colors
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

      // Update positions — organic wander
      for (const node of nodes) {
        node.wanderAngle += node.wanderSpeed;
        node.pulse += node.pulseSpeed;
        node.shimmerPhase += 0.008;

        const wx = Math.cos(node.wanderAngle) * node.wanderRadius;
        const wy = Math.sin(node.wanderAngle * 0.7) * node.wanderRadius;

        node.x += node.baseVx + wx;
        node.y += node.baseVy + wy;

        // Mouse repulsion — subtle push
        const mdx = node.x - mx;
        const mdy = node.y - my;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 150 && mDist > 0) {
          const force = (1 - mDist / 150) * 0.8;
          node.x += (mdx / mDist) * force;
          node.y += (mdy / mDist) * force;
        }

        // Wrap around edges (softer than bouncing)
        if (node.x < -20) node.x = w + 20;
        if (node.x > w + 20) node.x = -20;
        if (node.y < -20) node.y = h + 20;
        if (node.y > h + 20) node.y = -20;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const t = 1 - dist / connectionDistance;
            const alpha = t * 0.1;
            // Blend the two node colors for the line
            const c = lerpColor(nodes[i].color, nodes[j].color, 0.5);
            ctx.strokeStyle = `rgba(${c.r|0}, ${c.g|0}, ${c.b|0}, ${alpha})`;
            ctx.lineWidth = t * 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        let c = node.color;

        // Shimmer effect — slowly shift hue
        if (node.shimmer) {
          const altColor = colors[(colors.indexOf(node.color) + 3) % colors.length];
          const t = (Math.sin(node.shimmerPhase) + 1) * 0.5;
          c = lerpColor(node.color, altColor, t * 0.5);
        }

        const pulseAlpha = 0.2 + Math.sin(node.pulse) * 0.12;
        const pulseRadius = node.radius + Math.sin(node.pulse) * (node.radius * 0.3);
        const glowSize = node.radius > 1 ? pulseRadius * 6 : pulseRadius * 3;
        const cr = c.r|0, cg = c.g|0, cb = c.b|0;

        // Smooth radial gradient glow — no banding
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
        grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${pulseAlpha + 0.3})`);
        grad.addColorStop(0.15, `rgba(${cr}, ${cg}, ${cb}, ${pulseAlpha * 0.5})`);
        grad.addColorStop(0.4, `rgba(${cr}, ${cg}, ${cb}, ${pulseAlpha * 0.12})`);
        grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = grad;
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

    // Content entrance
    gsap.from(contentRef.current.children, {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      delay: 0.3,
    });

    // Overlay darkens on scroll
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
      className="relative h-screen flex items-center justify-center overflow-hidden bg-dark noise-overlay"
    >
      {/* Deep gradient background — extra stops to prevent banding */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse at 20% 30%, rgba(15,31,61,0.6) 0%, rgba(15,31,61,0.3) 25%, rgba(15,31,61,0.1) 40%, transparent 60%)' }} />
      <div className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(ellipse at 80% 70%, rgba(20,18,15,0.8) 0%, rgba(20,18,15,0.4) 25%, rgba(20,18,15,0.1) 45%, transparent 65%)' }} />

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

      {/* Vignette — keeps text area readable, smooth multi-stop */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(17,17,17,0.05) 20%, rgba(17,17,17,0.15) 35%, rgba(17,17,17,0.35) 55%, rgba(17,17,17,0.7) 80%, rgba(17,17,17,0.85) 100%)' }} />
      <div className="absolute inset-x-0 top-0 h-1/4" style={{ background: 'linear-gradient(to bottom, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.2) 50%, transparent 100%)' }} />
      <div className="absolute inset-x-0 bottom-0 h-1/4" style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.6) 0%, rgba(17,17,17,0.2) 50%, transparent 100%)' }} />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-[var(--gutter)] w-full"
        style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}
      >
        {/* Brand wordmark */}
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
          Premium software solutions.
        </RevealText>

        <p
          className="mt-6 font-display text-[length:var(--type-body-lg)] leading-[var(--type-body-lg-lh)] text-text-light/80 font-light max-w-xl mx-auto"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
        >
          Bespoke websites, custom booking systems, member experiences, and AI automations. Specialised for hospitality, wellness, and membership brands.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
          <Link href="/contact" className="btn-primary w-full sm:w-auto text-center">
            <span>Start a Project →</span>
          </Link>
          <Link href="/work" className="btn-outline border-white/30 text-text-light hover:text-dark w-full sm:w-auto text-center">
            <span>See Client Results</span>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2">
          <span className="font-body text-[length:var(--type-caption)] text-text-light/50 uppercase tracking-[var(--type-label-ls)]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
