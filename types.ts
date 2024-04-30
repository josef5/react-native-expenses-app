export type NavigationScreenParamList = {
  ManageExpense: { expenseId: string };
  ExpensesOverview: undefined;
  RecentExpenses: undefined;
  AllExpenses: undefined;
};

export interface Expense {
  id?: string;
  description: string;
  amount: number;
  date: Date;
}
