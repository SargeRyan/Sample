import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Button,
  Image,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default DietPlanScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Today Meals</Text>
          <MealTimeDropDown listMode="SCROLLVIEW" />
        </View>
        <View style={styles.mealCardContainer}>
          <View style={[styles.card, styles.shadowProp]}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View
                  style={{
                    height: 70,
                    width: 80,
                    marginRight: 10,
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    style={{ width: 80, borderRadius: 8, height: 70 }}
                    source={require("../../image/pandesal.jpg")}
                  />
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <Text style={{ fontSize: 20, width: 150 }}>Pandesal </Text>
                  <View>
                    <Text style={{ fontSize: 14 }}>3 pcs</Text>
                    <Text style={{ fontSize: 14 }}>100 kcal</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name={"checkmark-circle"}
                  size={40}
                  color={"green"}
                  style={{ alignSelf: "center" }}
                />
              </View>
            </View>
          </View>
        </View>
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
  },
  heading: {
    fontSize: 24,
    fontWeight: 600,
    alignSelf: "center",
  },
  mealCardContainer: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 14,
    width: "100%",
    alignSelf: "center",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    bprderRadius: 8,
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
