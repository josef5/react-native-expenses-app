import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Expense } from "../../types";

const ExpensesSummary = ({
  expenses,
  periodName,
}: {
  expenses: Expense[];
  periodName: string;
}) => {
  const expensesSum = expenses.reduce((sum: number, expense: Expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>
        £{expensesSum.toLocaleString("en-GB", { currency: "GBP" })}
      </Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },

  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
