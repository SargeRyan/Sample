import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "@react-native-material/core";
import PlanWeeklyMeal from "../PlanWeeklyMeal";
export default MealSettings = ({ fetchMeals }) => {
    const [weeklyMealModalVisible, setweeklyMealModalVisible] = useState(false);
    return (
        <View
            style={{
                paddingHorizontal: 14,
                paddingVertical: 20,
                backgroundColor: "#146C94",
                marginBottom: 15,
                borderRadius: 10,
                justifyContent: "space-between",
            }}
            keyboardShouldPersistTaps="handled"
        >
            
            <Button
                color="#fff"
                title={"Plan Meal for the Week"}
                onPress={() => {
                    setweeklyMealModalVisible(true);
                }}
                leading={props => <Ionicons name={'calendar'}  {...props} />}
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
