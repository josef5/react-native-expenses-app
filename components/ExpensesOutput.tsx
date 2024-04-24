import React from "react";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { Expense } from "../types";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const DUMMY_EXPENSES: Expense[] = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date(2021, 12, 19),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.95,
    date: new Date(2022, 1, 5),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date(2022, 12, 1),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date(2022, 2, 19),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date(2022, 2, 18),
  },
];

const ExpensesOutput = ({
  expenses,
  expensesPeriod,
}: {
  expenses: Expense[];
  expensesPeriod: string;
}) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
