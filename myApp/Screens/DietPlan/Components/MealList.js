import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import MealCard from "./MealCard";

export default MealList = ({ mealsToday }) => {
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
