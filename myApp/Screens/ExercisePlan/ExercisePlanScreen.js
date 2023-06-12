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
    setCount(1800); // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };
  const resetStart = () => {
    setCount(1800); // 10 minutes in seconds
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
              <TouchableOpacity style={{marginTop: 20, position: "absolute", marginLeft: 20}} onPress={() => setModalVisible(false)}>
                <Image style={{ height: 20, width: 25, resizeMode: "stretch"}} source={require("../ExercisePlan/picture/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png")}/>  
              </TouchableOpacity>
              
               <Image style={styles.ImageContainerInfo} source={require("../ExercisePlan/picture/jogging.gif")}/>
            
             <TouchableOpacity style={{marginTop: 15, position: "absolute", marginLeft: 20, right: 20}}>
                    <Text style={{fontSize: 20}}>Done</Text>  
              </TouchableOpacity>

                  <View style={styles.modalMainContainer}>
                      <Text style={styles.exerciseName}>Jogging</Text>
                 {/*Exercise Timer*/}
                 <View style={styles.subModalContainer}>
                 <View style= {styles.HeadersContainer}>
                      <Image style={styles.timeClock} source={require("../ExercisePlan/picture/clock.png")}/>
                      <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4}}>
                        30mins
                      </Text>
                 </View>     
                    <View style= {styles.CaloriesContainer}>
                     <Image style={styles.calorieLogo} source={require("../ExercisePlan/picture/calories.png")}/>
                      <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4}}>
                            Calories Burn: 93
                      </Text>
                   </View> 
                </View>

                <View style = {{alignSelf: "center", marginTop: 40, flexDirection: "row", marginBottom: 20,}}>
                    <Text style={{ fontSize: 80, marginBottom: 10, marginTop: 4, fontWeight: "bold"}}>
                      {count > 0 ? formatTime(count) : '30:00'}
                      </Text>
                </View>
                  

                         <View style = {{flexDirection: "row", alignSelf: "center"}}>
                        {!isRunning ? (
                        
                          <TouchableOpacity onPress={handleStart} style={{backgroundColor: "green", height: 50, width: 100, borderRadius: 30, margin:10}}>
                              <Text style = {{alignSelf: "center", marginTop: 3, fontSize: 30, fontWeight: 'bold', color: "#fff"}}>Start</Text>
                          </TouchableOpacity>
                
             ) : (
                       <TouchableOpacity style={{backgroundColor: "green", height: 50, width: 100, borderRadius: 30, margin: 10}} onPress={handleStop}>
                              <Text style = {{alignSelf: "center", marginTop: 3, fontSize: 30, fontWeight: 'bold', color: "#fff"}}>Stop</Text>
                          </TouchableOpacity>
                
              )}
                       <TouchableOpacity style={{backgroundColor: "red", height: 50, width: 100, borderRadius: 30, margin: 10}} onPress={resetStart}>
                              <Text style = {{alignSelf: "center", marginTop: 3, fontSize: 30, fontWeight: 'bold', color: "#fff"}}>Reset</Text>
                          </TouchableOpacity>
                  </View>
                
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
        height: 300,
        width: 260,
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
    modalMainContainer : {
      backgroundColor: "#AFD3E2", 
      height: 1300, 
      borderTopRightRadius: 20,
     borderTopLeftRadius: 20,
    },
    subModalContainer : {
      flexDirection: "row"
    },
    HeadersContainer: {
      backgroundColor: "#adadc9", 
      width: 80, 
      alignItems: "center", 
      height: 30, 
      borderRadius: 20, 
      marginLeft: 10, 
      flexDirection: "row",
    }, 
  exerciseName: {
      marginLeft: 20, 
      fontSize: 25, 
      fontWeight: "bold", 
      marginTop: 20,
      marginBottom: 20
},
  timeClock : {
    height: 15, 
    width: 15, 
    marginLeft: 9, 
    resizeMode: "stretch",
    marginRight: 2
  },
  calorieLogo: {
    height: 15, 
    width: 15, 
    marginLeft: 15, 
    resizeMode: "stretch",
    marginRight: 2
  },
  CaloriesContainer : {
    backgroundColor: "#adadc9", 
    width: 160, 
    alignItems: "center", 
    height: 30, 
    borderRadius: 20, 
    marginLeft: 10, 
    flexDirection: "row"
  },
  

});
