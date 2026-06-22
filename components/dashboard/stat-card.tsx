import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: LucideIcon;
  color?: string;
  trend?: number; // positive = up, negative = down
}

export function StatCard({ label, value, sub, icon: Icon, color = 'text-green-500', trend }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{label}</span>
        <span className={cn('p-1.5 rounded-lg bg-slate-50 border border-slate-100', color)}>
          <Icon className="w-3.5 h-3.5" />
        </span>
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        {sub && <p className="text-xs text-slate-500 mt-0.5 font-medium">{sub}</p>}
      </div>
      {trend !== undefined && (
        <p className={cn('text-xs font-medium', trend >= 0 ? 'text-red-400' : 'text-green-400')}>
          {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}% vs last month
        </p>
      )}
    </div>
  );
}
