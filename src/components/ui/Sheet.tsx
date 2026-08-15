import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/** Bottom sheet modal — padrão nativo em aplicações móveis. */
export const Sheet = ({ open, onClose, title, children, footer, className }: SheetProps) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-ink-900/50 backdrop-blur-[2px] animate-fade-in"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative z-10 max-h-[88%] overflow-hidden rounded-t-3xl bg-white shadow-card animate-slide-up',
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <div className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-ink-200" />
          <h3 className="text-base font-bold">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-full p-1.5 text-ink-500 hover:bg-ink-100"
          >
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[64vh] overflow-y-auto px-5 py-4">{children}</div>
        {footer && <div className="border-t border-ink-100 px-5 py-4 safe-bottom">{footer}</div>}
      </div>
    </div>
  );
};

interface ConfirmProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  destructive,
  onConfirm,
  onClose,
}: ConfirmProps) => {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center px-6">
      <button type="button" aria-label="Fechar" onClick={onClose} className="absolute inset-0 bg-ink-900/50" />
      <div role="alertdialog" aria-modal="true" className="relative z-10 w-full rounded-3xl bg-white p-6 shadow-card animate-scale-in">
        <h3 className="text-lg font-bold">{title}</h3>
        {description && <p className="mt-2 text-sm leading-relaxed text-ink-500">{description}</p>}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-2xl border border-ink-200 text-sm font-semibold text-ink-700"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={cn(
              'h-11 flex-1 rounded-2xl text-sm font-semibold',
              destructive ? 'bg-red-600 text-white' : 'bg-ink-900 text-white',
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
