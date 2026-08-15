import { Link } from 'react-router-dom';
import { BadgeCheck, Heart, MapPin } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Rating } from '@/components/ui/Badge';
import { getCategory } from '@/constants/categories';
import type { ProfessionalProfile } from '@/types';
import { cn, formatCurrency, truncate } from '@/utils';

interface ProfessionalCardProps {
  professional: ProfessionalProfile;
  isFavorite?: boolean;
  onToggleFavorite?: (professionalId: string) => void;
  variant?: 'row' | 'tile';
}

export const ProfessionalCard = ({
  professional,
  isFavorite,
  onToggleFavorite,
  variant = 'row',
}: ProfessionalCardProps) => {
  const category = getCategory(professional.specialty);

  if (variant === 'tile') {
    return (
      <Link
        to={`/profissional/${professional.uid}`}
        className="group relative w-[168px] shrink-0 overflow-hidden rounded-2xl border border-ink-100 bg-white p-3.5 shadow-soft transition-transform active:scale-[0.98]"
      >
        <div className="flex items-start justify-between">
          <Avatar name={professional.name} src={professional.photoURL} size={48} />
          {professional.featured && (
            <span className="rounded-full bg-ink-900 px-2 py-0.5 text-[9px] font-bold uppercase text-brand-yellow">
              Top
            </span>
          )}
        </div>
        <p className="mt-2.5 truncate text-sm font-bold">{professional.name}</p>
        <p className="truncate text-xs text-ink-400">{category.name}</p>
        <div className="mt-2 flex items-center justify-between">
          <Rating value={professional.rating} count={professional.reviewsCount} size={12} />
          {professional.hourlyRate ? (
            <span className="text-[11px] font-bold text-ink-600">{formatCurrency(professional.hourlyRate)}/h</span>
          ) : null}
        </div>
      </Link>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white p-3.5 shadow-soft">
      <Link to={`/profissional/${professional.uid}`} className="shrink-0">
        <Avatar name={professional.name} src={professional.photoURL} size={54} />
      </Link>

      <Link to={`/profissional/${professional.uid}`} className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-[15px] font-bold">{professional.name}</p>
          {professional.approval === 'approved' && (
            <BadgeCheck size={15} className="shrink-0 fill-brand-yellow text-ink-900" />
          )}
        </div>
        <p className="text-xs font-semibold" style={{ color: category.color }}>
          {category.name}
        </p>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-400">
          {truncate(professional.description, 80)}
        </p>
        <div className="mt-2 flex items-center gap-3">
          <Rating value={professional.rating} count={professional.reviewsCount} size={13} />
          <span className="flex items-center gap-1 text-[11px] text-ink-400">
            <MapPin size={11} />
            {professional.city}
          </span>
        </div>
      </Link>

      {onToggleFavorite && (
        <button
          type="button"
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          onClick={() => onToggleFavorite(professional.uid)}
          className="shrink-0 rounded-full p-1.5 transition-colors hover:bg-ink-100"
        >
          <Heart size={18} className={cn(isFavorite ? 'fill-red-500 text-red-500' : 'text-ink-300')} />
        </button>
      )}
    </div>
  );
};
