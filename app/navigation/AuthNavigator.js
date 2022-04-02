import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from "../screens/WelcomeScreen";
import FriendList from "../screens/FriendList";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Notification from "../api/Notification";
import AddFriend from "../screens/AddFriend";
const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name = "Welcome" component  = {WelcomeScreen} options = {{headerShown: false}}/>
        <Stack.Screen name = "Friend" component  = {FriendList} />
        <Stack.Screen name = "Login" component  = {LoginScreen} />
        <Stack.Screen name = "Register" component  = {RegisterScreen} />
        <Stack.Screen name = "Notification" component  = {Notification} />
        <Stack.Screen name = "AddFriend" component  = {AddFriend} />
    </Stack.Navigator>
);

export default AuthNavigator;