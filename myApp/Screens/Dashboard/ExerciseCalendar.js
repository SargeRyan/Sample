import {
    ContributionGraph,
} from "react-native-chart-kit";
import {
    Text,
    View,
    ScrollView,
    Image,
    SafeAreaView,
    StyleSheet,
    Modal,
    Dimensions
} from "react-native";

export default ExerciseCalendar = ({ }) => {
    const commitsData = [
        { date: "2023-03-01", count: 1 },
        { date: "2023-06-01", count: 1 },
        { date: "2023-06-02", count: 1 },
        { date: "2023-06-03", count: 0 },
        { date: "2023-06-04", count: 1 },
        { date: "2023-06-05", count: 0 },
        { date: "2023-06-06", count: 0 },
        { date: "2023-06-07", count: 1 },
        { date: "2023-06-08", count: 0 },
        { date: "2023-06-09", count: 1 },
        { date: "2023-06-16", count: 0 },
        { date: "2023-06-17", count: 0 },
    ];


    const chartConfig = {
        backgroundColor: "#fff",
        color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    return (
        <ContributionGraph
            values={commitsData}
            numDays={30}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            chartConfig={chartConfig}
        />
    );
};  