import React, { createContext, useReducer } from "react";
import { Expense } from "../types";

export const ExpensesContext = createContext({
  expenses: [] as Expense[],
  setExpenses: (expenses: Expense[]) => {},
  addExpense: ({ description, amount, date }: Expense) => {},
  updateExpense: (id: string, { description, amount, date }: Expense) => {},
  deleteExpense: (id: string) => {},
});

function expensesReducer(
  state: Expense[],
  action: {
    type: "SET" | "ADD" | "UPDATE" | "DELETE";
    payload: Expense | Expense[];
  }
) {
  switch (action.type) {
    case "SET":
      return (action.payload as Expense[]).reverse();

    case "ADD":
      return [action.payload, ...state] as Expense[];

    case "UPDATE":
      return state.map((expense) => {
        if (expense.id === (action.payload as Expense).id) {
          return action.payload as Expense;
        }
        return expense;
      });

    case "DELETE":
      return state.filter(
        (expense) => expense.id !== (action.payload as Expense).id
      );

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: React.PropsWithChildren<{}>) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function setExpenses(expenses: Expense[]) {
    dispatch({ type: "SET", payload: expenses });
  }

  function addExpense(expenseData: Expense) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: { id } as Expense });
  }

  function updateExpense(id: string, { description, amount, date }: Expense) {
    dispatch({
      type: "UPDATE",
      payload: { id, description, amount, date },
    });
  }

  const value = {
    expenses: expensesState,
    setExpenses,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
