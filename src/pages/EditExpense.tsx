import { useNavigate, useParams } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ExpenseForm } from '@/components/expense/ExpenseForm';
import { useExpenses, CreateExpenseData } from '@/hooks/useExpenses';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';

const EditExpense = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { expenses, isLoading, updateExpense } = useExpenses();

  const expense = expenses.find((e) => e.id === id);

  const handleSubmit = (data: CreateExpenseData) => {
    if (!id) return;
    updateExpense.mutate(
      { id, ...data },
      {
        onSuccess: () => {
          navigate('/expenses');
        },
      }
    );
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

  if (!expense) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Expense not found</p>
          <Button onClick={() => navigate('/expenses')} className="mt-4">
            Back to Expenses
          </Button>
        </div>
      </AppLayout>
    );
  }

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
              Edit Expense
            </h1>
            <p className="text-muted-foreground mt-1">
              Update expense details
            </p>
          </div>
        </div>

        {/* Form */}
        <ExpenseForm
          onSubmit={handleSubmit}
          isLoading={updateExpense.isPending}
          initialData={expense}
          submitLabel="Update Expense"
        />
      </div>
    </AppLayout>
  );
};

export default EditExpense;
