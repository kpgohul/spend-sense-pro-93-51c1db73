import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { formatCurrency } from '@/lib/constants';
import { Expense } from '@/hooks/useExpenses';

interface WeeklyLineChartProps {
  expenses: Expense[];
}

export const WeeklyLineChart = ({ expenses }: WeeklyLineChartProps) => {
  // Get last 7 days
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    return {
      day: format(date, 'EEE'),
      date: format(date, 'yyyy-MM-dd'),
      start: startOfDay(date),
      end: endOfDay(date),
    };
  });

  const weeklyData = days.map((d) => {
    const total = expenses
      .filter((e) => e.expense_date === d.date)
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      name: d.day,
      amount: total,
    };
  });

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-display">Weekly Spending</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
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
            <Line
              type="monotone"
              dataKey="amount"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: 'hsl(var(--chart-2))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
