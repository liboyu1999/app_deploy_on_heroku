import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, Button, SafeAreaView, Alert, TextInput, ScrollView} from 'react-native';
import AppText from "../components/AppText";
import AppButton from '../components/AppButton';
import AddFriendItem from '../components/AddFriendItem';
import Screen from '../components/Screen';
import {authentication} from "../../firebase";
import { addDoc, query, collection, where, getDocs, orderBy,startAt,endAt} from 'firebase/firestore';
import {orderByChild} from 'firebase/database';
import {db} from '../../firebase';
import AwesomeAlert from 'react-native-awesome-alerts';

function AddFriend({navigation}) {
    const [username, setUserName]= useState();
    const [PotentialFriendList,setPotentialFriendList] = useState([]);
    const [displayFriendList, updateDisplay] = useState(false);
    const userRef = collection(db,'users');
    
    const searchUser = async () => {
      const q1 = query(userRef, orderBy('Name')
      , startAt(username), endAt(username+"\uf8ff")); 
      // const q1= query(userRef, where('Name','>=',username))
      const PotentialFriends= await getDocs(q1)
      let tempPotentialFriendList= [];
      
      PotentialFriends.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        tempPotentialFriendList.push(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
      setPotentialFriendList(tempPotentialFriendList);
      updateDisplay(true);
    };
 
    return(

<SafeAreaView style={styles.container}>
    <View>
    <Text>UserName</Text>    
      <Button
        title="Search"
        onPress={() => searchUser()
        }
      />
      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        value={username}
        placeholder="username"
      />
    <ScrollView>
      {displayFriendList ? 
        PotentialFriendList.map((l, i) => 
        (<AddFriendItem
             key={i}
             title={l.Name}
           />
         )
     )
      : null}
    </ScrollView>
    </View>
    
      
        </SafeAreaView>

    );
};


// const createThreeButtonAlert = () =>
// Alert.alert(
//   "I need SpongeBob!",
//   "I need SpongeBob",
//   [
//     {
//       text: "Ask me later",
//       onPress: () => console.log("Ask me later pressed")
//     },
//     {
//       text: "Cancel",
//       onPress: () => console.log("Cancel Pressed"),
//       style: "cancel"
//     },
//     { text: "OK", onPress: () => console.log("OK Pressed") }
//   ]
// );

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },

        input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
     },
      
  });
  
export default AddFriend;