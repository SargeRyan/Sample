import { Touchable, TouchableOpacity } from "react-native";
import {
  Text,
  View,
  Button,
  ScrollView,
  Image,
  SafeAreaView,
  StyleSheet,
  Modal
} from "react-native";
import { IMAGE } from "../ExercisePlan/image/PngItem_4039383.png";
import { render } from "react-dom";
import { TextInput } from "@react-native-material/core";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default BmiCalculator = ({ navigation, route }) => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const[gender, setGender]= useState('');
    const [bmi, setBmi] = useState('')
    const [description, setDescription] = useState('')
    const [userData, setUserData] = useState(null);
    const [calories, setCalories] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


   useEffect(() => {
    const getData = async () => {
      try {
        // Retrieve data using AsyncStorage
        const heightValue = await AsyncStorage.getItem('height');
        const weightValue = await AsyncStorage.getItem('weight');
        const genderValue = await AsyncStorage.getItem('gender');

        // Update state with retrieved data
        setHeight(heightValue);
        setWeight(weightValue);
        setGender(genderValue);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);


    const calculateBmi = () => {
      

        const bmi = userData.weight / ((userData.height/100) * (userData.height/100))
        setBmi(bmi.toFixed(1))
       
        if (bmi < 18.5){
            setDescription('UNDERWEIGHT')
        }
         else if (bmi >= 18.5 && bmi <= 24.9){
            setDescription('NORMAL')
        }
        else if (bmi >= 25 && bmi <= 29.9){
            setDescription('OVERWEIGHT')
        }
          else if (bmi >= 30){
            setDescription('OBESE')
        }
         setModalVisible(true);
    }


       useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Retrieve the stored data from AsyncStorage
      const storedData = await AsyncStorage.getItem('userData');

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };

  return (
    <ScrollView style={{backgroundColor: "#f9eed9"}}>
     <View>
      {userData && (
        <View> 
      <View style={{width: 150, left: 200, marginTop: 40}}>
          <Text style= {{fontSize: 20, fontWeight: "bold", }}>Gender</Text>
          <TextInput style= {{width: 150, alignSelf: "center"}} value={userData.gender}></TextInput>
        </View>

         <View style={{width: 150, left: 200, marginTop: 40}}>
          <Text style= {{fontSize: 20, fontWeight: "bold", }}>Age</Text>
          <TextInput style= {{width: 150, alignSelf: "center"}} value={userData.age}></TextInput>
        </View>

         <View style={{width: 150, left: 200, marginTop: 40}}>
          <Text style= {{fontSize: 20, fontWeight: "bold", }}>Height</Text>
          <TextInput style= {{width: 150, alignSelf: "center"}} value={userData.height}></TextInput>
        </View>

        <View style={{width: 150, left: 200, marginTop: 40}}>
          <Text style= {{fontSize: 20, fontWeight: "bold", }}>Weight</Text>
          <TextInput style= {{width: 150, alignSelf: "center"}} value={userData.weight}></TextInput>
        </View>
        
        <TouchableOpacity  style={{backgroundColor: "#009688", height: 50, width: 300, alignSelf: "center", marginTop: 15, borderRadius: 20}} onPress={calculateBmi}>
          <Text style={{alignSelf: "center", marginTop: 10, fontSize: 20, fontWeight: "bold", color:"#fff"}}>Calculate</Text>
        </TouchableOpacity>

    <Modal visible={modalVisible} animationType="slide">
<ScrollView style= {{backgroundColor: "#f9eed9"}}>
        <View style={{height: 70, backgroundColor: "#fff", flexDirection: "row", borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Image
                    style={{height: 20, width: 27, marginTop: 25, marginLeft: 10}}
                    source={require("../Dashboard/image/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png")}
                />
          </TouchableOpacity> 
            <Text style={{fontSize: 20, fontWeight: "bold", marginLeft: 10, marginTop: 22, }}>CALCULATION RESULT</Text>
        </View>
        
        <View style={{alignSelf: "center", marginTop: 80}}>
          <Text style= {{fontSize: 20, fontWeight: "bold"}}>BMI SCORE</Text>
        </View>

          <View style={{alignSelf: "center", marginTop: 20}}>
       <Text style= {{fontSize: 70, fontWeight: "bold", alignSelf: "center", marginRight: 10}}>{bmi}</Text>
         <Text style= {{fontSize: 20, fontWeight: "bold", alignSelf: "center", marginRight: 10}}>{description}</Text>
        </View>

        <View style={{alignSelf: "center", marginTop: 40, flexDirection: "row"}}>
        <Text style= {{fontSize: 15, fontWeight: "bold", alignSelf: "center", marginRight: 10}}>GENDER: </Text>
         <Text style= {{fontSize: 15, fontWeight: "bold", alignSelf: "center", marginRight: 10}}>{userData.gender}</Text>
        </View>
        
        <View style={{alignSelf: "center", marginTop: 20, flexDirection: "row"}}>
        <Text style= {{fontSize: 15, fontWeight: "bold", alignSelf: "center", marginRight: 10}}>AGE: </Text>
         <Text style= {{fontSize: 15, fontWeight: "bold", alignSelf: "center", marginRight: 10}}>{userData.age}</Text>
        </View>

         <View style={{alignSelf: "center", marginTop: 20, flexDirection: "row"}}>
        <Text style= {{fontSize: 15, fontWeight: "bold", alignSelf: "center", marginRight: 10}}>HEIGHT: </Text>
         <Text style= {{fontSize: 15, fontWeight: "bold", alignSelf: "center", marginRight: 10}}>{userData.height}</Text>
        </View>

         <View style={{alignSelf: "center", marginTop: 20, flexDirection: "row"}}>
        <Text style= {{fontSize: 15, fontWeight: "bold", alignSelf: "center", marginRight: 10}}>WEIGHT: </Text>
         <Text style= {{fontSize: 15, fontWeight: "bold", alignSelf: "center", marginRight: 10}}>{userData.weight}</Text>
        </View>
        
</ScrollView>
        
      </Modal>

       <View style = {{position: "absolute", height: 600}}>
                
                <Image
                    style={{height: 410, width: 142, top: 70, left: 40}}
                    source={require("../Dashboard/image/pngaaa.com-1130346.png")}
                />
            </View>
        

        </View>
      )}
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
