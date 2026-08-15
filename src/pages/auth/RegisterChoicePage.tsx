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

export const RegisterChoicePage = () => (
  <>
    <TopBar back border={false} />

    <div className="scroll-area px-6 pb-10">
      <h1 className="font-display text-[28px] font-extrabold leading-tight">Como quer usar a LE Prime?</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-400">
        Escolha o tipo de conta. Poderá sempre criar outra mais tarde com um email diferente.
      </p>

      <div className="mt-7 space-y-3.5">
        {OPTIONS.map(({ to, icon: Icon, title, description, accent }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-4 rounded-3xl border border-ink-100 bg-white p-5 shadow-soft transition-transform active:scale-[0.99]"
          >
            <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${accent}`}>
              <Icon size={24} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[17px] font-bold">{title}</span>
              <span className="mt-0.5 block text-[13px] leading-relaxed text-ink-400">{description}</span>
            </span>
            <ArrowRight size={19} className="shrink-0 text-ink-300" />
          </Link>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-ink-400">
        Já tem conta?{' '}
        <Link to="/entrar" className="font-bold text-ink-900 underline-offset-2 hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  </>
);
