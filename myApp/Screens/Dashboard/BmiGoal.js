import {
    Text,
    View,
    Button,
    ScrollView,
    Image,
    SafeAreaView,
    StyleSheet,
    Touchable, TouchableOpacity
} from "react-native";
// import { IMAGE } from "../ExercisePlan/image/PngItem_4039383.png";
// import { render } from "react-dom";
import { TextInput } from "@react-native-material/core";
import { useState } from "react";

export default BmiGoal = ({ bmr, calorieIntake }) => {

    return (
        <View style={{ display: "flex", justifyContent: "center", backgroundColor: "#156d94", padding: 10, marginHorizontal: 10, marginTop: 15, borderRadius: 10 }}>
            <Text style={{ fontSize: 20, color: "#fff", textAlign: "center" }}>YOUR DAILY CALORIE NET GOAL</Text>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff", textAlign: "center", alignSelf: "center" }}>{Math.round(bmr)}</Text>
                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff", textAlign: "center", alignSelf: "center" }}> KCAL | Goal</Text>
            </View>

            <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff", textAlign: "center", alignSelf: "center" }}>{Math.round(calorieIntake)}</Text>
                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff", textAlign: "center", alignSelf: "center" }}> KCAL | Gained</Text>
            </View>
            <View style={{ flexDirection: "row", alignSelf: "center", borderTopWidth: 2, borderTopColor: "#fff", width: "100%", justifyContent: "center" }}>
                <Text style={{ fontSize: 40, fontWeight: "bold", color: "#41ffc3", textAlign: "center", alignSelf: "center" }}>{ Math.round(Number(bmr) - Number(calorieIntake))}</Text>
                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#41ffc3", textAlign: "center", alignSelf: "center" }}> KCAL | Remaining</Text>
            </View>
        </View>
    );
};