import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils';
const VARIANTS = {
    primary: 'bg-brand-yellow text-ink-900 hover:bg-gold-400 active:bg-gold-600 shadow-glow',
    dark: 'bg-ink-900 text-white hover:bg-ink-800 active:bg-black',
    outline: 'border border-ink-200 bg-white text-ink-900 hover:bg-ink-50 active:bg-ink-100',
    ghost: 'text-ink-700 hover:bg-ink-100 active:bg-ink-200',
    danger: 'bg-red-600 text-white hover:bg-red-700',
};
const SIZES = {
    sm: 'h-9 px-3.5 text-[13px] rounded-xl gap-1.5',
    md: 'h-11 px-4 text-sm rounded-2xl gap-2',
    lg: 'h-[54px] px-5 text-[15px] rounded-2xl gap-2',
};
export const Button = ({ variant = 'primary', size = 'md', loading = false, fullWidth = false, leftIcon, rightIcon, className, children, disabled, ...rest }) => (_jsxs("button", { className: cn('inline-flex select-none items-center justify-center font-semibold transition-all duration-150 active:scale-[0.985]', 'disabled:pointer-events-none disabled:opacity-50', VARIANTS[variant], SIZES[size], fullWidth && 'w-full', className), disabled: disabled || loading, ...rest, children: [loading ? _jsx(Loader2, { size: 17, className: "animate-spin" }) : leftIcon, children, !loading && rightIcon] }));
