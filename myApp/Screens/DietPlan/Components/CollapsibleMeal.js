import {
    StyleSheet,
    Text,
    View,
    Image,
} from "react-native";
import React, { useEffect, useState } from "react";

export default CollapsibleMeal = ({ mealData }) => {

    return (
        <View style={[styles.card, styles.shadowProp]}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <View
                        style={{
                            height: 70,
                            marginRight: 10,
                            borderRadius: 8,
                            overflow: "hidden",
                        }}
                    >
                        <Image
                            style={{ width: 80, borderRadius: 8, height: 70 }}
                            source={{
                                uri: mealData.mealImage,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                        }}
                    >
                        <Text style={{ fontSize: 30, width: 150 }}>
                            {mealData.mealName}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 14,
        width: "100%",
        alignSelf: "center",
    },
    shadowProp: {
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        bprderRadius: 8,
    },
});
