import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils';
export const Spinner = ({ className }) => (_jsx(Loader2, { className: cn('animate-spin text-ink-300', className), size: 22 }));
export const FullScreenLoader = ({ label = 'A carregar…' }) => (_jsxs("div", { className: "flex h-full flex-col items-center justify-center gap-3 bg-white", children: [_jsx(Spinner, { className: "text-brand-yellow" }), _jsx("p", { className: "text-sm text-ink-400", children: label })] }));
export const ListSkeleton = ({ count = 3, height = 96 }) => (_jsx("div", { className: "space-y-3", children: Array.from({ length: count }).map((_, index) => (_jsx("div", { className: "skeleton rounded-2xl", style: { height } }, index))) }));
export const EmptyState = ({ icon, title, description, action, className }) => (_jsxs("div", { className: cn('flex flex-col items-center justify-center px-6 py-12 text-center', className), children: [_jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-100 text-ink-400", children: icon }), _jsx("h3", { className: "text-base font-bold text-ink-900", children: title }), description && _jsx("p", { className: "mt-1.5 max-w-[280px] text-sm leading-relaxed text-ink-400", children: description }), action && _jsx("div", { className: "mt-5", children: action })] }));
