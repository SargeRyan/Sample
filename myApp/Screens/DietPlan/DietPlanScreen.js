import { StyleSheet, Text, SafeAreaView, ScrollView, View, Image } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import MealList from "./Components/MealList";
import MealSettings from "./Components/MealSettings";
import React, { useState, useEffect } from "react";
import MealChart from "./Components/MealChart";
import {
    mealDayToEat,
    mealTimeToEat,
    getMealsToday,
} from "../../AsyncStorageFunctions";
import MealNotification from "./MealNotification";

export default DietPlanScreen = ({ navigation, route }) => {
    const [mealTime, setMealTime] = useState(mealTimeToEat.breakfast);
    const [mealDay, setMealDay] = useState(mealDayToEat.monday);
    const [mealsToday, setMealsToday] = useState([]);
    const [isMealTimeInitialized, setIsMealTimeInitialized] = useState(false);
    const fetchMeals = async () => {
        setMealsToday([]);
        const currentDay = mealDayToEat[getCurrentDay()];

        let currentHourMeal = mealTime;
        if(!isMealTimeInitialized){
            currentHourMeal  = mealTimeToEat[getCurrentHourMeal()];
            setMealTime(currentHourMeal);
            setIsMealTimeInitialized(true);
        }
        setMealDay(currentDay);
        const mealsToday = await getMealsToday(currentDay, currentHourMeal);
        setMealsToday(mealsToday);
    };
    useEffect(() => {
        fetchMeals();
    }, [mealTime]);
    

    function getCurrentDay() {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay();
        const currentDay = daysOfWeek[currentDayIndex].toLowerCase();
        return currentDay;
    }

    function getCurrentHourMeal() {
        const currentHour = new Date().getHours();
        console.log("Current Hour ======",currentHour);
        if (currentHour >= 5 && currentHour < 11) {
            return 'breakfast';
        } else if (currentHour >= 11 && currentHour < 15) {
            return 'lunch';
        } else if (currentHour >= 15 || currentHour < 5) {
            return 'dinner';
        } else {
            return 'unknown';
        }
    }
    const [indexRefresh, setIndexRefresh] = useState(1);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <MealChart indexRefresh={indexRefresh}></MealChart>
                <MealSettings fetchMeals={fetchMeals}></MealSettings>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>{mealDay.toUpperCase()} Meals</Text>
                    <MealTimeDropDown value={mealTime} setValue={setMealTime} />
                </View>
                <MealList mealsToday={mealsToday} setIndexRefresh={()=>{
                    setIndexRefresh(indexRefresh+1);
                }} />
                {
                    Object.keys(mealsToday).length === 0 &&
                    <View style={{
                        display: 'flex',
                    }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{
                                fontSize: 18,
                            }}>There is no meal for {`${mealDay} - ${mealTime}`}</Text>
                            <Text style={{
                                fontSize: 20,
                            }}>Click the Plan Meal Button Above</Text>
                        </View>
                        <Image style={{
                            width: "70%",
                            height: 200,
                            alignSelf: 'center'
                        }} source={require('../../image/undraw_No_data_re_kwbl.png')} />
                    </View>
                }
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

MealTimeDropDown = ({ value, setValue }) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: "Breakfast", value: "Breakfast" },
        { label: "Lunch", value: "Lunch" },
        { label: "Dinner", value: "Dinner" },
    ]);

    return (
        <View>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                listMode="MODAL"
                style={{
                    backgroundColor: "#AFD3E2",
                    width: 150,
                    borderRadius: 50,
                    paddingLeft: 15,
                    color: "#fff",
                }}
                labelStyle={{ fontWeight: 900 }}
            />
        </View>
    );
};
