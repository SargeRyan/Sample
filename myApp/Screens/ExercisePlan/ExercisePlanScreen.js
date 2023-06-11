import React, { useState, useEffect } from 'react';
import { ScrollView, 
          StyleSheet, 
          TouchableOpacity, 
          View, 
          Text, 
          Image, 
          Modal, 
          Pressable,
          Button,} from 'react-native';


export default ExercisePlanScreen = ({ navigation, route }) => {

  //Exercise Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [modalVisible5, setModalVisible5] = useState(false);
    const [modalVisible6, setModalVisible6] = useState(false);
    const [modalVisible7, setModalVisible7] = useState(false);
    const [modalVisible8, setModalVisible8] = useState(false);
    const [modalVisible9, setModalVisible9] = useState(false);
    const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  //Exercise Count 
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleStart = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };
  const resetStart = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(false);
   
  };
  
   
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
               <Image style={styles.ImageContainerInfo} source={require("../ExercisePlan/picture/jogging.gif")}/>
              <ScrollView>
                  <View style={{backgroundColor: "#AFD3E2", height: 1300, borderRadius: 20}}>
                      <Text style={{marginLeft: 20, fontSize: 25, fontWeight: "bold", marginTop: 10}}>Jogging</Text>
                 {/*Exercise Timer*/}
                 <View style={{flexDirection: "row"}}>
                 <View style= {{backgroundColor: "#adadc9", width: 80, alignItems: "center", height: 30, borderRadius: 20, marginLeft: 10}}>
                      <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4}}>
                      {count > 0 ? formatTime(count) : 'Countdown Finished'}
                      </Text>
                 </View>     
                    <View style= {{backgroundColor: "#adadc9", width: 140, alignItems: "center", height: 30, borderRadius: 20, marginLeft: 10}}>
                      <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4}}>
                            Calories Burn: 93
                      </Text>
                   </View> 
                </View>
                        {!isRunning ? (
                <Button style={{backgroundColor: "green"}} title="Start Countdown" onPress={handleStart} />
             ) : (
                 <Button title="Stop Countdown" onPress={handleStop} />
              )}
                 <Button title="Reset" onPress={resetStart} />


    </View>
              </ScrollView>
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

              {/*  //Third Exercise */}
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
              <Text>Light Dumbbell</Text>
              </View>
    </Modal>

{/*  //Fourth Exercise */}
  <TouchableOpacity style={styles.ButtonContainer} onPress={() => setModalVisible3(true)}>
    <View style={styles.exerciseContainer}>
      <View style={styles.textContainer}>
      <Text style= {styles.textHeaderContainer}>Jumping Jack</Text>
      <Text>Calories Burn: 80</Text>
        <Text>Duration: 10 Minutes</Text>
      </View>
      <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/jumping-jack-icegif.gif")}/>
      </View>
    </TouchableOpacity>
    
        <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible3}
              onRequestClose={() => {
                  setModalVisible3(!modalVisible3);
              }}>
              <View>
              <Text>Jumping Jack</Text>
              </View>
    </Modal>
            
              {/* Fifth Exercise */}
      <TouchableOpacity style={styles.ButtonContainer} onPress={() => setModalVisible4(true)}>
    <View style={styles.exerciseContainer}>
      <View style={styles.textContainer}>
      <Text style= {styles.textHeaderContainer}>Hip Rotation</Text>
      <Text>Calories Burn: 20</Text>
        <Text>Duration: 3 Minutes</Text>
      </View>
      <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/hip-circles-exercise-illustration.gif")}/>
      </View>
    </TouchableOpacity>
          <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible4}
              onRequestClose={() => {
                  setModalVisible4(!modalVisible4);
              }}>
              <View>
              <Text>Hip Rotation</Text>
              </View>
    </Modal>
      {/* sixth Exercise */}
      <TouchableOpacity style={styles.ButtonContainer} onPress={() => setModalVisible5(true)}>
    <View style={styles.exerciseContainer}>
      <View style={styles.textContainer}>
      <Text style= {styles.textHeaderContainer}>Head Rotation</Text>
      <Text>Calories Burn: 10</Text>
        <Text>Duration: 3 Minutes</Text>
      </View>
      <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/neck.gif")}/>
      </View>
    </TouchableOpacity>
        <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible5}
              onRequestClose={() => {
                  setModalVisible5(!modalVisible5);
              }}>
              <View>
              <Text>Head Rotation</Text>
              </View>
    </Modal>
      {/* seventh Exercise */}
      <TouchableOpacity style={styles.ButtonContainer} onPress={() => setModalVisible6(true)}>
    <View style={styles.exerciseContainer}>
      <View style={styles.textContainer}>
      <Text style= {styles.textHeaderContainer}>Arm Rotation</Text>
      <Text>Calories Burn: 93</Text>
        <Text>Duration: 10 Minutes</Text>
      </View>
      <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/arm-circles-exercise-illustration.gif")}/>
      </View>
    </TouchableOpacity>
        <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible6}
              onRequestClose={() => {
                  setModalVisible6(!modalVisible6);
              }}>
              <View>
              <Text>Arm Rotation</Text>
              </View>
    </Modal>
      {/* eighth Exercise */}
      <TouchableOpacity style={styles.ButtonContainer } onPress={() => setModalVisible7(true)}>
    <View style={styles.exerciseContainer}>
      <View style={styles.textContainer}>
      <Text style= {styles.textHeaderContainer}>Knee Rotation</Text>
      <Text>Calories Burn: 93</Text>
        <Text>Duration: 10 Minutes</Text>
      </View>
      <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/knee-circles-exercise-illustration.gif")}/>
      </View>
    </TouchableOpacity>

        <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible7}
              onRequestClose={() => {
                  setModalVisible7(!modalVisible7);
              }}>
              <View>
              <Text>Knee Rotation</Text>
              </View>
    </Modal>
      {/* ninth Exercise */}
      <TouchableOpacity style={styles.ButtonContainer} onPress={() => setModalVisible8(true)}>
    <View style={styles.exerciseContainer}>
      <View style={styles.textContainer}>
      <Text style= {styles.textHeaderContainer}>Standing March</Text>
      <Text>Calories Burn: 93</Text>
        <Text>Duration: 10 Minutes</Text>
      </View>
      <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/march-in-place-exercise-illustration.gif")}/>
      </View>
    </TouchableOpacity>
        <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible8}
              onRequestClose={() => {
                  setModalVisible8(!modalVisible8);
              }}>
              <View>
              <Text>Standing March</Text>
              </View>
    </Modal>
      {/* tenth Exercise */}
      <TouchableOpacity style={styles.ButtonContainer} onPress={() => setModalVisible9(true)}>
    <View style={styles.exerciseContainer}>
      <View style={styles.textContainer}>
      <Text style= {styles.textHeaderContainer}>Shoulder Roll</Text>
      <Text>Calories Burn: 93</Text>
        <Text>Duration: 10 Minutes</Text>
      </View>
      <Image style={styles.ImageContainer} source={require("../ExercisePlan/picture/march-in-place-exercise-illustration.gif")}/>
      </View>
    </TouchableOpacity>
      <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible9}
              onRequestClose={() => {
                  setModalVisible9(!modalVisible9);
              }}>
              <View>
              <Text>Shoulder Roll</Text>
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
      ImageContainerInfo : {
        height: 200,
        width: 170,
        borderRadius: 10,
        resizeMode: "stretch",
        alignSelf: "center"
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
