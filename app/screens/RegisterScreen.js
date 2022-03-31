import React from 'react';
import {useState} from 'react';
import { StyleSheet,Image,Button,Alert} from 'react-native';
import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import PopUp from '../components/Popup';
import {authentication} from "../../firebase";
import {  createUserWithEmailAndPassword } from "firebase/auth";

function RegisterScreen({navigation}) {
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const [popUpVisible, setPopUpVisible] = useState(false);
    const [popUpText, setPopUpText] = useState();
    const RegisterUser = async(e) => {
        e.preventDefault();
        
        let user;
        
        try{
            const createUserRes = await createUserWithEmailAndPassword(authentication, email, password);
            user = createUserRes.user;
            
        }
        catch(error)
        {   
            if(!email || !password){
                return Alert.alert('Please enter a valid password or email');
            }
            else{
                return Alert.alert(error.message);

            }
        }
        Alert.alert("Register Successful. Please go back to Login page.");
        //setPopUpVisible(true);

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
        <PopUp popUpVisible={popUpVisible}  setPopUpVisible={setPopUpVisible} popUpText={popUpText} />
        
        <Button title =  "Register" onPress={RegisterUser}/>
        
    </Screen>
  )
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
    },
    
})


export default RegisterScreen;