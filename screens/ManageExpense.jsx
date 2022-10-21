import React, { useLayoutEffect, useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { storeExpense, updateExpense, deleteExpense } from "../api/http";
import {
  IconButton,
  Button,
  ExpenseForm,
  Spinner,
  ErrorOverlay,
} from "../components";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

const ManageExpense = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ctx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;

  const selectedExpense = ctx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    setLoading(true);
    try {
      deleteExpense(editedExpenseId);
      ctx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (expenseData) => {
    setLoading(true);
    try {
      if (isEditing) {
        updateExpense(editedExpenseId, expenseData);
        ctx.updateExpense(editedExpenseId, expenseData);
      } else {
        storeExpense(expenseData).then((res) => {
          const id = res.data.name;
          ctx.addExpense({ ...expenseData, id });
        });
      }
      navigation.goBack();
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpense;
