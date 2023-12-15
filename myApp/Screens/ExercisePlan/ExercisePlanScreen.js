import { ca } from "date-fns/locale";
import React, { useState, useEffect } from "react";
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
export default ExercisePlanScreen = ({ navigation, route }) => {
  const [isBurnedCaloriesModalVisible, setIsBurnedCaloriesModalVisible] =
    useState(false);
  const [exerciseBurnedDetails, setExerciseBurnedDetails] = useState({
    burnedCalories: 0,
  });
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

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
  const handleStart1 = () => {
    setCount1(600); // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop1 = () => {
    setIsRunning(false);
  };
  const resetStart1 = () => {
    setCount(600); // 10 minutes in seconds
    setIsRunning(false);
  };

  const handleStart2 = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop2 = () => {
    setIsRunning(false);
  };
  const resetStart2 = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(false);
  };

  const handleStart3 = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop3 = () => {
    setIsRunning(false);
  };
  const resetStart3 = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(false);
  };

  const handleStart4 = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop4 = () => {
    setIsRunning(false);
  };
  const resetStart4 = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(false);
  };

  const handleStart5 = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop5 = () => {
    setIsRunning(false);
  };
  const resetStart5 = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(false);
  };

  const handleStart6 = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop6 = () => {
    setIsRunning(false);
  };
  const resetStart6 = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(false);
  };

  const handleStart7 = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop7 = () => {
    setIsRunning(false);
  };
  const resetStart7 = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(false);
  };

  const handleStart8 = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop8 = () => {
    setIsRunning(false);
  };
  const resetStart8 = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(false);
  };
  const handleStart9 = () => {
    setCount(300); // 10 minutes in seconds
    setIsRunning(true);
  };

  const handleStop9 = () => {
    setIsRunning(false);
  };
  const resetStart9 = () => {
    setCount(300); // 10 minutes in seconds
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


  const [status, setStatus] = React.useState({});
  const [video, setVideo] = React.useState({});



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
      {/*  //First Exercise */}
      <TouchableOpacity style={styles.ButtonContainer} onPress={open}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Jogging</Text>
            <Text>Calories Burn: 93</Text>
            <Text>Duration: 10 Minutes</Text>
          </View>
          <Image
            style={styles.ImageContainer}
            source={require("../ExercisePlan/picture/Ecercise/jogging.gif")}
          />
        </View>
      </TouchableOpacity>

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
          <Image
          style={styles.ImageContainerInfo}
          source={require("../ExercisePlan/picture/Ecercise/jogging.gif")}
        />
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
            markExerciseDone(93, "10 minutes", "Jogging");
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

        <View style={{backgroundColor: "#AFD3E2", marginTop: 5, height: 500, borderTopRightRadius: 20, borderTopLeftRadius: 20,}}>
          <Text style={styles.exerciseName}>Jogging</Text>
          {/*Exercise Timer*/}
          <View style={styles.subModalContainer}>
            <View style={styles.HeadersContainer}>
              <Image
                style={styles.timeClock}
                source={require("../ExercisePlan/picture/clock.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                30mins
              </Text>
            </View>
            <View style={styles.CaloriesContainer}>
              <Image
                style={styles.calorieLogo}
                source={require("../ExercisePlan/picture/calories.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                Calories Burn: 93
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
              {count > 0 ? formatTime(count) : "30:00"}
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
      <TouchableOpacity style={styles.ButtonContainer} onPress={open1}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Walking</Text>
            <Text>Calories Burn: 67</Text>
            <Text>Duration: 10 Minutes</Text>
          </View>
          <Image
            style={styles.ImageContainer}
            source={require("../ExercisePlan/picture/Ecercise/walking.gif")}
          />
        </View>
      </TouchableOpacity>

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

        <Image
          style={styles.ImageContainerInfo}
          source={require("../ExercisePlan/picture/Ecercise/walking.gif")}
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

        <View style={{  backgroundColor: "#AFD3E2", marginTop: 5, height: 500, borderTopRightRadius: 20, borderTopLeftRadius: 20,}}>
          <Text style={styles.exerciseName}>Walking</Text>
          {/*Exercise Timer*/}
          <View style={styles.subModalContainer}>
            <View style={styles.HeadersContainer}>
              <Image
                style={styles.timeClock}
                source={require("../ExercisePlan/picture/clock.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                10mins
              </Text>
            </View>
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
              {count > 0 ? formatTime(count) : "10:00"}
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
      <TouchableOpacity style={styles.ButtonContainer} onPress={open2}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Light Dumbbell</Text>
            <Text>Calories Burn: 36</Text>
            <Text>Duration: 5 Minutes</Text>
          </View>
          <Image
            style={styles.ImageContainer}
            source={require("../ExercisePlan/picture/Ecercise/lightDumbell.gif")}
          />
        </View>
      </TouchableOpacity>

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

        <Image
          style={styles.ImageContainerInfo}
          source={require("../ExercisePlan/picture/Ecercise/lightDumbell.gif")}
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

        <View style={{  backgroundColor: "#AFD3E2", marginTop: 5, height: 500, borderTopRightRadius: 20, borderTopLeftRadius: 20,}}>
          <Text style={styles.exerciseName}>Light Dumbbell</Text>
          {/*Exercise Timer*/}
          <View style={styles.subModalContainer}>
            <View style={styles.HeadersContainer}>
              <Image
                style={styles.timeClock}
                source={require("../ExercisePlan/picture/clock.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                5mins
              </Text>
            </View>
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
              {count > 0 ? formatTime(count) : "5:00"}
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
      <TouchableOpacity style={styles.ButtonContainer} onPress={open3}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Jumping Jack</Text>
            <Text>Calories Burn: 80</Text>
            <Text>Duration: 5 Minutes</Text>
          </View>
          <Image
            style={styles.ImageContainer}
            source={require("../ExercisePlan/picture/Ecercise/jumpingJack.gif")}
          />
        </View>
      </TouchableOpacity>

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

        <Image
          style={styles.ImageContainerInfo}
          source={require("../ExercisePlan/picture/Ecercise/jumpingJack.gif")}
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

        <View style={{  backgroundColor: "#AFD3E2", marginTop: 5, height: 500, borderTopRightRadius: 20,borderTopLeftRadius: 20,}}>
          <Text style={styles.exerciseName}>Jumping Jack</Text>
          {/*Exercise Timer*/}
          <View style={styles.subModalContainer}>
            <View style={styles.HeadersContainer}>
              <Image
                style={styles.timeClock}
                source={require("../ExercisePlan/picture/clock.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                5mins
              </Text>
            </View>
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
              {count > 0 ? formatTime(count) : "5:00"}
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
      <TouchableOpacity style={styles.ButtonContainer} onPress={open4}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Hip Rotation</Text>
            <Text>Calories Burn: 20</Text>
            <Text>Duration: 5 Minutes</Text>
          </View>
          <Image
            style={styles.ImageContainer}
            source={require("../ExercisePlan/picture/hip-circles-exercise-illustration.gif")}
          />
        </View>
      </TouchableOpacity>
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

        <Image
          style={styles.ImageContainerInfo}
          source={require("../ExercisePlan/picture/hip-circles-exercise-illustration.gif")}
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
            <View style={styles.HeadersContainer}>
              <Image
                style={styles.timeClock}
                source={require("../ExercisePlan/picture/clock.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                5mins
              </Text>
            </View>
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
      {/* sixth Exercise */}
      <TouchableOpacity style={styles.ButtonContainer} onPress={open5}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Head Rotation</Text>
            <Text>Calories Burn: 10</Text>
            <Text>Duration: 5 Minutes</Text>
          </View>
          <Image
            style={styles.ImageContainer}
            source={require("../ExercisePlan/picture/neck.gif")}
          />
        </View>
      </TouchableOpacity>
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

        <Image
          style={styles.ImageContainerInfo}
          source={require("../ExercisePlan/picture/neck.gif")}
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
            <View style={styles.HeadersContainer}>
              <Image
                style={styles.timeClock}
                source={require("../ExercisePlan/picture/clock.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                5mins
              </Text>
            </View>
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
      <TouchableOpacity
        style={styles.ButtonContainer}
        onPress={() => setModalVisible6(true)}
      >
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Arm Rotation</Text>
            <Text>Calories Burn: 10</Text>
            <Text>Duration: 5 Minutes</Text>
          </View>
       
           <Image
            style={styles.ImageContainer}
            source={require("../ExercisePlan/picture/armRotation.gif")}
          />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible6}
        onRequestClose={() => {
          setModalVisible6(!modalVisible6);
        }}
      >
<View style= {{backgroundColor: '#f9eed9', borderRadius: 10, borderBottomColor: 'black'}}>
<View style = {{borderRadius: 100, height: 200, width: 120, alignSelf: "center", borderRadius: 20,}}>
        <Image
          style={styles.ImageContainerInfo}
          source={require("../ExercisePlan/picture/armRotation.gif")}
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

        <View style={styles.modalMainContainer}>
          <Text style={styles.exerciseName}>Arm Rotation</Text>
          {/*Exercise Timer*/}
          <View style={styles.subModalContainer}>
            <View style={styles.HeadersContainer}>
              <Image
                style={styles.timeClock}
                source={require("../ExercisePlan/picture/clock.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                5mins
              </Text>
            </View>
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
        </View>
      </Modal>
      {/* eighth Exercise */}
      <TouchableOpacity
        style={styles.ButtonContainer}
        onPress={() => setModalVisible7(true)}
      >
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Knee Rotation</Text>
            <Text>Calories Burn: 20</Text>
            <Text>Duration: 5 Minutes</Text>
          </View>
          <Image
            style={styles.ImageContainer}
            source={require("../ExercisePlan/picture/knee-circles-exercise-illustration.gif")}
          />
        </View>
      </TouchableOpacity>

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

        <Image
          style={styles.ImageContainerInfo}
          source={require("../ExercisePlan/picture/knee-circles-exercise-illustration.gif")}
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
          <Text style={styles.exerciseName}>Hip Rotation</Text>
          {/*Exercise Timer*/}
          <View style={styles.subModalContainer}>
            <View style={styles.HeadersContainer}>
              <Image
                style={styles.timeClock}
                source={require("../ExercisePlan/picture/clock.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                5mins
              </Text>
            </View>
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
      {/* ninth Exercise */}
      <TouchableOpacity style={styles.ButtonContainer} onPress={open8}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Standing March</Text>
            <Text>Calories Burn: 20</Text>
            <Text>Duration: 5 Minutes</Text>
          </View>
          <Image
            style={styles.ImageContainer}
            source={require("../ExercisePlan/picture/march-in-place-exercise-illustration.gif")}
          />
        </View>
      </TouchableOpacity>
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

        <Image
          style={styles.ImageContainerInfo}
          source={require("../ExercisePlan/picture/march-in-place-exercise-illustration.gif")}
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
            <View style={styles.HeadersContainer}>
              <Image
                style={styles.timeClock}
                source={require("../ExercisePlan/picture/clock.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                5mins
              </Text>
            </View>
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
      {/* tenth Exercise */}
      <TouchableOpacity style={styles.ButtonContainer} onPress={open9}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeaderContainer}>Shoulder Roll</Text>
            <Text>Calories Burn: 20</Text>
            <Text>Duration: 5 Minutes</Text>
          </View>
          <Image
            style={styles.ImageContainer}
            source={require("../ExercisePlan/picture/neck.gif")}
          />
        </View>
      </TouchableOpacity>
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

        <Image
          style={styles.ImageContainerInfo}
          source={require("../ExercisePlan/picture/shoulder-rolls-exercise-illustration.gif")}
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
            <View style={styles.HeadersContainer}>
              <Image
                style={styles.timeClock}
                source={require("../ExercisePlan/picture/clock.png")}
              />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 4 }}>
                5mins
              </Text>
            </View>
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
    height: 100,
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
    height: 110,
    width: 320,
    alignSelf: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
  },
  exerciseContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
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
    marginTop: 180,
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
});
