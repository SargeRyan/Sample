import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import { saveDataToCloud } from "./global";

export default SyncDataToCloud = ({ isFocused }) => {
    const toSaveDataKey = [
        "userData",
    ];

    const [userId, setUserId] = useState("");
    const [storedData, setStoredData] = useState({});
    const [savedElement, setSavedElement] = useState(() => (
        <View></View>
    ));

    useEffect(() => {
        const fetchData = async () => {
            try {
                toSaveDataKey.forEach(async (dataKey) => {
                    try {
                        const newData = await saveDataToCloud(dataKey);
                        if (dataKey == "userData") {
                            setUserId(newData.id);
                        }
                        else {
                            console.log(`Cannot save ${dataKey} to cloud - no user data`);
                            return;
                        }
                        // Create a new copy of storedData and update it
                        setStoredData((prevStoredData) => ({
                            ...prevStoredData,
                            [dataKey]: newData,
                        }));
                    } catch (error) {
                        console.error(
                            "Error fetching and setting data for",
                            dataKey,
                            error
                        );
                    }
                });
            } catch (error) {
                console.error("Error fetching and setting data: " + error);
            }
        };
        fetchData();
    }, [isFocused]);

    // Use another useEffect to trigger component updates when storedData changes
    useEffect(() => {
        // This code will be executed whenever storedData changes
        console.log("storedData has changed:", storedData);
        // You can also perform any other updates to your component here

        // For example, update the loop based on changes in storedData
        // Here's an updated version of your loop:
        const updatedLoop = toSaveDataKey.map((dataKey, index) => (
            <View key={index} style={{ flexDirection: "row", marginHorizontal: 10 }}>
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#fff",
                        textAlign: "center",
                        marginRight: 5,
                    }}
                >
                    {storedData[dataKey] && storedData[dataKey].isSaved
                        ? "✓"
                        : "Saving...  "}
                </Text>
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#fff",
                        textAlign: "center",
                    }}
                >
                    {dataKey}
                </Text>
            </View>
        ));

        // Set the updated loop in your component state, which will trigger a re-render
        setSavedElement(updatedLoop);
    }, [storedData]);

    return (
        <View
            style={{
                // display: "flex",
                display: "none",
                justifyContent: "center",
                backgroundColor: "#156d94",
                padding: 10,
                marginHorizontal: 10,
                marginTop: -20,
                marginBottom: 40,
                borderRadius: 10,
            }}
        >
            <Text
                style={{
                    fontSize: 20,
                    color: "#fff",
                    textAlign: "center",
                    marginBottom: 10,
                }}
            >
                Cloud Data Save
            </Text>
            <View style={{ flexDirection: "column", alignSelf: "center" }}>
                {savedElement}
                <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "bold",
                            color: "#fff",
                            textAlign: "center",
                            marginRight: 5,
                        }}
                    >
                        ✓
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "bold",
                            color: "#fff",
                            textAlign: "center",
                        }}
                    >
                        Meals Data
                    </Text>
                </View>
            </View>
        </View>
    );
};
