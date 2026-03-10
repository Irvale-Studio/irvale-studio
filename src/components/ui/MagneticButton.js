'use client';

import { cn } from '@/lib/utils';

export default function MagneticButton({ children, className = '' }) {
  return (
    <div className={cn('group/btn inline-block', className)}>
      {children}
    </div>
  );
}
