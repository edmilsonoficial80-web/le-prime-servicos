import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { cn } from '@/utils';
const BASE = 'w-full rounded-2xl border bg-white px-4 text-[15px] text-ink-900 placeholder:text-ink-400 transition-colors ' +
    'focus:border-brand-yellow focus:outline-none focus:ring-4 focus:ring-gold-100 disabled:bg-ink-50';
export const Field = ({ label, error, hint, children }) => (_jsxs("div", { className: "w-full", children: [label && _jsx("label", { className: "field-label", children: label }), children, error ? (_jsx("p", { className: "mt-1.5 text-xs font-medium text-red-600", children: error })) : (hint && _jsx("p", { className: "mt-1.5 text-xs text-ink-400", children: hint }))] }));
export const Input = forwardRef(({ label, error, hint, icon, rightSlot, className, ...rest }, ref) => (_jsx(Field, { label: label, error: error, hint: hint, children: _jsxs("div", { className: "relative", children: [icon && (_jsx("span", { className: "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400", children: icon })), _jsx("input", { ref: ref, className: cn(BASE, 'h-[52px]', icon && 'pl-11', rightSlot && 'pr-11', error ? 'border-red-300' : 'border-ink-200', className), ...rest }), rightSlot && _jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2", children: rightSlot })] }) })));
Input.displayName = 'Input';
export const Textarea = forwardRef(({ label, error, hint, className, rows = 4, ...rest }, ref) => (_jsx(Field, { label: label, error: error, hint: hint, children: _jsx("textarea", { ref: ref, rows: rows, className: cn(BASE, 'resize-none py-3.5 leading-relaxed', error ? 'border-red-300' : 'border-ink-200', className), ...rest }) })));
Textarea.displayName = 'Textarea';
export const Select = forwardRef(({ label, error, hint, className, children, ...rest }, ref) => (_jsx(Field, { label: label, error: error, hint: hint, children: _jsx("select", { ref: ref, className: cn(BASE, 'h-[52px] appearance-none pr-10', error ? 'border-red-300' : 'border-ink-200', className), style: {
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%238A8A98' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 14px center',
        }, ...rest, children: children }) })));
Select.displayName = 'Select';
