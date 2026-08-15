import { NavLink, useLocation } from 'react-router-dom';
import {
  Briefcase,
  ClipboardList,
  Heart,
  LayoutDashboard,
  MessageCircle,
  Plus,
  Search,
  ShieldCheck,
  User,
  Wallet,
} from 'lucide-react';
import { countUnread } from '@/services/chatService';
import { useAuth } from '@/hooks/useAuth';
import { useConversations } from '@/hooks/useChat';
import { cn } from '@/utils';

interface NavItem {
  to: string;
  label: string;
  icon: typeof Search;
  badge?: number;
  highlight?: boolean;
}

/** Barra de navegação inferior, adaptada ao tipo de utilizador. */
export const BottomNav = () => {
  const { user, isClient, isProfessional, isAdmin } = useAuth();
  const { pathname } = useLocation();
  const { data: conversations } = useConversations(user?.uid);
  const unread = countUnread(conversations, user?.uid ?? '');

  if (!user) return null;
  if (/^\/(conversas\/|avaliar\/|cliente\/novo-pedido)/.test(pathname)) return null;

  let items: NavItem[] = [];

  if (isClient) {
    items = [
      { to: '/inicio', label: 'Início', icon: Search },
      { to: '/cliente/pedidos', label: 'Pedidos', icon: ClipboardList },
      { to: '/cliente/novo-pedido', label: 'Pedir', icon: Plus, highlight: true },
      { to: '/conversas', label: 'Conversas', icon: MessageCircle, badge: unread },
      { to: '/cliente/favoritos', label: 'Favoritos', icon: Heart },
    ];
  } else if (isProfessional) {
    items = [
      { to: '/profissional', label: 'Painel', icon: LayoutDashboard },
      { to: '/profissional/servicos', label: 'Serviços', icon: Briefcase },
      { to: '/profissional/propostas', label: 'Propostas', icon: ClipboardList },
      { to: '/conversas', label: 'Conversas', icon: MessageCircle, badge: unread },
      { to: '/profissional/ganhos', label: 'Ganhos', icon: Wallet },
    ];
  } else if (isAdmin) {
    items = [
      { to: '/admin', label: 'Resumo', icon: LayoutDashboard },
      { to: '/admin/utilizadores', label: 'Utilizadores', icon: User },
      { to: '/admin/aprovacoes', label: 'Aprovações', icon: ShieldCheck },
      { to: '/admin/denuncias', label: 'Denúncias', icon: MessageCircle },
      { to: '/perfil', label: 'Perfil', icon: User },
    ];
  }

  return (
    <nav className="z-30 border-t border-ink-100 bg-white/95 backdrop-blur safe-bottom">
      <ul className="flex items-stretch justify-around px-1 pt-1.5 pb-1">
        {items.map(({ to, label, icon: Icon, badge, highlight }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={to === '/profissional' || to === '/admin'}
              className={({ isActive }) =>
                cn(
                  'relative flex flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-semibold transition-colors',
                  isActive ? 'text-ink-900' : 'text-ink-400',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'relative flex h-9 w-9 items-center justify-center rounded-xl transition-all',
                      highlight
                        ? 'h-10 w-10 -translate-y-1 bg-brand-yellow text-ink-900 shadow-glow'
                        : isActive
                          ? 'bg-ink-900 text-brand-yellow'
                          : 'text-ink-400',
                    )}
                  >
                    <Icon size={highlight ? 21 : 19} strokeWidth={2.2} />
                    {Boolean(badge) && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                        {badge! > 9 ? '9+' : badge}
                      </span>
                    )}
                  </span>
                  <span className="truncate">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
