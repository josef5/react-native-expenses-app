import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { Expense, NavigationScreenParamList } from "../types";

const ExpenseItem = ({ id, description, date, amount }: Expense) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<NavigationScreenParamList, "ManageExpense">
    >();

  function expensePressHandler() {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>
            {date.toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>
            £{amount.toLocaleString("en-GB", { currency: "GBP" })}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },

  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },

  textBase: {
    color: GlobalStyles.colors.primary50,
  },

  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },

  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },

  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
