import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MainTabNavigation from "./Screens/MainTabNavigation";
import CompleteProfileScreen from "./Screens/CompleteProfileScreen";

let willShowCompleteProfileScreen = true;

const App = () => {
  const [showCompleteProfileScreen, setShowMainScreen] = useState(
    willShowCompleteProfileScreen
  );

  return showCompleteProfileScreen ? (
    <CompleteProfileScreen setShowMainScreen={setShowMainScreen} />
  ) : (
    <MainTabNavigation />
  );
};

export default App;
