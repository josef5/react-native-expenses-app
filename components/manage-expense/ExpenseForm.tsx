import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Expense } from "../../types";
import { convertDateToISO } from "../../util/date";
import Button from "../ui/Button";
import Input from "./Input";

const ExpenseForm = ({
  isEditing,
  onCancel,
  onSubmit,
  defaultValues,
}: {
  isEditing: boolean;
  onCancel: () => void;
  onSubmit: (expenseData: Expense) => void;
  defaultValues?: Expense;
}) => {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues?.amount.toString() ?? "",
    date:
      defaultValues?.date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) ?? "",
    description: defaultValues?.description ?? "",
  });

  function inputChangedHandler(inputIdentifier: string, enteredValue: string) {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [inputIdentifier]: enteredValue,
    }));
  }

  function submitHandler() {
    const isoDate = convertDateToISO(inputValues.date);

    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(isoDate),
      description: inputValues.description,
    };

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          textInputProps={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(null, "amount"),
            value: inputValues.amount,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          textInputProps={{
            placeholder: "DD MMMM YYYY",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(null, "date"),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputProps={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(null, "description"),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },

  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rowInput: {
    flex: 1,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
