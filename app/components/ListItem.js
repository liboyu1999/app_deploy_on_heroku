import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import AppText from './AppText';

function ListItem({ title, image }) {

    return(
        <View style={styles.container}>
            <View>
                <Image style={styles.image} source={image} />
            </View>
            <AppText style={styles.title}>{title}</AppText>
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