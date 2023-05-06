import { Text, Button, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AddMealScreen from "../AddMealScreen";

export default MealSettings = () => {
  const [addMealModalVisible, setAddMealModalVisible] = useState(false);
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
      <SettingButton title={"Set Daily Diet Plan"} onPress={() => {}} />
      <AddMealScreen
        modalVisible={addMealModalVisible}
        onPressCloseModal={() => {
          setAddMealModalVisible(false);
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
