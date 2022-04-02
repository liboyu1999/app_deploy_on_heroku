import React, {useState} from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';

import AppText from './AppText';

function ListItem({ title, image }) {
[popup,Setpopup]=useState(false)
    return(
        <View style={styles.container}>
            <View>
                <Image style={styles.image} source={image} />
            </View>
            <AppText style={styles.title}>{title}</AppText>
            <Button  title ="Send notification" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
     
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },

    title: {
        fontWeight: "500",
    },

})


export default ListItem;