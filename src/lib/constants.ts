export const CATEGORIES = [
  { value: 'dress', label: 'Dress', color: 'hsl(340, 75%, 55%)' },
  { value: 'grocery', label: 'Grocery', color: 'hsl(142, 70%, 45%)' },
  { value: 'food', label: 'Food', color: 'hsl(25, 95%, 55%)' },
  { value: 'travel', label: 'Travel', color: 'hsl(217, 91%, 60%)' },
  { value: 'utilities', label: 'Utilities', color: 'hsl(271, 70%, 60%)' },
  { value: 'rent', label: 'Rent', color: 'hsl(45, 95%, 50%)' },
  { value: 'others', label: 'Others', color: 'hsl(210, 15%, 55%)' },
] as const;

export type CategoryType = typeof CATEGORIES[number]['value'];

export const getCategoryColor = (category: string): string => {
  const found = CATEGORIES.find(c => c.value === category);
  return found?.color || 'hsl(210, 15%, 55%)';
};

export const getCategoryLabel = (category: string): string => {
  const found = CATEGORIES.find(c => c.value === category);
  return found?.label || 'Others';
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};
