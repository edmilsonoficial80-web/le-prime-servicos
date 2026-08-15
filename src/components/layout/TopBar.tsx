import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/utils';

interface TopBarProps {
  title?: string;
  subtitle?: string;
  back?: boolean;
  onBack?: () => void;
  right?: ReactNode;
  variant?: 'light' | 'dark';
  border?: boolean;
  className?: string;
}

/** Cabeçalho de página com botão de retrocesso opcional. */
export const TopBar = ({
  title,
  subtitle,
  back = false,
  onBack,
  right,
  variant = 'light',
  border = true,
  className,
}: TopBarProps) => {
  const navigate = useNavigate();

  return (
    <header
      className={cn(
        'z-20 flex items-center gap-3 px-4 py-3 safe-top',
        variant === 'dark' ? 'bg-ink-900 text-white' : 'bg-white text-ink-900',
        border && variant === 'light' && 'border-b border-ink-100',
        className,
      )}
    >
      {back && (
        <button
          type="button"
          onClick={() => (onBack ? onBack() : navigate(-1))}
          aria-label="Voltar"
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors',
            variant === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-ink-100 hover:bg-ink-200',
          )}
        >
          <ChevronLeft size={19} />
        </button>
      )}

      <div className="min-w-0 flex-1">
        {title && <h1 className="truncate text-[17px] font-bold leading-tight">{title}</h1>}
        {subtitle && (
          <p className={cn('truncate text-xs', variant === 'dark' ? 'text-white/60' : 'text-ink-400')}>{subtitle}</p>
        )}
      </div>

      {right && <div className="flex shrink-0 items-center gap-1">{right}</div>}
    </header>
  );
};
