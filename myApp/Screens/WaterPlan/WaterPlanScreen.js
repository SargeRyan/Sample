import { StyleSheet, Text, SafeAreaView, ScrollView, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import WaterChart from "./Components/WaterChart";
import WaterMonitor from "./Components/WaterMonitor";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default DietPlanScreen = ({ navigation, route }) => {
    const currentDayIndex = getCurrentDayIndex();
    const currentDay = getCurrentDay();
    const [indexRefresh, setIndexRefresh] = useState(1);
    const [waterData, setWaterData] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [currentDayWater, setCurrentDayWater] = useState(waterData[currentDayIndex]);

    useEffect(() => {
        setWaterData((prevWaterData) => {
            const newWaterData = [...prevWaterData]; // Create a new array
            newWaterData[currentDayIndex] = currentDayWater;
            return newWaterData;
        });
        saveAsyncCurrentDayWater(currentDayWater);

    }, [currentDayWater, currentDayIndex]);


    function getCurrentDay() {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay();
        const currentDay = daysOfWeek[currentDayIndex].toLowerCase();
        return currentDay;
    }

    async function saveAsyncCurrentDayWater(amount) {
        if (amount && amount > 0) await AsyncStorage.setItem(`@water_${currentDay}`, amount.toString());;
        await getWaterData();
    }

    async function getWaterData() {
        let allKeys = await AsyncStorage.getAllKeys();
        const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        let newWaterData = waterData;
        for (let i = 0; i < allKeys.length; i++) {
            if (allKeys[i].startsWith("@water_")) {
                let day = allKeys[i].split("_")[1];
                let waterAmount = await AsyncStorage.getItem(allKeys[i]);
                console.log(allKeys[i], waterAmount);
                const index = daysOfWeek.indexOf(day);
                console.log("index", index);
                newWaterData[index] = parseInt(waterAmount);
                if (index == currentDayIndex) setCurrentDayWater(parseInt(waterAmount));
            }
        }
        setWaterData(newWaterData);
    }

    function getCurrentDayIndex() {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay();
        return currentDayIndex;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <WaterMonitor waterData={waterData}></WaterMonitor>
                <WaterChart setCurrentDayWater={setCurrentDayWater} currentDayWater={currentDayWater} currentDayIndex={getCurrentDayIndex()}></WaterChart>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 50,
    },
    headingContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        overflow: "visible",
        flexWrap: "wrap",
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 22,
        fontWeight: 600,
        alignSelf: "center",
    },
});


