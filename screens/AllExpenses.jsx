import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ExpencesOutput } from "../components";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const ctx = useContext(ExpensesContext);
  return (
    <ExpencesOutput
      expensesPeriod="Total"
      expenses={ctx.expenses}
      fallbackText="No expenses was found"
    />
  );
};

const styles = StyleSheet.create({});

export default AllExpenses;
