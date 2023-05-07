import { Touchable, TouchableOpacity } from "react-native";
import {
  Text,
  View,
  Button,
  ScrollView,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { IMAGE } from "../ExercisePlan/image/PngItem_4039383.png";
import { render } from "react-dom";

export default ExercisePlanScreen = ({ navigation, route }) => {
  return (
    <ScrollView
      style={{
        backgroundColor: "#AFD3E2",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TouchableOpacity>
        <View style={styles.ExerciseContainer}>
          <Image
            style={styles.ExerciseImage}
            source={require("../ExercisePlan/image/pushups-758x474.png")}
          />
          <Text style={styles.TextContainer}>Push Ups</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.ExerciseContainer}>
          <Image
            style={styles.ExerciseImage}
            source={require("../ExercisePlan/image/sit-ups.jpg")}
          />
          <Text style={styles.TextContainer}>Sit Ups</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.ExerciseContainer}>
          <Image
            style={styles.ExerciseImage}
            source={require("../ExercisePlan/image/squat.jpeg")}
          />
          <Text style={styles.TextContainer}>Squat</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.ExerciseContainer}>
          <Image
            style={styles.ExerciseImage}
            source={require("../ExercisePlan/image/lunge.jpeg")}
          />
          <Text style={styles.TextContainer}>Lunges</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.ExerciseContainer}>
          <Image
            style={styles.ExerciseImage}
            source={require("../ExercisePlan/image/Jumpingjack.png")}
          />
          <Text style={styles.TextContainer}>Jumping Jacks</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.ExerciseContainer}>
          <Image
            style={styles.ExerciseImage}
            source={require("../ExercisePlan/image/plank.png")}
          />
          <Text style={styles.TextContainer}>Plank</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.ExerciseContainer}>
          <Image
            style={styles.ExerciseImage}
            source={require("../ExercisePlan/image/dumbbel.jpeg")}
          />
          <Text style={styles.TextContainer}>Dumbbell</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.ExerciseContainer}>
          <Image
            style={styles.ExerciseImage}
            source={require("../ExercisePlan/image/sideplank.jpeg")}
          />
          <Text style={styles.TextContainer}>Side Plank</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ExerciseContainer: {
    borderRadius: 10,
    height: 160,
    width: 350,
    backgroundColor: "#F6F1F1",
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    alignItems: "center",
    borderColor: "#146c94",
    borderWidth: 1,
    alignSelf: "center",
  },
  ExerciseImage: {
    height: 27,
    width: 345,
    flex: 1,
    borderRadius: 10,
    marginTop: 1,
  },
  TextContainer: {
    width: 350,
    height: 30,
    textAlign: "center",
    backgroundColor: "#146c94",
    borderRadius: 10,
    paddingVertical: 6,
    color: "white",
    fontWeight: "bold",
  },
});
