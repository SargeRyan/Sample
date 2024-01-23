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


import ExerciseDone from "./ExerciseDone";
import { getData, storeData } from "../../AsyncStorageFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default ExercisePlanScreen = ({ navigation, route }) => {
  const [isBurnedCaloriesModalVisible, setIsBurnedCaloriesModalVisible] =
    useState(false);
  const [exerciseBurnedDetails, setExerciseBurnedDetails] = useState({
    burnedCalories: 0,
  });
  //Exercise Modal
   const [userData, setUserData] = useState({});
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
  const [startCount, setStartCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [count1, setCount1] = useState(0);
  const [isRunning1, setIsRunning1] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
      setStartCount(count);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  

  useEffect(() => {
    const getData = async () => {
      try {
        // Retrieve data using AsyncStorage
        const heightValue = await AsyncStorage.getItem('height');
        const weightValue = await AsyncStorage.getItem('weight');
        const genderValue = await AsyncStorage.getItem('gender');
        const medHistoryValue = await AsyncStorage.getItem('medHistory');
        const weightGoalValue = await AsyncStorage.getItem('goalWeight');

        console.log(weightGoalValue);



        // Update state with retrieved data
        setHeight(heightValue);
        setWeight(weightValue);
        setGender(genderValue);
        setMedHistory(medHistoryValue);
        setWeightGoal(weightGoalValue);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
    fetchData();
  }, []);
  const fetchData = async () => {
        try {
            // Retrieve the stored data from AsyncStorage
            const storedData = await AsyncStorage.getItem('userData');

            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setUserData(parsedData);
                calculateBmi(parsedData);
            }
        } catch (error) {
            console.log('Error retrieving data:', error);
        }
    };




  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

 const handleStart = () => {
  console.log('userWeight:', userData.weight)
  console.log('userWeightGoal:', userData.goalWeight)

  // Check if userData.weight is greater than userData.goalWeight
  if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90); // 10 minutes + additional 90 seconds
    setCount1('3:00')
  } else {
    setCount(90);
    setCount1('1:30') // 10 minutes in seconds
  }


  setIsRunning(true);
};

  const handleStop = () => {
    setIsRunning(false);
  };
  const resetStart = () => {
     if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90);
     // 10 minutes + additional 90 seconds
  } else {
    setCount(90);
     // 10 minutes in seconds
  }

    setIsRunning(false);
  };
  const handleStart1 = () => {
     if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90);
     setCount1('3:00') // 10 minutes + additional 90 seconds
  } else {
    setCount(90);
    setCount1('1:30') // 10 minutes in seconds
  }
    setIsRunning(true);
  };

  const handleStop1 = () => {
    
    setIsRunning(false);
  };
  const resetStart1 = () => {
     if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90); // 10 minutes + additional 90 seconds
  } else {
    setCount(90); // 10 minutes in seconds
  } // 10 minutes in seconds
    setIsRunning(false);
  };

  const handleStart2 = () => {
   if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90);
     setCount1('3:00') // 10 minutes + additional 90 seconds
  } else {
    setCount(90);
     setCount1('1:30') // 10 minutes in seconds
  } // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop2 = () => {
    setIsRunning(false);
  };
  const resetStart2 = () => {
   if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90); // 10 minutes + additional 90 seconds
  } else {
    setCount(90); // 10 minutes in seconds
  } // 10 minutes in seconds
    setIsRunning(false);
  };

  const handleStart3 = () => {
    if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90);
     setCount1('3:00') // 10 minutes + additional 90 seconds
  } else {
    setCount(90);
     setCount1('1:30') // 10 minutes in seconds
  } // 10 minutes in seconds // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop3 = () => {
    setIsRunning(false);
  };
  const resetStart3 = () => {
  if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90); // 10 minutes + additional 90 seconds
  } else {
    setCount(90); // 10 minutes in seconds
  } // 10 minutes in seconds
    setIsRunning(false);
  };

  const handleStart4 = () => {
    if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90);
     setCount1('3:00') // 10 minutes + additional 90 seconds
  } else {
    setCount(90);
    setCount1('1:20') // 10 minutes in seconds
  } // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop4 = () => {
    setIsRunning(false);
  };
  const resetStart4 = () => {
    if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90); // 10 minutes + additional 90 seconds
  } else {
    setCount(90); // 10 minutes in seconds
  } // 10 minutes in seconds
    setIsRunning(false);
  };

  const handleStart5 = () => {
    if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90);
     setCount1('3:00') // 10 minutes + additional 90 seconds
  } else {
    setCount(90);
     setCount1('1:30') // 10 minutes in seconds
  } // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop5 = () => {
    setIsRunning(false);
  };
  const resetStart5 = () => {
   if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90); // 10 minutes + additional 90 seconds
  } else {
    setCount(90); // 10 minutes in seconds
  } // 10 minutes in seconds
    setIsRunning(false);
  };

  const handleStart6 = () => {
   if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90);
     setCount1('3:00') // 10 minutes + additional 90 seconds
  } else {
    setCount(90);
     setCount1('1:30') // 10 minutes in seconds
  } // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop6 = () => {
    setIsRunning(false);
  };
  const resetStart6 = () => {
    if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90); // 10 minutes + additional 90 seconds
  } else {
    setCount(90); // 10 minutes in seconds
  } // 10 minutes in seconds
    setIsRunning(false);
  };

  const handleStart7 = () => {
    if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90);
     setCount1('3:00') // 10 minutes + additional 90 seconds
  } else {
    setCount(90);
     setCount1('1:30') // 10 minutes in seconds
  } // 10 minutes in seconds // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop7 = () => {
    setIsRunning(false);
  };
  const resetStart7 = () => {
   if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90);
     setCount1('3:00') // 10 minutes + additional 90 seconds
  } else {
    setCount(90);
     setCount1('1:30') // 10 minutes in seconds
  } // 10 minutes in seconds// 10 minutes in seconds
    setIsRunning(false);
  };

  const handleStart8 = () => {
    if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90); // 10 minutes + additional 90 seconds
  } else {
    setCount(90); // 10 minutes in seconds
  } // 10 minutes in seconds // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop8 = () => {
    setIsRunning(false);
  };
  const resetStart8 = () => {
    if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90); // 10 minutes + additional 90 seconds
  } else {
    setCount(90); // 10 minutes in seconds
  } // 10 minutes in seconds // 10 minutes in seconds
    setIsRunning(false);
  };
  const handleStart9 = () => {
    if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90);
     setCount1('3:00') // 10 minutes + additional 90 seconds
  } else {
    setCount(90);
     setCount1('1:30') // 10 minutes in seconds
  } // 10 minutes in seconds // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop9 = () => {
    setIsRunning(false);
  };
  const resetStart9 = () => {
    if (userData.weight > userData.goalWeight || userData.weight < userData.goalWeight) {
    setCount(90 + 90); // 10 minutes + additional 90 seconds
  } else {
    setCount(90); // 10 minutes in seconds
  } // 10 minutes in seconds
    setIsRunning(false);
  };

  const backBtn = () => {
    handleStop();
    resetStart();

    setModalVisible(false);
  };
  const open = () => {
    resetStart();
    setModalVisible(true);
  };
  const open1 = () => {
    resetStart1();
    setModalVisible1(true);
  };
  const open2 = () => {
    resetStart2();
    setModalVisible2(true);
  };
  const open3 = () => {
    resetStart3();
    setModalVisible3(true);
  };
  const open4 = () => {
    resetStart4();
    setModalVisible4(true);
  };

  const open5 = () => {
    resetStart5();
    setModalVisible5(true);
  };

  const open6 = () => {
    resetStart6();
    setModalVisible6(true);
  };
  const open7 = () => {
    resetStart7();
    setModalVisible7(true);
  };
  const open8 = () => {
    resetStart8();
    setModalVisible8(true);
  };
  const open9 = () => {
    resetStart9();
    setModalVisible9(true);
  };

  const videoRef = useRef(null);
  const [isReplaying, setIsReplaying] = useState(false);

  const handleReadyForDisplay = async () => {
    try {
      await videoRef.current.playAsync();
    } catch (error) {
      console.error('Error playing video:', error.message);
    }
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      // Video playback has completed
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

  function checkDiplayAllowedExercise(exercise) {
    for (let i = 0; i < medicalHistory.length; i++) {
      const medHistory = medicalHistory[i];
      const allowedExercise = allowedMedicalConditions[medHistory].allowedExercise;
      if (!allowedExercise.includes(exercise)) {
        return 'none'
      }
    }
    return 'flex';
  }

  const allExercises = ['Jogging', 'Walking', 'Light Dumbbell', 'Jumping Jack', 'Hip Rotation', 'Head Rotation', 'Arm Rotation', 'Knee Rotation', 'Standing March', 'Shoulder Roll'];
  const allowedMedicalConditions = {
    Diabetes: {
      allowedExercise: allExercises,
      duration: '30 minutes daily (10 minutes per dose, 3 sets)',
    },
    Stroke: {
      allowedExercise: ['Light Dumbbell', 'Standing March', 'Walking', 'Hip Rotation', 'Head Rotation', 'Knee Rotation', 'Arm Rotation', 'Shoulder Role'],
      duration: '30 minutes daily (10 minutes per dose, 3 sets)',
    },
    Arthritis: {
      allowedExercise: ['Light Dumbbell', 'Standing March', 'Walking', 'Hip Rotation', 'Head Rotation', 'Knee Rotation', 'Arm Rotation', 'Shoulder Role'],
      duration: '30 minutes daily',
    },
    Asthma: {
      allowedExercise: ['Light Dumbbell', 'Standing March', 'Walking', 'Hip Rotation', 'Head Rotation', 'Knee Rotation', 'Arm Rotation', 'Shoulder Role'],
      duration: '30 minutes daily (10 minutes per dose, 3 sets)',
    },
    Obesity: {
      allowedExercise: allExercises,  // No excluded exercises (All exercises are allowed).
      duration: '30 minutes daily',
    },
    Underweight: {
      allowedExercise: allExercises,  // No excluded exercises (All exercises are allowed).
      duration: '30 minutes daily',
    },
    Fatigue: {
      allowedExercise: ['Hip Rotation', 'Head Rotation', 'Knee Rotation', 'Arm Rotation', 'Shoulder Role'],
      duration: '15 minutes (3 minutes per dose, 5 sets)',
    },
    "High Blood": {
      allowedExercise: ['Light Dumbbell', 'Standing March', 'Walking', 'Hip Rotation', 'Head Rotation', 'Knee Rotation', 'Arm Rotation', 'Shoulder Role'],
      duration: '30 minutes daily (10 minutes per dose, 3 sets)',
    },
  };

  const [category, setCategory] = useState('Obesity');
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [medicalTitle, setMedicalTitle] = useState('');

  useEffect(() => {
    const getAllMedCategory = async function () {
      let categories = [];
      let categoryTitle = [];
      let allKeys = await AsyncStorage.getAllKeys();
      for (let i = 0; i < allKeys.length; i++) {
        if (allKeys[i].startsWith("@medicalHistory_")) {
          categories.push(allKeys[i].split("_")[1]);
          // Add "and" between elements in categoryTitle
          categoryTitle.push(allKeys[i].split("_")[1]);
        }
      }
      console.log("Medical History", categories);
      setMedicalHistory(categories);
      // add "and" before the last item of category title
      if (categoryTitle.length > 0) {
        categoryTitle[categoryTitle.length - 1] = "and " + categoryTitle[categoryTitle.length - 1];
        setMedicalTitle('Some Exercises are not available since you specifiy that you have ' + categoryTitle.toString());
      }

    }
    getAllMedCategory();
  }, []);

  async function markExerciseDone(burnedCalories, duration, exerciseName) {
    if (startCount <= 0) {
      burnedCalories = 0;
    } else {
      var percentage = ((startCount - count) / startCount) * 100;
      console.log("Percentage =========", percentage);
      burnedCalories = (percentage / 100) * burnedCalories;
      console.log("Burned Calories =======", burnedCalories);
    }
    let exerciseBurn = {
      burnedCalories: burnedCalories,
      duration: duration,
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
  }



  return (
    <ScrollView
      style={{
        backgroundColor: "#AFD3E2",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {medicalTitle && <Text style={{
        textAlign: "center",
        fontSize: 16,
        margin: 10,
        padding: 5,
        backgroundColor: "#fff",
        color: "#0d4761",
        borderRadius: 5,
      }}>{medicalTitle}</Text>

      }

      {category === 'Diabetes' && (
        <>
          <Text>Diabetes</Text>
          <TouchableOpacity style={styles.ButtonContainer} onPress={open}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Jogging</Text>
                <Text>Calories Burn: 93</Text>
                <Text>Duration: {count1}</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Joggingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ButtonContainer} onPress={open1}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Walking</Text>
                <Text>Calories Burn: 67</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Walkingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ButtonContainer} onPress={open2}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Light Dumbbell</Text>
                <Text>Calories Burn: 36</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/LightDumbbell.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ButtonContainer} onPress={open3}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Jumping Jack</Text>
                <Text>Calories Burn: 80</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/JumpingJacks.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ButtonContainer} onPress={open4}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Hip Rotation</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/HipRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Head Rotation */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open5}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Head Rotation</Text>
                <Text>Calories Burn: 10</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/HeadRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Arm Rotation */}
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={() => setModalVisible6(true)}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Arm Rotation</Text>
                <Text>Calories Burn: 10</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>

              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/ArmRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Knee Rotation */}
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={() => setModalVisible7(true)}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Knee Rotation</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/KneeRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/*Standing March */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open8}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Standing March</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Marchingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Shoulder Roll */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open9}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Shoulder Roll</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Shoulderroll.jpg")}
              />
            </View>
          </TouchableOpacity>
        </>
      )}

      {category === 'High Blood' && (
        <>
          <Text>High Blood</Text>
          <TouchableOpacity style={styles.ButtonContainer} onPress={open1}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Walking</Text>
                <Text>Calories Burn: 67</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Walkingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ButtonContainer} onPress={open2}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Light Dumbbell</Text>
                <Text>Calories Burn: 36</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/LightDumbbell.jpg")}
              />
            </View>
          </TouchableOpacity>


          <TouchableOpacity style={styles.ButtonContainer} onPress={open4}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Hip Rotation</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/HipRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Head Rotation */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open5}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Head Rotation</Text>
                <Text>Calories Burn: 10</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/HeadRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Arm Rotation */}
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={() => setModalVisible6(true)}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Arm Rotation</Text>
                <Text>Calories Burn: 10</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>

              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/ArmRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Knee Rotation */}
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={() => setModalVisible7(true)}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Knee Rotation</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/KneeRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/*Standing March */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open8}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Standing March</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Marchingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Shoulder Roll */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open9}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Shoulder Roll</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Shoulderroll.jpg")}
              />
            </View>
          </TouchableOpacity>
        </>
      )}

      {category === 'Stroke' && (
        <>
          <Text>Stroke</Text>
          <TouchableOpacity style={styles.ButtonContainer} onPress={open1}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Walking</Text>
                <Text>Calories Burn: 67</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Walkingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ButtonContainer} onPress={open2}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Light Dumbbell</Text>
                <Text>Calories Burn: 36</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/LightDumbbell.jpg")}
              />
            </View>
          </TouchableOpacity>


          <TouchableOpacity style={styles.ButtonContainer} onPress={open4}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Hip Rotation</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/HipRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Head Rotation */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open5}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Head Rotation</Text>
                <Text>Calories Burn: 10</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/HeadRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Arm Rotation */}
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={() => setModalVisible6(true)}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Arm Rotation</Text>
                <Text>Calories Burn: 10</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>

              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/ArmRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Knee Rotation */}
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={() => setModalVisible7(true)}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Knee Rotation</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/KneeRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/*Standing March */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open8}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Standing March</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Marchingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Shoulder Roll */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open9}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Shoulder Roll</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Shoulderroll.jpg")}
              />
            </View>
          </TouchableOpacity>
        </>
      )}

      {category === 'Arthritis' && (
        <>
          <Text>Arthritis</Text>
          <TouchableOpacity style={styles.ButtonContainer} onPress={open1}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Walking</Text>
                <Text>Calories Burn: 67</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Walkingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ButtonContainer} onPress={open2}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Light Dumbbell</Text>
                <Text>Calories Burn: 36</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/LightDumbbell.jpg")}
              />
            </View>
          </TouchableOpacity>


          <TouchableOpacity style={styles.ButtonContainer} onPress={open4}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Hip Rotation</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/HipRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Head Rotation */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open5}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Head Rotation</Text>
                <Text>Calories Burn: 10</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/HeadRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Arm Rotation */}
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={() => setModalVisible6(true)}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Arm Rotation</Text>
                <Text>Calories Burn: 10</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>

              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/ArmRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Knee Rotation */}
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={() => setModalVisible7(true)}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Knee Rotation</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/KneeRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/*Standing March */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open8}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Standing March</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Marchingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Shoulder Roll */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open9}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Shoulder Roll</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Shoulderroll.jpg")}
              />
            </View>
          </TouchableOpacity>
        </>
      )}

      {category === 'Asthma' && (
        <>
          <Text>Asthma</Text>
          <TouchableOpacity style={styles.ButtonContainer} onPress={open1}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Walking</Text>
                <Text>Calories Burn: 67</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Walkingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ButtonContainer} onPress={open2}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Light Dumbbell</Text>
                <Text>Calories Burn: 36</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/LightDumbbell.jpg")}
              />
            </View>
          </TouchableOpacity>


          <TouchableOpacity style={styles.ButtonContainer} onPress={open4}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Hip Rotation</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/HipRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Head Rotation */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open5}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Head Rotation</Text>
                <Text>Calories Burn: 10</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/HeadRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Arm Rotation */}
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={() => setModalVisible6(true)}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Arm Rotation</Text>
                <Text>Calories Burn: 10</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>

              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/ArmRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Knee Rotation */}
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={() => setModalVisible7(true)}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Knee Rotation</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/KneeRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/*Standing March */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open8}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Standing March</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Marchingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Shoulder Roll */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open9}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Shoulder Roll</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Shoulderroll.jpg")}
              />
            </View>
          </TouchableOpacity>
        </>
      )}

      {category === 'Obesity' && (
        <>
          <TouchableOpacity style={[styles.ButtonContainer, { display: checkDiplayAllowedExercise('Jogging') }]} onPress={open}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Jogging</Text>
                <Text>Calories Burn: 93</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Joggingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.ButtonContainer, { display: checkDiplayAllowedExercise('Walking') }]} onPress={open1}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Walking</Text>
                <Text>Calories Burn: 67</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Walkingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.ButtonContainer, { display: checkDiplayAllowedExercise('Light Dumbbell') }]} onPress={open2}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Light Dumbbell</Text>
                <Text>Calories Burn: 36</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/LightDumbbell.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.ButtonContainer, { display: checkDiplayAllowedExercise('Jumping Jack') }]} onPress={open3}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Jumping Jack</Text>
                <Text>Calories Burn: 80</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/JumpingJacks.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.ButtonContainer, { display: checkDiplayAllowedExercise('Hip Rotation') }]} onPress={open4}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Hip Rotation</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/HipRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Head Rotation */}
          <TouchableOpacity style={[styles.ButtonContainer, { display: checkDiplayAllowedExercise('Head Rotation') }]} onPress={open5}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Head Rotation</Text>
                <Text>Calories Burn: 10</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/HeadRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Arm Rotation */}
          <TouchableOpacity
            style={[styles.ButtonContainer, { display: checkDiplayAllowedExercise('Arm Rotation') }]}
            onPress={() => setModalVisible6(true)}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Arm Rotation</Text>
                <Text>Calories Burn: 10</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>

              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/ArmRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Knee Rotation */}
          <TouchableOpacity
            style={[styles.ButtonContainer, { display: checkDiplayAllowedExercise('Knee Rotation') }]}
            onPress={() => setModalVisible7(true)}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Knee Rotation</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/KneeRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/*Standing March */}
          <TouchableOpacity style={[styles.ButtonContainer, { display: checkDiplayAllowedExercise('Standing March') }]} onPress={open8}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Standing March</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Marchingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Shoulder Roll */}
          <TouchableOpacity style={[styles.ButtonContainer, { display: checkDiplayAllowedExercise('Shoulder Roll') }]} onPress={open9}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Shoulder Roll</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Shoulderroll.jpg")}
              />
            </View>
          </TouchableOpacity>
        </>
      )}

      {category === 'Under Weight' && (
        <>
          <Text>Under Weight</Text>
          <TouchableOpacity style={[styles.ButtonContainer, { display: checkDiplayAllowedExercise('Jogging') }]} onPress={open}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Jogging</Text>
                <Text>Calories Burn: 93</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Joggingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.ButtonContainer, { display: checkDiplayAllowedExercise('Jogging') }]} onPress={open1}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Walking</Text>
                <Text>Calories Burn: 67</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Walkingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.ButtonContainer, { display: checkDiplayAllowedExercise('Jogging') }]} onPress={open2}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Light Dumbbell</Text>
                <Text>Calories Burn: 36</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/LightDumbbell.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.ButtonContainer, { display: checkDiplayAllowedExercise('Jogging') }]} onPress={open3}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Jumping Jack</Text>
                <Text>Calories Burn: 80</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/JumpingJacks.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.ButtonContainer, { display: checkDiplayAllowedExercise('Jogging') }]} onPress={open4}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Hip Rotation</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/HipRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Head Rotation */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open5}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Head Rotation</Text>
                <Text>Calories Burn: 10</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/HeadRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Arm Rotation */}
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={() => setModalVisible6(true)}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Arm Rotation</Text>
                <Text>Calories Burn: 10</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>

              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/ArmRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Knee Rotation */}
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={() => setModalVisible7(true)}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Knee Rotation</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/KneeRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/*Standing March */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open8}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Standing March</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Marchingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Shoulder Roll */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open9}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Shoulder Roll</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Shoulderroll.jpg")}
              />
            </View>
          </TouchableOpacity>
        </>
      )}

      {category === 'Fatigue' && (
        <>
          <Text>Fatigue</Text>
          <TouchableOpacity style={styles.ButtonContainer} onPress={open1}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Walking</Text>
                <Text>Calories Burn: 67</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Walkingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ButtonContainer} onPress={open2}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Light Dumbbell</Text>
                <Text>Calories Burn: 36</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/LightDumbbell.jpg")}
              />
            </View>
          </TouchableOpacity>


          <TouchableOpacity style={styles.ButtonContainer} onPress={open4}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Hip Rotation</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/HipRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Head Rotation */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open5}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Head Rotation</Text>
                <Text>Calories Burn: 10</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/HeadRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Arm Rotation */}
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={() => setModalVisible6(true)}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Arm Rotation</Text>
                <Text>Calories Burn: 10</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>

              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/ArmRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Knee Rotation */}
          <TouchableOpacity
            style={styles.ButtonContainer}
            onPress={() => setModalVisible7(true)}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Knee Rotation</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/KneeRotation.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/*Standing March */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open8}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Standing March</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Marchingfrontview.jpg")}
              />
            </View>
          </TouchableOpacity>
          {/* Shoulder Roll */}
          <TouchableOpacity style={styles.ButtonContainer} onPress={open9}>
            <View style={styles.exerciseContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textHeaderContainer}>Shoulder Roll</Text>
                <Text>Calories Burn: 20</Text>
                <Text>Duration: 3 Minutes</Text>
              </View>
              <Image
                style={styles.ImageContainer}
                source={require("../ExercisePlan/menuImage/Shoulderroll.jpg")}
              />
            </View>
          </TouchableOpacity>
        </>
      )}


      {category === '' && (

        <View style={{ marginTop: 20, padding: 10, backgroundColor: 'lightgray' }}>
          <Text>No Category Match</Text>
        </View>

      )}

      {/* 
      <TouchableOpacity style={styles.ButtonContainer} onPress={open}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Jogging</Text>
            <Text>Calories Burn: 93</Text>
            <Text>Duration: 10 Minutes</Text>
          </View>
           <Video
        ref={videoRef}
        source={require('../ExercisePlan/picture/Ecercise/Jogging.mp4')}
        style={{height: 100, width: 100, alignSelf: "center", borderRadius: 20,}}
        resizeMode="contain"
        useNativeControls={false}
        onReadyForDisplay={handleReadyForDisplay}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      /> 
        </View>
      </TouchableOpacity> */}

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >


        <TouchableOpacity
          style={{ marginTop: 20, position: "absolute", marginLeft: 20 }}
          onPress={() => setModalVisible(false)}
        >
          <Image
            style={{ height: 20, width: 25, resizeMode: "stretch" }}
            source={require("../ExercisePlan/picture/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png")}
          />
        </TouchableOpacity>
        <Video
          ref={videoRef}
          source={require('../ExercisePlan/picture/Ecercise/Jogging.mp4')}
          style={{ height: 280, width: 280, alignSelf: "center", marginTop: 10, }}
          resizeMode="contain"
          useNativeControls={false}
          onReadyForDisplay={handleReadyForDisplay}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
            markExerciseDone(20, "3 minutes", "Jogging");
          }}
          style={{
            marginTop: 15,
            position: "absolute",
            marginLeft: 20,
            right: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>Done</Text>
        </TouchableOpacity>

        <View style={{ backgroundColor: "#AFD3E2", marginTop: 5, height: 500, borderTopRightRadius: 20, borderTopLeftRadius: 20, }}>
          <Text style={styles.exerciseName}>Jogging</Text>
          {/*Exercise Timer*/}
          <View style={styles.subModalContainer}>
            <View style={styles.CaloriesContainer}>
              <Image
                style={styles.calorieLogo}
                source={require("../ExercisePlan/picture/calories.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                Calories Burn: 20
              </Text>
            </View>
          </View>

          <View
            style={{
              alignSelf: "center",
              marginTop: 40,
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 80,
                marginBottom: 10,
                marginTop: 4,
                fontWeight: "bold",
              }}
            >
              {count > 0 ? formatTime(count) : count1}
            </Text>
           
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            {!isRunning ? (
              <TouchableOpacity
                onPress={handleStart}
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Start
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
                onPress={handleStop}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Stop
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                height: 50,
                width: 100,
                borderRadius: 30,
                margin: 10,
              }}
              onPress={resetStart}
            >
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 3,
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/*  //Second Exercise */}




      {/* <TouchableOpacity style={styles.ButtonContainer} onPress={open1}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Walking</Text>
            <Text>Calories Burn: 67</Text>
            <Text>Duration: 10 Minutes</Text>
          </View>
         
        </View>
      </TouchableOpacity> */}


      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
        }}
      >
        <TouchableOpacity
          style={{ marginTop: 20, position: "absolute", marginLeft: 20 }}
          onPress={() => setModalVisible1(false)}
        >
          <Image
            style={{ height: 20, width: 25, resizeMode: "stretch" }}
            source={require("../ExercisePlan/picture/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png")}
          />
        </TouchableOpacity>

        <Video
          ref={videoRef}
          source={require('../ExercisePlan/picture/Ecercise/Walking.mp4')}
          style={{ height: 280, width: 280, alignSelf: "center", marginTop: 10, }}
          resizeMode="contain"
          useNativeControls={false}
          onReadyForDisplay={handleReadyForDisplay}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />

        <TouchableOpacity
          onPress={() => {
            setModalVisible1(false);
            markExerciseDone(67, "10 minutes", "Walking");
          }}
          style={{
            marginTop: 15,
            position: "absolute",
            marginLeft: 20,
            right: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>Done</Text>
        </TouchableOpacity>

        <View style={{ backgroundColor: "#AFD3E2", marginTop: 5, height: 500, borderTopRightRadius: 20, borderTopLeftRadius: 20, }}>
          <Text style={styles.exerciseName}>Walking</Text>
          {/*Exercise Timer*/}
          <View style={styles.subModalContainer}>
           
            <View style={styles.CaloriesContainer}>
              <Image
                style={styles.calorieLogo}
                source={require("../ExercisePlan/picture/calories.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                Calories Burn: 67
              </Text>
            </View>
          </View>

          <View
            style={{
              alignSelf: "center",
              marginTop: 40,
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
           <Text
              style={{
                fontSize: 80,
                marginBottom: 10,
                marginTop: 4,
                fontWeight: "bold",
              }}
            >
              {count > 0 ? formatTime(count) : count1}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            {!isRunning ? (
              <TouchableOpacity
                onPress={handleStart1}
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Start
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
                onPress={handleStop1}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Stop
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                height: 50,
                width: 100,
                borderRadius: 30,
                margin: 10,
              }}
              onPress={resetStart1}
            >
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 3,
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/*  //Third Exercise Dumbbell */}
      {/* <TouchableOpacity style={styles.ButtonContainer} onPress={open2}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Light Dumbbell</Text>
            <Text>Calories Burn: 36</Text>
            <Text>Duration: 5 Minutes</Text>
          </View>
         
        </View>
      </TouchableOpacity> */}

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <TouchableOpacity
          style={{ marginTop: 20, position: "absolute", marginLeft: 20 }}
          onPress={() => setModalVisible2(false)}
        >
          <Image
            style={{ height: 20, width: 25, resizeMode: "stretch" }}
            source={require("../ExercisePlan/picture/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png")}
          />
        </TouchableOpacity>
        <Video
          ref={videoRef}
          source={require('../ExercisePlan/picture/Ecercise/lightDumbell.mp4')}
          style={{ height: 280, width: 280, alignSelf: "center", marginTop: 10, }}
          resizeMode="contain"
          useNativeControls={false}
          onReadyForDisplay={handleReadyForDisplay}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />

        <TouchableOpacity
          onPress={() => {
            setModalVisible2(false);
            markExerciseDone(36, "5 minutes", "Light Dumbbell");
          }}
          style={{
            marginTop: 15,
            position: "absolute",
            marginLeft: 20,
            right: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>Done</Text>
        </TouchableOpacity>

        <View style={{ backgroundColor: "#AFD3E2", marginTop: 5, height: 500, borderTopRightRadius: 20, borderTopLeftRadius: 20, }}>
          <Text style={styles.exerciseName}>Light Dumbbell</Text>
          {/*Exercise Timer*/}
          <View style={styles.subModalContainer}>
           
            <View style={styles.CaloriesContainer}>
              <Image
                style={styles.calorieLogo}
                source={require("../ExercisePlan/picture/calories.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                Calories Burn: 36
              </Text>
            </View>
          </View>

          <View
            style={{
              alignSelf: "center",
              marginTop: 40,
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 80,
                marginBottom: 10,
                marginTop: 4,
                fontWeight: "bold",
              }}
            >
              {count > 0 ? formatTime(count) : count1}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            {!isRunning ? (
              <TouchableOpacity
                onPress={handleStart2}
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Start
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
                onPress={handleStop2}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Stop
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                height: 50,
                width: 100,
                borderRadius: 30,
                margin: 10,
              }}
              onPress={resetStart2}
            >
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 3,
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/*  //Fourth Exercise Jumping Jack*/}
      {/* <TouchableOpacity style={styles.ButtonContainer} onPress={open3}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Jumping Jack</Text>
            <Text>Calories Burn: 80</Text>
            <Text>Duration: 5 Minutes</Text>
          </View>
        
        </View>
      </TouchableOpacity> */}

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(!modalVisible3);
        }}
      >
        <TouchableOpacity
          style={{ marginTop: 20, position: "absolute", marginLeft: 20 }}
          onPress={() => setModalVisible3(false)}
        >

          <Image
            style={{ height: 20, width: 25, resizeMode: "stretch" }}
            source={require("../ExercisePlan/picture/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png")}
          />
        </TouchableOpacity>

        {/* <Image
          style={styles.ImageContainerInfo}
          source={require("../ExercisePlan/picture/Ecercise/jumpingJack.gif")}
        /> */}
        <Video
          ref={videoRef}
          source={require('../ExercisePlan/picture/Ecercise/JumpingJack.mp4')}
          style={{ height: 280, width: 280, alignSelf: "center", marginTop: 20, }}
          resizeMode="contain"
          useNativeControls={false}
          onReadyForDisplay={handleReadyForDisplay}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />


        <TouchableOpacity
          onPress={() => {
            setModalVisible3(false);
            markExerciseDone(80, "10 minutes", "Jumping Jack");
          }}
          style={{
            marginTop: 15,
            position: "absolute",
            marginLeft: 20,
            right: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>Done</Text>
        </TouchableOpacity>


        <View style={{ backgroundColor: "#AFD3E2", marginTop: 5, height: 500, borderTopRightRadius: 20, borderTopLeftRadius: 20, }}>
          <Text style={styles.exerciseName}>Jumping Jack</Text>
          {/*Exercise Timer*/}
          <View style={styles.subModalContainer}>
            
            <View style={styles.CaloriesContainer}>
              <Image
                style={styles.calorieLogo}
                source={require("../ExercisePlan/picture/calories.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                Calories Burn: 80
              </Text>
            </View>
          </View>

          <View
            style={{
              alignSelf: "center",
              marginTop: 40,
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 80,
                marginBottom: 10,
                marginTop: 4,
                fontWeight: "bold",
              }}
            >
              {count > 0 ? formatTime(count) : count1}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            {!isRunning ? (
              <TouchableOpacity
                onPress={handleStart3}
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Start
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
                onPress={handleStop3}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Stop
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                height: 50,
                width: 100,
                borderRadius: 30,
                margin: 10,
              }}
              onPress={resetStart3}
            >
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 3,
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Fifth Exercise */}
      {/* <TouchableOpacity style={styles.ButtonContainer} onPress={open4}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Hip Rotation</Text>
            <Text>Calories Burn: 20</Text>
            <Text>Duration: 5 Minutes</Text>
          </View>
        
        </View>
      </TouchableOpacity> */}

      <Modal

        animationType="slide"
        transparent={false}
        visible={modalVisible4}
        onRequestClose={() => {
          setModalVisible4(!modalVisible4);
        }}
      >
        <TouchableOpacity
          style={{ marginTop: 20, position: "absolute", marginLeft: 20 }}
          onPress={setModalVisible4}
        >
          <Image
            style={{ height: 20, width: 25, resizeMode: "stretch" }}
            source={require("../ExercisePlan/picture/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png")}
          />
        </TouchableOpacity>

        <Video
          ref={videoRef}
          source={require('../ExercisePlan/picture/Ecercise/hipRotation.mp4')}
          style={{ height: 280, width: 280, alignSelf: "center", marginTop: 20, }}
          resizeMode="contain"
          useNativeControls={false}
          onReadyForDisplay={handleReadyForDisplay}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />

        <TouchableOpacity
          onPress={() => {
            setModalVisible4(false);
            markExerciseDone(20, "3 minutes", "Hip Rotation");
          }}
          style={{
            marginTop: 15,
            position: "absolute",
            marginLeft: 20,
            right: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>Done</Text>
        </TouchableOpacity>

        <View style={styles.modalMainContainer}>
          <Text style={styles.exerciseName}>Hip Rotation</Text>
          {/*Exercise Timer*/}
          <View style={styles.subModalContainer}>
            
            <View style={styles.CaloriesContainer}>
              <Image
                style={styles.calorieLogo}
                source={require("../ExercisePlan/picture/calories.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                Calories Burn: 20
              </Text>
            </View>
          </View>

          <View
            style={{
              alignSelf: "center",
              marginTop: 40,
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 80,
                marginBottom: 10,
                marginTop: 4,
                fontWeight: "bold",
              }}
            >
              {count > 0 ? formatTime(count) : count1}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            {!isRunning ? (
              <TouchableOpacity
                onPress={handleStart4}
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Start
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
                onPress={handleStop4}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Stop
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                height: 50,
                width: 100,
                borderRadius: 30,
                margin: 10,
              }}
              onPress={resetStart4}
            >
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 3,
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* sixth Exercise */}
      {/* <TouchableOpacity style={styles.ButtonContainer} onPress={open5}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Head Rotation</Text>
            <Text>Calories Burn: 10</Text>
            <Text>Duration: 5 Minutes</Text>
          </View>
       
        </View>
      </TouchableOpacity> */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible5}
        onRequestClose={() => {
          setModalVisible5(!modalVisible5);
        }}
      >
        <TouchableOpacity
          style={{ marginTop: 20, position: "absolute", marginLeft: 20 }}
          onPress={setModalVisible5}
        >
          <Image
            style={{ height: 20, width: 25, resizeMode: "stretch" }}
            source={require("../ExercisePlan/picture/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png")}
          />
        </TouchableOpacity>
        <Video
          ref={videoRef}
          source={require('../ExercisePlan/picture/Ecercise/headRotation.mp4')}
          style={{ height: 280, width: 280, alignSelf: "center", marginTop: 20, }}
          resizeMode="contain"
          useNativeControls={false}
          onReadyForDisplay={handleReadyForDisplay}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />

        <TouchableOpacity
          onPress={() => {
            setModalVisible5(false);
            markExerciseDone(10, "5 minutes", "Head Rotation");
          }}
          style={{
            marginTop: 15,
            position: "absolute",
            marginLeft: 20,
            right: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>Done</Text>
        </TouchableOpacity>

        <View style={styles.modalMainContainer}>
          <Text style={styles.exerciseName}>Head Rotation</Text>
          {/*Exercise Timer*/}
          <View style={styles.subModalContainer}>
            
            <View style={styles.CaloriesContainer}>
              <Image
                style={styles.calorieLogo}
                source={require("../ExercisePlan/picture/calories.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                Calories Burn: 10
              </Text>
            </View>
          </View>

          <View
            style={{
              alignSelf: "center",
              marginTop: 40,
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 80,
                marginBottom: 10,
                marginTop: 4,
                fontWeight: "bold",
              }}
            >
              {count > 0 ? formatTime(count) : "5:00"}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            {!isRunning ? (
              <TouchableOpacity
                onPress={handleStart4}
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Start
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
                onPress={handleStop4}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Stop
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                height: 50,
                width: 100,
                borderRadius: 30,
                margin: 10,
              }}
              onPress={resetStart4}
            >
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 3,
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* seventh Exercise */}
      {/* <TouchableOpacity
        style={styles.ButtonContainer}
        onPress={() => setModalVisible6(true)}
      >
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Arm Rotation</Text>
            <Text>Calories Burn: 10</Text>
            <Text>Duration: 5 Minutes</Text>
          </View>
       
          
        </View>
      </TouchableOpacity> */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible6}
        onRequestClose={() => {
          setModalVisible6(!modalVisible6);
        }}
      >
        <View style={{ backgroundColor: '#fff', borderRadius: 10, borderBottomColor: 'black' }}>
          <View style={{ borderRadius: 100, height: 200, width: 120, alignSelf: "center", borderRadius: 20, }}>
            <Video
              ref={videoRef}
              source={require('../ExercisePlan/picture/Ecercise/ArmRotation.mp4')}
              style={{ height: 280, width: 280, alignSelf: "center", marginTop: 20, }}
              resizeMode="contain"
              useNativeControls={false}
              onReadyForDisplay={handleReadyForDisplay}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
          </View>

          <TouchableOpacity
            style={{ marginTop: 20, position: "absolute", marginLeft: 10, }}
            onPress={setModalVisible6}
          >
            <Image
              style={{ height: 20, width: 25, resizeMode: "stretch" }}
              source={require("../ExercisePlan/picture/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible6(false);
              markExerciseDone(10, "5 minutes", "Arm Rotation");
            }}
            style={{
              marginTop: 15,
              position: "absolute",
              marginLeft: 20,
              right: 20,
            }}
          >
            <Text style={{ fontSize: 20 }}>Done</Text>
          </TouchableOpacity>

          <View style={{ backgroundColor: "#AFD3E2", marginTop: 110, height: 500, borderTopRightRadius: 20, borderTopLeftRadius: 20, }}>
            <Text style={styles.exerciseName}>Arm Rotation</Text>
            {/*Exercise Timer*/}
            <View style={styles.subModalContainer}>
             
              <View style={styles.CaloriesContainer}>
                <Image
                  style={styles.calorieLogo}
                  source={require("../ExercisePlan/picture/calories.png")}
                />
                <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                  Calories Burn: 10
                </Text>
              </View>
            </View>

            <View
              style={{
                alignSelf: "center",
                marginTop: 40,
                flexDirection: "row",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 80,
                  marginBottom: 10,
                  marginTop: 4,
                  fontWeight: "bold",
                }}
              >
                {count > 0 ? formatTime(count) : count1}
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              {!isRunning ? (
                <TouchableOpacity
                  onPress={handleStart4}
                  style={{
                    backgroundColor: "green",
                    height: 50,
                    width: 100,
                    borderRadius: 30,
                    margin: 10,
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      marginTop: 3,
                      fontSize: 30,
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    Start
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "green",
                    height: 50,
                    width: 100,
                    borderRadius: 30,
                    margin: 10,
                  }}
                  onPress={handleStop4}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      marginTop: 3,
                      fontSize: 30,
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    Stop
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
                onPress={resetStart4}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* eighth Exercise */}
      {/* <TouchableOpacity
        style={styles.ButtonContainer}
        onPress={() => setModalVisible7(true)}
      >
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Knee Rotation</Text>
            <Text>Calories Burn: 20</Text>
            <Text>Duration: 5 Minutes</Text>
          </View>
        
        </View>
      </TouchableOpacity> */}

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible7}
        onRequestClose={() => {
          setModalVisible7(!modalVisible7);
        }}
      >
        <TouchableOpacity
          style={{ marginTop: 20, position: "absolute", marginLeft: 20 }}
          onPress={setModalVisible7}
        >
          <Image
            style={{ height: 20, width: 25, resizeMode: "stretch" }}
            source={require("../ExercisePlan/picture/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png")}
          />
        </TouchableOpacity>

        <Video
          ref={videoRef}
          source={require('../ExercisePlan/picture/Ecercise/kneeRotation.mp4')}
          style={{ height: 280, width: 280, alignSelf: "center", marginTop: 20, }}
          resizeMode="contain"
          useNativeControls={false}
          onReadyForDisplay={handleReadyForDisplay}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />

        <TouchableOpacity
          onPress={() => {
            setModalVisible7(false);
            markExerciseDone(20, "5 minutes", "Jogging");
          }}
          style={{
            marginTop: 15,
            position: "absolute",
            marginLeft: 20,
            right: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>Done</Text>
        </TouchableOpacity>

        <View style={styles.modalMainContainer}>
          <Text style={styles.exerciseName}>Knee Rotation</Text>
          {/*Exercise Timer*/}
          <View style={styles.subModalContainer}>
          
            <View style={styles.CaloriesContainer}>
              <Image
                style={styles.calorieLogo}
                source={require("../ExercisePlan/picture/calories.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                Calories Burn: 20
              </Text>
            </View>
          </View>

          <View
            style={{
              alignSelf: "center",
              marginTop: 40,
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 80,
                marginBottom: 10,
                marginTop: 4,
                fontWeight: "bold",
              }}
            >
              {count > 0 ? formatTime(count) : count1}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            {!isRunning ? (
              <TouchableOpacity
                onPress={handleStart4}
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Start
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
                onPress={handleStop4}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Stop
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                height: 50,
                width: 100,
                borderRadius: 30,
                margin: 10,
              }}
              onPress={resetStart4}
            >
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 3,
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* ninth Exercise */}
      {/* <TouchableOpacity style={styles.ButtonContainer} onPress={open8}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Standing March</Text>
            <Text>Calories Burn: 20</Text>
            <Text>Duration: 5 Minutes</Text>
          </View>
     
        </View>
      </TouchableOpacity> */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible8}
        onRequestClose={() => {
          setModalVisible8(!modalVisible8);
        }}
      >
        <TouchableOpacity
          style={{ marginTop: 20, position: "absolute", marginLeft: 20 }}
          onPress={setModalVisible8}
        >
          <Image
            style={{ height: 20, width: 25, resizeMode: "stretch" }}
            source={require("../ExercisePlan/picture/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png")}
          />
        </TouchableOpacity>

        <Video
          ref={videoRef}
          source={require('../ExercisePlan/picture/Ecercise/march.mp4')}
          style={{ height: 280, width: 280, alignSelf: "center", marginTop: 20, }}
          resizeMode="contain"
          useNativeControls={false}
          onReadyForDisplay={handleReadyForDisplay}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />

        <TouchableOpacity
          onPress={() => {
            setModalVisible8(false);
            markExerciseDone(20, "5 minutes", "Standing March");
          }}
          style={{
            marginTop: 15,
            position: "absolute",
            marginLeft: 20,
            right: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>Done</Text>
        </TouchableOpacity>

        <View style={styles.modalMainContainer}>
          <Text style={styles.exerciseName}>Standing March</Text>
          {/*Exercise Timer*/}
          <View style={styles.subModalContainer}>
            
            <View style={styles.CaloriesContainer}>
              <Image
                style={styles.calorieLogo}
                source={require("../ExercisePlan/picture/calories.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                Calories Burn: 20
              </Text>
            </View>
          </View>

          <View
            style={{
              alignSelf: "center",
              marginTop: 40,
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 80,
                marginBottom: 10,
                marginTop: 4,
                fontWeight: "bold",
              }}
            >
              {count > 0 ? formatTime(count) : count1}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            {!isRunning ? (
              <TouchableOpacity
                onPress={handleStart4}
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Start
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
                onPress={handleStop4}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Stop
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                height: 50,
                width: 100,
                borderRadius: 30,
                margin: 10,
              }}
              onPress={resetStart4}
            >
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 3,
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* tenth Exercise */}
      {/* <TouchableOpacity style={styles.ButtonContainer} onPress={open9}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Shoulder Roll</Text>
            <Text>Calories Burn: 20</Text>
            <Text>Duration: 5 Minutes</Text>
          </View>
         
        </View>
      </TouchableOpacity> */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible9}
        onRequestClose={() => {
          setModalVisible9(!modalVisible9);
        }}
      >
        <TouchableOpacity
          style={{ marginTop: 20, position: "absolute", marginLeft: 20 }}
          onPress={setModalVisible9}
        >

          <Image
            style={{ height: 20, width: 25, resizeMode: "stretch" }}
            source={require("../ExercisePlan/picture/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png")}
          />
        </TouchableOpacity>
        <Video
          ref={videoRef}
          source={require('../ExercisePlan/picture/Ecercise/roll.mp4')}
          style={{ height: 280, width: 280, alignSelf: "center", marginTop: 20, }}
          resizeMode="contain"
          useNativeControls={false}
          onReadyForDisplay={handleReadyForDisplay}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />


        <TouchableOpacity
          onPress={() => {
            setModalVisible9(false);
            markExerciseDone(20, "5 minutes", "Shoulder Roll");
          }}
          style={{
            marginTop: 15,
            position: "absolute",
            marginLeft: 20,
            right: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>Done</Text>
        </TouchableOpacity>

        <View style={styles.modalMainContainer}>
          <Text style={styles.exerciseName}>Shoulder Roll</Text>
          {/*Exercise Timer*/}
          <View style={styles.subModalContainer}>
            
            <View style={styles.CaloriesContainer}>
              <Image
                style={styles.calorieLogo}
                source={require("../ExercisePlan/picture/calories.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                Calories Burn: 20
              </Text>
            </View>
          </View>

          <View
            style={{
              alignSelf: "center",
              marginTop: 40,
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 80,
                marginBottom: 10,
                marginTop: 4,
                fontWeight: "bold",
              }}
            >
              {count > 0 ? formatTime(count) : count1}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            {!isRunning ? (
              <TouchableOpacity
                onPress={handleStart4}
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Start
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  height: 50,
                  width: 100,
                  borderRadius: 30,
                  margin: 10,
                }}
                onPress={handleStop4}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 3,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Stop
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                height: 50,
                width: 100,
                borderRadius: 30,
                margin: 10,
              }}
              onPress={resetStart4}
            >
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 3,
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
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
  ImageContainer: {
    height: 120,
    width: 80,
    borderRadius: 10,
    marginLeft: 70,
    resizeMode: "stretch",
  },
  ImageContainerInfo: {
    height: 320,
    width: 210,
    resizeMode: "stretch",
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 5,
    borderRadius: 10,
    borderColor: 'yellow',
    borderWidth: 10,
  },
  ButtonContainer: {
    backgroundColor: "#fff",
    height: 150,
    width: 340,
    alignSelf: "center",
    alignItems: "center",
    margin: 8,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000', // iOS
    shadowOffset: { width: 10, height: 1 },
    shadowRadius: 2,
  },
  exerciseContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  textContainer: {
    marginRight: 20,
  },
  textHeaderContainer: {
    marginBottom: 10,
    marginTop: -5,
    fontSize: 20,
    fontWeight: "bold",
  },
  modalMainContainer: {
    backgroundColor: "#AFD3E2",
    marginTop: 10,
    height: 500,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  subModalContainer: {
    flexDirection: "row",
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
    marginBottom: 20,
  },
  timeClock: {
    height: 15,
    width: 15,
    marginLeft: 9,
    resizeMode: "stretch",
    marginRight: 2,
  },
  calorieLogo: {
    height: 15,
    width: 15,
    marginLeft: 15,
    resizeMode: "stretch",
    marginRight: 2,
  },
  CaloriesContainer: {
    backgroundColor: "#adadc9",
    width: 160,
    alignItems: "center",
    height: 30,
    borderRadius: 20,
    marginLeft: 10,
    flexDirection: "row",
  },

  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dayButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  selectedDayButton: {
    backgroundColor: "blue",
  },
  dayButtonText: {
    fontSize: 16,
  },
  selectedDayButtonText: {
    color: "white",
  },
  selectedDayText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  videoContainer: {
    width: 200, // Adjust the width of the video
    height: 120, // Adjust the height of the video
  },
});
