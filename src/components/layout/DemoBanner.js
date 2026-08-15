import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Info, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
/** Aviso discreto quando a aplicação corre sem credenciais do Firebase. */
export const DemoBanner = () => {
    const { isDemoMode } = useAuth();
    const [dismissed, setDismissed] = useState(false);
    if (!isDemoMode || dismissed)
        return null;
    return (_jsxs("div", { className: "flex items-center gap-2 bg-ink-900 px-4 py-2 text-[11px] font-medium text-brand-yellow safe-top", children: [_jsx(Info, { size: 13, className: "shrink-0" }), _jsxs("p", { className: "flex-1 leading-tight", children: ["Modo demonstra\u00E7\u00E3o \u2014 dados locais. Configure o ", _jsx("span", { className: "font-bold", children: ".env" }), " para ligar ao Firebase."] }), _jsx("button", { type: "button", onClick: () => setDismissed(true), "aria-label": "Ocultar aviso", children: _jsx(X, { size: 13 }) })] }));
};
