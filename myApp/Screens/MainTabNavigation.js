import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import DietPlanScreen from "./DietPlan/DietPlanScreen";
import ExercisePlanScreen from "./ExercisePlan/ExercisePlanScreen";

const Tab = createBottomTabNavigator();
export default MainTabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={navigatorScreenOptions}>
        <Tab.Screen name="Exercise Plan" component={ExercisePlanScreen} />
        <Tab.Screen name="Diet Plan" component={DietPlanScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

let navigatorScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName; // find icon names at https://ionic.io/ionicons

    if (route.name === "Exercise Plan") {
      iconName = focused ? "barbell" : "barbell-outline";
    } else if (route.name === "Diet Plan") {
      iconName = focused ? "ios-list" : "ios-list-outline";
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: "#146C94",
  tabBarInactiveTintColor: "gray",
  tabBarOptions: {
    labelStyle: {
      marginTop: 5,
      marginBottom: 14,
    },
  },
});
