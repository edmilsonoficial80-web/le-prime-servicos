import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils';
/** Bottom sheet modal — padrão nativo em aplicações móveis. */
export const Sheet = ({ open, onClose, title, children, footer, className }) => {
    useEffect(() => {
        if (!open)
            return;
        const onKey = (event) => {
            if (event.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);
    if (!open)
        return null;
    return (_jsxs("div", { className: "absolute inset-0 z-50 flex flex-col justify-end", children: [_jsx("button", { type: "button", "aria-label": "Fechar", onClick: onClose, className: "absolute inset-0 bg-ink-900/50 backdrop-blur-[2px] animate-fade-in" }), _jsxs("div", { role: "dialog", "aria-modal": "true", className: cn('relative z-10 max-h-[88%] overflow-hidden rounded-t-3xl bg-white shadow-card animate-slide-up', className), children: [_jsxs("div", { className: "flex items-center justify-between border-b border-ink-100 px-5 py-4", children: [_jsx("div", { className: "absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-ink-200" }), _jsx("h3", { className: "text-base font-bold", children: title }), _jsx("button", { type: "button", onClick: onClose, "aria-label": "Fechar", className: "rounded-full p-1.5 text-ink-500 hover:bg-ink-100", children: _jsx(X, { size: 18 }) })] }), _jsx("div", { className: "max-h-[64vh] overflow-y-auto px-5 py-4", children: children }), footer && _jsx("div", { className: "border-t border-ink-100 px-5 py-4 safe-bottom", children: footer })] })] }));
};
export const ConfirmDialog = ({ open, title, description, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar', destructive, onConfirm, onClose, }) => {
    if (!open)
        return null;
    return (_jsxs("div", { className: "absolute inset-0 z-50 flex items-center justify-center px-6", children: [_jsx("button", { type: "button", "aria-label": "Fechar", onClick: onClose, className: "absolute inset-0 bg-ink-900/50" }), _jsxs("div", { role: "alertdialog", "aria-modal": "true", className: "relative z-10 w-full rounded-3xl bg-white p-6 shadow-card animate-scale-in", children: [_jsx("h3", { className: "text-lg font-bold", children: title }), description && _jsx("p", { className: "mt-2 text-sm leading-relaxed text-ink-500", children: description }), _jsxs("div", { className: "mt-6 flex gap-3", children: [_jsx("button", { type: "button", onClick: onClose, className: "h-11 flex-1 rounded-2xl border border-ink-200 text-sm font-semibold text-ink-700", children: cancelLabel }), _jsx("button", { type: "button", onClick: () => {
                                    onConfirm();
                                    onClose();
                                }, className: cn('h-11 flex-1 rounded-2xl text-sm font-semibold', destructive ? 'bg-red-600 text-white' : 'bg-ink-900 text-white'), children: confirmLabel })] })] })] }));
};
