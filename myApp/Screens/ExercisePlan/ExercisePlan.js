import React, { useState, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Image, Modal, Button } from "react-native";
import { Video } from "expo-av";
import { exerciseList as baseExerciseList } from "./component/exerciseList";
import { getData, storeData } from "../../AsyncStorageFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import headRotationVideo from './picture/Ecercise/headRotation.mp4';
import ExerciseDone from "./ExerciseDone";
import { set } from "date-fns";

const ExercisePlanScreen = ({ navigation, route, medicalHistory }) => {
    const numberOfSets = 3;
    const [exerciseList, setExerciseList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [isOnRest, setIsOnRest] = useState(false);
    const [userData, setUserData] = useState({});
    const videoRef = useRef(null);
    const [isReplaying, setIsReplaying] = useState(false);
    const [timer, setTimer] = useState(0);
    const [countdown, setCountdown] = useState(null);
    const [timerRunning, setTimerRunning] = useState(false);
    const exerciseData = require('./component/exerciseList.js');
    const [exerciseBurnedDetails, setExerciseBurnedDetails] = useState({
        burnedCalories: 0,
    });
    const [isBurnedCaloriesModalVisible, setIsBurnedCaloriesModalVisible] = useState(false);
    const [bearing, setBearing] = useState(['Exercise burned calories will be calculated based on your weight']);
    const [currentDuration, setCurrentDuration] = useState(0);
    const thirtyMins = 30 * 60;
    const fifteenMins = 15 * 60;
    const [targetDuration, setTargetDuration] = useState(thirtyMins);
    const notGoodFor = exerciseData.notGoodFor;
    const todayDate = new Date();
    const currentDayIndex = todayDate.getDay();
    const currentMonthIndex = todayDate.getMonth();

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

    useEffect(() => {
        if (timer === -99) { // -99 means the entire exercise is done
            resetTimer();
            markExerciseDone(selectedExercise.caloriesBurn, selectedExercise.durationAfterMedicalCondition, selectedExercise.mealName);
        }
    }, [timer]);

    async function markExerciseDone(burnedCalories, duration, exerciseName) {

        let exerciseBurn = {
            burnedCalories: burnedCalories,
            duration: convertSecondsToMinutesAndSeconds(duration),
            exerciseName: exerciseName,
        };

        setIsBurnedCaloriesModalVisible(true);
        setExerciseBurnedDetails(exerciseBurn);

        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay();
        let storage_Key = `${currentDayIndex}_exerciseBurnedCalories`;

        const previousBurned = await getData(storage_Key);
        let currentBurned = burnedCalories;
        if (previousBurned) currentBurned += Number(previousBurned);
        await storeData(storage_Key, currentBurned.toString());

        // save the duration of the exercise
        const duration_Key = `${currentDayIndex}_exerciseDuration`;
        const previousDuration = await getData(duration_Key);
        let currentDuration = duration;
        if (previousDuration) currentDuration += Number(previousDuration);
        await storeData(duration_Key, currentDuration.toString());
        setCurrentDuration(currentDuration);
    }

    const fetchData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('userData');
            if (storedData) {
                const parsedUserData = JSON.parse(storedData);
                setUserData(parsedUserData);
                const medHistory = parsedUserData.selectMedHistory ? parsedUserData.selectMedHistory.toString() : '';
                setBearing(['Exercise burned calories will be calculated based on your weight']);
                modifyCalorieBasedOnWeight(parsedUserData.weight, parsedUserData.goal, medHistory);

                const currentDayIndex = todayDate.getDay();
                const duration_Key = `${currentDayIndex}_exerciseDuration`;
                const previousDuration = await getData(duration_Key);
                if (previousDuration) setCurrentDuration(Number(previousDuration));
            }
        } catch (error) {
            console.log('Error retrieving data:', error);
        }
    };

    modifyCalorieBasedOnWeight = (weight, goal, medHistory) => {
        let newExerciseList = baseExerciseList;
        let hiddenBearingMessage = "";
        let goalBearing = ``;

        for (let i = 0; i < baseExerciseList.length; i++) {
            let exercise = baseExerciseList[i];
            const medHistoryArray = medHistory.split(',').map(item => item.trim());
            const notGoodForExercise = exercise.notGoodFor ? exercise.notGoodFor.toString() : '';
            const notGoodForArray = notGoodForExercise.split(',').map(item => item.trim());
            const hasMedicalCondition = notGoodForArray.some(condition => medHistoryArray.includes(condition));
            if (hasMedicalCondition) {
                exercise["hideButton"] = true;
                if (!hiddenBearingMessage) hiddenBearingMessage = `Since you indicate that you have ${medHistory} health condition, following exercises are hidden: `;
                hiddenBearingMessage += `${exercise.mealName}, `;
            }
            if (goal == 'Maintain Weight' || goal == 'Increase Stamina') {
                if (!goalBearing) goalBearing = `Since you chose ${goal} as your goal, the duration of your exercises will be 1min 30sec.`;
                setTargetDuration(fifteenMins);
            }

            if (!exercise.calorieByWeight) continue;
            let calorieByWeight = exercise.calorieByWeight;
            for (let j = 0; j < calorieByWeight.length; j++) {
                const currentWeightCondition = Number(weight) <= Number(calorieByWeight[j].weight);
                const prevWeightCondition = j > 0 && Number(weight) > Number(calorieByWeight[j - 1].weight);
                if (currentWeightCondition && prevWeightCondition) {
                    exercise.caloriesBurn = calorieByWeight[j].calories;
                    newExerciseList[i] = exercise;
                    continue;
                }

                if (j === 0 && currentWeightCondition) {
                    exercise.caloriesBurn = calorieByWeight[j].calories;
                    newExerciseList[i] = exercise;
                    continue;
                }

                let isLastIndex = j === calorieByWeight.length - 1;
                let isWeightGreaterThanLast = weight > calorieByWeight[j].weight;
                if (isLastIndex && isWeightGreaterThanLast) {
                    exercise.caloriesBurn = calorieByWeight[j].calories;
                    newExerciseList[i] = exercise;
                }
            }
        }
        if (hiddenBearingMessage) hiddenBearingMessage = hiddenBearingMessage.slice(0, -2);
        setBearing([...bearing, hiddenBearingMessage, goalBearing]);
        setExerciseList(newExerciseList);
    };

    const handleExerciseClick = (exercise, durationAfterMedicalCondition) => {
        exercise['durationAfterMedicalCondition'] = durationAfterMedicalCondition;
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

    const startTimer = (duration) => {
        console.log('notGoodFor:', notGoodFor); // Log the value of notGoodFor to check if it's being passed correctly
        const diseases = notGoodFor;

        const medHistory = userData.selectMedHistory ? userData.selectMedHistory.toString() : '';
        const myArray = ["Asthma", "Fatigue"];

        const hasCommonData = myArray.some(item => medHistory.includes(item));
        console.log(hasCommonData);

        console.log(myArray);
        console.log(medHistory);
        console.log('notGoodFor:', diseases);

        clearInterval(countdown);

        let totalTime = duration; // Default totalTime to duration

        // if (hasCommonData) { // No need for === true, as hasCommonData is already a boolean
        //     totalTime /= 2; // Divide totalTime by 2 if hasCommonData is true
        // }

        const timePerSet = totalTime / numberOfSets;
        let timeRemaining = timePerSet;
        let currentSet = 0;
        let restTimeRemaining = 0;

        const timerLoop = () => {
            const newCountdown = setInterval(() => {
                // Check if the user has any health condition that makes the exercise not suitable
                // if (diseases && userData && userData.selectMedHistory) {
                //     if (diseases.includes(userData.selectMedHistory)) {
                //         console.log('sdasssssssdiseases', userData.selectMedHistory);
                //         // If the user has a health condition listed in notGoodFor, reduce the totalTime
                //         totalTime = duration / 2; // Modify totalTime, not duration
                //     }
                // }

                setTimer(prevTime => {
                    let newTime = prevTime - 1;
                    timeRemaining--;
                    if ((restTimeRemaining * -1) > 0) {
                        restTimeRemaining++;
                        return restTimeRemaining;
                    } else if (prevTime === 1) {
                        restTimeRemaining = -10;
                        return restTimeRemaining;
                    }


                    if (currentSet >= numberOfSets && newTime < 0) {
                        clearInterval(newCountdown);
                        return -99; // -99 means the entire exercise is done
                    }

                    if (newTime < 0) {
                        newTime = timePerSet;
                        currentSet++;
                    }

                    return Math.max(newTime, 0);
                });
            }, 1000);

            setCountdown(newCountdown);
            // setTimer(totalTime); // Set timer with totalTime, not duration
        };

        timerLoop();
        setTimerRunning(true);
    };


    const resetTimer = () => {
        clearInterval(countdown);
        setTimerRunning(false);
        setSelectedExercise(null);
        setModalVisible(false);
        setTimer(0);
    };

    const formatTime = (seconds) => {
        if (Number(seconds) > 0) {
            var minutes = Math.floor(seconds / 60) || 0;
            var remainingSeconds = seconds % 60 || 0;

            // Use padStart to ensure two-digit formatting with leading zeros
            var formattedMinutes = minutes.toString().padStart(2, '0');
            var formattedSeconds = remainingSeconds.toString().padStart(2, '0');

            return formattedMinutes + ':' + formattedSeconds;
        }
        seconds *= -1;
        var minutes = Math.floor(seconds / 60) || 0;
        var remainingSeconds = seconds % 60 || 0;

        // Use padStart to ensure two-digit formatting with leading zeros
        var formattedMinutes = minutes.toString().padStart(2, '0');
        var formattedSeconds = remainingSeconds.toString().padStart(2, '0');

        return formattedMinutes + ':' + formattedSeconds;
    };

    const handleModalClose = () => {
        setModalVisible(false);
        clearInterval(countdown);
        resetTimer();
    };
    const handleStartButtonClick = (selectedExercise) => {
        startTimer(selectedExercise.durationAfterMedicalCondition);
    };

    function convertSecondsToMinutesAndSeconds(durationInSeconds) {

        var minutes = Math.floor(durationInSeconds / 60);
        var seconds = durationInSeconds % 60;
        var result = "";
        if (minutes > 0) {
            result += minutes + " min ";
        }
        if (seconds > 0) {
            result += seconds + " sec";
        }
        if (!result) return "0 sec";
        return result.trim();
    }



    return (
        <ScrollView>


            <View style={{
                backgroundColor: '#156d94',
                padding: 10,
                margin: 10,
                marginBottom: 0,
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
            }}>
                {bearing.map((_bearing, index) => (
                    _bearing && <Text style={{ color: '#fff', fontSize: 12, marginVertical: 4 }} key={index}>{_bearing}</Text>
                ))}
            </View>

            <Text style={{ color: '#156d94', fontSize: 15, marginTop: 10, marginLeft: 10, fontWeight: 'bold' }}>
                Duration Max Goal : {convertSecondsToMinutesAndSeconds(currentDuration)} / {convertSecondsToMinutesAndSeconds(targetDuration)}
            </Text>


            {exerciseList.map((exercise, index) => {
                const notGoodForExercise = exercise.notGoodFor ? exercise.notGoodFor.toString() : '';
                const medHistory = userData.selectMedHistory ? userData.selectMedHistory.toString() : '';
                const healthCondition = ["Asthma", "Fatigue"];
                const medHistoryArray = medHistory.split(',').map(item => item.trim());
                const hasCommonData2 = medHistoryArray.some(condition => healthCondition.includes(condition));

                let exerciseDuration = exercise.duration * numberOfSets; // TODO: when changing duration, modify this line
                const dividedDuration = hasCommonData2 ? (parseInt(exerciseDuration) / 2) : parseInt(exerciseDuration);

                console.log(hasCommonData2);
                // TODO: set bearing message for asthma and fatigue

                let result = <Text style={styles.details}>Duration: {convertSecondsToMinutesAndSeconds(dividedDuration || 0)}</Text>;


                return (
                    !exercise.hideButton && (
                        <TouchableOpacity
                            key={index}
                            style={[styles.touchable]}
                            onPress={() => handleExerciseClick(exercise, dividedDuration)}
                        >
                            <View style={styles.design}></View>
                            <View style={styles.content}>
                                <Image source={{ uri: exercise.mealImage }} style={styles.image} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.header}>{exercise.mealName}</Text>
                                    <View style={styles.infoCon}>
                                        <Text style={styles.details}>Calories Burn: {exercise.caloriesBurn} kcal</Text>
                                        <Text style={styles.details}>{result}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ));
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
                                {timer >= 0 && (
                                    <View style={{ height: 300, backgroundColor: '#156d94', borderRadius: 5 }}>
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
                                )}

                                {timer < 0 && (
                                    <TouchableOpacity style={[styles.StartButtonClick, { height: 300, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, backgroundColor: '#156d94' }]}>
                                        <Text style={[styles.startText, { color: '#fff', marginTop: 50 }]}>REST</Text>
                                        <Text style={[styles.startText, { color: '#fff', marginTop: 10, 'fontSize': 16 }]}>DRINK WATER</Text>
                                        <Text style={[styles.startText, { color: '#fff', marginTop: 0, 'fontSize': 16 }]}>WATCH YOUR BODY</Text>

                                    </TouchableOpacity>
                                )}

                                <Text style={styles.modalHeader}>{selectedExercise.mealName}</Text>
                                <View style={{ flexDirection: "column", marginBottom: 5 }}>
                                    <Text style={styles.modalText}> Calories Burn: {selectedExercise.caloriesBurn} kcal </Text>
                                    <Text style={styles.modalText}>Total Duration: {convertSecondsToMinutesAndSeconds(selectedExercise.durationAfterMedicalCondition)}</Text>
                                    <Text> </Text>
                                    {/* <Text style={styles.modalText}>
                                        Duration: {notGoodFor && userData && userData.selectMedHistory && !selectedExercise.notGoodFor.includes(userData.selectMedHistory) ? (selectedExercise.duration * 3) / 60 : selectedExercise.duration / 2} minutes
                                </Text> */}


                                </View>
                                {!timerRunning && (
                                    <TouchableOpacity onPress={() => { handleStartButtonClick(selectedExercise) }} style={styles.StartButtonClick}>
                                        <Text style={styles.startText}>Start</Text>
                                    </TouchableOpacity>
                                )}
                                {timerRunning && (
                                    <TouchableOpacity onPress={() => { }} style={styles.StartButtonClick}>
                                        <Text style={styles.startText}>{formatTime(timer)}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                        {!timerRunning && (
                            <TouchableOpacity style={styles.doneButton} onPress={handleModalClose}>
                                <Text style={styles.menuText}>Menu</Text>
                            </TouchableOpacity>
                        )}

                        {timerRunning && (
                            <TouchableOpacity style={[styles.doneButton, { 'display': 'none' }]}>
                                <Text style={styles.menuText}>Done</Text>
                            </TouchableOpacity>
                        )}

                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={false}
                visible={isBurnedCaloriesModalVisible}
                onRequestClose={() => {
                    setIsBurnedCaloriesModalVisible(!isBurnedCaloriesModalVisible);
                }}
            >
                <ExerciseDone
                    exerciseBurnedDetails={exerciseBurnedDetails}
                    onCloseFunction={() =>
                        setIsBurnedCaloriesModalVisible(!isBurnedCaloriesModalVisible)
                    }
                />
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
        backgroundColor: "#156d94",
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
        backgroundColor: "#ffffff",
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        textAlign: "center",
        paddingHorizontal: 3,
    },
    infoCon: {
        marginTop: 20,
    },
    StartButtonClick: {
        height: 210,
        width: 210,
        borderRadius: 160,
        borderColor: "#156d94",
        borderWidth: 5,

    },
    startText: {
        fontSize: 40,
        color: "black",
        alignSelf: "center",
        marginTop: 70,
        fontWeight: "bold",
    },
    menuButton: {
        height: 100,
        width: 100,
        borderColor: "#156d94",
        borderWidth: 5,
        borderRadius: 60,
        position: "absolute",
        left: 10,
        bottom: 10
    },
    menuText: {
        alignSelf: "center",
        margin: "auto",
        fontSize: 16,
        fontWeight: "bold",
    },
    doneButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderColor: "#156d94",
        borderWidth: 3,
        borderRadius: 10,
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
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
