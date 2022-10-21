import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});

export default Spinner;
