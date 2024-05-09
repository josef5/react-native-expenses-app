import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ExpenseForm from "../components/manage-expense/ExpenseForm";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { Expense, NavigationScreenParamList } from "../types";
import {
  storeExpense,
  updateExpense as dbUpdateExpense,
  deleteExpense as dbDeleteExpense,
} from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

type Props = NativeStackScreenProps<NavigationScreenParamList, "ManageExpense">;

const ManageExpense = ({ route, navigation }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { expenses, updateExpense, addExpense, deleteExpense } =
    useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);

    try {
      await dbDeleteExpense(editedExpenseId);
      deleteExpense(editedExpenseId);

      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense. Please try again.");
    }

    setIsSubmitting(false);
  }

  async function confirmHandler(expenseData: Expense) {
    setIsSubmitting(true);

    try {
      if (isEditing) {
        updateExpense(editedExpenseId, expenseData);
        await dbUpdateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        addExpense({ ...expenseData, id });
      }

      navigation.goBack();
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }

    setIsSubmitting(false);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={() => setError("")} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
