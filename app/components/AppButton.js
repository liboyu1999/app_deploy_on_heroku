import React from 'react';
import { View,StyleSheet, Text, TouchableOpacity} from 'react-native';

function AppButton({title, onPress,color = '#20b2aa'}) {
    console.log('test it ')
    return (
        <TouchableOpacity style = {[styles.button,{backgroundColor:color}]} onPress = {onPress}>
    
            <Text style = {styles.text}>{title}</Text>

        </TouchableOpacity>
            
        
    );
}
const styles = StyleSheet.create({
    button:{
        borderRadius:25,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        padding:15,
        width:"100%",
        marginVertical:10,
        

    },
    text :{
        color:"#fff0f5",
        fontSize:18,
        textTransform: "uppercase",
        fontWeight:"bold",
    }

})
export default AppButton;