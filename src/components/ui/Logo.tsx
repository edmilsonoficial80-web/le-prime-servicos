import { cn } from '@/utils';

interface LogoProps {
  size?: number;
  withName?: boolean;
  variant?: 'dark' | 'light';
  className?: string;
}

/**
 * Espaço reservado para o logótipo da LE Prime Serviços.
 * Substitua o SVG interior (ou aponte para `/logo.svg`) pelo ficheiro oficial.
 */
export const Logo = ({ size = 72, withName = false, variant = 'dark', className }: LogoProps) => (
  <div className={cn('flex flex-col items-center gap-3', className)}>
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-[28%] shadow-card',
        variant === 'dark' ? 'bg-ink-900' : 'bg-white',
      )}
      style={{ width: size, height: size }}
      aria-label="Logótipo LE Prime Serviços"
    >
      <svg viewBox="0 0 120 120" width={size} height={size} role="presentation">
        <defs>
          <linearGradient id="logoGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFD666" />
            <stop offset="100%" stopColor="#FFC107" />
          </linearGradient>
        </defs>
        <path
          d="M60 22 88 36v26c0 17.5-11.6 29.7-28 36-16.4-6.3-28-18.5-28-36V36z"
          fill="none"
          stroke="url(#logoGold)"
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <text
          x="60"
          y="74"
          textAnchor="middle"
          fontFamily="Sora, Inter, sans-serif"
          fontSize="32"
          fontWeight="800"
          fill="url(#logoGold)"
        >
          LE
        </text>
      </svg>
    </div>

    {withName && (
      <div className="text-center">
        <h1
          className={cn(
            'font-display text-[26px] font-extrabold leading-none tracking-tight',
            variant === 'dark' ? 'text-white' : 'text-ink-900',
          )}
        >
          LE Prime <span className="text-brand-yellow">Serviços</span>
        </h1>
      </div>
    )}
  </div>
);
