import { Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFilter?: () => void;
  className?: string;
  autoFocus?: boolean;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'De que serviço precisa?',
  onFilter,
  className,
  autoFocus,
}: SearchBarProps) => (
  <div className={cn('flex items-center gap-2', className)}>
    <div className="relative flex-1">
      <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Pesquisar"
        className="h-[50px] w-full rounded-2xl border border-ink-200 bg-white pl-11 pr-4 text-[15px] placeholder:text-ink-400 focus:border-brand-yellow focus:outline-none focus:ring-4 focus:ring-gold-100"
      />
    </div>
    {onFilter && (
      <button
        type="button"
        onClick={onFilter}
        aria-label="Filtros"
        className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-2xl bg-ink-900 text-brand-yellow transition-transform active:scale-95"
      >
        <SlidersHorizontal size={18} />
      </button>
    )}
  </div>
);
