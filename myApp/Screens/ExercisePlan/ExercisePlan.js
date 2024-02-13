import React, { useState, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Image, Modal, Button } from "react-native";
import { Video } from "expo-av";
import { exerciseList } from "./component/exerciseList";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ExercisePlanScreen = ({ navigation, route, medicalHistory }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [userData, setUserData] = useState({});
    const videoRef = useRef(null);
    const [isReplaying, setIsReplaying] = useState(false);
    const [timer, setTimer] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const [timerRunning, setTimerRunning] = useState(false);

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

    const startTimer = (duration) => {
        clearInterval(countdown); // Clear any previous interval to prevent multiple intervals running simultaneously
        const totalTime = duration; // Total time including rest periods
        let timeRemaining = totalTime; // Remaining time including rest periods
        let currentSet = 1; // Counter for the current set
        let restTimeRemaining = 0; // Remaining time for the rest period

        let loopCount = 0;

        const timerLoop = () => {
            const newCountdown = setInterval(() => {
                setTimer(prevTime => {
                    let newTime = prevTime - 1; // Decrease the time by 1 second
                    timeRemaining--;

                    // Check if it's time for a rest period
                    if (restTimeRemaining > 0) {
                        restTimeRemaining--;
                        return Math.max(restTimeRemaining, 0); // Return remaining rest time, ensuring it's not negative
                    } else if (timeRemaining % (duration + 10) === 0 && timeRemaining !== totalTime) {
                        restTimeRemaining = 10;
                        return -restTimeRemaining; // Flag for the rest period
                    }

                    // Check if the timer should stop
                    if (timeRemaining <= 0) {
                        clearInterval(newCountdown);
                        loopCount++;
                        if (loopCount < 3) {
                            timeRemaining = totalTime; // Reset timeRemaining for the next loop
                            timerLoop(); // Start the next loop
                        }
                        return 0; // Timer finished
                    }

                    // Check if it's time to start a new set
                    if (newTime < 0) {
                        newTime = duration;
                        currentSet++;
                    }

                    return Math.max(newTime, 0); // Ensure the timer doesn't go below zero
                });
            }, 1000);

            setCountdown(newCountdown); // Update the countdown state with the new interval
            setTimer(duration); // Initialize the timer with the provided duration
        };

        timerLoop(); // Start the first loop
    };




    const resetTimer = () => {
        clearInterval(countdown); // Clear the interval
        setTimer(0); // Reset the timer to zero or whatever initial value you want
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
            {exerciseList.map((exercise, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.touchable}
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
            ))}

            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedExercise && (
                            <View style={styles.modalDetails}>
                                <View style={{ height: 290 }}>
                                    <Video
                                        ref={videoRef}
                                        source={{ uri: "https://drive.google.com/uc?export=preview&id=1KgMutR5B_Tn2EF5ZXRMCDCv9p_Oe0aek" }}
                                        style={{ height: 280, width: 280, alignSelf: "center" }}
                                        resizeMode="contain"
                                        useNativeControls={false}
                                        onReadyForDisplay={handleReadyForDisplay}
                                        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                                    />
                                    {/* <Image source={{ uri: selectedExercise.exerciseVid }}
                                        style={{ height: 280, width: 280, alignSelf: "center" }}
                                    /> */}

                                </View>
                                <Text style={styles.modalHeader}>{selectedExercise.mealName}</Text>
                                <Text style={styles.modalText}></Text>
                                <Text style={styles.modalText}>Calories Burn: {selectedExercise.caloriesBurn}</Text>
                                <Text style={styles.modalText}>Duration: {(selectedExercise.duration / 60) * 3} minutes</Text>

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




                        {/* <Button title="Close" onPress={handleModalClose} /> */}
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

    header: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 20
    },
    details: {
        marginBottom: 2,
        fontSize: 12,

    },
    design: {
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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
    },
    infoCon: {
        marginTop: 20,
    },
    StartButtonClick: {
        height: 220,
        width: 220,
        borderRadius: 160,
        borderColor: "#99BC85",
        backgroundColor: "green",
        borderWidth: 5,


    },
    startText: {
        fontSize: 40,
        color: "white",
        alignSelf: "center",
        marginTop: 70,
    }
});

export default ExercisePlanScreen;
