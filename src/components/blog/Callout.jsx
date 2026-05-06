import { cn } from '@/lib/utils';

const VARIANTS = {
  insight: {
    border: 'border-[var(--color-gold)]/40',
    bg: 'bg-[var(--color-gold)]/5',
    label: 'text-[var(--color-gold-muted)]',
    accent: 'bg-[var(--color-gold)]',
    fallback: 'Insight',
  },
  tip: {
    border: 'border-emerald-700/30',
    bg: 'bg-emerald-50/60',
    label: 'text-emerald-800',
    accent: 'bg-emerald-700',
    fallback: 'Tip',
  },
  warning: {
    border: 'border-amber-700/30',
    bg: 'bg-amber-50/70',
    label: 'text-amber-800',
    accent: 'bg-amber-600',
    fallback: 'Heads up',
  },
  danger: {
    border: 'border-red-700/30',
    bg: 'bg-red-50/70',
    label: 'text-red-800',
    accent: 'bg-red-700',
    fallback: 'Warning',
  },
};

export default function Callout({ variant = 'insight', title, children }) {
  const v = VARIANTS[variant] || VARIANTS.insight;
  const label = title || v.fallback;

  return (
    <aside
      className={cn(
        'my-10 relative rounded-sm border pl-6 pr-6 py-6 md:pl-8 md:py-7',
        v.border,
        v.bg
      )}
    >
      <span
        aria-hidden="true"
        className={cn('absolute left-0 top-0 bottom-0 w-[3px]', v.accent)}
      />
      <span
        className={cn(
          'block font-body text-[length:var(--type-label)] tracking-[var(--type-label-ls)] uppercase font-semibold mb-2',
          v.label
        )}
      >
        {label}
      </span>
      <div className="font-body text-[length:var(--type-body)] leading-[var(--type-body-lh)] text-[var(--color-text-dark)] [&_p]:mb-3 [&_p:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
