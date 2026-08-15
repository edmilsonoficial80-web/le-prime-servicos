import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { Camera, Plus, X } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/utils';
/** Seletor de várias imagens com pré-visualização (portfólio, fotos do pedido). */
export const ImagePicker = ({ label, hint, files, onChange, max = 6, accept = 'image/*', }) => {
    const inputRef = useRef(null);
    const [previews, setPreviews] = useState([]);
    useEffect(() => {
        const urls = files.map((file) => URL.createObjectURL(file));
        setPreviews(urls);
        return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }, [files]);
    const handleSelect = (event) => {
        const selected = Array.from(event.target.files ?? []);
        onChange([...files, ...selected].slice(0, max));
        event.target.value = '';
    };
    return (_jsxs("div", { children: [label && _jsx("label", { className: "field-label", children: label }), _jsxs("div", { className: "grid grid-cols-3 gap-2.5", children: [previews.map((preview, index) => (_jsxs("div", { className: "relative aspect-square overflow-hidden rounded-2xl bg-ink-100", children: [_jsx("img", { src: preview, alt: `Imagem ${index + 1}`, className: "h-full w-full object-cover" }), _jsx("button", { type: "button", "aria-label": "Remover imagem", onClick: () => onChange(files.filter((_, i) => i !== index)), className: "absolute right-1.5 top-1.5 rounded-full bg-ink-900/80 p-1 text-white", children: _jsx(X, { size: 13 }) })] }, preview))), files.length < max && (_jsxs("button", { type: "button", onClick: () => inputRef.current?.click(), className: "flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-ink-200 text-ink-400 transition-colors hover:border-brand-yellow hover:text-brand-yellow", children: [_jsx(Plus, { size: 20 }), _jsx("span", { className: "text-[11px] font-semibold", children: "Adicionar" })] }))] }), hint && _jsx("p", { className: "mt-2 text-xs text-ink-400", children: hint }), _jsx("input", { ref: inputRef, type: "file", accept: accept, multiple: true, hidden: true, onChange: handleSelect })] }));
};
/** Seletor de foto de perfil com pré-visualização circular. */
export const AvatarPicker = ({ name, file, currentUrl, onChange, size = 96 }) => {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(currentUrl);
    useEffect(() => {
        if (!file) {
            setPreview(currentUrl);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file, currentUrl]);
    return (_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsxs("button", { type: "button", onClick: () => inputRef.current?.click(), className: "relative", children: [_jsx(Avatar, { name: name || 'LE', src: preview, size: size }), _jsx("span", { className: "absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-brand-yellow text-ink-900", children: _jsx(Camera, { size: 15 }) })] }), _jsx("span", { className: "text-xs font-medium text-ink-400", children: "Toque para alterar a foto" }), _jsx("input", { ref: inputRef, type: "file", accept: "image/*", hidden: true, onChange: (event) => onChange(event.target.files?.[0] ?? null) })] }));
};
/** Seletor de um único ficheiro (documento de identificação). */
export const FilePicker = ({ label, hint, file, onChange, accept = 'image/*,.pdf' }) => {
    const inputRef = useRef(null);
    return (_jsxs("div", { children: [_jsx("label", { className: "field-label", children: label }), _jsxs("button", { type: "button", onClick: () => inputRef.current?.click(), className: cn('flex w-full items-center gap-3 rounded-2xl border-2 border-dashed px-4 py-4 text-left transition-colors', file ? 'border-brand-yellow bg-gold-50' : 'border-ink-200 hover:border-ink-300'), children: [_jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900 text-brand-yellow", children: _jsx(Camera, { size: 17 }) }), _jsxs("span", { className: "min-w-0 flex-1", children: [_jsx("span", { className: "block truncate text-sm font-semibold text-ink-900", children: file ? file.name : 'Carregar ficheiro' }), _jsx("span", { className: "block text-xs text-ink-400", children: file ? 'Toque para substituir' : hint })] }), file && (_jsx("span", { role: "button", tabIndex: 0, "aria-label": "Remover ficheiro", onClick: (event) => {
                            event.stopPropagation();
                            onChange(null);
                        }, onKeyDown: (event) => {
                            if (event.key === 'Enter')
                                onChange(null);
                        }, className: "rounded-full bg-ink-900/80 p-1 text-white", children: _jsx(X, { size: 13 }) }))] }), _jsx("input", { ref: inputRef, type: "file", accept: accept, hidden: true, onChange: (event) => onChange(event.target.files?.[0] ?? null) })] }));
};
