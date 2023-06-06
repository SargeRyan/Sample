import React, { useState, useEffect } from "react";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { StyleSheet, Text, SafeAreaView, ScrollView, View, Image, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width - 50;
export default MealChart = () => {

    const chartConfig = {
        backgroundColor: "#156d94",
        color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const data = [
        {
            name: "Cal | Breakfast",
            population: 300,
            color: "#ffffff",
            legendFontColor: "#ffffff",
        },
        {
            name: "Cal | Lunch",
            population: 800,
            color: "#e0fbfc",
            legendFontColor: "#ffffff",
        },
        {
            name: "Cal | Dinner",
            population: 700,
            color: "#1c4c85",
            legendFontColor: "#ffffff",
        }
    ];

    return (
        <View style={{
            marginBottom: 20,
            backgroundColor: "#156d94",
            borderRadius: 20,
        }}>
                <PieChart
                    data={data}
                    width={screenWidth}
                    height={200}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    absolute
                />
        </View>
    )
};