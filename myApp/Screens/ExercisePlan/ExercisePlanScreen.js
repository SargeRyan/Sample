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

  const [modalVisible, setModalVisible] = useState(false);
   const [modalVisible1, setModalVisible1] = useState(false);
  
  //first Modal
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
 
  //2nd Modal
  const openModal1 = () => {
    setModalVisible1(true);
  };

  const closeModal1 = () => {
    setModalVisible1(false);
  };


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
        <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/jogging.gif")}/>
        </View>
     </TouchableOpacity>

     <TouchableOpacity style={styles.ButtonContainer}>
      <View style={styles.exerciseContainer}>
        <View style={styles.textContainer}>
        <Text style= {styles.textHeaderContainer}>Walking</Text>
        <Text>Calories Burn: 67</Text>
         <Text>Duration: 10 Minutes</Text>
        </View>
        <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/exercise-walk.gif")}/>
        </View>
     </TouchableOpacity>

     <TouchableOpacity style={styles.ButtonContainer}>
      <View style={styles.exerciseContainer}>
        <View style={styles.textContainer}>
        <Text style= {styles.textHeaderContainer}>Light Dumbbell</Text>
        <Text>Calories Burn: 36</Text>
         <Text>Duration: 10 Minutes</Text>
        </View>
        <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/Front-Raise-2.gif.pagespeed.ce.ZJdDV-2er6.gif")}/>
        </View>
     </TouchableOpacity>

     <TouchableOpacity style={styles.ButtonContainer}>
      <View style={styles.exerciseContainer}>
        <View style={styles.textContainer}>
        <Text style= {styles.textHeaderContainer}>Jumping Jack</Text>
        <Text>Calories Burn: 80</Text>
         <Text>Duration: 10 Minutes</Text>
        </View>
        <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/jumping-jack-icegif.gif")}/>
        </View>
     </TouchableOpacity>

     <TouchableOpacity style={styles.ButtonContainer}>
      <View style={styles.exerciseContainer}>
        <View style={styles.textContainer}>
        <Text style= {styles.textHeaderContainer}>Hip Rotation</Text>
        <Text>Calories Burn: 20</Text>
         <Text>Duration: 3 Minutes</Text>
        </View>
        <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/hip-circles-exercise-illustration.gif")}/>
        </View>
     </TouchableOpacity>

     <TouchableOpacity style={styles.ButtonContainer}>
      <View style={styles.exerciseContainer}>
        <View style={styles.textContainer}>
        <Text style= {styles.textHeaderContainer}>Head Rotation</Text>
        <Text>Calories Burn: 10</Text>
         <Text>Duration: 3 Minutes</Text>
        </View>
        <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/neck.gif")}/>
        </View>
     </TouchableOpacity>

     <TouchableOpacity style={styles.ButtonContainer}>
      <View style={styles.exerciseContainer}>
        <View style={styles.textContainer}>
        <Text style= {styles.textHeaderContainer}>Arm Rotation</Text>
        <Text>Calories Burn: 93</Text>
         <Text>Duration: 10 Minutes</Text>
        </View>
        <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/arm-circles-exercise-illustration.gif")}/>
        </View>
     </TouchableOpacity>

     <TouchableOpacity style={styles.ButtonContainer}>
      <View style={styles.exerciseContainer}>
        <View style={styles.textContainer}>
        <Text style= {styles.textHeaderContainer}>Knee Rotation</Text>
        <Text>Calories Burn: 93</Text>
         <Text>Duration: 10 Minutes</Text>
        </View>
        <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/knee-circles-exercise-illustration.gif")}/>
        </View>
     </TouchableOpacity>

     <TouchableOpacity style={styles.ButtonContainer}>
      <View style={styles.exerciseContainer}>
        <View style={styles.textContainer}>
        <Text style= {styles.textHeaderContainer}>Standing March</Text>
        <Text>Calories Burn: 93</Text>
         <Text>Duration: 10 Minutes</Text>
        </View>
        <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/march-in-place-exercise-illustration.gif")}/>
        </View>
     </TouchableOpacity>

     <TouchableOpacity style={styles.ButtonContainer}>
      <View style={styles.exerciseContainer}>
        <View style={styles.textContainer}>
        <Text style= {styles.textHeaderContainer}>Shoulder Roll</Text>
        <Text>Calories Burn: 93</Text>
         <Text>Duration: 10 Minutes</Text>
        </View>
        <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/shoulder-rolls-exercise-illustration.gif")}/>
        </View>
     </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

    ImageContainer : {
        height: 100,
        width: 90,
        borderRadius: 10,
        marginLeft: 40,
        resizeMode: "stretch"
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
        marginTop: 5
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
