import React, { useState, useEffect } from "react";
import { Button } from "@react-native-material/core";
import Ionicons from "react-native-vector-icons/Ionicons";
import Circle from 'react-native-progress/Circle';
import { StyleSheet, Text, SafeAreaView, ScrollView, View, Image, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width - 50;
import { set } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default WaterChart = ({ currentDayWater, setCurrentDayWater }) => {

    return (
        <View
            style={{
                paddingHorizontal: 14,
                paddingVertical: 20,
                backgroundColor: "#146C94",
                marginBottom: 15,
                borderRadius: 10,
                justifyContent: "space-between",
                alignItems: "center",
            }}
            keyboardShouldPersistTaps="handled"
        >
            <Circle
                progress={Math.min(currentDayWater / 8, 1)}
                size={100} // Adjust the size of the pie chart as needed
                color="#ecf0f1" // Change the color to your desired color
                borderWidth={2} // You can add a border if needed
                showsText={true}
                formatText={() => {
                    if (currentDayWater >= 8) return "Done!";
                    return `${currentDayWater}/8`;
                }}
            />
            <Button
                style={{ marginTop: 10, width: "100%" }}
                color="#fff"
                title={"Drink Water"}
                onPress={() => {
                    if (currentDayWater >= 8) return;
                    setCurrentDayWater(currentDayWater + 1);
                }}
                leading={props => <Ionicons style={{ color: "#177fad" }} name={'water'}  {...props} />}
            />
            {/* <Button
                style={{ marginTop: 10, width: "100%", display: "None" }}
                color="#fff"
                title={"Undo"}
                onPress={() => {
                    if (currentDayWater < 0) return;
                    setCurrentDayWater(currentDayWater - 1);
                }}
            /> */}
        </View>
    )
};