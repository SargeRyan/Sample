import React, { useState, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Image, Modal, Button } from "react-native";
import { Video } from "expo-av";
import { exerciseList } from "./component/exerciseList";
import { getData, storeData } from "../../AsyncStorageFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import headRotationVideo from './picture/Ecercise/headRotation.mp4';





const ExercisePlanScreen = ({ navigation, route, medicalHistory}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState();
    const [userData, setUserData] = useState({});
    const videoRef = useRef(null);
    const [isReplaying, setIsReplaying] = useState(false);
    const [timer, setTimer] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const [timerRunning, setTimerRunning] = useState(false);
    const exerciseData = require('./component/exerciseList.js');
    const [userdata, setuserData] = useState (userData.selectMedHistory);
    
  
    const notGoodFor = exerciseData.notGoodFor;

   if (exerciseData && exerciseData.notGoodFor) {
    const notGoodFor = exerciseData.notGoodFor;
    console.log("notGoodFor:", notGoodFor);
    // Now you can pass 'notGoodFor' to the 'startTimer' function or use it as needed
} else {
    console.log("Exercise data or 'notGoodFor' array is undefined or not properly structured.");
}

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('userData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setUserData(parsedData);
            }
        } catch (error) {
            console.log('Error retrieving data:', error);
        }
    };

    const handleExerciseClick = (exercise) => {
        setSelectedExercise(exercise);
        setModalVisible(true);
        
    };

    const handleReadyForDisplay = async () => {
        try {
            await videoRef.current.playAsync();
              console.error('Video Is Playing', error.message);
        } catch (error) {
            console.error('Error playing video:', error.message);
        }
    };

    const handlePlaybackStatusUpdate = (status) => {
        if (status.didJustFinish) {
            replayVideo();
        }
    };

    const replayVideo = async () => {
        try {
            await videoRef.current.replayAsync();
            setIsReplaying(true);
            
        } catch (error) {
            console.error('Error replaying video:', error.message);
        }
    };

const startTimer = (duration, notGoodFor) => {
    console.log('notGoodFor:', notGoodFor); // Log the value of notGoodFor to check if it's being passed correctly
    const diseases = notGoodFor;
    console.log('notGoodFor:', diseases); // Log the value of

    clearInterval(countdown);

    const totalTime = duration;
    let timeRemaining = totalTime;
    let currentSet = 1;
    let restTimeRemaining = 0;
    let loopCount = 0;
      

    const timerLoop = () => {
        const newCountdown = setInterval(() => {
            // Check if the user has any health condition that makes the exercise not suitable
            if (diseases && userData && userData.selectMedHistory) {
                if (diseases.includes(userData.selectMedHistory)) {
                  console.log('sdasssssssdiseases', diseases);
                    // If the user has a health condition listed in notGoodFor, reduce the duration
                    duration = duration / 2;
                }
            }

            setTimer(prevTime => {
                let newTime = prevTime - 1;
                timeRemaining--;

                if (restTimeRemaining > 0) {
                    restTimeRemaining--;
                    return Math.max(restTimeRemaining, 0);
                } else if (timeRemaining % (duration + 10) === 0 && timeRemaining !== totalTime) {
                    restTimeRemaining = 10;
                    return -restTimeRemaining;
                }

                if (timeRemaining <= 0) {
                    clearInterval(newCountdown);
                    loopCount++;
                    if (loopCount < 3) {
                        timeRemaining = totalTime;
                        timerLoop();
                    }
                    return 0;
                }

                if (newTime < 0) {
                    newTime = duration;
                    currentSet++;
                }

                return Math.max(newTime, 0);
            });
        }, 1000);

        setCountdown(newCountdown);
        setTimer(duration);
    };

    timerLoop();
};

    const resetTimer = () => {
        clearInterval(countdown); 
        setTimer(0); 
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleModalClose = () => {
        setModalVisible(false);
        clearInterval(countdown);
        resetTimer();
    };
      const handleStartButtonClick = () => {
        const initialExercise = exerciseList[0];
        startTimer(initialExercise.duration);
        setTimerRunning(true);
      
    };
    return (
        <ScrollView>
          
   {exerciseList.map((exercise, index) => {
    const notGoodForExercise = exercise.notGoodFor ? exercise.notGoodFor.toString() : '';
    const medHistory = userData.selectMedHistory ? userData.selectMedHistory.toString() : '';
    const notGoodForArray = notGoodForExercise.split(',').map(item => item.trim());
    const medHistoryArray = medHistory.split(',').map(item => item.trim());
    const hasCommonData = notGoodForArray.some(condition => medHistoryArray.includes(condition));
    const hideButton = hasCommonData;

    return (
        !hideButton && (
            <TouchableOpacity  
                key={index} 
                style={[styles.touchable]} 
                onPress={() => handleExerciseClick(exercise)} 
            >
                <View style={styles.design}></View>
                <View style={styles.content}>
                    <Image source={{ uri: exercise.mealImage }} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.header}>{exercise.mealName}</Text>
                        <View style={styles.infoCon}>
                            <Text style={styles.details}>Calories Burn: {exercise.caloriesBurn} kcal</Text>
                            <Text style={styles.details}>Duration: {(parseInt(exercise.duration) / 60) * 3}:00 mins</Text>
                        </View>
                    </View>
                </View>     
            </TouchableOpacity>
        )
    );
})}



            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedExercise && (
                            <View style={styles.modalDetails}>
                              <View style ={{height: 300, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                                    {/* <Video
                                        ref={videoRef}
                                        source={{ uri: selectedExercise.exerciseVid }}
                                        resizeMode="contain"
                                        useNativeControls={false}
                                        onReadyForDisplay={handleReadyForDisplay}
                                        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                                    /> */}
                                    <Image source={{ uri: selectedExercise.exerciseVid }} style={styles.image1} />
                              </View>
                                 
                                <Text style={styles.modalHeader}>{selectedExercise.mealName}</Text>

                                <View style = {{flexDirection: "row", marginBottom: 20}}>
                                    <Text style={styles.modalText}> Calories Burn: {selectedExercise.caloriesBurn} </Text>
                                    <Text> </Text>
                                 {/* <Text style={styles.modalText}>
                                        Duration: {notGoodFor && userData && userData.selectMedHistory && !selectedExercise.notGoodFor.includes(userData.selectMedHistory) ? (selectedExercise.duration * 3) / 60 : selectedExercise.duration / 2} minutes
                                </Text> */}


                                </View>
                                {!timerRunning && (
                                <TouchableOpacity onPress={handleStartButtonClick} style={styles.StartButtonClick}>
                                    <Text style={styles.startText}>Start</Text>
                                </TouchableOpacity>
                            )}
                            {timerRunning && (
                                <TouchableOpacity onPress={handleStartButtonClick} style={styles.StartButtonClick}>
                                    <Text style={styles.startText}>{formatTime(timer)}</Text>
                                </TouchableOpacity>
                            )}
                            </View>
                        )}
                        <TouchableOpacity style = {styles.menuButton} onPress={handleModalClose}>
                            <Text style= {styles.menuText}>Menu</Text>
                        </TouchableOpacity>

                         <TouchableOpacity style = {styles.doneButton}>
                            <Text style= {styles.menuText}>Done</Text>
                        </TouchableOpacity>
                                
                       
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
   touchable: {
    height: 150,
    backgroundColor: '#FBF9F1',
    margin: 10,
    borderRadius: 10, 
    shadowColor: '#000',
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
    fontWeight: "bold",
    marginTop: 20
  },
details : {
    marginBottom: 2,
    fontSize: 12,
  
},
design : {
    flex: 1,
    height: 5,
    width: 140,
    position: "absolute",
    backgroundColor: "#211C6A", 
    right: 13,
    top: 60,
    borderRadius: 20,
},
 modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
   
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    height: 720,
    width: 350, 
    backgroundColor: "#fff"
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  modalDetails: {
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 5,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  infoCon: {
    marginTop: 20,
  },
 StartButtonClick : {
    height: 220,
    width: 220,
    borderRadius: 160,
    borderColor: "#99BC85",
    borderWidth: 5,
    
 },
 startText : {
    fontSize: 40,
    color: "black",
    alignSelf: "center",
    marginTop: 70,
    fontWeight: "bold",
 },
 menuButton : {
    height: 100,
    width: 100,
    borderColor: "#99BC85",
    borderWidth: 5, 
    borderRadius: 60,
    position: "absolute",
    left: 10,
    bottom: 10
 },
 menuText : {
    alignSelf: "center",
    marginTop: 30,
    fontSize: 16,
    fontWeight: "bold",
 },
 doneButton : {
    height: 100,
    width: 100,
    borderColor: "#99BC85",
    borderWidth: 5, 
    borderRadius: 60,
    position: "absolute",
    right: 10,
    bottom: 10
 },
  image1: {
    flex: 1,
    width: 170,
    height: 10,
    resizeMode: "contain",
    borderRadius: 20,
  }

});

export default ExercisePlanScreen;
