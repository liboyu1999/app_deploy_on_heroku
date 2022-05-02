import React from "react";
import { Text, StyleSheet, Platform } from "react-native";


function AppText({ children }) {
    return <Text style={styles.text}> {children} </Text>;
}

Platform.select({
    ios: {
        fontFamily: "Avenir",
    },
    android: {
        fontFamily: "Roboto",
    }
})
const styles = StyleSheet.create({
    text: {
        fontSize: 18,
    },
})

export default AppText;