export type RootStackParamList = {
  RecentExpenses: undefined;
  ManageExpense: { expenseId: string };
  AllExpenses: undefined;
};

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}
