import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MainTabNavigation from "./Screens/MainTabNavigation";
import CompleteProfileScreen from "./Screens/CompleteProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { schedulePushNotification } from "./Screens/DietPlan/MealNotification";
const App = () => {

    const [showCompleteProfileScreen, setShowMainScreen] = useState(true);

    const checkHasUserData = async () => {
        const storedData = await AsyncStorage.getItem('userData');
        return storedData ? setShowMainScreen(false) : setShowMainScreen(true);
    };

    useState(() => {
        checkHasUserData();
        schedulePushNotification(7, 0, "🍏 Time for Breakfast Meal", "Be on time with your Meal!"); // breakfast notification at 8:00 AM
        schedulePushNotification(10, 0, "🍏 Time for Mid Morning Snack", "Be on time with your Meal!"); // breakfast notification at 10:00 AM
        schedulePushNotification(12, 0, "🍏 Time for Lunch Meal", "Be on time with your Meal!"); // lunch notification at 12:00 PM
        schedulePushNotification(15, 0, "🍏 Time for Mid Afternoon Snack", "Be on time with your Meal!"); // lunch notification at 3:00 PM
        schedulePushNotification(18, 0, "🍏 Time for Dinner Meal", "Be on time with your Meal!"); // dinner notification at 6:00 PM      
        schedulePushNotification(20, 0, "🍏 Time for Midnight Snak", "Be on time with your Meal!"); // dinner notification at 8:00 PM      

        // water notifications
        schedulePushNotification(7, 0, "💧 Time to Drink a glass of Water", "Be on time with your Water Drink"); // 7:00 AM
        schedulePushNotification(9, 0, "💧 Time to Drink a glass of Water", "Stay hydrated!"); // 9:00 AM
        schedulePushNotification(11, 0, "💧 Time to Drink a glass of Water", "Keep up the good work!"); // 11:00 AM
        schedulePushNotification(13, 0, "💧 Time to Drink a glass of Water", "Lunchtime hydration!"); // 1:00 PM
        schedulePushNotification(15, 0, "💧 Time to Drink a glass of Water", "Stay refreshed!"); // 3:00 PM
        schedulePushNotification(17, 0, "💧 Time to Drink a glass of Water", "Afternoon hydration break!"); // 5:00 PM
        schedulePushNotification(19, 0, "💧 Time to Drink a glass of Water", "Pre-dinner water reminder!"); // 7:00 PM
        schedulePushNotification(21, 0, "💧 Time to Drink a glass of Water", "One more glass before bedtime!"); // 9:00 PM

    }, []);


    return showCompleteProfileScreen ? (
        <CompleteProfileScreen setShowMainScreen={setShowMainScreen} />
    ) : (
        <MainTabNavigation />
    );
};

export default App;
