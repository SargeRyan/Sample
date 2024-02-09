import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import React from "react";
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
} from "react-native";
import { Button } from "@react-native-material/core";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from 'react-native-checkbox';

TouchableOpacity.defaultProps = { ActiveOpacity: 0.8 };



export default CompleteProfileScreen = ({ setShowMainScreen }) => {
    const AppButton = ({ onPress, title }) => (
        <TouchableOpacity disabled={goalWeight === ''} onPress={onPress} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    );

    const [goal, setGoal] = useState('');
    const [checkboxStates, setCheckboxStates] = useState({
        lackOfTime: '',
        stressAroundFood: '',
        foodCravings: '',
        lackOfProgress: '',
        expensiveHealthyFood: '',
    });

    const [medHistoryStates, setMedHistoryStates] = useState({
        Diabetes: '',
        Stroke: '',
        Arthritis: '',
        Asthma: '',
        Underweight: '',
        Fatigue: '',
        "High Blood": '',
    });

    useEffect(() => {
        // Load the initial values from AsyncStorage
        loadCheckboxValues();
    }, []);

    const toggleCheckbox = (checkboxKey, customValue = "") => {
        // Toggle the checkbox state for the specified checkbox key
        setCheckboxStates((prevStates) => ({
            ...prevStates,
            [checkboxKey]: checkboxKey,
        }));

        // Save the new value to AsyncStorage
        saveCheckboxValue(checkboxKey, checkboxKey);
    };

    const toggleCheckboxMedHistory = (checkboxKey) => {
        setSelectMedHistory([...selectMedHistory, checkboxKey]);
        // Toggle the checkbox state for the specified checkbox key
        setMedHistoryStates((prevStates) => ({
            ...prevStates,
            [checkboxKey]: checkboxKey,
        }));

        // Save the new value to AsyncStorage
        console.log('@medicalHistory_' + checkboxKey, checkboxKey);
        saveCheckboxValue('@medicalHistory_' + checkboxKey, checkboxKey);
    };

    const saveCheckboxValue = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            console.log(`Saving checkbox value for ${key}:`, value);
        } catch (error) {
            console.error(`Error saving checkbox value for ${key}:`, error);
        }
    };

    const loadCheckboxValues = async () => {
        try {
            const keys = Object.keys(checkboxStates);
            const values = await AsyncStorage.multiGet(keys);

            console.log(values);


            const loadedValues = {};
            values.forEach(([key, value]) => {
                loadedValues[key] = JSON.parse(value);
            });

            // Update checkbox states with loaded values
            setCheckboxStates((prevStates) => ({
                ...prevStates,
                ...loadedValues


            }));
        } catch (error) {
            console.error('Error loading checkbox values:', error);
        }
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalSampleVisible, setSampleVisible] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Highly active (doing zumba or exercises)', value: 'Highly active (doing zumba or exercises)' },
        { label: 'Moderate activite ( doing chores, sweeping floor, walking slowly)', value: 'Moderate activite ( doing chores, sweeping floor,walking slowly)' },
        { label: 'Light active ( doing 10-15 mins activity a day)', value: 'Light active ( doing 10-15 mins activity a day)' },
        { label: 'Sedentary ( spend much time seated', value: 'Sedentary ( spend much time seated' },
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
        { label: 'Lose Weight (Magbawas ng timbang)', value: 'Lose Weight' },
        { label: 'Maintain Weight', value: 'Maintain Weight' },
        { label: 'Gain Weight', value: 'Gain Weight' },
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
    const [Selections, setSelections] = useState([]);



    const [height, setHeight] = useState('');
    const [heightUnit, setHeightUnit] = useState('cm');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('Male');
    const [age, setAge] = useState('');
    const [medHistory, setMedHistory] = useState('');
    const [selectMedHistory, setSelectMedHistory] = useState([]);
    const [name, setName] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [suggestedWeight, setSuggestedWeight] = useState(0);

   
    useEffect(() => {
    if (!age || !height || !heightUnit) return;
    const suggestedWeight = calculateSuggestedWeight(age, height, heightUnit);
    setSuggestedWeight(suggestedWeight);
}, [age, height, heightUnit]);

    const saveData = async () => {
        console.log('Saving data');
        try {
            const userData = {
                name,
                height,
                weight,
                age,
                gender,
                goalWeight,
                medHistory,
                heightUnit,
                selectMedHistory: selectMedHistory.toString()
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
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
        >
            <SafeAreaView
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f6f6f6" }}
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

                <Text style={{ width: 320, marginBottom: 5 }}>
                    What is your Name?(Ano ang iyong pangalan?)
                </Text>

                <View style={styles.birthDateContainer}>
                    <Image
                        style={styles.birthDateImageContainer}
                        source={require("../image/user.png")}
                    />
                    <TextInput
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={styles.birthDateTextContainer}
                    ></TextInput>
                </View>
                <Text style={{ width: 320 }}>
                    Which sex we should use to calculate your calorie needs: (Aling kasarian ang dapat naming gamitin upang kalkulahin ang iyong mga pangangailangan sa calorie:)
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
                    <Button color={gender === "Male" ? "#146C94" : "#fff"} style={{ margin: 5, width: 120 }} title="Male" onPress={() => { setGender("Male") }} />
                    <Button color={gender === "Female" ? "#146C94" : "#fff"} style={{ margin: 5, width: 120 }} title="Female" onPress={() => { setGender("Female") }} />

                </View>

                <Text style={{ width: 320, marginBottom: 5 }}>
                    How old are you? (Ilan taon ka na?)
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
                    How tall are you?(Gaano ka katangkad?)
                </Text>

              <View style={styles.heightContainer}>
                    <Image
                        style={styles.heightImageContainer}
                        source={require("../image/computer-icons-ruler-pictogram-length-clip-art-ruler-1ccf0d3be8bd9cc8eeb2db1c88611e1a.png")}
                    />

                    {heightUnit === 'cm' && (
                            <TextInput
                                placeholder="Height(cm)"
                                inputMode="numeric"
                                onChangeText={(text) => setHeight(text)}
                                value={height}
                                style={styles.heightTextContainer}
                    />


                    )}
                     {heightUnit === 'ft' && (
                            <TextInput
                                placeholder="Height (ft)"
                                inputMode="numeric"
                                onChangeText={(text) => setHeight(text)}
                                value={height}
                                style={styles.heightTextContainer}
                        />

                    
                    )}

                    <Button
                        color={heightUnit === "cm" ? "#146C94" : "#fff"}
                            style={{ margin: 5, width: 60 }}
                            title="CM"
                            onPress={() => { setHeightUnit("cm") }}
                    />

                    <Button
                        color={heightUnit === "ft" ? "#146C94" : "#fff"}
                        style={{ margin: 5, width: 60 }}
                        title="ft"
                        onPress={() => { setHeightUnit("ft") }}
                    />
            </View>
                <View style={{ display: !age || !height ? "none" : "flex", flexDirection: "row", width: 320, justifyContent: "flex-start", marginBottom: 10 }}>
                    <Text style={{ marginRight: 10 }}>
                        Suggested weight: {suggestedWeight}kg
                    </Text>
                    <Pressable
                        onPress={() => { setWeight(suggestedWeight.toString()) }}>
                        <Text style={{ fontWeight: "800", color: "#156d94" }}>ACCEPT</Text>
                    </Pressable>
                </View>

                <Text style={{ width: 320, marginBottom: 5 }}>
                    How much do you weigh?(Gaano ka kabigat?)
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

                <Pressable
                    style={{ backgroundColor: "#009688", height: 50, width: 320, borderRadius: 10, marginTop: 5 }}
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
                            <Text style={{ marginTop: 20, fontSize: 17, marginLeft: 15, fontWeight: "bold" }}>YOUR GOAL</Text>
                        </View>

                        <Pressable
                            style={{ backgroundColor: "#009688", height: 50, width: 320, borderRadius: 10, marginTop: 30, position: "absolute", bottom: 20, alignSelf: "center" }}
                            onPress={() => setModalVisible1(true)}>
                            <Text style={{ alignSelf: "center", marginTop: 10, fontSize: 20, fontWeight: "bold", color: "#fff" }}>NEXT</Text>
                        </Pressable>




                        <Text style={{ marginTop: 30, fontSize: 15, marginLeft: 15, fontWeight: "bold" }}>What is your Goal (Ano ang iyong Layunin)</Text>
                        <Text style={{ marginTop: 2, fontSize: 12, marginLeft: 30, }}>Select your primary goal: (Piliin ang iyong pangunahing layunin:)</Text>
                        <View style={styles.goalCheckBoxContainer}>
                            <CheckBox
                                value={goal}
                                checked={goal === 'Lose Weight'}
                                onChange={() => {
                                    setGoal('Lose Weight')
                                    setSelections([
                                        { label: 'Lose 0.25kg per Weekly', value: '0.25' },
                                        { label: 'Lose 0.5 per Weekly', value: '0.50' },
                                        { label: 'Lose 0.75kg per Month', value: '0.75' }
                                       
                                        
                                    ])
                                }}
                                label={'Loss Weight (Magbawas ng timbang)'}
                                containerStyle={styles.goalCheckBox}
                            />
                        </View>
                        <View style={styles.goalCheckBoxContainer}>
                            <CheckBox
                                value={goal}
                                checked={goal === 'Maintain Weight'}
                                onChange={() => {
                                    setGoal('Maintain Weight')
                                    setSelections([])
                                }}
                                label={'Maintain Weight(Mapanatili ang Timbang)'}
                                containerStyle={styles.goalCheckBox}
                            />
                        </View>

                        <View style={styles.goalCheckBoxContainer}>
                            <CheckBox
                                value={goal}
                                checked={goal === 'Gain Weight'}
                                onChange={() => {
                                    setGoal('Gain Weight')
                                    setSelections([
                                        { label: 'Gain 0.25kg per week', value: '.25' },
                                        { label: 'Gain 0.5 per week', value: '.50' },
                                        
                                    ])
                                }}
                                label={'Gain Weight (Magdagdag ng timbang)'}
                                containerStyle={styles.goalCheckBox}
                            />
                        </View>
                         <View style={styles.goalCheckBoxContainer}>
                            <CheckBox
                                value={goal}
                                checked={goal === 'Increase Stamina'}
                                onChange={() => {
                                    setGoal('Increase Stamina')
                                    setSelections([])
                                }}
                                label={'Increase Stamina(Dagdagan ang Stamina)'}
                                containerStyle={styles.goalCheckBox}
                                textStyle={styles.labelText} 
                            />
                            
                        </View>
                        {/* <View style={styles.goalCheckBoxContainer}>
                            <CheckBox
                                value={goal}
                                onChange={() => toggleCheckbox('Increase My Step Count')}
                                label={'Increase My Step Count'}
                                containerStyle={styles.goalCheckBox}
                            />
                        </View>
                        <View style={[styles.goalCheckBoxContainer, {
                            paddingLeft: 20,
                        }]}>
                            <TextInput
                                placeholder="Other (specify) (Iba pa (tukuyin))"
                                inputMode="text"
                                style={[styles.medHistoryTextContainer, {
                                    marginTop: 0,
                                }]}
                            ></TextInput>
                        </View> */}

                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible1}
                    onRequestClose={() => {
                        setModalVisible1(!modalVisible1);
                    }}>
                    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
                        <ScrollView style={{ backgroundColor: "#000" }}>
                            <View style={{ backgroundColor: "#f6f6f6", paddingBottom: 100 }}>
                                <View style={{ flexDirection: "row", backgroundColor: "#f9eed9", height: 60 }}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible1(!modalVisible1)}>
                                        <Image style={{ height: 17, width: 23, marginLeft: 10, marginTop: 23 }} source={require("../image/computer-icons-clip-art-left-arrow-6f4a3e70f15284856f9524e8f47fe2af.png")}
                                        />
                                    </Pressable>
                                    <Text style={{ marginTop: 20, fontSize: 17, marginLeft: 15, fontWeight: "bold" }}>BARIERS AND MEDICAL HISTORY</Text>
                                </View>

                                <Pressable
                                    style={{ backgroundColor: "#009688", height: 50, width: 320, borderRadius: 10, marginTop: 20, position: "absolute", bottom: 30, alignSelf: "center" }}
                                    onPress={() => setSampleVisible(true)}>
                                    <Text style={{ alignSelf: "center", marginTop: 10, fontSize: 20, fontWeight: "bold", color: "#fff" }}>NEXT</Text>
                                </Pressable>



                                {goal === "Lose Weight" && (
                                    <View>
                                        <Text style={{ marginTop: 10, fontSize: 15, marginLeft: 15, fontWeight: "bold" }}> In the past, what have been your primary barrier to gain and losing weight: (Sa nakaraan, kung ano ang iyong pangunahing hadlang upang makakuha at mawalan ng timbang)</Text>
                                        <Text style={{ marginTop: 2, fontSize: 12, marginLeft: 30, }}>Select your primary barrier: (Piliin ang iyong pangunahing hadlang:)</Text>

                                        <View style={styles.goalCheckBoxContainer}>
                                            <CheckBox
                                                value={checkboxStates.lackOfTime}
                                                onChange={() => toggleCheckbox('lackOfTime')}
                                                label={'Lack of Time (Kulang sa oras)'}
                                                containerStyle={styles.goalCheckBox}
                                            />
                                        </View>
                                        <View style={styles.goalCheckBoxContainer}>
                                            <CheckBox
                                                value={checkboxStates.stressAroundFood}
                                                onChange={() => toggleCheckbox('stressAroundFood')}
                                                label={'Stress Around Food (Stress sa Pagkain)'}
                                                containerStyle={styles.goalCheckBox}
                                            />
                                        </View>

                                        <View style={styles.goalCheckBoxContainer}>
                                            <CheckBox
                                                value={checkboxStates.foodCravings}
                                                onChange={() => toggleCheckbox('foodCravings')}
                                                label={'Food Cravings (Paghahangad ng mga pagkain)'}
                                                containerStyle={styles.goalCheckBox}
                                            />
                                        </View>
                                        <View style={styles.goalCheckBoxContainer}>
                                            <CheckBox
                                                value={checkboxStates.lackOfProgress}
                                                onChange={() => toggleCheckbox('lackOfProgress')}
                                                label={'Lack Of Progress(Kakulangan ng Pag-unlad)'}
                                                containerStyle={styles.goalCheckBox}
                                            />
                                        </View>
                                        
                                        <View style={[styles.goalCheckBoxContainer, {
                                            paddingLeft: 20,
                                        }]}>
                                            <TextInput
                                                placeholder="Other (specify) Iba pa (tukuyin)"
                                                inputMode="text"
                                                style={[styles.medHistoryTextContainer, {
                                                    marginTop: 0,
                                                }]}
                                            ></TextInput>
                                        </View>
                                    </View>
                                )}
                                {goal === "Increase Stamina" && (
                                    <View>
                                        <Text style={{ marginTop: 10, fontSize: 15, marginLeft: 15, width: 350, fontWeight: "bold" }}> In the past, what have been your primary barrier to   increase your stamina(Sa nakaraan, ano ang pangunahing hadlang upang mapataas ang iyong Stamina)</Text>
                                        <Text style={{ marginTop: 2, fontSize: 12, marginLeft: 30,  }}>Select your primary barrier: (Piliin ang iyong pangunahing hadlang:)</Text>

                                        <View style={styles.goalCheckBoxContainer}>
                                            <CheckBox
                                                value={checkboxStates.lackOfTime}
                                                onChange={() => toggleCheckbox('InadequteFluidIntake')}
                                                label={'Inadequte Fluid Intake(Hindi Sapat na Pag-inom ng Fluid)'}
                                                containerStyle={styles.goalCheckBox}
                                            />
                                        </View>
                                        <View style={styles.goalCheckBoxContainer}>
                                            <CheckBox
                                                value={checkboxStates.stressAroundFood}
                                                onChange={() => toggleCheckbox('Underlyinghealthissues')}
                                                label={'Underlying health issues(Isyu sa kalusugan)'}
                                                containerStyle={styles.goalCheckBox}
                                            />
                                        </View>

                                        <View style={styles.goalCheckBoxContainer}>
                                            <CheckBox
                                                value={checkboxStates.foodCravings}
                                                onChange={() => toggleCheckbox('Lack of quality sleep')}
                                                label={'Lack of quality sleep(Kulang sa Sapat na Tulog)'}
                                                containerStyle={styles.goalCheckBox}
                                            />
                                        </View>
                                        <View style={styles.goalCheckBoxContainer}>
                                            <CheckBox
                                                value={checkboxStates.lackOfProgress}
                                                onChange={() => toggleCheckbox('Inconsistency training')}
                                                label={'Inconsistency training(Pagsasanay sa hindi pagkakapare-pareho)'}
                                                containerStyle={styles.goalCheckBox}
                                            />
                                        </View>
                                        <View style={[styles.goalCheckBoxContainer, {
                                            paddingLeft: 20,
                                        }]}>
                                            <TextInput
                                                placeholder="Other (specify) Iba pa (tukuyin)"
                                                inputMode="text"
                                                style={[styles.medHistoryTextContainer, {
                                                    marginTop: 0,
                                                }]}
                                            ></TextInput>
                                        </View>
                                    </View>
                                )}
                                {goal === "Gain Weight" && (
                                    <View>
                                        <Text style={{ marginTop: 10, fontSize: 15, marginLeft: 15, fontWeight: "bold" }}> In the past, what have been your primary barrier to gain and losing weight: (Sa nakaraan, kung ano ang iyong pangunahing hadlang upang makakuha at mawalan ng timbang)</Text>
                                        <Text style={{ marginTop: 2, fontSize: 12, marginLeft: 30, }}>Select your primary barrier: (Piliin ang iyong pangunahing hadlang:)</Text>

                                        <View style={styles.goalCheckBoxContainer}>
                                            <CheckBox
                                                value={checkboxStates.lackOfTime}
                                                onChange={() => toggleCheckbox('lackOfTime')}
                                                label={'Lack of Time (Kulang sa oras)'}
                                                containerStyle={styles.goalCheckBox}
                                            />
                                        </View>
                                        <View style={styles.goalCheckBoxContainer}>
                                            <CheckBox
                                                value={checkboxStates.stressAroundFood}
                                                onChange={() => toggleCheckbox('stressAroundFood')}
                                                label={'Stress Around Food (Stress sa Pagkain)'}
                                                containerStyle={styles.goalCheckBox}
                                            />
                                        </View>

                                        <View style={styles.goalCheckBoxContainer}>
                                            <CheckBox
                                                value={checkboxStates.lackOfProgress}
                                                onChange={() => toggleCheckbox('lackOfProgress')}
                                                label={'Lack Of Progress(Kakulangan ng Pag-unlad)'}
                                                containerStyle={styles.goalCheckBox}
                                            />
                                        </View>
                                        <View style={styles.goalCheckBoxContainer}>
                                            <CheckBox
                                                value={medHistoryStates.expensiveHealthyFood}
                                                onChange={() => toggleCheckbox('expensiveHealthyFood')}
                                                label={'Expensive Healthy Food \n (Mahal na malusog na Pagkain)'}
                                                containerStyle={styles.goalCheckBox}
                                                textStyle={styles.labelText} 
                                            />
                                        </View>
                                        <View style={[styles.goalCheckBoxContainer, {
                                            paddingLeft: 20,
                                        }]}>
                                            <TextInput
                                                placeholder="Other (specify) Iba pa (tukuyin)"
                                                inputMode="text"
                                                style={[styles.medHistoryTextContainer, {
                                                    marginTop: 0,
                                                }]}
                                            ></TextInput>
                                        </View>
                                    </View>
                                )}
                               



                                <Text style={{ marginTop: 10, fontSize: 15, marginLeft: 15, fontWeight: "bold" }}>What is your past Medical History / health condition (Ano ang iyong nakaraang Medical History / kondisyon sa kalusugan)</Text>
                                <Text style={{ marginTop: 2, fontSize: 12, marginLeft: 30, }}>Select Your Medical History / health condition (Piliin ang Iyong Medikal na Kasaysayan / kondisyon ng kalusugan :)</Text>

                                {/* loop through the array of medical history */}
                                {
                                    Object.keys(medHistoryStates).map(function (key) {
                                        return (
                                            <View style={styles.goalCheckBoxContainer} key={key}>
                                                <CheckBox
                                                    value={key}
                                                    onChange={() => toggleCheckboxMedHistory(key)}
                                                    label={key}
                                                    containerStyle={styles.goalCheckBox}
                                                />
                                            </View>
                                        );
                                    })
                                }

                                <View style={styles.medicalHistory}>
                                    <Image
                                        style={styles.medsImageContainer}
                                        source={require("../image/medical-history.png")}
                                    />
                                    <TextInput
                                        placeholder="Other (specify)"
                                        inputMode="text"
                                        value={medHistory}
                                        onChangeText={(text) => setMedHistory(text)}
                                        style={styles.medHistoryTextContainer}
                                    ></TextInput>
                                </View>

                            </View>
                        </ScrollView>
                    </SafeAreaView>
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

                        <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 50, marginLeft: 20 }}>What's your goal weight(Ano ang iyong layunin na timbang)</Text>
                        <Text style={{ fontSize: 12, marginTop: 70, marginLeft: 20, marginRight: 15 }}>Don't worry. This doesn't affect your daily calorie goal and can always change it later (Huwag kang mag-alala. Hindi nito naaapektuhan ang iyong pang-araw-araw na layunin sa calorie at maaari itong palaging baguhin sa ibang pagkakataon): </Text>

                        {Selections.length > 0 && (
                            <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 60, marginLeft: 20, marginRight: 15 }}>What is your Monthly goal? (Ano ang iyong Lingguhang layunin?)</Text>
                        )}
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
                                inputMode="numeric"
                            ></TextInput>
                        </View>
                        {Selections.length > 0 && (
                            <DropDownPicker
                                open={Pops}
                                value={info}
                                items={Selections}
                                setOpen={setPops}
                                setValue={setInfo}
                                setItems={setSelections}
                                zIndex={3000}
                                placeholder="Set Monthly Goal"
                                zIndexInverse={1000}
                                containerStyle={{ width: 320, height: 200, position: "absolute", top: 380, right: 20 }}
                            />
                        )}


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
        </ScrollView>
    );
};
// function calculateSuggestedWeight(age, height) {
//     // Convert height from cm to meters
//     const heightInMeters = height / 100;
//     // Calculate BMI based on a standard BMI formula
//     const bmi = 22; // You can adjust this to your preferred BMI value
//     // Calculate suggested weight using BMI formula: weight = BMI * (height in meters)^2
//     let suggestedWeight = bmi * Math.pow(heightInMeters, 2);
//     // Adjust suggested weight based on age (optional)
//     if (age < 18) {
//         // Adjust for children/adolescents if needed
//         suggestedWeight = suggestedWeight * 0.85;
//     }
//     // Round the suggested weight to the nearest integer
//     return Math.round(suggestedWeight);
// }





function convertFeetAndInchesToCm(feet, inches) {
    // Convert feet and inches to centimeters
    const heightInCm = feet * 30.48 + inches * 2.54;
    return heightInCm;
}

function calculateSuggestedWeight(age, height, heightUnit) {
    let heightInMeters;

    if (heightUnit === 'ft') {
        // Parse the feet and inches values from the height input
        const [feet, inches] = height.split(".").map(parseFloat);
        // Convert feet and inches to centimeters
        const heightInCm = convertFeetAndInchesToCm(feet, inches);
        // Convert height from centimeters to meters
        heightInMeters = heightInCm / 100; // 1 cm = 0.01 meters
    } else if (heightUnit === 'cm') {
        // Convert height from centimeters to meters
        heightInMeters = height / 100; // 1 cm = 0.01 meters
    } else {
        // Assume height is already in meters if heightUnit is not 'ft' or 'cm'
        heightInMeters = height;
    }

    // Calculate BMI based on a standard BMI formula
    const bmi = 22; // You can adjust this to your preferred BMI value
    // Calculate suggested weight using BMI formula: weight = BMI * (height in meters)^2
    let suggestedWeight = bmi * Math.pow(heightInMeters, 2);

    // Adjust suggested weight based on age (optional)
    if (age < 18) {
        // Adjust for children/adolescents if needed
        suggestedWeight = suggestedWeight * 0.85;
    }

    // Round the suggested weight to the nearest integer
    return Math.round(suggestedWeight);
}




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


    },

    goalCheckBox: {
        marginLeft: 10,
        marginTop: 12,
        marginBottom: 20,


    },
    medicalHistory: {
        flexDirection: "row",
        marginBottom: 15,
        backgroundColor: "#f9eed9",
        borderRadius: 10,
        width: 320,
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
