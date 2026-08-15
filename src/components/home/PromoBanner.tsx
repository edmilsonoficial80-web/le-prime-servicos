import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

/** Banner promocional apresentado na página inicial. */
export const PromoBanner = () => (
  <Link
    to="/cliente/novo-pedido"
    className="relative block overflow-hidden rounded-3xl bg-ink-900 p-5 text-white shadow-card transition-transform active:scale-[0.99]"
  >
    <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-brand-yellow/20 blur-2xl" />
    <div className="absolute -bottom-16 -left-8 h-36 w-36 rounded-full bg-brand-yellow/10 blur-2xl" />

    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-yellow px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-ink-900">
      <Sparkles size={12} />
      Primeiro pedido grátis
    </span>

    <h3 className="mt-3 max-w-[80%] font-display text-[21px] font-extrabold leading-tight">
      Receba até 5 propostas em minutos
    </h3>

    <p className="mt-1.5 max-w-[85%] text-[13px] leading-relaxed text-white/60">
      Descreva o que precisa e deixe os melhores profissionais competirem pelo seu serviço.
    </p>

    <div className="mt-4 flex items-center justify-between">
      <span className="flex items-center gap-1.5 text-[11px] font-medium text-white/50">
        <ShieldCheck size={13} className="text-brand-yellow" />
        Profissionais verificados
      </span>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow text-ink-900">
        <ArrowRight size={17} />
      </span>
    </div>
  </Link>
);
