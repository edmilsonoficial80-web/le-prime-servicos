import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { ProfessionalCard } from '@/components/cards/ProfessionalCard';
import { RequestCard } from '@/components/cards/RequestCard';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { SearchBar } from '@/components/home/SearchBar';
import { TopBar } from '@/components/layout/TopBar';
import { EmptyState, ListSkeleton } from '@/components/ui/Feedback';
import { getCategory } from '@/constants/categories';
import { toggleFavorite } from '@/services/userService';
import { useAuth } from '@/hooks/useAuth';
import { useProfessionals } from '@/hooks/useProfessionals';
import { useOpenRequests } from '@/hooks/useRequests';
import { cn } from '@/utils';
export const SearchPage = () => {
    const [params, setParams] = useSearchParams();
    const { user, isProfessional } = useAuth();
    const [tab, setTab] = useState(params.get('tipo') === 'pedidos' || isProfessional ? 'pedidos' : 'profissionais');
    const [term, setTerm] = useState(params.get('q') ?? '');
    const category = params.get('categoria') ?? '';
    const { data: professionals, loading: loadingPros } = useProfessionals();
    const { data: requests, loading: loadingRequests } = useOpenRequests();
    const setCategory = (categoryId) => {
        const next = new URLSearchParams(params);
        if (categoryId)
            next.set('categoria', categoryId);
        else
            next.delete('categoria');
        setParams(next, { replace: true });
    };
    const normalized = term.trim().toLowerCase();
    const filteredProfessionals = useMemo(() => professionals.filter((professional) => {
        const matchesCategory = !category || professional.specialty === category;
        const matchesTerm = !normalized ||
            professional.name.toLowerCase().includes(normalized) ||
            professional.city.toLowerCase().includes(normalized) ||
            professional.description.toLowerCase().includes(normalized) ||
            getCategory(professional.specialty).name.toLowerCase().includes(normalized);
        return matchesCategory && matchesTerm;
    }), [professionals, category, normalized]);
    const filteredRequests = useMemo(() => requests.filter((request) => {
        const matchesCategory = !category || request.categoryId === category;
        const matchesTerm = !normalized ||
            request.title.toLowerCase().includes(normalized) ||
            request.description.toLowerCase().includes(normalized) ||
            request.address.toLowerCase().includes(normalized);
        return matchesCategory && matchesTerm;
    }), [requests, category, normalized]);
    const favorites = user?.favorites ?? [];
    return (_jsxs(_Fragment, { children: [_jsx(TopBar, { back: true, title: "Procurar" }), _jsxs("div", { className: "border-b border-ink-100 bg-white px-5 pb-4", children: [_jsx(SearchBar, { value: term, onChange: setTerm, placeholder: "Servi\u00E7o, profissional ou cidade" }), _jsx("div", { className: "mt-3", children: _jsx(CategoryGrid, { layout: "scroll", activeId: category, onSelect: setCategory }) }), _jsx("div", { className: "mt-3 flex rounded-2xl bg-ink-100 p-1", children: ['profissionais', 'pedidos'].map((value) => (_jsx("button", { type: "button", onClick: () => setTab(value), className: cn('flex-1 rounded-xl py-2 text-[13px] font-bold capitalize transition-colors', tab === value ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-400'), children: value }, value))) })] }), _jsx("div", { className: "scroll-area bg-ink-50 px-5 py-4", children: tab === 'profissionais' ? (loadingPros ? (_jsx(ListSkeleton, { count: 4 })) : filteredProfessionals.length ? (_jsxs("div", { className: "space-y-2.5", children: [_jsxs("p", { className: "text-[12px] font-medium text-ink-400", children: [filteredProfessionals.length, " profissionais encontrados"] }), filteredProfessionals.map((professional) => (_jsx(ProfessionalCard, { professional: professional, isFavorite: favorites.includes(professional.uid), onToggleFavorite: user ? (id) => void toggleFavorite(user.uid, id) : undefined }, professional.uid)))] })) : (_jsx(EmptyState, { icon: _jsx(SearchX, { size: 22 }), title: "Sem resultados", description: "Experimente outra categoria ou termo de pesquisa." }))) : loadingRequests ? (_jsx(ListSkeleton, { count: 3, height: 150 })) : filteredRequests.length ? (_jsxs("div", { className: "space-y-3", children: [_jsxs("p", { className: "text-[12px] font-medium text-ink-400", children: [filteredRequests.length, " pedidos abertos"] }), filteredRequests.map((request) => (_jsx(RequestCard, { request: request, to: isProfessional ? `/profissional/servicos/${request.id}` : `/pedido/${request.id}` }, request.id)))] })) : (_jsx(EmptyState, { icon: _jsx(SearchX, { size: 22 }), title: "Sem pedidos", description: "Ainda n\u00E3o existem pedidos abertos com estes filtros." })) })] }));
};
