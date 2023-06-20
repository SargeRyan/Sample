import React, { useState } from "react";
import {
  Provider,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
  HStack,
  VStack,
} from "@react-native-material/core";
import { View, Image } from "react-native";
export default ExerciseDone = ({ exerciseBurnedDetails, onCloseFunction }) => {
  const [visible, setVisible] = useState(true);

  return (
    <VStack spacing={14} m={10}>
      <Image
        style={{ height: 200, width: 200, alignSelf: "center", marginTop: 100 }}
        source={require("./picture/celebration-icon-png-12.png")}
      />
      <Text style={{ alignSelf: "center", textAlign: "center", fontSize: 24 }}>
        Calories Burned: {Math.round(exerciseBurnedDetails.burnedCalories)}
      </Text>
      <Button
        onPress={onCloseFunction}
        color="green"
        style={{ width: 200, alignSelf: "center" }}
        title="Okay"
      />
    </VStack>
  );
};
