import { Touchable, TouchableOpacity } from "react-native";
import SyncDataToCloud from "./SyncDataToCloud";
import {
    Text,
    View,
    ScrollView,
    Image,
    SafeAreaView,
    StyleSheet,
    Modal,
    Dimensions
} from "react-native";
import { Button } from "@react-native-material/core";
import * as Updates from "expo-updates"
import ExerciseCalendar from "./ExerciseCalendar";

import {
    LineChart,
} from "react-native-chart-kit";
import { mealDayToEat } from "../../AsyncStorageFunctions";
import { IMAGE } from "../ExercisePlan/image/PngItem_4039383.png";
import { render } from "react-dom";
import { TextInput } from "@react-native-material/core";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNSpeedometer from 'react-native-speedometer'
import { getEatenMealAsync, getData } from "../../AsyncStorageFunctions";
import { useIsFocused } from "@react-navigation/native";
import BmiGoal from "./BmiGoal";
import { saveDataToCloud } from "./global";

export default BmiCalculator = ({ navigation, route }) => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [heightUnit, setHeightUnit] = useState('cm');
    const [bmi, setBmi] = useState('')
    const [bmiSpeedometer, setBmiSpeedometer] = useState(0)
    const [description, setDescription] = useState('')
    const [userData, setUserData] = useState({});
    const [calories, setCalories] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [calorieIntake, setCalorieIntake] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [calorieIntakeToday, setCalorieIntakeToday] = useState(0);
    const [bmr, setBmr] = useState('');
    const [burnedCalorie, setBurnedCalorie] = useState(0);
    // CHART
    const weeklyCalorieIntake = {
        labels: Object.values(mealDayToEat),
        datasets: [
            {
                data: [810, 915, 1080, 800, 998, 1504, 1200],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2, // optional,
                legend: ["Rainy Days"] // optional
            }
        ]
    };

    const chartConfig = {
        backgroundColor: "#fff",
        color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    useEffect(() => {
        const getData = async () => {
            try {
                // Retrieve data using AsyncStorage
                const heightValue = await AsyncStorage.getItem('height');
                const weightValue = await AsyncStorage.getItem('weight');
                const genderValue = await AsyncStorage.getItem('gender');
                const heightUnitValue = await AsyncStorage.getItem('heightUnit');

                // Update state with retrieved data
                setHeight(heightValue);
                setWeight(weightValue);
                setGender(genderValue);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
        fetchData();
    }, []);

    const calculateBmi = (userData) => {
        let bmi;

        if (userData.heightUnit === 'cm') {
            bmi = userData.weight / ((userData.height / 100) * (userData.height / 100));
            setBmi(bmi.toFixed(1));
        } else {
            bmi = userData.weight / (((userData.height * 30.48) / 100) * ((userData.height * 30.48) / 100));
            setBmi(bmi.toFixed(1));
        }

        if (bmi < 18.5) {
            setDescription('UNDERWEIGHT');
            setBmiSpeedometer(30);
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            setDescription('NORMAL');
            setBmiSpeedometer(50);
        } else if (bmi >= 25 && bmi <= 29.9) {
            setDescription('OVERWEIGHT');
            setBmiSpeedometer(70);
        } else if (bmi >= 30) {
            setDescription('OBESE');
            setBmiSpeedometer(90);
        }

        // setModalVisible(true);

        if (userData.gender) {
            if (userData.gender === "Male") {
                let bmr = 66.47 + 13.75 * userData.weight + 5.003 * userData.height - 6.755 * userData.age;
                setBmr(bmr.toFixed(1));
            } else {
                let bmr = 66.47 + 13.75 * userData.weight + 5.003 * userData.height - 6.755 * userData.age;
                setBmr(bmr.toFixed(1));
            }
        }
    };

    const isFocused = useIsFocused();
    useEffect(() => {
        const getEatenMeal = async () => {
            const meal = await getEatenMealAsync();
            const mealEaten = JSON.parse(meal);
            const mealGraph = [0, 0, 0, 0, 0, 0, 0];
            for (let i = 0; i < mealEaten.length; i++) {
                const meal = mealEaten[i];
                const mealValues = JSON.parse(meal[1]);
                console.log(mealValues.eatenDate);
                mealGraph[mealValues.eatenDate] += Number(mealValues.calories);
            }
            setCalorieIntake(mealGraph);

            setCalorieIntakeToday(mealGraph[new Date().getDay()]);
            console.log(mealGraph);
            fetchBurnedCalorie();
        };
        getEatenMeal();
    }, [isFocused]);

    const fetchBurnedCalorie = async () => {
        let burnedCalorie = 0;
        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay();
        let storage_Key = `${currentDayIndex}_exerciseBurnedCalories`;
        const previousBurned = await getData(storage_Key);
        if (previousBurned) burnedCalorie = Number(previousBurned);
        setBurnedCalorie(burnedCalorie);
    };

    const fetchData = async () => {
        try {
            // Retrieve the stored data from AsyncStorage
            const storedData = await AsyncStorage.getItem('userData');

            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setUserData(parsedData);
                calculateBmi(parsedData);
            }
        } catch (error) {
            console.log('Error retrieving data:', error);
        }
    };

    const getAllAsyncData = async () => {
        try {
            const allKeys = await AsyncStorage.getAllKeys();
            const allData = await AsyncStorage.multiGet(allKeys);

            // Step 2: Convert the data into a JSON object
            const dataObject = {};
            allData.forEach(([key, value]) => {
                dataObject[key] = value;
            });

            // Step 3: Convert the JSON object into a JSON string
            const jsonString = JSON.stringify(dataObject);

            return jsonString;
        } catch (error) {
            console.error('Error retrieving or converting AsyncStorage data:', error);
            // Handle errors as needed
        }
    };

    return (
        <ScrollView style={{ backgroundColor: "#afd3e2" }}>
            <View>
                {userData && (
                    <View>

                        <View style={{ display: "flex", justifyContent: "center", backgroundColor: "#156d94", padding: 10, marginHorizontal: 10, marginTop: 15, borderRadius: 10 }}>
                            <Text style={{ fontSize: 20, color: "#fff", textAlign: "center" }}>BMI SCORE</Text>
                            <Text style={{ fontSize: 50, fontWeight: "bold", color: "#fff", textAlign: "center" }}>{bmi}</Text>
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", textAlign: "center" }}>{description}</Text>
                            <RNSpeedometer maxValue={40} labels={
                                [
                                    {
                                        name: 'Underweight',
                                        labelColor: '#ff2900',
                                        activeBarColor: '#ff2900',
                                    },
                                    {
                                        name: 'Underweight1',
                                        labelColor: '#ccb700',
                                        activeBarColor: '#ccb700',
                                    },
                                    {
                                        name: 'Normal',
                                        labelColor: '#00ff6b',
                                        activeBarColor: '#00ff6b',
                                    },
                                    {
                                        name: 'Normal2',
                                        labelColor: '#00ff6b',
                                        activeBarColor: '#00ff6b',
                                    },
                                    {
                                        name: 'Obese1',
                                        labelColor: '#ccb700',
                                        activeBarColor: '#ccb700',
                                    },
                                    {
                                        name: 'Obese',
                                        labelColor: '#ff2900',
                                        activeBarColor: '#ff2900',
                                    }
                                ]


                            } value={Number(bmi)} size={200} labelStyle={{ opacity: 0 }} labelNoteStyle={{ opacity: 0 }} />
                        </View>
                        <Button style={{ marginHorizontal: 10, marginTop: 5 }}
                            color="#87a3af"
                            title={"Reset BMI Details"}
                            onPress={async () => {
                                const username = await AsyncStorage.getItem('username');
                                userData.isOld = true;
                                await saveDataToCloud(userData.id, "userData", JSON.stringify(userData));
                                // await AsyncStorage.removeItem('userData');
                                await AsyncStorage.clear();
                                setUserData({});
                                setBmi('');
                                setBmiSpeedometer(0);
                                setDescription('');
                                await AsyncStorage.setItem('username', username);
                                // clear medical history
                                // let allKeys = await AsyncStorage.getAllKeys();
                                // for (let i = 0; i < allKeys.length; i++) {
                                //     if (allKeys[i].startsWith("@medicalHistory_")) {
                                //         await AsyncStorage.removeItem(allKeys[i]);
                                //     }
                                // }

                                Updates.reloadAsync()
                            }} />

                        <Button style={{ marginHorizontal: 10, marginTop: 5 }}
                            color="#87a3af"
                            title={"Log Out"}
                            onPress={async () => {
                                userData.isOld = true;
                                const allAsyncData = await getAllAsyncData();
                                await saveDataToCloud("allAsyncData", "userLogIn/" + userData.username, allAsyncData);
                                // await AsyncStorage.removeItem('userData');
                                await AsyncStorage.clear();
                                setUserData({});
                                setBmi('');
                                setBmiSpeedometer(0);
                                setDescription('');
                                // clear medical history
                                // let allKeys = await AsyncStorage.getAllKeys();
                                // for (let i = 0; i < allKeys.length; i++) {
                                //     if (allKeys[i].startsWith("@medicalHistory_")) {
                                //         await AsyncStorage.removeItem(allKeys[i]);
                                //     }
                                // }

                                Updates.reloadAsync()
                            }} />

                        <View>
                            <View style={{ width: 150, left: 200, marginTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", }}>Name (Pangalan)</Text>
                                <TextInput editable={false} selectTextOnFocus={false} style={{ width: 150, alignSelf: "center" }} value={userData.name}></TextInput>
                            </View>
                            <View style={{ width: 150, left: 200, marginTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", }}>Gender (Kasarian)</Text>
                                <TextInput editable={false} selectTextOnFocus={false} style={{ width: 150, alignSelf: "center" }} value={userData.gender}></TextInput>
                            </View>

                            <View style={{ width: 150, left: 200, marginTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", }}>Age (Edad)</Text>
                                <TextInput editable={false} selectTextOnFocus={false} style={{ width: 150, alignSelf: "center" }} value={userData.age}></TextInput>
                            </View>

                            <View style={{ width: 150, left: 200, marginTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", }}>Height (Tangkad)</Text>
                                <TextInput editable={false} selectTextOnFocus={false} style={{ width: 150, alignSelf: "center" }} value={userData.height + userData.heightUnit} ></TextInput>
                            </View>

                            <View style={{ width: 150, left: 200, marginTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", }}>Weight (Timbang)</Text>
                                <TextInput editable={false} selectTextOnFocus={false} style={{ width: 150, alignSelf: "center" }} value={userData.weight}></TextInput>
                            </View>

                            {/* <TouchableOpacity style={{ backgroundColor: "#009688", height: 50, width: 300, alignSelf: "center", marginTop: 15, borderRadius: 20 }} onPress={calculateBmi}>
                                <Text style={{ alignSelf: "center", marginTop: 10, fontSize: 20, fontWeight: "bold", color: "#fff" }}>Calculate</Text>
                            </TouchableOpacity> */}

                            <View style={{ position: "absolute", height: 600 }}>
                                {userData.gender === "Male" &&
                                    <Image
                                        style={{ height: 410, width: 142, top: 70, left: 40 }}
                                        source={require("../Dashboard/image/pngaaa.com-1130346.png")}
                                    />
                                }
                                {userData.gender === "Female" &&
                                    <Image
                                        style={{ height: 430, width: 280, top: 70, left: -50, resizeMode: "stretch" }}
                                        source={require("../Dashboard/image/female-workout.png")}
                                    />
                                }
                            </View>
                        </View>

                        {/* <Modal visible={modalVisible} animationType="slide">
                            <ScrollView style={{ backgroundColor: "#f9eed9" }}>
                                <View style={{ height: 70, backgroundColor: "#fff", flexDirection: "row", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <Image
                                            style={{ height: 20, width: 27, marginTop: 25, marginLeft: 10 }}
                                            source={require("../Dashboard/image/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png")}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10, marginTop: 22, }}>CALCULATION RESULT</Text>
                                </View>

                                <View style={{ alignSelf: "center", marginTop: 80 }}>
                                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>BMI SCORE</Text>
                                </View>

                                <View style={{ alignSelf: "center", marginTop: 20 }}>
                                    <Text style={{ fontSize: 70, fontWeight: "bold", alignSelf: "center", marginRight: 10 }}>{bmi}</Text>
                                    <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center", marginRight: 10 }}>{description}</Text>
                                </View>

                                <View style={{ alignSelf: "center", marginTop: 40, flexDirection: "row" }}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold", alignSelf: "center", marginRight: 10 }}>GENDER: </Text>
                                    <Text style={{ fontSize: 15, fontWeight: "bold", alignSelf: "center", marginRight: 10 }}>{userData.gender}</Text>
                                </View>

                                <View style={{ alignSelf: "center", marginTop: 20, flexDirection: "row" }}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold", alignSelf: "center", marginRight: 10 }}>AGE: </Text>
                                    <Text style={{ fontSize: 15, fontWeight: "bold", alignSelf: "center", marginRight: 10 }}>{userData.age}</Text>
                                </View>

                                <View style={{ alignSelf: "center", marginTop: 20, flexDirection: "row" }}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold", alignSelf: "center", marginRight: 10 }}>HEIGHT: </Text>
                                    <Text style={{ fontSize: 15, fontWeight: "bold", alignSelf: "center", marginRight: 10 }}>{userData.height}</Text>
                                </View>

                                <View style={{ alignSelf: "center", marginTop: 20, flexDirection: "row" }}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold", alignSelf: "center", marginRight: 10 }}>WEIGHT: </Text>
                                    <Text style={{ fontSize: 15, fontWeight: "bold", alignSelf: "center", marginRight: 10 }}>{userData.weight}</Text>
                                </View>

                            </ScrollView>

                        </Modal> */}
                        <BmiGoal bmr={bmr} calorieIntake={calorieIntakeToday} burnedCalorie={burnedCalorie} />

                        <View style={{ backgroundColor: "#156d94", padding: 10, marginHorizontal: 10, marginTop: 35, marginBottom: 50, borderRadius: 10 }}>
                            <Text style={{ fontSize: 20, color: "#fff", textAlign: "center" }}>DAILY CALORIE INTAKE</Text>
                            <View>
                                <LineChart
                                    data={{
                                        labels: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
                                        datasets: [
                                            {
                                                data: calorieIntake
                                            }
                                        ]
                                    }}
                                    width={Dimensions.get("window").width - 40} // from react-native
                                    height={220}
                                    // yAxisSuffix=" Cal"
                                    // formatYLabel={() => yLabelIterator.next().value}
                                    yAxisInterval={1} // optional, defaults to 1
                                    chartConfig={{
                                        backgroundColor: "#156d94",
                                        backgroundGradientFrom: "#156d94",
                                        backgroundGradientTo: "#156d94",
                                        decimalPlaces: 2, // optional, defaults to 2dp
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },
                                        propsForDots: {
                                            r: "6",
                                            strokeWidth: "2",
                                            stroke: "#000"
                                        }
                                    }}
                                    bezier
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16
                                    }}
                                />
                            </View>
                        </View>

                        {/* <ExerciseCalendar /> */}

                    </View>
                )}
            </View>
            <SyncDataToCloud isFocused={isFocused}></SyncDataToCloud>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    imageTitleHeader: {
        marginTop: 30,
        width: 240,
        height: 240,
        alignSelf: "center"
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 20,
        width: 340,
        paddingVertical: 11,
        paddingHorizontal: 10,
        alignSelf: "center",
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
    },

    HeightTextContainer: {

        flexDirection: "row",
        borderBottomColor: "#ccc",
        marginBottom: 15,
        backgroundColor: "#f9eed9",
        borderRadius: 18,
        width: 320,
        height: 70,
        alignSelf: "center",
    },

    genderTextContainer: {
        marginLeft: 10,
        height: 5,
        width: 250,
        marginTop: 7,
        backgroundColor: "#f9eed9",

    },
    genderContainer: {
        marginTop: 20,
        flexDirection: "row",
        borderBottomColor: "#ccc",
        marginBottom: 15,
        backgroundColor: "#f9eed9",
        borderRadius: 18,
        width: 320,
        height: 70,
        alignSelf: "center",
    },
    genderImageContainer: {
        marginTop: 20,
        height: 25,
        marginRight: 12,
        width: 25,
        marginLeft: 16,
    },

    ExerciseImage: {
        height: 27,
        width: 345,
        flex: 1,
        borderRadius: 10,
        marginTop: 1,
    },
    TextContainer: {
        width: 350,
        height: 30,
        textAlign: "center",
        backgroundColor: "#146c94",
        borderRadius: 10,
        paddingVertical: 6,
        color: "white",
        fontWeight: "bold",
    },
});
