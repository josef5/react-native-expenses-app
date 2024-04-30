import React, { createContext, useReducer } from "react";
import { Expense } from "../types";
import { getDateMinusDays } from "../util/date";

const DUMMY_EXPENSES: Expense[] = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: getDateMinusDays(new Date(), 2),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.95,
    date: getDateMinusDays(new Date(), 5),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: getDateMinusDays(new Date(), 12),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: getDateMinusDays(new Date(), 19),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: getDateMinusDays(new Date(), 22),
  },
];

export const ExpensesContext = createContext({
  expenses: [] as Expense[],
  addExpense: ({ description, amount, date }: Expense) => {},
  updateExpense: (id: string, { description, amount, date }: Expense) => {},
  deleteExpense: (id: string) => {},
});

function expensesReducer(
  state: Expense[],
  action: {
    type: "ADD" | "UPDATE" | "DELETE";
    payload: Expense;
  }
) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case "UPDATE":
      return state.map((expense) => {
        if (expense.id === action.payload.id) {
          return action.payload;
        }
        return expense;
      });
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload.id);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: React.PropsWithChildren<{}>) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

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
