import { StyleSheet, Text, SafeAreaView, ScrollView, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    BarChart,
    LineChart
} from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width - 50;
import { Dimensions } from "react-native";
import { db } from "../Dashboard/firebaseConfig";
import { get, set, ref, push, child } from "firebase/database";

export default DietPlanScreen = ({ navigation, route }) => {
    const currentDayIndex = getCurrentDayIndex();
    const [user, setUser] = useState(null);
    const [weightByWeek, setWeightByWeek] = useState({
        "Jan 20": 0,
    });
    const [weightByExercise, setWeightByExercise] = useState({
        "Walking": 0,
    });
    const [waterByDay, setWaterByDay] = useState({
        "Jan 20": 0,
    });
    const [exerciseChartData, setExerciseChartData] = useState({
        labels: Object.keys(weightByExercise),
        datasets: [
            {
                data: Object.values(weightByExercise),
            }
        ]
    });

    const [waterChartData, setWaterChartData] = useState({
        labels: Object.keys(waterByDay),
        datasets: [
            {
                data: Object.values(waterByDay),
            }
        ]
    });

    const [chartData, setChartData] = useState({
        labels: Object.keys(weightByWeek),
        datasets: [
            {
                data: Object.values(weightByWeek),
            }
        ]
    });

    function getCurrentDayIndex() {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDate = new Date();

        const currentDayIndex = currentDate.getDay();
        return currentDayIndex;
    }

    useEffect(() => {
        async function getUser() {
            const user = await AsyncStorage.getItem("userData");
            const userObj = JSON.parse(user);
            setUser(userObj);
            console.log("useruser", user);
        }
        getUser();
    }, []);

    useEffect(() => {
        // Update the chart data whenever weightByWeek changes
        setChartData({
            labels: Object.keys(weightByWeek),
            datasets: [
                {
                    data: Object.values(weightByWeek),
                },
            ],
        });
    }, [weightByWeek]);

    useEffect(() => {
        // Update the chart data whenever weightByWeek changes
        setWaterChartData({
            labels: Object.keys(waterByDay),
            datasets: [
                {
                    data: Object.values(waterByDay),
                },
            ],
        });
    }, [waterByDay]);

    useEffect(() => {
        // Update the chart data whenever weightByWeek changes
        setExerciseChartData({
            labels: Object.keys(weightByExercise),
            datasets: [
                {
                    data: Object.values(weightByExercise),
                },
            ],
        });
    }, [weightByExercise]);

    useEffect(() => {
        if (!user) return;
        console.log("***************setting user", user.id);
        const burnedRef = ref(db, `exerciseBurnedDetails/${user.id}`);
        get(burnedRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let burnedDetails = snapshot.val();
                    console.log("burnedDetailsXXX", burnedDetails);

                    // Use a single batch update to avoid potential timing issues
                    setWeightByWeek((prevWeight) => {
                        Object.keys(burnedDetails).forEach(function (key) {
                            const dateObj = new Date(key);
                            const monthNames = [
                                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                            ];
                            const month = monthNames[dateObj.getMonth()];
                            const day = dateObj.getDate();
                            const year = dateObj.getFullYear();
                            const date = `${month} ${day}`;

                            let exerciseDetails = burnedDetails[key];

                            Object.keys(exerciseDetails).forEach(function (key) {
                                const exerciseSpecific = JSON.parse(exerciseDetails[key]);
                                let burnedCalories = exerciseSpecific.exerciseBurnedDetails.burnedCalories;

                                // Update the state using the previous state
                                prevWeight[date] = burnedCalories;

                                console.log("prevWeight", prevWeight);
                            });
                        });

                        // Return the updated state
                        return { ...prevWeight };
                    });

                    // Use a single batch update to avoid potential timing issues
                    setWeightByExercise((prevWeight) => {
                        Object.keys(burnedDetails).forEach(function (key) {
                            const dateObj = new Date(key);
                            const monthNames = [
                                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                            ];
                            const month = monthNames[dateObj.getMonth()];
                            const day = dateObj.getDate();
                            const year = dateObj.getFullYear();
                            const date = `${month} ${day}`;

                            let exerciseDetails = burnedDetails[key];

                            Object.keys(exerciseDetails).forEach(function (key) {
                                const exerciseSpecific = JSON.parse(exerciseDetails[key]);
                                let burnedCalories = exerciseSpecific.exerciseBurnedDetails.burnedCalories;

                                // Update the state using the previous state
                                prevWeight[key] = burnedCalories;

                                console.log("prevWeight", prevWeight);
                            });
                        });

                        // Return the updated state
                        return { ...prevWeight };
                    });

                } else {
                    console.log("No data available XXXXXXX");
                }
            })
            .catch((error) => {
                console.error(error);
            });

        const waterRef = ref(db, `water/${user.id}/byDay`);
        get(waterRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let waterData = snapshot.val();
                    console.log("######waterData", waterData);
                    setWaterByDay(waterData);
                } else {
                    console.log("No data available XXXXXXX Water");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [user]);


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
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
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
                        Burned Calories by day
                    </Text>
                    <LineChart
                        data={chartData}
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
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
                        Burned Calories by Exercises
                    </Text>
                    <BarChart
                        data={exerciseChartData}
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

                <View
                    style={{
                        paddingHorizontal: 14,
                        paddingVertical: 20,
                        backgroundColor: "#146C94",
                        marginBottom: 65,
                        borderRadius: 10,
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
                        Water Taken Per Day
                    </Text>
                    <BarChart
                        data={waterChartData}
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


