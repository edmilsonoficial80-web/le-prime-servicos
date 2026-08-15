import { Link } from 'react-router-dom';
import { Clock, MessageCircle } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge, Rating } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PROPOSAL_STATUS_LABELS, PROPOSAL_STATUS_STYLES } from '@/constants/categories';
import type { Proposal } from '@/types';
import { formatCurrency, timeAgo } from '@/utils';

interface ProposalCardProps {
  proposal: Proposal;
  onAccept?: (proposal: Proposal) => void;
  onReject?: (proposal: Proposal) => void;
  onChat?: (proposal: Proposal) => void;
  showActions?: boolean;
}

export const ProposalCard = ({ proposal, onAccept, onReject, onChat, showActions = false }: ProposalCardProps) => (
  <article className="rounded-2xl border border-ink-100 bg-white p-4 shadow-soft">
    <div className="flex items-start gap-3">
      <Link to={`/profissional/${proposal.professionalId}`} className="shrink-0">
        <Avatar name={proposal.professionalName} src={proposal.professionalPhoto} size={44} />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/profissional/${proposal.professionalId}`} className="truncate text-[15px] font-bold">
            {proposal.professionalName}
          </Link>
          <span className="shrink-0 text-base font-extrabold">{formatCurrency(proposal.price)}</span>
        </div>

        <div className="mt-0.5 flex items-center gap-2.5">
          <Rating value={proposal.professionalRating} size={12} />
          <span className="flex items-center gap-1 text-[11px] text-ink-400">
            <Clock size={11} />
            {proposal.estimatedDays} {proposal.estimatedDays === 1 ? 'dia' : 'dias'}
          </span>
        </div>
      </div>
    </div>

    <p className="mt-3 rounded-xl bg-ink-50 px-3.5 py-3 text-[13px] leading-relaxed text-ink-600">{proposal.message}</p>

    <div className="mt-3 flex items-center justify-between">
      <Badge className={PROPOSAL_STATUS_STYLES[proposal.status]}>{PROPOSAL_STATUS_LABELS[proposal.status]}</Badge>
      <span className="text-[11px] text-ink-300">{timeAgo(proposal.createdAt)}</span>
    </div>

    {showActions && proposal.status === 'pending' && (
      <div className="mt-3.5 flex gap-2">
        {onChat && (
          <Button variant="outline" size="sm" onClick={() => onChat(proposal)} leftIcon={<MessageCircle size={15} />}>
            Falar
          </Button>
        )}
        {onReject && (
          <Button variant="ghost" size="sm" onClick={() => onReject(proposal)}>
            Recusar
          </Button>
        )}
        {onAccept && (
          <Button size="sm" className="flex-1" onClick={() => onAccept(proposal)}>
            Aceitar proposta
          </Button>
        )}
      </div>
    )}
  </article>
);
