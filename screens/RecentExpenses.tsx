import React from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";

const RecentExpenses = () => {
  return <ExpensesOutput expenses={[]} expensesPeriod="Recent" />;
};

export default RecentExpenses;

const styles = StyleSheet.create({});
