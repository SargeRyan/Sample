import { StyleSheet, Text, SafeAreaView, ScrollView, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import WaterChart from "./Components/WaterChart";
import WaterMonitor from "./Components/WaterMonitor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../Dashboard/firebaseConfig";
import { get, set, ref, push, child, onValue } from "firebase/database";

export default Announcements = ({ navigation, route }) => {
    const [announcement, setAnnouncements] = useState([]);

    useEffect(() => {
        getAnnouncements();
    }, []);

    const getAnnouncements = () => {
        onValue(ref(db, "/announcementList"), (dataSnapshot) => {
            if (dataSnapshot.exists()) {
                const _announcements = dataSnapshot.val();

                // Filter out announcements with status "Archived"
                const filteredAnnouncements = Object.keys(_announcements)
                    .filter(key => _announcements[key].status !== 'Archived')
                    .map(key => ({ ..._announcements[key], id: key }));

                setAnnouncements(filteredAnnouncements);
            }
        }, (error) => {
            console.error("Error getting announcements:", error);
        });
    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {announcement.map((announcement, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                marginBottom: 10,
                                padding: 16,
                                backgroundColor: '#ffffff', // Set a background color to see the shadow
                                borderRadius: 8,
                                // iOS
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{announcement.title}</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                                <Text style={{ fontSize: 14, marginRight: 4 }}>{announcement.admin.organization}</Text>
                                <Text style={{ fontSize: 14 }}>{announcement.admin.firstName + ' ' + announcement.admin.lastName}</Text>
                            </View>
                            <Text style={{ fontSize: 16 }}>{announcement.description}</Text>
                            <Image source={{ uri: announcement.imageBanner }} style={{ width: '100%', height: 200, marginTop: 8, borderRadius: 10 }} />
                        </View>

                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 50,
    },
    headingContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        overflow: "visible",
        flexWrap: "wrap",
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 22,
        fontWeight: 600,
        alignSelf: "center",
    },
});


