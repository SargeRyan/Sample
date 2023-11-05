import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "./firebaseConfig";
import { get, set, ref, push, child } from "firebase/database";
import NetInfo from "@react-native-community/netinfo";

export async function saveDataToCloud(asyncDataKey, parentKey = "", _storedData = null) {
    try {
        const state = await NetInfo.fetch();

        if (!state.isConnected) {
            console.log("No Internet Connection! Data will be saved locally");
            return null;
        }

        console.log("Connected to the Internet! Syncing Data to Cloud");

        // Retrieve the stored data from AsyncStorage
        const storedData = _storedData || await AsyncStorage.getItem(asyncDataKey);

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            console.log(asyncDataKey, parsedData);
            const dataRef = ref(db, `${parentKey}/${asyncDataKey}`);

            // Check if the user data already exists in Cloud
            if (parsedData.id) {
                let toCheckData = `${asyncDataKey}/${parsedData.id}`;
                if(_storedData)toCheckData = `${asyncDataKey}/${parentKey}`;
                const dataSnapshot = await get(ref(db, toCheckData));
                if (dataSnapshot.exists()) {
                    console.log("User Data already exists in Cloud");
                    return parsedData;
                }
            }

            console.log("Saving Data to Cloud");
            const newDataRef = parentKey ? dataRef : push(dataRef);
            parsedData.isSaved = true;
            const newDataID = parentKey || newDataRef.key;
            parsedData.id = newDataID;
            await set(newDataRef, JSON.stringify(parsedData));
            await AsyncStorage.setItem(asyncDataKey, JSON.stringify(parsedData));

            console.log("Data Saved to Cloud");
            console.log("_parsedData", parsedData);

            return parsedData;
        }
    } catch (error) {
        console.error("Error: " + error);
        throw error; // Re-throw the error to be handled higher up in the call stack
    }

    return null;
}
