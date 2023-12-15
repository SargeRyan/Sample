import React, { useState, useEffect } from "react";
import {
    PieChart,
} from "react-native-chart-kit";
import { StyleSheet, Text, SafeAreaView, ScrollView, View, Image, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width - 50;
import { getEatenMealAsync } from "../../../AsyncStorageFunctions";
export default MealChart = ({ indexRefresh }) => {
    const [calorieIntake, setCalorieIntake] = useState({
        Breakfast: 0,
        "Mid Morning Snack": 0,
        Lunch: 0,
        "Mid Lunch Snack": 0,
        Dinner: 0,
        "Midnight Snack": 0,
    });
    useEffect(() => {
        const getEatenMeal = async () => {
            const meal = await getEatenMealAsync();
            const mealEaten = JSON.parse(meal);
            const mealGraph = {
                Breakfast: 0,
                "Mid Morning Snack": 0,
                Lunch: 0,
                "Mid Lunch Snack": 0,
                Dinner: 0,
                "Midnight Snack": 0,
            };
            for (let i = 0; i < mealEaten.length; i++) {
                const meal = mealEaten[i];
                const mealValues = JSON.parse(meal[1]);

                const d = new Date();
                let day = d.getDay()
                if (mealValues.eatenDate !== day) continue; // skip other days
                // //console.log("MEAL VALUES ===========", mealValues);
                mealGraph[mealValues.timeToEat] += Number(mealValues.calories);
            }
            setCalorieIntake(mealGraph);
            //console.log(mealGraph);
        };
        getEatenMeal();
    }, [indexRefresh]);
    const chartConfig = {
        backgroundColor: "#156d94",
        color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const data = [
        {
            name: "Kcal | Breakfast",
            population: calorieIntake.Breakfast,
            color: "#ffffff",
            legendFontColor: "#ffffff",
        },
        {
            name: "Kcal | Mid Morning Snack",
            population: calorieIntake["Mid Morning Snack"],
            color: "#caf0f8",
            legendFontColor: "#ffffff",
        },
        {
            name: "Kcal | Lunch",
            population: calorieIntake.Lunch,
            color: "#90e0ef",
            legendFontColor: "#ffffff",
        },
        {
            name: "Kcal | Mid Afternoon Snack",
            population: calorieIntake["Mid Lunch Snack"],
            color: "#00b4d8",
            legendFontColor: "#ffffff",
        },
        {
            name: "Kcal | Dinner",
            population: calorieIntake.Dinner,
            color: "#0077b6",
            legendFontColor: "#ffffff",
        },
        {
            name: "Kcal | Midnight Snack",
            population: calorieIntake["Midnight Snack"],
            color: "#03045e",
            legendFontColor: "#ffffff",
        },
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