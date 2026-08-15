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
import type { Proposal } from '@/types';
import { cn } from '@/utils';

type Tab = 'ativos' | 'propostas' | 'historico';

const TABS: { id: Tab; label: string }[] = [
  { id: 'ativos', label: 'Ativos' },
  { id: 'propostas', label: 'Propostas' },
  { id: 'historico', label: 'Histórico' },
];

export const MyRequestsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notify } = useToast();
  const [tab, setTab] = useState<Tab>('ativos');

  const { data: requests, loading } = useClientRequests(user?.uid);
  const { data: proposals, loading: loadingProposals } = useClientProposals(user?.uid);

  const active = useMemo(() => requests.filter((r) => r.status === 'open' || r.status === 'in_progress'), [requests]);
  const history = useMemo(() => requests.filter((r) => r.status === 'completed' || r.status === 'cancelled'), [requests]);
  const pending = useMemo(() => proposals.filter((p) => p.status === 'pending'), [proposals]);

  const handleAccept = async (proposal: Proposal) => {
    try {
      await acceptProposal(proposal);
      notify('Proposta aceite. O profissional já foi notificado.', 'success');
    } catch {
      notify('Não foi possível aceitar a proposta.', 'error');
    }
  };

  const handleReject = async (proposal: Proposal) => {
    await rejectProposal(proposal);
    notify('Proposta recusada.', 'info');
  };

  const handleChat = async (proposal: Proposal) => {
    if (!user) return;
    const professional = await getUser(proposal.professionalId);
    if (!professional) return;
    const conversationId = await ensureConversation(user, professional, {
      id: proposal.requestId,
      title: proposal.requestTitle,
    });
    navigate(`/conversas/${conversationId}`);
  };

  return (
    <>
      <TopBar
        title="Os meus pedidos"
        subtitle={`${active.length} ativos · ${pending.length} propostas por responder`}
        right={
          <Button size="sm" leftIcon={<Plus size={15} />} onClick={() => navigate('/cliente/novo-pedido')}>
            Novo
          </Button>
        }
      />

      <div className="border-b border-ink-100 bg-white px-5 pb-3">
        <div className="flex rounded-2xl bg-ink-100 p-1">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                'flex-1 rounded-xl py-2 text-[13px] font-bold transition-colors',
                tab === id ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-400',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="scroll-area bg-ink-50 px-5 py-4">
        {tab === 'ativos' &&
          (loading ? (
            <ListSkeleton count={3} height={150} />
          ) : active.length ? (
            <div className="space-y-3">
              {active.map((request) => (
                <RequestCard key={request.id} request={request} to={`/cliente/pedidos/${request.id}`} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<ClipboardList size={22} />}
              title="Sem pedidos ativos"
              description="Publique um pedido e receba propostas de profissionais verificados."
              action={
                <Button onClick={() => navigate('/cliente/novo-pedido')} leftIcon={<Plus size={16} />}>
                  Criar pedido
                </Button>
              }
            />
          ))}

        {tab === 'propostas' &&
          (loadingProposals ? (
            <ListSkeleton count={3} height={170} />
          ) : proposals.length ? (
            <div className="space-y-3">
              {proposals.map((proposal) => (
                <div key={proposal.id}>
                  <p className="mb-1.5 px-1 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                    {proposal.requestTitle}
                  </p>
                  <ProposalCard
                    proposal={proposal}
                    showActions
                    onAccept={handleAccept}
                    onReject={handleReject}
                    onChat={handleChat}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Inbox size={22} />}
              title="Ainda sem propostas"
              description="Quando os profissionais responderem aos seus pedidos, as propostas aparecem aqui."
            />
          ))}

        {tab === 'historico' &&
          (history.length ? (
            <div className="space-y-3">
              {history.map((request) => (
                <RequestCard key={request.id} request={request} to={`/cliente/pedidos/${request.id}`} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<ClipboardList size={22} />}
              title="Histórico vazio"
              description="Os serviços concluídos ficam guardados aqui."
            />
          ))}
      </div>
    </>
  );
};
