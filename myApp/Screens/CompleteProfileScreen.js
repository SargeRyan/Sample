import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    Pressable,
} from "react-native";
import { Button  } from "@react-native-material/core";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

TouchableOpacity.defaultProps = { ActiveOpacity: 0.8 };



export default CompleteProfileScreen = ({ setShowMainScreen }) => {
    const AppButton = ({ onPress, title }) => (
    <TouchableOpacity disabled={goalWeight === ''} onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalSampleVisible, setSampleVisible] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Not Very Active', value: 'Not Very Active' },
        { label: 'Lightly Very Active', value: 'Lightly Very Active' },
        { label: 'Active', value: 'Active' },
        { label: 'Very Active', value: 'Very Active' },
    ]);

    const [opens, setOpens] = useState(false);
    const [values, setValues] = useState(null);
    const [item, setItem] = useState([
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' }
    ]);

    const [opened, setOpened] = useState(false);
    const [valued, setValued] = useState(null);
    const [itemed, setItemed] = useState([
        { label: 'Lose Weight', value: 'Lose Weight' },
        { label: 'Maintain Weight', value: 'Maintain Weight' },
        { label: 'Gain Weight', value: 'Gain Weight' },
        { label: 'Gain Muscles', value: 'Gain Muscles' },
        { label: 'Modify My Diet', value: 'Modify My Diet' },
        { label: 'Manage Stress', value: 'Manage Stress' },
        { label: 'Increase My Step Count', value: 'Increase My Step Count' },
    ]);

    const [Pop, setPop] = useState(false);
    const [Data, setData] = useState(null);
    const [Selection, setSelection] = useState([
        { label: 'Lack of Time', value: 'Lose Weight' },
        { label: 'Healthy diets lack variety', value: 'Maintain Weight' },
        { label: 'Stress around food choices', value: 'Gain Weight' },
        { label: 'Food Cravings', value: 'Gain Muscles' },
        { label: 'Lack of Progress', value: 'Modify My Diet' },
        { label: 'Healthy Food is too expensive', value: 'Manage Stress' },

    ]);

    const [Pops, setPops] = useState(false);
    const [info, setInfo] = useState(null);
    const [Selections, setSelections] = useState([
        { label: 'Lose 0.25kg per week', value: '0.25' },
        { label: 'Lose 0.5 per week', value: '0.50' },
        { label: 'Lose 0.75 per week', value: '0.75' },
        { label: 'Loss 1kg per week', value: '1' },

    ]);

    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('Male');
    const [age, setAge] = useState('');
    const [goalWeight, setGoalWeight] = useState('');

    const validate = () => {
        height === '' || weight === '' || age === '';
    }


    const saveData = async () => {
        console.log('Saving data');
        try {
            const userData = {
                height,
                weight,
                age,
                gender,
                goalWeight
            };

            // Save the data to AsyncStorage
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            console.log('Data saved successfully!', userData);

            // Navigate to the other screen

        } catch (error) {
            console.log('Error saving data:', error);
        }
    };

    return (
        <SafeAreaView
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
        >

            {/*Logo*/}
            <View>
                <Image
                    style={styles.imageTitleHeader}
                    source={require("../image/logo.png")}
                />
            </View>

            <Text style={styles.textTitleHeader}>Let's complete your profile</Text>

            <Text style={styles.subTitleText}>
                It will help us to know about you!
            </Text>
            <Text style={{ alignSelf: "baseline", fontSize: 17, fontWeight: "bold", marginBottom: 20 }}>
                Personal Information
            </Text>
            <Text style={{ width: 320 }}>
                Please select which sex we should use to calculate your calorie needs:
            </Text>
            <View style={styles.genderContainer}>
                <Image
                    style={styles.genderImageContainer}
                    source={require("../image/gender.png")}
                />
                {/* <TextInput
                    value={gender}
                    placeholder="Male or Female"
                    onChangeText={(text) => setGender(text)}
                    style={styles.genderTextContainer}></TextInput> */}
                <Button color={gender === "Male" ? "#146C94" : "#fff"} style={{margin: 5, width: 120}} title="Male" onPress={() => {setGender("Male") }} />
                <Button color={gender === "Female" ? "#146C94" : "#fff"} style={{margin: 5, width:120}} title="Female" onPress={() => { setGender("Female") }} />

            </View>

            <Text style={{ width: 320, marginBottom: 5 }}>
                How old are you?
            </Text>

            <View style={styles.birthDateContainer}>
                <Image
                    style={styles.birthDateImageContainer}
                    source={require("../image/calendar.png")}
                />
                <TextInput
                    placeholder="Age"
                    inputMode="numeric"
                    value={age}
                    onChangeText={(text) => setAge(text)}
                    style={styles.birthDateTextContainer}
                ></TextInput>
            </View>

            <Text style={{ width: 320, marginBottom: 5 }}>
                How much do you weigh?
            </Text>

            <View style={styles.weightContainer}>
                <Image
                    style={styles.weightImageContainer}
                    source={require("../image/PngItem_4039383.png")}
                />

                <TextInput
                    placeholder="Weight(Kilograms/kg)"
                    inputMode="numeric"
                    style={styles.WeightTextContainer}
                    value={weight}
                    onChangeText={(text) => setWeight(text)}
                ></TextInput>
            </View>
            <Text style={{ width: 320, marginBottom: 5 }}>
                How tall are you?
            </Text>

            <View style={styles.heightContainer}>
                <Image
                    style={styles.heightImageContainer}
                    source={require("../image/computer-icons-ruler-pictogram-length-clip-art-ruler-1ccf0d3be8bd9cc8eeb2db1c88611e1a.png")}
                />

                <TextInput
                    placeholder="Height(Centimeter/cm)"
                    inputMode="numeric"
                    onChangeText={(text) => setHeight(text)}
                    value={height}
                    style={styles.heightTextContainer}
                ></TextInput>
            </View>

            <Pressable
                style={{ backgroundColor: "#009688", height: 50, width: 320, borderRadius: 10, marginTop: 20 }}
                onPress={() => setModalVisible(true)} disabled={age === '' || height === '' || weight === ''}>
                <Text style={{ alignSelf: "center", marginTop: 10, fontSize: 20, fontWeight: "bold", color: "#fff" }}>NEXT</Text>
            </Pressable>


            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {

                    setModalVisible(!modalVisible);
                }}>
                <View style={{ backgroundColor: "#f6f6f6", height: 700 }}>
                    <View style={{ flexDirection: "row", backgroundColor: "#f9eed9", height: 60 }}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Image style={{ height: 17, width: 23, marginLeft: 10, marginTop: 23 }} source={require("../image/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png")}
                            />
                        </Pressable>
                        <Text style={{ marginTop: 20, fontSize: 17, marginLeft: 15, fontWeight: "bold" }}>ACTIVITY LEVEL & GOAL</Text>
                    </View>

                    <Pressable
                        style={{ backgroundColor: "#009688", height: 50, width: 320, borderRadius: 10, marginTop: 20, position: "absolute", bottom: 30, alignSelf: "center" }}
                        onPress={() => setSampleVisible(true)}>
                        <Text style={{ alignSelf: "center", marginTop: 10, fontSize: 20, fontWeight: "bold", color: "#fff" }}>NEXT</Text>
                    </Pressable>


                    <Text style={{ marginTop: 40, fontSize: 15, marginLeft: 15, fontWeight: "bold" }}>What is your baseline activity level</Text>
                    <Text style={{ marginTop: 2, fontSize: 12, marginLeft: 30, }}>Not including workouts- we count that separately: </Text>

                    <Text style={{ marginTop: 90, fontSize: 15, marginLeft: 15, fontWeight: "bold" }}>What is your Goal</Text>
                    <Text style={{ marginTop: 2, fontSize: 12, marginLeft: 30, }}>Select your primary goal: </Text>

                    <Text style={{ marginTop: 90, fontSize: 15, marginLeft: 15, fontWeight: "bold" }}>In the past, what have been your primary barrier to losing weight</Text>
                    <Text style={{ marginTop: 2, fontSize: 12, marginLeft: 30, }}>Select your primary barrier: </Text>


                    <DropDownPicker
                        open={opens}
                        value={values}
                        items={items}
                        setOpen={setOpens}
                        setValue={setValues}
                        setItems={setItem}
                        zIndex={3000}
                        placeholder="Select your baseline activity level "
                        zIndexInverse={1000}
                        containerStyle={{ width: 320, backgroundColor: "#f9eed9", position: "absolute", top: 150, right: 20 }}
                    />

                    <DropDownPicker
                        open={Pop}
                        value={Data}
                        items={Selection}
                        setOpen={setPop}
                        setValue={setData}
                        setItems={setSelection}
                        placeholder="Select your primary barrier "
                        zIndex={3000}
                        zIndexInverse={1000}
                        containerStyle={{ width: 320, backgroundColor: "#f9eed9", position: "absolute", top: 430, right: 20 }}
                    />


                    <DropDownPicker
                        open={opened}
                        value={valued}
                        items={itemed}
                        setOpen={setOpened}
                        setValue={setValued}
                        setItems={setItemed}
                        placeholder="Select your goal "
                        zIndex={3000}
                        zIndexInverse={1000}
                        containerStyle={{ width: 320, backgroundColor: "#f9eed9", position: "absolute", top: 280, right: 20 }}
                    />

                    <DropDownPicker
                        open={opens}
                        value={values}
                        items={items}
                        setOpen={setOpens}
                        setValue={setValues}
                        setItems={setItem}
                        zIndex={3000}
                        placeholder="Select your Activity baseline level  "
                        zIndexInverse={1000}
                        containerStyle={{ width: 320, backgroundColor: "#f9eed9", position: "absolute", top: 150, right: 20 }}
                    />


                </View>
            </Modal>


            <Modal
                //second modal
                animationType="slide"
                transparent={false}
                visible={modalSampleVisible}
                onRequestClose={() => {

                    setModalVisible(!modalSampleVisible);
                }}>
                <View style={{ backgroundColor: "#f6f6f6", height: 700 }}>
                    <View style={{ flexDirection: "row", backgroundColor: "#f9eed9", height: 60 }}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setSampleVisible(!modalSampleVisible)}>
                            <Image style={{ height: 17, width: 23, marginLeft: 10, marginTop: 23 }} source={require("../image/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png")}
                            />
                        </Pressable>
                        <Text style={{ marginTop: 18, fontSize: 18, marginLeft: 15, fontWeight: "bold" }}>WEEKLY GOAL</Text>
                    </View>

                    <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 50, marginLeft: 20 }}>What's your goal weight</Text>
                    <Text style={{ fontSize: 12, marginTop: 70, marginLeft: 20, marginRight: 15 }}>Don't worry. This doesn't affect your daily calorie goal and can always change it later</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 60, marginLeft: 20, marginRight: 15 }}>What is your Weekly goal?</Text>

                    <View style={styles.goalWeightContainer}>
                        <Image
                            style={styles.weightImageContainer}
                            source={require("../image/PngItem_4039383.png")}
                        />

                        <TextInput
                            value={goalWeight}
                            onChangeText={setGoalWeight}
                            placeholder="Weight(Kilograms/kg)"
                            style={styles.WeightTextContainer}
                        ></TextInput>
                    </View>

                    <DropDownPicker
                        open={Pops}
                        value={info}
                        items={Selections}
                        setOpen={setPops}
                        setValue={setInfo}
                        setItems={setSelections}
                        zIndex={3000}
                        placeholder="Set Weekly Goal"
                        zIndexInverse={1000}
                        containerStyle={{ width: 320, backgroundColor: "#f9eed9", position: "absolute", top: 320, right: 20 }}
                    />

                    <View style={styles.screenContainer}>
                        <AppButton
                            title="Create Account"
                            onPress={async () => {
                                await saveData();
                                setShowMainScreen(false)
                            }
                            }
                        ></AppButton>
                    </View>
                </View>
            </Modal>


        </SafeAreaView>
    );
};

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
        backgroundColor: "#009688",
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
        width: 320,
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
        width: 320,
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
        width: 320,
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
        width: 320,
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
        width: 320,
        height: 50,
        position: "absolute",
        top: 140,
        alignSelf: "center"
    }
});
