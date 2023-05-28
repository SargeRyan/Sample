import { Touchable, TouchableOpacity } from "react-native";
import {
  Text,
  View,
  Button,
  ScrollView,
  Image,
  SafeAreaView,
  StyleSheet
} from "react-native";
import { IMAGE } from "../ExercisePlan/image/PngItem_4039383.png";
import { render } from "react-dom";
import { TextInput } from "@react-native-material/core";
import { useState } from "react";

export default BmiCalculator = ({ navigation, route }) => {
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [bmi, setBmi] = useState('')
    const [description, setDescription] = useState('')

    const calculateBmi = () => {
        const bmi = weight / ((height/100) * (height/100))
        setBmi(bmi.toFixed(1))

        if (bmi < 18.5){
            setDescription('Underweight')
        }
         else if (bmi >= 18.5 && bmi <= 24.9){
            setDescription('Normal')
        }
        else if (bmi >= 25 && bmi <= 29.9){
            setDescription('Overweight')
        }
          else if (bmi >= 30){
            setDescription('Obese')
        }
    }

  return (

  
    <ScrollView style={{backgroundColor: "#f9eed9"}}>
    <View>
        <Image
          style={styles.imageTitleHeader}
          source={require("../Dashboard/image/logo.png")}
        />
      </View>
    <Text style={{alignSelf: "center", fontSize: 20}}>Body Mass Index Calculator</Text>
    <View style={styles.genderContainer}>
    <Image
          style={styles.genderImageContainer}
          source={require("../Dashboard/image/PngItem_4039383.png")}
        />
        <TextInput
        style={styles.genderTextContainer}
        value={weight}
        onChangeText={(text) => setWeight(text)}
        placeholder="Weight in kg"
        keyboardType="numeric"
        >
        </TextInput>
        </View>


    <View style={styles.HeightTextContainer}>

    <Image
          style={styles.genderImageContainer}
          source={require("../Dashboard/image/computer-icons-ruler-pictogram-length-clip-art-ruler-1ccf0d3be8bd9cc8eeb2db1c88611e1a.png")}
        />
          <TextInput
          style={styles.genderTextContainer}
        value={height}
        onChangeText={(text) => setHeight(text)}
        placeholder="Height in cm"
        keyboardType="numeric"
        >
        </TextInput>
        </View>     
        
          <TouchableOpacity style = {styles.appButtonContainer} onPress={calculateBmi}>
          <Text style = {styles.appButtonText}>Calculate</Text>
          </TouchableOpacity>
         

           <View style={{alignSelf: "center", flexDirection: "row", marginTop: 20,}}>
                <Text style={{alignSelf: "center"}}>BMI: </Text>
                <Text style={{alignSelf: "center"}}>{bmi}</Text>
        </View> 
           <View style={{alignSelf: "center", flexDirection: "row"}}>
                <Text style={{alignSelf: "center"}}>Classification: </Text>
                <Text style={{alignSelf: "center"}}>{description}</Text>
        </View> 
        
    </ScrollView>
      
  );
};

const styles = StyleSheet.create({
imageTitleHeader: {
    marginTop: 30,
    width: 240,
    height: 240,
    alignSelf: "center"
  },
appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 20,
    width: 340,
    paddingVertical: 11,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },

HeightTextContainer: {

    flexDirection: "row",
    borderBottomColor: "#ccc",
    marginBottom: 15,
    backgroundColor: "#f9eed9",
    borderRadius: 18,
    width: 320,
    height: 70,
    alignSelf: "center",  
},

genderTextContainer: {
   marginLeft: 10,
   height: 5,
   width: 250,
   marginTop: 7,
   backgroundColor:"#f9eed9",

  },
genderContainer: {
    marginTop: 20,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    marginBottom: 15,
    backgroundColor: "#f9eed9",
    borderRadius: 18,
    width: 320,
    height: 70,
    alignSelf: "center",
  },
 genderImageContainer: {
    marginTop: 20,
    height: 25,
    marginRight: 12,
    width: 25,
    marginLeft: 16,
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
