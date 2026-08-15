import { useState } from 'react';
import { cn, initials } from '@/utils';

interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
  className?: string;
  ring?: boolean;
}

/** Avatar com fallback automático para as iniciais do utilizador. */
export const Avatar = ({ name, src, size = 44, className, ring = false }: AvatarProps) => {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink-900 text-brand-yellow',
        ring && 'ring-2 ring-brand-yellow ring-offset-2 ring-offset-white',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-display font-bold" style={{ fontSize: size * 0.36 }}>
          {initials(name) || '?'}
        </span>
      )}
    </span>
  );
};
