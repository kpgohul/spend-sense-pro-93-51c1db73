import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'primary' | 'positive' | 'negative' | 'neutral';
}

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'primary',
}: StatCardProps) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    positive: 'bg-stat-positive/10 text-stat-positive',
    negative: 'bg-stat-negative/10 text-stat-negative',
    neutral: 'bg-stat-neutral/10 text-stat-neutral',
  };

  return (
    <Card className="shadow-card animate-slide-up">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className={`rounded-xl p-3 ${colorClasses[color]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
