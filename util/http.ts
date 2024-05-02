import axios from "axios";
import { Expense } from "../types";

const BACKEND_URL =
  "https://react-native-expenses-ap-ea168-default-rtdb.firebaseio.com";

export function storeExpense(expenseData: Expense) {
  return axios.post(`${BACKEND_URL}/expenses.json`, expenseData);
}

export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);

  const expenses: Expense[] = [];

  for (const key in response.data) {
    expenses.push({
      ...response.data[key],
      id: key,
      date: new Date(response.data[key].date),
    });
  }

  return expenses;
}
