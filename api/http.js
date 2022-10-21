import axios from "./axios";

export const storeExpense = (expenseData) =>
  axios.post("/expenses.json", expenseData);

export const fetchExpenses = () => axios.get("/expenses.json");

export const updateExpense = (id, expenseData) =>
  axios.put(`/expenses/${id}.json`, expenseData);

export const deleteExpense = (id) => axios.delete(`/expenses/${id}.json`);
