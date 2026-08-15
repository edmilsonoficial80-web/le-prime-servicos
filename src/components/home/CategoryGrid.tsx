import { Link } from 'react-router-dom';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { CATEGORIES } from '@/constants/categories';
import { cn } from '@/utils';

interface CategoryGridProps {
  limit?: number;
  activeId?: string;
  onSelect?: (categoryId: string) => void;
  layout?: 'grid' | 'scroll';
}

/** Grelha (ou carrossel) de categorias de serviços. */
export const CategoryGrid = ({ limit, activeId, onSelect, layout = 'grid' }: CategoryGridProps) => {
  const items = typeof limit === 'number' ? CATEGORIES.slice(0, limit) : CATEGORIES;

  if (layout === 'scroll') {
    return (
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {CATEGORIES.map((category) => {
          const active = activeId === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect?.(active ? '' : category.id)}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors',
                active
                  ? 'border-ink-900 bg-ink-900 text-brand-yellow'
                  : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300',
              )}
            >
              <CategoryIcon categoryId={category.id} size={15} />
              {category.name}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {items.map((category) => {
        const content = (
          <>
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-active:scale-90"
              style={{ backgroundColor: `${category.color}1f`, color: category.color }}
            >
              <CategoryIcon categoryId={category.id} size={21} />
            </span>
            <span className="line-clamp-2 text-center text-[10.5px] font-semibold leading-tight text-ink-600">
              {category.name}
            </span>
          </>
        );

        return onSelect ? (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className="group flex flex-col items-center gap-1.5"
          >
            {content}
          </button>
        ) : (
          <Link
            key={category.id}
            to={`/procurar?categoria=${category.id}`}
            className="group flex flex-col items-center gap-1.5"
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
};
