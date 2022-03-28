import React from 'react';
import { Image, ImageBackground,StyleSheet,Text,View ,button} from 'react-native';
import AppButton from '../components/AppButton';
function WelcomeScreen({navigation}) {

    return(
        <ImageBackground 
           
            source = {require("../assets/sponge.jpeg")}
            style = {styles.background}
        >
            <Text></Text>
            <Image style = {styles.logo} source = {require("../assets/Ping_logo.png")} />
            <View style = {styles.buttonsContainer}>
              <AppButton title = "Login" onPress = {()=> navigation.navigate("Login")}/>
              <AppButton title = "Register" color = '#87cefa'  onPress = {()=> navigation.navigate("Register")}/>

            </View>
            
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center",
    },
    buttonsContainer:{
        padding: 20,
        width:"100%",

    },
    logo: {
        width:230,
        height:230,
        position: "absolute",
        top: 70,
    },
    RegisterButton: {
        width:"100%" ,
        height:70,
        backgroundColor:'#87cefa',
    },
});
export default WelcomeScreen;