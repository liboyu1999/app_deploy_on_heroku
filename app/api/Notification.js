import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

//

//
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, Alert } from 'react-native';
import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});



export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const schedulePushNotification = async() => {

  
    const expoPushToken = await Notifications.getExpoPushTokenAsync({
      experienceId: '@username/example',
      development: true
    });

    // const chunk = Expo.chunkPushNotifications({
    //   to: "ExponentPushToken[__teLJOMqatQdNw2myYn1r]",
    //   sound: 'default',
    //   body: 'This is a test notification',
    //   data: { withSome: 'data' },
    // });
    try{
      fetch("https://exp.host/--/api/v2/push/send/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "ExponentPushToken[__teLJOMqatQdNw2myYn1r]",
        data: { extraData: "Some data in the push notification" , "_displayInForeground":true},
        title: "ni hao",
        body: "Howdy",
      }),
    });
  
    }
    catch(err){
      console.log('test err', err);
    }
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'Look at that notification',
    //     body: "I'm so proud of myself!",
    //   },
    //   trigger: { seconds: 1},
    // });

    // await Notifications.scheduleNotificationAsync({
    //   content: {
    //     icon: "dili.png",
    //     sound: 'SpongeSound.wav', 
    //     title: "You Received a Hard Push",
    //     body: 'From SpongeBob',
    //     data: { data: 'goes here' },
    //   },
    //   trigger: { seconds: 1},
    // });
 
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }

  // const pushButton = () => {
  //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }

  return (
    <Screen
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
        <Text>Push token: {expoPushToken}</Text>
      </View>
      <AppButton 
        
        title="Hard Push"
        
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </Screen>
  );
}


async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    setExpoPushToken(token);
    
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

