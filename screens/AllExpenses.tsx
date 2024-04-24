import React from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";

const AllExpenses = () => {
  return <ExpensesOutput expenses={[]} expensesPeriod="Total" />;
};

export default AllExpenses;

const styles = StyleSheet.create({});
