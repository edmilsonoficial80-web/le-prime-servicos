import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/utils';
/** Cabeçalho de página com botão de retrocesso opcional. */
export const TopBar = ({ title, subtitle, back = false, onBack, right, variant = 'light', border = true, className, }) => {
    const navigate = useNavigate();
    return (_jsxs("header", { className: cn('z-20 flex items-center gap-3 px-4 py-3 safe-top', variant === 'dark' ? 'bg-ink-900 text-white' : 'bg-white text-ink-900', border && variant === 'light' && 'border-b border-ink-100', className), children: [back && (_jsx("button", { type: "button", onClick: () => (onBack ? onBack() : navigate(-1)), "aria-label": "Voltar", className: cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors', variant === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-ink-100 hover:bg-ink-200'), children: _jsx(ChevronLeft, { size: 19 }) })), _jsxs("div", { className: "min-w-0 flex-1", children: [title && _jsx("h1", { className: "truncate text-[17px] font-bold leading-tight", children: title }), subtitle && (_jsx("p", { className: cn('truncate text-xs', variant === 'dark' ? 'text-white/60' : 'text-ink-400'), children: subtitle }))] }), right && _jsx("div", { className: "flex shrink-0 items-center gap-1", children: right })] }));
};
