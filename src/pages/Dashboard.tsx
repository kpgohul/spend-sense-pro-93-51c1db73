import { useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { CategoryPieChart } from '@/components/dashboard/CategoryPieChart';
import { MonthlyBarChart } from '@/components/dashboard/MonthlyBarChart';
import { WeeklyLineChart } from '@/components/dashboard/WeeklyLineChart';
import { useExpenses } from '@/hooks/useExpenses';
import { formatCurrency } from '@/lib/constants';
import { format, startOfMonth, startOfWeek, isToday, isWithinInterval, subDays } from 'date-fns';
import { DollarSign, TrendingUp, Calendar, PiggyBank, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { expenses, isLoading } = useExpenses();

  const stats = useMemo(() => {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });

    const thisMonth = expenses.filter((e) => 
      new Date(e.expense_date) >= monthStart
    );
    const thisWeek = expenses.filter((e) => 
      new Date(e.expense_date) >= weekStart
    );
    const todayExpenses = expenses.filter((e) => 
      isToday(new Date(e.expense_date))
    );

    const totalThisMonth = thisMonth.reduce((sum, e) => sum + e.amount, 0);
    const totalThisWeek = thisWeek.reduce((sum, e) => sum + e.amount, 0);
    const totalToday = todayExpenses.reduce((sum, e) => sum + e.amount, 0);
    const totalAll = expenses.reduce((sum, e) => sum + e.amount, 0);

    return {
      thisMonth: totalThisMonth,
      thisWeek: totalThisWeek,
      today: totalToday,
      total: totalAll,
      expenseCount: expenses.length,
    };
  }, [expenses]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Overview of your spending habits
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="This Month"
            value={formatCurrency(stats.thisMonth)}
            subtitle={format(new Date(), 'MMMM yyyy')}
            icon={Calendar}
            color="primary"
          />
          <StatCard
            title="This Week"
            value={formatCurrency(stats.thisWeek)}
            subtitle="Mon - Sun"
            icon={TrendingUp}
            color="positive"
          />
          <StatCard
            title="Today"
            value={formatCurrency(stats.today)}
            subtitle={format(new Date(), 'EEEE')}
            icon={DollarSign}
            color="neutral"
          />
          <StatCard
            title="Total Expenses"
            value={formatCurrency(stats.total)}
            subtitle={`${stats.expenseCount} transactions`}
            icon={PiggyBank}
            color="negative"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <CategoryPieChart expenses={expenses} />
          <MonthlyBarChart expenses={expenses} />
        </div>

        <div className="grid gap-6">
          <WeeklyLineChart expenses={expenses} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
