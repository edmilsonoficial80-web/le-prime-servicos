import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';
import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react';
import { cn, uid } from '@/utils';

export type ToastVariant = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  notify: (message: string, variant?: ToastVariant) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const ICONS = {
  success: CheckCircle2,
  error: TriangleAlert,
  info: Info,
};

const STYLES: Record<ToastVariant, string> = {
  success: 'bg-ink-900 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-brand-yellow text-ink-900',
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, variant: ToastVariant = 'info') => {
      const toast: Toast = { id: uid('toast'), message, variant };
      setToasts((current) => [...current, toast]);
      window.setTimeout(() => dismiss(toast.id), 3600);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-3 z-[100] mx-auto flex w-full max-w-[440px] flex-col gap-2 px-4">
        {toasts.map((toast) => {
          const Icon = ICONS[toast.variant];
          return (
            <div
              key={toast.id}
              role="status"
              className={cn(
                'pointer-events-auto flex items-start gap-2.5 rounded-2xl px-4 py-3 shadow-card animate-fade-in',
                STYLES[toast.variant],
              )}
            >
              <Icon size={18} className="mt-0.5 shrink-0" />
              <p className="flex-1 text-sm font-medium leading-snug">{toast.message}</p>
              <button type="button" onClick={() => dismiss(toast.id)} aria-label="Fechar aviso">
                <X size={16} className="opacity-70" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
