import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ExpenseTable } from '@/components/expense/ExpenseTable';
import { ExpenseFilters } from '@/components/filters/ExpenseFilters';
import { Button } from '@/components/ui/button';
import { useExpenses, Expense } from '@/hooks/useExpenses';
import { formatCurrency } from '@/lib/constants';
import { Download, Loader2, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';

const Expenses = () => {
  const navigate = useNavigate();
  const { expenses, isLoading, deleteExpense } = useExpenses();
  
  // Filters
  const [category, setCategory] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      // Category filter
      if (category !== 'all' && expense.category !== category) {
        return false;
      }
      
      // Date range filter
      if (startDate && expense.expense_date < startDate) {
        return false;
      }
      if (endDate && expense.expense_date > endDate) {
        return false;
      }
      
      return true;
    });
  }, [expenses, category, startDate, endDate]);

  const totalFiltered = useMemo(() => {
    return filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  }, [filteredExpenses]);

  const handleEdit = (expense: Expense) => {
    navigate(`/edit-expense/${expense.id}`);
  };

  const handleDelete = (id: string) => {
    deleteExpense.mutate(id);
  };

  const handleClearFilters = () => {
    setCategory('all');
    setStartDate('');
    setEndDate('');
  };

  const handleExportCSV = () => {
    const headers = ['Date', 'Title', 'Category', 'Amount', 'Description'];
    const rows = filteredExpenses.map((e) => [
      e.expense_date,
      e.title,
      e.category,
      e.amount.toString(),
      e.description || '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `expenses_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Expenses
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and filter your expenses
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleExportCSV} className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button onClick={() => navigate('/add-expense')} className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Expense
            </Button>
          </div>
        </div>

        {/* Filters */}
        <ExpenseFilters
          category={category}
          setCategory={setCategory}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          onClear={handleClearFilters}
        />

        {/* Summary */}
        <div className="flex items-center justify-between px-4 py-3 bg-muted/50 rounded-lg">
          <span className="text-sm text-muted-foreground">
            Showing {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''}
          </span>
          <span className="font-semibold text-foreground">
            Total: {formatCurrency(totalFiltered)}
          </span>
        </div>

        {/* Table */}
        <ExpenseTable
          expenses={filteredExpenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDeleting={deleteExpense.isPending}
        />
      </div>
    </AppLayout>
  );
};

export default Expenses;
