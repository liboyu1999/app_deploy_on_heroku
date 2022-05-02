import React from 'react';
import ReactDOM from 'react-dom';
import { View, Text, Button, Touchable } from 'react-native';
import { Directions, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export function NotificationComponent(props) {
    return (
        <View>
            <Text>
                {props.data} 
            </Text> 
            <Text>send you a friend request</Text>         
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => props.onAdd(props.data)}>
                    <Icon name='check' color='green' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.onDelete(props.data)}>
                    <Icon name='close' color='red' style={{ paddingLeft: 5 }}/>
                </TouchableOpacity>
            </View>
            <Text></Text>
        </View>
    )
    
};

