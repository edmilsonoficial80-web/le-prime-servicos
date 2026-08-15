import { Star } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import type { Review } from '@/types';
import { cn, timeAgo } from '@/utils';

export const ReviewItem = ({ review }: { review: Review }) => (
  <article className="rounded-2xl border border-ink-100 bg-white p-4">
    <div className="flex items-center gap-3">
      <Avatar name={review.clientName} src={review.clientPhoto} size={38} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{review.clientName}</p>
        <p className="truncate text-[11px] text-ink-400">{review.requestTitle}</p>
      </div>
      <span className="text-[11px] text-ink-300">{timeAgo(review.createdAt)}</span>
    </div>

    <div className="mt-2.5 flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={cn(star <= review.rating ? 'fill-brand-yellow text-brand-yellow' : 'fill-ink-100 text-ink-200')}
        />
      ))}
    </div>

    {review.comment && <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{review.comment}</p>}
  </article>
);
