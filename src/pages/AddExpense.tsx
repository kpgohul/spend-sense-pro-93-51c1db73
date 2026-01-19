import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ExpenseForm } from '@/components/expense/ExpenseForm';
import { useExpenses, CreateExpenseData } from '@/hooks/useExpenses';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AddExpense = () => {
  const navigate = useNavigate();
  const { createExpense } = useExpenses();

  const handleSubmit = (data: CreateExpenseData) => {
    createExpense.mutate(data, {
      onSuccess: () => {
        navigate('/expenses');
      },
    });
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Add Expense
            </h1>
            <p className="text-muted-foreground mt-1">
              Record a new expense transaction
            </p>
          </div>
        </div>

        {/* Form */}
        <ExpenseForm
          onSubmit={handleSubmit}
          isLoading={createExpense.isPending}
        />
      </div>
    </AppLayout>
  );
};

export default AddExpense;
