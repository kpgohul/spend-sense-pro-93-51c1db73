import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { CATEGORIES } from '@/lib/constants';
import { X } from 'lucide-react';

interface ExpenseFiltersProps {
  category: string;
  setCategory: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  onClear: () => void;
}

export const ExpenseFilters = ({
  category,
  setCategory,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onClear,
}: ExpenseFiltersProps) => {
  const hasFilters = category !== 'all' || startDate || endDate;

  return (
    <Card className="shadow-card">
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-2 min-w-[160px]">
            <Label htmlFor="category-filter">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      {cat.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="start-date">From</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-[160px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-date">To</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-[160px]"
            />
          </div>

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={onClear} className="gap-2">
              <X className="h-4 w-4" />
              Clear filters
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
