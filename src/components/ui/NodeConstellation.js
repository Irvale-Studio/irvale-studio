'use client';

import { useRef, useEffect } from 'react';

export default function NodeConstellation({
  nodeCount = 18,
  connectionDistance = 140,
  speed = 0.3,
  glowMultiplier = 1,
  className = '',
}) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h;
    const nodes = [];
    const goldRgb = { r: 201, g: 169, b: 110 };

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initNodes() {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: Math.random() * 1.5 + 0.5,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.012;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15 * glowMultiplier;
            ctx.strokeStyle = `rgba(${goldRgb.r}, ${goldRgb.g}, ${goldRgb.b}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes — smooth radial gradient glow
      for (const node of nodes) {
        const pulseAlpha = (0.15 + Math.sin(node.pulse) * 0.1) * glowMultiplier;
        const pulseRadius = node.radius + Math.sin(node.pulse) * 0.5;
        const glowSize = pulseRadius * 4;
        const r = goldRgb.r, g = goldRgb.g, b = goldRgb.b;

        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${pulseAlpha + 0.25})`);
        grad.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, ${pulseAlpha * 0.4})`);
        grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${pulseAlpha * 0.1})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

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
    window.addEventListener('resize', onResize);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [nodeCount, connectionDistance, speed, glowMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
