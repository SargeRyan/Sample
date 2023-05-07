import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import MealList from "./Components/MealList";
import MealSettings from "./Components/MealSettings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  mealDayToEat,
  mealTimeToEat,
  getMealsToday,
} from "../../AsyncStorageFunctions";
export default DietPlanScreen = ({ navigation, route }) => {
  const [value, setValue] = useState("Breakfast");
  const [mealsToday, setMealsToday] = useState([]);

  const fetchMeals = async () => {
    setMealsToday([]);
    const mealsToday = await getMealsToday(mealDayToEat.monday, value);
    console.log(mealsToday);
    setMealsToday(mealsToday);
  };
  useEffect(() => {
    fetchMeals();
  }, [value]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <MealSettings fetchMeals={fetchMeals}></MealSettings>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Today Meals</Text>
          <MealTimeDropDown value={value} setValue={setValue} />
        </View>
        <MealList mealsToday={mealsToday} />
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
    fontSize: 24,
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
