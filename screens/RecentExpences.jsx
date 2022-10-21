import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../api/http";
import { ErrorOverlay, ExpencesOutput, Spinner } from "../components";
import { ExpensesContext } from "../store/expenses-context";

// Component
const RecentExpences = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  const ctx = useContext(ExpensesContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchExpenses();
        const expenses = [];

        for (const key in data) {
          const expenseObj = {
            id: key,
            amount: data[key].amount,
            date: new Date(data[key].date),
            description: data[key].description,
          };
          expenses.push(expenseObj);
        }
        ctx.setExpenses(expenses);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  const recentExpenses = ctx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpencesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7days..."
    />
  );
};

const styles = StyleSheet.create({});

export default RecentExpences;
