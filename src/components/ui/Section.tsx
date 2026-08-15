import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
  className?: string;
}

export const SectionHeader = ({ title, actionLabel, actionTo, onAction, className }: SectionHeaderProps) => (
  <div className={cn('mb-3 flex items-center justify-between', className)}>
    <h2 className="text-[17px] font-bold">{title}</h2>
    {actionLabel && actionTo && (
      <Link to={actionTo} className="flex items-center gap-0.5 text-[13px] font-semibold text-ink-500">
        {actionLabel}
        <ChevronRight size={15} />
      </Link>
    )}
    {actionLabel && onAction && (
      <button type="button" onClick={onAction} className="flex items-center gap-0.5 text-[13px] font-semibold text-ink-500">
        {actionLabel}
        <ChevronRight size={15} />
      </button>
    )}
  </div>
);

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  tone?: 'default' | 'dark' | 'yellow';
  className?: string;
}

export const StatCard = ({ label, value, icon, tone = 'default', className }: StatCardProps) => (
  <div
    className={cn(
      'rounded-2xl border p-3.5',
      tone === 'dark' && 'border-ink-900 bg-ink-900 text-white',
      tone === 'yellow' && 'border-brand-yellow bg-brand-yellow text-ink-900',
      tone === 'default' && 'border-ink-100 bg-white',
      className,
    )}
  >
    <div className="flex items-center justify-between">
      <span
        className={cn(
          'text-[11px] font-semibold uppercase tracking-wide',
          tone === 'dark' ? 'text-white/50' : tone === 'yellow' ? 'text-ink-900/60' : 'text-ink-400',
        )}
      >
        {label}
      </span>
      {icon && (
        <span className={cn(tone === 'dark' ? 'text-brand-yellow' : tone === 'yellow' ? 'text-ink-900' : 'text-ink-300')}>
          {icon}
        </span>
      )}
    </div>
    <p className="mt-1.5 font-display text-[22px] font-extrabold leading-none">{value}</p>
  </div>
);
