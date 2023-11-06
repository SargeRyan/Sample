import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import uuid from 'react-native-uuid';

const MedicineTracker = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [medicineSchedule, setMedicineSchedule] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [schedule, setSchedule] = useState({
        id: uuid.v4(),
        medicineName: '',
        dosage: '',
        time: '',
        date: selectedDate,
    });

    const handleDateSelect = (date) => {
        setSelectedDate(date.dateString);
    };

    const handleScheduleSubmit = (newSchedule) => {
        if (newSchedule.medicineName && newSchedule.dosage && newSchedule.time) {
            setMedicineSchedule([...medicineSchedule, newSchedule]);
            setSchedule({ id: uuid.v4(), medicineName: '', dosage: '', time: '', date: selectedDate });
            setShowForm(false);
        } else {
            alert('Please fill out all fields.');
        }
    };

    const getScheduleForDate = (date) => {
        return medicineSchedule.filter((schedule) => schedule.date === date);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
                    <Calendar onDayPress={handleDateSelect} />
                    {selectedDate && (
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Schedule for {selectedDate}</Text>
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
                        <View style={{ marginTop: 20, backgroundColor: '#fff', }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Add Schedule</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginVertical: 10 }}
                                placeholder="Medicine Name"
                                onChangeText={(text) => setSchedule({ ...schedule, medicineName: text })}
                            />
                            <TextInput
                                style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginVertical: 10 }}
                                placeholder="Dosage"
                                onChangeText={(text) => setSchedule({ ...schedule, dosage: text })}
                            />
                            <TextInput
                                style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginVertical: 10 }}
                                placeholder="Time"
                                onChangeText={(text) => setSchedule({ ...schedule, time: text })}
                            />
                            <TouchableOpacity onPress={() => setShowForm(false)}>
                                <Text style={{ color: 'red', marginTop: 10 }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleScheduleSubmit({ ...schedule, date: selectedDate })}
                            >
                                <Text style={{ color: 'green', marginTop: 10 }}>Submit</Text>
                            </TouchableOpacity>
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
});

export default MedicineTracker;
