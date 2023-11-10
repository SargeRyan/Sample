import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import uuid from 'react-native-uuid';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { schedulePushNotification } from "../../Screens/SleepingTracker/AlarmNotification";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MedicineTracker = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [medicineSchedule, setMedicineSchedule] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [schedule, setSchedule] = useState({
        id: uuid.v4(),
        medicineName: '',
        dosage: '',
        time: 'Set Time',
        date: selectedDate,
    });

    const handleDateSelect = (date) => {
        setSelectedDate(date.dateString);
    };

    const handleScheduleSubmit = async (newSchedule) => {
        if (newSchedule.medicineName && newSchedule.dosage && newSchedule.time !== 'Set Time') {
            setMedicineSchedule([...medicineSchedule, newSchedule]);
            setSchedule({
                id: uuid.v4(),
                medicineName: '',
                dosage: '',
                time: 'Set Time',
                date: selectedDate,
            });
            setShowForm(false);

            // Extract hour and minute from the time string
            const [hour, minute] = newSchedule.time.split(':');

            // Schedule the notification
            await schedulePushNotification(
                parseInt(hour),
                parseInt(minute),
                newSchedule.date, // Assuming you want the date as a trigger
                newSchedule.medicineName, // Title
                `Dosage: ${newSchedule.dosage}, Time: ${newSchedule.time}` // Body
            );
        } else {
            alert('Please fill out all fields and set a valid time.');
        }
    };

    const getScheduleForDate = (date) => {
        return medicineSchedule.filter((schedule) => schedule.date === date);
    };

    const [isPickerVisible, setPickerVisible] = useState(false);

    const showPicker = () => {
        setPickerVisible(true);
    };

    const hidePicker = () => {
        setPickerVisible(false);
    };

    const handleConfirm = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const newTime = `${hours}:${minutes}`;
        setSchedule((prevSchedule) => ({ ...prevSchedule, time: newTime }));
        hidePicker();
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
                    <Calendar onDayPress={handleDateSelect} />
                    {selectedDate && (
                        <View style={{ marginTop: 20 }}>
                            <Text style={{
                                fontSize: 21, // Increase the font size for better visibility
                                paddingVertical: 10,
                                 // Increase the padding for better spacing
                                fontWeight: "bold",
                                color: "white",
                                textShadowColor: 'rgba(0, 0, 0, 0.5)', // Add text shadow color
                                textShadowOffset: { width: 2, height: 2 }, // Adjust the shadow offset
                                textShadowRadius: 4,
                            }}>Schedule for {selectedDate}</Text>
                            {getScheduleForDate(selectedDate).map((schedule) => (
                                <Text key={schedule.id}>
                                    {schedule.medicineName} - {schedule.dosage} - {schedule.time}
                                </Text>
                            ))}
                            <TouchableOpacity onPress={() => setShowForm(true)}>
                                <Text style={{ color: 'blue', marginTop: 10 }}>Add Schedule</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showForm}
                        onRequestClose={() => {
                            setShowForm(!showForm);
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalHeading}>Add Schedule</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Medicine Name"
                                    onChangeText={(text) => setSchedule({ ...schedule, medicineName: text })}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Dosage"
                                    onChangeText={(text) => setSchedule({ ...schedule, dosage: text })}
                                />
                                {/* Replace the existing "Time" section */}
                                <View style={styles.timePickerContainer}>
                                    <Text style={styles.timePickerHeading}>
                                        SET TIME:
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.timePickerButton}
                                        onPress={showPicker}
                                    >
                                        <Text style={styles.timePickerButtonText}>{schedule.time}</Text>
                                    </TouchableOpacity>
                                    <DateTimePickerModal
                                        isVisible={isPickerVisible}
                                        mode="time"
                                        onConfirm={handleConfirm}
                                        onCancel={hidePicker}
                                        is24Hour={true}
                                    />
                                </View>
                                {/* End of Time Picker section */}
                                <TouchableOpacity onPress={() => setShowForm(false)} style={styles.cancelButton}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleScheduleSubmit({ ...schedule, date: selectedDate })} style={styles.submitButton}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#afd3e2",
        padding: 10,
        alignItems: "center",
        flexDirection: "column",
        alignContent: "center",
        height: "100%",
    },
    scrollView: {
        backgroundColor: "#afd3e2",
        paddingBottom: 30,
        width: "99%",
        height: "100%",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    },
    modalContent: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background for frosted glass effect
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333', // Adjust the text color
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)', // Slightly transparent border
        padding: 10,
        elevation: -2,
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Slightly transparent white background
    },
    timePickerContainer: {
        flexDirection: 'row', // Align children horizontally
        justifyContent: 'space-between', // Align children to the start and end of the container
        backgroundColor: 'rgba(0, 150, 136, 0.9)',
        padding: 15,
        marginBottom: 30,
        elevation: -2,
    },
    timePickerHeading: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    timePickerButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        paddingVertical: 6,
        borderRadius: 10,
        alignSelf: 'flex-end',
        fontSize: 20,
    },

    timePickerButtonText: {
        color: 'rgba(0, 150, 136, 1)', // Adjust the color for the glassmorphism effect
        textAlign: 'center',
    },
    cancelButton: {
        backgroundColor: 'rgba(255, 69, 0, 0.8)', // Adjust the color for the glassmorphism effect
        padding: 14,
        borderRadius: 5,
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: 'rgba(0, 128, 0, 0.8)', // Adjust the color for the glassmorphism effect
        padding: 14,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default MedicineTracker;
