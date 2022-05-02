import * as React from 'react';
import { View, StyleSheet, Button, Text,  KeyboardAvoidingView} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

function WelcomeScreen({navigation}) {
  const video = React.useRef(null);

  React.useEffect(()=> {
    setTimeout(()=>{
                navigation.navigate('Login')
            },5000)//定时两秒后自动跳转到主页.

},[])

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'file:///Users/wuyue/Desktop/%E5%B0%8F%E9%83%8E%E7%9A%84Video/production%20ID_4628795.mp4',
        }}
        rate={1}
        shouldPlay={true}
      isLooping={true}
      muted={true}
    
        resizeMode="cover"
    
        
      />

{/* <KeyboardAvoidingView behavior='padding' style={styles.container}>


<View style={styles.loginContainer}>


</View>
</KeyboardAvoidingView> */}
  
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    video: {
        position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
      },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export default WelcomeScreen;