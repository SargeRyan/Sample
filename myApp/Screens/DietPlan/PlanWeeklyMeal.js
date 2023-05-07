import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
} from "react-native";
import { Button, Stack, TextInput, Avatar } from "@react-native-material/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import { storeDataObject, isUniqueKey } from "../../AsyncStorageFunctions";
import SelectionMealList from "./Components/SelectionMealList";
export default PlanWeeklyMeal = ({ modalVisible, onPressCloseModal }) => {
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
      <View style={styles.centeredView}>
        <KeyboardAwareScrollView style={styles.scrollView}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Plan Weely Meal</Text>
            <SelectionMealList />
            <Button
              title="Done Selecting"
              color="#F6F1F1"
              onPress={onPressCloseModal}
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
