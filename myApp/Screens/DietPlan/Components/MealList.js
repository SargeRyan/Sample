import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import MealCard from "./MealCard";
import {
  mealDayToEat,
  mealTimeToEat,
  getMealsToday,
} from "../../../AsyncStorageFunctions";

export default MealList = () => {
  const [mealsToday, setMealsToday] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const mealsToday = await getMealsToday(
        mealDayToEat.monday,
        mealTimeToEat.breakfast
      );
      console.log(mealsToday);
      setMealsToday(mealsToday);
    };
    fetchMeals();
  }, []);

  return (
    <View style={styles.mealCardContainer}>
      {mealsToday.map((meal) => (
        <MealCard mealData={meal} key={meal.id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mealCardContainer: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
});
