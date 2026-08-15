import { jsx as _jsx } from "react/jsx-runtime";
import { Droplets, Hammer, Home, Laptop, Leaf, MoreHorizontal, PaintRoller, Ruler, Sparkles, Wind, Wrench, Zap, } from 'lucide-react';
import { getCategory } from '@/constants/categories';
import { cn } from '@/utils';
const ICON_MAP = {
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
export const CategoryIcon = ({ categoryId, size = 20, className }) => {
    const category = getCategory(categoryId);
    const Icon = ICON_MAP[category.icon] ?? MoreHorizontal;
    return _jsx(Icon, { size: size, className: cn(className) });
};
/** Ícone da categoria dentro de um círculo com a cor respetiva. */
export const CategoryBubble = ({ categoryId, size = 48, className }) => {
    const category = getCategory(categoryId);
    return (_jsx("span", { className: cn('flex items-center justify-center rounded-2xl', className), style: { width: size, height: size, backgroundColor: `${category.color}22`, color: category.color }, children: _jsx(CategoryIcon, { categoryId: categoryId, size: size * 0.45 }) }));
};
