import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Inbox, Plus } from 'lucide-react';
import { ProposalCard } from '@/components/cards/ProposalCard';
import { RequestCard } from '@/components/cards/RequestCard';
import { TopBar } from '@/components/layout/TopBar';
import { Button } from '@/components/ui/Button';
import { EmptyState, ListSkeleton } from '@/components/ui/Feedback';
import { acceptProposal, rejectProposal } from '@/services/proposalService';
import { ensureConversation } from '@/services/chatService';
import { getUser } from '@/services/userService';
import { useAuth } from '@/hooks/useAuth';
import { useClientProposals } from '@/hooks/useProposals';
import { useClientRequests } from '@/hooks/useRequests';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/utils';
const TABS = [
    { id: 'ativos', label: 'Ativos' },
    { id: 'propostas', label: 'Propostas' },
    { id: 'historico', label: 'Histórico' },
];
export const MyRequestsPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { notify } = useToast();
    const [tab, setTab] = useState('ativos');
    const { data: requests, loading } = useClientRequests(user?.uid);
    const { data: proposals, loading: loadingProposals } = useClientProposals(user?.uid);
    const active = useMemo(() => requests.filter((r) => r.status === 'open' || r.status === 'in_progress'), [requests]);
    const history = useMemo(() => requests.filter((r) => r.status === 'completed' || r.status === 'cancelled'), [requests]);
    const pending = useMemo(() => proposals.filter((p) => p.status === 'pending'), [proposals]);
    const handleAccept = async (proposal) => {
        try {
            await acceptProposal(proposal);
            notify('Proposta aceite. O profissional já foi notificado.', 'success');
        }
        catch {
            notify('Não foi possível aceitar a proposta.', 'error');
        }
    };
    const handleReject = async (proposal) => {
        await rejectProposal(proposal);
        notify('Proposta recusada.', 'info');
    };
    const handleChat = async (proposal) => {
        if (!user)
            return;
        const professional = await getUser(proposal.professionalId);
        if (!professional)
            return;
        const conversationId = await ensureConversation(user, professional, {
            id: proposal.requestId,
            title: proposal.requestTitle,
        });
        navigate(`/conversas/${conversationId}`);
    };
    return (_jsxs(_Fragment, { children: [_jsx(TopBar, { title: "Os meus pedidos", subtitle: `${active.length} ativos · ${pending.length} propostas por responder`, right: _jsx(Button, { size: "sm", leftIcon: _jsx(Plus, { size: 15 }), onClick: () => navigate('/cliente/novo-pedido'), children: "Novo" }) }), _jsx("div", { className: "border-b border-ink-100 bg-white px-5 pb-3", children: _jsx("div", { className: "flex rounded-2xl bg-ink-100 p-1", children: TABS.map(({ id, label }) => (_jsx("button", { type: "button", onClick: () => setTab(id), className: cn('flex-1 rounded-xl py-2 text-[13px] font-bold transition-colors', tab === id ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-400'), children: label }, id))) }) }), _jsxs("div", { className: "scroll-area bg-ink-50 px-5 py-4", children: [tab === 'ativos' &&
                        (loading ? (_jsx(ListSkeleton, { count: 3, height: 150 })) : active.length ? (_jsx("div", { className: "space-y-3", children: active.map((request) => (_jsx(RequestCard, { request: request, to: `/cliente/pedidos/${request.id}` }, request.id))) })) : (_jsx(EmptyState, { icon: _jsx(ClipboardList, { size: 22 }), title: "Sem pedidos ativos", description: "Publique um pedido e receba propostas de profissionais verificados.", action: _jsx(Button, { onClick: () => navigate('/cliente/novo-pedido'), leftIcon: _jsx(Plus, { size: 16 }), children: "Criar pedido" }) }))), tab === 'propostas' &&
                        (loadingProposals ? (_jsx(ListSkeleton, { count: 3, height: 170 })) : proposals.length ? (_jsx("div", { className: "space-y-3", children: proposals.map((proposal) => (_jsxs("div", { children: [_jsx("p", { className: "mb-1.5 px-1 text-[11px] font-semibold uppercase tracking-wide text-ink-400", children: proposal.requestTitle }), _jsx(ProposalCard, { proposal: proposal, showActions: true, onAccept: handleAccept, onReject: handleReject, onChat: handleChat })] }, proposal.id))) })) : (_jsx(EmptyState, { icon: _jsx(Inbox, { size: 22 }), title: "Ainda sem propostas", description: "Quando os profissionais responderem aos seus pedidos, as propostas aparecem aqui." }))), tab === 'historico' &&
                        (history.length ? (_jsx("div", { className: "space-y-3", children: history.map((request) => (_jsx(RequestCard, { request: request, to: `/cliente/pedidos/${request.id}` }, request.id))) })) : (_jsx(EmptyState, { icon: _jsx(ClipboardList, { size: 22 }), title: "Hist\u00F3rico vazio", description: "Os servi\u00E7os conclu\u00EDdos ficam guardados aqui." })))] })] }));
};
