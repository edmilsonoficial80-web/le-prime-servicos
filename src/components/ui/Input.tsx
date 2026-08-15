import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils';

const BASE =
  'w-full rounded-2xl border bg-white px-4 text-[15px] text-ink-900 placeholder:text-ink-400 transition-colors ' +
  'focus:border-brand-yellow focus:outline-none focus:ring-4 focus:ring-gold-100 disabled:bg-ink-50';

interface FieldWrapperProps {
  label?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export const Field = ({ label, error, hint, children }: FieldWrapperProps) => (
  <div className="w-full">
    {label && <label className="field-label">{label}</label>}
    {children}
    {error ? (
      <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
    ) : (
      hint && <p className="mt-1.5 text-xs text-ink-400">{hint}</p>
    )}
  </div>
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
  rightSlot?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, rightSlot, className, ...rest }, ref) => (
    <Field label={label} error={error} hint={hint}>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400">{icon}</span>
        )}
        <input
          ref={ref}
          className={cn(
            BASE,
            'h-[52px]',
            icon && 'pl-11',
            rightSlot && 'pr-11',
            error ? 'border-red-300' : 'border-ink-200',
            className,
          )}
          {...rest}
        />
        {rightSlot && <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</span>}
      </div>
    </Field>
  ),
);
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, rows = 4, ...rest }, ref) => (
    <Field label={label} error={error} hint={hint}>
      <textarea
        ref={ref}
        rows={rows}
        className={cn(BASE, 'resize-none py-3.5 leading-relaxed', error ? 'border-red-300' : 'border-ink-200', className)}
        {...rest}
      />
    </Field>
  ),
);
Textarea.displayName = 'Textarea';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, className, children, ...rest }, ref) => (
    <Field label={label} error={error} hint={hint}>
      <select
        ref={ref}
        className={cn(BASE, 'h-[52px] appearance-none pr-10', error ? 'border-red-300' : 'border-ink-200', className)}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%238A8A98' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
        }}
        {...rest}
      >
        {children}
      </select>
    </Field>
  ),
);
Select.displayName = 'Select';
