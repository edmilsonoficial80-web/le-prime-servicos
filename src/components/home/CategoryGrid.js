import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { CATEGORIES } from '@/constants/categories';
import { cn } from '@/utils';
/** Grelha (ou carrossel) de categorias de serviços. */
export const CategoryGrid = ({ limit, activeId, onSelect, layout = 'grid' }) => {
    const items = typeof limit === 'number' ? CATEGORIES.slice(0, limit) : CATEGORIES;
    if (layout === 'scroll') {
        return (_jsx("div", { className: "no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4", children: CATEGORIES.map((category) => {
                const active = activeId === category.id;
                return (_jsxs("button", { type: "button", onClick: () => onSelect?.(active ? '' : category.id), className: cn('flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors', active
                        ? 'border-ink-900 bg-ink-900 text-brand-yellow'
                        : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300'), children: [_jsx(CategoryIcon, { categoryId: category.id, size: 15 }), category.name] }, category.id));
            }) }));
    }
    return (_jsx("div", { className: "grid grid-cols-4 gap-2.5", children: items.map((category) => {
            const content = (_jsxs(_Fragment, { children: [_jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-active:scale-90", style: { backgroundColor: `${category.color}1f`, color: category.color }, children: _jsx(CategoryIcon, { categoryId: category.id, size: 21 }) }), _jsx("span", { className: "line-clamp-2 text-center text-[10.5px] font-semibold leading-tight text-ink-600", children: category.name })] }));
            return onSelect ? (_jsx("button", { type: "button", onClick: () => onSelect(category.id), className: "group flex flex-col items-center gap-1.5", children: content }, category.id)) : (_jsx(Link, { to: `/procurar?categoria=${category.id}`, className: "group flex flex-col items-center gap-1.5", children: content }, category.id));
        }) }));
};
