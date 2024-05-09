import axios from "axios";
import { Expense } from "../types";

const BACKEND_URL =
  "https://react-native-expenses-ap-ea168-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData: Expense) {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );
  const id = response.data.name;

  return id;
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

export function updateExpense(id: string, expenseData: Expense) {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id: string) {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
