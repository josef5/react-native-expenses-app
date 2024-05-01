import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
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
  // isValid set to true by default to avoid showing error on initial render
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount.toString() ?? "",
      isValid: true,
    },
    date: {
      value:
        defaultValues?.date.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }) ?? "",
      isValid: true,
    },
    description: {
      value: defaultValues?.description ?? "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier: string, enteredValue: string) {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  }

  function submitHandler() {
    const isoDate = convertDateToISO(inputs.date.value);

    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(isoDate),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((prevInputs) => ({
        amount: { ...prevInputs.amount, isValid: amountIsValid },
        date: { ...prevInputs.date, isValid: dateIsValid },
        description: { ...prevInputs.description, isValid: descriptionIsValid },
      }));

      return;
    }

    onSubmit(expenseData);
  }

  const formIsValid = Object.values(inputs).every((input) => input.isValid);

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
          textInputProps={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(null, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          style={styles.rowInput}
          textInputProps={{
            placeholder: "DD MMMM YYYY",
            onChangeText: inputChangedHandler.bind(null, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputProps={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(null, "description"),
          value: inputs.description.value,
        }}
      />
      {!formIsValid && (
        <Text style={styles.errorText}>Invalid input values</Text>
      )}
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

  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
