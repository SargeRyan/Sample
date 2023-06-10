import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MainTabNavigation from "./Screens/MainTabNavigation";
import CompleteProfileScreen from "./Screens/CompleteProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {schedulePushNotification} from "./Screens/DietPlan/MealNotification";
const App = () => {
    const [showCompleteProfileScreen, setShowMainScreen] = useState(true);

    const checkHasUserData = async () => {
        const storedData = await AsyncStorage.getItem('userData');
        return storedData ? setShowMainScreen(false) : setShowMainScreen(true);
    };

    useState(() => {
        checkHasUserData();
        schedulePushNotification(8,0, "Time for Breakfast Meal 🍏", "Be on time with your Meal!"); // breakfast notification at 8:00 AM
        schedulePushNotification(12,0, "Time for Lunch Meal 🍏", "Be on time with your Meal!"); // lunch notification at 12:00 PM
        schedulePushNotification(18,0, "Time for Dinner Meal 🍏", "Be on time with your Meal!"); // dinner notification at 6:00 PM
    }, []);


    return showCompleteProfileScreen ? (
        <CompleteProfileScreen setShowMainScreen={setShowMainScreen} />
    ) : (
        <MainTabNavigation />
    );
};

export default App;
