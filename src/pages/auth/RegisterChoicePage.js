import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, UserRound } from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';
const OPTIONS = [
    {
        to: '/registar/cliente',
        icon: UserRound,
        title: 'Sou Cliente',
        description: 'Publique pedidos e receba propostas dos melhores profissionais.',
        accent: 'bg-brand-yellow text-ink-900',
    },
    {
        to: '/registar/profissional',
        icon: Briefcase,
        title: 'Sou Profissional',
        description: 'Encontre novos clientes na sua área e faça crescer o seu negócio.',
        accent: 'bg-ink-900 text-brand-yellow',
    },
];
export const RegisterChoicePage = () => (_jsxs(_Fragment, { children: [_jsx(TopBar, { back: true, border: false }), _jsxs("div", { className: "scroll-area px-6 pb-10", children: [_jsx("h1", { className: "font-display text-[28px] font-extrabold leading-tight", children: "Como quer usar a LE Prime?" }), _jsx("p", { className: "mt-2 text-sm leading-relaxed text-ink-400", children: "Escolha o tipo de conta. Poder\u00E1 sempre criar outra mais tarde com um email diferente." }), _jsx("div", { className: "mt-7 space-y-3.5", children: OPTIONS.map(({ to, icon: Icon, title, description, accent }) => (_jsxs(Link, { to: to, className: "flex items-center gap-4 rounded-3xl border border-ink-100 bg-white p-5 shadow-soft transition-transform active:scale-[0.99]", children: [_jsx("span", { className: `flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${accent}`, children: _jsx(Icon, { size: 24 }) }), _jsxs("span", { className: "min-w-0 flex-1", children: [_jsx("span", { className: "block text-[17px] font-bold", children: title }), _jsx("span", { className: "mt-0.5 block text-[13px] leading-relaxed text-ink-400", children: description })] }), _jsx(ArrowRight, { size: 19, className: "shrink-0 text-ink-300" })] }, to))) }), _jsxs("p", { className: "mt-8 text-center text-sm text-ink-400", children: ["J\u00E1 tem conta?", ' ', _jsx(Link, { to: "/entrar", className: "font-bold text-ink-900 underline-offset-2 hover:underline", children: "Entrar" })] })] })] }));
