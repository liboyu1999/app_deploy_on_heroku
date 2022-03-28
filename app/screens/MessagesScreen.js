import React from 'react';
import { FlatList, StyleSheet, View, StatusBar, Platform, SafeAreaView } from 'react-native';
import AppText from '../components/AppText';

import AppButton from '../components/AppButton';
import ListItem from '../components/ListItem';

const messages = [
    {
        id: 1,
        title: 'T1',
        image: require('../assets/fox.png'),
    },

    {
        id: 2,
        title: 'T2',
        image: require('../assets/fox.png'),
    }
]

function MessagesScreen(props) {
    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.head}>
                <AppText>Friend List</AppText>
            </View>
            <FlatList
                style = {styles.flatList}
                data = {messages}
                keyExtractor = {message => message.id.toString()}
                renderItem = {({ item }) => (
                    <ListItem
                        title = {item.title}
                        image = {item.image}
                    /> 
                )}  
            />

            <View style={styles.buttonContainer}>
                <AppButton title="Button1"  />
                <AppButton title="Button2"  />
                <AppButton title="Button3"  />
                <AppButton title="Button4" />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderRadius: 10,
        shadowColor: "grey",
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 1,
        backgroundColor: "orange",
        height: 50,
    },
    container: {
        flex: 1,
        backgroundColor: '#f9e955',
        
    },
    flatList: {
        
    },
    head: {
        alignItems: "center",
        backgroundColor: "orange",
        height:30,
    }

})


export default MessagesScreen;