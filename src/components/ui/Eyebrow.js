import { cn } from '@/lib/utils';

export default function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={cn(
        'font-body text-[length:var(--type-label)] font-medium uppercase tracking-[var(--type-label-ls)] text-gold',
        className
      )}
    >
      {children}
    </span>
  );
}
