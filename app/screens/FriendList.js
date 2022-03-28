import React from 'react';
import { View, Text, Image, StyleSheet, Button, SafeAreaView, Alert } from 'react-native';

import AppText from "../components/AppText";
import AppButton from '../components/AppButton';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
export function FriendList({navigation}) {
    return(

        <SafeAreaView style={styles.container}>
            <View style={styles.listContainer} >
                <View style={styles.listElement}>
                    <ListItem 
                        title = "Friend1"
                        image = {require("../assets/fox.png")}
                    />

                    <View style={styles.buttonContainer}>
                        <Button title="Button1" onPress={() => {navigation.navigate("Notification")}}/>
                    </View>
                </View>

                <View style={styles.listElement}>
                    <ListItem 
                        title = "Friend2"
                        image = {require("../assets/fox.png")}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Button2"  />
                    </View>
                </View>

                <View style={styles.listElement}>
                    <ListItem 
                        title = "Friend3"
                        image = {require("../assets/fox.png")}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Button3"  />
                    </View>
                </View>

                <View style={styles.listElement}>
                    <ListItem 
                        title = "Friend4"
                        image = {require("../assets/fox.png")}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Button4"  />
                    </View>
                </View>

                <View style={styles.listElement}>
                    <ListItem 
                        title = "Friend5"
                        image = {require("../assets/fox.png")}
                        
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Button5"  onPress={createThreeButtonAlert}/>
                    </View>
                </View>

            </View>

            

            
            
        </SafeAreaView>

    );
};


const createThreeButtonAlert = () =>
Alert.alert(
  "I need SpongeBob!",
  "I need SpongeBob",
  [
    {
      text: "Ask me later",
      onPress: () => console.log("Ask me later pressed")
    },
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "OK", onPress: () => console.log("OK Pressed") }
  ]
);
const styles = StyleSheet.create({
    buttonContainer: {
        
        
       
        borderRadius: 10,
        shadowColor: "grey",
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 1,
       
    },

    container: {
        flex: 1,
        backgroundColor: "#f9e955",
        alignItems: "center",
        justifyContent: "center",
    },

    listElement: {
        flexDirection: "row",
        padding:90,
    },

    listContainer: {
        flex: 0.5,
        backgroundColor: "#f9e955",
        right: 100,
        justifyContent: "space-evenly",
        padding : 10,
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 35,

    },

    textElement: {
       
    },

    userContainer: {
        marginVertical: 40,

    }
})
export default FriendList;
