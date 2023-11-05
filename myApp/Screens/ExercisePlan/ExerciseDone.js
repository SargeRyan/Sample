import React, { useEffect, useState } from "react";
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
import {saveDataToCloud} from "../Dashboard/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Image } from "react-native";
export default ExerciseDone = ({ exerciseBurnedDetails, onCloseFunction }) => {
    const [visible, setVisible] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {
        
        saveData = async () => {
            let userData = await AsyncStorage.getItem("userData");
            setIsSaved(true);
            if(!userData) return;

            const today = new Date();
            const day = today.getDate();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const formattedDate = `${year}-${month}-${day}`;
            exerciseBurnedDetails.dateTime = today.toString();
            exerciseBurnedDetails.burnedCalories = Math.round(exerciseBurnedDetails.burnedCalories);
            userData = JSON.parse(userData);

            const toStoreData = {
                id: userData.id,
                exerciseBurnedDetails: exerciseBurnedDetails,
            };
            const idName = exerciseBurnedDetails.exerciseName.replace(" '","");
            await saveDataToCloud(
                `${userData.id}/${formattedDate}/${idName}`,
                "exerciseBurnedDetails",
                JSON.stringify(toStoreData)
            );
            setIsSaved(true);
        };
        saveData();
    }, [exerciseBurnedDetails]);

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
                enabled={isSaved}
                style={{ width: 200, alignSelf: "center" }}
                title="Okay"
            />
        </VStack>
    );
};
