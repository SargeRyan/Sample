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
import be from "date-fns/locale/be";

export default ExercisePlanScreen = ({ navigation, route }) => {
  return (
    <ScrollView
      style={{
        backgroundColor: "#AFD3E2",
        display: "flex",
        flexDirection: "column",
      }}
    >
     <TouchableOpacity style={styles.ButtonContainer}>
      <View style={styles.exerciseContainer}>
        <View style={styles.textContainer}>
        <Text style= {styles.textHeaderContainer}>Jogging</Text>
        <Text>Calories Burn: 93</Text>
         <Text>Duration: 10 Minutes</Text>
        </View>
        <Image style={styles.ImageContainer} source={require("../ExercisePlan/image/plank.png")}/>
        </View>
     </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

    ImageContainer : {
        height: 90,
        width: 130,
        borderRadius: 10,
        marginLeft: 20
      },
      ButtonContainer: {
        backgroundColor: "#fff",
        height: 110,
        width: 320,
        alignSelf: "center",
        alignItems: "center",
        margin: 10,
        borderRadius: 10,
      
      },
      exerciseContainer : {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
      },
      textContainer: {
        marginRight: 20,
      },
      textHeaderContainer: {
        marginBottom: 10,
        marginTop: -5,
        fontSize: 20,
        fontWeight: "bold"
      },
      
});
