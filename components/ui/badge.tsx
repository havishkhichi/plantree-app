import { cn } from '@/lib/utils';
import { GDICategory } from '@/lib/types';

const categoryStyles: Record<GDICategory, string> = {
  low:      'bg-green-500/20  text-green-400  border-green-500/30',
  moderate: 'bg-lime-500/20   text-lime-400   border-lime-500/30',
  high:     'bg-amber-500/20  text-amber-400  border-amber-500/30',
  severe:   'bg-orange-500/20 text-orange-400 border-orange-500/30',
  critical: 'bg-red-500/20    text-red-400    border-red-500/30',
};

interface BadgeProps {
  category: GDICategory;
  label?: string;
  className?: string;
}

export function GDIBadge({ category, label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border capitalize',
        categoryStyles[category],
        className,
      )}
    >
      {label ?? category}
    </span>
  );
}
