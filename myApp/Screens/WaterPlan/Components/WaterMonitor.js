import React, { useState, useEffect } from "react";
import {
    BarChart
} from "react-native-chart-kit";
import { StyleSheet, Text, SafeAreaView, ScrollView, View, Image, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width - 50;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "date-fns";
export default WaterMonitor = ({ waterData }) => {

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
            <BarChart
                data={{
                    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    datasets: [
                        {
                            data: waterData
                        }
                    ]
                }}
                style={{
                    marginLeft: - 40,
                }}
                width={screenWidth} // from react-native
                height={250}
                chartConfig={{
                    backgroundColor: "#156d94",
                    backgroundGradientFrom: "#156d94",
                    backgroundGradientTo: "#156d94",
                    decimalPlaces: 0, // Specify 0 decimal places for whole numbers
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}

            />

        </View>
    )
};