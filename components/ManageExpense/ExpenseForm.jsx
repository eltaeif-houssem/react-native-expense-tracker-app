import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

// Component
const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : "",
      isValid: true,
    },
  });

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputs((state) => {
      return {
        ...state,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // show feedback
      setInputs((state) => {
        return {
          amount: { value: state.amount.value, isValid: amountIsValid },
          date: { value: state.date.value, isValid: dateIsValid },
          description: {
            value: state.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          //   autoCapitalize:"none"
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
        invalid={!inputs.description.isValid}
      />
      {formIsInValid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 24,
    textAlign: "center",
  },

  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rowInput: {
    flex: 1,
  },

  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ExpenseForm;
