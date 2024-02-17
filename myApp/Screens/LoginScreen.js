import React, { useState, useEffect } from "react";
const screenWidth = Dimensions.get("window").width - 50;
import { db } from "./Dashboard/firebaseConfig";
import { get, set, ref, push, child } from "firebase/database";
import {
    StyleSheet,
    Text,
    ScrollView,
    TextInput,
    View,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    Pressable,
    Dimensions
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default LogInScreen = ({ setShowRegisterScreen, setShowMainScreen }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setError("");
    }, [username, password]);

    const styles = StyleSheet.create({
        imageTitleHeader: {
            marginTop: 50,
            width: 100,
            height: 100,
        },

        subTitleText: {
            fontSize: 13,
            marginBottom: 20,
        },

        textTitleHeader: {
            fontSize: 25,
            fontWeight: "900",
        },

        screenContainer: {
            flex: 1,
            justifyContent: "center",
            padding: 16,
            marginTop: 230
        },

        appButtonContainer: {
            elevation: 8,
            backgroundColor: "#156d94",
            borderRadius: 20,
            width: 340,
            paddingVertical: 11,
            paddingHorizontal: 10,
        },
        appButtonText: {
            fontSize: 18,
            color: "#fff",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase",
        },

        genderContainer: {
            marginTop: 5,
            flexDirection: "row",
            borderBottomColor: "#ccc",
            marginBottom: 15,
            backgroundColor: "#f9eed9",
            borderRadius: 18,
            width: 330,
            height: 50,
        },
        genderImageContainer: {
            marginTop: 13,
            height: 25,
            marginRight: 12,
            width: 25,
            marginLeft: 16,
        },
        genderTextContainer: {
            marginRight: 5,
            flex: 1,
            borderRadius: 12,
            height: 35,
            fontSize: 17,
            marginTop: 7,

        },
        birthDateContainer: {
            flexDirection: "row",
            borderBottomColor: "#ccc",
            marginBottom: 15,
            backgroundColor: "#f9eed9",
            borderRadius: 18,
            width: 330,
            height: 50,
        },
        birthDateImageContainer: {
            marginTop: 13,
            height: 25,
            marginRight: 12,
            width: 25,
            marginLeft: 17,
        },
        birthDateTextContainer: {
            marginRight: 5,
            flex: 1,
            borderRadius: 12,
            height: 35,
            fontSize: 17,
            marginTop: 6,
        },
        weightContainer: {
            flexDirection: "row",
            borderBottomColor: "#ccc",
            marginBottom: 12,
            backgroundColor: "#f9eed9",
            borderRadius: 18,
            width: 330,
            height: 50,
        },
        weightImageContainer: {
            marginTop: 9,
            height: 30,
            marginRight: 12,
            width: 33,
            marginLeft: 13,
        },
        WeightTextContainer: {
            marginRight: 5,
            flex: 1,
            borderRadius: 12,
            height: 35,
            fontSize: 17,
            marginTop: 6,
        },
        heightContainer: {
            flexDirection: "row",
            borderBottomColor: "#ccc",
            marginBottom: 12,
            backgroundColor: "#f9eed9",
            borderRadius: 18,
            width: 330,
            height: 50,
        },
        heightImageContainer: {
            marginTop: 10,
            height: 30,
            marginRight: 12,
            width: 30,
            marginLeft: 16,
        },
        heightTextContainer: {
            marginRight: 5,
            flex: 1,
            borderRadius: 12,
            height: 35,
            fontSize: 17,
            marginTop: 6,
        },
        goalWeightContainer: {
            flexDirection: "row",
            borderBottomColor: "#ccc",
            marginBottom: 12,
            backgroundColor: "#f9eed9",
            borderRadius: 18,
            width: 330,
            height: 50,
            position: "absolute",
            top: 150,
            alignSelf: "center"
        },

        goalCheckBoxContainer: {
            backgroundColor: '#f9eed9',
            height: 50,
            margin: 10,
            width: 330,
            alignSelf: 'center',
            borderRadius: 10,
            borderStyle: 'solid',
            borderWidth: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            position: "relative",

        },

        goalCheckBox: {
            marginLeft: 10,
            marginTop: 8,
            marginBottom: 20,
            flexDirection: 'row', alignItems: 'center', marginBottom: 10

        },
        medicalHistory: {
            flexDirection: "row",
            marginBottom: 15,
            backgroundColor: "#f9eed9",
            borderRadius: 10,
            width: 330,
            height: 50,
            alignSelf: 'center',
            marginTop: 10,
            borderWidth: 1,
            borderColor: "#000"
        },
        medHistoryTextContainer: {
            marginTop: 10,
            marginRight: 5,
            flex: 1,
            borderRadius: 12,
            height: 35,
            fontSize: 17,
            marginTop: 6,
        },
        medsImageContainer: {
            marginTop: 13,
            height: 30,
            marginRight: 12,
            width: 30,
            marginLeft: 17,

        },
        labelText: {
            // Styling for the label text
            fontSize: 1,  // Adjust the font size as needed
            fontWeight: 'bold', // Adjust the font weight as needed
            // Add any other text styling properties as needed
        },
    });

    const setAsyncDataFromJson = async (jsonData, username) => {
        try {
            await AsyncStorage.setItem('username', username);
            const keys = Object.keys(jsonData);
            console.log("jsonDatajsonData", keys);
            // Use Promise.all to set AsyncStorage values in parallel
            await Promise.all(keys.map(async (key) => {
                const value = jsonData[key];
                try {
                    await AsyncStorage.setItem(key, value);
                } catch (error) {
                    console.log(`Error setting AsyncStorage for key: ${key}`, error);
                }
            }));
            setShowMainScreen(false);

            console.log('AsyncStorage data set successfully based on the JSON string.');
        } catch (error) {
            console.error('Error setting AsyncStorage data:', error);
            // Handle errors as needed
        }
    };

    return (
        <ScrollView>
            <SafeAreaView
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}
            >
                {/*Logo*/}
                <View>
                    <Image
                        style={styles.imageTitleHeader}
                        source={require("../image/logo.png")}
                    />
                </View>

                <Text style={[styles.textTitleHeader, { marginBottom: 35 }]}>LOG IN</Text>
                {error && (
                    <Text style={{ width: 330, marginBottom: 15, color: "red", fontSize: 16, textAlign: "center" }}>
                        {error}
                    </Text>
                )}

                {/* USERNAME */}
                <Text style={{ width: 330, marginBottom: 5 }}>
                    Enter your username (Ilagay ang iyong username)
                </Text>
                <View style={styles.birthDateContainer}>
                    <Image
                        style={styles.birthDateImageContainer}
                        source={require("../image/user.png")}
                    />
                    <TextInput
                        placeholder="Enter your username"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        style={styles.birthDateTextContainer}
                    ></TextInput>
                </View>

                {/* PASSWORD */}
                <Text style={{ width: 330, marginBottom: 5 }}>
                    Enter your password (Ilagay ang iyong password)
                </Text>
                <View style={styles.birthDateContainer}>
                    <Image
                        style={styles.birthDateImageContainer}
                        source={require("../image/password.png")}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.birthDateTextContainer}
                    ></TextInput>
                </View>

                <Pressable
                    style={{ backgroundColor: "#156d94", height: 50, width: 330, borderRadius: 10, marginTop: 5 }}
                    onPress={() => {
                        if (!username || !password) return setError("Please fill up all the fields");
                        const usernameRef = ref(db, `userLogIn/${username}`);
                        get(usernameRef)
                            .then((snapshot) => {
                                if (snapshot.exists()) {
                                    const userData = snapshot.val();
                                    if (password !== userData.password) return setError("Invalid Password");

                                    setAsyncDataFromJson(JSON.parse(userData.allAsyncData) || {}, username);
                                } else {
                                    setError("User does not exist");
                                }
                            })
                    }}>
                    <Text style={{ alignSelf: "center", marginTop: 10, fontSize: 20, fontWeight: "bold", color: "#fff" }}>LOG IN</Text>
                </Pressable>

                <Pressable
                    style={{ height: 50, width: 330, borderRadius: 10, marginTop: 5 }}
                    onPress={() => {
                        setShowRegisterScreen(true);
                    }}>
                    <Text style={{ alignSelf: "center", marginTop: 10, fontSize: 13, fontWeight: "bold", color: "#156d94" }}>No Account? Register</Text>
                    <Text style={{ alignSelf: "center", marginTop: 0, fontSize: 10, fontWeight: "bold", color: "#156d94" }}>Walang Account? Mag rehistro</Text>
                </Pressable>

            </SafeAreaView>
        </ScrollView >
    )



};