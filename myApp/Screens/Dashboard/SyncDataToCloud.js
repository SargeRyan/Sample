import {
    Text,
    View,
} from "react-native";
import { useState, useEffect } from "react";
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "./firebaseConfig";
import { get, set, ref,push, child } from "firebase/database";

export default SyncDataToCloud = ({isFocused}) => {
    const [userData, setUserData] = useState({isSaved: false});
    useEffect(() => {
        NetInfo.fetch().then(state => {
            if(!state.isConnected)return;
            console.log("Connected to the Internet! Syncing Data to Cloud");
            fetchUserData();
        });
    },[isFocused]);

    const fetchUserData = async () => {
        try {
            // Retrieve the stored data from AsyncStorage
            const storedData = await AsyncStorage.getItem('userData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                console.log("User Data:", parsedData);
                
                const userRef = ref(db, 'users');

                // Check if the user data already exists in Cloud
                if(parsedData.id){
                    get(ref(db, `users/${parsedData.id}`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            setUserData(parsedData);
                            console.log("User Data already exists in Cloud");
                            return;
                        } else {
                            saveData();
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                }else{
                    saveData();
                }

                const saveData = () => {
                    console.log("Saving Data to Cloud");
                    const newUserRef = push(userRef);
                    parsedData.isSaved = true;
                    set(newUserRef, parsedData)
                    .then(async () => {
                        const newUserID = newUserRef.key;
                        parsedData.id = newUserID;
                        await AsyncStorage.setItem('userData', JSON.stringify(parsedData));
                        setUserData(parsedData);
                        console.log("User Data Saved to Cloud");
                    })
                    .catch((error) => {
                        console.error("Error adding new post: " + error);
                    });
                };
            }
        } catch (error) {
            console.log('Error retrieving data:', error);
        }
    };

    return (
        <View style={{ display: "flex", justifyContent: "center", backgroundColor: "#156d94", padding: 10, marginHorizontal: 10, marginTop: -20, marginBottom: 40, borderRadius: 10 }}>
            <Text style={{ fontSize: 20, color: "#fff", textAlign: "center", marginBottom: 10 }}>Cloud Data Save</Text>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Text style={{ fontSize: 15,fontWeight: "bold",marginRight: 5, color: "#afd3e2", textAlign: "center", alignSelf: "center" }}>
                    {userData.isSaved ? "✓" : "Saving..."}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff", textAlign: "center", alignSelf: "center" }}>User Data</Text>
            </View>
        </View>
    );
};