import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useCallback, useMemo, useState } from 'react';
import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react';
import { cn, uid } from '@/utils';
export const ToastContext = createContext(undefined);
const ICONS = {
    success: CheckCircle2,
    error: TriangleAlert,
    info: Info,
};
const STYLES = {
    success: 'bg-ink-900 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-brand-yellow text-ink-900',
};
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const dismiss = useCallback((id) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);
    const notify = useCallback((message, variant = 'info') => {
        const toast = { id: uid('toast'), message, variant };
        setToasts((current) => [...current, toast]);
        window.setTimeout(() => dismiss(toast.id), 3600);
    }, [dismiss]);
    const value = useMemo(() => ({ notify }), [notify]);
    return (_jsxs(ToastContext.Provider, { value: value, children: [children, _jsx("div", { className: "pointer-events-none fixed inset-x-0 top-3 z-[100] mx-auto flex w-full max-w-[440px] flex-col gap-2 px-4", children: toasts.map((toast) => {
                    const Icon = ICONS[toast.variant];
                    return (_jsxs("div", { role: "status", className: cn('pointer-events-auto flex items-start gap-2.5 rounded-2xl px-4 py-3 shadow-card animate-fade-in', STYLES[toast.variant]), children: [_jsx(Icon, { size: 18, className: "mt-0.5 shrink-0" }), _jsx("p", { className: "flex-1 text-sm font-medium leading-snug", children: toast.message }), _jsx("button", { type: "button", onClick: () => dismiss(toast.id), "aria-label": "Fechar aviso", children: _jsx(X, { size: 16, className: "opacity-70" }) })] }, toast.id));
                }) })] }));
};
