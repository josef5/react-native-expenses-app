import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

const RecentExpenses = () => {
  const { setExpenses, expenses } = useContext(ExpensesContext);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  useEffect(() => {
    async function getFetchedExpenses() {
      const expenses = await fetchExpenses();

      setExpenses(expenses);
    }

    getFetchedExpenses();
  }, []);

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
