import { StyleSheet, Text, SafeAreaView, ScrollView, View, Image, Button } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
    BarChart,
    LineChart
} from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width - 50;
import { Dimensions } from "react-native";
import { db } from "../Dashboard/firebaseConfig";
import { get, set, ref, push, child } from "firebase/database";
import { useIsFocused } from "@react-navigation/native";

export default DietPlanScreen = ({ navigation, route }) => {
    const [refreshIndex, setRefreshIndex] = useState(0);
    const currentDayIndex = getCurrentDayIndex();
    const [user, setUser] = useState(null);
    const isFocused = useIsFocused();
    useEffect(() => {
        setRefreshIndex(refreshIndex + 1);
    }, [isFocused]);

    const [weightByWeek, setWeightByWeek] = useState({
        "1": 0,
    });
    const [weightByExercise, setWeightByExercise] = useState({
        "Walking": 0,
    });
    const [waterByDay, setWaterByDay] = useState({
        "Jan 28": 0,
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

    const [goalHeight, setGoalHeight] = useState(250);
    const [segmentChart, setSegmentChart] = useState(5);
    const [minGoal, setMinGoal] = useState(0);
    const [maxGoal, setMaxGoal] = useState(0);
    const [weightGoal, setWeightGoal] = useState({
        "Week 1": 0,
    });
    const [goalChartData, setGoalChartData] = useState({
        labels: Object.keys(weightGoal),
        datasets: [
            {
                data: Object.values(weightGoal),
            }
        ]
    });

    useEffect(() => {
        // if (!user) return;
        console.log("ZZZZZZZZZZZZZZZZZZZZZZ", weightGoal);
        if (!weightGoal) return;
        // Update the chart data whenever weightGoal changes
        setGoalChartData({
            labels: Object.keys(weightGoal),
            datasets: [
                {
                    data: Object.values(weightGoal),
                },
                {
                    data: [minGoal],
                    withDots: false
                },
                {
                    data: [maxGoal],
                    withDots: false
                }
            ],
        });
    }, [weightGoal]);

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
            const weight = userObj && userObj.weight ? Number(userObj.weight) : 0;
            const goalWeight = userObj && userObj.goalWeight ? Number(userObj.goalWeight) : 0;
            setMinGoal(weight);
            setMaxGoal(goalWeight);
            // setWeightGoal({
            //     "Week 1": weight,
            // });
            const segments = Math.abs(goalWeight - weight);
            let sementMultiplier = 1;
            if (userObj && userObj.info) sementMultiplier = userObj.info.includes('.50') ? 2 : 4;
            setSegmentChart(segments * sementMultiplier);
            setGoalHeight(segments * 60);
        }
        getUser();
    }, [refreshIndex]);

    useEffect(() => {
        // Update the chart data whenever weightByWeek changes
        const labeledWeeks = Object.keys(weightByWeek).map(label => "Week " + label);
        setChartData({
            labels: labeledWeeks,
            datasets: [
                {
                    data: Object.values(weightByWeek),
                },
            ],
        });
        if (!user) return;
        const weeklyBurned = weightGoal;
        const userWeight = user && user.weight ? Number(user.weight) : 0;
        // calculate the burned calories
        for (let week in weightByWeek) {
            const burnedCalories = weightByWeek[week];
            let burnedKg = burnedCalories / 7700;
            const baseWeight = weeklyBurned[week] || userWeight;
            weeklyBurned["Week " + week] = baseWeight + burnedKg;
        }
        setWeightGoal(weeklyBurned);
        setGoalChartData({
            labels: Object.keys(weeklyBurned),
            datasets: [
                {
                    data: Object.values(weeklyBurned),
                },
                {
                    data: [minGoal],
                    withDots: false
                },
                {
                    data: [maxGoal],
                    withDots: false
                }
            ],
        });
    }, [weightByWeek, refreshIndex, user]);



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
    }, [waterByDay, refreshIndex]);

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
    }, [weightByExercise, refreshIndex]);

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
                        const sortedDates = Object.keys(burnedDetails).sort((a, b) => new Date(a) - new Date(b));
                        let currentWeekNumber = 1;
                        let startDate = null;

                        sortedDates.forEach(function (key) {
                            const dateObj = new Date(key);

                            if (!startDate) {
                                startDate = dateObj;
                            }

                            const timeDiff = dateObj - startDate;
                            const daysDiff = timeDiff / (1000 * 3600 * 24);

                            if (daysDiff >= 7) {
                                // Move to the next week after processing the current date
                                currentWeekNumber++;
                                startDate = dateObj;
                            }

                            const monthNames = [
                                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                            ];
                            const month = monthNames[dateObj.getMonth()];
                            const day = dateObj.getDate();
                            const year = dateObj.getFullYear();
                            const date = `${month} ${day}`;

                            let exerciseDetails = burnedDetails[key];

                            Object.keys(exerciseDetails).forEach(function (exerciseKey) {
                                const exerciseSpecific = JSON.parse(exerciseDetails[exerciseKey]);
                                let burnedCalories = exerciseSpecific.exerciseBurnedDetails.burnedCalories;

                                // If the week doesn't exist in the state, initialize it
                                if (!prevWeight[currentWeekNumber]) {
                                    prevWeight[currentWeekNumber] = 0;
                                }

                                // Update the state using the previous state
                                prevWeight[currentWeekNumber] = (prevWeight[currentWeekNumber] || 0) + Number(burnedCalories);

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
    }, [user, refreshIndex]);


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={{ display: 'none', justifyContent: 'flex-end', width: '100%', alignItems: 'flex-end', marginBottom: 5, marginRight: 5 }}>
                    <Button
                        title="Refresh"
                        color="#146C94"
                        style={{ fontSize: "6px" }}
                        onPress={() => {
                            setRefreshIndex(refreshIndex + 1);
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
                        Weight Goal Chart
                    </Text>
                    <LineChart
                        data={goalChartData}
                        style={{
                            marginLeft: - 40,
                            paddingBottom: (goalHeight * -0.15),
                        }}
                        segments={segmentChart}
                        width={screenWidth} // from react-native
                        height={goalHeight}
                        chartConfig={{
                            backgroundColor: "#156d94",
                            backgroundGradientFrom: "#156d94",
                            backgroundGradientTo: "#156d94",
                            decimalPlaces: 2, // Specify 0 decimal places for whole numbers
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
                        Burned Calories per week
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
                        display: "none"
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
                        height={400}
                        verticalLabelRotation={75}
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
                        Water Taken Per Week
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


