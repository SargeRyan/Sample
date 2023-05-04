import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
TouchableOpacity.defaultProps = { ActiveOpacity: 0.8 };

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);
export default CompleteProfileScreen = ({ setShowMainScreen }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {/*Logo*/}
      <View>
        <Image
          style={styles.imageTitleHeader}
          source={require("../image/logo.png")}
        />
      </View>

      <Text style={styles.textTitleHeader}>Let's complete your profile</Text>

      <Text style={styles.subTitleText}>
        It will help us to know about you!
      </Text>

      <View style={styles.genderContainer}>
        <Image
          style={styles.genderImageContainer}
          source={require("../image/gender.png")}
        />

        <TextInput
          placeholder="Gender"
          style={styles.genderTextContainer}
        ></TextInput>
      </View>

      <View style={styles.birthDateContainer}>
        <Image
          style={styles.birthDateImageContainer}
          source={require("../image/calendar.png")}
        />

        <TextInput
          placeholder="Birth Date"
          style={styles.birthDateTextContainer}
        ></TextInput>
      </View>

      <View style={styles.weightContainer}>
        <Image
          style={styles.weightImageContainer}
          source={require("../image/PngItem_4039383.png")}
        />

        <TextInput
          placeholder="Weight(Kilograms/kg)"
          style={styles.WeightTextContainer}
        ></TextInput>
      </View>

      <View style={styles.heightContainer}>
        <Image
          style={styles.heightImageContainer}
          source={require("../image/computer-icons-ruler-pictogram-length-clip-art-ruler-1ccf0d3be8bd9cc8eeb2db1c88611e1a.png")}
        />

        <TextInput
          placeholder="Height(Centimeter/cm)"
          style={styles.heightTextContainer}
        ></TextInput>
      </View>

      <View style={styles.screenContainer}>
        <AppButton
          title="Create Account"
          onPress={() => setShowMainScreen(false)}
        ></AppButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageTitleHeader: {
    marginTop: 50,
    width: 240,
    height: 240,
  },

  subTitleText: {
    fontSize: 13,
    marginBottom: 20,
  },

  textTitleHeader: {
    fontSize: 25,
    fontWeight: "900",
  },

  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 20,
    width: 340,
    paddingVertical: 11,
    paddingHorizontal: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },

  genderContainer: {
    marginTop: 5,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    marginBottom: 15,
    backgroundColor: "#f9eed9",
    borderRadius: 18,
    width: 320,
    height: 50,
  },
  genderImageContainer: {
    marginTop: 13,
    height: 25,
    marginRight: 12,
    width: 25,
    marginLeft: 16,
  },
  genderTextContainer: {
    marginRight: 5,
    flex: 1,
    borderRadius: 12,
    height: 35,
    fontSize: 17,
    marginTop: 6,
  },
  birthDateContainer: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    marginBottom: 15,
    backgroundColor: "#f9eed9",
    borderRadius: 18,
    width: 320,
    height: 50,
  },
  birthDateImageContainer: {
    marginTop: 13,
    height: 25,
    marginRight: 12,
    width: 25,
    marginLeft: 17,
  },
  birthDateTextContainer: {
    marginRight: 5,
    flex: 1,
    borderRadius: 12,
    height: 35,
    fontSize: 17,
    marginTop: 6,
  },
  weightContainer: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    marginBottom: 12,
    backgroundColor: "#f9eed9",
    borderRadius: 18,
    width: 320,
    height: 50,
  },
  weightImageContainer: {
    marginTop: 9,
    height: 30,
    marginRight: 12,
    width: 33,
    marginLeft: 13,
  },
  WeightTextContainer: {
    marginRight: 5,
    flex: 1,
    borderRadius: 12,
    height: 35,
    fontSize: 17,
    marginTop: 6,
  },
  heightContainer: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    marginBottom: 12,
    backgroundColor: "#f9eed9",
    borderRadius: 18,
    width: 320,
    height: 50,
  },
  heightImageContainer: {
    marginTop: 10,
    height: 30,
    marginRight: 12,
    width: 30,
    marginLeft: 16,
  },
  heightTextContainer: {
    marginRight: 5,
    flex: 1,
    borderRadius: 12,
    height: 35,
    fontSize: 17,
    marginTop: 6,
  },
});
