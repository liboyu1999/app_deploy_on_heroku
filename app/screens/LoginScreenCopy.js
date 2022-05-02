import React from 'react';
import {useState} from 'react';
import { ImageBackground, StyleSheet, Text, View ,Image,Alert} from 'react-native';
import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import {authentication} from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
function LoginScreen({navigation}) {
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const [user, setUser] = useState();
    const image = { uri: "file:///Users/wuyue/Desktop/%E5%B0%8F%E9%83%8E%E7%9A%84Photo/pexels-marcus-aurelius-9789300.jpg" };
    


    const App = () => (
        <View style={styles.container}>
          <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          </ImageBackground>
        </View>
      );

    const SignIn =  async() => {
    let user;
    try{
        user = await signInWithEmailAndPassword(authentication, email, password)
    }catch(error) 
    {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
     };
     console.log(user);
  setUser(user);
}


    return (
    
        <ImageBackground 
                   
                   source = {require("../assets/WCP.jpg")}
                   style = {styles.background}
        >
            <View style={styles.view}>
        <Image style = {styles.logo} source = {require("../assets/Logo111.png")}/>
        <AppTextInput 
            autoCapitalize = 'none'
            autoCorrect = {false}
            keyboardType = "email-address"
            icon = "email"
            placeholder = "Email"
            textContentType = "emailAddress"
            onChangeText = {text => setEmail(text)}
            style={styles.textInput}
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
            style={styles.textInput}
        /> 
        {/* <AppButton title =  "Login" style={styles.loginbutton} onPress={

                 () => {
                 navigation.navigate("Friend");
             }
        
        }
        /> */}

        <AppButton title =  "Forget Password?" style={styles.loginbutton} onPress={

        () => {
        navigation.navigate("Friend");
        }

        }
        />


        <AppButton
        title="Forgot Password?"
        
        // titleStyle={{
        //     color: '#039BE5'
        // }}
        style={styles.loginbutton}
        onPress={()=> {
            navigation.navigate("Friend")}}
        //type="clear"
        />

        {/* <Text style={styles.baseText}>
            I am bold
        <Text style={styles.innerText}> and red</Text>
        </Text> */}
        </View>
        </ImageBackground>
  
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
        marginTop: -150,
        marginBottom:150,
    },
    loginbutton:{
        color: "black",
        backgroundColor:"black",
       
        flex: 1,
        justifyContent: "center"
        
    },

    forgetPasswordbutton:{
        color: "black",
        backgroundColor:"black",
       
        flex: 1,
        justifyContent: "center"
        
    },




    background:{
        flex:1,
        justifyContent: "flex-end",
        backgroundColor:"transparent",
        alignItems: "center"
    }, 
    view: {
        flex: 1,
        alignItems:'center',
        justifyContent: "center"
    },
    textInput:{
        width:250,
        height:10,
        
        alignSelf:'center',
        marginTop: 10,
        marginBottom:10,
    },
    baseText: {
        fontFamily: "Cochin"
    },
      titleText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    // baseText: {
    //     fontWeight: 'bold'
    //   },
      innerText: {
        color: 'red'
      }
    });

export default LoginScreen;