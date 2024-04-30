import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Expense } from "../../types";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData: { item: Expense }) {
  return <ExpenseItem {...itemData.item} />;
}

const ExpensesList = ({ expenses }: { expenses: Expense[] }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
