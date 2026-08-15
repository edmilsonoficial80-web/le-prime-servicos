import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CalendarDays,
  CheckCircle2,
  Euro,
  MapPin,
  MessageCircle,
  Star,
  Trash2,
  UserRound,
  XCircle,
} from 'lucide-react';
import { ProposalCard } from '@/components/cards/ProposalCard';
import { TopBar } from '@/components/layout/TopBar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CategoryBubble } from '@/components/ui/CategoryIcon';
import { EmptyState, FullScreenLoader, ListSkeleton } from '@/components/ui/Feedback';
import { SafeImage } from '@/components/ui/SafeImage';
import { ConfirmDialog } from '@/components/ui/Sheet';
import {
  REQUEST_STATUS_LABELS,
  REQUEST_STATUS_STYLES,
  URGENCY_LABELS,
  URGENCY_STYLES,
  getCategory,
} from '@/constants/categories';
import { ensureConversation } from '@/services/chatService';
import { acceptProposal, rejectProposal } from '@/services/proposalService';
import { completeRequest, deleteRequest, setRequestStatus } from '@/services/requestService';
import { getUser } from '@/services/userService';
import { useAuth } from '@/hooks/useAuth';
import { useRequestProposals } from '@/hooks/useProposals';
import { useRequest } from '@/hooks/useRequests';
import { useToast } from '@/hooks/useToast';
import type { Proposal } from '@/types';
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

  if (loading) return <FullScreenLoader />;
  if (!request) {
    return (
      <>
        <TopBar back title="Pedido" />
        <EmptyState icon={<XCircle size={22} />} title="Pedido não encontrado" />
      </>
    );
  }

  const category = getCategory(request.categoryId);
  const accepted = proposals.find((proposal) => proposal.id === request.acceptedProposalId);

  const handleAccept = async (proposal: Proposal) => {
    await acceptProposal(proposal);
    notify('Proposta aceite! Combine os detalhes no chat.', 'success');
  };

  const handleReject = async (proposal: Proposal) => {
    await rejectProposal(proposal);
    notify('Proposta recusada.', 'info');
  };

  const openChat = async (professionalId: string) => {
    if (!user) return;
    const professional = await getUser(professionalId);
    if (!professional) return;
    const conversationId = await ensureConversation(user, professional, {
      id: request.id,
      title: request.title,
    });
    navigate(`/conversas/${conversationId}`);
  };

  return (
    <>
      <TopBar
        back
        title="Detalhe do pedido"
        right={
          request.status === 'open' ? (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              aria-label="Eliminar pedido"
              className="rounded-full p-2 text-ink-400 hover:bg-ink-100"
            >
              <Trash2 size={17} />
            </button>
          ) : undefined
        }
      />

      <div className="scroll-area bg-ink-50 pb-6">
        <section className="bg-white px-5 pb-5 pt-4">
          <div className="flex items-start gap-3">
            <CategoryBubble categoryId={request.categoryId} size={52} />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: category.color }}>
                {category.name}
              </p>
              <h1 className="mt-0.5 text-[19px] font-bold leading-snug">{request.title}</h1>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge className={REQUEST_STATUS_STYLES[request.status]}>{REQUEST_STATUS_LABELS[request.status]}</Badge>
            <Badge className={URGENCY_STYLES[request.urgency]}>{URGENCY_LABELS[request.urgency]}</Badge>
            <Badge>{request.proposalsCount} propostas</Badge>
          </div>

          <p className="mt-4 whitespace-pre-line text-[14px] leading-relaxed text-ink-600">{request.description}</p>

          {request.photos.length > 0 && (
            <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
              {request.photos.map((photo, index) => (
                <SafeImage
                  key={photo}
                  src={photo}
                  alt={`Foto ${index + 1}`}
                  className="h-28 w-40 shrink-0 rounded-2xl"
                />
              ))}
            </div>
          )}

          <dl className="mt-5 space-y-2.5 rounded-2xl bg-ink-50 p-4 text-[13px]">
            <div className="flex items-center gap-2.5">
              <MapPin size={15} className="shrink-0 text-ink-400" />
              <dt className="sr-only">Morada</dt>
              <dd className="flex-1 text-ink-600">{request.address}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <CalendarDays size={15} className="shrink-0 text-ink-400" />
              <dt className="sr-only">Data</dt>
              <dd className="flex-1 text-ink-600">{formatDate(request.date)}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <Euro size={15} className="shrink-0 text-ink-400" />
              <dt className="sr-only">Orçamento</dt>
              <dd className="flex-1 font-bold text-ink-900">{formatCurrency(request.budget)}</dd>
            </div>
          </dl>
        </section>

        {accepted && (
          <section className="mt-3 bg-white px-5 py-5">
            <h2 className="text-[15px] font-bold">Profissional selecionado</h2>
            <div className="mt-3 rounded-2xl border border-ink-100 p-4">
              <div className="flex items-center gap-3">
                <UserRound size={18} className="text-ink-400" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{accepted.professionalName}</p>
                  <p className="text-xs text-ink-400">{formatCurrency(accepted.price)} · {accepted.estimatedDays} dia(s)</p>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  leftIcon={<MessageCircle size={15} />}
                  onClick={() => void openChat(accepted.professionalId)}
                >
                  Conversar
                </Button>

                {request.status === 'in_progress' && (
                  <Button size="sm" className="flex-1" leftIcon={<CheckCircle2 size={15} />} onClick={() => setConfirmComplete(true)}>
                    Concluir
                  </Button>
                )}

                {request.status === 'completed' && !request.reviewed && (
                  <Button size="sm" className="flex-1" leftIcon={<Star size={15} />} onClick={() => navigate(`/avaliar/${request.id}`)}>
                    Avaliar
                  </Button>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="mt-3 bg-white px-5 py-5">
          <h2 className="text-[15px] font-bold">Propostas recebidas ({proposals.length})</h2>

          <div className="mt-3 space-y-3">
            {loadingProposals ? (
              <ListSkeleton count={2} height={170} />
            ) : proposals.length ? (
              proposals.map((proposal) => (
                <ProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  showActions={request.status === 'open'}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onChat={(item) => void openChat(item.professionalId)}
                />
              ))
            ) : (
              <EmptyState
                icon={<MessageCircle size={22} />}
                title="Ainda sem propostas"
                description="Normalmente as primeiras propostas chegam em menos de 1 hora."
              />
            )}
          </div>
        </section>

        {request.status === 'open' && (
          <div className="px-5 pt-4">
            <Button variant="outline" fullWidth onClick={() => setConfirmCancel(true)}>
              Cancelar pedido
            </Button>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmCancel}
        title="Cancelar pedido?"
        description="O pedido deixa de estar visível para os profissionais."
        confirmLabel="Cancelar pedido"
        destructive
        onClose={() => setConfirmCancel(false)}
        onConfirm={() => {
          void setRequestStatus(request.id, 'cancelled');
          notify('Pedido cancelado.', 'info');
        }}
      />

      <ConfirmDialog
        open={confirmDelete}
        title="Eliminar pedido?"
        description="Esta ação é permanente e remove também as propostas associadas."
        confirmLabel="Eliminar"
        destructive
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => {
          void deleteRequest(request.id);
          notify('Pedido eliminado.', 'info');
          navigate('/cliente/pedidos', { replace: true });
        }}
      />

      <ConfirmDialog
        open={confirmComplete}
        title="Marcar como concluído?"
        description="Confirme apenas depois do serviço estar realizado. Poderá avaliar o profissional a seguir."
        confirmLabel="Concluir serviço"
        onClose={() => setConfirmComplete(false)}
        onConfirm={() => {
          void completeRequest(request, accepted?.price).then(() => navigate(`/avaliar/${request.id}`));
        }}
      />
    </>
  );
};
