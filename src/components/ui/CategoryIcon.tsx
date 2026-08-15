import {
  Droplets,
  Hammer,
  Home,
  Laptop,
  Leaf,
  MoreHorizontal,
  PaintRoller,
  Ruler,
  Sparkles,
  Wind,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { getCategory } from '@/constants/categories';
import { cn } from '@/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Droplets,
  PaintRoller,
  Hammer,
  Ruler,
  Sparkles,
  Leaf,
  Wind,
  Home,
  Wrench,
  Laptop,
  MoreHorizontal,
};

interface CategoryIconProps {
  categoryId: string;
  size?: number;
  className?: string;
}

export const CategoryIcon = ({ categoryId, size = 20, className }: CategoryIconProps) => {
  const category = getCategory(categoryId);
  const Icon = ICON_MAP[category.icon] ?? MoreHorizontal;
  return <Icon size={size} className={cn(className)} />;
};

interface CategoryBubbleProps {
  categoryId: string;
  size?: number;
  className?: string;
}

/** Ícone da categoria dentro de um círculo com a cor respetiva. */
export const CategoryBubble = ({ categoryId, size = 48, className }: CategoryBubbleProps) => {
  const category = getCategory(categoryId);
  return (
    <span
      className={cn('flex items-center justify-center rounded-2xl', className)}
      style={{ width: size, height: size, backgroundColor: `${category.color}22`, color: category.color }}
    >
      <CategoryIcon categoryId={categoryId} size={size * 0.45} />
    </span>
  );
};
