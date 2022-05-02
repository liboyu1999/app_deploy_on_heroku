import React from 'react';
import { Image, ImageBackground,StyleSheet,Text,View } from 'react-native';

function ViewImage(props) {

    return(
        <ImageBackground 
            source = {require("../assets/sponge.jpeg")}
            style = {styles.background}
        >
            <Text></Text>
            <Image style = {styles.logo} source = {require("../assets/Ping!.png")} />
            <View style = {styles.LoginButton}></View>
            <View style = {styles.RegisterButton}></View>
    
        </ImageBackground>
    )
}