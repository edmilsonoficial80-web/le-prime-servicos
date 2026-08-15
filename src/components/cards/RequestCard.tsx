import { Link } from 'react-router-dom';
import { Calendar, MapPin, MessageSquareQuote } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { CategoryBubble } from '@/components/ui/CategoryIcon';
import { SafeImage } from '@/components/ui/SafeImage';
import {
  REQUEST_STATUS_LABELS,
  REQUEST_STATUS_STYLES,
  URGENCY_LABELS,
  URGENCY_STYLES,
  getCategory,
} from '@/constants/categories';
import type { ServiceRequest } from '@/types';
import { formatCurrency, formatDate, timeAgo, truncate } from '@/utils';

interface RequestCardProps {
  request: ServiceRequest;
  to: string;
  showStatus?: boolean;
}

export const RequestCard = ({ request, to, showStatus = true }: RequestCardProps) => {
  const category = getCategory(request.categoryId);

  return (
    <Link
      to={to}
      className="block overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft transition-transform active:scale-[0.99]"
    >
      <div className="flex gap-3 p-3.5">
        <CategoryBubble categoryId={request.categoryId} size={46} className="shrink-0" />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="line-clamp-2 text-[15px] font-bold leading-snug">{request.title}</p>
            <span className="shrink-0 text-sm font-extrabold text-ink-900">{formatCurrency(request.budget)}</span>
          </div>

          <p className="mt-0.5 text-[11px] font-semibold" style={{ color: category.color }}>
            {category.name}
          </p>

          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-400">
            {truncate(request.description, 100)}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <Badge className={URGENCY_STYLES[request.urgency]}>{URGENCY_LABELS[request.urgency]}</Badge>
            {showStatus && (
              <Badge className={REQUEST_STATUS_STYLES[request.status]}>{REQUEST_STATUS_LABELS[request.status]}</Badge>
            )}
            {request.proposalsCount > 0 && (
              <Badge icon={<MessageSquareQuote size={11} />}>{request.proposalsCount} propostas</Badge>
            )}
          </div>
        </div>
      </div>

      {request.photos.length > 0 && (
        <div className="flex gap-1.5 px-3.5 pb-3">
          {request.photos.slice(0, 3).map((photo, index) => (
            <SafeImage key={photo} src={photo} alt={`Foto ${index + 1}`} className="h-16 w-24 rounded-xl" />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-ink-100 bg-ink-50/60 px-3.5 py-2 text-[11px] text-ink-400">
        <span className="flex min-w-0 items-center gap-1">
          <MapPin size={11} className="shrink-0" />
          <span className="truncate">{request.address}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1">
          <Calendar size={11} />
          {formatDate(request.date)}
        </span>
      </div>

      <div className="px-3.5 pb-2 text-[10px] text-ink-300">Publicado {timeAgo(request.createdAt)}</div>
    </Link>
  );
};
