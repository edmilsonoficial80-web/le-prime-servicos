import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { ShieldCheck, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { BRAND } from '@/constants/categories';
const HIGHLIGHTS = [
    { icon: Users, label: '+2.400 profissionais' },
    { icon: Star, label: '4,9 de satisfação' },
    { icon: ShieldCheck, label: 'Perfis verificados' },
];
/** Ecrã de abertura da aplicação. */
export const SplashPage = () => (_jsxs("div", { className: "relative flex h-full flex-col overflow-hidden bg-ink-900 text-white", children: [_jsx("div", { className: "absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-yellow/20 blur-3xl" }), _jsx("div", { className: "absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-brand-yellow/10 blur-3xl" }), _jsxs("div", { className: "relative flex flex-1 flex-col items-center justify-center px-8", children: [_jsx(Logo, { size: 104, withName: true }), _jsx("p", { className: "mt-4 max-w-[280px] text-center text-[15px] leading-relaxed text-white/60", children: BRAND.tagline }), _jsx("div", { className: "mt-10 grid w-full max-w-[320px] grid-cols-3 gap-2", children: HIGHLIGHTS.map(({ icon: Icon, label }) => (_jsxs("div", { className: "flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-2 py-3 text-center", children: [_jsx(Icon, { size: 17, className: "text-brand-yellow" }), _jsx("span", { className: "text-[10px] font-semibold leading-tight text-white/70", children: label })] }, label))) })] }), _jsxs("div", { className: "relative space-y-3 px-6 pb-10 safe-bottom", children: [_jsx(Link, { to: "/entrar", className: "block", children: _jsx(Button, { size: "lg", fullWidth: true, children: "Entrar" }) }), _jsx(Link, { to: "/registar", className: "block", children: _jsx(Button, { size: "lg", fullWidth: true, variant: "outline", className: "border-white/20 bg-transparent text-white hover:bg-white/10", children: "Criar conta" }) }), _jsxs("p", { className: "pt-2 text-center text-[11px] leading-relaxed text-white/35", children: ["Ao continuar aceita os Termos de Utiliza\u00E7\u00E3o e a Pol\u00EDtica de Privacidade da ", BRAND.name, "."] })] })] }));
