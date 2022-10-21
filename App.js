import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { GlobalStyles } from "./constants/styles";
import { AllExpenses, ManageExpense, RecentExpences } from "./screens";
import { IconButton } from "./components";
import ExpensesContextProvider from "./store/expenses-context";

// Define vars
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpencesOverView = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "#fff",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("manageExpense");
              }}
            />
          );
        },
      })}
    >
      <BottomTabs.Screen
        name="recentExpenses"
        component={RecentExpences}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="hourglass" color={color} size={size} />;
          },
        }}
      />
      <BottomTabs.Screen
        name="allExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="calendar" color={color} size={size} />;
          },
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "#fff",
            }}
          >
            <Stack.Screen
              name="expensesOverView"
              component={ExpencesOverView}
              options={{ headerShown: false }} // to disable the native stac header
            />
            <Stack.Screen
              name="manageExpense"
              component={ManageExpense}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
