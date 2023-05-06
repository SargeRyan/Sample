import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";
import MealList from "./Components/MealList";
import MealSettings from "./Components/MealSettings";
export default DietPlanScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <MealSettings></MealSettings>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Today Meals</Text>
          <MealTimeDropDown listMode="SCROLLVIEW" />
        </View>
        <MealList />
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
    padding: 20,
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

MealTimeDropDown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Breakfast");
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
