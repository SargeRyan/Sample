import { ca } from "date-fns/locale";
import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Modal,
  Pressable,
  Button,
} from "react-native";
import { Video } from "expo-av";
import { exerciseList } from "./component/exerciseList"; // Adjust the path accordingly

export default ExercisePlanScreen = ({ navigation, route }) => {
   return (
    <ScrollView>
     {exerciseList.map((exercise, index) => (
        <TouchableOpacity style={styles.touchable}>
        <View style = {styles.design}></View>
              <View style={styles.content}>
              <Image source={{ uri: exercise.mealImage }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style = {styles.header}>{exercise.mealName}</Text>
                <Text style = {styles.details}>Calories Burn: {exercise.caloriesBurn}</Text>
                <Text style={styles.details}>Duration: {exercise.duration} mins</Text>
              </View>
            </View>     
        </TouchableOpacity>
        ))}
    </ScrollView>

    
   );

};
const styles = StyleSheet.create({
     touchable: {
    height: 150,
    backgroundColor: '#FBF9F1',
    margin: 10,
    borderRadius: 10, // Set border radius
    shadowColor: '#000', // Set shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
   image: {
    flex: 1,
    width: 10,
    height: 130,
    marginRight: 20,
    resizeMode: "contain",
    borderRadius: 10,
  },
  content: {
    flexDirection: "row",
    margin: 10,
  },

  header : {
    fontSize: 16,
    marginBottom: 25,
    fontWeight: "bold"
  },
details : {
    marginBottom: 2,
},
design : {
    flex: 1,
    height: 5,
    width: 140,
    position: "absolute",
    backgroundColor: "#211C6A", 
    right: 13,
    top: 40,
    borderRadius: 20,
}
});