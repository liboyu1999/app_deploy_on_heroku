import React from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View ,Image,Alert} from 'react-native';
import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import {authentication} from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
function LoginScreen({navigation}) {
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const [user, setUser] = useState();

    const SignIn =  async() => {
    let user;
    try{
        user = await signInWithEmailAndPassword(authentication, email, password)
    }
    catch(error) 
    {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
     };
     console.log(user);
  setUser(user);
}

    return (
    <Screen style = {styles.container}>
        <Image style = {styles.logo} source = {require("../assets/Ping_logo.png")}/>
        <AppTextInput 
            autoCapitalize = 'none'
            autoCorrect = {false}
            keyboardType = "email-address"
            icon = "email"
            placeholder = "Email"
            textContentType = "emailAddress"
            onChangeText = {text => setEmail(text)}
        />
        <AppTextInput 
            autoCapitalize = 'none'
            autoCorrect = {false}
            keyboardType = "email-address"
            icon = "lock"
            placeholder = "Password"
            textContentType = "password"
            secureTextEntry 
            onChangeText = {text => setPassword(text)}
        />

        <AppButton title =  "Login" onPress={

                () => {
                navigation.navigate("Friend");
            }

             

        }
        />
        
    </Screen>
  );
};

const styles = StyleSheet.create({
    container: {
        padding:10
    },
    logo:{
        width:230,
        height:230,
        
        alignSelf:'center',
        marginTop: 10,
        marginBottom:20,
    }
})

export default LoginScreen;