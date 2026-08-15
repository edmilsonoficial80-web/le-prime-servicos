import type { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils';

export const Spinner = ({ className }: { className?: string }) => (
  <Loader2 className={cn('animate-spin text-ink-300', className)} size={22} />
);

export const FullScreenLoader = ({ label = 'A carregar…' }: { label?: string }) => (
  <div className="flex h-full flex-col items-center justify-center gap-3 bg-white">
    <Spinner className="text-brand-yellow" />
    <p className="text-sm text-ink-400">{label}</p>
  </div>
);

export const ListSkeleton = ({ count = 3, height = 96 }: { count?: number; height?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="skeleton rounded-2xl" style={{ height }} />
    ))}
  </div>
);

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({ icon, title, description, action, className }: EmptyStateProps) => (
  <div className={cn('flex flex-col items-center justify-center px-6 py-12 text-center', className)}>
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-100 text-ink-400">{icon}</div>
    <h3 className="text-base font-bold text-ink-900">{title}</h3>
    {description && <p className="mt-1.5 max-w-[280px] text-sm leading-relaxed text-ink-400">{description}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);
