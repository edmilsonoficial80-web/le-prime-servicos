import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CalendarDays, CheckCircle2, Euro, MapPin, MessageCircle, Star, Trash2, UserRound, XCircle, } from 'lucide-react';
import { ProposalCard } from '@/components/cards/ProposalCard';
import { TopBar } from '@/components/layout/TopBar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CategoryBubble } from '@/components/ui/CategoryIcon';
import { EmptyState, FullScreenLoader, ListSkeleton } from '@/components/ui/Feedback';
import { SafeImage } from '@/components/ui/SafeImage';
import { ConfirmDialog } from '@/components/ui/Sheet';
import { REQUEST_STATUS_LABELS, REQUEST_STATUS_STYLES, URGENCY_LABELS, URGENCY_STYLES, getCategory, } from '@/constants/categories';
import { ensureConversation } from '@/services/chatService';
import { acceptProposal, rejectProposal } from '@/services/proposalService';
import { completeRequest, deleteRequest, setRequestStatus } from '@/services/requestService';
import { getUser } from '@/services/userService';
import { useAuth } from '@/hooks/useAuth';
import { useRequestProposals } from '@/hooks/useProposals';
import { useRequest } from '@/hooks/useRequests';
import { useToast } from '@/hooks/useToast';
import { formatCurrency, formatDate } from '@/utils';
export const RequestDetailPage = () => {
    const { requestId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { notify } = useToast();
    const { data: request, loading } = useRequest(requestId);
    const { data: proposals, loading: loadingProposals } = useRequestProposals(requestId);
    const [confirmCancel, setConfirmCancel] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [confirmComplete, setConfirmComplete] = useState(false);
    if (loading)
        return _jsx(FullScreenLoader, {});
    if (!request) {
        return (_jsxs(_Fragment, { children: [_jsx(TopBar, { back: true, title: "Pedido" }), _jsx(EmptyState, { icon: _jsx(XCircle, { size: 22 }), title: "Pedido n\u00E3o encontrado" })] }));
    }
    const category = getCategory(request.categoryId);
    const accepted = proposals.find((proposal) => proposal.id === request.acceptedProposalId);
    const handleAccept = async (proposal) => {
        await acceptProposal(proposal);
        notify('Proposta aceite! Combine os detalhes no chat.', 'success');
    };
    const handleReject = async (proposal) => {
        await rejectProposal(proposal);
        notify('Proposta recusada.', 'info');
    };
    const openChat = async (professionalId) => {
        if (!user)
            return;
        const professional = await getUser(professionalId);
        if (!professional)
            return;
        const conversationId = await ensureConversation(user, professional, {
            id: request.id,
            title: request.title,
        });
        navigate(`/conversas/${conversationId}`);
    };
    return (_jsxs(_Fragment, { children: [_jsx(TopBar, { back: true, title: "Detalhe do pedido", right: request.status === 'open' ? (_jsx("button", { type: "button", onClick: () => setConfirmDelete(true), "aria-label": "Eliminar pedido", className: "rounded-full p-2 text-ink-400 hover:bg-ink-100", children: _jsx(Trash2, { size: 17 }) })) : undefined }), _jsxs("div", { className: "scroll-area bg-ink-50 pb-6", children: [_jsxs("section", { className: "bg-white px-5 pb-5 pt-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(CategoryBubble, { categoryId: request.categoryId, size: 52 }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-[11px] font-bold uppercase tracking-wide", style: { color: category.color }, children: category.name }), _jsx("h1", { className: "mt-0.5 text-[19px] font-bold leading-snug", children: request.title })] })] }), _jsxs("div", { className: "mt-3 flex flex-wrap gap-1.5", children: [_jsx(Badge, { className: REQUEST_STATUS_STYLES[request.status], children: REQUEST_STATUS_LABELS[request.status] }), _jsx(Badge, { className: URGENCY_STYLES[request.urgency], children: URGENCY_LABELS[request.urgency] }), _jsxs(Badge, { children: [request.proposalsCount, " propostas"] })] }), _jsx("p", { className: "mt-4 whitespace-pre-line text-[14px] leading-relaxed text-ink-600", children: request.description }), request.photos.length > 0 && (_jsx("div", { className: "no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5", children: request.photos.map((photo, index) => (_jsx(SafeImage, { src: photo, alt: `Foto ${index + 1}`, className: "h-28 w-40 shrink-0 rounded-2xl" }, photo))) })), _jsxs("dl", { className: "mt-5 space-y-2.5 rounded-2xl bg-ink-50 p-4 text-[13px]", children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx(MapPin, { size: 15, className: "shrink-0 text-ink-400" }), _jsx("dt", { className: "sr-only", children: "Morada" }), _jsx("dd", { className: "flex-1 text-ink-600", children: request.address })] }), _jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx(CalendarDays, { size: 15, className: "shrink-0 text-ink-400" }), _jsx("dt", { className: "sr-only", children: "Data" }), _jsx("dd", { className: "flex-1 text-ink-600", children: formatDate(request.date) })] }), _jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx(Euro, { size: 15, className: "shrink-0 text-ink-400" }), _jsx("dt", { className: "sr-only", children: "Or\u00E7amento" }), _jsx("dd", { className: "flex-1 font-bold text-ink-900", children: formatCurrency(request.budget) })] })] })] }), accepted && (_jsxs("section", { className: "mt-3 bg-white px-5 py-5", children: [_jsx("h2", { className: "text-[15px] font-bold", children: "Profissional selecionado" }), _jsxs("div", { className: "mt-3 rounded-2xl border border-ink-100 p-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(UserRound, { size: 18, className: "text-ink-400" }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "truncate font-bold", children: accepted.professionalName }), _jsxs("p", { className: "text-xs text-ink-400", children: [formatCurrency(accepted.price), " \u00B7 ", accepted.estimatedDays, " dia(s)"] })] })] }), _jsxs("div", { className: "mt-3 flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", className: "flex-1", leftIcon: _jsx(MessageCircle, { size: 15 }), onClick: () => void openChat(accepted.professionalId), children: "Conversar" }), request.status === 'in_progress' && (_jsx(Button, { size: "sm", className: "flex-1", leftIcon: _jsx(CheckCircle2, { size: 15 }), onClick: () => setConfirmComplete(true), children: "Concluir" })), request.status === 'completed' && !request.reviewed && (_jsx(Button, { size: "sm", className: "flex-1", leftIcon: _jsx(Star, { size: 15 }), onClick: () => navigate(`/avaliar/${request.id}`), children: "Avaliar" }))] })] })] })), _jsxs("section", { className: "mt-3 bg-white px-5 py-5", children: [_jsxs("h2", { className: "text-[15px] font-bold", children: ["Propostas recebidas (", proposals.length, ")"] }), _jsx("div", { className: "mt-3 space-y-3", children: loadingProposals ? (_jsx(ListSkeleton, { count: 2, height: 170 })) : proposals.length ? (proposals.map((proposal) => (_jsx(ProposalCard, { proposal: proposal, showActions: request.status === 'open', onAccept: handleAccept, onReject: handleReject, onChat: (item) => void openChat(item.professionalId) }, proposal.id)))) : (_jsx(EmptyState, { icon: _jsx(MessageCircle, { size: 22 }), title: "Ainda sem propostas", description: "Normalmente as primeiras propostas chegam em menos de 1 hora." })) })] }), request.status === 'open' && (_jsx("div", { className: "px-5 pt-4", children: _jsx(Button, { variant: "outline", fullWidth: true, onClick: () => setConfirmCancel(true), children: "Cancelar pedido" }) }))] }), _jsx(ConfirmDialog, { open: confirmCancel, title: "Cancelar pedido?", description: "O pedido deixa de estar vis\u00EDvel para os profissionais.", confirmLabel: "Cancelar pedido", destructive: true, onClose: () => setConfirmCancel(false), onConfirm: () => {
                    void setRequestStatus(request.id, 'cancelled');
                    notify('Pedido cancelado.', 'info');
                } }), _jsx(ConfirmDialog, { open: confirmDelete, title: "Eliminar pedido?", description: "Esta a\u00E7\u00E3o \u00E9 permanente e remove tamb\u00E9m as propostas associadas.", confirmLabel: "Eliminar", destructive: true, onClose: () => setConfirmDelete(false), onConfirm: () => {
                    void deleteRequest(request.id);
                    notify('Pedido eliminado.', 'info');
                    navigate('/cliente/pedidos', { replace: true });
                } }), _jsx(ConfirmDialog, { open: confirmComplete, title: "Marcar como conclu\u00EDdo?", description: "Confirme apenas depois do servi\u00E7o estar realizado. Poder\u00E1 avaliar o profissional a seguir.", confirmLabel: "Concluir servi\u00E7o", onClose: () => setConfirmComplete(false), onConfirm: () => {
                    void completeRequest(request, accepted?.price).then(() => navigate(`/avaliar/${request.id}`));
                } })] }));
};
