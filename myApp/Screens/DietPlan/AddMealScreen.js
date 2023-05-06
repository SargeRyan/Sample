import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, Image } from "react-native";
import { Button, Stack, TextInput, Avatar } from "@react-native-material/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";

export default AddMealScreen = ({ modalVisible, onPressCloseModal }) => {
  const defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/healtpilot.appspot.com/o/healthy-food.jpg?alt=media&token=9f6639b3-80e2-42d4-b50c-9dc24f61de77";
  const [mealToAdd, setMealToAdd] = useState({});
  const [mealImage, setMealImage] = useState(defaultImage);
  addMeal = () => {
    console.log(mealToAdd);
    // onPressCloseModal();
  };
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
        <KeyboardAwareScrollView
          style={styles.modalView}
          keyboardShouldPersistTaps={"always"}
        >
          <Text style={styles.modalText}>ADD MEAL</Text>
          <Stack spacing={6} keyboardShouldPersistTaps={"always"}>
            <Stack
              spacing={6}
              style={{ padding: 10, backgroundColor: "#F6F1F1" }}
            >
              <Avatar
                style={{ alignSelf: "center" }}
                size={100}
                image={{
                  uri: mealImage,
                }}
              />
              <Button
                color="#AFD3E2"
                compact={true}
                uppercase={false}
                title={"Set Meal Image (Optional)"}
                onPress={async () => {
                  // No permissions request is necessary for launching the image library
                  let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                  });

                  console.log(result);

                  if (!result.canceled) {
                    setMealImage(result.assets[0].uri);
                  }
                }}
              />
            </Stack>
            <TextInput
              label="Meal Name"
              color="#146C94"
              value={mealToAdd.mealName}
              onChangeText={(text) =>
                setMealToAdd({ ...mealToAdd, mealName: text })
              }
            />
            <TextInput
              label="Calories"
              color="#146C94"
              value={mealToAdd.calories}
              onChangeText={(text) =>
                setMealToAdd({ ...mealToAdd, calories: text })
              }
            />
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TextInput
                style={{ width: "50%" }}
                label="Quantity"
                color="#146C94"
                value={mealToAdd.quantity}
                onChangeText={(text) =>
                  setMealToAdd({ ...mealToAdd, quantity: text })
                }
              />
              <QuantityCurrency />
            </View>
            <Button color="#146C94" title={"Add Meal"} onPress={addMeal} />
          </Stack>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(20, 108, 148,0.3)",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: -20,
    paddingTop: "40%",
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#146C94",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

QuantityCurrency = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("pcs");
  const [items, setItems] = useState([
    { label: "pcs", value: "pcs" },
    { label: "g", value: "g" },
    { label: "cup", value: "cup" },
    { label: "tbsp", value: "tbsp" },
    { label: "tsp", value: "tsp" },
    { label: "lb", value: "lb" },
    { label: "kg", value: "kg" },
    { label: "gal", value: "gal" },
    { label: "oz", value: "oz" },
    { label: "ml", value: "ml" },
    { label: "l", value: "l" },
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
        zIndex={5000}
        zOrder={5000}
        dropDownDirection="TOP"
        style={{
          width: 150,
          color: "#fff",
        }}
      />
    </View>
  );
};
