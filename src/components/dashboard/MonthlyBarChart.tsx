import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, startOfMonth, subMonths } from 'date-fns';
import { formatCurrency } from '@/lib/constants';
import { Expense } from '@/hooks/useExpenses';

interface MonthlyBarChartProps {
  expenses: Expense[];
}

export const MonthlyBarChart = ({ expenses }: MonthlyBarChartProps) => {
  // Get last 6 months
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), 5 - i);
    return {
      month: format(date, 'MMM'),
      start: startOfMonth(date),
      fullMonth: format(date, 'yyyy-MM'),
    };
  });

  const monthlyData = months.map((m) => {
    const total = expenses
      .filter((e) => e.expense_date.startsWith(m.fullMonth))
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      name: m.month,
      amount: total,
    };
  });

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-display">Monthly Spending</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Bar
              dataKey="amount"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
