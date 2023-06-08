import {
    Text,
    View,
    Button,
    ScrollView,
    Image,
    SafeAreaView,
    StyleSheet,
    Touchable, TouchableOpacity
} from "react-native";
// import { IMAGE } from "../ExercisePlan/image/PngItem_4039383.png";
// import { render } from "react-dom";
import { TextInput } from "@react-native-material/core";
import { useState } from "react";

export default Dashboard = ({ navigation, route }) => {
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [bmi, setBmi] = useState('')
    const [description, setDescription] = useState('')

    const calculateBmi = () => {
        const bmi = weight / ((height / 100) * (height / 100))
        setBmi(bmi.toFixed(1))

        if (bmi < 18.5) {
            setDescription('Underweight')
        }
        else if (bmi >= 18.5 && bmi <= 24.9) {
            setDescription('Normal')
        }
        else if (bmi >= 25 && bmi <= 29.9) {
            setDescription('Overweight')
        }
        else if (bmi >= 30) {
            setDescription('Obese')
        }
    }

    return (
        <ScrollView>
            <View>
                <Text>Weight</Text>
                <TextInput
                    value={weight}
                    onChangeText={(text) => setWeight(text)}
                    placeholder="Weight in kg"
                    keyboardType="numeric"
                >
                </TextInput>
            </View>


            <View style={{ flexDirection: "row", height }}>

                <TextInput
                    value={height}
                    onChangeText={(text) => setHeight(text)}
                    placeholder="Height in cm"
                    keyboardType="numeric"
                >
                </TextInput>
            </View>
            <View>
                <TouchableOpacity onPress={calculateBmi}>
                    <Text>Calculate</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text>{bmi}</Text>
                <Text>{description}</Text>
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    ExerciseContainer: {
        borderRadius: 10,
        height: 160,
        width: 350,
        backgroundColor: "#F6F1F1",
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        alignItems: "center",
        borderColor: "#146c94",
        borderWidth: 1,
        alignSelf: "center",
    },
    ExerciseImage: {
        height: 27,
        width: 345,
        flex: 1,
        borderRadius: 10,
        marginTop: 1,
    },
    TextContainer: {
        width: 350,
        height: 30,
        textAlign: "center",
        backgroundColor: "#146c94",
        borderRadius: 10,
        paddingVertical: 6,
        color: "white",
        fontWeight: "bold",
    },
});
