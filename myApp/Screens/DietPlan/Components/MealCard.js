import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { storeDataObject, removeValue } from "../../../AsyncStorageFunctions";

export default MealCard = ({ mealData, setIndexRefresh }) => {
  const [isChecked, setChecked] = useState(mealData.isChecked);
  const toggleChecked = async () => {
    setChecked(!isChecked);
    const currentCheckStatus = !isChecked;
    mealData.isChecked = currentCheckStatus;
    const d = new Date();
    let day = d.getDay()
    mealData.eatenDate = day;
    mealData.eatenTime = d.getTime();
    mealData.eatenDateTime = d.toString();


    if (currentCheckStatus) {
      await storeDataObject(`eaten_${day}_${mealData.id}`, mealData);
    } else {
      await removeValue(`eaten_${day}_${mealData.id}`);
    }

    await storeDataObject(mealData.id, mealData); // store the meal data as mark as checked
    //console.log("Checked========", mealData.id);
    setIndexRefresh();
  };

  return (
    <TouchableHighlight
      onPress={toggleChecked}
      activeOpacity={0.9}
      style={{ marginVertical: 5 }}
    >
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
                source={{
                  uri: mealData.mealImage,
                }}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Text style={{ fontSize: 20, width: 150 }}>
                {mealData.mealName}
              </Text>
              <View>
                <Text style={{ fontSize: 14 }}>{mealData.quantity} {mealData.quantityCurrency}</Text>
                <Text style={{ fontSize: 14 }}>{mealData.calories} kcal</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {isChecked ? (
              <Ionicons
                name={"checkmark-circle"}
                size={40}
                color={"green"}
                style={{ alignSelf: "center" }}
              />
            ) : (
              <Ionicons
                name={"checkmark-circle-outline"}
                size={40}
                color={"grey"}
                style={{ alignSelf: "center" }}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
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
