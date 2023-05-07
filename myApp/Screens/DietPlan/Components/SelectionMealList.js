import { StyleSheet, View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState, useEffect } from "react";
import MealCard from "./MealCard";
import {
  getMealsToday,
  getMealsSelection,
  mealDayToEat,
} from "../../../AsyncStorageFunctions";
import SelectionMealCard from "./SelectionMealCard";
import { Button, Stack } from "@react-native-material/core";

export default SelectionMealList = () => {
  const [mealsSelection, setMealsSelection] = useState([]);
  const [mealsToday, setMealsToday] = useState([]);

  const [value, setValue] = useState("Breakfast");

  useEffect(() => {
    const fetchMeals = async () => {
      const mealsSelection = await getMealsSelection();
      console.log(mealsSelection);
      setMealsSelection(mealsSelection);

      // meals this time
      const mealsToday = await getMealsToday(mealDayToEat.monday, value);
      console.log(mealsToday);
      setMealsToday(mealsToday);
    };
    fetchMeals();
  }, []);

  return (
    <Stack>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Select Meal For:</Text>
        <MealTimeDropDown
          value={value}
          setValue={setValue}
          listMode="SCROLLVIEW"
        />
      </View>
      <View style={styles.mealCardContainer}>
        {mealsSelection.map((meal) => (
          <SelectionMealCard
            mealData={meal}
            key={meal.id}
            timeToEat={value}
            dayToEat={mealDayToEat.monday}
          />
        ))}
      </View>
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
        labelStyle={{ fontWeight: 900, fontSize: 13 }}
      />
    </View>
  );
};
