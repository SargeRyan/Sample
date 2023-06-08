import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MainTabNavigation from "./Screens/MainTabNavigation";
import CompleteProfileScreen from "./Screens/CompleteProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
    const [showCompleteProfileScreen, setShowMainScreen] = useState(true);

    const checkHasUserData = async () => {
        const storedData = await AsyncStorage.getItem('userData');
        return storedData ? setShowMainScreen(false) : setShowMainScreen(true);
    };

    useState(() => {
        checkHasUserData();
    }, []);


    return showCompleteProfileScreen ? (
        <CompleteProfileScreen setShowMainScreen={setShowMainScreen} />
    ) : (
        <MainTabNavigation />
    );
};

export default App;
