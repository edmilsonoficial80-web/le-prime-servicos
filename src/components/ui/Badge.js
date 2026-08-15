import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Star } from 'lucide-react';
import { cn } from '@/utils';
export const Badge = ({ children, className, icon }) => (_jsxs("span", { className: cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide', 'bg-ink-100 text-ink-600', className), children: [icon, children] }));
/** Classificação em estrelas (apenas leitura). */
export const Rating = ({ value, count, size = 14, className }) => (_jsxs("span", { className: cn('inline-flex items-center gap-1 text-ink-700', className), children: [_jsx(Star, { size: size, className: "fill-brand-yellow text-brand-yellow" }), _jsx("span", { className: "text-[13px] font-bold", children: value ? value.toFixed(1) : 'Novo' }), typeof count === 'number' && count > 0 && _jsxs("span", { className: "text-[12px] text-ink-400", children: ["(", count, ")"] })] }));
/** Seletor interativo de 1 a 5 estrelas. */
export const StarPicker = ({ value, onChange, size = 38 }) => (_jsx("div", { className: "flex items-center justify-center gap-2", role: "radiogroup", "aria-label": "Classifica\u00E7\u00E3o", children: [1, 2, 3, 4, 5].map((star) => (_jsx("button", { type: "button", role: "radio", "aria-checked": value === star, "aria-label": `${star} estrela${star > 1 ? 's' : ''}`, onClick: () => onChange(star), className: "transition-transform active:scale-90", children: _jsx(Star, { size: size, className: cn('transition-colors', star <= value ? 'fill-brand-yellow text-brand-yellow' : 'fill-ink-100 text-ink-200') }) }, star))) }));
