import type { ReactNode } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/utils';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export const Badge = ({ children, className, icon }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide',
      'bg-ink-100 text-ink-600',
      className,
    )}
  >
    {icon}
    {children}
  </span>
);

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}

/** Classificação em estrelas (apenas leitura). */
export const Rating = ({ value, count, size = 14, className }: RatingProps) => (
  <span className={cn('inline-flex items-center gap-1 text-ink-700', className)}>
    <Star size={size} className="fill-brand-yellow text-brand-yellow" />
    <span className="text-[13px] font-bold">{value ? value.toFixed(1) : 'Novo'}</span>
    {typeof count === 'number' && count > 0 && <span className="text-[12px] text-ink-400">({count})</span>}
  </span>
);

interface StarPickerProps {
  value: number;
  onChange: (value: number) => void;
  size?: number;
}

/** Seletor interativo de 1 a 5 estrelas. */
export const StarPicker = ({ value, onChange, size = 38 }: StarPickerProps) => (
  <div className="flex items-center justify-center gap-2" role="radiogroup" aria-label="Classificação">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        role="radio"
        aria-checked={value === star}
        aria-label={`${star} estrela${star > 1 ? 's' : ''}`}
        onClick={() => onChange(star)}
        className="transition-transform active:scale-90"
      >
        <Star
          size={size}
          className={cn(
            'transition-colors',
            star <= value ? 'fill-brand-yellow text-brand-yellow' : 'fill-ink-100 text-ink-200',
          )}
        />
      </button>
    ))}
  </div>
);
