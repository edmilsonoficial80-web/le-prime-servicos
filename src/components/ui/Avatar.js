import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { cn, initials } from '@/utils';
/** Avatar com fallback automático para as iniciais do utilizador. */
export const Avatar = ({ name, src, size = 44, className, ring = false }) => {
    const [failed, setFailed] = useState(false);
    const showImage = Boolean(src) && !failed;
    return (_jsx("span", { className: cn('relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink-900 text-brand-yellow', ring && 'ring-2 ring-brand-yellow ring-offset-2 ring-offset-white', className), style: { width: size, height: size }, children: showImage ? (_jsx("img", { src: src, alt: name, loading: "lazy", onError: () => setFailed(true), className: "h-full w-full object-cover" })) : (_jsx("span", { className: "font-display font-bold", style: { fontSize: size * 0.36 }, children: initials(name) || '?' })) }));
};
