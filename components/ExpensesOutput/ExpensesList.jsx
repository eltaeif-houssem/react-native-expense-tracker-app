import React from "react";
import { StyleSheet, FlatList, Text } from "react-native";

import ExpenceItem from "./ExpenceItem";

const renderExpenseItem = ({ item }) => {
  return <ExpenceItem {...item} />;
};

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => {
        return item.id;
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default ExpensesList;
