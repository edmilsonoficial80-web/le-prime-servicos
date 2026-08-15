import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/utils';

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

/** <img> com estado de carregamento e fallback elegante em caso de erro. */
export const SafeImage = ({ src, alt, className, fallbackClassName }: SafeImageProps) => {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-ink-100 to-ink-200 text-ink-400',
          className,
          fallbackClassName,
        )}
        aria-label={alt}
      >
        <ImageOff size={20} />
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {!loaded && <div className="skeleton absolute inset-0" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={cn('h-full w-full object-cover transition-opacity duration-300', loaded ? 'opacity-100' : 'opacity-0')}
      />
    </div>
  );
};
