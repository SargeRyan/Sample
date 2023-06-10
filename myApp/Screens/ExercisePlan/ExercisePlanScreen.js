import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Image, Modal, Pressable } from 'react-native';


export default ExercisePlanScreen = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
     

    return (
         <ScrollView
      style={{
        backgroundColor: "#AFD3E2",
        display: "flex",
        flexDirection: "column",
      }}
    >
  {/*  //First Exercise */}
     <TouchableOpacity style={styles.ButtonContainer} onPress={() => setModalVisible(true)}>
      
      <View style={styles.exerciseContainer}>
        <View style={styles.textContainer}>
        <Text style= {styles.textHeaderContainer}>Jogging</Text>
        <Text>Calories Burn: 93</Text>
         <Text>Duration: 10 Minutes</Text>
        </View>
        <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/jogging.gif")}/>
        </View>
     </TouchableOpacity>

      <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {

                    setModalVisible(!modalVisible);
                }}>
                <View>
                  <Text>Jogging</Text>
                </View>
      </Modal>

        {/*  //Second Exercise */}
    <TouchableOpacity style={styles.ButtonContainer} onPress={() => setModalVisible1(true)}>
      <View style={styles.exerciseContainer}>
        <View style={styles.textContainer}>
        <Text style= {styles.textHeaderContainer}>Walking</Text>
        <Text>Calories Burn: 67</Text>
         <Text>Duration: 10 Minutes</Text>
        </View>
        <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/exercise-walk.gif")}/>
        </View>
     </TouchableOpacity>

         <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible1}
                onRequestClose={() => {
                    setModalVisible1(!modalVisible1);
                }}>
                <View>
                <Text>Walking</Text>
                </View>
      </Modal>

                {/*  //Second Exercise */}
  <TouchableOpacity style={styles.ButtonContainer} onPress={() => setModalVisible2(true)}>
      <View style={styles.exerciseContainer}>
        <View style={styles.textContainer}>
        <Text style= {styles.textHeaderContainer}>Light Dumbbell</Text>
        <Text>Calories Burn: 36</Text>
         <Text>Duration: 10 Minutes</Text>
        </View>
        <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/Front-Raise-2.gif.pagespeed.ce.ZJdDV-2er6.gif")}/>
        </View>
     </TouchableOpacity>
     
         <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible2}
                onRequestClose={() => {
                    setModalVisible2(!modalVisible2);
                }}>
                <View>
                <Text>Walking</Text>
                </View>
      </Modal>







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
