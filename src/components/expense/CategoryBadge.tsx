import { getCategoryColor, getCategoryLabel } from '@/lib/constants';

interface CategoryBadgeProps {
  category: string;
  size?: 'sm' | 'md';
}

export const CategoryBadge = ({ category, size = 'sm' }: CategoryBadgeProps) => {
  const color = getCategoryColor(category);
  const label = getCategoryLabel(category);
  
  const sizeClasses = size === 'sm' 
    ? 'px-2.5 py-0.5 text-xs' 
    : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses}`}
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      {label}
    </span>
  );
};
