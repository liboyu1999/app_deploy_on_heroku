import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from "../screens/WelcomeScreen";
import FriendList from "../screens/FriendList";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Notification from "../api/Notification";
import AddFriend from "../screens/AddFriend";
import Profile from '../screens/ProfileScreen';

import Map from "../screens/Map";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
    return (
      <Tab.Navigator>
        <Tab.Screen name = "Friend" component={FriendList} options={{headerShown: false } }/>        
        <Tab.Screen name = "Add Friend" component={AddFriend} options={{headerShown: false } }/>
        <Tab.Screen name = "Profile" component={Profile} options={{headerShown: false } }/>
        <Tab.Screen name = "Map" component  = {Map} options={{headerShown: false }}/>
      </Tab.Navigator>
    );
  }

const AuthNavigator = () => (
    <Stack.Navigator>
       
        <Stack.Screen name = "Welcome" component  = {WelcomeScreen} options = {{headerShown: false}}/>
        <Stack.Screen name = "Profile" component  = {Profile} />
        <Stack.Screen name = "Friend" component  = {FriendList} />
        <Stack.Screen name = "Login" component  = {LoginScreen} />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{headerShown: false } }
        />
        <Stack.Screen name = "Register" component  = {RegisterScreen} />
        <Stack.Screen name = "Notification" component  = {Notification} />
        <Stack.Screen name = "AddFriend" component  = {AddFriend} />
    </Stack.Navigator>
);

export default AuthNavigator;