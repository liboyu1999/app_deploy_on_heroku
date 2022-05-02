import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NotificationComponent} from './NotificationComponent';
import styles from '../config/styles';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { Directions } from 'react-native-gesture-handler';
import { Badge } from 'react-native-elements';

function NotificationPopup (props) {
    const [show, setShow] = useState(false);
    return(
        <View>
            <TouchableOpacity>
                <Icon name='bell' size={20} color="blue" onPress={() => {setShow(true)}} />    
            </TouchableOpacity>
            <View>
                <Badge value={props.friendQueue.length} status="error" containerStyle={{position: 'absolute', top: -30, left: 10}}/>
            </View>
            <ScrollView>
                <Modal transparent={true} visible={show}>
                    <View style={{backgroundColor: '#000000aa', flex: 1}}>
                        <View style={{backgroundColor: '#ffffff', top: 100, left: 40, margin: 50, padding: 40, borderRadius: 10}}>
                            <Icon name='close' color="red" onPress={() => { setShow(false) }} size={20} style={{top: -30, left: 200}} />
                            {props.friendQueue.map((data, id) => {
                                return <NotificationComponent {...props} key={id} data={data} />
                            })}
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
}

export default NotificationPopup