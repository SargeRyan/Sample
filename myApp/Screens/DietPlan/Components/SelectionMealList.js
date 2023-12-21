import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState, useEffect } from "react";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import MealCard from "./MealCard";
import {
    getMealsToday,
    getMealsSelection,
    mealDayToEat,
    storeDataObject,
    removeValue
} from "../../../AsyncStorageFunctions";
import SelectionMealCard from "./SelectionMealCard";
import { Button, Stack } from "@react-native-material/core";
import { newLocalMeals as localMeals } from "./LocalMeals.js";
import CollapsibleMeal from "./CollapsibleMeal";

export default SelectionMealList = ({ dayMeal, mealTime, setMealTime, mealsTimeList, indexToTriggerRefresh }) => {
    const [mealsSelection, setMealsSelection] = useState(localMeals);
    const [mealsToday, setMealsToday] = useState([]);


    useEffect(() => {
        fetchMeals();
    }, [dayMeal, mealTime, indexToTriggerRefresh]);

    const fetchMeals = async () => {
        const fetchMeals = await getMealsSelection();
        console.log("Meal Selection (Added by user) ===============", fetchMeals);
        const _mealsSelection = mealsSelection;
        _mealsSelection[0]["types"] = fetchMeals;
        console.log("_mealsSelection[0]", _mealsSelection[0]);
        setMealsSelection(_mealsSelection);

        // meals this time
        const mealsToday = await getMealsToday(dayMeal, mealTime);
        //console.log("Meals Today =========", mealsToday);
        setMealsToday(mealsToday);
    };

    return (
        <Stack>
            <View style={styles.headingContainer}>
                <ScrollView
                    horizontal={true}
                    style={{ marginTop: 5, marginBottom: 10 }}
                >
                    {mealsTimeList.map((currMealTime) => (
                        <Button
                            color={"#146C94"}
                            variant={currMealTime === mealTime ? "contained" : "text"}
                            title={currMealTime}
                            key={currMealTime}
                            onPress={() => {
                                setMealTime(currMealTime);
                            }}
                        />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.mealCardContainer}>
                {mealsSelection.map((parentMeal) => (
                    <CollapsibleView
                        title={<CollapsibleMeal mealData={parentMeal} />}
                        style={{ borderWidth: 0 }}
                    >
                        <View style={{ marginLeft: 30 }}>
                            {parentMeal.types.map((mealData) => (
                                <SelectionMealCard
                                    mealData={mealData}
                                    key={mealData.id}
                                    mealsToday={mealsToday}
                                    onToggleCheckFunction={async (isChecked, meal_id) => {
                                        if (isChecked) {
                                            let toAddMeal = mealData;
                                            toAddMeal["timeToEat"] = mealTime;
                                            toAddMeal["dayToEat"] = dayMeal;
                                            toAddMeal["meal_id"] = mealData.id;
                                            toAddMeal["id"] = `@meal_${toAddMeal["dayToEat"]}_${toAddMeal["timeToEat"]}_${mealData.mealName}`;
                                            await storeDataObject(
                                                toAddMeal["id"],
                                                toAddMeal
                                            );
                                        } else {
                                            await removeValue(meal_id);
                                        }
                                    }}
                                />
                            ))}
                        </View>
                    </CollapsibleView>
                ))}
            </View>
            {
                Object.keys(mealsSelection).length === 0 &&
                <View style={{
                    display: 'flex',
                }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 18,
                        }}>There is no meal selection Added</Text>
                        <Text style={{
                            fontSize: 20,
                        }}>Click the Add Meal Above</Text>
                    </View>
                    <Image style={{
                        width: "70%",
                        height: 200,
                        alignSelf: 'center'
                    }} source={require('../../../image/undraw_No_data_re_kwbl.png')} />
                </View>
            }
        </Stack>
    );
};

const styles = StyleSheet.create({
    mealCardContainer: {
        display: "flex",
        flexDirection: "column",
        paddingVertical: 20,
        paddingHorizontal: 5,
    },
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: "#fff",
        padding: 20,
    },
    headingContainer: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        overflow: "visible",
        flexWrap: "wrap",
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 18,
        fontWeight: 600,
        alignSelf: "center",
    },
});

MealTimeDropDown = ({ value, setValue }) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: "Breakfast", value: "Breakfast" },
        { label: "Mid Morning Snack", value: "morningSnack" },
        { label: "Lunch", value: "Lunch" },
        { label: "Mid Lunch Snack", value: "lunchSnack" },
        { label: "Dinner", value: "Dinner" },
        { label: "Midnight Snack", value: "midnightSnack" },
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
                labelStyle={{ fontWeight: 900, fontSize: 13 }}
            />
        </View>
    );
};
