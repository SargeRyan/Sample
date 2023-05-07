import { Text, Button, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AddMealScreen from "../AddMealScreen";
import PlanWeeklyMeal from "../PlanWeeklyMeal";
export default MealSettings = ({ fetchMeals }) => {
  const [addMealModalVisible, setAddMealModalVisible] = useState(false);
  const [weeklyMealModalVisible, setweeklyMealModalVisible] = useState(false);
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 14,
        paddingVertical: 20,
        backgroundColor: "#146C94",
        marginBottom: 15,
        borderRadius: 10,
        justifyContent: "space-between",
      }}
      keyboardShouldPersistTaps="handled"
    >
      <SettingButton
        title={"Add Meal Selection"}
        onPress={() => {
          setAddMealModalVisible(true);
        }}
      />
      <SettingButton
        title={"Plan Weekly Meal"}
        onPress={() => {
          setweeklyMealModalVisible(true);
        }}
      />
      <AddMealScreen
        modalVisible={addMealModalVisible}
        onPressCloseModal={() => {
          setAddMealModalVisible(false);
        }}
      />
      <PlanWeeklyMeal
        modalVisible={weeklyMealModalVisible}
        onPressCloseModal={() => {
          setweeklyMealModalVisible(false);
          fetchMeals();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "black",
  },
});

const SettingButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
      }}
    >
      <Text
        style={{
          color: "#146C94",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
