import React, { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    View,
    Image,
    ToastAndroid,
    ScrollView,
} from "react-native";
import AddMealScreen from "./AddMealScreen";

import Ionicons from "react-native-vector-icons/Ionicons";
import {
    Button,
    Stack,
    TextInput,
    Avatar,
    HStack,
    Spacer,
} from "@react-native-material/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import { storeDataObject, isUniqueKey } from "../../AsyncStorageFunctions";
import SelectionMealList from "./Components/SelectionMealList";
export default PlanWeeklyMeal = ({ modalVisible, onPressCloseModal }) => {
    const daysOfWeekList = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const mealsTimeList = ["Breakfast", "Lunch", "Dinner"];

    const [dayMeal, setDayMeal] = useState(daysOfWeekList[0]);
    const [mealTime, setMealTime] = useState(mealsTimeList[0]);
    const [addMealModalVisible, setAddMealModalVisible] = useState(false);
    const [indexToTriggerRefresh, setIndexToTriggerRefresh] = useState(0);

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            transparent={true}
            statusBarTranslucent={false}
            onRequestClose={() => {
                onPressCloseModal();
            }}
        >
            <AddMealScreen
                modalVisible={addMealModalVisible}
                onPressCloseModal={() => {
                    setAddMealModalVisible(false);
                    setIndexToTriggerRefresh(indexToTriggerRefresh + 1);
                }}
            />
            <View style={styles.centeredView}>
                <KeyboardAwareScrollView style={styles.scrollView}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Plan Weekly Meal</Text>
                        <HStack m={4} spacing={6} style={{ marginVertical: 20 }}>
                            <Button
                                color="#146C94"
                                title={"Add Meal"}
                                onPress={() => {
                                    setAddMealModalVisible(true);
                                }}
                                trailing={(props) => <Ionicons name={"add"} {...props} />}
                            />
                            <Spacer />
                            <Button
                                color="#F6F1F1"
                                title={"Close Planner"}
                                onPress={() => {
                                    onPressCloseModal();
                                }}
                                trailing={(props) => <Ionicons name={"close"} {...props} />}
                            />
                        </HStack>

                        <View>
                            <ScrollView
                                horizontal={true}
                                style={{ marginTop: 5, marginBottom: 10 }}
                            >
                                {daysOfWeekList.map((day) => (
                                    <Button
                                        color={"#146C94"}
                                        variant={dayMeal === day ? "contained" : "text"}
                                        title={day.slice(0, 3)}
                                        key={day}
                                        onPress={() => {
                                            setDayMeal(day);
                                        }}
                                    />
                                ))}
                            </ScrollView>

                        </View>
                        <SelectionMealList
                            dayMeal={dayMeal}
                            setMealTime={setMealTime}
                            mealTime={mealTime}
                            mealsTimeList={mealsTimeList}
                            indexToTriggerRefresh={indexToTriggerRefresh}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    headingContainer: {
        paddingTop: 20,
        paddingBottom: 100,
    },
    centeredView: {
        backgroundColor: "rgba(20, 108, 148,0.3)",
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginBottom: -20,
        paddingTop: "40%",

        width: "100%",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        height: "80%",
    },
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: "#fff",
        padding: 20,
        width: "100%",
        borderRadius: 20,
    },

    heading: {
        fontSize: 24,
        fontWeight: 600,
        alignSelf: "center",
    },
});
