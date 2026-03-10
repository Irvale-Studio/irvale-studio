import { cn } from '@/lib/utils';

export default function Marquee({ items, separator = '·', className = '', speed = 30 }) {
  // Repeat items enough times for seamless loop on wide screens
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)}>
      <div
        className="marquee-track gap-0"
        style={{ '--marquee-speed': `${speed}s` }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-12 md:gap-16 shrink-0">
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold/30 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
